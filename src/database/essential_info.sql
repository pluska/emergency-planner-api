-- Table: public.essential_info

-- DROP TABLE IF EXISTS public.essential_info;

CREATE TABLE IF NOT EXISTS public.essential_info
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    age_range character varying(10) COLLATE pg_catalog."default" NOT NULL,
    dependents_count integer NOT NULL,
    living_situation character varying(20) COLLATE pg_catalog."default" NOT NULL,
    natural_disaster_risk character varying(10) COLLATE pg_catalog."default" NOT NULL,
    economic_stability character varying(10) COLLATE pg_catalog."default" NOT NULL,
    essential_services character varying(10) COLLATE pg_catalog."default" NOT NULL,
    employment_status character varying(20) COLLATE pg_catalog."default" NOT NULL,
    income_stability character varying(20) COLLATE pg_catalog."default" NOT NULL,
    savings_level character varying(10) COLLATE pg_catalog."default" NOT NULL,
    primary_concern character varying(20) COLLATE pg_catalog."default" NOT NULL,
    immediate_need character varying(10) COLLATE pg_catalog."default" NOT NULL,
    storage_space character varying(10) COLLATE pg_catalog."default" NOT NULL,
    primary_recommendation character varying(20) COLLATE pg_catalog."default" NOT NULL,
    secondary_recommendation character varying(20) COLLATE pg_catalog."default",
    recommendation_reasoning text COLLATE pg_catalog."default",
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT essential_info_pkey PRIMARY KEY (id),
    CONSTRAINT essential_info_user_id_key UNIQUE (user_id),
    CONSTRAINT essential_info_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT essential_info_age_range_check CHECK (age_range::text = ANY (ARRAY['18-25'::character varying, '26-35'::character varying, '36-50'::character varying, '51-65'::character varying, '65+'::character varying]::text[])),
    CONSTRAINT essential_info_dependents_count_check CHECK (dependents_count >= 0 AND dependents_count <= 15),
    CONSTRAINT essential_info_economic_stability_check CHECK (economic_stability::text = ANY (ARRAY['stable'::character varying, 'moderate'::character varying, 'unstable'::character varying]::text[])),
    CONSTRAINT essential_info_employment_status_check CHECK (employment_status::text = ANY (ARRAY['full-time'::character varying, 'part-time'::character varying, 'self-employed'::character varying, 'unemployed'::character varying, 'retired'::character varying]::text[])),
    CONSTRAINT essential_info_essential_services_check CHECK (essential_services::text = ANY (ARRAY['excellent'::character varying, 'good'::character varying, 'limited'::character varying]::text[])),
    CONSTRAINT essential_info_immediate_need_check CHECK (immediate_need::text = ANY (ARRAY['high'::character varying, 'medium'::character varying, 'low'::character varying]::text[])),
    CONSTRAINT essential_info_income_stability_check CHECK (income_stability::text = ANY (ARRAY['very-stable'::character varying, 'stable'::character varying, 'variable'::character varying, 'unstable'::character varying]::text[])),
    CONSTRAINT essential_info_living_situation_check CHECK (living_situation::text = ANY (ARRAY['own-house'::character varying, 'rent-house'::character varying, 'apartment'::character varying, 'shared'::character varying, 'other'::character varying]::text[])),
    CONSTRAINT essential_info_natural_disaster_risk_check CHECK (natural_disaster_risk::text = ANY (ARRAY['high'::character varying, 'medium'::character varying, 'low'::character varying]::text[])),
    CONSTRAINT essential_info_primary_concern_check CHECK (primary_concern::text = ANY (ARRAY['natural-disasters'::character varying, 'economic-crisis'::character varying, 'health-emergencies'::character varying, 'job-loss'::character varying, 'general-preparedness'::character varying]::text[])),
    CONSTRAINT essential_info_primary_recommendation_check CHECK (primary_recommendation::text = ANY (ARRAY['emergency-bagpack'::character varying, 'storage'::character varying, 'emergency-fund'::character varying]::text[])),
    CONSTRAINT essential_info_savings_level_check CHECK (savings_level::text = ANY (ARRAY['none'::character varying, 'low'::character varying, 'medium'::character varying, 'high'::character varying]::text[])),
    CONSTRAINT essential_info_secondary_recommendation_check CHECK (secondary_recommendation::text = ANY (ARRAY['emergency-bagpack'::character varying, 'storage'::character varying, 'emergency-fund'::character varying]::text[])),
    CONSTRAINT essential_info_storage_space_check CHECK (storage_space::text = ANY (ARRAY['large'::character varying, 'medium'::character varying, 'limited'::character varying, 'none'::character varying]::text[]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.essential_info
    OWNER to postgres;
-- Index: idx_essential_info_immediate_need

-- DROP INDEX IF EXISTS public.idx_essential_info_immediate_need;

CREATE INDEX IF NOT EXISTS idx_essential_info_immediate_need
    ON public.essential_info USING btree
    (immediate_need COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_essential_info_primary_recommendation

-- DROP INDEX IF EXISTS public.idx_essential_info_primary_recommendation;

CREATE INDEX IF NOT EXISTS idx_essential_info_primary_recommendation
    ON public.essential_info USING btree
    (primary_recommendation COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_essential_info_user_id

-- DROP INDEX IF EXISTS public.idx_essential_info_user_id;

CREATE INDEX IF NOT EXISTS idx_essential_info_user_id
    ON public.essential_info USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- Trigger: update_essential_info_updated_at

-- DROP TRIGGER IF EXISTS update_essential_info_updated_at ON public.essential_info;

CREATE TRIGGER update_essential_info_updated_at
    BEFORE UPDATE 
    ON public.essential_info
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();