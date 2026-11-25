const canvas = document.getElementById("g");
const ctx = canvas.getContext("2d");

const output = document.getElementById("out");
const routeText = document.getElementById("route");

const nodes = [
    [0.08, 0.2],
    [0.28, 0.1],
    [0.52, 0.2],
    [0.8, 0.1],
    [0.2, 0.45],
    [0.45, 0.42],
    [0.68, 0.42],
    [0.92, 0.48],
    [0.1, 0.78],
    [0.33, 0.72],
    [0.56, 0.7],
    [0.8, 0.78],
    [0.26, 0.94],
    [0.64, 0.92]
];


// Labels for nodes

const labels = "ABCDEFGHIJKLMN";
const edges = [];

// Adjacency list
const adjacencyList = nodes.map(() => []);
for (let i = 0; i < nodes.length; i++) {

    for (let j = i + 1; j < nodes.length; j++) {

        const xDistance =
            (nodes[i][0] - nodes[j][0]) * 1.33;

        const yDistance =
            nodes[i][1] - nodes[j][1];

        const distance =
            Math.hypot(xDistance, yDistance);


        // Connect nodes if their distance is less than 0.36

        if (distance < 0.36) {

            const weight = Math.round(distance * 100);

            // Store the connection
            edges.push([i, j, weight]);

            // Store connections in adjacency list
            adjacencyList[i].push([j, weight]);
            adjacencyList[j].push([i, weight]);

        }

    }

}
let targetNode = 13;

let shortestPath = [];

let shortestPathCost = 0;

let progress = 1;

let canvasWidth;
let canvasHeight;

function getCSSVariable(name) {

    return getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();

}

const reducedMotion =
    matchMedia("(prefers-reduced-motion: reduce)").matches;
function findShortestPath(target) {

    // Distance from starting node to every node
    const distances = nodes.map(() => Infinity);

    // Previous node in shortest path
    const previous = nodes.map(() => -1);

    // Track visited nodes
    const visited = nodes.map(() => false);
    // Starting node is A (index 0)
    distances[0] = 0;
    // Process all nodes
    for (let count = 0; count < nodes.length; count++) {

        let currentNode = -1;

        for (let i = 0; i < nodes.length; i++) {

            if (
                !visited[i] &&
                (
                    currentNode === -1 ||
                    distances[i] < distances[currentNode]
                )
            ) {

                currentNode = i;

            }

        }


        // Stop if no reachable node remains

        if (
            currentNode === -1 ||
            distances[currentNode] === Infinity
        ) {

            break;

        }
        visited[currentNode] = true;
        adjacencyList[currentNode].forEach(function (connection) {

            const neighbor = connection[0];
            const weight = connection[1];

            const newDistance =
                distances[currentNode] + weight;

            if (newDistance < distances[neighbor]) {

                distances[neighbor] = newDistance;

                previous[neighbor] = currentNode;

            }

        });

    }

    const path = [];

    let current = target;

    while (current !== -1) {

        path.unshift(current);

        current = previous[current];

    }
    return [path, distances[target]];

}
function selectNode(nodeIndex) {

    targetNode = nodeIndex;

    const result = findShortestPath(nodeIndex);

    shortestPath = result[0];

    shortestPathCost = result[1];
    if (shortestPathCost === Infinity) {

        output.textContent = "No route";

        routeText.textContent =
            "No path available to this destination.";

    } else {

        output.textContent = shortestPathCost;


        const route = shortestPath.map(function (node) {

            return labels[node];

        });

        routeText.textContent =
            "Route: " + route.join(" → ");

    }

    progress = reducedMotion ? 1 : 0;
    if (!reducedMotion) {

        requestAnimationFrame(animateRoute);

    }

}

function resizeCanvas() {

    const rectangle = canvas.getBoundingClientRect();

    const pixelRatio = window.devicePixelRatio || 1;


    canvasWidth = rectangle.width;

    canvasHeight = rectangle.height;

    canvas.width = canvasWidth * pixelRatio;

    canvas.height = canvasHeight * pixelRatio;
    ctx.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
    );


    // Redraw graph

    drawGraph();

}

function getNodePosition(index) {

    const node = nodes[index];


    const x =
        node[0] * (canvasWidth - 60) + 30;

    const y =
        node[1] * (canvasHeight - 60) + 30;


    return [x, y];

}

