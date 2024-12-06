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
    }
}