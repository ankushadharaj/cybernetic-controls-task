# Cybernetic Controls Task

[Application](https://ankushadharaj.github.io/cybernetic-controls-task/)

[GitHub repository](https://github.com/ankushadharaj/cybernetic-controls-task)

## User Listing and Searching Application

This is a React application that lists and searches users using the DummyJSON API. The application allows users to view a list of all users, search for users by name, and view detailed information about each user.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Best Practices](#best-practices)

## Features
- Displays a list of all users with the following fields:
  - First Name
  - Last Name
  - Email
  - Phone
  - Company Name
- Search functionality to filter users by name.
- Clickable user entries that display detailed user information, including:
  - First Name
  - Last Name
  - Email
  - Phone
  - Company Name
  - Company Address
  - Company Department
  - Company Title

## Technologies Used
- **React**: A JavaScript library for building user interfaces. [Link](https://react.dev/)
- **TypeScript**: TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. [Link](https://www.typescriptlang.org/)
- **Redux**: A state management library for managing the application state. [Link](https://redux.js.org/)
- **Sagas**: A middleware library for managing side effects in Redux applications, enabling the handling of complex asynchronous flows such as data fetching, while providing a more manageable way to work with asynchronous logic. [Link](https://redux-saga.js.org/)
- **Axios**: A promise-based HTTP client for making API requests. [Link](https://axios-http.com/docs/intro)
- **Vite**:  A fast build tool and development server that provides an optimized environment for modern web applications, enabling rapid development with hot module replacement. [Link](https://vite.dev/)

## Getting Started

To get started with the application, follow these steps:

1. **Clone the repository**:
  ```
   gh repo clone ankushadharaj/cybernetic-controls-task
   cd cybernetic-controls-task
  ```

2. **Install Dependencies**: 
  ```
  npm install
  ```

3. **Start Application**: 
  ```
  npm run dev
  ```
4. **Build Application**:
  ```
  npm run build
  ```
5. **Publishing Application**: 
  ```
  npm run deploy
  ```


## API Endpoints

The application interacts with the following DummyJSON API endpoint:
  * **GetUsers**: https://dummyjson.com/users

Base URL: `https://dummyjson.com/`is configured in axios client in 'src/Axios/axiosClient.ts'. 
When fetching the data only th path needs to be used 
  ```
  axiosClient.get('users')
  ```

## Usage
* Upon loading, the application will fetch and display a list of users.
* Use the search bar to filter users by their first or last name.
* Click on a user to view detailed information.

## Best Practices
* This code follows the SOILD principle.
* Ensured state management is handled properly using Redux.
* Sub components such as the table can be used across the application to create other lists/tables in any page

### Example Useage for:
#### Table:
Configuration:
 
  Before using this component, configure the column names and column IDs in the 
  'src/constants/TableColumns.constants.ts' file. The keys in the data objects must match
  the defined IDs for the table to display correctly.
 
  Example configuration in 'TableColumns.constants.ts':
  ```
    export const TABLE_COLUMNS = {
        usersList: [
            { columnId: 'id', columnName: 'User ID' },
            { columnId: 'firstName', columnId: 'First Name' },
            // Add more columns as needed
        ],
        // Add other tables as needed
    };
  ```
  
  Add the key on TABLE_COLUMNS  as a key type in 'src/Types/Table.type/ts' for `TableNameKeyType`
  Example: 
  ```
  TableNameKeyType = 'userList' | 'youNewList' | so on
  ```

  
  Usage:
 
  To use the Table component, follow these steps:
 
  1. Import the Table Component:
     import Table from '.src/Components/Table';
 
  2. Prepare Your Data:
     const userData = [
         { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
         { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
         // Add more user objects as needed
     ];
 
  3. Render the Table Component:
     <Table data={userData} tableName="users" />
 
  Additional Features:
 
  This component may support additional features such as:
  - Search functionality
  - Sorting of columns
  - Pagination for large datasets
  
  Each feature may require specific props or additional configuration.
