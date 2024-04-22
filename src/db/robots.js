const client = require('./client.js');

// GET /api/v1/robots - get all robots
const getAllRobots = async () => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM robots;
    `);
    console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

// GET /api/v1/robots/:id - get the robot specified by id
const getRobotById = async (robotId) => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM robots
      WHERE id=${robotId};
    `);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

// POST /api/v1/robots - create a new robot as the currently logged-in user
const createRobot = async(name, color) => {
  try{
    const { rows: [newlyCreatedRobot] } = await client.query(`
    INSERT INTO robots (name, color)
      VALUES ('${name}', '${color}')
      RETURNING *;
    `);
    return newlyCreatedRobot;
  } catch (error) {
    console.log(error);
  }
};

// // PUT /api/v1/robots/:id - update a robot only if it was created by the currently logged-in user
// const updateRobotById = async (robotId, name, color, token) => {
//   try {
//     const { rows } = await client.query(`
//       UPDATE robot
//       SET name=${name}, color=${color}
//       WHERE id=${robotId}
//       RETURNING *;
//     `);
//     if(!token) {
//       return 'FAILED TO UPDATE ROBOT. PLEASE LOGIN TO UPDATE ROBOTS.';
//     } else {
//       return 'SUCCESSFULLY UPDATED ROBOT';
//     }
//   } catch (err) {
//     console.log('ERROR WHILE UPDATING ROBOT', err);
//     return(`ERROR WHILE UPDATING ROBOT`);
//   }
// };

// // DELETE /api/v1/robots/:id - delete a robot only if it was create by the currently logged-in user
// const deleteRobotById = async (robotId, token) => {
//   try {
//     const { rows } = await client.query(`
//       DELETE FROM robot
//       WHERE id=${robotId}
//       RETURNING *;
//     `);
//     if(!token) {
//       return 'FAILED TO DELETE ROBOT. PLEASE LOGIN TO DELETE ROBOTS.';
//     } else {
//       return 'SUCCESSFULLY DELETED ROBOT';
//     }
//   } catch (err) {
//     console.log('ERROR WHILE DELETING ROBOT', err);
//     return(`ERROR WHILE DELETING ROBOT`);
//   }
// };

module.exports = {
  getAllRobots,
  getRobotById,
  createRobot
}