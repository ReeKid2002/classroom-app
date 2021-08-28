
module.exports.showClassroom = async function(req,res){
    try{
        const currentUser = req.user;
        
    } catch (err) {
        return req.status(500).json({
            message: err.message
        });
    }
}