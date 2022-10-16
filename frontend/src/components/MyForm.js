import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormGroup from '@mui/material/FormGroup'
import { Button, Checkbox, FormControlLabel,Input } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import apiService from '../services/api'

const MyForm = (props) => {
   let {startDate,setstartDate,endDate,setendDate,setmydata} = props;
   const [selectedStocks, setselectedStocks] = useState([]);
   const [stocks, setstocks] = useState([]);
   apiService.get("http://localhost:7000/getListOfAllStocks").then(res =>{

    setstocks(res.response.data.data.slice(0,4));
   }).catch(error => {
    console.log(error.message);
   })
   
   const onChangeState = (e)=>{
    const{value , checked} = e.target;
    if(checked){
        setselectedStocks([...selectedStocks,value]);
    }
    else{
        setselectedStocks([selectedStocks.filter((stocks) => stocks !== value)]);
    }
   } 

   const Submit = (e)=>{
    e.preventDefault();
    apiService.get(`http://localhost:7000/getStockDetails?startTime=${new Date(startDate).getTime()}&endTime=${new Date(endDate).getTime()}&listOfStocks=${selectedStocks.toString()}`)
    .then((res)=>{
        setmydata(res.response.data.data);
        // console.log();
    }).catch(error=>{
        console.log(error.message);
    });

   }


  return (
    <div>
        <form onSubmit={Submit} className="p-10">
            <div className="flex justify-between">
            <FormGroup className="w-1/2 p-4"> 
                <FormControl>
                  <FormLabel>Start Date</FormLabel>
                  <Input type="Date" defaultValue={startDate} onChange={e => {setstartDate(e.target.value)}}></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>End Date</FormLabel>
                  <Input type="Date" defaultValue={endDate} onChange={e => {setendDate(e.target.value)}}></Input> 
                  <FormHelperText></FormHelperText>
                </FormControl>
            </FormGroup>
            <FormGroup className="w-1/2 p-4">
                <FormControl >
                <FormLabel>Stocks</FormLabel>
                <div className="flex flex-wrap"
                     style={{ maxHeight: "150px", overflowY: "scroll" }}>
                {
                    stocks.map((stock,index)=>{
                        return (
                            <FormControlLabel key={index} control={<Checkbox value={stock} onChange={onChangeState}/>} label={stock}/>
                            )
                        }) 
                    }
                </div>
                <FormHelperText></FormHelperText>
                </FormControl>
              </FormGroup>
              <FormGroup  className="flex items-center justify-center">
                <Button type="submit" variant="contained" color="success">Submit</Button>
              </FormGroup>
            </div>
        </form>
    </div>
  )
}

export default MyForm
