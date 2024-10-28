import { Table, flexRender } from '@tanstack/react-table';
import { BiChevronDown, BiChevronUp, BiExpandVertical } from 'react-icons/bi';

import './ColumnHeader.css';

interface ColumnHeaderInterface<T> {
    table: Table<T>
}
export function ColumnHeader<T>({ table }: ColumnHeaderInterface<T>) {
    return (
        <thead className="column-header">
            {table.getHeaderGroups().map((headerGroup) => 
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => 
                        <th key={header.id} colSpan={header.colSpan}>
                            <div className="column-name" {...{onClick: header.column.getToggleSortingHandler()}}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                <div className="sort-icon">
                                    {{
                                        asc: <BiChevronDown/>,
                                        desc: <BiChevronUp/>,
                                    }[header.column.getIsSorted() as string] ?? <BiExpandVertical/>}
                                </div>
                            </div>
                        </th>
                    )}
                </tr>
            )}
        </thead>
    )
}