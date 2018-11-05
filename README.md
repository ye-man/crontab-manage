# crontab-manage
Manage crontab from centralized master server.   Deploy cronjobs to crontab using ansible to any server and get logs real time to the master dashboard  
You can add/edit/update/delete servers, crons and even deployed crons  
Your footprint will be revoked if you will remove the server


# Setup
$ `npm install`  
$ `npm install -g pm2`  
$ `apt install ansible`

# Generate SSH-KEY
Generate ssh-key which will be placed to servers for accessing
  
$ `ssh-keygen`

By default it will create id_rsa.pub inside ~/.ssh/ folder

# Config
Change your domain name inside **scripts** folder
cron_watcher.php
replace **mydomain.com** to your domain name where your app will be hosted

**All the global constants are placed in app.js file, change them as you desired**

# Run Server
pm2 start app.js
