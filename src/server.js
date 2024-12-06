const express = require('express')
const app = express()

const playLists = require('./controllers/playListController')

app.use(express.json())

app.get('/', (req, res) =>{
    res.json({message: 'Welcome to Playlist API'})
})
app.get('/playlists', playLists.index)
app.get('/playlists/:id', playLists.show)

app.post('/playlists', playLists.save)

app.put('/playlists/:id', playLists.update)

const PORT = 3000
app.listen(PORT, () => console.log(`Servidor iniciado em http://localhost:${PORT}/`))