"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "El título es requerido",
  }),
});

const CreateCourse = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Curso creado exitosamente!");
    } catch {
      toast.error("Ocurrió un error al crear el curso");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Nombre de tu curso</h1>
        <p className="text-sm text-slate-500">
          Cómo te gustaría llamar este curso? No te preocupes, puedes cambiarlo
          después.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nombre del Curso</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Ej: 'Dirección Comercial para Inmobiliarias'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Qué enseñarás en el Curso?</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex items-center gap-x-2">
            <Link href="/dashboard">
              <Button type="button" variant="ghost">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourse;
