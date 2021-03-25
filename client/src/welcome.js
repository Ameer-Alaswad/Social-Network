import { HashRouter, Route } from "react-router-dom";
import Registration from "./components/registration";
import Login from "./components/login";
import ResetPassword from "./components/resetPassword";
import "./welcome.css";

export default function Welcome() {
    return (
        <div className="welcome-component-container">
            <h1 id="logo">Social Network</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
