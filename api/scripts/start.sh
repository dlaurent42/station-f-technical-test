#!/bin/sh

# This scripts checks if database is created with a user profile, creates it if not and run server

# Assess environment
NODE_ENV=development
if [[ $1 == "NODE_ENV"* ]]
then
  NODE_ENV=$(printf $1 | cut -d'=' -f2)
fi

# Get database information
DATABASE_HOST=$(cat config/.env.$NODE_ENV | grep "DATABASE_HOST" | cut -d'=' -f2)
DATABASE_PORT=$(cat config/.env.$NODE_ENV | grep "DATABASE_PORT" | cut -d'=' -f2)
DATABASE_NAME=$(cat config/.env.$NODE_ENV | grep "DATABASE_NAME" | cut -d'=' -f2)
DATABASE_USER=$(cat config/.env.$NODE_ENV | grep "DATABASE_USER" | cut -d'=' -f2)
DATABASE_PASS=$(cat config/.env.$NODE_ENV | grep "DATABASE_PASS" | cut -d'=' -f2)

echo "DATABASE_HOST: $DATABASE_HOST"
echo "DATABASE_PORT: $DATABASE_PORT"
echo "DATABASE_NAME: $DATABASE_NAME"
echo "DATABASE_USER: $DATABASE_USER"
echo "DATABASE_PASS: $DATABASE_PASS"

# Check if database has been initialized
[ ! -d "database" ] && initialized="false" || initialized="true"

# Create database directory
mkdir -p database

# Run database as background job
mongod --dbpath database --bind_ip "$DATABASE_HOST" --port "$DATABASE_PORT" &

# Store process id
process_id=$!

sleep 3

# Check if database has already been initialized
if [[ "$initialized" == "false" ]]
then

  # Switch database and create user
  mongo "$DATABASE_NAME" --eval "db.createUser({ user: \"$DATABASE_USER\", pwd: \"$DATABASE_PASS\", roles: [\"readWrite\"] })"

  # Feed database using javascript
  NODE_ENV="$NODE_ENV" node -r esm scripts/feed.js

fi

# Run server
if [ "$NODE_ENV" == "production" ]
then
  NODE_ENV="$NODE_ENV" node -r esm src/index.js
else
  NODE_ENV="$NODE_ENV" nodemon -r esm src/index.js
fi

# Stop databasse (brutal but efficient)
kill -9 "$process_id"
