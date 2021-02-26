const express = require('express');
const app = express();
const ExpressError = require('./exp-error')
const itemRoutes = require("./itemRoutes")


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/items", itemRoutes);



// 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});

// generic error handler
app.use(function (err, req, res, next) {
    
    let status = err.status || 500;
    let message = err.message

    
    return res.status(status).json({
        error: { message, status }
    })
})


module.exports = app