import React, { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import TODO from "./todo";
import IMAGE from "../logo.png";

function Login() {
	const [newEmail, setnewEmail] = useState("");
	const [newPassword, setnewPassword] = useState("");
	const [userList, setuserList] = useState([]);
	const [currentEmail, setcurrentEmail] = useState("");

	useEffect(() => {
			fetch();
		setcurrentEmail("");
	}, []);

	const fetch = () => {
		if (localStorage.getItem("user") === null) {
			setuserList([]);
		} else {
			let userlist = JSON.parse(localStorage.getItem("user"));
			setuserList(userlist);
		}
	};

	const registerUser = () => {

		const newUser = {
			id: 1 + Math.random(),
			email: newEmail.slice(),
			password: newPassword.slice(),
		};
		const userlist = [...userList];
		let f = false;
		userlist.map((user) => {
			if (user.email === newEmail && user.password === newPassword) {
				console.log("yessss");
				f = true;
			}
		});

		if (f) {
			alert("This Username is already registered!!");
		} else {
			userlist.push(newUser);
			setuserList(userlist);
			localStorage.setItem("user", JSON.stringify(userlist));
			alert(
				"Username is Successfully registered!!Click on login button to login..."
			);
		}
	};

	const loginUser = () => {

		const userlist = [...userList];
		let f = false;
		userlist.map((user) => {
			if (user.email === newEmail && user.password === newPassword) {
				console.log("yessss");
				f = true;
			}
		});
		if (f) {
			setcurrentEmail(newEmail);
		} else {
			alert("Your Username or Password is Incorrect!!");
		}
	};

	return (
		<div className="bg">
			{currentEmail.length === 0 && (
				<center>
					<div className="form">
						<div className="imgcontainer">
							<img src={IMAGE} className="avatar" alt="avatar" />
						</div>
						<div className="container">
							<label htmlFor="uname">
								<b>Username</b>
							</label>
							<input
								type="text"
								placeholder="Type your Email"
								name="uname"
								value={newEmail}
								onChange={(e) => setnewEmail(e.target.value)}
								required
							/>
							<br />
							<label htmlFor="psw">
								<b>Password</b>
							</label>
							<input
								type="password"
								name="psw"
								placeholder="Type your Password"
								value={newPassword}
								onChange={(e) => setnewPassword(e.target.value)}
								required
							/>
							<br />
							<button className="btn" onClick={() => registerUser()}>
								Register
							</button>
							<button className="btn" onClick={() => loginUser()}>
								Login
							</button>
						</div>
					</div>
				</center>
			)}
			{currentEmail.length !== 0 && (
				<div>
					<TODO passEmail={currentEmail} />
				</div>
			)}
		</div>
	);
}

export default Login;
