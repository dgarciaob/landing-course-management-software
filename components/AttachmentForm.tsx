"use client";

import axios from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "./FileUpload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((curr) => !curr);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Archivo añadido exitosamente!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Ocurrió un error al editar el curso");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Archivo eliminado exitosamente!");
      router.refresh();
    } catch {
      toast.error("Ocurrió un error al eliminar el archivo");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 p-4 rounded-lg">
      <div className="font-medium flex items-center justify-between">
        Recursos
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancelar</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Agregar Archivo
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No hay archivos adjuntos
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <div className="flex flex-row">
                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p className="text-xs line-clamp-1">{attachment.name}</p>
                  </div>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      className="ml-auto hover:opacity-75 transition"
                      onClick={() => onDelete(attachment.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachments"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Agrega recursos para tus estudiantes
          </div>
        </div>
      )}
    </div>
  );
};
