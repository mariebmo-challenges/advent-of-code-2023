export function A(input : string) : number {

    var directions = mapNodes(input);
    var currentNode = directions.nodes.find(x => x.value === 'AAA');
    var endpointNode = directions.nodes.find(x => x.value === 'ZZZ');;

    if(!currentNode || !endpointNode) {
        return 0;
    }

    var directionIndex = 0;
    var directionCount = 0;

    while (currentNode.value !== endpointNode.value && directionCount < 99999) {
        if(directionIndex >= directions.directions.length) {
            directionIndex = 0;
        }
        var direction = directions.directions[directionIndex];
        if (direction === Direction.Left && currentNode.left) {
            currentNode = currentNode.left;
        } else if (direction === Direction.Right && currentNode.right) {
            currentNode = currentNode.right;
        }

        directionIndex++;
        directionCount++;
    }

    return directionCount;
}

export function B(input : string) : number {

    return 0;
}

function mapNodes(input: string)  : Directions {
    var inputLines = input.split("\n");
    var directions : Directions = { directions: [], nodes: [] };
    const firstLine = inputLines[0].split("");
    directions.directions = firstLine.map(x => x === "L" ? Direction.Left : Direction.Right);
    inputLines.splice(0, 2);

    inputLines.forEach(line => {
        var node = line.split(" = ")[0];
        var nodeValue = line.split(" = ")[1];
        var leftNode = nodeValue.split(", ")[0].replace("(", "");
        var rightNode = nodeValue.split(", ")[1].replace(")", "");

        if(rightNode.indexOf("\r") > -1) {
            rightNode = rightNode.replace("\r", "");
        }

        var newNode = directions.nodes.find(x => x.value === node);

        if(newNode && newNode.left && newNode.right) {
            return;
        }

        if(!newNode) {
            newNode = { value: node };
            directions.nodes.push(newNode);
        }

        var left = directions.nodes.find(x => x.value === leftNode);

        if (left) {
            newNode.left = left;
        } else {
            var newLeftNode : Node = { value: leftNode };
            directions.nodes.push(newLeftNode);
            newNode.left = newLeftNode;
        }

        var right = directions.nodes.find(x => x.value === rightNode);

        if (right) {
            newNode.right = right;
        } else {
            var newRightNode : Node = { value: rightNode };
            directions.nodes.push(newRightNode);
            newNode.right = newRightNode;
        }

    });

    return directions;

}

interface Node {
    value : string;
    left? : Node;
    right? : Node;
}

interface Directions {
    directions : Direction[];
    nodes : Node[];
}

enum Direction {
    Left,
    Right
}