import React, { Component } from "react";
import "../todo.css";

class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newTask: "",
			list: [],
			isediting: null,
			editedInput: "",
		};
	}

	toggleState(id) {
		// const isediting = this.state.isediting;
		this.setState({ isediting: id });
	}

	componentDidMount = async () => {
		this.fetch();
	};

	fetch() {
		if (localStorage.getItem(`store${this.props.passEmail}`) === null) {
			this.setState({ list: [] });
		} else {
			let list = JSON.parse(
				localStorage.getItem(`store${this.props.passEmail}`)
			);
			this.setState({ list });
		}
	}
	updateInput(key, value) {
		this.setState({ [key]: value });
	}
	updateTask(id) {
		this.fetch();

		const list = [...this.state.list];

		list.map((task) => {
			if (task.id === id) {
				task.value = this.input.value;
			}
		});
		console.log(list);
		this.setState({ list });
		this.setState({ isediting: null });
		localStorage.setItem(`store${this.props.passEmail}`, JSON.stringify(list));
	}
	addTask() {
		this.fetch();
		const newTask = {
			id: 1 + Math.random(),
			isDone: false,
			value: this.state.newTask.slice(),
		};
		const list = [...this.state.list];

		list.push(newTask);
		this.setState({ list });
		localStorage.setItem(`store${this.props.passEmail}`, JSON.stringify(list));
	}

	removeTask(id) {
		this.fetch();

		const list = [...this.state.list];
		const updt = list.filter((task) => task.id !== id);
		// list.map((task) => {
		//   if (task.id == id) {
		//     list.splice(task, 1);
		//   }
		// });
		this.setState({ list: updt });

		localStorage.setItem(`store${this.props.passEmail}`, JSON.stringify(updt));
	}

	doneTask(id, ack) {
		this.fetch();

		const list = [...this.state.list];
		list.map((task) => {
			if (task.id === id) {
				task.isDone = ack;
			}
		});
		this.setState({ list });
		localStorage.setItem(`store${this.props.passEmail}`, JSON.stringify(list));
	}

	render() {
		return (
			<div>
				<center>
					<div class="form">
						<div class="container">
							<label htmlFor="todo">
								<h3 style={{ color: "white" }}>Let's add one more task.....</h3>
							</label>
							<input
								type="text"
								name="todo"
								placeholder="type task here"
								value={this.state.newTask}
								onChange={(e) => this.updateInput("newTask", e.target.value)}
							></input>
							<button class="btn" onClick={() => this.addTask()}>
								Add
							</button>
						</div>
					</div>
					<br />
					<br />
					<div class="todolist">
						{this.state.list.map((task) => {
							if (this.state.isediting === task.id) {
								return (
									<div class="li" key={task.id}>
										<input
											name="editinput"
											type="text"
											defaultValue={task.value}
											ref={(value) => {
												this.input = value;
											}}
										/>
										<button
											class="edittaskbtn"
											onClick={() => this.updateTask(task.id)}
										>
											UpdateTask
										</button>
									</div>
								);
							} else {
								return (
									<div class="li" key={task.id}>
										<h4 class="tasktitle">{task.value}</h4>
										{task.isDone === true && (
											<button class="taskbtn">Completed</button>
										)}

										<button
											class="taskbtn"
											onClick={() => this.removeTask(task.id)}
										>
											Remove
										</button>

										{task.isDone === false && (
											<button
												class="taskbtn"
												onClick={() => this.toggleState(task.id)}
											>
												Edit
											</button>
										)}
										{task.isDone === false && (
											<button
												class="taskbtn"
												onClick={() => this.doneTask(task.id, true)}
											>
												Incomplete
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
}

export default Todo;
