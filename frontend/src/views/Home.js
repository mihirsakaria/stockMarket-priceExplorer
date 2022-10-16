
import React, { useState } from 'react'
import Graph from '../components/Graph';
import MyForm from '../components/MyForm';
const Home = () => {
  const [startDate, setstartDate] = useState(new Date().toISOString().slice(0,10));
  const [endDate, setendDate] = useState(new Date().toISOString().slice(0,10));
  const [mydata, setmydata] = useState([]);
  return (
    <div>
      <MyForm 
      startDate ={startDate}
      setstartDate = {setstartDate}
      endDate = {endDate}
      setendDate = {setendDate}
      setmydata = {setmydata}
      >
      </MyForm>
      <hr className='mb-6 border'/>
      <Graph
        mydata={mydata}
      />
    </div>
  )
}

export default Home
