let MAX_ITERATIONS = 299999999;
let START_ITERATIONS = 299999999;

export function A(input : string) : number {

    var directions = mapNodes(input);
    var currentNode = directions.nodes.find(x => x.value === 'AAA');
    var endpointNode = directions.nodes.find(x => x.value === 'ZZZ');;

    if(!currentNode || !endpointNode) {
        return 0;
    }

    var directionIndex = 0;
    var directionCount = 0;

    while (currentNode.value !== endpointNode.value && directionCount < MAX_ITERATIONS) {
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
    var directions = mapNodes(input);
    //should find all nodes ending with A
    var startNodes = directions.nodes.filter(x => x.value.endsWith("A"));
    var endNodes = directions.nodes.filter(x => x.value.endsWith("Z"));

    if(!startNodes || !endNodes) {
        return 0;
    }

    let paths : {node: Node, pathIndexes: number[]}[] = [];

    for(let n = 0; n < startNodes.length; n++) {
        var currentNode = startNodes[n];
        var directionIndex = 0;
        var directionCount = 0;

        paths.push({node: currentNode, pathIndexes: []});

        let currentNodePath = paths.find(x => x.node.value === currentNode.value);
  
        while (directionCount < MAX_ITERATIONS) {

            if(currentNode.value.endsWith("Z")) {
                currentNodePath?.pathIndexes.push(directionCount);
            }

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
    }


    //look through all pathIndexes and find the lowest shared index between all paths
    let lowestSharedIndex = MAX_ITERATIONS;
    let firstPath = paths[0];

    for(let i = 0; i < firstPath.pathIndexes.length; i++) {
        let index = firstPath.pathIndexes[i];
        let isShared = true;
        for(let j = 1; j < paths.length; j++) {
            let path = paths[j];
            if(path.pathIndexes.indexOf(index) === -1) {
                isShared = false;
                break;
            }
        }

        if(isShared && index < lowestSharedIndex) {
            lowestSharedIndex = index;
            break;
        }
    }


    return lowestSharedIndex;
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