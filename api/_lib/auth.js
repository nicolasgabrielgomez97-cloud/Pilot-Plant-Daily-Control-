import crypto from 'node:crypto';
import {createClient} from '@supabase/supabase-js';
const COOKIE='pp_daily_session';
const secret=()=>process.env.SESSION_SECRET;
const sign=(payload)=>crypto.createHmac('sha256',secret()).update(payload).digest('base64url');
const equal=(a,b)=>{const x=Buffer.from(String(a)),y=Buffer.from(String(b));return x.length===y.length&&crypto.timingSafeEqual(x,y)};
export const getDB=()=>{
 const url=process.env.SUPABASE_URL, key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key||!secret()||!process.env.APP_PASSWORD)throw new Error('Faltan variables privadas en Vercel');
 return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
};
export const setHeaders=res=>{res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff')};
export const readSession=req=>{try{const cookies=Object.fromEntries((req.headers.cookie||'').split(';').map(c=>c.trim().split('=').map(decodeURIComponent)).filter(x=>x.length===2));const token=cookies[COOKIE];if(!token||!secret())return false;const [payload,mac]=token.split('.');if(!payload||!mac||!equal(mac,sign(payload)))return false;const data=JSON.parse(Buffer.from(payload,'base64url').toString());return data.exp>Date.now()&&data.v===1}catch{return false}};
export const makeCookie=()=>{const payload=Buffer.from(JSON.stringify({v:1,exp:Date.now()+7*24*3600*1000})).toString('base64url');return `${COOKIE}=${payload}.${sign(payload)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`};
export const clearCookie=()=>`${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
export const requireSession=(req,res)=>{if(!readSession(req)){res.status(401).json({error:'Sesión vencida. Ingresá nuevamente.'});return false}return true};
export const originOK=req=>{const origin=req.headers.origin;if(!origin)return false;try{return new URL(origin).host===req.headers.host&&new URL(origin).protocol==='https:'}catch{return false}};
export const checkPassword=password=>{if(typeof password!=='string')return false;return equal(crypto.createHash('sha256').update(password).digest('hex'),crypto.createHash('sha256').update(process.env.APP_PASSWORD||'').digest('hex'))};