function drawGraph() {

    // Clear canvas

    ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    // Get colors from CSS

    const lineColor = getCSSVariable("--line");

    const accentColor = getCSSVariable("--acc");

    const textColor = getCSSVariable("--ink");

    const startColor = getCSSVariable("--acc2");

    const panelColor = getCSSVariable("--panel");

    edges.forEach(function (edge) {

        const start = getNodePosition(edge[0]);

        const end = getNodePosition(edge[1]);


        ctx.strokeStyle = lineColor;

        ctx.lineWidth = 2;


        ctx.beginPath();

        ctx.moveTo(start[0], start[1]);

        ctx.lineTo(end[0], end[1]);

        ctx.stroke();

    });
    const numberOfSegments =
        shortestPath.length - 1;


    const completedSegments =
        progress * numberOfSegments;


    ctx.lineWidth = 5;

    ctx.strokeStyle = accentColor;

    ctx.lineCap = "round";

    for (let i = 0; i < numberOfSegments; i++) {

        const amount = Math.max(
            0,
            Math.min(1, completedSegments - i)
        );


        if (amount <= 0) {

            break;

        }


        const start =
            getNodePosition(shortestPath[i]);

        const end =
            getNodePosition(shortestPath[i + 1]);


        // Calculate animation position

        const currentX =
            start[0] + (end[0] - start[0]) * amount;

        const currentY =
            start[1] + (end[1] - start[1]) * amount;


        ctx.beginPath();

        ctx.moveTo(start[0], start[1]);

        ctx.lineTo(currentX, currentY);

        ctx.stroke();

    }

    ctx.font = '500 13px "IBM Plex Sans", sans-serif';

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";


    nodes.forEach(function (node, index) {

        const position =
            getNodePosition(index);


        const x = position[0];

        const y = position[1];


        // Check whether node is part of the selected route

        const pathPosition =
            shortestPath.indexOf(index);


        const isOnPath =
            pathPosition !== -1 &&
            pathPosition <= completedSegments;


        // Node radius

        const radius =
            index === 0 || index === targetNode
                ? 17
                : 14;


        // Draw node circle

        ctx.beginPath();

        ctx.arc(x, y, radius, 0, Math.PI * 2);


        // Choose node color

        if (index === 0) {

            ctx.fillStyle = startColor;

        } else if (isOnPath) {

            ctx.fillStyle = accentColor;

        } else {

            ctx.fillStyle = panelColor;

        }


        ctx.fill();


        // Node border

        ctx.lineWidth = 2;


        if (index === 0) {

            ctx.strokeStyle = startColor;

        } else if (isOnPath) {

            ctx.strokeStyle = accentColor;

        } else {

            ctx.strokeStyle = textColor;

        }


        ctx.stroke();


        // Node label

        if (index === 0) {

            ctx.fillStyle = "#ffffff";

        } else if (isOnPath) {

            ctx.fillStyle = "#171A4A";

        } else {

            ctx.fillStyle = textColor;

        }


        ctx.fillText(
            labels[index],
            x,
            y + 0.5
        );

    });

}

function animateRoute() {

    // Increase animation progress

    progress = Math.min(
        1,
        progress + 0.035
    );


    // Redraw graph

    drawGraph();


    // Continue animation until complete

    if (progress < 1) {

        requestAnimationFrame(animateRoute);

    }

}

canvas.addEventListener("click", function (event) {

    const rectangle =
        canvas.getBoundingClientRect();


    // Mouse position

    const mouseX =
        event.clientX - rectangle.left;

    const mouseY =
        event.clientY - rectangle.top;


    let selectedNode = -1;

    let closestDistance = 34;


    // Check all nodes except starting node A

    for (let i = 1; i < nodes.length; i++) {

        const position =
            getNodePosition(i);


        const distance =
            Math.hypot(
                position[0] - mouseX,
                position[1] - mouseY
            );


        // Find closest node to click

        if (distance < closestDistance) {

            closestDistance = distance;

            selectedNode = i;

        }

    }


    // Select node if clicked

    if (selectedNode > 0) {

        selectNode(selectedNode);

    }

});

window.addEventListener("resize", resizeCanvas);


const darkMode = matchMedia(
    "(prefers-color-scheme: dark)"
);


if (darkMode.addEventListener) {

    darkMode.addEventListener(
        "change",
        drawGraph
    );

}

resizeCanvas();


// Select node N initially

selectNode(13);
