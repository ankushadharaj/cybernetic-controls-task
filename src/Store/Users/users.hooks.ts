import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../Types/Store.type";
import { getUsersListRequest } from "./users.action";

function useGetUsersList() {
    const dispatch = useDispatch();
    const { data: userList, isLoading, isError, error, hasMore } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (!userList?.length) {
            dispatch(getUsersListRequest());
        }
    },[dispatch]);

    const fetchMoreUsers = () => {
        if (hasMore) {
            dispatch(getUsersListRequest());
        }
    };

    return { userList, isLoading, isError, error, fetchMoreUsers };
}

export { useGetUsersList };