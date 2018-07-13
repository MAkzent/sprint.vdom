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

  if (typeof node === "string") {
    element = document.createTextNode(node);
    return element;
  } else {
    element = document.createElement(node.type);
    setAttributes(element, node.props);
  }

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

function updateElement(target, newNode, oldNode) {
  let output = target;
  // there should be an array where we push the end output
  // target: Source HTML Element to update
  // newNode: new VDOM
  // oldNode: old VDOM
  // output: HTML Element updated
  // create a document: html
  // let nodeSize = Math.max(newNode.children.length, oldNode.children.length)

  let storage = {};

  for (let i = 0; i < newNode.children.length; i++) {
    for (let u = 0; u < oldNode.children.length; u++) {
      if (!changed(oldNode.children[i], newNode.children[u])) {
        console.log("--- IT'S A MATCH ---");
        console.log("OLDNODE");
        console.log(oldNode.children[u]);
        console.log("NEWNODE");
        console.log(newNode.children[i]);
        // if exists?
        // if same order?
        storage[i] = oldNode.children[i];
      }
    }
  }
  // oldV newV
  // 1a    1a
  // 2b    2b
  // 3c    3c
  //       4d

  // 1a   1d
  // 2b   2a
  // 3c   3b
  //      4c

  // if same order, same value do nothing
  // if never seen before
  //    if there is bottom of order
  //      appendChild(test1)
  //    if there is top of order
  //      preppendchild(test2)

  console.log(storage);

  // how we compare each node
  //   for (let i = 0; i < nodeSize; i++) {
  //   if (changed(newNode.children[i], oldNode.children[i])) {
  //     output.appendChild(createElement(newNode.children[i]))
  //   }
  // }
  return output;
}

module.exports = { createVDOM, createElement, changed, updateElement };

// // oldNode
// <body>
//   <div id="tes-div" style="display: none;">
//     <a></a>
//     <p>
//       <font></font>
//     </p>
//   </div>
// </body>

// // parent
// <body>
//   <div id="tes-div">
//     <a></a>
//     <p>
//       <font></font>
//     </p>
//   </div>
// </body>
