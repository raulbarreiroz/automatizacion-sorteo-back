-- Table: public.catalogo_detalle
-- DROP TABLE IF EXISTS public.catalogo_detalle;
CREATE TABLE IF NOT EXISTS public.catalogo_detalle (
  id integer NOT NULL DEFAULT nextval('catalogo_detalle_id_seq' :: regclass),
  nombre character varying(25) COLLATE pg_catalog."default" NOT NULL,
  descripcion character varying(250) COLLATE pg_catalog."default",
  fecha_creacion timestamp with time zone NOT NULL,
  creado_por character varying(100) COLLATE pg_catalog."default" NOT NULL,
  cabecera integer NOT NULL,
  estado character varying(1) COLLATE pg_catalog."default",
  fecha_modificacion timestamp with time zone [],
  modificado_por character varying(100) [] COLLATE pg_catalog."default",
  CONSTRAINT catalogo_detalle_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

ALTER TABLE
  IF EXISTS public.catalogo_detalle OWNER to automatizacion_sorteo_user;