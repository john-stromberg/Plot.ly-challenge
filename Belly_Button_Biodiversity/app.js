
function getMetaData() {
    var metaDataurl = `/metadata/${sample}`;
    d3.json(metaDataurl).then(function(sample){
        var sampleData = d3.select("#sample-metadata");
        sampleData.html("");
        Object.entries(sample).forEach(function([key,value]) {
            var row = sampleData.append("p");
            row.text(`${key}:${value}`)
            console.log(key);
        })
    });
}


function buildHbar() {
    d3.json("samples.json").then(function(data) {
        var values = data.sample_values.slice(0,10);
        var labels = data.otu_ids.slice(0,10);
        var hovertext = data.otu_labels.slice(0,10);

        var barChart = [{
            type: "bar",
            values: values,
            labels: labels,
            hovertext: hovertext,
            orientation: "h"
        }];
        Plotly.newPlot("bar", barChart);
    });
}

function buildBubble() {
    d3.json("samples.json").then(function(data){
        var x_values = data.otu_ids;
        var y_values = data.sample_values;
        var marker_size = data.sample_values;
        var marker_colors = data.otu_ids;
        var text_values = data.otu_labels;

        var bubble_chart = {
            x: x_values,
            y: y_values,
            texts: text_values,
            mode: "markers",
            marker: {
                size: marker_size,
                color: marker_colors,
            } 
        };

        var data = [bubble_chart];
        var layout = {
            xaxis: {title: "OTU ID"}
        };
        Plotly.newPlot("bubble", data, layout)
    });
}

function init() {
    var dropdown = d3.select("#selDataset");
    d3.json("/names").then((sampleNames) => {
        sampleNames.forEach((sample) => {
            dropdown.append("option").text(sample).property("value", sample);
        });
        
        const firstSample = sampleNames[0];
        getMetaData(firstSample);
        
    });
}

function optionChanged(newSample) {
    getMetaData(newSample);
}

init();
buildBubble();
buildHbar();