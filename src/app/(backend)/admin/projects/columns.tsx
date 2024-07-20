import DataTableColumnHeader from "@/components/custom/generic/datatable-column-header";
import { Button } from "@/components/ui/button";
import { type Project } from "@/types";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import React from "react";

interface ColumnProps {
  onEdit?: (value: Project) => void;
  onDelete?: (value: Project) => void;
}

export const getProjectTableColumns = ({
  onEdit,
  onDelete,
}: ColumnProps): ColumnDef<Project>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project" />
    ),
  },
  {
    accessorKey: "category.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    id: "actions",
    size: 120,
    cell: ({ row }) => {
      const currentRow = row.original;
      return (
        <div className="flex justify-between">
          {onEdit && (
            <Button onClick={() => onEdit(currentRow)} size="sm">
              <Pencil1Icon className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button onClick={() => onDelete(currentRow)} size="sm">
              <TrashIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      );
    },
  },
];
