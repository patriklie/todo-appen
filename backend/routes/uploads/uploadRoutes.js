const express = require('express');
const router = express.Router();
const cloudinary = require('../../utils/cloudinary');
const upload = require('../../middleware/multer');
const fs = require('fs');
const User = require('../../models/User');
const getUserId = require('../../utils/getUserId');

router.post('/profileImage', upload.single('image'), getUserId, async (req, res) => {

    try {
        // Finner bruker og publicid profilbilde før vi oppdaterer og laster opp nye
        const findUserOldImage = await User.findById(req.userId);
        if(findUserOldImage.profileImagePublicId) {
            const deleteOldImage = await cloudinary.uploader.destroy(findUserOldImage.profileImagePublicId)
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: `todo-appen/${req.userId}/profile`,
        });

        // Legger til url og public id på profilbilde 
        const findUser = await User.findByIdAndUpdate(req.userId, { 
            profileImageUrl: result.secure_url,
            profileImagePublicId: result.public_id, 
        }, { new: true })

        // Sletter den midlertidige filen som er lagret fra multer
        fs.unlinkSync(req.file.path)
        console.log("Midlertidig fil slettet fra uploads mappa backend!", req.file.path)

        return res.status(200).json({
            success: true,
            message: "Uploaded!",
            url: result.secure_url,
            })

    } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Server error" });
    }
});

router.post('/headerImage', upload.single('image'), getUserId, async (req, res) => {

    try {
        // Finner bruker og publicid profilbilde før vi oppdaterer og laster opp nye:
        const findUserOldImage = await User.findById(req.userId);
        if(findUserOldImage.profileHeaderPublicId) {
            const deleteOldImage = await cloudinary.uploader.destroy(findUserOldImage.profileHeaderPublicId)
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: `todo-appen/${req.userId}/profile`,
        });

        // Legger til url og public id på header bilde 
        const findUser = await User.findByIdAndUpdate(req.userId, { 
            profileHeaderUrl: result.secure_url,
            profileHeaderPublicId: result.public_id, 
        }, { new: true })

        // Sletter den midlertidige filen som er lagret fra multer
        fs.unlinkSync(req.file.path)
        console.log("Midlertidig fil slettet fra uploads mappa backend!", req.file.path)

        return res.status(200).json({
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

router.delete('/deleteProfileImage', getUserId, async (req, res) => {

    try {
        const findUser = await User.findById(req.userId);

        if (findUser) {
            await cloudinary.uploader.destroy(findUser.profileImagePublicId);
        }
        
        // oppdatere mongodb info på brukeren etter sletting:
        const oppdatertBruker = await User.findByIdAndUpdate(req.userId, {
            $unset: {
                profileImageUrl: "",
                profileImagePublicId: "",
            }
        }, { new: true });
        
        return res.status(200).json({ message: "Deleted profile image!", user: oppdatertBruker })

    } catch(error) {
        console.error("Error deleting profile image:", error);
        return res.status(500).json({ error: "Failed to delete profile image" });
    }
})

router.delete('/deleteProfileHeader', getUserId, async (req, res) => {

    try {
        const findUser = await User.findById(req.userId);

        if (findUser) {
            await cloudinary.uploader.destroy(findUser.profileHeaderPublicId);
        }
        
        // oppdatere mongodb info på brukeren etter sletting:
        const oppdatertBruker = await User.findByIdAndUpdate(req.userId, {
            $unset: {
                profileHeaderUrl: "",
                profileHeaderPublicId: "",
            }
        }, { new: true });
        
        return res.status(200).json({ message: "Deleted profile header!", user: oppdatertBruker })

    } catch(error) {
        console.error("Error deleting profile header:", error);
        res.status(500).json({ error: "Failed to delete profile header" });
    }
})

module.exports = router;