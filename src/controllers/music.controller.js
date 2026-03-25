const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model');
const { uploadFile } = require('../services/storage.service');

//uploadmusic
const createMusic = async (req, res) => {

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id,
    })

    res.status(201).json({
        message: "Music created successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist,
        }
    })
}

//create Album
const createAlbum = async (req, res) => {

    const { title, songIds } = req.body;

    const album = await albumModel.create({
        title,
        songs: songIds,
        artist: req.user.id
    })

    return res.status(201).json({
        message: "album created successfully",
        music: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            songs: album.songs
        }

    })

}

//to get all songs with using limit function to balance the load on server by limiting the no.of songs rendering at once
const getallSong = async (req, res) => {

    const songs = await musicModel.find().limit(20);

    return res.status(200).json({
        songs
    })

}

///here we only will load the album data except album songs beacuse to laod all songs is tough
const getallAlbum = async (req, res) => {

    const albums = await albumModel.find().select("artist title");

    return res.status(200).json({
        albums
    })

}

//get songs in album
const getalbumbyId = async (req, res) => {

    let id = req.params.id;

    const album = await albumModel.findById(id).populate("artist", "username email");

    return res.status(200).json({
        album
    })

}


module.exports = { createMusic, createAlbum, getallSong, getallAlbum, getalbumbyId };