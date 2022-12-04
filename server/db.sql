CREATE DATABASE schedules_pern_db;

CREATE TABLE schedules(
    id SERIAL PRIMARY KEY,
    subject VARCHAR(100),
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    isAllDay BOOLEAN,
    recurrence_rule VARCHAR(100)
);

SET timezone = 'Africa/Cairo';


INSERT INTO schedules (subject, start_time, end_time, isallday, recurrence_rule) 
VALUES ('class1','2022-10-28 19:00:00', '2022-10-28 19:59:59',true, 'FREQ=WEEKLY;INTERVAL=1;COUNT=1000');


ALTER TABLE schedules 
RENAME COLUMN starttime TO start_time;

ALTER TABLE schedules 
RENAME COLUMN endtime TO end_time;

ALTER TABLE schedules 
RENAME COLUMN recurrencerule TO recurrence_rule;