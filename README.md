# OPTIPLEX
This repository contains the server contents alongside server manager for various projects

## nginx
Development ports are setup so that PROJECT_NAME.optiplex.com redirect to the development port <br>
production ports are setup so that PROJECT_NAME.oli.casa redirect to the production port (once the Domain is setup for this)

## Port Allocation
Development ports are run from ::3000-::4999 <br>
Production ports are run from ::5000-::6999

The port of a project can be calculated by adding the project number to the base port <br>
e.g. portal (0) - Dev Port = 3000 + 0 = 3000

## .env file schema
See .env.example

# Projects
## 0 - portal
A portal which can manage oli.casa optiplex project remotely.
  Potentially in future it will serve other personal content.

## 1 - auth
The oli.casa authentication service. <br>
This will support all projects run from the optiplex server, ensuring safe connection and access.

## 2 - system
The System is a communal food-sharing application for house/flat shares.
