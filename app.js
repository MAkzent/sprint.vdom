function createVDOM(type, props, ...children) {
  return {
    type: type,
    props: props,
    children: children,
  };
}

function createElement(node) {
  // Take properties object,
  // loop through properties object
  // check if "properties object".key is = result.key
  // pass "properties object".key into result.key

  const result = {
    tagName: node.type,
    class: "",
    id: "",
    href: "",
    textNode: "",
    childNodes: [],
  };

  return result;
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
