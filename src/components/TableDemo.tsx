import * as React from "react";
import {

  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Payment[] = [
  {
    name: "Alice Johnson",
    id: "AJ001",
    rank: 1,
    availability: "Available",
    action: "View",
  },
  {
    name: "Bob Smith",
    id: "BS002",
    rank: 2,
    availability: "Unavailable",
    action: "View",
  },
  {
    name: "Charlie Brown",
    id: "CB003",
    rank: 3,
    availability: "Available",
    action: "View",
  },
  {
    name: "David Wilson",
    id: "DW004",
    rank: 4,
    availability: "Available",
    action: "View",
  },
  {
    name: "Eva Green",
    id: "EG005",
    rank: 5,
    availability: "Unavailable",
    action: "View",
  },
  {
    name: "Frank Wright",
    id: "FW006",
    rank: 6,
    availability: "Available",
    action: "View",
  },
  {
    name: "Grace Lee",
    id: "GL007",
    rank: 7,
    availability: "Unavailable",
    action: "View",
  },
  {
    name: "Henry Davis",
    id: "HD008",
    rank: 8,
    availability: "Available",
    action: "View",
  },
  {
    name: "Irene Taylor",
    id: "IT009",
    rank: 9,
    availability: "Available",
    action: "View",
  },
  {
    name: "James Martin",
    id: "JM010",
    rank: 10,
    availability: "Unavailable",
    action: "View",
  },
  {
    name: "Karen Clark",
    id: "KC011",
    rank: 11,
    availability: "Available",
    action: "View",
  },
  {
    name: "Leo Walker",
    id: "LW012",
    rank: 12,
    availability: "Available",
    action: "View",
  },
  {
    name: "Mia Scott",
    id: "MS013",
    rank: 13,
    availability: "Unavailable",
    action: "View",
  },
  {
    name: "Nathan Hill",
    id: "NH014",
    rank: 14,
    availability: "Available",
    action: "View",
  },
  {
    name: "Olivia Young",
    id: "OY015",
    rank: 15,
    availability: "Available",
    action: "View",
  },
  {
    name: "Paul Allen",
    id: "PA016",
    rank: 16,
    availability: "Unavailable",
    action: "View",
  },
  {
    name: "Quinn Adams",
    id: "QA017",
    rank: 17,
    availability: "Available",
    action: "View",
  },
  {
    name: "Rachel Nelson",
    id: "RN018",
    rank: 18,
    availability: "Available",
    action: "View",
  },
  {
    name: "Steve Robinson",
    id: "SR019",
    rank: 19,
    availability: "Unavailable",
    action: "View",
  },
  {
    name: "Tina Harris",
    id: "TH020",
    rank: 20,
    availability: "Available",
    action: "View",
  },
];

export type Payment = {
  name: string;
  id: string;
  rank: number;
  availability: "Available" | "Unavailable";
  action: string;
};

export const columns: ColumnDef<Payment>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => <div>{row.getValue("rank")}</div>,
  },
  {
    accessorKey: "availability",
    header: "Availability Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("availability")}</div>
    ),
  },
  {
    id: "actions",
    header: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Download Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10, // Set the initial page size here
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="w-full ">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search id..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-white"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className="mx-1.5 bg-blue-600 hover:bg-blue-900">
          Add Crew+
        </Button>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="text-center" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className={
                        row.getValue("availability") === "Unavailable"
                          ? "bg-red-300  font-semibold capitalize text-center "
                          : " text-center font-semibold capitalize"
                      }
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
