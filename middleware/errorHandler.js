function errorHandler (err, request, response, next) {
    console.log(`___server error___`, err)
    response.status(500).json({error: err.message})
}

module.exports = errorHandler