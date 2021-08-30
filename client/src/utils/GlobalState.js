import React, { createContext, useContext } from "react";
import { useEventReducer, useTaskReducer } from './reducers';

const AppContext = createContext();
const { Provider } = AppContext;

const CalendarProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useEventReducer({
    events: [],
  });

  return <Provider value={[state, dispatch]} {...props} />
};

const TaskProvider = ({ value = [], ...props }) =>{
  const [state, dispatch] = useTaskReducer({
    tasks: [],
  });

  return <Provider value={[state, dispatch]} {...props} />
}

const useAppContext = () => {
  return useContext(AppContext);
};

export { CalendarProvider, useAppContext, TaskProvider };

