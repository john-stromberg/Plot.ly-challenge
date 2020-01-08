






// create function to display sample metadata
function getMetaData(sample) {
    var metaDataurl = `/metadata/${sample}`;
    // use d3 to read in sample data
    d3.json(metaDataurl).then(function(sample){
        console.log(sample);
        // use d3 to select panel in index
        var sampleData = d3.select("#sample-metadata");
        // clear existing metadata
        sampleData.html("");
        // add each key/value pair to the panel
        Object.entries(sample).forEach(([key,value]) => {
            var row = sampleData.append("p");
            row.text(`${key}:${value}`)
        })
    });
}

