import { useEffect, useMemo, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
    SortingState,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";

import { LoadingComponent } from "../LoadingComponent/LoadingComponent";
import { ColumnHeader } from "./ColumnHeader/ColumnHeader";
import { TableHeader } from "./TableHeader/TableHeader";
import { Modal } from "../Modals/Modal";
import { getTableColumns } from "../../Constants/TableColumns.constants";
import { TableNameKeyType } from "../../Types/Table.type";
import { DataHookType } from "../../Types/Store.type";

import "./Table.css";

interface TableProps<T> {
    data: DataHookType<T[]>,
    tableName: TableNameKeyType
}
export function Table<T>({ data, tableName }: TableProps<T>) {
    const [tableData, setTableData] = useState<T[]>([]);

    const [sortingState, setSortingState] = useState<SortingState>([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        if (!data.isLoading && data.data) setTableData(data.data);
    }, [data.isLoading, data.data]);

    const columns = useMemo<ColumnDef<T, string>[]>(() => getTableColumns(tableName).map((column) => {
        return {
            id: column.columnId,
            accessorKey: column.columnId,
            header: column.columnName,
            cell: (props) => {
                return (<div>{props.getValue()}</div>)
            },
            enableSorting: true
        }
    }), []);

    const table = useReactTable<T>({
        data: tableData,
        columns,
        state: {
            sorting: sortingState,
            globalFilter: searchInput,
        },
        onSortingChange: setSortingState,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: (row, _columnId, input) => {
            const searchColumns = ['firstName', 'lastName'];

            return searchColumns.some(columnId => {
                const value = (row.getValue(columnId) as string) || '';
                return value.toLowerCase().includes(input.toLowerCase());
            });
        },
    });

    const columnHeader = ColumnHeader<T>({ table });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        setSearchInput(target.value);
    };

    const [rowId, setRowId] = useState<number>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onClickRow = (id: number) => { 
        setIsModalOpen(true);
        setRowId(id)
    }
    const onClickClose = () => setIsModalOpen(false);

    return (
        <>
        <div className="table">
            <TableHeader tableName={tableName} inputValue={searchInput} handleChange={handleSearchChange}/>
            <table className="table-container">
                {columnHeader}
                {data.isLoading && !data.data && <LoadingComponent />}
                {data.data && (
                    <tbody>
                        {
                            table.getRowModel().rows.map(row => {
                                const rowid = (row.original as { id: string }).id
                                return (
                                    <tr className="tr" key={row.id} onClick={() => onClickRow(Number(rowid))}>
                                        {row.getVisibleCells().map(cell =>
                                            <td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        )}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                )}
            </table>
        </div>
        {isModalOpen && (<Modal modal={tableName} onClickClose={onClickClose} id={rowId!} />)}
        </>
    )

}