# Pilot Plant Daily — contraseña compartida + Supabase

La interfaz Vite se publica en Vercel. Las rutas `/api/*` son funciones serverless Node.js. No se envía la clave de administración de Supabase al navegador. Las tareas se guardan en la tabla existente `public.tasks`. Los navegadores sincronizan los datos mediante actualización automática cada 12 segundos.

## Despliegue
1. Subí el **contenido** de esta carpeta a la **raíz** del repositorio GitHub existente, reemplazando archivos y agregando la carpeta `api/` y `vercel.json`. Confirmá en GitHub que aparecen `src/main.jsx`, `api/login.js`, `api/tasks.js`.
2. En Vercel, Project → Settings → Environment Variables, agregá variables en el entorno Production **como Config**, no como Secret en el formulario que impide guardar valores VITE. Para las variables privadas de este paquete el tipo debe ser **Secret/Sensitive** si está disponible. NO agregues `VITE_` a las nuevas variables.
3. `SUPABASE_URL`: Project URL del Supabase existente (sin `/rest/v1`). `SUPABASE_SERVICE_ROLE_KEY`: clave de servidor de Supabase (Project Settings → API Keys → legacy service_role, o secret key compatible con el cliente). **No compartir ni publicar.** `APP_PASSWORD`: contraseña común larga, distinta de claves corporativas. `SESSION_SECRET`: cadena aleatoria de 64 caracteres o más, generada de forma segura.
4. Asegurate de que `supabase.sql` y `seed.sql` ya se hayan ejecutado antes, y que existan filas en `public.tasks` (Table Editor). NO ejecutes seed.sql de nuevo si ya hay datos.
5. El commit de GitHub debe desplegar automáticamente. Comprobá Deployment → Ready y Visit. Ingresá la contraseña elegida. Editá una tarea y comprobá desde otro navegador que aparece al refrescar o dentro de 12 segundos.
6. Elimina las antiguas variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` de Vercel cuando hayas comprobado el funcionamiento: esta versión no las necesita. No quites ni desactives RLS en Supabase.

## Seguridad y límites
- Una sola contraseña: no diferencia quién hizo cada cambio. No cargar datos GMP ni confidenciales sin aprobación de IT y evaluación de seguridad.
- Contraseña verificada en servidor, cookie HttpOnly/Secure/SameSite Strict con vencimiento de 7 días, cambios con validación de origen, API con autorización en todas las operaciones.
- **No incluye limitador distribuido de intentos de contraseña**. Antes de exponerla en producción corporativa, habilitar rate limiting/WAF en Vercel o equivalente y monitoreo, más autorización de IT. La contraseña debe ser larga y única.
- La URL de Vercel es pública, pero las tareas no se entregan sin contraseña. Evitar habilitar políticas de lectura/escritura `anon` en Supabase. Mantener `SUPABASE_SERVICE_ROLE_KEY` solo en Vercel.
- Desplegar el frontend no significa cumplir validación GMP. Esta app es de coordinación operativa, no registro regulado.
- Para rotar la contraseña, cambiar `APP_PASSWORD` en Vercel y redeploy. IMPORTANTE: sesiones preexistentes continúan válidas hasta que venza su cookie; rotar también `SESSION_SECRET` para invalidarlas inmediatamente.
