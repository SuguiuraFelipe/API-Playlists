const playLists = require('../data/playlsits.json')

module.exports = {
    // GET / playlists
    index: (req, res) =>{
        res.json(playLists)
    }
}