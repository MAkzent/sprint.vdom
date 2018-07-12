function createVDOM(type, props, ...children) {
  return {
    type: type,
    props: props,
    children: children,
  };
}

function createElement(node) {
  let element;
  function setAttributes(el, attrs) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

  // write if statement for textNode
  if (typeof node === "string") {
    return document.createTextNode(node);
  } else {
    // write function to create HTMLelement
    element = document.createElement(node.type);
    // add attributes to new element
    setAttributes(element, node.props);
  }

  // write recursive function to recurse through childnodes
  for (let i = 0; i < node.children.length; i++) {
    let child = createElement(node.children[i]);
    element.appendChild(child);
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

function updateElement(target, newNode, oldNode) {}

module.exports = { createVDOM, createElement, changed, updateElement };
