import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'

const Graph = (props) => {
    // const [data, setdata] = useState([])
    const {data} = props.data;
    
    const dataset = [];
    for(let i = 0; i<data.length;i++){
        let obj = {};
        obj.label = data[i]._id;
        obj.data = data[i].closePrice;
        obj.fill=false;
        obj.borderColor="red"
    }
  return (
    <div>
        <h1>
            Graph
        </h1>
        <Line
        data = {{
            labels : data[0].date,
            datasets : dataset
        }}
        />

    </div>
  )
}

export default Graph