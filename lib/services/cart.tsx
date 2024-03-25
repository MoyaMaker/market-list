import { apiUrlBuilder } from "../helpers/api-url-builder";

export function getCartItems({
  signal,
  next,
  cache,
}: {
  signal?: AbortSignal;
  next?: NextFetchRequestConfig | undefined;
  cache?: RequestCache | undefined;
}) {
  const url = apiUrlBuilder("/cart");

  return fetch(url, {
    method: "GET",
    signal,
    next,
    cache,
  });
}
