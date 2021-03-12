const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./utils/bc.js");
const db = require("./db");
const { applyMiddleware } = require("redux");
const ses = require("./ses");
const cryptoRandomString = require("crypto-random-string");

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
// it must be uner the cookie applyMiddleware
app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "..", "client", "public")));
///////////////////////////////////////////
/// registration

app.post("/registration", (req, res) => {
    let { first, last, email, password } = req.body;
    // first = first.charAt(0).toUpperCase() + first.slice(1);
    // last = last.charAt(0).toUpperCase() + last.slice(1);
    if (!first || !last || !email || !password) {
        return res.json({
            success: false,
        });
    }
    hash(password)
        .then((hashedPassword) => {
            return db.addUser(first, last, email, hashedPassword);
        })
        .then(({ rows }) => {
            console.log("rows", rows);
            req.session.userId = rows[0].id;
            res.json({
                success: true,
            });
        })
        .catch((err) => console.log("err in registration post", err));
});
/////////////////////////////////////////////////
//// Log in
app.post("/login", (req, res) => {
    let { email, password } = req.body;
    let id;
    if (!email || !password) {
        return res.json({
            success: false,
        });
    }
    db.getUser(email)
        .then(({ rows }) => {
            const hashed_password = rows[0].password_hash;
            const match = compare(password, hashed_password);
            id = rows[0].id;
            return match;
        })
        .then((match) => {
            if (match) {
                req.session.userId = id;
                res.json({
                    success: true,
                });
            } else {
                res.json({
                    success: false,
                });
            }
        })
        .catch((err) => {
            res.json({
                success: false,
            });
            console.log("err in login post", err);
        });
});

app.get("/welcome", (req, res) => {
    // is going to run if the user puts /welcome in the url bar
    if (req.session.userId) {
        // if the user is logged in, they are NOT allowed to see the welcome page
        // so we redirect them away from /welcome and towards /, a page they're allowed to see
        res.redirect("/");
    } else {
        // send back HTML, which will then trigger start.js to render Welcome in DOM
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});
//////////////////////////////////////
////send code to reset the password

app.post("/password/reset/start", (req, res) => {
    let { email } = req.body;
    db.getUser(email)
        .then(({ rows }) => {
            if (email == rows[0].email) {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                console.log("ameer");
                return db.addCode(email, secretCode);
            } else {
                res.json({
                    success: false,
                });
            }
        })
        .then(({ rows }) => {
            console.log("rows[0].code", rows[0].code);
            ses.sendEmail(
                "ammeer.z.alaswad@gmail.com",
                `please enter this code:${rows[0].code} to reset your password`,
                "Reset password"
            ).then(() => {
                res.json({
                    success: true,
                });
            });
        })
        .catch((err) => {
            console.log("err in password reser", err);
            res.json({
                success: false,
            });
        });
});
///////////////////////////////////////////////////////
//// /password/reset/verify
app.post("/password/reset/verify", (req, res) => {
    let { email, code, password } = req.body;
    db.getCode(email)
        .then(({ rows }) => {
            if (code == rows[0].code) {
                hash(password).then((hashedPassword) => {
                    db.updatePassword(email, hashedPassword).then(() => {
                        res.json({
                            success: true,
                        });
                    });
                });
            } else {
                res.json({
                    success: false,
                });
            }
        })
        .catch((err) => {
            console.log("err in password verify", err);
            res.json({
                success: false,
            });
        });
});

app.get("*", function (req, res) {
    // runs if the user goes to literally any route except /welcome
    if (!req.session.userId) {
        // if the user is NOT logged in, redirect them to /welcome, which is the only page
        // they're allowed to see
        res.redirect("/welcome");
    } else {
        // this runs if the user is logged in
        // in which case send back the HTML, after which start js kicks in and renders our p tag...
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
