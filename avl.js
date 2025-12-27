class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    getHeight(node) {
        return node ? node.height : 0;
    }

    getBalance(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    rightRotate(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        document.getElementById("message").innerText =
    `Right Rotation (LL or RL) at node ${y.value}`;


        return x;
    }

    leftRotate(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        document.getElementById("message").innerText =
    `Left Rotation (RR or LR) at node ${x.value}`;


        return y;
    }

    insert(node, value) {
        if (!node) return new AVLNode(value);

        if (value < node.value)
            node.left = this.insert(node.left, value);
        else if (value > node.value)
            node.right = this.insert(node.right, value);
        else
            return node;

        node.height = 1 + Math.max(
            this.getHeight(node.left),
            this.getHeight(node.right)
        );

        const balance = this.getBalance(node);

        // LL
        if (balance > 1 && value < node.left.value)
            return this.rightRotate(node);

        // RR
        if (balance < -1 && value > node.right.value)
            return this.leftRotate(node);

        // LR
        if (balance > 1 && value > node.left.value) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        // RL
        if (balance < -1 && value < node.right.value) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }
    minValueNode(node) {
    let current = node;
    while (current.left)
        current = current.left;
    return current;
}

delete(node, value) {
    if (!node) return node;

    if (value < node.value)
        node.left = this.delete(node.left, value);
    else if (value > node.value)
        node.right = this.delete(node.right, value);
    else {
        // Node with one child or no child
        if (!node.left || !node.right) {
            node = node.left ? node.left : node.right;
        } else {
            // Node with two children
            const temp = this.minValueNode(node.right);
            node.value = temp.value;
            node.right = this.delete(node.right, temp.value);
        }
    }

    if (!node) return node;

    node.height = 1 + Math.max(
        this.getHeight(node.left),
        this.getHeight(node.right)
    );

    const balance = this.getBalance(node);

    // LL
    if (balance > 1 && this.getBalance(node.left) >= 0)
        return this.rightRotate(node);

    // LR
    if (balance > 1 && this.getBalance(node.left) < 0) {
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
    }

    // RR
    if (balance < -1 && this.getBalance(node.right) <= 0)
        return this.leftRotate(node);

    // RL
    if (balance < -1 && this.getBalance(node.right) > 0) {
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
    }

    return node;
}

}

const avlTree = new AVLTree();
function insertValue() {
    const input = document.getElementById("valueInput");
    const value = parseInt(input.value);

    if (isNaN(value)) return;

    avlTree.root = avlTree.insert(avlTree.root, value);
    renderAVLTree(avlTree.root);

    input.value = "";
    console.log(avlTree.root);
}
function deleteValue() {
    const input = document.getElementById("valueInput");
    const value = parseInt(input.value);

    if (isNaN(value)) return;

    avlTree.root = avlTree.delete(avlTree.root, value);
    renderAVLTree(avlTree.root);
    input.value = "";
}

function resetTree() {
    avlTree.root = null;
    renderAVLTree(null);

    document.getElementById("message").innerText =
        "Tree reset";
    console.clear();
}
