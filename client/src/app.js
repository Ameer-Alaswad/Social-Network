import React, { Component } from "react";
import axios from "./axios";
import ProfilePicutre from "./components/profilePicture";
import Uploader from "./components/uploader";
import Profile from "./components/profile";
import { BrowserRouter, Route } from "react-router-dom";
import "./app.css";
import OtherProfile from "./components/otherProfile";
import FindPeople from "./components/findPeople";
import Friends from "./components/friends";

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
            // we use it wwhen we want to change the whole url
            <BrowserRouter>
                <div>
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
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                imageUrl={this.state.imageUrl}
                                bio={this.state.bio}
                                toggleUploader={() => this.toggleUploader()}
                                updateBio={(newBio) => this.updateBio(newBio)}
                            />
                        )}
                    />
                    <Route
                        path="/user/:id"
                        // when we do not pass props we do not need render and
                        // match wil automaticlly be passed to the child
                        render={(props) => (
                            <OtherProfile
                                // we use history to remember where we were when we go back
                                history={props.history}
                                // we use match to get the id from the params
                                match={props.match}
                                // key is important to prevent rendering the same component
                                // when we click on another profile from other profile
                                key={props.match.url}
                            />
                        )}
                    />

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
                <Route path="/users" component={FindPeople} />
                <Route path="/friends" component={Friends} />
            </BrowserRouter>
        );
    }
}
