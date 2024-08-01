"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type Project, type Category, type ProjectDTO } from "@/types";
import { ProjectSchema } from "@/validation-schema/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { queryKeys } from "@/factory/querykeys.factory";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllCategories } from "../../../category/action";
import { Button } from "@/components/ui/button";
import {
  createProject,
  deleteProject,
  fetchProject,
  updateProject,
} from "../../action";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import Tiptap from "@/components/custom/generic/editor";

function EditProjectPage() {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const params = useParams<{ id: string }>();

  const { data } = useQuery<Project>({
    queryKey: [...queryKeys.fetchProjects.single, { params }],
    queryFn: async ({}) => await fetchProject(params.id),
    cacheTime: 0,
  });

  const form = useForm<ProjectDTO>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      summary: "",
      categoryId: "",
    },
    values: {
      title: (data && data.title) ?? "",
      description: (data && data.description) ?? "",
      summary: (data && data.summary) ?? "",
      categoryId: data && data.categoryId,
    },
    mode: "onChange",
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, project }: { id: string; project: ProjectDTO }) =>
      updateProject(id, project),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.fetchProjects.all,
      });
    },
  });

  const categoryRecords = useQuery<Category[]>({
    initialData: [],
    queryKey: queryKeys.fetchCategories.all,
    queryFn: () => getAllCategories(),
  });

  const doSubmit = (values: ProjectDTO) => {
    startTransition(() => {
      updateMutation.mutate(
        { id: params.id, project: values },
        {
          onSuccess: () => {
            toast("Project was updated successfully", { type: "success" });
            router.push("/admin/projects");
          },
          onError: () => {
            toast("An error occured. Project was not updated", {
              type: "error",
            });
          },
        },
      );
    });
  };

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <Card
        className="lg:col-span-2 xl:col-span-3"
        x-chunk="dashboard-01-chunk-4"
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="grid gap-2">
            <CardTitle>Create Projects</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(doSubmit)}
              className="grid w-full items-start gap-6 pt-0"
              method="post"
            >
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} name="title" disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            {categoryRecords.data?.map((option) => (
                              <SelectItem value={option.id} key={option.name}>
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="summary"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        name="summary"
                        disabled={isLoading}
                        placeholder="Project Summary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Tiptap value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Modifying project please wait..."
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditProjectPage;
