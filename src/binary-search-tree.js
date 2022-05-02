const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = addNewData(this._root, data);
    function addNewData(node) {  
      if(!node) {
        return new Node (data);
      } else if (node.data === data) {
        return node;
      } else if (data < node.data) {
        node.left = addNewData(node.left, data);
      } else {
        node.right = addNewData(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    return searchData(this._root, data);
    function searchData(node, data) {
      if (!node) return false;
      if (node.data === data) return true;
      return data < node.data ? searchData(node.left, data) : searchData(node.right, data);
    }
  }

  find(data) {
    return findData(this._root, data);
	  function findData(node, data) {
		 if (!node) return null;
		 if (node.data === data) return node;
 		 return node.data <= data ? findData(node.right, data) : findData(node.left, data);
	  }
  }

  remove(data) {
    this._root = removeData(this._root, data);
    function removeData(node, data) {
      if(!node) {
        return null;
      }
      if (data < node.data) {
        node.left = removeData(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeData(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        } 
        if (!node.right) {
          node = node.left;
          return node;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        let maxFromLeft = node.left;
        while (maxFromLeft.right) {
          maxFromLeft = maxFromLeft.right;
        }
        node.data = maxFromLeft.data;
        node.left = removeData(node.left, maxFromLeft.data);
        return node;
      }

    }

  }
  min(node = this._root) { 
    return !node.left ? node.data : this.min(node.left);
  }
  max(node = this._root) {
    return !node.right ? node.data : this.max(node.right);
  }
}

module.exports = {
  BinarySearchTree
};