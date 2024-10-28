import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../Types/Store.type";
import { getUsersListRequest } from "./users.action";

/**
 * Hooks
 * 
 * Create custom hooks required in the component to fetch and manage data. 
 * Each hook should encapsulate logic for fetching data, handling loading and error states, 
 * and transforming the data as needed for the component.
 * 
 * The return type of each hook should be:
 * 
 * @returns {
 *      data: Array<Object>,    // The fetched data as an array of objects
*       isLoading: boolean,     // Indicates if the data is currently being loaded
*       isError: boolean,       // Indicates if there was an error during the fetch
*       error: any,             // Contains error details if an error occurred
*       fetchMore: () => void,  // Function to fetch more based on scrolling or any other user action for paginated calls
*       hasMore: boolean,       // Used to fetch data after the initial fetch request
* }
* 
* Each hook can be used to dispatch an action to fetch data or utilize other hooks 
* to mutate the data into the required format for a particular component. 
 */


function useGetUsersList() {
    const dispatch = useDispatch();
    const { data: userList, isLoading, isError, error, hasMore } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (!userList?.length) {
            dispatch(getUsersListRequest());
        }
    },[dispatch, hasMore]);

    const fetchMoreUsers = () => {
        if (hasMore) {
            dispatch(getUsersListRequest());
        }
    };

    return { userList, isLoading, isError, error, fetchMoreUsers, hasMore };
}

export { useGetUsersList };