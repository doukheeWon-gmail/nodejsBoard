/** Upload Module */
const multer = require('multer');
/** File Module */
const fs = require('fs');

/** Upload Set up */
const UploadImage = (Dirs) => {
    let storage;
    /** Dir Name Input(UserEmail) */
    if (Dirs) {
        storage = multer.diskStorage({
            /** File Upload Save Path */
            destination: (req, res, callback) => {
                let uploadDirs = process.cwd() + "/public/upload/" + Dirs;
                /** Make Upload User Directory Mkdir */
                try {
                    fs.mkdirSync(uploadDirs);
                } catch (err) {
                    /** Not Already Folder Have Error */
                    if (err.code != "EEXIST") {
                        console.log("Upload Folder Make Error Code ::: ", err.code);
                        console.log("Upload Folder Make Error ::: ", err);
                        throw err;
                    }
                }
                callback(null, uploadDirs);
            },
        });
    }
    return multer({
        storage: storage,
        fileFilter: (req, file, callback) => {
            let fileType = file.mimetype.split('/')[1];
            console.log("File Filter Get File : " + file);
            console.log("Get File Format : " + fileType);
            console.log("Get File Original Name : " + file.originalname);
            if (fileType === "jpg" || fileType == "png" || fileType === "jpeg" || fileType === "gif") {
                console.log("Image Type Format");
                return callback(null, true);
            } else {
                console.log("Not Image File");
                return callback(null, false);
            }

        }
    });
};

/** Test Controller */
const testUpload = (req, res, next) => {
    /** Form filed is upload and Multer Setting */
    let uploadMulter = UploadImage(req).single('upload');
    uploadMulter((req, res, err) => {
        if (err) {
            return next(err);
        }
        /** get File Name */
        console.log("Get File Original Name : " + req.file.originalname);
        /** Encoding File Name */
        console.log("Get File Encoding Name : " + req.file.filename);
        res.json(1);
    });
};

/** Upload Controller Export */
module.exports = {

};