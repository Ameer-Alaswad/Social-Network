import React, { Component } from "react";
import axios from "./axios";
import ProfilePicutre from "./components/profilePicture";
import Uploader from "./components/uploader";
import Profile from "./components/profile";
import "./app.css";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first: "",
            last: "",
            imageUrl: "",
            uploaderIsVisible: false,
            bio: null,
        };
    }
    componentDidMount() {
        // console.log(`this.state.bio`, this.state.bio);
        axios
            .get("/userInfo")
            .then((Info) => {
                this.setState({
                    first: Info.data.userInfo.first_name,
                    last: Info.data.userInfo.last_name,
                    imageUrl: Info.data.userInfo.image,
                    bio: Info.data.userInfo.bio,
                });
                console.log(`this.state`, this.state);
            })
            .catch((err) => console.log("err in axios get userInfo", err));
    }
    addProfilePicture(imageUrlFromUploader) {
        this.setState({
            imageUrl: imageUrlFromUploader,
        });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }
    //////////////////////////////////////////////////////
    ///////////////////////
    updateBio(newBio) {
        this.setState({
            bio: newBio,
        });
    }

    render() {
        return (
            <div>
                <h1>hi iam profile</h1>
                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.imageUrl}
                    bio={this.state.bio}
                    toggleUploader={() => this.toggleUploader()}
                    updateBio={(newBio) => this.updateBio(newBio)}
                />
                <h1>hi from profilepic</h1>
                <div
                    className="prfile-pic-container-in-app"
                    onClick={() => this.toggleUploader()}
                >
                    <ProfilePicutre
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                        toggleUploader={() => this.toggleUploader()}
                    />
                </div>
                {/* /////////////////////////////// */}
                {/* ////////////////////////////////// */}
                {this.state.uploaderIsVisible && (
                    <Uploader
                        addProfilePicture={(imageUrl) =>
                            this.addProfilePicture(imageUrl)
                        }
                        toggleUploader={() => this.toggleUploader()}
                    />
                )}
            </div>
        );
    }
}
