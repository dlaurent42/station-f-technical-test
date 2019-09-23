#!/bin/sh

# This scripts checks if database is created with a user profile, creates it not and run server

# Check if .env file exists
if [[ ! -f ".env" ]]
then
  echo "ERROR: .env file not found."
  exit 1
fi

# Get database information
DATABASE_HOST=$(cat .env | grep "DATABASE_HOST" | cut -d'=' -f2)
DATABASE_PORT=$(cat .env | grep "DATABASE_PORT" | cut -d'=' -f2)
DATABASE_NAME=$(cat .env | grep "DATABASE_NAME" | cut -d'=' -f2)
DATABASE_USER=$(cat .env | grep "DATABASE_USER" | cut -d'=' -f2)
DATABASE_PASS=$(cat .env | grep "DATABASE_PASS" | cut -d'=' -f2)
DATABASE_INIT=$(cat .env | grep "DATABASE_INIT" | cut -d'=' -f2)

# Create database directory
mkdir -p database

# Run database as background job
mongod --dbpath database --bind_ip "$DATABASE_HOST" --port "$DATABASE_PORT" &

# Store process id
process_id=$!

# Check if database has already been initialized
if [ "$DATABASE_INIT" = "false" ]
then

  # Switch database and create user
  mongo "$DATABASE_NAME" --eval "db.createUser({ user: \"$DATABASE_USER\", pwd: \"$DATABASE_PASS\", roles: [\"readWrite\"] })"

  # Edit config file
  sed 's/DATABASE_INIT=false/DATABASE_INIT=true/g' .env > .env.tmp && mv .env.tmp .env

fi

# Assess environment
NODE_ENV=development
if [[ $1 == "NODE_ENV"* ]]
then
  NODE_ENV=$(printf $1 | cut -d'=' -f2)
fi

# Run server
NODE_ENV="$NODE_ENV" nodemon -r esm src/index.js

# Stop databasse (brutal but efficient)
kill -9 "$process_id"
