# Restaurant List (CRUD)
A website built with [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/) for you to  keep all your favorite restaurants with restaurant's name, address, phone, image, category, rating, and so on.

Please register an account via email address first, or you may quick login with Facebook & Google, cause all the restaurant list would be only keep in your own account.

## Features
*  REGISTER: sign up an account by inputting name, email, password
*  LOGIN: sign in to review your own restaurant list
*  LOGIN with 3rd-party account: quick login with Facebook or Google account
*  LOGOUT: logout the account by clicking the logout button
*  CREATE: write down the restaurant info at the create page 
*  READ: review your full restaurant list at the home page
*  READ: get the restaurant's detail info by clicking the detail button
*  UPDATE: you may update the info whenever you want by clicking the edit button
*  DELETE: you can remove the restaurant from your list by clicking the delete button
*  SEARCH: there's a search bar at the home page for you to search the specific restaurants by keyword or location
*  SORT: sort the restaurant list in ascending or descending order by name
*  FILTER: filter the restaurant list by category or rating

## Screenshots
*  REGISTER & LOGIN PAGE
![HOME PAGE](https://github.com/wentingliuu/restaurant-list-login/blob/main/public/img/registerandlogin.png)
*  HOME PAGE
![SHORTEN PAGE](https://github.com/wentingliuu/restaurant-list-login/blob/main/public/img/home.png)

## Installation and Execution
1.  Clone the files to your computer
```
git clone https://github.com/wentingliuu/restaurant-list-login.git
```
2. Init: install the npm packages
```
cd restaurant-list-login
```
```
npm install
```
3. Create .env file and store API Key in the file
```
touch .env
```
- Please see [.env.example](https://www.npmjs.com/package/bcryptjs) for reference.
- Please get your own Facebook & Google API key from [Facebook](https://developers.facebook.com/) & [Google](https://console.cloud.google.com/apis/dashboard/)
4. Run MongoDB Server
```
cd ~/mongodb/bin/
```
```
./mongod --dbpath <path to mongodb-data directory>
```
- While the terminal shows `waiting for connections on port 27017`, MongoDB has started successfully.
5. Insert seeder
```
npm run seed
```
6. Run the project
```
npm run dev
```
- While the terminal returns `Express is listening on localhost:3000`, please visit http://localhost:3000 on your browser.

## Prerequisites
*  [Visual Studio Code](https://code.visualstudio.com/) - development environment
*  [Node.js](https://nodejs.org/en/) & [npm](https://www.npmjs.com/) - JavaScript runtime environment
*  [Express.js](https://expressjs.com/) - web application framework
*  [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - template engine
*  [MongoDB](https://www.mongodb.com/) - document-oriented database
*  [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool(OBM)
*  [body-parser](https://www.npmjs.com/package/body-parser) - middleware
*  [method-override](https://www.npmjs.com/package/method-override) - middleware
*  [express-session](https://www.npmjs.com/package/express-session) - middleware
*  [passport](http://www.passportjs.org/) - authentication middleware for Node.js
*  [bcrypt.js](https://www.npmjs.com/package/bcryptjs) - middleware
*  [Facebook for Developer](https://developers.facebook.com/) - get APP_ID & APP_SECRET for passport-facebook
*  [Google Developers Console](https://console.cloud.google.com/apis/dashboard/) - get CLIENT_ID & CLIENT_SECRET for passport-google