import User from "../user/user.model.js";

export async function getUsers(req, res){
    //console.log('getUsers called');
    console.log(req.user);
    if(req.user.role == 0){
        return res.send({success: false, message: 'You are not admin user'});
    }

    User.find({}, { password: 0, savedList: 0 }, (err, users) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send(users);
    });
    
}