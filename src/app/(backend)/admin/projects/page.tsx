"use client";
import DataTable from "@/components/custom/generic/datatable";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PlusCircle, ArrowRight } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { queryKeys } from "@/factory/querykeys.factory";
import { deleteProject, getAllProjects } from "./action";
import { getProjectTableColumns } from "./columns";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { type Project } from "@/types";
import { useConfirm } from "@/components/custom/generic/alert-dialog";

function ProjectPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const { data, isFetching } = useQuery({
    initialData: [],
    queryKey: queryKeys.fetchProjects.all,
    queryFn: () => getAllProjects(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.fetchProjects.all,
      });
    },
  });

  const onEdit = (project: Project) => {
    router.push(`/admin/projects/${project.id}/edit`);
  };

  const onDelete = async (project: Project) => {
    const consentReceived = await confirm({
      title: "Are you sure?",
      body: "You are about to delete this project " + project.title,
      actionButton: "Delete",
    });

    if (consentReceived) {
      deleteMutation.mutate(project.id, {
        onSuccess: () => {
          toast("Project was deleted successfully", {
            type: "success",
          });
        },
        onError: () => {
          toast("Project was not deleted", {
            type: "error",
          });
        },
      });
    }
  };

  // const doDelete = (id) => {
  //   return toast(
  //     "Are you sure you want to delete this item " + project.title + "?",
  //     {
  //       draggable: true,
  //     },
  //   );
  // };

  const columns = useMemo(
    () => getProjectTableColumns({ onEdit, onDelete }),
    [],
  );
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <Card
        className="lg:col-span-2 xl:col-span-3"
        x-chunk="dashboard-01-chunk-4"
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="grid gap-2">
            <CardTitle>Projects</CardTitle>
            <CardDescription>List of added projects</CardDescription>
          </div>
          <Link
            href="/admin/projects/create"
            className={buttonVariants({
              variant: "default",
              size: "sm",
              className: "ml-auto gap-1",
            })}
          >
            <PlusCircle className="h-4 w-4" />
            <span> Add</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent>
          <DataTable
            isFetching={isFetching}
            data={data ? data : []}
            columns={columns}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default ProjectPage;
