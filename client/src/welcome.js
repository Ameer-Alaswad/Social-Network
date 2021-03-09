import Registration from "./registration";
import "./welcome.css";

export default function Welcome() {
    return (
        <div className="welcome-component-container">
            <h1>Welcome</h1>
            <Registration />
        </div>
    );
}
