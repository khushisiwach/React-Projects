import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

function TodoItem({ todo }) {
    const [isEditable, setIsEditable] = useState(false);
    const [updatedText, setUpdatedText] = useState(todo.todo);
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    const handleUpdate = () => {
        if (updatedText.trim()) {
            updateTodo(todo.id, { ...todo, todo: updatedText });
            setIsEditable(false);
        }
    };

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm text-black ${
                todo.completed ? 'bg-[#c6e9a7]' : 'bg-[#ccbed7]'
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isEditable ? 'border-black/10 px-2' : 'border-transparent'
                } ${todo.completed ? 'line-through' : ''}`}
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
                readOnly={!isEditable}
            />
            <button
                className="inline-flex w-8 h-8 rounded-lg border justify-center items-center bg-gray-50 hover:bg-gray-100"
                onClick={() => (isEditable ? handleUpdate() : setIsEditable(!isEditable))}
                disabled={todo.completed}
            >
                {isEditable ? '📁' : '✏️'}
            </button>
            <button
                className="inline-flex w-8 h-8 rounded-lg border justify-center items-center bg-gray-50 hover:bg-gray-100"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem
