# Virtual DOM
### This was created during my time as a [Code Chrysalis](https://codechrysalis.io) Student

You will be using TDD to build your own virtual DOM and diffing library similar to those used in most modern frameworks like React and Ember.

## Table of Contents

1.  [Objectives](#objectives)
1.  [Overview of Topics](#overview-of-topics)
1.  [Getting Started](#getting-started)
1.  [Basic Requirements](#basic-requirements)
1.  [Advanced Requirements](#advanced)
1.  [Resources](#resources)
1.  [Contributing](#contributing)

## Objectives

For the first two tasks, you will be writing tests first using the test file as an example. There will be some comments to help guide you, but the challenge is to come up with the best tests for your situation. Then for the final task, you will be building a function that fits the requirements listed by the test specs in the `tests/tests.js` file. You will still want to consider edge cases and come up with tests that work for those too.

* Convert nodes from the virtual DOM (JavaScript) and the real DOM (HTML)
* Identify the pros and cons of using a virtual DOM
* Use recursion to write a dynamic diffing algorithm

**Things to Keep In Mind:**

* Think about tests as consumers of code---what should your code be doing that you need to test for?
* Look at the given examples to help you write tests. Can you find a link between using the code and writing the tests?
* You'll need to learn more about creating HTML DOM elements, which will involve some sleuthing through the MDN documentation

## Overview of Topics

### DOM VS Virtual DOM

To begin to understand what a virtual DOM is, we must first understand what the DOM is. The DOM [(“document object model”)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) is the JavaScript representation of your HTML. If you haven't explored the DOM yet, just open up your developer console in your favorite browser and type `document` and see what options are available. You'll see all the ways your JS can interact with your rendered HTML such as selecting, manipulating, or creating elements for a webpage.

We use virtual DOM representations to increase the performance of UI updates. It may seem counter-intuitive that constructing a new data structure and traversing it would increase performance. However, doing any modifications directly on the DOM is one of the slowest operations you can do on the frontend. Because of this, constructing your virtual DOM, calculating the least number of steps needed to be done on the actual DOM, and batching those changes is actually much faster. If you are curious why the DOM is so slow, check out [this article](https://developer.mozilla.org/en-US/docs/Introduction_to_Layout_in_Mozilla) about how rendering engines work in browsers.

## Getting Started

Install the local dependencies listed in the `package.json` file using npm or yarn.

Look in `package.json` for the commands to run tests and linting.

## Basic Requirements

More detailed instructions are below, but we generally have four steps for the basic requirements.

1.  Read the code.
1.  Represent your vDOM with the `createVDOM` function
    1.  Write tests to consume your code
    1.  Pass the tests you have written
1.  Convert your vDOM into DOM elements by `createElement`
    1.  Write tests
    1.  Pass tests
1.  Update your element using `updateElement`

The main parts of a virtual DOM library are as follows:

1.  The function that creates the virtual DOM object
1.  The function that turns the virtual DOM object into an actual DOM element
1.  The diffing algorithm that compares and returns the difference
1.  The function that makes the update to the actual DOM

Every time a change is triggered on a component, a new virtual copy of that DOM component is created and compared to the previous virtual DOM version. The second part is the diffing algorithm which does the comparison and returns the difference. The third component is the patching or merging algorithm that takes the patch instructions and does the update to the actual DOM. In this sprint you will build your own version of these three components. After, you are encouraged to dig into how different frameworks implement their virtual DOM and consider how you can optimize yours.

If you feel shaky on how to interact with the DOM, familiarize yourself with the chapter titles in the table of contents of [this book](http://domenlightenment.com/#toc), which touches on all things DOM-related and will give you an idea of what is possible. Refer back to the actual content when you reach a point where you want to understand something more in-depth. It is not recommended that you read the book cover-to-cover, and you don't need to be a DOM expert to do well on this sprint.

The first two tasks should be done in TDD style, which means that you first write a failing test, then you write the code to make it pass. Once you get to the third objective, you can use the pre-written tests as your guide. You can also use these pre-written tests to help you write your own tests in the first two tasks. You will be writing your tests in the `tests/tests.js` file and you will be writing your source code in the `app.js` file. The tests are there to support you but always be aware that they may contain errors.

1.  **Represent Your DOM**

The first task is to write a function that represents DOM nodes as an object. Begin by writing a failing test, and then write code to make it pass. Here is some example HTML and a virtual DOM representation to help you get started.

DOM or HTML example

```html
<ul class="list">
 <li>item 1</li>
 <li>item 2</li>
</ul>
```

Below is our JavaScript representation of above example. We are representing the same info in the HTML, but this time in the form of a trusty JavaScript object literal.

```javascript
{
  type: 'ul',
  props: { 'class': 'list' },
  children: [
    { type: 'li', props: {}, children: ['item 1'] },
    { type: 'li', props: {}, children: ['item 2'] }
  ]
};
```

Note that we use a plain javascript object, not DOM nodes in this representation. Make sure you tests account for that.

2.  **Convert vDOM to DOM Elements**

Create a `createElement` method that takes a virtual DOM object and converts it to an actual DOM element.

```javascript
//vDOM Representation (same as above)

{ type: 'ul', props: { 'class': 'list' }, children: [
 { type: 'li', props: {}, children: ['item 1'] },
 { type: 'li', props: {}, children: ['item 2'] }
] }
```

```html
<!-- DOM -->
<ul class="list">
 <li>item 1</li>
 <li>item 2</li>
</ul>
```

Hint: Make sure that the constructor for your DOM representation is an HTML element (HTMLUListElement, HTMLAnchorElement, etc) not an Object like your virtual DOM.

3.  **Update Element**

This is the most important element of the virtual DOM. This is the piece that can be optimized for speed. No need to pre-optimize, just get started with the basic implementation by following the tests in the `tests/tests.js` file.

## Advanced Requirements

* Add support for events.
* Write a blog post about why virtual DOM is used.

## Resources

* [Chai Assertion Docs](http://chaijs.com/api/bdd/)
* [How Browser Parsing Works](http://taligarsiel.com/Projects/howbrowserswork1.htm#Parsing_general)
* [Intro to Layout in Firefox](https://developer.mozilla.org/en-US/docs/Introduction_to_Layout_in_Mozilla)
* [Difference between DOM and virtual DOM](http://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/)
* [Inner workings of React's Virtual DOM](https://medium.com/@rajaraodv/the-inner-workings-of-virtual-dom-666ee7ad47cf)

## Contributing

See a problem? Can something be done better? [Contribute to our curriculum](mailto:hello@codechrysalis.io)!
