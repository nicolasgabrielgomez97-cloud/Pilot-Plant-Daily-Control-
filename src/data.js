export const columns = [
  {id:'blocked',label:'Bloqueado',desc:'Necesita destrabarse',color:'#dc5268'},
  {id:'today',label:'Hoy',desc:'Compromisos del día',color:'#ea924e'},
  {id:'progress',label:'En progreso',desc:'Trabajo activo',color:'#6093e8'},
  {id:'waiting',label:'En espera',desc:'Dependencias externas',color:'#b18ae2'},
  {id:'done',label:'Hecho',desc:'Cerrados esta semana',color:'#39b894'},
];
const base = [
 ['Actualización y cambios plan anual de mantenimiento','Martín','Mantenimientos/Logbooks','P3','2026-07-11','2026-10-28','backlog'],
 ['Ubicación de nuevas heladeras','Julieta','Equipos','P2','2026-07-24','2026-09-15','backlog'],
 ['Generación IQ/OQ línea de vacío planta piloto','Martín','Calidad/SOPs','P3','2026-08-06','2026-10-30','backlog'],
 ['Reversión SOP MTS-09-B','Julieta','Calidad/SOPs','P3','2026-08-01','2026-09-28','backlog'],
 ['Muestreos FA Comparators septiembre/octubre','Martín','Protocolos','P2','2026-09-02','2026-10-15','backlog'],
 ['URS + IQ/OQ bomba peristáltica e IQ/OQ bomba dosificadora','Martín','Calidad/SOPs','P2','2026-09-10','2026-09-28','backlog'],
 ['SOP VIDAS KUBE (MTS-06-IM)','Julieta','Calidad/SOPs','P2','2026-09-10','2026-10-31','backlog'],
 ['Protocolo sonda vs strips de amonio','Martín','Protocolos','P1','2026-09-10','2026-10-31','backlog'],
 ['Seguimiento tema freezers','Martín','Equipos','P1','2026-09-10','2026-10-31','backlog'],
 ['Compra de jeringas','Martín','Equipos','P1','2026-09-10','2026-10-31','backlog']
];
export const initialTasks = base.map((r,i)=>({id:`seed-${i+1}`,title:r[0],owner:r[1],front:r[2],priority:r[3],start:r[4],due:r[5],status:r[6],next:'',blocker:'',waitingOn:'',needsNico:false,notes:'',completedAt:'',createdAt:'2026-11-02T08:30:00-03:00',updatedAt:'2026-11-02T08:30:00-03:00'}));
export const blankTask = () => ({id:crypto.randomUUID(),title:'',owner:'Martín',front:'Equipos',priority:'P2',start:new Date().toISOString().slice(0,10),due:'',status:'backlog',next:'',blocker:'',waitingOn:'',needsNico:false,notes:'',completedAt:'',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
export const fronts = ['Equipos','Protocolos','Calidad/SOPs','Mantenimientos/Logbooks','Infraestructura','Compras','Otros'];
