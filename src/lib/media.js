import getStrapiURL from "./api";

export function getStrapiMedia(url) {
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}
