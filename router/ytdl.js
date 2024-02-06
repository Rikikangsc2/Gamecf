const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');

router.get('/mp3', async (req, res) => {
  try {
    const url = req.query.url;
    const info = await ytdl.getInfo(url);
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    const audioUrl = audioFormats[0].url;

    res.json({ success: true, url: audioUrl });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Gagal mengunduh audio' });
  }
});

router.get('/mp4', async (req, res) => {
  try {
    const url = req.query.url;
    const info = await ytdl.getInfo(url);
const videoFormats = ytdl.filterFormats(info.formats, 'audioandvideo');
    const videoUrl = videoFormats[0].url;

    res.json({ success: true, url: videoUrl });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Gagal mengunduh video' });
  }
});

module.exports = router;
