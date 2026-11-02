import {setHeaders,originOK,clearCookie} from './_lib/auth.js';
export default function handler(req,res){setHeaders(res);if(req.method!=='POST')return res.status(405).end();if(!originOK(req))return res.status(403).end();res.setHeader('Set-Cookie',clearCookie());return res.status(200).json({ok:true})}
