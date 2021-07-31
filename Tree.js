/**
 * @class Represents a NodeTree.
 */
class Node {
  /**
   * Create a new NodeTree.
   * @param {Object} data - Represents the data of the node.
   * @property {Node} lchild - The left child of the node (Pointer).
   * @property {Node} rchild - The right child of the node (Pointer).
   * @property {Array} repeated - The repeated elements of the node which height are repeated.
   */

  constructor(data = {}) {
    this.data = data;
    this.lchild = null;
    this.rchild = null;
    this.height = 0;
    this.repeated = [];
  }
}

/**
 * @class Represents an AVL Tree.
 */

class Tree {
  /**
   * Create a Tree.
   * @property {Node} root - The head of the tree (Pointer).
   * @property {Number} size - The elements of the tree.
   */
  constructor() {
    this.root = null;
    this.size = 0;
  }

  /**
   * IInorder(inOrder) - Iterative Inorder traversal of the tree using a stack to perform space.
   * @param {Array} arr - An array to store the inorder traversal.
   * @returns {Void} - does not return anything
   */

  IInorder(arr) {
    let p = this.root;
    const stk = [];
    while (p || stk.length > 0) {
      if (p) {
        stk.push(p);
        p = p.lchild;
      } else {
        p = stk.pop();
        //Add repeated Person with repeated height
        arr.push(p.data, ...p.repeated);
        p = p.rchild;
      }
    }
  }
  /**
   * @param {Number} k - The sum of the heights of the two nodes.
   * @returns {Void} - does not return anything
   */

  printPairs(k) {
    const inOrder = [];
    this.IInorder(inOrder);
    this.#printPairUtil(inOrder, this.size, this.size - 1, k);
  }
  /**
   * @param {Object} obj1 - The first object with sorted by height.
   * @param {Number} i - The Index where start to find the pair.
   * @param {Number} n - The Index where end to find the pair.
   * @param {Object} obj2 - The second object with sorted by height.
   * @returns {Void} - does not return anything
   */

  #print(obj1, i, n, obj2) {
    while (i < n) {
      if (obj1[i].id !== obj2.id)
        console.log(
          `${obj1[i]['first_name']} ${obj1[i]['last_name']} - ${
            obj2['first_name']
          } ${obj2['last_name']} = ${
            parseInt(obj1[i]['h_in']) + parseInt(obj2['h_in'])
          }`
        );
      i++;
    }
  }

  /**
   * @param {Array} obj1 - The first object with sorted by height.
   * @param {Number} i - The Index where start to find the pair.
   * @param {Number} n - The Index where end to find the pair.
   * @param {Object} obj2 - The second object with sorted by height.
   * @returns {Void} - does not return anything
   */

  #printPairUtil(inOrder, n, j, k) {
    let i = 0;
    let flag = false;
    while (i < n && j >= 0) {
      if (parseInt(inOrder[i]['h_in']) + parseInt(inOrder[j]['h_in']) > k) {
        this.#print(inOrder, i, n, inOrder[j]);
        flag = true;
        j--;
      } else {
        i++;
      }
    }
    if (!flag) console.log('There no matches!');
  }

  /**
   * @param {Node} p - The node to calculate the height.
   * @returns {Number} - The height of the node.
   */
  #NodeHeight(p) {
    let hl, hr;
    hl = p && p.lchild ? p.lchild.height : 0;
    hr = p && p.rchild ? p.rchild.height : 0;
    return hl > hr ? hl + 1 : hr + 1;
  }
  /**
   * @param {Node} p - The node to calculate the height.
   * @returns {Number} - The balance of the node.
   */
  #BalanceFactor(p) {
    let hl, hr;
    hl = p && p.lchild ? p.lchild.height : 0;
    hr = p && p.rchild ? p.rchild.height : 0;
    return hl - hr;
  }
  /**
   * LLRotation(p) - Left Left Rotation
   * @param {Node} p - The node to calculate the height.
   * @returns {Node} - Rotated node.
   */
  #LLRotation(p) {
    const pl = p.lchild;
    const plr = pl.rchild;

    pl.rchild = p;
    p.lchild = plr;
    p.height = this.#NodeHeight(p);
    pl.height = this.#NodeHeight(pl);

    if (this.root == p) this.root = pl;

    return pl;
  }
  /**
   * RRotation(p) - Right Right Rotation
   * @param {Node} p - The node to calculate the height.
   * @returns {Node} - Rotated node.
   */
  #RRRotation(p) {
    const pl = p.rchild;
    const plr = pl.lchild;

    pl.lchild = p;
    p.rchild = plr;

    p.height = this.#NodeHeight(p);
    pl.height = this.#NodeHeight(pl);

    if (this.root == p) this.root = pl;

    return pl;
  }
  /**
   * LRotation(p) - Left Right Rotation
   * @param {Node} p - The node to calculate the height.
   * @returns {Node} - Rotated node.
   */
  #LRRotation(p) {
    const pl = p.lchild;
    const plr = pl.rchild;

    pl.rchild = plr.lchild;
    p.lchild = plr.rchild;

    plr.lchild = pl;
    plr.rchild = p;

    pl.height = this.#NodeHeight(pl);
    p.height = this.#NodeHeight(p);
    plr.height = this.#NodeHeight(plr);

    if (this.root == p) this.root = plr;
    return plr;
  }
  /**
   * RLRotation(p) - Right Left Rotation
   * @param {Node} p - The node to calculate the height.
   * @returns {Node} - Rotated node.
   */
  #RLRotation(p) {
    const pl = p.rchild;
    const plr = pl.lchild;

    pl.lchild = plr.rchild;
    p.rchild = plr.lchild;

    plr.rchild = pl;
    plr.lchild = p;

    pl.height = this.#NodeHeight(pl);
    p.height = this.#NodeHeight(p);
    plr.height = this.#NodeHeight(plr);

    if (this.root == p) this.root = plr;
    return plr;
  }
  /**
   * @param {Node} p - The node to calculate,
   * @returns {Node} - The node with the minimum value.
   */
  minValueNode(node) {
    let current = node;

    while (current.lchild !== null) current = current.lchild;

    return current;
  }
  /**
   * RInsert(p,data) - Recursive Insertion.
   * @param {Node} p - The current head of the tree.,
   * @param {Object} data - The data to insert.
   * @returns {Node} - The new added node.
   */
  #RInsert(p, data) {
    if (p === null) {
      p = new Node(data);
      return p;
    }

    if (data.h_in < p.data.h_in) p.lchild = this.#RInsert(p.lchild, data);
    else if (data.h_in > p.data.h_in) p.rchild = this.#RInsert(p.rchild, data);
    else p.repeated.push(data);

    p.height = this.#NodeHeight(p);

    if (this.#BalanceFactor(p) == 2 && this.#BalanceFactor(p.lchild) == 1)
      return this.#LLRotation(p);
    else if (this.#BalanceFactor(p) == 2 && this.#BalanceFactor(p.lchild) == -1)
      return this.#LRRotation(p);
    else if (
      this.#BalanceFactor(p) == -2 &&
      this.#BalanceFactor(p.rchild) == -1
    )
      return this.#RRRotation(p);
    else if (this.#BalanceFactor(p) == -2 && this.#BalanceFactor(p.rchild) == 1)
      return this.#RLRotation(p);

    return p;
  }
  /**
   * Calls the RInsert function.
   * @param {Object} data - The data to insert.
   * @returns {Void} - does not return anything
   */
  add(data) {
    this.root = this.#RInsert(this.root, data);
    this.size++;
  }
}

module.exports = Tree;
