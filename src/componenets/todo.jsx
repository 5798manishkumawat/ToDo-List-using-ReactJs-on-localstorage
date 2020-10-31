import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import AddTodo from "./addTodo";
import TodoList from "./todoList";
import "../todo.css";

function Todo (props) {

	const [newTask,setnewTask] = useState("");
	const [list,setlist] = useState([]);
	const [isediting,setisediting]=useState(null);
	const [updating,setUpdating] = useState("");

	const fetch = useCallback(() => {
		if (localStorage.getItem(`store${props.passEmail}`) === null) {
			setlist([]);
		} else {
			let List = JSON.parse(
				localStorage.getItem(`store${props.passEmail}`)
			);
			setlist(List);
		}
	},[props.passEmail]);

	useEffect(() => {
		fetch()
	}, [fetch]);

	const updateTask = (id) => {

		const List = [...list];
		console.log(updating);
		List.map((task) => {
			if (task.id === id) {
				task.value = updating;
			}
		});
		setlist(List);
		setisediting(null);
		localStorage.setItem(`store${props.passEmail}`, JSON.stringify(List));
		setUpdating("");
	}
	const addTask = () => {
		const NewTask = {
			id: 1 + Math.random(),
			isDone: false,
			value: newTask.slice(),
		};
		const List = [...list];

		List.push(NewTask);
		setlist(List);
		localStorage.setItem(`store${props.passEmail}`, JSON.stringify(List));
	}

	const removeTask = (id) => {

		const List = [...list];
		const updt = List.filter((task) => task.id !== id);
		setlist(updt);

		localStorage.setItem(`store${props.passEmail}`, JSON.stringify(updt));
	}

	const doneTask = (id, ack) => {

		const List = [...list];
		List.map((task) => {
			if (task.id === id) {
				task.isDone = ack;
			}
		});
		setlist(List);
		localStorage.setItem(`store${props.passEmail}`, JSON.stringify(List));
	}
		return (
			<div>
				<center className="todo_page">
					<AddTodo addTask={addTask} newTask={newTask} setnewTask={setnewTask} />
					<TodoList 
					isediting={isediting} 
					setisediting={setisediting} 
					setUpdating={setUpdating} 
					updateTask={updateTask}
					removeTask={removeTask} 
					doneTask={doneTask} 
					list={list} />
				</center>
			</div>
		);
}

export default Todo;
