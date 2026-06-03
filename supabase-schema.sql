-- =============================================
-- PREMOLSA – Schema Supabase
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- =============================================

-- 1. Tabla de perfiles (vinculada a auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  role text not null default 'client' check (role in ('admin', 'client')),
  created_at timestamptz default now()
);

-- Crear perfil automáticamente al registrar usuario
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'client')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Categorías de productos
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  icon text,
  "order" int default 0
);

-- 3. Productos
create table public.products (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  specs jsonb default '{}'::jsonb,
  pdf_url text,
  image_url text,
  visible boolean default true,
  created_at timestamptz default now()
);

-- 4. Servicios
create table public.services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  icon text,
  "order" int default 0,
  visible boolean default true
);

-- =============================================
-- RLS (Row Level Security)
-- =============================================

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.services enable row level security;

-- Profiles: cada usuario ve su perfil; admin ve todos
create policy "Perfil propio" on public.profiles
  for select using (auth.uid() = id);

create policy "Admin ve todos los perfiles" on public.profiles
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Categories: públicas para lectura; solo admin escribe
create policy "Categorías públicas" on public.categories
  for select using (true);

create policy "Admin gestiona categorías" on public.categories
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Products: visibles para usuarios autenticados; admin gestiona todo
create policy "Productos para autenticados" on public.products
  for select using (auth.uid() is not null and visible = true);

create policy "Admin gestiona productos" on public.products
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Services: públicos para lectura
create policy "Servicios públicos" on public.services
  for select using (true);

create policy "Admin gestiona servicios" on public.services
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- =============================================
-- Datos de ejemplo – Categorías
-- =============================================
insert into public.categories (name, slug, icon, "order") values
  ('Forjados y estructura', 'forjados', '🏗️', 1),
  ('Albañilería y bloques', 'albanileria', '🧱', 2),
  ('Hierro y ferralla', 'hierro', '⚙️', 3),
  ('Accesorios', 'accesorios', '🔧', 4);

-- =============================================
-- Datos de ejemplo – Servicios
-- =============================================
insert into public.services (title, description, icon, "order") values
  ('Cálculo de estructuras', 'Servicio personalizado de cálculo y asesoramiento técnico para que tu obra salga perfecta desde el primer momento.', '📐', 1),
  ('Suministro en obra', 'Entrega directa en obra adaptada al ritmo de tus necesidades. Sin esperas innecesarias.', '🚛', 2),
  ('Marcado CE', 'Todos nuestros productos cumplen la normativa europea de Marcado CE, garantizando calidad y seguridad.', '✅', 3),
  ('Asesoramiento técnico', 'Más de 55 años de experiencia a tu disposición. Te ayudamos a elegir la solución óptima.', '💬', 4);
