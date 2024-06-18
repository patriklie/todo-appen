const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('@cloudinary/multer');

const router = express.Router();


// config av cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// config av lagringen med multer pakka
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'todo-appen',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.originalname,
    },
});

const upload = multer({ storage: storage });

router.post('/profileImage', upload.single('image'), (req, res) => {
    
    if(!req.file) {
        return res.status(400).json({ message: "Ingen fil lastet opp, tomt req objekt" })
    }

    res.status(200).json({
        message: "Fil lastet opp!",
        url: req.file.path,
    });
});

module.exports = router;