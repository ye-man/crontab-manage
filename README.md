# crontab-manage

# Setup
$ `npm install`  
$ `npm install -g pm2`  
$ `apt install ansible`

# Generate SSH-KEY
Generate ssh-key which will be placed to servers for accessing
  
$ `ssh-keygen`

By default it will create id_rsa.pub inside ~/.ssh/ folder

#Config
Change your domain name inside **scripts** folder
cron_watcher.php
replace `**mydomain.com**` to your domain name where your app will be hosted

**All the global constants are placed in app.js file**

# Run Server
pm2 start app.js
