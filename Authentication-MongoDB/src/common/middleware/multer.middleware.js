import multer from 'multer';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/temp');
	},
	filename: function (req, file, cb) {
        cb(null, file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "image/gif", "image/webp"];

    if (allowed.includes(file, mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("File type not supported!!"), false);
    }
}

export const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter

});
