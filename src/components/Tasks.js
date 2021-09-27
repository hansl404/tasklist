import '../App.css'
import React, {useState, useEffect} from "react";
import TaskItem from './TaskItem'

export default () => {

    const [input, setInput] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getLocalTasks()
    }, [])

    useEffect(() => {
        saveLocalTasks()
    }, [tasks])

    const saveLocalTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    const getLocalTasks = () => {
        if (localStorage.getItem('tasks') === null) {
            localStorage.setItem('tasks', JSON.stringify([]))
        } else {
            let taskLocal = JSON.parse(localStorage.getItem('tasks'))
            setTasks(taskLocal)
        }
    }

    const createNewTask = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    const handleSubmit = (e, item) => {
        e.preventDefault();
       
        const newTask = {
            id: Date.now(),
            value: input,
            completed: false,
        }
        
        setTasks([newTask, ...tasks]);
        setInput("");
    }

    const handleComplete = (id) => {
        const updatedTasks = [...tasks].map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })
        setTasks(updatedTasks)
    }

    const deleteTask = (e, id) => {
        e.preventDefault();
        setTasks(tasks.filter( (item) => item.id !== id));
    }

    return (
        <div className="container">

            <div className="header">
                <h1>Tasks</h1>
                <form className="input" onSubmit={handleSubmit}>    
                    <input className="entertask" onChange={createNewTask} value={input}/>
                    <button className="addbutton" type="submit">+</button>      
                </form>
            </div>

            <div className="listcontainer">
                <ul className="todolist">
                    {tasks.map((item) => (
                        <TaskItem item={item} deleteTask={deleteTask} handleComplete={handleComplete} />
                    ))}
                </ul>
            </div>
            
        </div>
    )
}