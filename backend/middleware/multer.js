const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../imageuploads'));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
});

module.exports = upload;