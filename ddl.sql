-- public.client definition

-- Drop table

-- DROP TABLE public.client;

CREATE TABLE public.client
(
  id          bigserial    NOT NULL,
  "name"      varchar(100) NOT NULL,
  address     varchar(200) NOT NULL,
  phone       varchar(9)   NOT NULL,
  createddate timestamptz  NOT NULL DEFAULT now(),
  CONSTRAINT client_pk PRIMARY KEY (id)
);
CREATE INDEX client_id_idx ON public.client USING btree (id);


-- public.hotel definition

-- Drop table

-- DROP TABLE public.hotel;

CREATE TABLE public.hotel
(
  id          bigserial    NOT NULL,
  "name"      varchar(100) NOT NULL,
  address     varchar(200) NOT NULL,
  createddate timestamptz  NOT NULL DEFAULT now(),
  CONSTRAINT hotel_pk PRIMARY KEY (id)
);
CREATE INDEX hotel_id_idx ON public.hotel USING btree (id);


-- public.hotelbooking definition

-- Drop table

-- DROP TABLE public.hotelbooking;

CREATE TABLE public.hotelbooking
(
  id          bigserial    NOT NULL,
  hotelid     int8         NOT NULL,
  "name"      varchar(100) NOT NULL,
  address     varchar(200) NOT NULL,
  createddate timestamptz  NOT NULL DEFAULT now(),
  clientid    int8         NOT NULL,
  CONSTRAINT hotelbooking_pk PRIMARY KEY (id),
  CONSTRAINT hotelbooking_fk FOREIGN KEY (clientid) REFERENCES client (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT hotelbooking_fk_1 FOREIGN KEY (hotelid) REFERENCES hotel (id) ON UPDATE CASCADE ON DELETE RESTRICT
);
CREATE INDEX hotelbooking_clientid_idx ON public.hotelbooking USING btree (clientid);
CREATE INDEX hotelbooking_hotelid_idx ON public.hotelbooking USING btree (hotelid);
CREATE INDEX hotelbooking_id_idx ON public.hotelbooking USING btree (id);

