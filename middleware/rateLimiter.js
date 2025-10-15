const rateLimit=require('express-rate-limit');
const rateLimiter=rateLimit({
  windowMs:parseInt(process.env.RATE_LIMIT_WINDOW_MS||'60000'),
  max:parseInt(process.env.RATE_LIMIT_MAX||'8'),
  standardHeaders:true,
  legacyHeaders:false
});
module.exports={rateLimiter};