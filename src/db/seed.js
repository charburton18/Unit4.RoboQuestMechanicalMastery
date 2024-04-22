const client = require('./client.js');
const { getAllRobots, createRobot } = require('./robots.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS robots;
    `)
  } catch (error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(30),
        password VARCHAR(50)
      );

      CREATE TABLE robots (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30),
        color VARCHAR(50),
        userId INT REFERENCES users(id)
      );
    `)
  } catch (error) {
    console.log(error);
  }
};

const seedData = async () => {
  await createRobot('Allie', 'amber');
  await createRobot('Bob', 'blue');
  await createRobot('Cathy', 'cyan');
}

const syncAndSeed = async() => {
  await client.connect();
  console.log('SEED.JS CONNECTED TO DATABASE');

  await dropTables();
  console.log(`TABLES DROPPED`);

  await createTables();
  console.log(`TABLES CREATED`);

  await seedData();
  console.log(`TABLES SEEDED WITH DATA`)

  await client.end();
  console.log('SEED.JS DISCONNECTED FROM DATABASE');
}

syncAndSeed();