import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

const AllUser = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/api/v1/auth/all-users")
          .then((res) => res.json())
          .then((data) => setUsers(data));
    }, [])
    const rows = users?.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    const columns = [
      {
        field: "name",
        headerName: "User Name",
        width: 180,
        editable: false,
        sortable: true,
      },
      {
        field: "email",
        headerName: "User Email",
        width: 250,
        editable: false,
        sortable: true,
      },
      {
        field: "role",
        headerName: "User Role",
        width: 150,
        editable: false,
        sortable: true,
      }
    ];
    return (
      <div className="w-full mx-auto max-w-[422px] md:max-w-full overflow-x-auto">
        <Box sx={{ height: 650, width: "100%" }}>
          <DataGrid
            sx={{ color: `${theme == "dark" ? "white" : "dark"}` }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    );
};

export default AllUser;