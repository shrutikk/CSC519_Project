# CSC519_Project

## Screencast

[Link to Screencast for Checkbox.io](https://youtu.be/OCA_n2SMaW8)

[Link to Screencast for iTrust](https://www.youtube.com/watch?v=q5V9WWbfegw&feature=youtu.be)

## Report
  
  1. **Checkbox.io: (Experiences and Issues)** 
    * Setting up checkbox.io required several configuration settings for mongo and nginx to set up outisde of the basic installation of these softwares.
    * Nginx configuration file nginx.conf and default had to be overwritten by the ones provided with the checkbox.io code and a server restart was required to bring that to effect. 
    * The mongod service had to be explicitly started through the ansible script as not doing that always produced a connection error when using the software.
    * The connection string for mongo had to be modified to successfully connect to mongo.
    * Forever was required to start the nodejs application through Ansible script as using a normal "node /../server.js" command prevents the ansible script from returning.  
    
  2. **iTrust:**
    * Setting up iTrust required several dependencies to be installed with it requiring Java 1.8, Tomcat9, mysql, git and
      maven
    * Manual building caused several issues, first being that database table names were not being read correctly for which
      we had to change the mysql config file and enable that table names be converted and compared in a case-insensitive way. For this the line lower_case_table_names	= 1.
    * After the tests passed while building that the default memory allocated for the VM's by vagrant was not enough and
      was causing the build to crash. We tackled this by reloading the VM with 1024 MB memory.
    * Enabled hosting on tomcat by copying the generated war file into the webapps folder of tomcat and restarting the
      server
    * Building the ansible script to install java 8 had a few challenges as we need to enable answer to license agreement
    

      

