const User=require('../models/user')

exports.logout=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/home');
    });
}
exports.deleteAccount=(req,res,next)=>{
    User.deleteUser(req.session.user.id);
    res.redirect('/logout')
}