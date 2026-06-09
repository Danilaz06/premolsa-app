-- Fix: eliminar política recursiva en profiles
-- Ejecutar en Supabase → SQL Editor

drop policy if exists "Admin ve todos los perfiles" on public.profiles;
drop policy if exists "Admin gestiona perfiles" on public.profiles;
drop policy if exists "Admin inserta perfiles" on public.profiles;
drop policy if exists "Admin actualiza perfiles" on public.profiles;
drop policy if exists "Admin elimina perfiles" on public.profiles;
drop policy if exists "Perfil propio" on public.profiles;
drop policy if exists "Usuario ve su perfil" on public.profiles;
drop policy if exists "Trigger crea perfil" on public.profiles;

-- Solo esta: cada usuario ve y gestiona su propio perfil
create policy "Usuario ve su propio perfil" on public.profiles
  for select using (auth.uid() = id);

-- El trigger puede insertar perfiles al registrar usuarios
create policy "Insertar perfil propio" on public.profiles
  for insert with check (auth.uid() = id);

-- Cada usuario puede actualizar su propio perfil
create policy "Actualizar perfil propio" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);
