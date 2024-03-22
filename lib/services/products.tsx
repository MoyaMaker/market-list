import { apiUrlBuilder } from "../helpers/api-url-builder";
import { FormProduct } from "../types/product";

export function getProducts({
  search,
  signal,
  next,
}: {
  search?: string;
  signal?: AbortSignal;
  next?: NextFetchRequestConfig | undefined;
}) {
  const url = apiUrlBuilder("/products");

  if (search) url.searchParams.append("search", search);

  return fetch(url, {
    method: "GET",
    signal,
    next,
  });
}

export function createProduct({
  product,
  signal,
}: {
  product: FormProduct;
  signal?: AbortSignal;
}) {
  const url = apiUrlBuilder("/product");

  return fetch(url, {
    method: "POST",
    signal,
    body: JSON.stringify(product),
  });
}

export function deleteProduct({
  id,
  signal,
  next,
}: {
  id: string;
  signal?: AbortSignal;
  next?: NextFetchRequestConfig | undefined;
}) {
  const url = apiUrlBuilder(`/product/${id}`);

  return fetch(url, {
    method: "DELETE",
    signal,
    next,
  });
}
