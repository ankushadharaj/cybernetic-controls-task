import { useEffect, useMemo } from "react";

import { Table } from "../Table/Table";
import { useGetUsersList } from "../../Store/Users/users.hooks";
import { UserListTableType } from "../../Types/Table.type";

import "./UserList.css";

export default function UserList() {
    const { userList, isLoading, isError, error, fetchMoreUsers } =  useGetUsersList();

    const userTableData = useMemo(() => {       
        const tableData = userList?.map((user) => {
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                companyName: user.company.name
            }
        })

        return tableData;
    }, [userList, isLoading]);

    const handleScroll = () => {
            fetchMoreUsers();
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const table = Table<UserListTableType>({
        data: { data: userTableData, isLoading, isError, error },
        tableName: 'userList'
    });

    console.log(userList);

    return (
        <div className="user-list-container">
            {table}
        </div>
    )
}