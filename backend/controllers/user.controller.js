import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserProfile", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { bio, currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({ error: "User not found" });

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        user.bio = bio || user.bio;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in updateUser", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
