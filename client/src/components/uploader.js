import React, { Component } from "react";
import axios from "../axios";
import "./uploader.css";

export default class Uploader extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {}

    handleChange(e) {
        this.file = e.target.files[0];
    }
    uploadImg() {
        const formData = new FormData();
        formData.append("file", this.file);
        axios.post("/uploadImage", formData).then((response) => {
            // console.log("data", response.data.imageUrl);
            this.props.addProfilePicture(response.data.imageUrl);
            this.props.toggleUploader();
        });
    }

    render() {
        return (
            <div id="uploader-container">
                <h2>upload a picture!</h2>
                <input type="file" onChange={(e) => this.handleChange(e)} />
                <button
                    className="upload-button"
                    onClick={() => this.uploadImg()}
                >
                    upload
                </button>
                <button onClick={this.props.toggleUploader}>close</button>
            </div>
        );
    }
}
