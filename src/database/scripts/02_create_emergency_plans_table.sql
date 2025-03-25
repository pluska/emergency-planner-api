-- Create emergency_plans table
CREATE TABLE IF NOT EXISTS emergency_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    location VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('fire', 'flood', 'earthquake', 'hurricane', 'tornado', 'pandemic', 'other')),
    size VARCHAR(20) NOT NULL CHECK (size IN ('small', 'medium', 'large', 'catastrophic')),
    specific_needs TEXT,
    plan_content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_emergency_plans_user_id ON emergency_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_emergency_plans_type ON emergency_plans(type);
CREATE INDEX IF NOT EXISTS idx_emergency_plans_location ON emergency_plans(location);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_emergency_plans_updated_at
    BEFORE UPDATE ON emergency_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 