const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social"
);
module.exports.addUser = (first_name, last_name, email, password_hash) => {
    const q = `INSERT INTO users (first_name, last_name, email, password_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING id`;
    const params = [first_name, last_name, email, password_hash];
    return db.query(q, params);
};
module.exports.getUser = (email) => {
    const q = `SELECT email,password_hash,id FROM users WHERE
     email = $1
     `;
    const params = [email];
    return db.query(q, params);
};
module.exports.getUserById = (userId) => {
    const q = `SELECT first_name,last_name,image,bio FROM users WHERE
     id = $1
     `;
    const params = [userId];
    return db.query(q, params);
};

module.exports.addCode = (email, code) => {
    const q = `
        INSERT INTO resetPassword (email, code)
        VALUES ($1, $2)
        RETURNING *
    `;
    const params = [email, code];
    return db.query(q, params);
};
// order by DESC LIMIT 1 to make sure to get the last valid code
module.exports.getCode = (email) => {
    const q = `
        SELECT * FROM resetPassword
        WHERE email = $1
        AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
        ORDER BY id DESC
        LIMIT 1
    `;
    const params = [email];
    return db.query(q, params);
};

module.exports.updatePassword = (email, newHashedPassword) => {
    const q = `
        UPDATE users
        SET password_hash = $2
        WHERE email = $1
    `;
    const params = [email, newHashedPassword];
    return db.query(q, params);
};
module.exports.uploadImage = (image, id) => {
    const q = `
    UPDATE users
    SET image = $1
    WHERE id = $2 
    RETURNING image  
    `;
    const params = [image, id];
    return db.query(q, params);
};

module.exports.updateBio = (bio, userId) => {
    const q = `
    UPDATE users
    SET bio = $1
    WHERE id = $2
    RETURNING bio
    `;
    const params = [bio, userId];
    return db.query(q, params);
};

module.exports.getRecentlyJoinedUsers = () => {
    const q = `
    SELECT id, first_name, last_name, image
    FROM users
    ORDER BY id DESC
    LIMIT 5`;
    return db.query(q);
};

module.exports.searchUsers = (val) => {
    const q = `
    SELECT id, first_name, last_name, image
    FROM users
    WHERE first_name ILIKE $1 OR last_name ILIKE $1
    LIMIT 5`;
    const params = [val + "%"];
    return db.query(q, params);
};
// OR (first_name AND last_name ILIKE $1)

module.exports.getFriends = (userId, otherUserId) => {
    const q = `
    SELECT *
    FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1);
    `;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

module.exports.addFriend = (userId, otherUserId, accepted) => {
    const q = `
    INSERT INTO friendships (sender_id, recipient_id, accepted)
    VALUES ($1,$2,$3)
    `;
    const params = [userId, otherUserId, accepted];
    return db.query(q, params);
};

module.exports.cancelRequest = (userId, otherUserId) => {
    const q = `
    DELETE FROM friendships
    WHERE sender_id = $1 AND recipient_id = $2
    `;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

module.exports.acceptFriendshipRequest = (userId, otherUserId, accepted) => {
    const q = `
    UPDATE friendships
    SET accepted = $3
    WHERE sender_id = $2 AND recipient_id = $1
    `;
    const params = [userId, otherUserId, accepted];
    return db.query(q, params);
};

module.exports.removeFriend = (userId, otherUserId) => {
    const q = `
    DELETE FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1); 
    `;
    const params = [userId, otherUserId];
    return db.query(q, params);
};
module.exports.getFriendsAndFreindRequests = (UserId) => {
    const q = `
    SELECT users.id, first_name, last_name, image, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND recipient_id = users.id); 
    `;
    const params = [UserId];
    return db.query(q, params);
};
