import React from 'react'
import styles from "@/components/layout/Modal/style.module.css"
import ToDoList from './ToDoList';

const Modal = () => {
  return (

    <ToDoList/>
    // <div className={styles.container}>

    //     <div className={styles.addTasksField}>
    //         campo de pesquisa aaaaaaaaaaaaaaa
    //     </div>

    //     <div className={styles.taskListField}>
    //       <ToDoList/>
    //     </div>

    // </div>
  )
}

export default Modal;