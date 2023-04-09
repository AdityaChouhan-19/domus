/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import User from '../user/user.model.js';

let auth = (req, res, next) => {
    //get token from cookie.
    let token = req.cookies.x_auth;

    //find user after decoding token.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();
    })
}


export default auth;