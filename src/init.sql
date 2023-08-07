CREATE TABLE usuario (
	email varchar(100),
	hashed_pwd varchar(100),
	tipo int,
	tipo_desc varchar(20),
	creado_por varchar(100),
	fecha_creacion date,
	fecha_modificacion date,
	estado varchar(1)
);