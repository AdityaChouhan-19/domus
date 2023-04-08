import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { auth } from '../../../../api/auth';
import { useQuery, useQueryClient } from 'react-query';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import styles from './AdminUserListPage.module.css';
import { getUsers } from '../../../../api/admin';
import { Button } from '@mui/material';


export default function AdminHomePage(){


    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
        {
          field: 'firstname',
          headerName: 'First name',
          width: 110,
          editable: false,
        },
        {
          field: 'lastname',
          headerName: 'Last name',
          width: 110,
          editable: false,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 180,
          editable: false,
        },
        {
            field: 'userType',
            headerName: 'User type',
            width: 100,
            editable: false,
        },
        {
            field: 'online',
            headerName: 'Online',
            width: 100,
            editable: false,
        },
        {
            field: 'banned',
            headerName: 'Banned',
            width: 100,
            editable: false,
        }
        // {
        //   field: 'fullName',
        //   headerName: 'Full name',
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
        //   width: 160,
        //   valueGetter: (params) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
      ];
    
    //   const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    //   ];
    
    

      

    const client = useQueryClient();
    const auth = client.getQueryData('auth');

    const redirect = useNavigate();

    console.log(auth);
    useEffect(()=>{
        if(!auth?.isAuth || !auth?.isAdmin) return redirect('/')


    })

    const { isLoading, error, data, refetch } = useQuery('users', ()=>{
        // let body = {
        //   nearby : nearBy,
        //   distance : distance,
        //   minPrice : minPrice,
        //   maxPrice : maxPrice
        // }
        return getUsers();
      })
      if (isLoading) return 'Loading...'
      if (error) return 'An error has occurred: ' + error.message
      console.log(data);
      let copy = data;
      if(data){
          
          //copy[0].id = 1;
          copy.map((item, i) => {
            item.id = item._id;
            if(item.role === 0){
                item.userType = 'User';
            }else{
                item.userType = 'Admin';
            }
            if(item.token === ''){
                item.online = 'OFF';
            }else{
                item.online = 'ON';
            }
            if(item.isBanned === 'N'){
                item.banned = '';
            }
            else{
                item.banned = 'Banned';
            }
          })
      }

    return (
        <>
            <div className={styles.searchContainer}>
                <Button onClick={()=>{redirect('/admin/userlist')}} style={{color: 'blue', backgroundColor: 'snow'}}>User List</Button>
                <Button onClick={()=>{redirect('/admin/reportedlist')}} style={{color: 'blue', backgroundColor: 'snow'}}>Reported Postings</Button>
                <Button onClick={()=>{redirect('/admin/bannedlist')}} style={{color: 'blue', backgroundColor: 'snow'}}>Banned Postings</Button>
            </div>
            <Box className={styles.usersBox} sx={{ height: 400, width: '60%' }}>
                <DataGrid
                    rows={copy}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },
                    },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </>
    )
}
