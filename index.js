const { PrismaClient } = require('@prisma/client')
const express = require('express')
const app = express()
const port = 3000
const prisma = new PrismaClient()


app.get('/', async (req, res) => {
    const result = await await prisma.user.findMany()
    console.log(result)
    res.json(result)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

