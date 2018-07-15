function createVDOM(type, props, ...children) {
  return {
    type: type,
    props: props,
    children: children,
  };
}

function createElement(node) {
  function setAttributes(el, attrs) {
    for (const key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.type);
  setAttributes(element, node.props);

  for (let child of node.children) {
    const newChild = createElement(child);
    element.appendChild(newChild);
  }

  return element;
}

function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

function updateElement(target, newNode, oldNode) {
  // SETUP
  let parentNode = target;
  // function to set oldAttributes to newAttributes
  function setAttributes(el, attrs) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }
  // find which Node has more children -> number becomes important in the for loop below
  let maxChildren = Math.max(newNode.children.length, oldNode.children.length);

  // run the setAttributes function on the current node to change attributes
  setAttributes(parentNode, newNode.props);

  // dive into node.children
  for (let i = 0; i < maxChildren; i++) {
    // Initiate variables for each loop
    let currentNewNode = newNode.children[i];
    let currentOldNode = oldNode.children[i];
    let currentOldHTML = parentNode.childNodes[i];
    let hasChanged = changed(currentNewNode, currentOldNode);

    if (hasChanged && currentOldNode === undefined) {
      // in case there are still children in the newNode but not in the oldNode:
      // append all remaining children
      for (let u = i; u < maxChildren; u++) {
        let currentNewHTML = createElement(newNode.children[u]);
        parentNode.appendChild(currentNewHTML);
      }
      // done with this level, get out of it
      return;
    }

    if (
      hasChanged &&
      currentOldHTML !== undefined &&
      currentNewNode === undefined
    ) {
      // in case this node exists in the OldHTML but not in the newNode:
      // remove old child
      parentNode.removeChild(currentOldHTML);
      // done with this level, get out of it
      return;
    }

    if (hasChanged && currentNewNode !== undefined) {
      // Switch oldHTML with newHTML
      let currentNewHTML = createElement(currentNewNode);
      parentNode.replaceChild(currentNewHTML, currentOldHTML);
    }

    // don't go deeper if currentNewNode is a string (it has no children)
    if (typeof currentNewNode === "string") {
      continue;
    }

    // don't go deeper if there are no children on either side
    if (newNode.children.length === 0 || oldNode.children.length === 0) {
      return;
    }

    // go one level deeper if it has childNodes
    updateElement(parentNode.childNodes[i], currentNewNode, currentOldNode);
  }

  return parentNode;
}

module.exports = { createVDOM, createElement, changed, updateElement };
