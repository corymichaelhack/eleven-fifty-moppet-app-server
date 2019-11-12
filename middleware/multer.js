const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({}), 
    fileFilter: (req, file, callback) => {
        if(!file.mimetype.match(/jpe|jpeg|png|gif$i/)){
            callback(new Error("File is not supported"), false); 
            return;   
        }
        callback(null, true)
    }
});