module.exports.logout = function(req,res){
    console.log(req.cookie);
    res.cookie('jwt','',{expires:0});
    res.redirect('/');
}