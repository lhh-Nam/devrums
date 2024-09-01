export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Devrums",
  description: "Rooms for Developer.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Books",
      href: "/books",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  sidebarItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
};
