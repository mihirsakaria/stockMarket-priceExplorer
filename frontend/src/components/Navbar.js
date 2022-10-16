import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiService from '../services/api';

// Creates a simple navbar
const Navbar = () => {
  const [stocks, setstocks] = useState([]);
  
  if(stocks.length == 0){
    apiService.get("http://localhost:7000/getListOfAllStocks").then(res =>{
      console.log(res);
      setstocks(res.response.data.data.slice(0,4));
     }).catch(error => {
      console.log(error.message);
     })
  }
  const navigate = useNavigate();

  return (
    <div  className="flex justify-between items-center p-4 bg-red-400 text-white">
        <h1 className='text-center text-3xl'>Stock View</h1>
        <Autocomplete
          className='w-2/12 bg-white rounded text-black'
          options={stocks}
          renderInput={(params) => <TextField {...params} label="Stocks" />}
          onChange={(e, value) => {
            navigate(`/${value}`);
          }}
        />
    </div>
  )
}

export default Navbar