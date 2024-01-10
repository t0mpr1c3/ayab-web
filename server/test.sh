#!/bin/bash

# janky test script

# test login
curl -i -X POST -H 'Content-Type: application/json' -d '{"username": "admin"}' http://localhost:3000/auth/login # 400
curl -i -X POST -H 'Content-Type: application/json' -d '{"password": "admin"}' http://localhost:3000/auth/login # 400
curl -i -X POST -H 'Content-Type: application/json' -d '{"username": "admin", "password": "wrongpassword"}' http://localhost:3000/auth/login # 401
curl -i -X POST -H 'Content-Type: application/json' -d '{"username": "admin", "password": "admin"}' http://localhost:3000/auth/login # 200, returns JWT
