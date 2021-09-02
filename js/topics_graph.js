
        // set the dimensions and margins of the graph
        const margin = {top: 30, right: 30, bottom: 70, left: 60},
            width = 880 - margin.left - margin.right,
            height = 440 - margin.top - margin.bottom;
        
        // append the svg object to the body of the page
        const svg = d3.select("#my_dataviz")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Add title to graph
        svg.append("text")
            .attr("transform","translate(100,0)")
            .attr("x", 100)
            .attr("y", 0)
            .attr("font-size", "26px")
            .text("Popular Topics in 2021")
        
        // Parse the Data
        //d3.csv("/work-data/evdata.csv").then( function(data) {
        d3.csv("/work-data/workshop_planning_data.csv").then( function(data) {

        // X axis
        const x = d3.scaleBand()
          .range([ 0, width ])
          .domain(data.map(d => d.topic))
          .padding(0.2);
        svg.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x))
          .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)") 
            .style("text-anchor", "end");
        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width - 500)
            .attr("y", height + 60)
            .text("Topics");

        
        // Add Y axis
        const y = d3.scaleLinear()
          .domain([0, 400])
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
            .attr("x", d => x(d.topic))
            .attr("y", d => y(d.value))
            //.attr("y", d => y(d.attendees))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", "#007f30")
        svg.selectAll("mybar")
          .data(data)
          .join("rect")
            .attr("x", d => x(d.topic))
            .attr("y", d => y(d.attendees))
            //.attr("y", d => y(d.attendees))
            .attr("width", x.bandwidth()/2)
            .attr("height", d => height - y(d.attendees))
            .attr("fill", "#00d300")
        
        var groups = d3.map(data, function(d){return(d.group)}).keys()    
        var subgroups = data.columns.slice(1)
        var tooltip = d3.select("#my_dataviz")
          .append("div")
          .style("opacity", 0)
          .attr("class", "tooltip")
          .style("background-color", "white")
          .style("border", "solid")
          .style("border-width", "1px")
          .style("border-radius", "5px")
          .style("padding", "10px")
        
          var mouseover = function(d) {
            var subgroupName = d3.select(this.parentNode).datum().key;
            var subgroupValue = d.data[subgroupName];
            tooltip
                .html("subgroup: " + subgroupName + "<br>" + "Value: " + subgroupValue)
                .style("opacity", 1)
          }
          var mousemove = function(d) {
            tooltip
              .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
              .style("top", (d3.mouse(this)[1]) + "px")
          }
          var mouseleave = function(d) {
            tooltip
              .style("opacity", 0)
          }

        })
        