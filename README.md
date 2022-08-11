# Backend

## Summary
A backend server for a full-stack MERN app, GrubTruck, an app that allows you to browse nearby food trucks along with locations, their menu, and reviews for those wanting to find places to eat near them.

## Examples of Use
This server provides endpoints for user to execute CRUD functions. A user with proper authentication can execute requests and receive data as responses.

## List of Features
This backend server contains foodtruck, user and review data along with a verification system for users to login with

- MVP: CRUD for 3 models: FoodTruck, Review, User
- Stretch Goals: User authentication and authorization to allow different roles to manipulate data based on ownership

## List of Technologies Used
This backend was built using Node.js, Express.js, MongoDb and Mongoose. It uses many NPM packages such as:
- mongoose
- dotenv
- cors
- helmet
- jsonwebtoken
- morgan
- passport
- passport-jwt
- bcrypt

## Getting started 
This backend is hosted via Heroku. [Link](https://young-anchorage-22001.herokuapp.com/)  
Calls can be made via browser or Postman.

## Contribution Guidelines
To contribute to this database please leave request on any issues or additions that you think could further improve the server

## Developers
[Kenny U](https://github.com/ukakit)
[Luxe Hahn](https://github.com/luuxe)
[Taylor Sturgill](https://github.com/Ylvauk)
[Kenan Kong](https://github.com/feinin)

## Diagram
![Req-Res Diagram](/Req-Res.jpg)