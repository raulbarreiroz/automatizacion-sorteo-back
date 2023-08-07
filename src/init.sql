-- Table: public.usuario
DROP TABLE IF EXISTS public.usuario;

CREATE TABLE IF NOT EXISTS public.usuario (
	email character varying(100) COLLATE pg_catalog."default" NOT NULL,
	hashed_pwd character varying(100) COLLATE pg_catalog."default" NOT NULL,
	alias varchar(50) NOT NULL,
	tipo integer NOT NULL,
	tipo_desc character varying(20) COLLATE pg_catalog."default" NOT NULL,
	creado_por character varying(100) COLLATE pg_catalog."default" NOT NULL,
	fecha_creacion date NOT NULL,
	fecha_modificacion date,
	estado character varying(1) COLLATE pg_catalog."default" NOT NULL,
	CONSTRAINT usuario_pkey PRIMARY KEY (email)
) TABLESPACE pg_default;

ALTER TABLE
	IF EXISTS public.usuario OWNER to automatizacion_sorteo_user;