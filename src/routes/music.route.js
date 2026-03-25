const express = require('express');

const musicController = require('../controllers/music.controller');
const multer = require("multer");
const authMiddleware = require('../middlewares/auth.middleware');

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();
//uplaod single song
router.post("/upload", authMiddleware.adminAuth, upload.single('music'), musicController.createMusic);

//upload an album
router.post("/album-upload", authMiddleware.adminAuth, musicController.createAlbum);

//get all songs
router.get("/", authMiddleware.userAuth, musicController.getallSong);

//get all albums
router.get("/albums", authMiddleware.userAuth, musicController.getallAlbum);

//get songs in album by album id
router.get("/albums/:id", authMiddleware.userAuth, musicController.getalbumbyId);

module.exports = router;