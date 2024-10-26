import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../Types/Store.type";
import { getUsersListRequest } from "./users.action";

function useGetUsersList() {
    const dispatch = useDispatch();
    const { data: userList, isLoading, isError, error } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch({ type: getUsersListRequest.type });
    },[dispatch]);

    return { userList, isLoading, isError, error };
}

export { useGetUsersList };