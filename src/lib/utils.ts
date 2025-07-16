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