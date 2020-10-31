import React from "react";
import "../todo.css";

function AddTodo ({newTask,setnewTask,addTask}) {

		return (
					<div className="addtodoform">
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
							<button type="button" className="btn btn-primary" onClick={() => addTask()}>Add</button>
						</div>
					</div>	
		);
}

export default AddTodo;
