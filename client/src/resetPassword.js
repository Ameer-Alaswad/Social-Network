import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            step: 1,
        };
    }
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    resetPassword() {
        axios
            .post("/password/reset/verify", this.state, {
                xsrfCookieName: "mytoken",
                xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
            })
            .then(({ data }) => {
                console.log("data", data);
                if (data.success) {
                    // redirect
                    this.setState({
                        step: 3,
                        error: false,
                    });
                    console.log("this.state.step", this.state.step);
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
    /////////////////////////////////
    //////////////////////////////////
    sendCode() {
        axios
            .post("/password/reset/start", this.state, {
                xsrfCookieName: "mytoken",
                xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
            })
            .then(({ data }) => {
                console.log("data", data);
                if (data.success) {
                    // redirect
                    this.setState({
                        step: 2,
                        error: false,
                    });
                    console.log("this.state.step", this.state.step);
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

    ////////////////////////////////
    //////////////////////////////////
    handleChange(e) {
        this.setState(
            {
                // what is between the [] is a vartable
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state", this.state)
        );
    }

    render() {
        let { step } = this.state;
        return (
            <div>
                <h1>Reset</h1>
                {step == 1 && (
                    <form>
                        <h1>Enter your Email</h1>
                        {/* ////////////////////////////////// */}
                        {this.state.error && (
                            <p id="registration-warning-message">
                                your Email does not exist :(
                            </p>
                        )}
                        {/* ////////////////////////////// */}
                        <input
                            type="email"
                            name="email"
                            onChange={(e) => this.handleChange(e)}
                            required
                        />
                        <button onClick={() => this.sendCode()}>Submit</button>
                    </form>
                )}
                {step == 2 && (
                    <form>
                        <h1>Enter the code we just sent you</h1>
                        {this.state.error && (
                            <p id="registration-warning-message">
                                wrong code! :(
                            </p>
                        )}
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="code"
                            type="text"
                            required
                        />
                        <h1>Enter your new Password</h1>
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="password"
                            type="password"
                            required
                        />
                        <button onClick={() => this.resetPassword()}>
                            Submit
                        </button>
                    </form>
                )}
                {step == 3 && (
                    <div>
                        <h1>your password has been changed</h1>
                        <Link to="/login">go back to log in ??!</Link>
                    </div>
                )}
            </div>
        );
    }
}
