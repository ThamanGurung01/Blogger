async function getAllBlog(req,res){

    return res.json({status:"all blogs"});
}
async function getBlog(req,res){

    return res.json({status:"blog"});
}
async function blogCreation(req,res){

    return res.json({status:"blog created"});
}
async function blogUpdation(req,res){

    return res.json({status:"blog updated"});
}
async function blogDeletion(req,res){

    return res.json({status:"blog deletion"});
}
module.exports={getAllBlog,getBlog,blogCreation,blogUpdation,blogDeletion};