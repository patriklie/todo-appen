const express = require('express');
const router = express.Router();
const cloudinary = require('../../utils/cloudinary');
const upload = require('../../middleware/multer');
const fs = require('fs');
const User = require('../../models/User');

router.post('/profileImage', upload.single('image'), async (req, res) => {

    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "todo-appen",
        });

        // Sletter den midlertidige filen som er lagret fra multer
        fs.unlinkSync(req.file.path)
        console.log("Midlertidig fil slettet fra uploads mappa backend!", req.file.path)

        res.status(200).json({
            success: true,
            message: "Uploaded!",
            data: result.secure_url,
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