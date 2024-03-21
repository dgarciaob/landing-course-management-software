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
import { Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { Course } from "@prisma/client";
import { Input } from "./ui/input";
import { formatPrice } from "@/lib/format";

interface PriceFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  price: z.coerce.number(),
});

export const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((curr) => !curr);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Descripción editada exitosamente!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Ocurrió un error al editar el curso");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 p-4 rounded-lg">
      <div className="font-medium flex items-center justify-between">
        Precio
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancelar</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-slate-700 text-sm mt-2",
            !initialData.price && "text-slate-500 italic"
          )}
        >
          {initialData.price ? formatPrice(initialData.price) : "Sin precio"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        disabled={isSubmitting}
                        placeholder="Añade el precio de tu curso..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
