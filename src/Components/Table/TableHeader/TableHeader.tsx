import { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';

import { getTableTitle } from '../../../utils/getTableTitle';
import { TableNameKeyType } from '../../../Types/Table.type';

import './TableHeader.css';

interface ColumnHeaderInterface {
    inputValue: string
    tableName: TableNameKeyType
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function TableHeader({ inputValue, tableName, handleChange }: ColumnHeaderInterface) {
    const [value, setValue] = useState(inputValue);

    const title = getTableTitle(tableName);
    useEffect(() => {
        setValue(inputValue);
    }, [inputValue]);

    return (
        <div className='table-header'>
            <div className='title'>
                {title}
            </div>
            <div className="search-container">
                <BiSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}