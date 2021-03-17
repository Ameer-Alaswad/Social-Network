import { useState, useEffect } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [searchTerm, setSearchTerm] = useState();
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
                console.log(`result`, response.data);
            })
            .catch((err) => console.log(`err in axios recent-users`, err));
    }, []);
    //////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    useEffect(
        function () {
            if (searchTerm == undefined) {
                setSearchTerm(undefined);
            } else {
                axios
                    .get("/users/search/" + searchTerm)
                    .then((response) => {
                        console.log("response.data", response.data);
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
        <div>
            <input
                defaultValue={searchTerm}
                onChange={({ target }) => {
                    setSearchTerm(target.value);
                }}
            />
            {isThereUsers && <h1>there are no results!</h1>}
            {resultUsers &&
                resultUsers.map((user) => {
                    return (
                        <div key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                <div>
                                    {user.first_name} {user.last_name}
                                </div>

                                <img src={user.image} alt="" />
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
}
