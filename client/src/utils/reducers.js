import { useReducer } from 'react';
import {
  ADD_EVENT,
  ADD_TASK,
  REMOVE_EVENT,
  REMOVE_TASK
} from './actions'

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...action.event],
      };

    case ADD_TASK:
      return {

      }

      default: 
        return state;
  }
};

export function useEventReducer(initialState) {
  return useReducer(reducer, initialState);
};

export function useTaskReducer(initialState) {
  return useReducer(reducer, initialState);
};