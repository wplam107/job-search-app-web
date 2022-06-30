create or replace function user_daily_job_counts()
returns table (
  applied_at date,
  job_count bigint
)
language plpgsql
security invoker
as $$
begin
  return query
    select jobs.applied_at, count(*) as job_count
    from jobs
    group by jobs.applied_at
    order by jobs.applied_at asc;
end
$$;