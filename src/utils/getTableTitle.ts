import { TableNameKeyType } from "../Types/Table.type"

const TableTitle = {
    'userList': 'User List'
}

export function getTableTitle(tableName: TableNameKeyType) {
    return TableTitle[tableName]
}