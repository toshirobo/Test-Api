const ffmpeg=require('fluent-ffmpeg');
function streamToMP3(inputStream,format='mp3'){return ffmpeg(inputStream).format(format).audioBitrate(128).pipe();}
module.exports={streamToMP3};
