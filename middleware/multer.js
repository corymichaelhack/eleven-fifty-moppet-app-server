const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({
        filename: function(req, file, callback) {
            callback(null, Date.now() + file.originalname);
        },
        fileFilter: (req, file, callback) => {
            filem
            if(!file.mimetype.match(/jpe|jpeg|png|gif$i/)){
                callback(new Error("File is not supported"), false); 
                return;   
            }
            callback(null, true)
        }
    })
});

