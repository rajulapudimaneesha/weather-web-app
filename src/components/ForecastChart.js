import React, { useEffect, useState } from 'react';
import * as d3 from 'd3'
import { formatTime } from '../utils';


const ForecastChart = ({hourly, dt}) => {
    const [dataNodes, setDataNodes] = useState(null)
    const dateObj = new Date(dt * 1000)
    const day = dateObj.getDay()
    useEffect(() => {
        d3.select("#chart-data svg").remove()
        const nodes = hourly.filter(({dt}) => new Date(dt * 1000).getDay() === day)
            .map(({dt, temp}, index) => {
                return {
                    index,
                    dt,
                    temp,
                    time: formatTime(new Date(dt*1000), true)
                }
            })
        if(!nodes.length) {
            d3.select("#chart-data").html("Data not available")
            return
        } else {
            d3.select("#chart-data").html("")
        }
        var margin = {top: 10, right: 30, bottom: 30, left: 50},
            width = 600 - margin.left - margin.right,
            height = 150 - margin.top - margin.bottom;
        var svg = d3.select("#chart-data")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x = d3.scaleBand()
            .domain(nodes.map(({time}) => time))
            .range([ 0, width ]);
        
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
      
          // Add Y axis
          var y = d3.scaleLinear()
            .domain(d3.extent(nodes, function(d) { return d.temp; }))
            .range([ height, 0 ]);
          svg.append("g")
            .call(d3.axisLeft(y));
      
        const minTemp = d3.min(nodes, function(d) { return d.temp; })
          // Add the area
          svg.append("path")
            .datum(nodes)
            .attr("fill", "#fdd51e")
            .attr("d", d3.area()
              .x(function(d) { return x(d.time) })
              .y0(y(minTemp))
              .y1(function(d) { return y(d.temp) })
            )
            setDataNodes(nodes)
    }, [dt])
    return (
        <div id="chart-data" className="chart-wrap"></div>
    )
}
export default ForecastChart;
