"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { ArrowRight, PlusCircle } from "lucide-react";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import Modal from "@/components/custom/generic/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { type Category, type CategoryDTO } from "@/types";
import { CategorySchema } from "@/validation-schema/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { queryKeys } from "@/factory/querykeys.factory";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "./action";
import { toast } from "react-toastify";
import DataTable from "@/components/custom/generic/datatable";
import { getCategoryTableColumns } from "./columns";

function CategoryPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState<Category>({ id: "", name: "" });

  const form = useForm<CategoryDTO>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      ...edit,
    },
    values: { ...edit },
  });
  const toggleModal = () => setShowModal((prev) => !prev);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.fetchCategories.all,
    queryFn: () => getAllCategories(),
    initialData: [],
    // staleTime: 60 * 10,
  });

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.fetchCategories.all,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: CategoryDTO }) =>
      updateCategory(id, values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.fetchCategories.all,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.fetchCategories.all,
      });
    },
  });

  const doSubmit = (formData: CategoryDTO) => {
    startTransition(async () => {
      console.log(formData);
      await createMutation.mutateAsync(formData, {
        onSuccess: async () => {
          toast("Category was created successfully", { type: "success" });
          toggleModal();
        },
        onError: () => {
          toast("An error occured while adding category", {
            type: "error",
          });
        },
      });
    });
  };

  const doEdit = (formData: CategoryDTO) => {
    updateMutation.mutate(
      { id: edit.id, values: formData },
      {
        onSuccess: async () => {
          toast("Category was updated successfully", { type: "success" });
          toggleModal();
        },
        onError: (error) => {
          console.log(error);
          toast("An error occured category was not updated", {
            type: "error",
          });
        },
      },
    );
  };

  const onEdit = (value: Category) => {
    // const record = data?.find((search) => search.id == value.id);
    setEdit((prev) => ({
      ...prev,
      ...value,
    }));
    toggleModal();
  };

  const onDelete = (value: Category) => {
    deleteMutation.mutate(value, {
      onSuccess: async () => {
        toast("Category was deleted successfully", { type: "success" });
      },
      onError: () => {
        toast("An error occured category was not deleted", {
          type: "error",
        });
      },
    });
  };

  const columns = useMemo(
    () => getCategoryTableColumns({ onEdit, onDelete }),
    [],
  );

  useEffect(() => {
    form.reset();
    if (showModal == false) {
      setEdit({ id: "", name: "" });
    }
  }, [showModal]);

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <Card
        className="lg:col-span-2 xl:col-span-3"
        x-chunk="dashboard-01-chunk-4"
      >
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Category</CardTitle>
            <CardDescription>List of added project categories</CardDescription>
          </div>
          <Button size="sm" className="ml-auto gap-1" onClick={toggleModal}>
            <PlusCircle className="h-4 w-4" />
            Add
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            isFetching={isFetching}
            data={data ? data : []}
            columns={columns}
          />
        </CardContent>
      </Card>

      <Modal isOpen={showModal} setIsOpen={toggleModal}>
        <Form {...form}>
          <form
            className="grid w-full items-start gap-6 pt-0"
            onSubmit={
              edit.id ? form.handleSubmit(doEdit) : form.handleSubmit(doSubmit)
            }
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" className="h-9" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              isLoading={isPending}
              loadingText="Creating Category"
            >
              {edit.id?.length > 0 ? "Edit Category" : "Create Category"}
            </Button>
          </form>
        </Form>
      </Modal>
    </div>
  );
}

export default CategoryPage;
