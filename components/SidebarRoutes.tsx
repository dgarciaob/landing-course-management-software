"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { usePathname } from "next/navigation";
import path from "path";

const guestRoutes = [
  {
    icon: Layout,
    label: "Mis Cursos",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Descubre",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Cursos",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Análisis",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => {
        return (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        );
      })}
    </div>
  );
};
