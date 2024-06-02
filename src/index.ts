import express from 'express'

const app = express()

app.get("/*", (req, res) => {
    const host = req.hostname
    const id = host.split(".")[0]
    console.log(id);
    
})

app.listen(3001, () => console.log("app is listening on port : 3001"))