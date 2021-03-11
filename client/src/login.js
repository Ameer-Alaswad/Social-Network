import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
        };
    }

    handleClick() {
        // console.log("clicked!!!");
        axios
            .post("/login ", this.state, {
                xsrfCookieName: "mytoken",
                xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
            })
            .then(({ data }) => {
                if (data.success == true) {
                    // redirect
                    location.replace("/");
                } else {
                    // render an error message
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios POST /registration: ", err);
            });
    }

    handleChange(e) {
        // console.log("e.target.name", e.target.name);
        this.setState(
            {
                // what is between the [] is a vartable
                [e.target.name]: e.target.value,
            }
            // () => console.log("this.state", this.state)
        );
    }

    render() {
        return (
            <div>
                <Link to="/">Click here to sign up!</Link>
                <h1>Log in please</h1>
                {this.state.error && (
                    <p id="registration-warning-message">
                        Password and Email do not match plz try again :(
                    </p>
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="registration-inputs"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="registration-inputs"
                    onChange={(e) => this.handleChange(e)}
                />
                <button
                    onClick={() => this.handleClick()}
                    className="main-button"
                >
                    Submit
                </button>
            </div>
        );
    }
}
