import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import DetailedGraph from '../components/DetailedGraph';
import apiService from '../services/api';

const DetailedView = () => {
    const ticker = useParams().ticker;
    const [series, setseries] = useState([]);
    if(series.length == 0){
        apiService.get(`http://localhost:7000/getSingleStockDetails?stockName=${ticker}`).then(res =>{
            console.log([{data : res.response.data.data}]);
            setseries([{data : res.response.data.data}]);
           }).catch(error => {
            console.log(error.message);
           })
    }
    const options = {
        chart: {
          type: 'candlestick',
          height: 350
        },
        title: {
          text: 'CandleStick Chart',
          align: 'left'
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      };
    return (
        <div>
            <h1 className='text-3xl italic bold text-center underline'>{ticker}</h1>
            <div
                className='w-3/4 mx-auto mt-12'
            >
                <DetailedGraph
                    options={options}
                    series={series}
                />
            </div>
        </div>
    )
}

export default DetailedView