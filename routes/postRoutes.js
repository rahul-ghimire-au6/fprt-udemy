import { Router } from "express";
const router = Router();
import { authFolder } from '../middlewares/uploadfolder'
import { addPost, getPost_Public, getPost_Private, getPost_Public_usermade, newsFeed, deletePost } from '../controllers/postController'
import upload from '../utils/multer'
import { authHeader, authToken } from '../middlewares/authenticate'



// create post route
router.post('/admin/createCourse', authFolder, authHeader, upload.array('media', 10), addPost)

// get all public post route
router.get('/user/getPost_Public', getPost_Public)

// get only public post created by that user for(profile page or timeline page)
router.get('/user/getPost/:token', authToken, getPost_Public_usermade)

//get all public + private post created by that user
router.get('/user/getPost_Private', authHeader, getPost_Private)

//Personalised News Feed for current user
router.get('/user/newsfeed', authHeader, newsFeed)


//delete post
router.delete('/user/deletePost/:postId', authHeader, deletePost)

module.exports = router