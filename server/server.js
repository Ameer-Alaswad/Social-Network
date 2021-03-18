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
///////////////upload file setup//////////
const s3 = require("./s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const { s3Url } = require("./config.json");
////////////////////////////////
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

//////////////////////////
//// configure multer
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
///////////////////////////
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
/////////////////////////////////////////////
/// get user info
app.get("/userInfo", (req, res) => {
    let { userId } = req.session;
    db.getUserById(userId)
        .then(({ rows }) => {
            res.json({
                userInfo: rows[0],
            });
        })
        .catch((err) => console.log("err in userInfo", err));
});
////////////////////////////////////
///upload iamage

app.post("/uploadImage", uploader.single("file"), s3.upload, (req, res) => {
    console.log("req.file", req.file);
    const { filename } = req.file;
    db.uploadImage(s3Url + filename, req.session.userId)
        .then(({ rows }) => {
            res.json({
                succes: true,
                imageUrl: rows[0].image,
            });
        })
        .catch((err) => {
            console.log("err in upload image", err);
            res.json({
                success: false,
            });
        });
});
///////////////////////////////////////////////////
///update bio

app.post("/updateBio", (req, res) => {
    console.log(`req.body`, req.body);
    let { bio } = req.body;
    db.updateBio(bio, req.session.userId)
        .then(({ rows }) => {
            res.json({
                succes: true,
                bio: rows[0].bio,
            });
        })
        .catch((err) => {
            console.log(`err IN UPDATE BIO`, err);
            res.json({
                succes: false,
            });
        });
});
///////////////////////////////////////
/// get user info by id
app.post("/userid", (req, res) => {
    console.log(`req.body`, req.body);
    let { id } = req.body;
    let currentUserId = req.session.userId;
    console.log(`id,currenUserId`, id, currentUserId);
    db.getUserById(id)
        .then(({ rows }) => {
            res.json({
                succes: true,
                data: rows[0],
                currentUserId: currentUserId,
            });
        })
        .catch((err) => {
            console.log(`err in userid`, err);
            res.json({
                succes: false,
            });
        });
});
////////////////////////////////////
////// get recently joined users

app.get("/recent-users", (req, res) => {
    db.getRecentlyJoinedUsers()
        .then(({ rows }) => {
            res.json({ rows });
        })
        .catch((err) => console.log(`err in recent users`, err));
});

///////////////////////////////////////////
/////////////search for users
app.get("/users/search/:val", (req, res) => {
    let { val } = req.params;
    db.searchUsers(val)
        .then(({ rows }) => {
            res.json({
                users: rows,
            });
        })
        .catch((err) => {
            console.log(`err in get users/search`, err);
        });
});
////////////////////////////////////////////////
//// /friend/status/
app.get("/friend/status/:otherUserId", (req, res) => {
    console.log(`req.params`, req.params);
    let { otherUserId } = req.params;
    db.getFriends(req.session.userId, otherUserId)
        .then(({ rows }) => {
            res.json({
                rows: rows,
                userId: req.session.userId,
            });
        })
        .catch((err) => console.log(`err in friend status`, err));
});
////////////////////////////////////
//////////add friend
app.post("/friend-addFriend", (req, res) => {
    let { otherUserId } = req.body;
    console.log(`req.body`, otherUserId);
    db.addFriend(req.session.userId, otherUserId, false)
        .then(() => {
            res.json({ succes: true });
        })
        .catch((err) => console.log(`err in add friend post`, err));
});
/////////////////////////////////////////
////cancel friendship request
app.post("/friend-cancelRequest", (req, res) => {
    let { otherUserId } = req.body;
    console.log(`req.body`, otherUserId);
    db.cancelRequest(req.session.userId, otherUserId)
        .then(() => {
            res.json({ succes: true });
        })
        .catch((err) => console.log(`err in add cancel request post`, err));
});
/////////////////////////////////////
///accept friendship
app.post("/friend-acceptFriendship", (req, res) => {
    let { otherUserId } = req.body;
    console.log(`req.body`, otherUserId);
    db.acceptFriendshipRequest(req.session.userId, otherUserId, true)
        .then(() => {
            res.json({ succes: true });
        })
        .catch((err) => console.log(`err in add accept request post`, err));
});
//////////////////////////////////////
////// end friendship
app.post("/friend-endFriendship", (req, res) => {
    let { otherUserId } = req.body;
    console.log(`req.body`, otherUserId);
    db.removeFriend(req.session.userId, otherUserId)
        .then(() => {
            res.json({ succes: true });
        })
        .catch((err) => console.log(`err in add accept request post`, err));
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
