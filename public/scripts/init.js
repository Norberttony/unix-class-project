
const cpuCanvas = document.getElementById("dashboard__cpu-graph");
const cpuCtx = cpuCanvas.getContext("2d");
const cpuGraph = new Graph(cpuCtx, [ 10, 25, 30, 44 ]);
cpuGraph.draw();


const socket = io();

socket.on("data", (data) => {
    console.log(data);
});
