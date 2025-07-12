"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  label,
  onClick
}: {
  href: string;
  label: string;
  onClick?: ()=>void
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li
      className={`transition-colors duration-300 ${
        isActive ? "text-blue-500" : "text-blue-900 hover:text-teal-500"
      }`}
    >
      <Link href={href} onClick={onClick}>{label}</Link>
    </li>
  );
}
