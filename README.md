# Antoinette Headless CMD

Antoinette is a headless CMS primarily designed for blogs.

# Supported Backends

- MySQL 5.6+
- MariaDB

# Configuration
Create a .env file at the root of the project containing:  
DB_ADDRESS="DBADDRESS"  
DB_USER="DBUSERNAME"  
DB_PASSWORD="DBPASSWORD"  
DB_DATABASE="DATABASENAME"  
TOKEN_METHOD="JWT | JWKS"  
JWKS_ENDPOINT="JWKSDOMAIN/.well-known/jwks.json"  
JWT_PUBLIC="PUBLICKEYLOCATION"

## Generating a JWT
1. First generate a private key: openssl genrsa -des3 -out private.pem 2048
2. Next generate a public key: openssl rsa -in private.pem -outform PEM -pubout -out public.pem
3. Run node ./tools/localtoken.js

# API Reference

doc here