# OPTIPLEX
This repository contains the server contents alongside server manager for various projects

## nginx
Development ports are setup so that PROJECT_NAME.optiplex.com redirect to the development port <br>
production ports are setup so that PROJECT_NAME.oli.casa redirect to the production port (once the Domain is setup for this)

## Port Allocation
Development ports are run from ::3000-::4999 <br>
Production ports are run from ::5000-::6999

The port of a project can be calculated by adding the project number to the base port <br>
e.g. hello-world (0) - Dev Port = 3000 + 0 = 3000

## .env file schema
TOKEN_KEY= your key here
HELLOWORLD_URL= url of hello-world program (e.g. https://hello-world.oli.casa/)
AUTH_URL= url of authentication program (e.g. https://auth.oli.casa/)
MONGODB_URL= root url of db. each program appends its own table as hard-coded string.
ROOT_URL= root url of environment (e.g. .oli.casa) this is for the cookie domain parameter
MAILGUN_API_KEY= Mailgun API key. You will need to set up your own Mailgun account to copy this. Up to 100 emails/day free as of 22/06/2024, so not bad for scope of project.


# Projects
## 0 - hello-world
A simple test program to ensure environment works

## 1 - auth
The oli.casa authentication service. <br>
This will support all projects run from the optiplex server, ensuring safe connection and access.

