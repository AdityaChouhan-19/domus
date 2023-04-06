import User from './user.model.js';
import Post from './../post/post.model.js';

export async function Register(req, res){
    //get information from client
    //save into db. 
    const user = new User(req.body)
    console.log("register called!@@@@@@@@@@@!@!@");

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
        success: true
        })
    })
}

export async function Login(req, res){
    // console.log('ping')
    //checking if there is same email in db.
    User.findOne({ email: req.body.email }, (err, user) => {
        
        // console.log('user', user)
        if (!user) {
        return res.json({
            loginSuccess: false,
            message: "Can't fine the user."
        })
        }

        //if there is email matched in db, check password.
        user.comparePassword(req.body.password, (err, isMatch) => {
        // console.log('err',err)

        // console.log('isMatch',isMatch)

        if (!isMatch)
            return res.json({ loginSuccess: false, message: "Wrong password." })

        //generate token.
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            console.log('calllllllllllll')
            // save token in cookie 
            res.cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id })
        })
        })
    })
}


// role 1 Admin
// role 0 -> User   
export async function Auth(req, res){
    // if req arrives here, it means authentication is true.
    console.log("called!!!!!@!@!@!@!@");
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
}


export async function Logout(req, res){
    // console.log('req.user', req.user)
    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" }
        , (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        })
        })
}

export async function GetMyInfo(req, res){
    User.findOne({ _id: req.user._id }, { password: 0 }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            user
        })
    });
}



export async function SavePostingOnOff(req, res){
    console.log('savedposting called');
    User.updateOne({ _id: req.user._id }, { savedList: req.body }, (err, result) => {
        if (err) return res.json({ success: false, err });
        User.findOne({ _id: req.user._id }, { password: 0 }, (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                user
            })
        })
    })
        
}

export async function GetSavedList(req, res){
    console.log('GetSaveList called');
    User.findOne({ _id: req.user._id }, { password: 0 }, (err, user) => {
        if (err) return res.json({ success: false, err });
        console.log('find savedList called');
        console.log(user.savedList);
        Post.find({ _id: { $in: user.savedList } }, (err, result) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                result
            })
        })
    });
}


