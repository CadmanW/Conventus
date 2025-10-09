# Conventus
Self hosted open source media conferencing/meeting web app

# Set Up / Getting Started


# IF WANTING TO FORK THIS PROJECT PLEASE READ THE FOLLOWING DEV NOTES
This section is about how you can develop this project further, and some basics to know before you start developing. I also documented anything that isn't just the JavaScript in the files, such as commands I ran for setup/installation.

## NodeJS

Installing nodeJS
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
nvm install 22
```
This downloads NVM (Node Package Manager)
NPM (Node Package Manager) helps manage dependencies and install modules.

To set up this node project, first I ran ```npm init``` to create the **package.json** file

Then to install modules I ran ```npm install <module>``` to create the **package-lock.json** file. This file keeps tracks of modules, dependencies, and their versions

## MariaDB
First I installed MariaDB, secured the installation, started it, and logged into the MariaDB CLI as root
```bash
# Install and start
sudo apt update
sudo apt install mariadb-server mariadb-client
sudo mariadb-secure-installation
systemctl start mariadb

# Login to MariaDB
mariadb -u root -p
```

Then created the databse "conventus" and entered it
```sql
CREATE DATABASE conventus;
USE conventus
```
Once in the conventus DB, create the tables.
### Create table
```sql
CREATE TABLE users(
    user_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(40) NOT NULL,
    date_created TIMESTAMP NOT NULL
);
DESCRIBE users;
```
```DESCRIBE``` just displays column info of the table