const express=require('express');
const yts=require('yt-search');
const router=express.Router();
router.get('/', async(req,res,next)=>{
  try{
    const q=req.query.q;
    if(!q)return res.status(400).json({error:'Missing q parameter'});
    const r=await yts(q);
    const videos=r.videos.slice(0,8).map(v=>({id:v.videoId,title:v.title,duration:v.timestamp,url:v.url,thumbnail:v.thumbnail}));
    res.json({results:videos});
  }catch(err){next(err);}
});
module.exports=router;