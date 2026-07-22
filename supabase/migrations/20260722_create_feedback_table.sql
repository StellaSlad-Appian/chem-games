-- supabase/migrations/20260722_create_feedback_table.sql

-- Create feedback table for ChemGames user input
create table if not exists public.feedback (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  type text not null check (type in ('bug', 'chemistry', 'feature')),
  message text not null,
  user_id uuid references auth.users(id) on delete set null,
  page_url text
);

-- Enable Row Level Security
alter table public.feedback enable row level security;

-- Allow anonymous or authenticated players to submit feedback
create policy "Anyone can submit feedback"
on public.feedback
for insert
with check (true);