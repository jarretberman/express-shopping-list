const express = require("express");
const router = new express.Router();
const items = require('./fakeDB')
const ExpressError = require('./exp-error')

//get all items
router.get("/", function (req, res) {
    return res.json({items});
});


// add an item
router.post("/", function (req, res) {
    const newItem = { name: req.body.name, price: req.body.price }
    items.push(newItem)
    return res.status(201).json({ item: newItem })
});


// get a specific item
router.get("/:name", function (req, res) {
    const itemFound = items.find(item => item.name === req.params.name)
    if (itemFound === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    return res.json({ item: itemFound })

});

// update an item
router.patch("/:name", function (req, res) {
    const itemFound = items.find(item => item.name === req.params.name)
    if (itemFound === undefined) {
        throw new ExpressError("item not found", 404)
    }
    itemFound.name = req.body.name
    res.json({ updated: itemFound })
});


// delete an item
router.delete("/:name", function (req, res) {
    const itemFound = items.findIndex(item => item.name === req.params.name)
    if (itemFound === -1) {
        throw new ExpressError("item not found", 404)
    }
    items.splice(itemFound, 1)
    res.json({ message: "Deleted" })
});

module.exports = router;