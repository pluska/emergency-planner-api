-- Table: public.profiles

-- DROP TABLE IF EXISTS public.profiles;

CREATE TABLE IF NOT EXISTS public.profiles
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    first_name character varying(100) COLLATE pg_catalog."default",
    last_name character varying(100) COLLATE pg_catalog."default",
    phone_number character varying(20) COLLATE pg_catalog."default",
    address text COLLATE pg_catalog."default",
    country character varying(100) COLLATE pg_catalog."default",
    emergency_contact_name character varying(255) COLLATE pg_catalog."default",
    emergency_contact_phone character varying(20) COLLATE pg_catalog."default",
    medical_conditions text COLLATE pg_catalog."default",
    allergies text COLLATE pg_catalog."default",
    blood_type character varying(5) COLLATE pg_catalog."default",
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT profiles_pkey PRIMARY KEY (id),
    CONSTRAINT profiles_user_id_key UNIQUE (user_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.profiles
    OWNER to postgres;
-- Index: idx_profiles_country

-- DROP INDEX IF EXISTS public.idx_profiles_country;

CREATE INDEX IF NOT EXISTS idx_profiles_country
    ON public.profiles USING btree
    (country COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_profiles_user_id

-- DROP INDEX IF EXISTS public.idx_profiles_user_id;

CREATE INDEX IF NOT EXISTS idx_profiles_user_id
    ON public.profiles USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- Trigger: update_profiles_updated_at

-- DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE 
    ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();