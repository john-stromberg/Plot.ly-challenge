// data
var samples_data =  "data/samples.json"
// use d3 to read in data 
d3.json(samples_data).then((data) => {
    var data = data;
    console.log(data);
    // create samples variable
    var samples = data.samples;
    console.log(samples);
    // create metadata variable 
    var metadata = data.metadata;
    console.log(metadata);
    
    // create dropdown menu variable holding list of sample ids
    var dropdown = d3.select("#select");
    samples.forEach((sample) => {
        dropdown.append("option").text(sample.id)
        console.log(sample);
    });


    // create variable representing selected dropdown item value
    var selectedId = d3.select("#selDataset");
    var idValue = selectedId.property("value");
    console.log(selectedId);
    console.log(idValue);


    function buildCharts(idValue) {
        // get current selection and assign value to variable 
        var selectedId = d3.select("#selDataset");
        console.log(selectedId);
        var idValue = selectedId.property("value");
        console.log(idValue);
        var sample = sample.find(value => value.id == idValue);
        // create variable to hold trace data to display top 10 OTUs from the selected individual 
        var values = sample.sample_values.slice(0,10);
        var labels = sample.otu_ids.slice(0,10);
        var hovertext = sample.otu_labels.slice(0,10);
        var trace = {
            x: values,
            y: labels,
            type: "bar",
            orientation: "h",
            text: hovertext,
        };
        var bar_data = [trace];
        var bar_layout = {
            xaxis: { title: "Sample Values"},
            yaxis: { type: "category", side: "top"},
            
        }
        Plotly.newPlot("bar", bar_data, bar_layout);

        var trace2 = {
            x: sample.otu_ids,
            y: sample.sample_values,
            marker: {
                size: sample.sample_values,
                color: sample.otu_ids
            },
            text: sample.otu_lables,
            mode: "markers"
        }

        var bubble_data = [trace2]
        var bubble_layout = {
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample Values"}
        }
        Plotly.newPLot("bubble", bubble_data, bubble_layout)
    }

    function buildMetadata(idValue) {
        var selectedId = d3.select("#selDataset");
        var idValue = selectedId.property("value");

        var sample = metadata.find(value => value.id == idValue);

        var panel = d3.select("#sample-metadata")
        panel.html("");

        Object.entries(sample).forEach(([key,value]) => {
            var row = sampleData.append("p");
            row.text(`${key}:${value}`)
        });
    }

    function init() {
        
    }


    buildCharts(idValue);
    buildMetadata(idValue);




});






