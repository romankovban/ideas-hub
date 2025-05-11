import express from 'express'

const expressApp = express()

expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})

expressApp.listen(3000, () => {
  console.log('Server started on port 3000')
})
