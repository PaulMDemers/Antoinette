var express = require('express');
var router = express.Router();

const Post = require('../models/post');

const Utils = require('../utils');
let pool = Utils.Pool;

router.post('/', async function(req, res) {
    try
    {
        let post = await Post.create(pool, req.body);
        res.send(post);
    }
    catch(err)
    {
        console.log(err.message);
        console.log(err.stack);
        res.status(500).send({err : err.message});
    }
});

router.put('/:postId', async function(req, res) {
    try
    {
        req.body.id = req.params.postId;
        
        let post = await Post.update(pool, req.body);
        res.send(post);
    }
    catch(err)
    {
        console.log(err.message);
        console.log(err.stack);
        res.status(500).send({err : err.message});
    }
});

router.delete('/:postId', async function(req, res) {
    try
    {
        await Post.delete(pool, req.params.postId);
        res.send({status: "OK"});
    }
    catch(err)
    {
        console.log(err.message);
        console.log(err.stack);
        res.status(500).send({err : err.message});
    }
});

module.exports = router;