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
import { getSearchableColumns, getTableColumns } from "../../Constants/TableColumns.constants";
import { TableNameKeyType } from "../../Types/Table.type";
import { DataHookType } from "../../Types/Store.type";

import "./Table.css";

interface TableProps<T> {
    data: DataHookType<T[]>,
    tableName: TableNameKeyType
}

/**
 * 
 * Table Component
 *
 * This component is designed to display tabular data in a structured format.
 * It takes in data and a table name as props to configure the displayed table.
 *
 * Props:
 * 
 * @param {Array<Object>} data - An array of objects representing the data to be displayed in the table.
 *                               Each object should correspond to a row in the table, and the keys should
 *                               match the defined column IDs in the configuration.
 * @param {string} tableName - The name of the table, used to identify the table and should correspond
 *                             to the configuration in 'src/constants/TableColumns.constants.ts'.
 * 
 * Configuration:
 *
 * Before using this component, configure the column names and column IDs along with search able columns in the 
 * 'src/constants/TableColumns.constants.ts' file. The keys in the data objects must match
 * the defined IDs for the table to display correctly.
 * 
 * Note: Use ReadMe for examples.
 */

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
            const searchColumns = getSearchableColumns(tableName);
            const searchTerms = input.toLowerCase().split(' ');
            console.log(searchTerms)
            return searchTerms.every((term: string) => 
                searchColumns.some(columnId => {
                    const value = (row.getValue(columnId) as string) || '';
                    return value.toLowerCase().includes(term);
                }))
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

    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        setIsEmpty(tableData.length < 1 || table.getRowModel().rows.length === 0); 
    },[tableData.length, table.getRowModel().rows.length]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <>
            <div className="table">
                <TableHeader tableName={tableName} inputValue={searchInput} handleChange={handleSearchChange}/>
                <table className="table-container">
                    {columnHeader}
                    {data.isLoading && !data.data && <LoadingComponent />}
                    {data.data && (
                        <tbody>
                            {isEmpty && <p>There is no data</p>}
                            {data.isError && <p>{data.error}</p>}
                            {!isEmpty && 
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