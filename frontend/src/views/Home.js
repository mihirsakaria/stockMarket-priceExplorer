
import React, { useState } from 'react'
import MyForm from '../components/MyForm';
const Home = () => {
  const [startDate, setstartDate] = useState(new Date().toISOString().slice(0,10));
  const [endDate, setendDate] = useState(new Date().toISOString().slice(0,10));
  const [data, setdata] = useState([]);
  return (
    <div>
      <MyForm 
      startDate ={startDate}
      setstartDate = {setstartDate}
      endDate = {endDate}
      setendDate = {setendDate}
      setdata = {setdata}
      >
      </MyForm>
    </div>
  )
}

export default Home
