@echo off
set PGPASSWORD=24999525
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres -d emergency_planner -f src/database/scripts/01_create_users_table.sql
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres -d emergency_planner -f src/database/scripts/02_create_profiles_table.sql
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres -d emergency_planner -f src/database/scripts/02_create_essential_info_table.sql
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres -d emergency_planner -f src/database/scripts/02_create_emergency_plans_table.sql
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres -d emergency_planner -f src/database/scripts/03_seed_data.sql 