"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aws_sdk_1 = require("aws-sdk");
const s3 = new aws_sdk_1.S3({
    accessKeyId: "a915a83a984ca573f61e6f3eab99daee",
    secretAccessKey: "a87f1c585a44ae708ffdd6a2e390d46f79bc1d041fe07a7cc3e793b4c831035e",
    endpoint: "https://04b74d21ee5c34d7a6a3405431dac7ec.r2.cloudflarestorage.com"
});
const app = (0, express_1.default)();
app.get("/*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const host = req.hostname;
    const id = host.split(".")[0];
    const filePath = req.path;
    const contents = yield s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${req.path}`
    }).promise();
    let type;
    if (req.path.endsWith("html")) {
        type = "text/html";
    }
    else if (req.path.endsWith("css")) {
        type = "text/css";
    }
    else if (req.path.endsWith("svg")) {
        type = "image/svg+xml";
    }
    else {
        type = "application/javascript";
    }
    // console.log(type);
    res.set("Content-Type", type);
    res.send(contents.Body);
}));
app.listen(3001, () => console.log("app is listening on port : 3001"));
