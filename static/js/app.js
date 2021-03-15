// read JSON 
d3.json("data/samples.json").then((bellyData) => {
  window.bellyData = bellyData;
  console.log(bellyData);
  var data = bellyData;

  // Add dropdown menu IDs
  var idList = data.names;
  for (var i = 0; i < idList.length; i++) {
    selectBox = d3.select("#selDataset");
    selectBox.append("option").text(idList[i]);
  }

 
  // Updating dashboard with new subject  
  function updateDashboard(index) {

    
    // Horizontal bar chart
    var sampleSubjectOTUs = data.samples[index].otu_ids;
    var sampleSubjectFreq = data.samples[index].sample_values;
    var otuLabels = data.samples[index].otu_labels;
    // console.log(sampleSubjectOTUs)
    var washFrequency = data.metadata[+index].wfreq;
   
    var demoKeys = Object.keys(data.metadata[index]);
    var demoValues = Object.values(data.metadata[index])
    var demographicData = d3.select('#sample-metadata');
    demographicData.html("");

    for (var i = 0; i < demoKeys.length; i++) {

      demographicData.append("p").text(`${demoKeys[i]}: ${demoValues[i]}`);
    };


    // Slice and reverse data for horizontal bar chart
    var topTenOTUS = sampleSubjectOTUs.slice(0, 10).reverse();
    var topTenFreq = sampleSubjectFreq.slice(0, 10).reverse();
    var topTenToolTips = data.samples[0].otu_labels.slice(0, 10).reverse();
    var topTenLabels = topTenOTUS.map((otu => "OTU " + otu));
    var reversedLabels = topTenLabels.reverse();

    // Bar chart trace
    var trace1 = {
      x: topTenFreq,
      y: reversedLabels,
      text: topTenToolTips,
      name: "",
      type: "bar",
      orientation: "h"
    };

    var barData = [trace1];

    
    var layout = {
      title:  "Subject's Top Belly Button OTUs",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 50
      }
    };

    // Add to HTML
    Plotly.newPlot("bar", barData, layout);

    // Bubble chart trace
    trace2 = {
      x: sampleSubjectOTUs,
      y: sampleSubjectFreq,
      text: otuLabels,
      mode: 'markers',
      marker: {
        color: sampleSubjectOTUs,
        size: sampleSubjectFreq
      }
    }

    var bubbleData = [trace2];


    var layout = {
      title: 'Biodiversity Samples',
      showlegend: false,
      height: 600,
      width: 930
    }

  // Add to HTML
    Plotly.newPlot("bubble", bubbleData, layout)


  }

  // Refresh when new subject is selected
  d3.selectAll("#selDataset").on("change", refreshData);



  function refreshData() {
    var dropdownMenu = d3.select("#selDataset");
    var subjectID = dropdownMenu.property("value");
    // console.log(subjectID)

    for (var i = 0; i < data.names.length; i++) {
      if (subjectID === data.names[i]) {
        updateDashboard(i);
        return
      }
    }
  }


 //  Init dashboard
 updateDashboard(0)

});