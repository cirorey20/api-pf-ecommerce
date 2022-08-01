function logError (err, req, res, next) {
    console.log('logError');
    console.log(err);
    next(err);
}

function errorHandler(err, req, res, next) {
    console.log('function -> errorHandler');
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}

module.exports = {
    logError,
    errorHandler
}