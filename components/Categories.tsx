"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcSalesPerformance,
  FcSportsMode,
  FcAddressBook,
  FcMoneyTransfer,
} from "react-icons/fc";

import { IconType } from "react-icons";
import { CategoryItem } from "./CategoryItem";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Dirección Comercial": FcEngineering,
  Tributario: FcAddressBook,
  Legal: FcMoneyTransfer,
  Marketing: FcSportsMode,
  Ventas: FcSalesPerformance,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => {
        return (
          <CategoryItem
            key={item.id}
            label={item.name}
            icon={iconMap[item.name]}
            value={item.id}
          />
        );
      })}
    </div>
  );
};
