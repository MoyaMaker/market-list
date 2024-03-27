import { apiUrlBuilder } from "../helpers/api-url-builder";
import { FormProductType } from "../types/product-type";

export function getProducts({
  search,
  signal,
  next,
  cache,
}: {
  search?: string;
  signal?: AbortSignal;
  next?: NextFetchRequestConfig | undefined;
  cache?: RequestCache | undefined;
}) {
  const url = apiUrlBuilder("products");

  if (search) url.searchParams.append("search", search);

  return fetch(url, {
    method: "GET",
    signal,
    next,
    cache,
  });
}

export function createProduct({
  product,
  signal,
}: {
  product: FormProductType;
  signal?: AbortSignal;
}) {
  const url = apiUrlBuilder("product");

  return fetch(url, {
    method: "POST",
    signal,
    body: JSON.stringify(product),
  });
}

export function deleteProduct({
  id,
  signal,
}: {
  id: string;
  signal?: AbortSignal;
}) {
  const url = apiUrlBuilder(`product/${id}`);

  return fetch(url, {
    method: "DELETE",
    signal,
  });
}

export function updateProduct({
  id,
  product,
  signal,
}: {
  id: string;
  product: FormProductType;
  signal?: AbortSignal;
}) {
  const url = apiUrlBuilder(`product/${id}`);

  return fetch(url, {
    method: "PUT",
    signal,
    body: JSON.stringify(product),
  });
}
