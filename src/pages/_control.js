// import React from 'react';
// import { connect } from 'react-redux';

// const ControlPanel = ({ counter, toggle, text, increment, decrement, toggleSwitch, setText }) => (
//   <div>
//     <h1>Counter: {counter}</h1>
//     <button onClick={increment}>Increment</button>
//     <button onClick={decrement}>Decrement</button>
//     <h2>Toggle: {toggle ? 'On' : 'Off'}</h2>
//     <button onClick={toggleSwitch}>Toggle Switch</button>
//     <h2>Text: {text}</h2>
//     <input value={text} onChange={(e) => setText(e.target.value)} />
//   </div>
// );

// const mapStateToProps = (state) => ({
//   counter: state.app.counter,
//   toggle: state.app.toggle,
//   text: state.app.text,
// });

// const mapDispatchToProps = (dispatch) => ({
//   increment: () => dispatch({ type: 'INCREMENT' }),
//   decrement: () => dispatch({ type: 'DECREMENT' }),
//   toggleSwitch: () => dispatch({ type: 'TOGGLE' }),
//   setText: (text) => dispatch({ type: 'SET_TEXT', payload: text }),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
