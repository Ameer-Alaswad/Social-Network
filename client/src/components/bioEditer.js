import axios from "axios";
import React, { Component } from "react";

export default class BioEditer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            btntext: "",
            bio: null,
        };
    }
    componentDidMount() {
        console.log(`this.props.last`, this.props.first);
        console.log(`this.state.bio in bioEditor >>>>>`, this.state.bio);
        axios
            .get("/userInfo")
            .then((Info) => {
                this.setState({
                    bio: Info.data.userInfo.bio,
                });
                if (this.state.bio) {
                    this.setState({
                        btntext: "edit",
                    });
                } else if (this.state.bio == null) {
                    this.setState({
                        btntext: "add bio",
                    });
                }
                console.log(`this.state.bio klaaab`, this.state.bio);
            })
            .catch((err) => console.log("err in axios get userInfo", err));

        // if (this.props.bio) {
        //     this.setState({
        //         btntext: "edit",
        //     });
        // } else if (this.props.bio == null) {
        //     this.setState({
        //         btntext: "add bio",
        //     });
        // }
        if (this.state.bio == null) {
            this.setState({
                btntext: "add bio",
                bio: "tell us about yourself",
            });
        }
    }
    handleChange(e) {
        this.setState({
            // what is between the [] is a vartable
            [e.target.name]: e.target.value,
        });
    }
    // add or editx
    handleClick() {
        // if (this.state.edit == false) {
        //     this.props.updateBio("tell us about yourself");
        // }
        this.setState({
            edit: true,
        });
    }
    // save
    addBio() {
        axios
            .post("/updateBio", this.state, {
                xsrfCookieName: "mytoken",
                xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
            })
            .then((info) => {
                console.log(`info.data`, info.data.bio);
                this.props.updateBio(info.data.bio);
                if (this.state.bio) {
                    this.setState({
                        btntext: "edit",
                        edit: false,
                    });
                } else {
                    this.props.updateBio("tell us about yourself");
                    // this.state.updateBio("tell us about yourself");

                    this.setState({
                        btntext: "add bio",
                        edit: false,
                        bio: "tell us about yourself",
                    });
                }
            });
    }
    bioText() {
        console.log("this.props.bio :>>>>>> ", this.props.bio);
        if (this.props.bio === "tell us about yourself") {
            return "";
        } else {
            return this.props.bio;
        }
    }

    render() {
        return (
            <div>
                <h1>{this.props.first} </h1>
                {!this.state.edit && (
                    <span>
                        {" "}
                        <h1>{this.bioText()}</h1>
                    </span>
                )}
                {this.state.edit && (
                    <div>
                        <div>
                            <textarea
                                rows="5"
                                cols="50"
                                className="text-area-in-bio-editor"
                                placeholder="tell us about your self"
                                name="bio"
                                onChange={(e) => this.handleChange(e)}
                                defaultValue={this.props.bio}
                            />
                        </div>
                        <button onClick={() => this.addBio()}>save</button>
                    </div>
                )}
                {!this.state.edit && (
                    <button onClick={() => this.handleClick()}>
                        {this.state.btntext}
                    </button>
                )}
            </div>
        );
    }
}
