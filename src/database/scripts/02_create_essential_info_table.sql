-- Create essential_info table
CREATE TABLE IF NOT EXISTS essential_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    -- Personal Information
    age_range VARCHAR(10) NOT NULL CHECK (age_range IN ('18-25', '26-35', '36-50', '51-65', '65+')),
    dependents_count INTEGER NOT NULL CHECK (dependents_count >= 0 AND dependents_count <= 15),
    living_situation VARCHAR(20) NOT NULL CHECK (living_situation IN ('own-house', 'rent-house', 'apartment', 'shared', 'other')),
    
    -- Location Risk Assessment
    natural_disaster_risk VARCHAR(10) NOT NULL CHECK (natural_disaster_risk IN ('high', 'medium', 'low')),
    economic_stability VARCHAR(10) NOT NULL CHECK (economic_stability IN ('stable', 'moderate', 'unstable')),
    essential_services VARCHAR(10) NOT NULL CHECK (essential_services IN ('excellent', 'good', 'limited')),
    
    -- Financial Situation
    employment_status VARCHAR(20) NOT NULL CHECK (employment_status IN ('full-time', 'part-time', 'self-employed', 'unemployed', 'retired')),
    income_stability VARCHAR(20) NOT NULL CHECK (income_stability IN ('very-stable', 'stable', 'variable', 'unstable')),
    savings_level VARCHAR(10) NOT NULL CHECK (savings_level IN ('none', 'low', 'medium', 'high')),
    
    -- Priority Assessment
    primary_concern VARCHAR(20) NOT NULL CHECK (primary_concern IN ('natural-disasters', 'economic-crisis', 'health-emergencies', 'job-loss', 'general-preparedness')),
    immediate_need VARCHAR(10) NOT NULL CHECK (immediate_need IN ('high', 'medium', 'low')),
    storage_space VARCHAR(10) NOT NULL CHECK (storage_space IN ('large', 'medium', 'limited', 'none')),
    
    -- Recommendations (computed fields)
    primary_recommendation VARCHAR(20) NOT NULL CHECK (primary_recommendation IN ('emergency-bagpack', 'storage', 'emergency-fund')),
    secondary_recommendation VARCHAR(20) CHECK (secondary_recommendation IN ('emergency-bagpack', 'storage', 'emergency-fund')),
    recommendation_reasoning TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_essential_info_user_id ON essential_info(user_id);
CREATE INDEX IF NOT EXISTS idx_essential_info_primary_recommendation ON essential_info(primary_recommendation);
CREATE INDEX IF NOT EXISTS idx_essential_info_immediate_need ON essential_info(immediate_need);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_essential_info_updated_at
    BEFORE UPDATE ON essential_info
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 