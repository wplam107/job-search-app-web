create or replace function user_interviews()
returns table (
  id bigint,
  company text,
  job_title text,
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
      j.company,
      j.job_title,
      i.interview_type,
      i.interview_at,
      i.responded_at,
      i.response
    FROM interviews AS i
    JOIN jobs AS j
      ON i.job_id = j.id;
end
$$;