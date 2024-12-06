const playLists = require('../data/playlsits.json')

module.exports = {
    // GET / playlists
    index: (req, res) =>{
        res.json(playLists)
    },

    // GET /playlists/:id
    show: (req, res) =>{
        const {id} = req.params
        const playList = playLists.find(playList => playList.id === +id)

        if(!playList){
            res.status(404)
            res.json({message: 'Playlist not found!'})
        } else{
            res.json(playList)
        }
    },

    // POST /playlist
    save: (req, res) =>{
        const {playListName, tags, musics} = req.body

        const newPlayList = {
            id: Math.floor(Math.random() * 99999),
            playListName,
            tags,
            musics
        }

        playLists.push(newPlayList)
        res.status(201)
        res.json(newPlayList)
    },

    // PUT /playlists/:id
    update: (req, res) =>{
        const {id} = req.params
        const {playListName, tags} = req.body

        const playListIndex = playLists.findIndex(playList => playList.id === +id)

        if(playListIndex === -1){
            return req.status(404).json({message: 'Playlist not found!'})
        }

        playLists[playListIndex].playListName = playListName
        playLists[playListIndex].tags = tags

        res.json(playLists[playListIndex])
    },

    // DELETE /playlists/:id
    delete: (req, res) =>{
        const {id} = req.params
        const playListIndex = playLists.findIndex(playList => playList.id === +id)

        if(playListIndex === -1){
            return res.status(404).json({message: 'Playlist not found!'})
        }

        playLists.splice(playListIndex, 1)
        res.status(204).end()
    }
}