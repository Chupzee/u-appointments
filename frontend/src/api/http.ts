export class HttpError extends Error {
  constructor(
    public status: number,
    public body: unknown,
    message = `HTTP ${status}`
  ) {
    super(message);
  }
}

export async function http<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const body = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

  if (!res.ok) {
    throw new HttpError(res.status, body);
  }

  return body as T;
}
