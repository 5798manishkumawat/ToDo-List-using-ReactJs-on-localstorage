import React from "react";
import "../todo.css";

function TodoList ({isediting,setUpdating,setisediting,updateTask,removeTask,doneTask,list}) {

		return (
                <div className="todolist">
						{list.map((task) => {
							if (isediting === task.id) {
								return (
									<div className="li" key={task.id}>
										<input
											name="editinput"
											type="text"
											value={task.value}
											onChange={(e)=>setUpdating(e.target.value)}
										/>
										{/* <button
											className="edittaskbtn"
											onClick={() => updateTask(task.id)}
										>
											UpdateTask
										</button> */}
										<i className="fa fa-check ubtn" aria-hidden="true" onClick={() => updateTask(task.id)}></i>
									</div>
								);
							} else {
								return (
									<div className="li" key={task.id}>
										<h4 className="tasktitle">{task.value}</h4>
										{/* {task.isDone === true && (
											<button className="taskbtn">Completed</button>
										)} */}

					
										<i className="fa fa-trash-o fa-lg rbtn" aria-hidden="true" onClick={() => removeTask(task.id)}></i>
								

										{task.isDone === false && (
											<i className="fa fa-pencil-square-o ebtn" aria-hidden="true" onClick={() => setisediting(task.id)}></i>
										)}
										{task.isDone === false && (
											<i className="fa fa-check-square-o dbtn" aria-hidden="true" onClick={() => doneTask(task.id, true)}></i>
										)}
									</div>
								);
							}
						})}
					</div>
		);
}

export default TodoList;
