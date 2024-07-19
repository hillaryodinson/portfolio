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
import { Category, type CategoryDTO } from "@/types";
import { CategorySchema } from "@/validation-schema/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "react-query";
import { queryKeys } from "@/factory/querykeys.factory";
import { createCategory, getAllCategories } from "./action";
import { toast } from "react-toastify";
import DataTable from "@/components/custom/generic/datatable";
import { getCategoryTableColumns } from "./columns";

function CategoryPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<CategoryDTO>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
    },
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
    onSuccess: ({ message }) => {
      toast(message, { type: "success" });
      toggleModal();
    },
    onError: (error) => {
      //TODO:show error later
      console.log(error);
      toast("An error occured while adding category", {
        type: "error",
      });
    },
  });

  const doSubmit = (formData: CategoryDTO) => {
    startTransition(async () => {
      console.log(formData);
      await createMutation.mutateAsync(formData);
    });
  };

  const onEdit = (value: Category) => {
    toast("On Edit Button clicked for " + value.name);
  };
  const onDelete = (value: Category) => {
    toast("On Delete Button clicked for " + value.name);
  };

  const columns = useMemo(
    () => getCategoryTableColumns({ onEdit, onDelete }),
    [],
  );

  useEffect(() => {
    form.reset();
  }, [showModal]);

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <Card
        className="lg:col-span-2 xl:col-span-3"
        x-chunk="dashboard-01-chunk-4"
      >
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Recent transactions from your store.
            </CardDescription>
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
            onSubmit={form.handleSubmit(doSubmit)}
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
              Create Category
            </Button>
          </form>
        </Form>
      </Modal>
    </div>
  );
}

export default CategoryPage;
