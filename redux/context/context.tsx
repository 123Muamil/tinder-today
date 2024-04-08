import React, { createContext, useContext, useReducer } from 'react';

// Define types for your state
type State = {
  values: Array<any>;
};

// Define action types
type Action = {
  type: string;
  payload: {
    key: string;
    value: any;
  };
};

// Define initial state
const initialState: State = {
  values: [],
};

// Create context for your state
const StateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Define reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_VALUE':
      const existingIndex = state.values.findIndex(item => Object.keys(item)[0] === action.payload.key);
      if (existingIndex !== -1) {
        // If the key already exists, update its value
        const updatedValues = [...state.values];
        updatedValues[existingIndex] = { [action.payload.key]: action.payload.value };
        return { ...state, values: updatedValues };
      } else {
        // If the key doesn't exist, add it to the state
        return { ...state, values: [...state.values, { [action.payload.key]: action.payload.value }] };
      }
    default:
      return state;
  }
};

// Create a provider component to wrap your app
export const StateProvider: React.FC = ({ children }:any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to easily access the state and dispatch
export const useStateContext = () => useContext(StateContext);