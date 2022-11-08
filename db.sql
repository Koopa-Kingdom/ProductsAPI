--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Homebrew)
-- Dumped by pg_dump version 15.0

-- Started on 2022-11-05 16:08:48 CDT

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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: ubuntu
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16441)
-- Name: features; Type: TABLE; Schema: public; Owner: ubuntu
--

CREATE TABLE public.features (
    id integer NOT NULL,
    product_id integer,
    feature text,
    value text
);


ALTER TABLE public.features OWNER TO ubuntu;

--
-- TOC entry 216 (class 1259 OID 16546)
-- Name: photos; Type: TABLE; Schema: public; Owner: ubuntu
--

CREATE TABLE public.photos (
    id bigint NOT NULL,
    style_id bigint NOT NULL,
    url text,
    thumbnail_url text
);


ALTER TABLE public.photos OWNER TO ubuntu;

--
-- TOC entry 214 (class 1259 OID 16544)
-- Name: photos_id_seq; Type: SEQUENCE; Schema: public; Owner: ubuntu
--

CREATE SEQUENCE public.photos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_id_seq OWNER TO ubuntu;

--
-- TOC entry 3630 (class 0 OID 0)
-- Dependencies: 214
-- Name: photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ubuntu
--

ALTER SEQUENCE public.photos_id_seq OWNED BY public.photos.id;


--
-- TOC entry 215 (class 1259 OID 16545)
-- Name: photos_style_id_seq; Type: SEQUENCE; Schema: public; Owner: ubuntu
--

CREATE SEQUENCE public.photos_style_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_style_id_seq OWNER TO ubuntu;

--
-- TOC entry 3631 (class 0 OID 0)
-- Dependencies: 215
-- Name: photos_style_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ubuntu
--

ALTER SEQUENCE public.photos_style_id_seq OWNED BY public.photos.style_id;


--
-- TOC entry 209 (class 1259 OID 16386)
-- Name: product; Type: TABLE; Schema: public; Owner: ubuntu
--

CREATE TABLE public.product (
    id integer NOT NULL,
    campus character(10) DEFAULT 'hr-rfc'::bpchar,
    name text,
    slogan text,
    description text,
    category character(25),
    default_price real,
    created_at date DEFAULT now(),
    updated_at date DEFAULT now()
);


ALTER TABLE public.product OWNER TO ubuntu;

--
-- TOC entry 211 (class 1259 OID 16457)
-- Name: related; Type: TABLE; Schema: public; Owner: ubuntu
--

CREATE TABLE public.related (
    id integer NOT NULL,
    product_id integer,
    related_product_id integer
);


ALTER TABLE public.related OWNER TO ubuntu;

--
-- TOC entry 213 (class 1259 OID 16500)
-- Name: skus; Type: TABLE; Schema: public; Owner: ubuntu
--

CREATE TABLE public.skus (
    id integer NOT NULL,
    style_id integer,
    size character(10),
    quantity integer
);


ALTER TABLE public.skus OWNER TO ubuntu;

--
-- TOC entry 212 (class 1259 OID 16467)
-- Name: styles; Type: TABLE; Schema: public; Owner: ubuntu
--

CREATE TABLE public.styles (
    id integer NOT NULL,
    product_id integer,
    name text,
    original_price real,
    sale_price character varying,
    default_style integer
);


ALTER TABLE public.styles OWNER TO ubuntu;

--
-- TOC entry 3468 (class 2604 OID 16549)
-- Name: photos id; Type: DEFAULT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.photos ALTER COLUMN id SET DEFAULT nextval('public.photos_id_seq'::regclass);


--
-- TOC entry 3469 (class 2604 OID 16550)
-- Name: photos style_id; Type: DEFAULT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.photos ALTER COLUMN style_id SET DEFAULT nextval('public.photos_style_id_seq'::regclass);


--
-- TOC entry 3473 (class 2606 OID 16447)
-- Name: features features_pkey; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.features
    ADD CONSTRAINT features_pkey PRIMARY KEY (id);


--
-- TOC entry 3481 (class 2606 OID 16554)
-- Name: photos photos_pkey; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (id);


--
-- TOC entry 3471 (class 2606 OID 16392)
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- TOC entry 3475 (class 2606 OID 16461)
-- Name: related related_pkey; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.related
    ADD CONSTRAINT related_pkey PRIMARY KEY (id);


--
-- TOC entry 3479 (class 2606 OID 16504)
-- Name: skus skus_pkey; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.skus
    ADD CONSTRAINT skus_pkey PRIMARY KEY (id);


--
-- TOC entry 3477 (class 2606 OID 16473)
-- Name: styles styles_pkey; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.styles
    ADD CONSTRAINT styles_pkey PRIMARY KEY (id);


--
-- TOC entry 3482 (class 2606 OID 16448)
-- Name: features fk_product; Type: FK CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.features
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- TOC entry 3483 (class 2606 OID 16462)
-- Name: related fk_product; Type: FK CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.related
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- TOC entry 3484 (class 2606 OID 16474)
-- Name: styles fk_product; Type: FK CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.styles
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- TOC entry 3629 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: ubuntu
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2022-11-05 16:08:48 CDT

--
-- PostgreSQL database dump complete
--

