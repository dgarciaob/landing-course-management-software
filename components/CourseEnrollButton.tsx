"use client";

import { formatPrice } from "@/lib/format";
import { Button } from "./ui/button";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

export const CourseEnrollButton = ({
  courseId,
  price,
}: CourseEnrollButtonProps) => {
  return (
    <Button className="w-full md:w-auto" size="sm">
      Inscribirse por {formatPrice(price)}
    </Button>
  );
};
