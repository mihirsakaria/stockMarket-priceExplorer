import React from 'react'
import {FormGroup} from '@mui/material'
import {FormControlLabel} from '@mui/material'
import {Checkbox, Button, FormControl, FormLabel, FormHelperText} from '@mui/material'
import { useState
 } from 'react'
const Home = () => {
  let submit = (e)=>{
    e.preventDefault();
    
  }
  let list= ['a','b','c'];
  const [stocks, setstocks] = useState([]);
  const [startDate, setstartDate] = useState(new Date().toLocaleDateString())
  const [endDate, setendDate] = useState(new Date().toLocaleDateString())
  console.log(startDate,endDate);
  let handleChange = (event)=>{
    let index = stocks.indexOf(event.target.value);
    if(index == -1){
        setstocks([...stocks,event.target.value]);
    }else{
        setstocks(stocks.filter(stock => stock != event.target.value));
    }
  }
  let  handeDateChange = (e)=>{
    console.log(e.target.value);
  }

  let formLables = [];
  for (let index = 0; index < list.length; index++) {
    formLables.push(<FormControlLabel key={index} control={<Checkbox checked={stocks.includes(list[index])} value={list[index]}  onChange={handleChange} /> } label={list[index]} />)  
  }

    return (
      <form onSubmit={submit}>
        <h1>List of stocks that you want to see data of</h1>
        <FormGroup>
            <FormControl>
              <FormLabel>StartDate</FormLabel>
              <input type="date" value={"2022-04-28"} onChange={handeDateChange}></input>
              <FormLabel>EndDate</FormLabel>
              <input type="date" value={"2022-04-28"} onChange={handeDateChange}></input>
            </FormControl>
        </FormGroup>
        <FormGroup>
            {formLables}
        </FormGroup>
        <FormGroup>
            <Button type="submit" variant="contained" color="success">
              Submit
            </Button>
        </FormGroup>
    </form>
  )
}
export default Home