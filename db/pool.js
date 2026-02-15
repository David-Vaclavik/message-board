const { Pool } = require("pg");

// All of the following properties should be read from //! environment variables
module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
