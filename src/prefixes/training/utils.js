const createErrorResponse = errorMessage => ({
    success: false,
    message: errorMessage
});

module.exports = { createErrorResponse };