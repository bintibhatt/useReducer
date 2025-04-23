'use client'
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'EAT_COOKIE':
      return { ...state, cookies: state.cookies - 1 };
    case 'ADD_COOKIE':
      return { ...state, cookies: state.cookies + 1 };
    case 'DO_LAUNDRY':
      return { ...state, laundry: 0 };
    case 'MAKE_LAUNDRY':
      return { ...state, laundry: state.laundry + 1 };
    case 'SLEEP_KIDS':
      return { ...state, kidsAwake: false };
    case 'WAKE_KIDS':
      return { ...state, kidsAwake: true };
    default:
      return state;
  }
}

const initialState = {
  cookies: 5,
  laundry: 2,
  kidsAwake: true
};

function MomDashboard() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='mom-dashboard'>
      <h1>Mom’s Dashboard</h1>
      <p>Cookies in jar: 🍪 {state.cookies}</p>
      <p>Laundry piles: 🧺 {state.laundry}</p>
      <p>Kids are {state.kidsAwake ? "AWAKE 👶" : "ASLEEP 😴"}</p>
      <br/>

      <div className='buttons'>
      <button onClick={() => dispatch({ type: 'EAT_COOKIE' })}>Give a Cookie</button>
      <button onClick={() => dispatch({ type: 'ADD_COOKIE' })}>Bake Cookie</button>

      <button onClick={() => dispatch({ type: 'DO_LAUNDRY' })}>Do Laundry</button>
      <button onClick={() => dispatch({ type: 'MAKE_LAUNDRY' })}>Dirty Clothes</button>

      <button onClick={() => dispatch({ type: 'SLEEP_KIDS' })}>Put Kids to Sleep</button>
      <button onClick={() => dispatch({ type: 'WAKE_KIDS' })}>Wake Up Kids</button>
      </div>
    </div>
  );
}

export default MomDashboard