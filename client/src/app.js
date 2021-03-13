import React, { Component } from "react";
import axios from "./axios";
import ProfilePicutre from "./components/profilePicture";
import Uploader from "./components/uploader";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first: "",
            last: "",
            imageUrl: "",
            uploaderIsVisible: false,
        };
    }
    componentDidMount() {
        axios
            .get("/userInfo")
            .then((Info) => {
                this.setState({
                    first: Info.data.userInfo.first_name,
                    last: Info.data.userInfo.last_name,
                });
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

    render() {
        return (
            <div>
                <h1>hi from app</h1>
                <div onClick={() => this.toggleUploader()}>
                    <ProfilePicutre
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                    />
                </div>
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
