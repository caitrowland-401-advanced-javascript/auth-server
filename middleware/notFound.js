function notFound (request, response, next) {
    response.status(404).json({error: 'Resource not found'})
}

module.exports = notFound