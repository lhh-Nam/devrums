"use client";

import { Divider } from "@nextui-org/react";
import NextLink from "next/link";

const sidebarRedirects = [
  {
    label: "Book review",
    href: "/admin/book-review",
  },
];

interface ISidebarItem {
  label: string;
  href: string;
}

export const Sidebar = () => {
  const renderSidebarItem = (sidebarItem: ISidebarItem) => {
    const { label, href } = sidebarItem;
    return (
      <div key={label}>
        <NextLink color="foreground" href={href}>
          {label}
        </NextLink>

        <Divider className="my-4" />
      </div>
    );
  };

  return (
    <div className="h-full">
      {sidebarRedirects.map((m) => renderSidebarItem(m))}
    </div>
  );
};
