# Bot integration example

const fetch=require('node-fetch');
async function handlePlayCommand(reply,url){
  const apiUrl=`https://your-api.example.com/api/download/audio?url=${encodeURIComponent(url)}&format=mp3`;
  const r=await fetch(apiUrl);
  const buffer=await r.arrayBuffer();
  // send buffer via bot API
}
