import React, { createContext, useContext } from 'react';

export const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children, value }) => (
    <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
);
