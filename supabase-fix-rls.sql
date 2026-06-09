-- =============================================
-- PREMOLSA – Fix RLS policies
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- =============================================

-- ── PRODUCTS ──────────────────────────────────
drop policy if exists "Productos para autenticados" on public.products;
drop policy if exists "Admin gestiona productos" on public.products;

-- Clientes solo ven productos visibles
create policy "Clientes ven productos visibles" on public.products
  for select
  using (auth.uid() is not null and visible = true);

-- Admin ve TODOS (incluidos ocultos)
create policy "Admin ve todos los productos" on public.products
  for select
  using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

-- Admin crea productos
create policy "Admin inserta productos" on public.products
  for insert
  with check (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

-- Admin edita productos
create policy "Admin actualiza productos" on public.products
  for update
  using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ))
  with check (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

-- Admin elimina productos
create policy "Admin elimina productos" on public.products
  for delete
  using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));


-- ── SERVICES ──────────────────────────────────
drop policy if exists "Servicios públicos" on public.services;
drop policy if exists "Admin gestiona servicios" on public.services;

create policy "Servicios visibles para todos" on public.services
  for select using (true);

create policy "Admin inserta servicios" on public.services
  for insert with check (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin actualiza servicios" on public.services
  for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admin elimina servicios" on public.services
  for delete using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));


-- ── CATEGORIES ────────────────────────────────
drop policy if exists "Categorías públicas" on public.categories;
drop policy if exists "Admin gestiona categorías" on public.categories;

create policy "Categorias visibles para todos" on public.categories
  for select using (true);

create policy "Admin inserta categorias" on public.categories
  for insert with check (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin actualiza categorias" on public.categories
  for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admin elimina categorias" on public.categories
  for delete using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));


-- ── PROFILES ──────────────────────────────────
drop policy if exists "Perfil propio" on public.profiles;
drop policy if exists "Admin ve todos los perfiles" on public.profiles;

create policy "Usuario ve su perfil" on public.profiles
  for select using (auth.uid() = id);

create policy "Admin ve todos los perfiles" on public.profiles
  for select using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin inserta perfiles" on public.profiles
  for insert with check (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin actualiza perfiles" on public.profiles
  for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admin elimina perfiles" on public.profiles
  for delete using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

-- Permitir que el trigger inserte el perfil al registrar usuario
create policy "Trigger crea perfil" on public.profiles
  for insert with check (auth.uid() = id);
