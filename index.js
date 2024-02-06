const express = require('express');
const app = express();
const port = 3000;
const ytdl = require('./router/ytdl.js');

app.set('json spaces', 2);
app.use("/yt",ytdl)


app.get("/",(req,res)=>{
    res.send(`<h1>LIST ENDPOINT</h1>
<p>/yt/mp3?url=<BR>/yt/mp4?url=</p>`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});