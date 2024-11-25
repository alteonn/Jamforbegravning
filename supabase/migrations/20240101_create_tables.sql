-- Enable pgcrypto for UUID generation
create extension if not exists pgcrypto;

-- Drop existing tables if they exist
drop table if exists public.articles;
drop table if exists public.companies;

-- Articles table
create table public.articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  category text not null,
  slug text not null unique,
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Companies table
create table public.companies (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  city text not null,
  description text not null,
  services jsonb not null default '[]'::jsonb,
  phone text not null,
  email text not null,
  website text,
  verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Disable Row Level Security
alter table public.articles disable row level security;
alter table public.companies disable row level security;

-- Create functions for updating timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers for updating timestamps
drop trigger if exists handle_articles_updated_at on public.articles;
create trigger handle_articles_updated_at
  before update on public.articles
  for each row
  execute function public.handle_updated_at();

drop trigger if exists handle_companies_updated_at on public.companies;
create trigger handle_companies_updated_at
  before update on public.companies
  for each row
  execute function public.handle_updated_at();