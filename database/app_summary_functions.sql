create or replace function total_app_jobs()
returns int
language plpgsql
security definer set search_path = public
as $$
begin
  return (
    SELECT COUNT(*)
    FROM jobs
  );
end
$$;

create or replace function total_app_users()
returns int
language plpgsql
security definer set search_path = auth
as $$
begin
  return (
    SELECT COUNT(*)
    FROM auth.users
  );
end
$$;