import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);

const Graph = (props) => {
    const mydata = props.mydata;
    const COLORS = [[120,28,129],
    [64,67,153],
    [72,139,194],
    [107,178,140],
    [159,190,87],
    [210,179,63],
    [231,126,49],
    [217,33,32]]
    // console.log(data);
    let label = [];
    let dataset = [];
    for(let i = 0; i<mydata.length;i++){
        label = mydata[i].date.map((date) => date.split("T")[0]);
        let obj = {};
        obj.label = mydata[i]._id;
        obj.data = mydata[i].closePrice;
        obj.fill=false;
        obj.borderColor='rgb('+COLORS[i%7][0]+','+COLORS[i%7][1]+','+COLORS[i%7][2]+')'
        dataset.push(obj);
    }
    console.log(dataset,label);
  return (
    <div className="w-1/2 m-auto">
        <Line
        data = {{
            labels : label,
            datasets : dataset,
        }}
        options={{
            tooltips: {
                mode: 'index',
                intersect: false,
            },
        }}
        />

    </div>
  )
}

export default Graph