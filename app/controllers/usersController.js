const db = require('./../configs/db.configs');
const usersController = {
    getAllUsers: async (req, res) => {
        const query = 'SELECT * FROM users ORDER BY id ASC';
        try {
            const result = await  db.pool.query(query);
            res.status(200).json(result.rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}
module.exports = usersController;