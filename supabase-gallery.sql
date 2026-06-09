-- =============================================
-- PREMOLSA – Galería gestionable
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- =============================================

-- Tabla de fotos de galería (instalaciones)
create table if not exists public.gallery (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  caption text,
  "order" int default 0,
  created_at timestamptz default now()
);

alter table public.gallery enable row level security;

-- Lectura pública (la galería se ve en la web sin login)
create policy "Galeria visible para todos" on public.gallery
  for select using (true);

-- Solo admin gestiona
create policy "Admin inserta galeria" on public.gallery
  for insert with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "Admin actualiza galeria" on public.gallery
  for update using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "Admin elimina galeria" on public.gallery
  for delete using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Bucket de Storage para la galería
insert into storage.buckets (id, name, public)
values ('galeria', 'galeria', true)
on conflict (id) do nothing;

create policy "Lectura publica galeria" on storage.objects
  for select using (bucket_id = 'galeria');
