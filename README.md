# Pilot Plant Daily Control

App Kanban lista para desplegar en Vercel. Incluye los 10 temas del seguimiento original, edición y creación de tarjetas, drag & drop entre columnas, filtros, Nico Queue, reporte semanal y exportación CSV.

## 1. Probar en tu PC

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev
```

Entrá a la dirección que muestre la terminal (habitualmente http://localhost:5173).

## 2. Publicar en Vercel

1. Descomprimí la carpeta y subila a un repositorio privado de GitHub.
2. En https://vercel.com/new, importá ese repositorio.
3. Elegí Framework Preset: **Vite** (Vercel normalmente lo detecta automáticamente).
4. Deploy. No necesitás variables de entorno para el modo demo.

**Atención:** sin base de datos las tareas se guardan exclusivamente en el almacenamiento local de cada navegador. No se sincronizan entre Julieta, Martín y Nico, y se pueden perder al borrar datos del navegador. El sitio demo es público para quien posea el link y no requiere login. No usar para datos confidenciales.

## 3. Compartir datos entre el equipo (modo recomendado)

1. Crear proyecto en https://supabase.com/dashboard.
2. Abrir SQL Editor y ejecutar `supabase.sql`.
3. En SQL Editor, agregar los emails reales de Nico, Julieta y Martín a `public.allowed_users` (mirá el ejemplo al final del archivo SQL).
4. En Supabase Authentication, habilitar Email OTP/Magic Link. Crear/invitar las tres cuentas **antes de ingresar** (el frontend usa `shouldCreateUser: false`).
5. En Supabase Authentication > URL Configuration, configurar `Site URL` al dominio publicado en Vercel y agregarlo a Redirect URLs.
6. En Vercel > Project > Settings > Environment Variables, agregar:
   - `VITE_SUPABASE_URL` = Project URL
   - `VITE_SUPABASE_ANON_KEY` = anon/public key (nunca service_role)
7. Volver a desplegar desde Vercel. Ahora se muestra un login por email, se comparten las tareas en la base y se pueden actualizar desde los tres dispositivos.

**Carga inicial compartida**: en modo local aparecen automáticamente los 10 temas. En modo Supabase la base comienza vacía, para evitar duplicaciones de datos entre usuarios. Para cargarlos se puede usar el botón “Nueva tarea”, o ejecutar el script `seed.sql` desde el SQL Editor **una sola vez** (incluido en este proyecto).

La sincronización por eventos es opcional: si se habilita la publicación Realtime de `public.tasks` en Supabase, otras pantallas abiertas se actualizan al recibir cambios. Si no se habilita, refrescá la pantalla para ver cambios de otros usuarios.

**Seguridad:** la base usa RLS con listado de emails autorizados. Revisar el acceso en Supabase antes de incluir información sensible de la planta. `VITE_*` son variables públicas visibles en el cliente; nunca colocar contraseñas o service_role keys allí.

## Reglas de uso sugeridas

- Daily a las 08:30: Done → Blocked → Waiting → Today → In Progress.
- Hasta 3 tareas en progreso por responsable (acuerdo de trabajo, no bloqueo técnico).
- “En espera” = dependencia externa. “Bloqueado” = imposibilidad de avanzar que exige acción.
- Las 10 fechas originales se preservaron. Como ya pasaron, las tareas empiezan en **Backlog** hasta validar su estado real. No fueron marcadas como completadas ni bloqueadas sin evidencia.
- Friday pulse: mirar completadas esta semana, bloqueos, dependencias y carga.
