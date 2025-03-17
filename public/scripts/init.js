
const dashboard__containerElem = document.getElementById("dashboard__container");

const graphs = {};

const socket = io();

socket.on("data", (data) => {
    for (const line of data.split("\n")){
        const cmd = line.split(" ");
        const name = cmd.shift();

        if (!graphs[name])
            graphs[name] = {};

        for (const prop of cmd){
            const [ propName, val ] = prop.split("=");
            if (propName.endsWith("_max")){
                const graph = graphs[name][propName.replace("_max", "")];
                if (graph){
                    graph.maxValue = val;
                    graph.draw();
                }
            }else{
                if (!graphs[name][propName]){
                    const elem = dynamicGraph(name, propName);
                    dashboard__containerElem.appendChild(elem);

                    const canv = elem.getElementsByTagName("canvas")[0];
                    const graph = new Graph(canv.getContext("2d"), []);

                    graphs[name][propName] = graph;

                    if (propName.indexOf("percent") > -1)
                        graph.maxValue = 100;
                }
                const graph = graphs[name][propName];
                graph.data.push(parseFloat(val));
                if (graph.data.length > 100)
                    graph.data.shift();
                graph.draw();
            }
        }
    }
});

function dynamicGraph(name, metric){
    name = name.toLowerCase();
    metric = metric.toLowerCase();
    const div = document.createElement("div");
    div.innerHTML = `
<div class = "dashboard__${name}">
    <p>${name.toUpperCase()} ${metric.toUpperCase()}</p>
    <div class = "dashboard__graph-container">
        <canvas id = "dashboard__${name}-${metric}-graph" width = 500 height = 300></canvas>
    </div>
</div>`;

    return div;
}
