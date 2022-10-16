import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormGroup from '@mui/material/FormGroup'
import { Button, Checkbox, FormControlLabel,Input } from '@mui/material'
import { useState } from 'react'

const MyForm = (props) => {
   let {startDate,setstartDate,endDate,setendDate} = props;
   const [selectedStocks, setselectedStocks] = useState([]);
   const [stocks, setstocks] = useState(['HUL','TCS','ZOMATO','AFFLE']);
   
   const onChangeState = (e)=>{
    const{value , checked} = e.target;
    if(checked){
        setselectedStocks([...selectedStocks,value]);
    }
    else{
        setselectedStocks([selectedStocks.filter((stocks) => stocks !== value)]);
    }
   } 
//    console.log(onChangeState());
   const Submit = (e)=>{
    e.preventDefault();
    console.log({startDate,endDate,selectedStocks});
    console.log("Submit button pressed");
   }


  return (
    <div>
        <form onSubmit={Submit}>
            <FormGroup>
                <FormControl>
                  <FormLabel>Start Date</FormLabel>
                  <Input type="Date" defaultValue={startDate} onChange={e => {setstartDate(e.target.value)}}></Input>

                  <FormLabel>End Date</FormLabel>
                  <Input type="Date" defaultValue={endDate} onChange={e => {setendDate(e.target.value)}}></Input> 
                  <FormHelperText></FormHelperText>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <FormControl >
                <FormLabel>Stocks</FormLabel>
                {
                    stocks.map((stock,index)=>{
                        return (
                            <FormControlLabel key={index} control={<Checkbox value={stock} onChange={onChangeState}/>} label={stock}/>
                        )
                    }) 
                }
                <FormHelperText></FormHelperText>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <Button type="submit" variant="contained" color="success">Submit</Button>
              </FormGroup>
        </form>
    </div>
  )
}

export default MyForm
