# Esport Lounge
```
Welcome to Esports Lounge, a place to add a little fun to your esports viewing parties!
Bet on games, win e-coins, and show your superior knowledge of the scene.
```
TODO: SHOW PICTURES OF FINISHED PRODUCT

## Relevant Links

- Deployed App: https://esport-lounge.herokuapp.com/
- Github Repo: https://github.com/jtak93/project_4
- Trello Board: https://trello.com/b/WxwSDxID/wdi-final-project


## Technologies
I used the MEAN stack:
```
MongoDb and Mongoose for the database and ORM
Express Framework for Node.js
Angular for the front end framework
Angular ui-router for client-side routing
JWT and mongoose-bcrypt for authentication and authorization

```

## Project Approach
The first few days were spent on general model designs and wireframing (look to the
trello board). Initially, I created the app as two separate client and server side apps,
however, this led to a problem with herokus deployment. First, I handled user sign up and login
using JSON web tokens. This was the only smooth part of development. I began to add features to my trello board and todo list and began tackling the list one by one. I developed by feature, going back and forth between the front and back end.

Some time into development, I ran into many complications and problems with my data model structures and began to restructure. I then began to work on the display of information from the
server side to the client side. This was mainly done using AJAX calls on a server API. From there, I began to query different results to implement filtering features and also worked on styling the
pages. I still need to work on some of the business logic/payout system and also need to incorporate real time data from a third party API.

## Installation
Use 
```
npm install
```
to install all node modules necessary for local installation

## API routes
| Method        |          URL        |    What it does    |
| ------------- |:-------------------:|:------------------:|
|     POST      |      /login         |    login           |
|     POST      |      /signup        |    signup          |
|     POST      |    /bets/create     |    create bet      |
|     GET       |    /api/matches     |  get all matches   |
|     POST      |  /api/matches/user  |  get user matches  |

## Credits
All the genius open source BAES that made the technology I'm using

## PROBLEMS/TODO
ALOT:
<br/>
- alot of directory restructuring wasted a lot of time and caused a lot of headaches
- no logic for pay outs: use pre and post to handle
- No consumption of 3rd party api for real data
- no filter data based on links and search

