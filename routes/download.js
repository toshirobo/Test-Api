const express=require('express');
const ytdl=require('ytdl-core');
const ffmpeg=require('fluent-ffmpeg');
const sanitize=require('sanitize-filename');
const { streamToMP3 }=require('../utils/ffmpeg');
const router=express.Router();
router.get('/audio',async(req,res,next)=>{
  try{
    const url=req.query.url;
    const format=(req.query.format||'mp3').toLowerCase();
    if(!url)return res.status(400).json({error:'Missing url'});
    const info=await ytdl.getInfo(url);
    const title=sanitize(info.videoDetails.title||'audio');
    res.setHeader('Content-Disposition',`attachment; filename="${title}.${format}"`);
    const audioStream=ytdl(url,{quality:'highestaudio',filter:'audioonly',highWaterMark:1<<25});
    if(format==='webm'||format==='opus'){audioStream.pipe(res);}else{streamToMP3(audioStream,format).pipe(res);}
  }catch(err){next(err);}
});
router.get('/info',async(req,res,next)=>{
  try{
    const url=req.query.url;
    if(!url)return res.status(400).json({error:'Missing url'});
    const info=await ytdl.getBasicInfo(url);
    res.json({info:info.videoDetails});
  }catch(err){next(err);}
});
module.exports=router;
