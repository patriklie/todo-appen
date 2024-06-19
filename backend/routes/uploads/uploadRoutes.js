const express = require('express');
const router = express.Router();
const cloudinary = require('../../utils/cloudinary');
const upload = require('../../middleware/multer');
const fs = require('fs');
const User = require('../../models/User');
const getUserId = require('../../utils/getUserId');

router.post('/profileImage', upload.single('image'), getUserId, async (req, res) => {

    try {

        // Finne bruker og publicid profilbilde før vi oppdaterer og laster opp nye:
        const findUserOldImage = await User.findById(req.userId);
        if(findUserOldImage.profileImagePublicId) {
            const deleteOldImage = await cloudinary.uploader.destroy(findUserOldImage.profileImagePublicId)
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "todo-appen",
        });

        // Legger til url og public id på profilbilde 
        const findUser = await User.findByIdAndUpdate(req.userId, { 
            profileImageUrl: result.secure_url,
            profileImagePublicId: result.public_id, 
        }, { new: true })

        // Sletter den midlertidige filen som er lagret fra multer
        fs.unlinkSync(req.file.path)
        console.log("Midlertidig fil slettet fra uploads mappa backend!", req.file.path)

        res.status(200).json({
            success: true,
            message: "Uploaded!",
            url: result.secure_url,
            })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error"
        })
    }

});

module.exports = router;