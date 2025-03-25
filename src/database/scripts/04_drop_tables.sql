-- Drop tables in reverse order of creation
DROP TABLE IF EXISTS emergency_plans;
DROP TABLE IF EXISTS essential_info;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS users;

-- Drop function
DROP FUNCTION IF EXISTS update_updated_at_column(); 