require("jsdom-global")();
const { expect } = require("chai");
const { createVDOM, createElement, changed, updateElement } = require("../app");

describe("vDOM implementation", () => {
  let aProps, divElement, spanElement, textElement, seedElements;

  beforeEach(() => {
    // here are some test elements (aka seed) to help you get started
    aProps = { href: "https://codechrysalis.io" };
    divElement = createVDOM("div", null, createVDOM("img"), "text node");
    spanElement = createVDOM("span");
    textElement = "Click Me";
    seedElements = createVDOM(
      "a",
      aProps,
      divElement,
      spanElement,
      textElement
    );
  });

  // we have some spec titles to help you get started

  describe("createVDOM function", () => {
    it("should have a function called 'createVDOM'", () => {
      expect(createVDOM).to.be.a("function");
    });

    it("should return an object with type, props, and children properties", () => {
      expect(seedElements).to.have.property("type");
      expect(seedElements).to.have.property("props");
      expect(seedElements).to.have.property("children");
    });

    it("should return a string for type", () => {
      expect(seedElements["type"]).to.be.a("string");
    });

    it("should return a object of props", () => {
      expect(seedElements["props"]).to.be.a("object");
    });

    it("should return an array of children objects", () => {
      expect(seedElements["children"]).to.be.a("array");
    });

    it("should return an array of grandchildren objects", () => {
      expect(seedElements["children"][0]).to.be.a("object");
    });

    it("should return an array of great-grandchildren objects", () => {
      // maybe you need to edit the seed elements above a little for this one -- done that
      expect(seedElements["children"][0]["children"][0]).to.be.a("object");
    });

    it("should have a string value to represent a text node when child was given a string (aka text element)", () => {
      expect(seedElements["children"][0]["children"][1]).to.be.a("string");
    });
  });

  describe("createElement function", () => {
    let result;
    let aProps, divElement, spanElement, textElement, seedElements;

    beforeEach(() => {
      // create your own seed elements or use the ones created above!
      aProps = { href: "https://codechrysalis.io" };
      divElement = createVDOM(
        "div",
        {
          id: "firstParagraph",
          class: "container",
        },
        createVDOM("img"),
        "text node"
      );
      spanElement = createVDOM("span");
      textElement = "Click Me";
      seedElements = createVDOM(
        "a",
        aProps,
        divElement,
        spanElement,
        textElement
      );

      result = createElement(seedElements);
    });

    it("should have a function called createElement", () => {
      expect(createElement).to.be.a("function");
    });

    it("should return an HTML Element", () => {
      expect(result.tagName).to.equal("A");
      expect(result).to.be.a("HTMLAnchorElement");
    });

    it("should convert childNodes to HTML", () => {
      /* Clues:
      |* child elements should NOT include text nodes
      |* BUT child nodes SHOULD include text nodes
      |* This may be important for testing...
      |* ...ok, it obviously is, so take this clue into account.
      */
      expect(result.children[0]).to.be.a("HTMLDivElement");
      expect(result.children[1]).to.be.a("HTMLSpanElement");
    });

    it("should convert grand childNodes to HTML", () => {
      expect(result.children[0].children[0]).to.be.a("HTMLImageElement");
    });

    it("should convert props to attributes", () => {
      expect(result.hasAttribute("href")).to.be.true;
      expect(result.getAttribute("href")).to.eql("https://codechrysalis.io");
    });
  });

  describe("updateElement function", () => {
    function resetParent() {
      target.innerHTML = "";
      const childA = document.createElement("a");
      const childP = document.createElement("p");
      const grandchildFont = document.createElement("font");
      childP.appendChild(grandchildFont);
      target.append(childA, childP);
    }

    beforeEach(() => {
      resetParent();
    });

    let newChild = document.createElement("div");
    newChild.setAttribute("id", "tes-div");
    newChild.setAttribute("style", "display: none;");
    document.body.appendChild(newChild);

    let target = document.getElementById("tes-div");
    let oldNode = createVDOM(
      "div",
      {
        id: "tes-div",
        style: "display: none;",
      },
      createVDOM("a"),
      createVDOM("p", null, createVDOM("font"))
    );

    it("updateElement should be a function", () => {
      expect(updateElement).to.be.a("function");
    });

    it("should update target element with new nodes: add to end", () => {
      let newNodeAddToEnd = createVDOM(
        "div",
        {
          id: "tes-div",
          style: "display: none;",
        },
        createVDOM("a"),
        createVDOM("p", null, createVDOM("font")),
        createVDOM("span")
      );

      updateElement(target, newNodeAddToEnd, oldNode);

      expect(target.childNodes.length).to.equal(3);
      expect(target.childNodes[0].nodeName).to.equal("A");
      expect(target.childNodes[1].nodeName).to.equal("P");
      expect(target.childNodes[2].nodeName).to.equal("SPAN");
    });

    it("should update target element with new nodes: add to beginning", () => {
      let newNodeAddToBeginning = createVDOM(
        "div",
        {
          id: "tes-div",
          style: "display: none;",
        },
        createVDOM("span"),
        createVDOM("div"),
        createVDOM("a"),
        createVDOM("p", null, createVDOM("font"))
      );
      updateElement(target, newNodeAddToBeginning, oldNode);

      expect(target.childNodes.length).to.equal(4);

      expect(target.childNodes[0].nodeName).to.equal("SPAN");
      expect(target.childNodes[1].nodeName).to.equal("DIV");
      expect(target.childNodes[2].nodeName).to.equal("A");
      expect(target.childNodes[3].nodeName).to.equal("P");
    });

    it("should delete old nodes", () => {
      let nodeRemoveFromMiddle = createVDOM(
        "div",
        { id: "tes-div", style: "display: none;" },
        createVDOM("p", null, createVDOM("font"))
      );

      updateElement(target, nodeRemoveFromMiddle, oldNode);

      expect(target.childNodes.length).to.equal(1);
      expect(target.childNodes[0].nodeName).to.equal("P");
    });

    it("should update target element with new nodes and texts", () => {
      let newNodeAddText = createVDOM(
        "div",
        {
          id: "tes-div",
          style: "display: none;",
        },
        createVDOM("a"),
        "Hello World",
        createVDOM("p", null, createVDOM("font"))
      );

      updateElement(target, newNodeAddText, oldNode);

      expect(target.childNodes.length).to.equal(3);
      expect(target.childNodes[0].nodeName).to.equal("A");
      expect(target.childNodes[1].textContent).to.equal("Hello World");
      expect(target.childNodes[2].nodeName).to.equal("P");
    });

    it("should update target element with new grand children nodes", () => {
      let newGrandChildrenNodes = createVDOM(
        "div",
        {
          id: "tes-div",
          style: "display: none;",
        },
        createVDOM("a"),
        createVDOM("p", null, createVDOM("font"), createVDOM("a", null, "Bar"))
      );

      updateElement(target, newGrandChildrenNodes, oldNode);

      expect(target.childNodes.length).to.equal(2);
      expect(target.childNodes[0].nodeName).to.equal("A");
      expect(target.childNodes[1].nodeName).to.equal("P");
      expect(target.childNodes[1].childNodes.length).to.equal(2);
      expect(target.childNodes[1].childNodes[0].nodeName).to.equal("FONT");
      expect(target.childNodes[1].childNodes[1].nodeName).to.equal("A");
      expect(target.childNodes[1].childNodes[1].childNodes.length).to.equal(1);
      expect(
        target.childNodes[1].childNodes[1].childNodes[0].textContent
      ).to.equal("Bar");
    });

    it("should update target element with new text for grand child node", () => {
      let newTextToGrandChildNode = createVDOM(
        "div",
        {
          id: "tes-div",
          style: "display: none;",
        },
        createVDOM("a"),
        createVDOM("p", null, createVDOM("font", null, "Foo"))
      );

      updateElement(target, newTextToGrandChildNode, oldNode);

      expect(target.childNodes[1].childNodes[0].nodeName).to.equal("FONT");
      expect(target.childNodes[1].childNodes[0].childNodes.length).to.equal(1);
      expect(
        target.childNodes[1].childNodes[0].childNodes[0].textContent
      ).to.equal("Foo");
    });

    it("should update attributes of target element", () => {
      let changeAttributesAddToTarget = createVDOM(
        "div",
        {
          id: "tes-div",
          style: "display: block;",
        },
        createVDOM("a"),
        createVDOM("p", null, createVDOM("font"))
      );

      updateElement(target, changeAttributesAddToTarget, oldNode);

      let newTarget = document.getElementById("tes-div");

      expect(newTarget.attributes.length).to.equal(2);
      expect(newTarget.getAttribute("id")).to.equal("tes-div");
      expect(newTarget.getAttribute("style")).to.equal("display: block;");
    });

    it("should update attributes of children of target element", () => {
      let newAttributesAddToChild = createVDOM(
        "div",
        {
          id: "tes-div",
          style: "display: none;",
        },
        createVDOM("a"),
        createVDOM("p", { class: "baz" }, createVDOM("font"))
      );

      updateElement(target, newAttributesAddToChild, oldNode);

      expect(target.childNodes.length).to.equal(2);
      expect(target.childNodes[0].attributes.length).to.equal(0);
      expect(target.childNodes[1].attributes.length).to.equal(1);
      expect(target.childNodes[1].getAttribute("class")).to.equal("baz");
    });
  });
});
