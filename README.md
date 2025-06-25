# Frontend Mentor - Password Generator App

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- SCSS (Sass) with BEM and modular structure
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- React
- Accessibility best practices (aria-live, input validation)

### What I learned

This project is my first time using React. I learned how to structure a React app, manage state, and integrate SCSS for styling components.

#### React nature

React feels like writing HTML and JavaScript together, but with superpowers. Instead of updating the DOM directly, I can describe what I want the UI to look like, and React takes care of the rest. For example:

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

This looks like HTML, but it's actually JSX, which gets compiled to JavaScript. React keeps a virtual DOM and updates only what's needed, making UI updates fast and efficient.

One thing I found interesting is how React encourages thinking in components. Each piece of UI is a function or class, and you can compose them together like building blocks. State and props make it easy to pass data and handle user interactions. For example, when a user types or clicks, React can update just the relevant part of the UI without reloading the whole page.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
  );
}
```

React also makes it easy to manage side effects (like updating the document title) using hooks such as `useEffect`. This keeps logic related to a component close to its markup, making the codebase easier to understand and maintain.

Another insight is how React's declarative approach helps avoid bugs that come from manually manipulating the DOM. Instead of telling the browser how to change things step by step, I just describe what I want, and React figures out the most efficient way to update the UI.

##### How do HTML and JavaScript work together in React?

React lets you mix JavaScript logic and HTML-like markup (JSX) in the same file. For example, you can declare state variables in JavaScript and then use them directly in your JSX to control the UI:

```jsx
const [password, setPassword] = useState("");
const [length, setLength] = useState(12);
const [includeUppercase, setIncludeUppercase] = useState(true);
const [includeLowercase, setIncludeLowercase] = useState(true);
const [includeNumbers, setIncludeNumbers] = useState(true);
const [includeSymbols, setIncludeSymbols] = useState(false);

return (
  <div>
    <input type="text" value={password} readOnly />
    <input
      type="range"
      min="6"
      max="32"
      value={length}
      onChange={(e) => setLength(Number(e.target.value))}
    />
    <label>
      <input
        type="checkbox"
        checked={includeUppercase}
        onChange={(e) => setIncludeUppercase(e.target.checked)}
      />
      Include Uppercase
    </label>
    {/* ...other options... */}
  </div>
);
```

Here, the state variables (JavaScript) directly control the values and checked states of the HTML inputs (JSX). When a user interacts with the UI, React updates the state, and the UI automatically reflects those changes. This tight integration makes building interactive interfaces much more intuitive.

#### Password Generator Logic

Building the password generator taught me how to combine user input and logic in a React-friendly way. For example, I used state to track which character sets to include, and then generated a password based on those options:

```jsx
const handleGenerate = () => {
  // Define possible character sets
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  // Build the character pool based on user options
  let characters = "";
  if (includeUppercase) characters += upper;
  if (includeLowercase) characters += lower;
  if (includeNumbers) characters += numbers;
  if (includeSymbols) characters += symbols;

  // Generate the password by randomly picking from the pool
  let generatedPassword = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    generatedPassword += characters[randomIndex];
  }

  // Update the password state
  setPassword(generatedPassword);
};
```

React's state management made it easy to update the password whenever the user changed their options.

### Continued development

## Author

- Frontend Mentor - [Vladyslav Shulhach](https://www.frontendmentor.io/profile/vladyslav-shulhach)
