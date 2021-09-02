       
       // set the dimensions and margins of the graph
        const margin = {top: 30, right: 30, bottom: 70, left: 60},
            width = 880 - margin.left - margin.right,
            height = 540 - margin.top - margin.bottom;
        
        // append the svg object to the body of the page
        const svg = d3.select("#my_dataviz")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);


        svg.append("text")
          .attr("transform","translate(100,0)")
          .attr("x", 160)
          .attr("y", 0)
          .attr("font-size", "26px")
          .text("Popular Workshops in 2021")
        
        // Parse the Data
        d3.csv("work-data/evdata.csv").then( function(data) {
        //d3.csv("/work-data/workshop_planning_data.csv").then( function(data) {

          var myColor = d3.scaleSequential()
            .interpolator(d3.interpolateInferno)
            .domain([1,100])

          /*
          data.sort(function(a, b) {
            return d3.descending(a.value, b.value)
          })   
          x.domain(data.map(function(d) {
            return d.value;
          }));  */


        // create a tooltip
        var Tooltip = d3.select("#div_template")
          .append("div")
          .style("opacity", 0)
          .attr("class", "tooltip")
          .style("background-color", "white")
          .style("border", "solid")
          .style("border-width", "2px")
          .style("border-radius", "5px")
          .style("padding", "5px")

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(d) {
          Tooltip
            .style("opacity", 1)
          d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
        }
        var mousemove = function(d) {
          Tooltip
            .html("The exact value of<br>this cell is: " + d.value)
            .style("left", (d3.mouse(this)[0]+70) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
        }
        var mouseleave = function(d) {
          Tooltip
            .style("opacity", 0)
          d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
        }

        // X axis
        const x = d3.scaleBand()
          .range([ 0, width ])
          .domain(data.map(d => d.name))
          .padding(0.3);
        svg.append("g")
          .attr("transform", `translate(12, ${height})`)
          .call(d3.axisBottom(x))
          .selectAll("text")
            .attr("transform", "translate(0,7)rotate(90)")
            .style("text-anchor", "start");
        
        // Add Y axis
        const y = d3.scaleLinear()
          .domain([0, 350])
          .range([ height, 0]);
        svg.append("g")
          .call(d3.axisLeft(y));
          svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Number of People");

        // Bars
        svg.selectAll("mybar")
          .data(data)
          .join("rect")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", "#69b3a2")
        
        })