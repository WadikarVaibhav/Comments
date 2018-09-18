# Hierarchical Comments Section

Hierarchical comments section is a web application used as a discussion portal in social networking sites.
The application allows users to post unlimited number of replies to a particular comment keeping the hierarchy.
Project implements a user model to keep track of comment's details such as owner, time-stamp, etc. 
User needs to signup first and log in to it in order to start commenting on posts. A comment can be deleted or edited by authorized users only.

# Technologies

1. ReactJS
2. Django
3. PostgreSQL

# Installation Steps

1. First of all, install ReactJs by running ```npm install --save``` in project directory.
2. Secondly, install Django by ```pip install django```.
3. Finally, download PostgreSQL database client - ```pgAdmin```.

# Scope

Scope of the project is to make reusable component as a node_module which can be included into existing ReactJS project.

# Editor

1. Any editor can be used but I would prefer using **Atom** or **Visual Studio Code**.

# Execution Steps

1. Run python manage.py runserver in project directory to up the server.
2. Run npm start to host your application on  ```http://localhost:8080/```
3. Navigate to ```http://localhost:8080/signUp``` to create new user profile and simply login to add new post.
4. Once the post is added, it will take you to it's details to view comments on it.
5. Finally, start adding new comment, replying it, etc.


