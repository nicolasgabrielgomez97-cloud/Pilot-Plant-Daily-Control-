import {getDB,setHeaders,requireSession} from './_lib/auth.js';
export default function handler(req,res){setHeaders(res);if(req.method!=='GET')return res.status(405).end();try{getDB();if(!requireSession(req,res))return;return res.status(200).json({ok:true})}catch{return res.status(500).json({error:'Servidor sin configurar'})}}
