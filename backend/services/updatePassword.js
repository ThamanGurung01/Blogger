const User=require("../models/user");
async function updatePassword(userId, newPassword) {
    try {
        const user = await User.findById(userId);
        if (user) {
            user.password = newPassword;
            await user.save();
        }
    } catch (error) {
        console.error("Error updating password:", error);
    }
}
module.exports=updatePassword;
