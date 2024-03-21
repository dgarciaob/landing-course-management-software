"use client";

import axios from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Course } from "@prisma/client";
import { FileUpload } from "./FileUpload";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "La Imagen es requerida",
  }),
});

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((curr) => !curr);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Imagen añadida exitosamente!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Ocurrió un error al editar el curso");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 p-4 rounded-lg">
      <div className="font-medium flex items-center justify-between">
        Imagen
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancelar</>}

          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Agregar Imagen
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center bg-slate-200 h-60 rounded-lg mt-4">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-lg"
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Relación de aspecto recomendada: 16:9
          </div>
        </div>
      )}
    </div>
  );
};
