# SimpleLogint

<h5>Tools:</h5>
<b>Language: </b> Javascript (nodejs)
<b>Database: </b> MongoDB
<b>Other Libraries: </b> JOI, express, brypt,lodash,mongoose
<br>
<h5>Data:</h5>
data.json contains the datas.

<h5>Files:</h5>
1. models/user.js : contains the user schema for the users collection of the DB
<br>
2. route/auth.js : authenticate the user
<br>
3. route/users.js : to add new user
<br>
4. login.html : the initail page, success.html: routes to this page if login successful, error.html: routes to this page if login is unsuccessful
<br>
5. User needs to provide proper emailid. (Joi.validate validates the email)
