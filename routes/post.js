const express =require('express');
const {getPosts,createPost,postsByUser,postById,isPoster,deletePost,updatePost} =require('../controllers/post');
const {requireSignin} = require("../controllers/auth");
const {createPostValidator} = require('../validator');
const{userById}= require("../controllers/user");
const router= express.Router();

router.get('/posts',getPosts);
router.post('/post/new/:userId',requireSignin,createPost,createPostValidator);
router.get('/posts/by/:userId',postsByUser);
router.put('/post/:postId',requireSignin,isPoster,updatePost);
router.delete('/post/:postId',requireSignin,isPoster,deletePost);

//any route containing :userid
router.param("userId",userById);
//any route containing :userid
router.param("postId",postById);

module.exports=router;
  