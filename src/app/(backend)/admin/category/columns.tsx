import DataTableColumnHeader from "@/components/custom/generic/datatable-column-header";
import { Button } from "@/components/ui/button";
import { type Category } from "@/types";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import { LucideEdit2 } from "lucide-react";

interface ColumnProps {
  onEdit?: (value: Category) => void;
  onDelete?: (value: Category) => void;
}
export const getCategoryTableColumns = ({
  onEdit,
  onDelete,
}: ColumnProps): ColumnDef<Category>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader title="Category Name" column={column} />
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
