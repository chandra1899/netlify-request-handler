import express from 'express'
import { S3 } from "aws-sdk";

const s3 = new S3({
    accessKeyId : "a915a83a984ca573f61e6f3eab99daee",
    secretAccessKey : "a87f1c585a44ae708ffdd6a2e390d46f79bc1d041fe07a7cc3e793b4c831035e",
    endpoint : "https://04b74d21ee5c34d7a6a3405431dac7ec.r2.cloudflarestorage.com"
})
const app = express()

app.get("/*",async (req, res) => {
    const host = req.hostname
    const id = host.split(".")[0]
    const filePath = req.path

    const contents = await s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${req.path}`
    }).promise()

        let type;
        if (req.path.endsWith("html")) {
        type = "text/html";
        } else if (req.path.endsWith("css")) {
        type = "text/css";
        } else if (req.path.endsWith("svg")) {
        type = "image/svg+xml";
        } else {
        type = "application/javascript";
        }
        // console.log(type);
        
    res.set("Content-Type", type)
    res.send(contents.Body)
})

app.listen(3001, () => console.log("app is listening on port : 3001"))
