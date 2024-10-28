import { TableNameKeyType } from "../Types/Table.type";

export const TABLE_COLUMNS = {
    'userList': [
        { columnId: 'id', columnName: 'ID' },
        { columnId: 'firstName', columnName: 'First Name'},
        { columnId: 'lastName', columnName: 'Last Name'},
        { columnId: 'email', columnName: 'Email'},
        { columnId: 'phone', columnName: 'Phone No'},
        { columnId: 'companyName', columnName: 'Company'},
    ]
}

export function getTableColumns(tableName: TableNameKeyType){
    return TABLE_COLUMNS[tableName];
}