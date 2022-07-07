-- Function to retrieve daily job application count
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

-- Function to retrieve daily interview count
create or replace function user_daily_interview_counts()
returns table (
  interview_at date,
  interview_count bigint
)
language plpgsql
security invoker
as $$
begin
  return query
    select interviews.interview_at, count(*) as interview_count
    from interviews
    group by interviews.interview_at
    order by interviews.interview_at asc;
end
$$;

-- Function to retrieve data for sankey diagram
create or replace function sankey_data()
returns table (
  -- job_id bigint,
  stage bigint,
  company_response text
)
language plpgsql
security invoker
as $$
begin
  return query
    select
      -- rec.job_id,
      rec.stage,
      rec.response as company_response
    from (
      select
        id as job_id,
        0 as stage,
        case
          when j1.response = '' or j1.response is null then 'No Response'
          when j1.response ilike('%reject%') then 'Rejection'
          when j1.response ilike('%offer%') then 'Offer'
          else j1.response
        end as response
      from jobs as j1
      where j1.id not in (
        select distinct(i1.job_id)
        from interviews as i1
      )
      union
      select
        l.job_id as job_id,
        l.stage as stage,
        case
          when r.response = '' or r.response is null then 'No Response'
          when r.response ilike('%reject%') then 'Rejection'
          when r.response ilike('%offer%') then 'Offer'
          else r.response
        end as response
      from (
        select i2.job_id, count(*) as stage
        from interviews as i2
        group by i2.job_id
      ) as l
      left join (
        select i3.job_id, i3.response
        from interviews as i3
        where i3.response is not null or i3.response != ''
      ) as r
      on l.job_id = r.job_id
    ) as rec;
end
$$;