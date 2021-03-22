import React, { Component } from "react";
import axios from "../axios";
import FriendsButton from "../components/friendsButton";
import "./otherProfile.css";

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
        let otherUserId = this.props.match.params;
        console.log(`this.props.match`, this.props.match.params.id);
        axios
            .post("/userid", otherUserId, {
                xsrfCookieName: "mytoken",
                xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
            })
            .then((response) => {
                let imageUrl = response.data.data.image;
                if (otherUserId.id == response.data.currentotherUserId) {
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
            <div className="other-profile-container">
                {" "}
                <img src={this.state.image} alt="" />
                <section>
                    <h1>
                        {this.state.first_name} {this.state.last_name}
                    </h1>
                    <h1>{this.state.bio}</h1>
                    <FriendsButton otherUserId={this.props.match.params.id} />
                </section>
            </div>
        );
    }
}
