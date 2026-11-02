-- Ejecutar en Supabase SQL Editor. Acceso exclusivo para usuarios autorizados.
create table if not exists public.allowed_users (
  email text primary key
);

create table if not exists public.tasks (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
create index if not exists tasks_updated_idx on public.tasks(updated_at desc);
alter table public.tasks enable row level security;
alter table public.allowed_users enable row level security;

-- Cada usuario puede verificar únicamente su propia pertenencia a la lista.
drop policy if exists "Consultar mi invitación" on public.allowed_users;
create policy "Consultar mi invitación" on public.allowed_users for select to authenticated
using (lower(email) = lower(auth.jwt()->>'email'));

-- La lista de invitados se administra desde SQL Editor; no se expone al cliente.
drop policy if exists "Invitados pueden leer tareas" on public.tasks;
create policy "Invitados pueden leer tareas" on public.tasks for select to authenticated
using (exists (select 1 from public.allowed_users au where lower(au.email) = lower(auth.jwt()->>'email')));
drop policy if exists "Invitados pueden crear tareas" on public.tasks;
create policy "Invitados pueden crear tareas" on public.tasks for insert to authenticated
with check (exists (select 1 from public.allowed_users au where lower(au.email) = lower(auth.jwt()->>'email')));
drop policy if exists "Invitados pueden editar tareas" on public.tasks;
create policy "Invitados pueden editar tareas" on public.tasks for update to authenticated
using (exists (select 1 from public.allowed_users au where lower(au.email) = lower(auth.jwt()->>'email')))
with check (exists (select 1 from public.allowed_users au where lower(au.email) = lower(auth.jwt()->>'email')));
drop policy if exists "Invitados pueden borrar tareas" on public.tasks;
create policy "Invitados pueden borrar tareas" on public.tasks for delete to authenticated
using (exists (select 1 from public.allowed_users au where lower(au.email) = lower(auth.jwt()->>'email')));

-- Reemplazar por las tres direcciones de mail autorizadas y ejecutar:
-- insert into public.allowed_users (email) values ('nico@empresa.com'), ('julieta@empresa.com'), ('martin@empresa.com') on conflict do nothing;
-- IMPORTANTE: deshabilitar registros públicos / limitar invitaciones en Supabase Auth.
-- Opcional (en SQL Editor): habilitar replicación para tareas desde Database > Replication.
