import React, { Component } from "react";
import axios from "../axios";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            image: "",
            bio: "",
        };
    }
    componentDidMount() {
        let userId = this.props.match.params;
        console.log(`this.props.match`, this.props.match.params.id);
        axios
            .post("/userid", userId, {
                xsrfCookieName: "mytoken",
                xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
            })
            .then((response) => {
                let imageUrl = response.data.data.image;
                if (userId.id == response.data.currentUserId) {
                    return this.props.history.push("/");
                }
                if (response.data.data.image == null) {
                    imageUrl =
                        imageUrl ||
                        "https://www.edmundsgovtech.com/wp-content/uploads/2020/01/default-picture_0_0.png";
                }
                this.setState({
                    first_name: response.data.data.first_name,
                    last_name: response.data.data.last_name,
                    image: imageUrl,
                    bio: response.data.data.bio,
                });
                console.log(`this.state in other`, response.data.data.image);
            })
            .catch((err) => {
                console.log(`err in axios otherProfile`, err);
                return this.props.history.push("/");
            });
    }

    render() {
        return (
            <div>
                {" "}
                <h1>
                    {this.state.first_name} {this.state.last_name}
                </h1>
                <img src={this.state.image} alt="" />
                <h1>{this.state.bio}</h1>
            </div>
        );
    }
}
