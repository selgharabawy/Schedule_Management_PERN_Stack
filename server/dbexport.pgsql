--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: schedules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedules (
    id integer NOT NULL,
    subject character varying(100),
    start_time timestamp with time zone,
    end_time timestamp with time zone,
    isallday boolean,
    recurrence_rule character varying(100)
);


ALTER TABLE public.schedules OWNER TO postgres;

--
-- Name: schedules_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.schedules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.schedules_id_seq OWNER TO postgres;

--
-- Name: schedules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schedules_id_seq OWNED BY public.schedules.id;


--
-- Name: schedules id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedules ALTER COLUMN id SET DEFAULT nextval('public.schedules_id_seq'::regclass);


--
-- Data for Name: schedules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schedules (id, subject, start_time, end_time, isallday, recurrence_rule) FROM stdin;
3	class3	2022-11-01 20:00:00+02	2022-11-01 20:59:59+02	f	\N
2	class2	2022-10-30 20:00:00+02	2022-10-30 20:59:59+02	f	FREQ=WEEKLY;INTERVAL=1;COUNT=1000
4	class4	2022-11-04 20:00:00+02	2022-11-04 20:59:59+02	f	FREQ=WEEKLY;INTERVAL=1;COUNT=1000
1	class1	2022-10-28 21:00:00+02	2022-10-28 21:59:59+02	f	FREQ=WEEKLY;INTERVAL=1;COUNT=1000
5	class5	2022-11-04 20:00:00+02	2022-11-04 20:59:59+02	f	FREQ=WEEKLY;INTERVAL=1;COUNT=1000
9	class6	\N	\N	f	\N
13	new	2022-11-13 21:00:00+02	2022-11-13 22:00:00+02	\N	\N
17	rrt	2022-11-14 22:00:00+02	2022-11-14 23:00:00+02	\N	\N
18	yyyy	2022-11-14 23:00:00+02	2022-11-15 00:00:00+02	\N	FREQ=WEEKLY;INTERVAL=1;COUNT=1000
21	ooo	2022-11-15 21:00:00+02	2022-11-15 22:00:00+02	\N	\N
15	tototo	2022-11-13 22:00:00+02	2022-11-13 23:00:00+02	\N	FREQ=WEEKLY;INTERVAL=1;COUNT=1000
\.


--
-- Name: schedules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schedules_id_seq', 22, true);


--
-- Name: schedules schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

