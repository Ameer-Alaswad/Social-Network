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
        });
    }

    render() {
        return (
            <div id="uploader-container">
                <h1>hi</h1>
                <input type="file" onChange={(e) => this.handleChange(e)} />
                <button onClick={() => this.uploadImg()}>upload</button>
                <h1 onClick={this.props.toggleUploader}>x</h1>
            </div>
        );
    }
}
