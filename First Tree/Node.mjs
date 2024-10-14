export default class Node {
  constructor(storedData, left = null, right = null) {
    this.value = storedData;
    this.left = left;
    this.right = right;
  }
}
