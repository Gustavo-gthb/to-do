"use client";

import React, { useState } from "react";
import styles from "@/components/layout/Modal/ToDoList/style.module.css"

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className={styles.container} > 
      <div className={styles.addTasksField}>
        <input
          type="text"
          placeholder="adicionar nova tarefa"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
      </div>

      

      {todos.map((todo) => (
        <div className={styles.taskListField}>
        
        <li key={todo.id}>
          <div className={styles.taskContainer}>

          <div className={[styles.completed, todo.completed ? styles.completedTodo : styles.notCompletedTodo].join(' ')}></div>

          <h3>{todo.text} </h3>
          <button onClick={() => removeTodo(todo.id)}>remover </button>
          </div>
        </li>
        </div>
      ))}
    </div>
  );
};

export default ToDoList;
