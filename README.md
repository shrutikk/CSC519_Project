# CSC519_Project

## Screencast

[Link to Screencast for Checkbox.io](https://youtu.be/OCA_n2SMaW8)

## Report
  
  1. **Checkbox.io: (Experiences and Issues)** 
    * Setting up checkbox.io required several configuration settings for mongo and nginx to set up outisde of the basic installation of these softwares.
    * Nginx configuration file nginx.conf and default had to be overwritten by the ones provided with the checkbox.io code and a server restart was required to bring that to effect. 
    * The mongod service had to be explicitly started through the ansible script as not doing that always produced a connection error when using the software.
    * The connection string for mongo had to be modified to successfully connect to mongo.
    * Forever was required to start the nodejs application through Ansible script as using a normal "node /../server.js" command prevents the ansible script from returning.
