
import User from '../user/user.model.js';

let auth = (req, res, next) => {
    //get token from cookie.

    console.log('called!@@@@@@@@@');
    let token = req.cookies.x_auth;
    console.log(token);
    // find user after decoding token.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })


        // console.log('userh', user)

        req.token = token;
        req.user = user;
        next();
    })
}


export default auth;