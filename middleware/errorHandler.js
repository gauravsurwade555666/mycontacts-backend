const { constants } = require("../constant");



const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : constants.SERVER_ERROR;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "validation Failed", message: err.message, stackTrace: err.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Un Authorized", message: err.message, stackTrace: err.stack });
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;
        case constants.SERVER_ERROR:
                res.json({ title: "Server Error", message: err.message, stackTrace: err.stack });
                break;
        default:
            console.log(err.message);
            console.log(err.stack);

           console.log("no error,  all good!!!");
           res.json({message: "some error" });
    }
};

module.exports = errorHandler;
