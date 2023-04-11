#!/bin/bash
echo "Run/verifying migrations..."
omit=$(npm run build)
output_run=$(npm run migration:run)
if [[ "$output_run" == *"No migrations are pending"* ]]; then
    echo "No migrations are pending - Verifying if the database is up to date..."
fi
output_generate=$(npm run migration:generate src/shared/migrations/migration)
if [[ "$output_generate" == *"No changes in database schema were found"* ]]; then
    echo "No changes in database schema were found - No need generate a migration. Skipping..."
else
    echo "Generate and Running migrations..."
    omit=$(npm run build)
    npm run migration:run
fi
echo "Starting server..."
npm run start:dev