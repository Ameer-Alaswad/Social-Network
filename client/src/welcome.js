import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import "./welcome.css";

export default function Welcome() {
    return (
        <div className="welcome-component-container">
            <h1>Welcome</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
