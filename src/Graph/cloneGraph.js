// https://leetcode.com/problems/clone-graph/
class Node {
  val = 0;
  neighbors = [];
}

/*
1. 기존 노드에 대응 되는 새로운 노드를 만든다.
2. 기존 노드에서 연결되어 있는 노드를 순회하며 새로운 노드에 붙인다.
3. 방문 기록을 남겨 노드 재생성을 방지한다.
*/

/**
 * @param {Node} node
 * @return {Node}
 */
const cloneGraph = (node) => {
  if (!node) return null;

  const visited = new Map();

  const dfs = (oldNode) => {
    if (visited.has(oldNode)) {
      return visited.get(oldNode);
    }

    const newNode = new Node();
    newNode.val = oldNode.val;

    visited.set(oldNode, newNode);

    for (let i = 0; i < oldNode.neighbors.length; i++) {
      const neighbor = oldNode.neighbors[i];
      newNode.neighbors.push(dfs(neighbor));
    }

    return newNode;
  };

  return dfs(node);
};

function run() {
  const first = new Node();
  first.val = 1;
  const second = new Node();
  second.val = 2;
  const third = new Node();
  third.val = 3;
  const fourth = new Node();
  fourth.val = 4;

  first.neighbors = [second, fourth];
  second.neighbors = [first, third];
  third.neighbors = [second, fourth];
  fourth.neighbors = [first, third];

  console.log(cloneGraph(first));
}

export default run;
