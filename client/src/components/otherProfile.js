import React, { Component } from "react";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {
        console.log(`this.props.match`, this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <h1>cccccccccccccccc</h1>
            </div>
        );
    }
}
