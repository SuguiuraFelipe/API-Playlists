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

    // PUT /playlists/:id/musics/:title
    updateMusic: (req, res) => {
        const { id, title } = req.params; // Pegamos o ID da playlist e o título da música da URL
        const { newTitle, year, artist, album } = req.body; // Dados para atualizar a música

        // Encontrar o índice da playlist pelo ID
        const playListIndex = playLists.findIndex(playList => playList.id === +id);

        // Se a playlist não for encontrada
        if (playListIndex === -1) {
            return res.status(404).json({ message: 'Playlist not found!' });
        }

        // Buscar a música pelo título dentro da playlist
        const musicIndex = playLists[playListIndex].musics.findIndex(
            music => music.title.toLowerCase() === title.toLowerCase()
        );

        // Se a música não for encontrada
        if (musicIndex === -1) {
            return res.status(404).json({ message: 'Music not found!' });
        }

        // Atualizar os campos da música
        playLists[playListIndex].musics[musicIndex] = {
            ...playLists[playListIndex].musics[musicIndex], // Mantém os campos existentes
            title: newTitle || playLists[playListIndex].musics[musicIndex].title, // Atualiza o título, se fornecido
            year: year || playLists[playListIndex].musics[musicIndex].year, // Atualiza o ano, se fornecido
            artist: artist || playLists[playListIndex].musics[musicIndex].artist, // Atualiza o artista, se fornecido
            album: album || playLists[playListIndex].musics[musicIndex].album // Atualiza o álbum, se fornecido
        };

        // Retornar a música atualizada
        res.json(playLists[playListIndex].musics[musicIndex]);
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