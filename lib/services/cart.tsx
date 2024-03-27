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

export function addCartItem({
  product_id,
  quantity,
  signal,
}: {
  product_id: string;
  quantity: number;
  signal?: AbortSignal;
}) {
  const url = apiUrlBuilder("/cart");

  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      product_id,
      quantity,
    }),
    signal,
  });
}

export function updateCartItem({
  id,
  quantity,
  signal,
}: {
  id: string;
  quantity: number;
  signal?: AbortSignal;
}) {
  const url = apiUrlBuilder(`/cart/${id}`);

  return fetch(url, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
    signal,
  });
}

export function deleteCartItem(id: string) {
  const url = apiUrlBuilder(`/cart/${id}`);

  return fetch(url, {
    method: "DELETE",
  });
}
