const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) =>{
    res.json({message: 'Welcome to Playlist API'})
})

const PORT = 3000
app.listen(PORT, () => console.log(`Servidor iniciado em http://localhost:${PORT}/`))