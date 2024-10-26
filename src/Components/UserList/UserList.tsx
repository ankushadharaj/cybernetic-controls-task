import React from "react";

import { useGetUsersList } from "../../Store/Users/users.hooks";

export default function UserList() {
    const response =  useGetUsersList();

    console.log(response);
    return (
        <div>

        </div>
    )
}