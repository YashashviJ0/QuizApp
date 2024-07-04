const userModel = require("../models/userModel");

const verifyAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.body.userId);

        if (!user || !user.isAdmin) {
            return res.status(403).send({
                message: "Access denied. Admins only.",
                success: false,
            });
        }

        next();
    } catch (error) {
        res.status(401).send({
            message: "You are not authenticated",
            data: error,
            success: false,
        });
    }
};

module.exports = verifyAdmin;
