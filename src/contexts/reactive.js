// ----- reactive.js -----

// Global dependency tracker
const effectStack = [];

// Create reactive state (signal)
export function createState(initialValue) {
  let value = initialValue;
  const subscribers = new Set();
  console.log(value)
  const get = () => {
    // Track dependency if inside an effect
    const activeEffect = effectStack[effectStack.length - 1];
    if (activeEffect) subscribers.add(activeEffect);
    return value;
  };

  const set = (newValue) => {
    if (typeof newValue === "function") value = newValue(value);
    else value = newValue;

    // Notify all subscribers
    subscribers.forEach((fn) => fn());
  };

  return [get, set];
}

// Create reactive effect
export function createEffect(fn) {
  const effectFn = () => {
    try {
      effectStack.push(effectFn);
      fn();
    } finally {
      effectStack.pop();
    }
  };

  effectFn(); // run immediately
}

// Example helper: reactive array map (optional)
export function reactiveMap(arr, mapFn) {
  return arr.map((item, index) => mapFn(item, index));
}


function useState(initialValue) {
  let state = initialValue;

  function setState(newValue) {
    state = newValue;
    console.log("State updated to:", state); // For demonstration purposes
  }

  function getState() {
    return state;
  }

  return [getState, setState];
}

// Example usage
const [getCount, setCount] = useState(0);

console.log(getCount()); // Output: 0
setCount(5);
console.log(getCount()); // Output: 5