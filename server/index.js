require('dotenv').config()
const express = require('express')
const cors = require('cors')

const taskRouter = require('./routes/task.routes')

const PORT = process.env.SERVER_PORT || 8080

const app = express()

app.use(express.json())
app.use(cors())

app.use('/task', taskRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))