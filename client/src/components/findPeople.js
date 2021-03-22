import { useState, useEffect } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import "./findPeople.css";

export default function FindPeople() {
    const [searchTerm, setSearchTerm] = useState("");
    const [resultUsers, setResultUsers] = useState();
    const [isThereUsers, setIsThereUsers] = useState(false);
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    useEffect(function () {
        axios
            .get("/recent-users")
            .then((response) => {
                setResultUsers(response.data.rows);
            })
            .catch((err) => console.log(`err in axios recent-users`, err));
    }, []);
    //////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    useEffect(
        function () {
            if (searchTerm == "") {
                // setSearchTerm("");
                axios
                    .get("/recent-users")
                    .then((response) => {
                        setResultUsers(response.data.rows);
                    })
                    .catch((err) =>
                        console.log(`err in axios recent-users`, err)
                    );
            } else {
                setIsThereUsers(false);
                axios
                    .get("/users/search/" + searchTerm)

                    .then((response) => {
                        if (response.data.users == "") {
                            setIsThereUsers(true);
                        }
                        setResultUsers(response.data.users);
                    })
                    .catch((err) => {
                        console.log("err in axios users/search", err);
                    });
            }
        },
        [searchTerm]
    );
    /////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    return (
        <div className="find-people-container">
            <input
                className="search-input"
                placeholder="search for friends"
                defaultValue={searchTerm}
                onChange={({ target }) => {
                    setSearchTerm(target.value);
                }}
            />
            {isThereUsers && <h1>there are no results!</h1>}
            {resultUsers &&
                resultUsers.map((user) => {
                    return (
                        <div
                            className="image-container-findPeople"
                            key={user.id}
                        >
                            <Link
                                className="link-in-findPeople"
                                to={`/user/${user.id}`}
                            >
                                <h3>
                                    {user.first_name} {user.last_name}
                                </h3>

                                <img
                                    src={
                                        user.image ||
                                        "https://www.edmundsgovtech.com/wp-content/uploads/2020/01/default-picture_0_0.png"
                                    }
                                    alt=""
                                />
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
}
