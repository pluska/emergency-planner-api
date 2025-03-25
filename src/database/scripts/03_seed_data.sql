-- Insert test user (password is 'test123')
INSERT INTO users (email, password)
VALUES (
    'test@example.com',
    '$2a$10$YourHashedPasswordHere'  -- This should be replaced with an actual bcrypt hash
)
ON CONFLICT (email) DO NOTHING;

-- Insert test profile
INSERT INTO profiles (
    user_id,
    phone_number,
    address,
    country,
    emergency_contact_name,
    emergency_contact_phone,
    medical_conditions,
    allergies,
    blood_type
)
SELECT 
    id,
    '+1 (555) 123-4567',
    '123 Main St, New York, NY 10001',
    'United States',
    'John Doe',
    '+1 (555) 987-6543',
    'Asthma',
    'Penicillin',
    'O+'
FROM users
WHERE email = 'test@example.com'
ON CONFLICT (user_id) DO NOTHING;

-- Insert test essential information
INSERT INTO essential_info (
    user_id,
    age_range,
    dependents_count,
    living_situation,
    natural_disaster_risk,
    economic_stability,
    essential_services,
    employment_status,
    income_stability,
    savings_level,
    primary_concern,
    immediate_need,
    storage_space,
    primary_recommendation,
    secondary_recommendation,
    recommendation_reasoning
)
SELECT 
    id,
    '26-35',
    2,
    'own-house',
    'medium',
    'stable',
    'excellent',
    'full-time',
    'very-stable',
    'high',
    'natural-disasters',
    'medium',
    'large',
    'storage',
    'emergency-bagpack',
    'Given your available space and stable living situation, a comprehensive Storage plan would provide the best long-term security.'
FROM users
WHERE email = 'test@example.com'
ON CONFLICT (user_id) DO NOTHING;

-- Insert test emergency plan
INSERT INTO emergency_plans (user_id, location, type, size, specific_needs, plan_content)
SELECT 
    id,
    'New York City',
    'fire',
    'medium',
    'Elderly care facilities in the area',
    'Sample emergency plan content...'
FROM users
WHERE email = 'test@example.com'
ON CONFLICT DO NOTHING; 