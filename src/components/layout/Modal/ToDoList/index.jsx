"use client";

import React, { use, useState } from "react";
import styles from "@/components/layout/Modal/ToDoList/style.module.css";
import IconChecked from "../../../shared/IconCheck/index";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./Sortable/SortableItem";
import { restrictToParentElement } from "@dnd-kit/modifiers";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [completedTodo, setCompletedTodo] = useState(false);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completedTodo }]);
      setNewTodo("");
    }
  };

  const toggleTodo = () => {
    setCompletedTodo(!completedTodo);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (!active || !over) return;

    console.log("Active ID:", active.id);
    console.log("Over ID:", over.id);
    console.log("Todos Before Move:", todos);

    if (active.id !== over.id) {
      setTodos((prevTodos) => {
        const oldIndex = prevTodos.findIndex((todo) => todo.id === active.id);
        const newIndex = prevTodos.findIndex((todo) => todo.id === over.id);

        return arrayMove(prevTodos, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <div className={styles.container}>
        <div className={styles.addTasksField}>
          <input
            type="text"
            placeholder="adicionar nova tarefa"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
        </div>
        <SortableContext
          items={todos.map((todo) => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          {todos.map((todo) => (
            

            <SortableItem key={todo.id} id={todo.id}>
              <div className={styles.taskContainer}>
                <div
                  className={[
                    styles.completed,
                    completedTodo
                    ? styles.completedTodo
                    : styles.notCompletedTodo,
                  ].join(" ")}
                  onClick={toggleTodo}
                  >
                  {console.log(completedTodo)}
                  <div
                    className={[
                      completedTodo
                      ? styles.iconChecked
                      : styles.iconNotChecked,
                    ].join(" ")}
                    >
                    <IconChecked />
                  </div>
                </div>

                <h3
                  className={[
                    styles.textTask,
                    completedTodo
                    ? styles.textTaskCompleted
                    : styles.textTaskNotCompleted,
                  ].join(" ")}
                  >
                  {todo.text}{" "}
                </h3>
                <button onClick={() => removeTodo(todo.id)}>remover </button>
              </div>
            </SortableItem>

          ))}
        </SortableContext>
      </div>
      </DndContext>
  );
};

export default ToDoList;
