// https://school.programmers.co.kr/learn/courses/30/lessons/150367
/*
  표현 가능한 이진트리
  1. 주어진 배열의 숫자를 이진수로 바꾼다.
  2. 이진수가 트리로 표현 가능하다면 1, 없다면 0

  solution
  1. 십진수를 이진수로 변환

  2. 완전포화 이진트리(2^n - 1)가 될 때 까지 0 붙여주기.
    
  3. 이진탐색(분할정복)으로 표현가능 여부 확인하기.

  point
  - 완전 포화 이진트리의 이해.
    - 부모노드가 0이면서 자식노드가 1이 되는 경우는 트리를 만들 수 없는 경우이다.
      ex) 101
        분할했을 때 부모 노드는 0, 좌측 자식노드 1, 우측 자식노드 1이며 이는 트리가 될 수 없다.
    - 완전 포화 이진트리의 크기는 2^n - 1이 된다.
    - 완전 포화 이진트리의 형태를 이용하면 분할정복에 유용하다.
    - 여기서 분할정복 알고리즘을 위하여 완전 포화 이진트리의 형태로 만들어서 문제를 해결한다.
*/
const convertBinaryNum = (num) => {
  return num.toString(2);
};

const convertFullDec = (binaryNum) => {
  let treeHeight = 0;
  let fullDec = binaryNum;

  while (Math.pow(2, treeHeight) - 1 < fullDec.length) {
    treeHeight++;
  }

  const treeSize = Math.pow(2, treeHeight) - 1;

  while (treeSize > fullDec.length) {
    fullDec = `${0}${fullDec}`;
  }

  return fullDec;
};

const expressible = (fullDec) => {
  const mid = Math.floor(fullDec.length / 2);
  const parents = fullDec[mid];
  const leftChild = fullDec.substring(0, mid);
  const rightChild = fullDec.substring(mid + 1);

  // 부모노드가 0인데 자식노드가 1이 올 경우
  if (
    parents === '0' &&
    (leftChild[Math.floor(mid / 2)] === '1' ||
      rightChild[Math.floor(mid / 2)] === '1')
  ) {
    return 0;
  }

  // 더이상 나눌 수 없는 최소 단위의 트리의 노드 갯수는 3이 된다.
  if (leftChild.length >= 3) {
    // 자식 노드에서 다시 분할정복을 통해 트리의 표현가능 여부를 확인한다.
    // return이 0일 경우 트리가 될 수 없으므로 0을 return;
    if (expressible(leftChild) === 0) {
      return 0;
    }
  }
  if (rightChild.length >= 3) {
    if (expressible(rightChild) === 0) {
      return 0;
    }
  }

  // 위의 모든 조건을 통과하였으므로 1을 return
  return 1;
};

function solution(numbers) {
  var answer = [];

  numbers.forEach((num) => {
    // 1. 십진수를 이진수로 변환
    const binaryNum = convertBinaryNum(num);
    // 2. 완전포화 이진트리로 변환
    const fullDec = convertFullDec(binaryNum);
    // 3. 표현 가능 여부 확인
    answer.push(expressible(fullDec));
  });

  return answer;
}

// 주어진 수의
export default function run() {
  // console.log(solution([7, 42, 5]));
  console.log(solution([63, 111, 95]));
}
