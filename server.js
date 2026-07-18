const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.json());
app.use(express.static("public"));

let lastAnswer = null;

io.on("connection", (socket) => {
    console.log("User connected");

    if (lastAnswer) {
        socket.emit("liveUpdate", lastAnswer);
    }
});

app.post("/answer", (req, res) => {
    const { date, name } = req.body;

    const message = `🔥 ${name} hat JA gesagt!\n📅 Datum: ${date}`;

    lastAnswer = message;

    io.emit("liveUpdate", message);

    res.json({
        message: `OMG 😍 ${name} hat JA gesagt!`
    });
});

http.listen(3000, "0.0.0.0", () => {
    console.log("Server läuft auf Port 3000");
});