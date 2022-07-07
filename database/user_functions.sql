create or replace function user_interviews()
returns table (
  id bigint,
  job_id bigint,
  company text,
  job_title text,
  applied_at date,
  interview_type text,
  interview_at date,
  responded_at date,
  response text
)
language plpgsql
security invoker
as $$
begin
  return query
    SELECT
      i.id,
      j.id,
      j.company,
      j.job_title,
      j.applied_at,
      i.interview_type,
      i.interview_at,
      i.responded_at,
      i.response
    FROM interviews AS i
    JOIN jobs AS j
      ON i.job_id = j.id
    ORDER BY i.interview_at DESC;
end
$$;

create or replace function user_companies()
returns table (
  company text
)
language plpgsql
security invoker
as $$
begin
  return query
    SELECT DISTINCT(j.company)
    FROM jobs AS j;
end
$$;

create or replace function company_job_titles(company_name text)
returns table (
  job_title text
)
language plpgsql
security invoker
as $$
begin
  return query
    SELECT j.job_title
    FROM jobs AS j
    WHERE j.company = company_name;
end
$$;

create or replace function company_applied_dates(company_name text, company_job_title text)
returns table (
  applied_at date,
  job_id bigint
)
language plpgsql
security invoker
as $$
begin
  return query
    SELECT j.applied_at, j.id
    FROM jobs AS j
    WHERE j.company = company_name AND j.job_title = company_job_title;
end
$$;