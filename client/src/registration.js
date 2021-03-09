import React from "react";
import "./registration.css";
import axios from "axios";

export default class Registration extends React.Component {
    constructor() {
        super();

        this.state = {
            error: true,
        };
    }
    handleClick() {
        // console.log("clicked!!!");
        axios
            .post("/registration", this.state)
            .then(({ data }) => {
                if () {
                    // redirect
                    location.replace('/');
                } else {
                    // render an error message
                    this.setState({
                        error: true
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios POST /registration: ", err);
            });
    }

    handleChange(e) {
        console.log("e.target.name", e.target.name);
        this.setState(
            {
                // what is between the [] is a vartable
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state", this.state)
        );
    }

    render() {
        return (
            <div className="registration-container">
                <h1>Sign up please</h1>
                {this.state.error && <p>something went wrong :(</p>}
                <div className="registration-form-container">
                    <button
                        onClick={() => this.handleClick()}
                        className="main-button"
                    >
                        Submit
                    </button>

                    <input
                        type="text"
                        name="first"
                        placeholder="Firstname"
                        className="registration-inputs"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        type="text"
                        name="last"
                        placeholder="Lastname"
                        className="registration-inputs"
                        onChange={(e) => this.handleChange(e)}
                    />
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
                </div>
            </div>
        );
    }
}
