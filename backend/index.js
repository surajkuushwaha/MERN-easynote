const connectToMongo = require('./db')
const express = require('express')

connectToMongo();

const app = express()
const port = 5000

app.use(express.json())

//Avalable routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello suraj!')
})



app.listen(port, () => {
  console.log(`EasyNote app backend listening at port ${port}`)
})