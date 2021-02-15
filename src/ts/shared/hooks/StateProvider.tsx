import React, { createContext, useContext, useReducer } from "react";
import {  mainReducer, initialState, State, MainReducer } from "../store/reducers/mainReducer";
import { Action } from "../store/actions/Action";

const stateCtx = createContext(initialState);
const dispatchCtx = createContext((() => 0) as React.Dispatch<Action>);

export const StateProvider = (props: any) => {
  const [state, dispatch] = useReducer<MainReducer>(
    mainReducer,
    initialState
  );
    return (
        <dispatchCtx.Provider value={dispatch}>
        <stateCtx.Provider value={state}>
          {props.children}
        </stateCtx.Provider>
      </dispatchCtx.Provider> 

    );
};
export const useDispatch = () => {
    return useContext(dispatchCtx);
  };
  
  export const useGlobalState = <K extends keyof State>(property: K) => {
    const state = useContext(stateCtx);
    return state[property]; // only one depth selector for comparison
  };
