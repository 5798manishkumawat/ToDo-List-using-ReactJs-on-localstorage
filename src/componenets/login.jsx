import React, { Component } from "react";
import "../App.css";
import TODO from "./todo";
import IMAGE from "../logo.png";
class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      newEmail: "",
      newPassword: "",
      userList: [],
      isUserAvailable: false,
      currentEmail: "",
    };
  }

  componentDidMount = async () => {
    this.fetch();
    this.setState({ currentEmail: "" });
  };

  fetch() {
    if (localStorage.getItem("user") === null) {
      this.setState({ userList: [] });
    } else {
      let userList = JSON.parse(localStorage.getItem("user"));
      this.setState({ userList });
    }
  }

  updateInput(key, value) {
    this.setState({ [key]: value });
  }

  registerUser() {
    this.fetch();
    const newUser = {
      id: 1 + Math.random(),
      email: this.state.newEmail.slice(),
      password: this.state.newPassword.slice(),
    };
    const userList = [...this.state.userList];

    this.checkUser();

    if (this.state.isUserAvailable === true) {
      this.setState({ isUserAvailable: false });
      alert("This Username is already registered!!");
    } else {
      userList.push(newUser);
      this.setState({ userList });
      localStorage.setItem("user", JSON.stringify(userList));
      this.setState({ isUserAvailable: false });
      alert(
        "Username is Successfully registered!!Click on login button to login..."
      );
    }
  }

  async loginUser() {
    await this.checkUser();
    const email = this.state.newEmail;
    if (this.state.isUserAvailable === true) {
      this.setState({ currentEmail: email, isUserAvailable: false });
    } else {
      await this.setState({ isUserAvailable: false });
      alert("Your Username or Password is Incorrect!!");
    }
  }

  async checkUser() {
    this.fetch();
    const email = this.state.newEmail;
    const password = this.state.newPassword;
    let f = false;
    const userList = [...this.state.userList];
    userList.map((user) => {
      if (user.email === email && user.password === password) {
        console.log("yessss");
        f = true;
      }
    });
    if (f) {
      console.log("yesss2");
      await this.setState({ isUserAvailable: true });
    }
  }

  render() {
    return (
      <div>
        {this.state.currentEmail.length == 0 && (
          <center>
            <div class="form">
              <div class="imgcontainer">
                <img src={IMAGE} class="avatar" />
              </div>
              <div class="container">
                <label for="uname">
                  <b>Username</b>
                </label>
                <input
                  type="text"
                  placeholder="Type your Email"
                  name="uname"
                  value={this.state.newEmail}
                  onChange={(e) => this.updateInput("newEmail", e.target.value)}
                  required
                />
                <br />
                <label for="psw">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  name="psw"
                  placeholder="Type your Password"
                  value={this.state.newPassword}
                  onChange={(e) =>
                    this.updateInput("newPassword", e.target.value)
                  }
                  required
                />
                <br />
                <button class="btn" onClick={() => this.registerUser()}>
                  Register
                </button>
                <button class="btn" onClick={() => this.loginUser()}>
                  Login
                </button>
              </div>
            </div>
          </center>
        )}
        {this.state.currentEmail.length !== 0 && (
          <div>
            <TODO passEmail={this.state.currentEmail} />
          </div>
        )}
      </div>
    );
  }
}

export default Login;
