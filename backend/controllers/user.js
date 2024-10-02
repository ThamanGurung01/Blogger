function handleGetAllUsers(req,res){

    return res.json({status:"success all users"});
}
function handleGetUser(req,res){

    return res.json({status:"success user by id"});
}
function handleCreateUser(req,res){

    return res.json({status:"success create"});
}
function handleUpdateUser(req,res){

    return res.json({status:"success update"});
}
function handleDeleteUser(req,res){

    return res.json({status:"success delete"});
}

module.exports={handleGetAllUsers,handleGetUser,handleCreateUser,handleUpdateUser,handleDeleteUser};