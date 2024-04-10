"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";

import { IconType } from "react-icons";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Dirección Comercial": FcMusic,
  Tributario: FcMusic,
  Legal: FcMusic,
  Marketing: FcMusic,
  Ventas: FcMusic,
};

export const Categories = ({ items }: CategoriesProps) => {
  return <div></div>;
};
