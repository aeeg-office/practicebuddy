export interface AdminSessionIdentity {
  userId: string
  role: "admin" | "school_admin"
  exp?: number
}

function decodeBase64Url(value: string): Uint8Array | null {
  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=")
    return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0))
  } catch {
    return null
  }
}

function toArrayBuffer(data: Uint8Array): ArrayBuffer {
  return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer
}

/**
 * Edge-compatible HS256 verification for the HttpOnly admin-session cookie.
 * It deliberately accepts only administrator tokens and rejects expired tokens.
 */
export async function verifyAdminSessionToken(
  token: string | undefined,
  secret: string,
): Promise<AdminSessionIdentity | null> {
  if (!token || !secret) return null

  const [encodedHeader, encodedPayload, encodedSignature, ...extra] = token.split(".")
  if (!encodedHeader || !encodedPayload || !encodedSignature || extra.length > 0) return null

  const headerBytes = decodeBase64Url(encodedHeader)
  const payloadBytes = decodeBase64Url(encodedPayload)
  const signature = decodeBase64Url(encodedSignature)
  if (!headerBytes || !payloadBytes || !signature) return null

  try {
    const header = JSON.parse(new TextDecoder().decode(headerBytes)) as { alg?: string; typ?: string }
    if (header.alg !== "HS256" || (header.typ && header.typ !== "JWT")) return null

    const key = await crypto.subtle.importKey(
      "raw",
      toArrayBuffer(new TextEncoder().encode(secret)),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    )
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      toArrayBuffer(signature),
      toArrayBuffer(new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`)),
    )
    if (!valid) return null

    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as {
      userId?: unknown
      role?: unknown
      exp?: unknown
    }
    if ((payload.role !== "admin" && payload.role !== "school_admin") || typeof payload.userId !== "string" || !payload.userId) return null
    if (payload.exp !== undefined && (typeof payload.exp !== "number" || payload.exp <= Math.floor(Date.now() / 1000))) {
      return null
    }

    return { userId: payload.userId, role: payload.role as "admin" | "school_admin", ...(typeof payload.exp === "number" ? { exp: payload.exp } : {}) }
  } catch {
    return null
  }
}
