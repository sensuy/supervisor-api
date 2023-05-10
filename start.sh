#!/bin/bash
echo "Run/verifying migrations..."
omit=$(npm run build)
output_run=$(npm run migration:run)
sleep 5
if [[ "$output_run" == *"No migrations are pending"* ]]; then
    echo "No migrations are pending - Verifying if the database is up to date..."
    sleep 5
fi
output_generate=$(npm run migration:generate src/shared/migrations/migration)
if [[ "$output_generate" == *"No changes in database schema were found"* ]]; then
    echo "No changes in database schema were found - No need generate a migration. Skipping..."
    sleep 5
else
    echo "Generate and Running migrations..."
    omit=$(npm run build)
    npm run migration:run
    sleep 5
fi
echo "Starting server..."
sleep 5
npm run start:dev