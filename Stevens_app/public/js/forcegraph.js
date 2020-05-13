// ajax call to get object

var profObj;
$(document).ready(function(){
    
    $.ajax({
      type: 'GET',
      contentType: 'application/json',
      url: 'http://localhost:4000/getAll',
      async: false,						
      success: function(resData){
        profObj = resData;  
      }
    });



// object building for the D3 force
    
  var finalData = 
  {
    nodes:[],
    links:[]

  }


    dict = {}
    finalSpec = []
    finalData.nodes.push({"id": "Professors", "group": 1})
    finalData.nodes.push({"id": "Faculty", "group": 2})
    finalData.nodes.push({"id": "Adjunct", "group": 2})

    finalData.links.push({"source": "Professors", "target": "Faculty", "value": 5})
    finalData.links.push({"source": "Professors", "target": "Adjunct", "value": 5})


    for(i = 0; i<profObj.faculty.length; i++){
      facName= {"id": profObj.faculty[i].firstname +" "+ profObj.faculty[i].lastname, "group": 3}
      spec = profObj.faculty[i].speciality
        finalData.nodes.push(facName)
    }

    for(i = 0; i<profObj.adjunct.length; i++){
      adjName= {"id": profObj.adjunct[i].firstname +" "+ profObj.adjunct[i].lastname, "group": 4}
      spec = profObj.adjunct[i].speciality
      finalData.nodes.push(adjName)
    }

    for(i = 0; i<profObj.faculty.length; i++){
      spec = profObj.faculty[i].speciality

    
        for(j = 0; j<spec.length; j++){
          finalSpec.push(spec[j])

        }
    }

    
    for(i = 0; i<profObj.adjunct.length; i++){
      spec = profObj.adjunct[i].speciality

    
        for(j = 0; j<spec.length; j++){
          finalSpec.push(spec[j])
        }
    }


    var uniqueSpecs = [];
    $.each(finalSpec, function(i, el){
        if($.inArray(el, uniqueSpecs) === -1) uniqueSpecs.push(el);
    });

    for(i = 0; i<uniqueSpecs.length; i++)
      finalData.nodes.push({"id": uniqueSpecs[i] , "group": 4})



    for(i = 0; i<profObj.faculty.length; i++){
      spec = profObj.faculty[i].speciality
      for(j = 0; j<spec.length; j++){
        linkName= {"source": profObj.faculty[i].firstname +" "+ profObj.faculty[i].lastname, "target": spec[j], "value": 5}
        finalData.links.push(linkName)
      }
    }

    for(i = 0; i<profObj.adjunct.length; i++){
      spec = profObj.adjunct[i].speciality
      for(j = 0; j<spec.length; j++){
        linkName= {"source": profObj.adjunct[i].firstname +" "+ profObj.adjunct[i].lastname, "target": spec[j], "value": 5}
        finalData.links.push(linkName)
      }
    }
    
    for(i = 0; i<profObj.faculty.length; i++){
        linkName= {"source": "Faculty", "target": profObj.faculty[i].firstname +" "+ profObj.faculty[i].lastname, "value": 5}
        finalData.links.push(linkName)
      }

    for(i = 0; i<profObj.adjunct.length; i++){
      linkName= {"source": "Adjunct", "target": profObj.adjunct[i].firstname +" "+ profObj.adjunct[i].lastname, "value": 5}
      finalData.links.push(linkName)
    }
    console.log(finalData);


// Force graph code from d3 js

      var svg = d3.select("svg")
      .call(d3.zoom().on("zoom", function () {
        svg.attr("transform", d3.event.transform)
      })),
      width = +svg.attr("width"),
      height = +svg.attr("height");

  var color = d3.scaleOrdinal(d3.schemeCategory20);
  
  d3.json("public/js/index.json", function(error, graph) {
      if (error) throw error;
      console.log(graph);
      

  var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));


    var link = svg.append("g")
        .attr("class", "links")
      .selectAll("line")
      .data(finalData.links)
      .enter().append("line")
        .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

    var node = svg.append("g")
        .attr("class", "nodes")
      .selectAll("g")
      .data(finalData.nodes)
      .enter().append("g")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      
    var circles = node.append("circle")
        .attr("r", 6)
        .attr("fill", function(d) { return color(d.group); })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged));
            // .on("end", dragended));

    var lables = node.append("text")
        .text(function(d) {
          return d.id;
        })
        .attr('x', 6)
        .attr('y', 3);

    node.append("title")
        .text(function(d) { return d.id; });

    simulation
        .nodes(finalData.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(finalData.links);

    function ticked() {
      link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node
          .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
          })
    }


  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

// function to blow out nodes

  function mouseover() {
    d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 12);
  }
  function mouseout() {
    d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 6);
  }

  // function dragended(d) {
  //   if (!d3.event.active) simulation.alphaTarget(0);
  //   d.fx = null;
  //   d.fy = null;
  // }
})
});

  



    

