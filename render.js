const svg = document.getElementById("treeCanvas");

function clearSVG() {
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
}

function drawNode(x, y, value) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 18);
    circle.setAttribute("fill", "#4f46e5");

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y + 5);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "white");
    text.textContent = value;

    svg.appendChild(circle);
    svg.appendChild(text);
}

function drawLine(x1, y1, x2, y2) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "#000");
    svg.appendChild(line);
}

function drawTree(node, x, y, gap) {
    if (!node) return;

    if (node.left) {
        drawLine(x, y, x - gap, y + 70);
        drawTree(node.left, x - gap, y + 70, gap / 2);
    }

    if (node.right) {
        drawLine(x, y, x + gap, y + 70);
        drawTree(node.right, x + gap, y + 70, gap / 2);
    }

    drawNode(x, y, node.value);
}

function renderAVLTree(root) {
    clearSVG();
    if (!root) return;
    drawTree(root, 500, 40, 200);
}
