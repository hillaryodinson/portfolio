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
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { queryKeys } from "@/factory/querykeys.factory";
import { getAllProjects } from "./action";
import { getProjectTableColumns } from "./columns";
import Link from "next/link";

function ProjectPage() {
  const columns = useMemo(() => getProjectTableColumns({}), []);

  const { data, isFetching } = useQuery({
    initialData: [],
    queryKey: queryKeys.fetchProjects.all,
    queryFn: () => getAllProjects(),
  });

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
