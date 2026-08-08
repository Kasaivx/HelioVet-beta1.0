"use client";

import { usePathname } from "next/navigation";
import Navdock from "@/components/dock";

export default function LayoutWrapper({
  children,
}: Readonly< {
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hideNav = pathname === "/login";

  return (
    <>
      {!hideNav && <Navdock />}
      {children}
    </>
  );
}
