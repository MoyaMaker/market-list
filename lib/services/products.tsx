import { apiUrlBuilder } from "../helpers/api-url-builder";

export function getProducts({ signal }: { signal?: AbortSignal }) {
  const url = apiUrlBuilder("/products");
  return fetch(url, {
    method: "GET",
    signal,
  });
}
