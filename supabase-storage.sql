-- =============================================
-- PREMOLSA – Buckets de Storage
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- (o crear los buckets manualmente en Storage)
-- =============================================

-- Buckets públicos para lectura (las fotos/fichas se ven sin login en la web pública;
-- las fichas de productos se muestran en el área de cliente)
insert into storage.buckets (id, name, public)
values
  ('productos', 'productos', true),
  ('fichas', 'fichas', true),
  ('obras', 'obras', true)
on conflict (id) do nothing;

-- Lectura pública de los 3 buckets
create policy "Lectura publica productos" on storage.objects
  for select using (bucket_id = 'productos');
create policy "Lectura publica fichas" on storage.objects
  for select using (bucket_id = 'fichas');
create policy "Lectura publica obras" on storage.objects
  for select using (bucket_id = 'obras');

-- Solo admin puede subir/editar/borrar (el script de carga usa la service_role key,
-- que ignora RLS; estas políticas habilitan además la subida desde el panel admin)
create policy "Admin gestiona storage" on storage.objects
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
  with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );
