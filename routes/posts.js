var express = require('express');
var router = express.Router();

const Post = require('../models/post');

const Utils = require('../utils');
let pool = Utils.Pool;

router.get('/', async function(req, res) {
  try
  {
    let posts = await Post.getPaginated(pool, req.query.Page ? req.query.Page : 0, req.query.Tag);
    let numPosts = await Post.getTotals(pool, req.query.Tag);

    res.send({posts, numPosts});
  }
  catch(err)
  {
      console.log(err.message);
      console.log(err.stack);
      res.status(500).send({err : err.message});
  }
});

router.get('/:postId', async function(req, res) {
    try
    {
      let post = await Post.get(pool, req.params.postId);
  
      res.send(post);
    }
    catch(err)
    {
        console.log(err.message);
        console.log(err.stack);
        res.status(500).send({err : err.message});
    }
  });

module.exports = router;