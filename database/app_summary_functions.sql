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

create or replace function total_app_interviews()
returns int
language plpgsql
security definer set search_path = public
as $$
begin
  return (
    SELECT COUNT(*)
    FROM interviews
  );
end
$$;

create or replace function total_daily_job_counts()
returns table (
  applied_at date,
  job_count bigint
)
language plpgsql
security definer set search_path = public
as $$
begin
  return query
    select jobs.applied_at, count(*) as job_count
    from jobs
    group by jobs.applied_at
    order by jobs.applied_at asc;
end
$$;