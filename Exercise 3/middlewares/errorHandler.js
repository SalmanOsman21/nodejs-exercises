const errorHandler = (error, req, res, next) => {

    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: 'Email already exists'
        });
    }

    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: error.message || 'Something went wrong'
    });

};

export default errorHandler;