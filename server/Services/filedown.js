// Node class to represent the Huffman tree nodes
class Node {
  constructor(char, freq) {
    this.char = char; // character
    this.freq = freq; // frequency of the character
    this.left = null; // left child
    this.right = null; // right child
  }
}

// Helper function to build the frequency table
function buildFrequencyTable(text) {
  const freqTable = {};
  for (let char of text) {
    freqTable[char] = (freqTable[char] || 0) + 1;
  }
  return freqTable;
}

// Helper function to build the Huffman Tree
function buildHuffmanTree(freqTable) {
  const nodes = [];

  // Create a priority queue (using an array for simplicity)
  for (let char in freqTable) {
    nodes.push(new Node(char, freqTable[char]));
  }

  // Sort nodes based on frequency
  nodes.sort((a, b) => a.freq - b.freq);

  // Build the tree
  while (nodes.length > 1) {
    // Take two nodes with the lowest frequencies
    let left = nodes.shift();
    let right = nodes.shift();

    // Create a new internal node
    let newNode = new Node(null, left.freq + right.freq);
    newNode.left = left;
    newNode.right = right;

    // Add the new node back to the queue
    nodes.push(newNode);

    // Sort the nodes by frequency again
    nodes.sort((a, b) => a.freq - b.freq);
  }

  // Return the root node of the Huffman Tree
  return nodes[0];
}

// Helper function to generate the Huffman codes from the tree
function generateHuffmanCodes(root, prefix = "", codeTable = {}) {
  if (root === null) return;

  // If it's a leaf node, store the character and its code
  if (root.char !== null) {
    codeTable[root.char] = prefix;
  }

  // Recurse for left and right subtrees
  generateHuffmanCodes(root.left, prefix + "0", codeTable);
  generateHuffmanCodes(root.right, prefix + "1", codeTable);

  return codeTable;
}

// Main function to encode a text
export const huffmanEncode = function (text) {
  const freqTable = buildFrequencyTable(text); // Build frequency table
  const huffmanTree = buildHuffmanTree(freqTable); // Build Huffman Tree
  const huffmanCodes = generateHuffmanCodes(huffmanTree); // Generate Huffman codes

  // Encode the text using the Huffman codes
  let encodedText = "";
  for (let char of text) {
    encodedText += huffmanCodes[char];
  }

  return {
    encodedText,
    huffmanCodes,
  };
};

// const text = "this is an example for huffman encoding";
// const result = huffmanEncode(text);
