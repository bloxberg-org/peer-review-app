import React from 'react';

// Context to access user in App state without props drilling.
// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore
// see https://www.toptal.com/react/react-context-api

const Context = React.createContext();

export default Context;