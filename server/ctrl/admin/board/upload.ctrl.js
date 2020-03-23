/** Upload Module */
const multer = require('multer');
/** UUID */
const UUID = require('uuid');
/** File Module */
const fs = require('fs');
/** Default DownLoad Path */
const ROOT_PATH = process.cwd() + "/public/upload/";

/** Upload Set up */
const UploadImage = (Dirs) => {
    console.log("Make Upload Setting Dir :" + Dirs);
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
            filename: (req, file, callback) => {
                callback(null, UUID.v4().toString() + "_" + file.originalname);
            }
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

/** Board Upload Controller */
const BoardUpload = (req, res, next) => {
    let uploadMulter = UploadImage("tester").single("upload");
    uploadMulter(req, res, (err) => {
        if (err) {

            return next(err);
        }
        /** Get File Name */
        console.log("Get File Original File Name : " + req.file.originalname);
        console.log("Get File Encoding File Name : " + req.file.filename);

    });
};

/** Board File Download Controller */
const BoardDownload = (req, res, next) => {

};

/** Test Controller */
const testUpload = (req, res, next) => {
    console.log("Ctrl");
    /** Form filed is upload and Multer Setting */
    let uploadMulter = UploadImage("tester").single('upload');
    uploadMulter(req, res, (err) => {
        console.log("Multer");
        if (err) {
            console.log("ERROR");
            return next(err);
        }
        /** get File Name */
        console.log("Get File Original Name : " + req.file.originalname);
        /** Encoding File Name */
        console.log("Get File Encoding Name : " + req.file.filename);
        return res.json(1);
    });
};

/** Upload Controller Export */
module.exports = {
    testUpload
};