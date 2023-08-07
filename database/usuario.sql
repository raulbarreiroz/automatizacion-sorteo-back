-- Table: public.usuario
-- DROP TABLE IF EXISTS public.usuario;
CREATE TABLE IF NOT EXISTS public.usuario (
	id integer NOT NULL DEFAULT nextval('usuario_id_seq' :: regclass),
	email character varying(100) COLLATE pg_catalog."default" NOT NULL,
	hashed_pwd character varying(255) COLLATE pg_catalog."default" NOT NULL,
	alias character varying(25) COLLATE pg_catalog."default",
	"cabeceraId" integer NOT NULL,
	creado_por character varying(100) COLLATE pg_catalog."default" NOT NULL,
	fecha_creacion timestamp with time zone NOT NULL,
	modicado_por character varying(100) [] COLLATE pg_catalog."default",
	fecha_modificacion timestamp with time zone [],
	estado character varying(1) COLLATE pg_catalog."default" NOT NULL,
	"detalleId" integer NOT NULL,
	CONSTRAINT usuario_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

ALTER TABLE
	IF EXISTS public.usuario OWNER to automatizacion_sorteo_user;