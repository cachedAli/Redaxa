import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const destructureName = (name: string | null | undefined) => {
  const nameParts = name?.split(" ") || [];
  const [firstPart, ...lastParts] = nameParts;

  const firstName = firstPart;
  const lastName = lastParts.join("")

  const fullName = nameParts.slice(0, 2).join(" ");

  return { firstName, lastName, fullName }
}

export async function urlToArrayBuffer(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  return await blob.arrayBuffer();
}

export const capitalizeFirstLetter = (string: string) => {
  if (!string) return "";
  return string.toLowerCase().split(" ").map((word) => {

    if (!word) return "";
    return word[0].toUpperCase() + word.slice(1)
  }).join(" ")
}