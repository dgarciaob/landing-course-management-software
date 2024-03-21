"use client";

import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { Chapter, Course } from "@prisma/client";
import { Input } from "./ui/input";
import { ChaptersList } from "./ChaptersList";

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

export const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((curr) => !curr);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Capítulo creado exitosamente!");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Ocurrió un error al crear el capítulo");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 p-4 rounded-lg">
      <div className="font-medium flex items-center justify-between">
        Capítulos
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancelar</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Agregar un capítulo
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Introducción"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Crear
            </Button>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}
        >
          {!initialData.chapters.length && "No hay capítulos"}
          <ChaptersList
            onEdit={() => {}}
            onReorder={() => {}}
            items={initialData.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-muted-foreground mt-4 text-sm">
          Arrastra y suelta para reordenar los capítulos
        </p>
      )}
    </div>
  );
};
