<div style="font-size: 50px; font-weight:700">
  useReducer
</div>

## __1. Imagine You're the mom/manager of your House = A React Component__

You're the manager of the house. Inside your house, lots of things are happening:  
- Kids are playing
- Groceries are being used
- Laundry is piling up
- People are asking for snacks

This is like your component's state — things that change over time.

If it’s just one or two things (e.g., isDinnerReady? yes/no), it’s easy to manage with useState. But when you’ve got multiple, related, and changing things — it’s time for something more structured.

### Enter: useReducer

## __2. What is useReducer Really Doing?__

It’s like hiring an assistant who:

- Keeps track of everything for you (the current state)
- Follows a rulebook (called a “reducer”) for what to do when something happens
- Only changes things when you ask (by “dispatching” actions)

So you don’t get overwhelmed. 

## __3. The Ingredients__

### 1. Initial State
- What your house looks like at the start.
```javascript
const initialState = {
  cookies: 5,
  laundry: 2,
  kidsAwake: true
};
```

### 2. The Rulebook (Reducer Function)
- This is your set of rules. If a kid asks for something, you open the book and follow the instructions.

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'EAT_COOKIE':
      return { ...state, cookies: state.cookies - 1 };

    case 'DO_LAUNDRY':
      return { ...state, laundry: 0 };

    case 'WAKE_KIDS':
      return { ...state, kidsAwake: true };

    case 'SLEEP_KIDS':
      return { ...state, kidsAwake: false };

    default:
      return state; // if we don't understand the request, do nothing
  }
}
```
### 3. The useReducer Setup

```
const [state, dispatch] = useReducer(reducer, initialState);
```

- `state`: current values (cookies, laundry, kids)

- `dispatch`: how we send actions, like “EAT_COOKIE”

- Full example : Mom-dashboard

### 4. Key Points

- `state` – current values (cookies, laundry, etc.)

- `dispatch` – a function to send an action like { type: 'EAT_COOKIE' }

- `reducerFunction(state, action)` – a rulebook that says: "if this happens, update state like this"

- `initialState` – your starting setup

## 5. Why Use useReducer Instead of useState?

| useState	| useReducer|
|---------------------|---------------|
| Simple state updates	| Complex logic, multi-step updates|
| Good for 1–2 values	  | Better for objects or many values|
| Inline logic	|          Centralized decision-making|
| Can get messy with dependencies |	Cleaner with interrelated state|

** If you're updating multiple things at once or state updates depend on the previous state, useReducer is more maintainable.

## 6. useReducer + useContext

They solve different problems, but often work together in more complex apps.

- **useContext:** The Thread that Shares  
  - Lets you share state or functions across components without passing props down  
  - Think of it like the family group chat – all parts of the house get updates (even the garage)

- **useReducer:** The Decision Brain  
  - Manages the logic for how state changes
  - Like the mom’s brain that decides what to do when a kid says "I'm hungry"

- Combining them:
  ```javascript
  const AppContext = createContext();

  function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <AppContext.Provider value={{ state, dispatch }}>
        {children}
      </AppContext.Provider>
    );
  }
  ```
  - Now any child component can use:
  ```javascript
  const { state, dispatch } = useContext(AppContext);
  ```

## 7. useReducer vs useContext

| Feature |	useReducer	|useContext|
|--------|----------|------|
Purpose | Manages complex state logic | Shares data or functions across components
What it does | Takes a state and an action, returns new state | Provides a way to access global data
Best for | State updates, rules, and transitions | Avoiding prop-drilling (passing props deeply)
Analogy | Brain: Decides what to do | Walkie-talkie: Shares info across the house
Stores State? | Yes, it holds and updates state | No, just shares what it's given
Involves dispatch? | Yes, actions are dispatched | No, unless you’re passing dispatch inside
Standalone use? | Yes | Yes
Works well together? |  Perfect combo | Pass state and dispatch to everyone


## 8. When Should You Use useReducer?
- Managing multiple related values
- Updating state based on current state
- Centralizing state update logic
- Wanting Redux-like structure without Redux
- Sharing state with useContext

## 9. Real-World Use Cases for useReducer


### 1. Complex Forms
- Forms with lots of inputs, validations, toggles, and conditions.
- Each form input changes part of the state.
- You may need to handle input changes, errors, and reset all at once.
- Example
```javascript
{
  name: '',
  email: '',
  errors: {},
  touched: {},
}
```

### 2. Undo/Redo Functionality
- Apps like drawing tools, document editors, or games that track past states.   
- You need to store history and manipulate it.
- Reducing state in a controlled way makes it easy to manage past, present, future.


### 3. Shopping Carts / Lists
- Think: e-commerce carts, todo lists, playlists.
- Adding, removing, and updating items require centralized logic.
- The state is typically an array of items with quantities or flags.

### 4. When State Depends on State
- If state updates depend on the previous state (not just new values), useReducer is perfect.
- It ensures you're always working with the latest state.
- Easier than doing setState(prev => ...) many times.


## 10. Common Questions

### 1.  When should I use `useReducer` vs `useState`?

#### Use useState when:

- State is simple (a toggle, input, counter)
- You’re managing one or two unrelated values

#### Use useReducer when:

- You have complex or related state (objects, multiple flags)
- You want to centralize state logic
- State updates depend on previous state

### 2. Can `useReducer` replace Redux?

- `useReducer` + `useContext` can mimic Redux for small to medium apps.

### 3. Is `useReducer` slower than `useState`?
No. In fact, it can perform better when:
- You batch complex state updates in one reducer call
- You avoid unnecessary re-renders with memoization

### 4. Can I use `useReducer` with `useEffect`?

```javascript
useEffect(() => {
    dispatch({ type: 'LOADING' });
    fetchData().then(
      data => dispatch({ type: 'SUCCESS', payload: data }),
      error => dispatch({ type: 'ERROR', payload: error })
    );
  }, []);
```

- Starts with an idle state.
- On mount (useEffect), it dispatches 'LOADING'.
- After a delay (fetchData()), it either:
  - Dispatches 'SUCCESS' with data
  - Or dispatches 'ERROR' if there's a failure

### 5. How do I reset state with useReducer?

- Just add a RESET action:
```javascript
case 'RESET':
  return initialState;
```

- Then dispatch it:
```javascript
dispatch({ type: 'RESET' });
```