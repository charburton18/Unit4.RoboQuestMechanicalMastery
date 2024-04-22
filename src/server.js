const express = require('express');
const app = express();
const {getAllRobots, getRobotById} = require('./db/robots');

const client = require('./db/client');
client.connect();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes

//GET
//GET /api/v1/robots - get all robots
app.get('/api/v1/robots', async (req, res) => {
  try {
    const robots = await getAllRobots();
    res.send(robots);
  } catch (err) {
    console.log(err);
  }
});

//GET /api/v1/robots/:id - get the robot specified by id
app.get('/api/v1/robots/:id', async (req, res) => {
  try {
    const robot = await getRobotById(req.params.id);
    res.send(robot);
  } catch (err) {
    console.log(err);
  }
});

//POST
//POST /api/v1/robots - create a new robot as the currently logged-in user

//PUT
//PUT /api/v1/robots/:id - update a robot only if it was created by the currently logged-in user

//DELETE
//DELETE /api/v1/robots/:id - delete a robot only if it was create by the currently logged-in user

//listening to port 
app.listen(8080, () => console.log('Listening on port 8080'));