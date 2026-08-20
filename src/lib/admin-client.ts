export interface AdminCollection<T> {
  items: T[]
  page: number
  limit: number
  total: number
  totalPages: number
}

type FetchLike = (input: string, init?: RequestInit) => Promise<{ ok: boolean; json(): Promise<unknown> }>

export async function fetchAdminCollection<T>(
  resource: string,
  itemKey: string,
  filters: Record<string, string | number | undefined>,
  fetcher: FetchLike = fetch,
): Promise<AdminCollection<T>> {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(filters)) if (value !== undefined && value !== "") params.set(key, String(value))
  const suffix = params.toString()
  const response = await fetcher(`/api/admin/${resource}${suffix ? `?${suffix}` : ""}`, {
    credentials: "same-origin",
    headers: { Accept: "application/json" },
  })
  const data = await response.json() as Record<string, unknown> & { error?: unknown }
  if (!response.ok) throw new Error(typeof data.error === "string" ? data.error : "The request could not be completed")
  const items = data[itemKey]
  if (!Array.isArray(items)) throw new Error("The server returned an invalid collection")
  return {
    items: items as T[],
    page: typeof data.page === "number" ? data.page : 1,
    limit: typeof data.limit === "number" ? data.limit : items.length,
    total: typeof data.total === "number" ? data.total : items.length,
    totalPages: typeof data.totalPages === "number" ? data.totalPages : 1,
  }
}
