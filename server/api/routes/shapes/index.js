'use strict';
var mongoose = require('mongoose');
var Shape = mongoose.model('Shape');
var router = require('express').Router();
module.exports = router;

// /api/shapes
router.get('/', function(req, res, next) {
    Shape.find().exec()
        .then(function(shapes) {
            var parsedShapes = shapes.map(function(shape) {
                shape.shape = JSON.parse(shape.shape);
                return shape;
            })
            res.json(parsedShapes);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    Shape.create({
        name: req.body.name,
        shape: JSON.stringify(req.body.shape)
    })
        .then(function(shape) {
            res.status(201).json(shape);
        })
        .then(null, next);
});