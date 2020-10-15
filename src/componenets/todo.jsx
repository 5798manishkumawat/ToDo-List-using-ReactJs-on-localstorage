import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import "../todo.css";

function Todo (props) {

	const [newTask,setnewTask] = useState("");
	const [list,setlist] = useState([]);
	const [isediting,setisediting]=useState(null);
	const [updating,setUpdating] = useState("");

	const toggleState = (id) => {
		setisediting(id);
	}
	
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

		List.map((task) => {
			if (task.id === id) {
				task.value = updating;
			}
		});
		console.log(List);
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
				<center>
					<div className="form">
						<div className="container">
							<label htmlFor="todo">
								<h3 style={{ color: "white" }}>Let's add one more task.....</h3>
							</label>
							<input
								type="text"
								name="todo"
								placeholder="type task here"
								value={newTask}
								onChange={(e) => setnewTask(e.target.value)}
							></input>
							<button className="btn" onClick={() => addTask()}>
								Add
							</button>
						</div>
					</div>
					<br />
					<br />
					<div className="todolist">
						{list.map((task) => {
							if (isediting === task.id) {
								return (
									<div className="li" key={task.id}>
										<input
											name="editinput"
											type="text"
											defaultValue={task.value}
											onChange={(e)=>setUpdating(e.target.value)}
										/>
										<button
											className="edittaskbtn"
											onClick={() => updateTask(task.id)}
										>
											UpdateTask
										</button>
									</div>
								);
							} else {
								return (
									<div className="li" key={task.id}>
										<h4 className="tasktitle">{task.value}</h4>
										{task.isDone === true && (
											<button className="taskbtn">Completed</button>
										)}

										<button
											className="taskbtn"
											onClick={() => removeTask(task.id)}
										>
											Remove
										</button>

										{task.isDone === false && (
											<button
												className="taskbtn"
												onClick={() => toggleState(task.id)}
											>
												Edit
											</button>
										)}
										{task.isDone === false && (
											<button
												className="taskbtn"
												onClick={() => doneTask(task.id, true)}
											>
												Complete
											</button>
										)}
									</div>
								);
							}
						})}
					</div>
				</center>
			</div>
		);
}

export default Todo;
