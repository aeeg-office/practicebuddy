export class AuthConfigurationError extends Error {
  constructor(message = "JWT_SECRET must be configured") {
    super(message)
    this.name = "AuthConfigurationError"
  }
}

/** Returns the configured signing secret and never supplies a development fallback. */
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new AuthConfigurationError()
  return secret
}
