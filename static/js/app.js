// Read JSON file using D3
d3.json("samples.json").then(function(sample){
    console.log(sample)
});

// Create a horizontal Bar Chart with dropdown menu to display top 10 OTUs found in that individual


function createPlots(id) {
    d3.json("samples.json").then(function(sample){
        console.log(sample)
    })

    var samples = data.samples.filter(d => d.id.toString() ---id)[0];

    console.log(samples);



}


