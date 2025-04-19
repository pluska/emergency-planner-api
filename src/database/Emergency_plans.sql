-- Table: public.emergency_plans

-- DROP TABLE IF EXISTS public.emergency_plans;

CREATE TABLE IF NOT EXISTS public.emergency_plans
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    location character varying(255) COLLATE pg_catalog."default" NOT NULL,
    type character varying(50) COLLATE pg_catalog."default" NOT NULL,
    size character varying(20) COLLATE pg_catalog."default" NOT NULL,
    specific_needs text COLLATE pg_catalog."default",
    plan_content text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT emergency_plans_pkey PRIMARY KEY (id),
    CONSTRAINT emergency_plans_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT emergency_plans_size_check CHECK (size::text = ANY (ARRAY['small'::character varying, 'medium'::character varying, 'large'::character varying, 'catastrophic'::character varying]::text[])),
    CONSTRAINT emergency_plans_type_check CHECK (type::text = ANY (ARRAY['fire'::character varying, 'flood'::character varying, 'earthquake'::character varying, 'hurricane'::character varying, 'tornado'::character varying, 'pandemic'::character varying, 'other'::character varying]::text[]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.emergency_plans
    OWNER to postgres;
-- Index: idx_emergency_plans_location

-- DROP INDEX IF EXISTS public.idx_emergency_plans_location;

CREATE INDEX IF NOT EXISTS idx_emergency_plans_location
    ON public.emergency_plans USING btree
    (location COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_emergency_plans_type

-- DROP INDEX IF EXISTS public.idx_emergency_plans_type;

CREATE INDEX IF NOT EXISTS idx_emergency_plans_type
    ON public.emergency_plans USING btree
    (type COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_emergency_plans_user_id

-- DROP INDEX IF EXISTS public.idx_emergency_plans_user_id;

CREATE INDEX IF NOT EXISTS idx_emergency_plans_user_id
    ON public.emergency_plans USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- Trigger: update_emergency_plans_updated_at

-- DROP TRIGGER IF EXISTS update_emergency_plans_updated_at ON public.emergency_plans;

CREATE TRIGGER update_emergency_plans_updated_at
    BEFORE UPDATE 
    ON public.emergency_plans
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();