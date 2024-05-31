import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import  { useEffect, useState } from 'react';

const AllUser = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/api/v1/auth/all-users")
          .then((res) => res.json())
        .then((data) =>{
          console.log(data);
          setUsers(data?.data)
        } 
          
        );
          
    }, [])
    const row = users?.map((user, index) => ({
      ...user, id: index + 1,
    }));
    console.log(row);

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
   
    console.log("Col", columns);
    return (
      <div><div className="w-full mx-auto max-w-[422px] md:max-w-full overflow-x-auto">
      <Box sx={{ height: 650, width: "100%" }}>
        <DataGrid
          // sx={{ color: `${theme == "dark" ? "white" : "dark"}` }}
          rows={row}
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
    </div>
      
    );
};

export default AllUser;