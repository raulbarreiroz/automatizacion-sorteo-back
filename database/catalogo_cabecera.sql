-- Table: public.catalogo_cabecera
-- DROP TABLE IF EXISTS public.catalogo_cabecera;
CREATE TABLE IF NOT EXISTS public.catalogo_cabecera (
  id integer NOT NULL DEFAULT nextval('catalogo_cabecera_id_seq' :: regclass),
  nombre character varying(25) COLLATE pg_catalog."default" NOT NULL,
  descripcion character varying(250) COLLATE pg_catalog."default",
  creado_por character varying(100) COLLATE pg_catalog."default" NOT NULL,
  fecha_creacion timestamp with time zone NOT NULL,
  modificado_por character varying(100) [] COLLATE pg_catalog."default",
  estado character varying(1) COLLATE pg_catalog."default" NOT NULL,
  fecha_modificacion timestamp with time zone [],
  CONSTRAINT catalogo_cabecera_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

ALTER TABLE
  IF EXISTS public.catalogo_cabecera OWNER to automatizacion_sorteo_user;