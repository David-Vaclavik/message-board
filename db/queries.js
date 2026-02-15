const pool = require("./pool");

// columns: id, username, message, created_at

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertMessage({ author, message }) {
  const { rows } = await pool.query(
    "INSERT INTO messages (username, message) VALUES ($1, $2) RETURNING *",
    [author, message]
  );
  return rows[0];
}

async function getMessageById(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
  return rows[0];
}

module.exports = {
  getAllMessages,
  insertMessage,
  getMessageById,
};
