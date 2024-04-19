import { Menu } from "lucide-react";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { CourseSideBar } from "./CourseSideBar";

interface CourseMobileSideBar {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseMobileSideBar = ({
  course,
  progressCount,
}: CourseMobileSideBar) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition-all">
          <Menu />
        </SheetTrigger>
        <SheetContent className="p-0 bg-white w-72" side="left">
          <CourseSideBar course={course} progressCount={progressCount} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
