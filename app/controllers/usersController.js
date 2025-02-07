const db = require('./../configs/db.configs');

const usersController = {
    getAllUsers: async (req, res) => {
        const {offset, limit, search, orderBy, order} = req.query;
        let filter = '';
        if(search) {
            filter += `WHERE name LIKE '${search}%' `;
        }
        if(orderBy) {
            filter += `ORDER BY ${orderBy} `;
            if(order == 'desc') {
                filter += 'DESC '
            }
            else {
                filter += 'ASC '
            }
        }   
        if(offset && limit) {
            filter += `OFFSET ${offset} `;
        }
        if(limit) {
            filter += `LIMIT ${limit} `;
        }
        const query = `SELECT * FROM users ${filter}` ;
        try {
            const result = await db.pool.query(query);
            res.status(200).json(result.rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    getAllUsersCount: async (req, res) => {
        const {offset, limit, search, orderBy, order} = req.query;
        let filter = '';
        if(search) {
            filter += `WHERE name LIKE '${search}%' `;
        }
        if(orderBy) {
            filter += `ORDER BY ${orderBy} `;
            if(order == 'desc') {
                filter += 'DESC '
            }
            else {
                filter += 'ASC '
            }
        }   
        if(offset && limit) {
            filter += `OFFSET ${offset} `;
        }
        if(limit) {
            filter += `LIMIT ${limit} `;
        }
        const query = `SELECT COUNT(*) FROM users ${filter}` ;
        try {
            const result = await db.pool.query(query);
            res.status(200).json(result.rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }, 
    getUserById: async (req, res) => {
        const id = req.params.id;
        const query = `SELECT * FROM users WHERE id = ${id}`;
        try {
            const result = await db.pool.query(query);
            res.status(200).json(result.rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    createUser: async (req, res) => {
        const {name, email} = req.body;
        const query = `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`;
        try {
            const result = await db.pool.query(query, [name, email]);
            res.status(200).json(result.rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    deleteUser: async (req, res) => {
        const {id} = req.body; 
        const subQuery = `DELETE FROM comments WHERE userid = ($1)`;
        const query = `DELETE FROM users WHERE id = ($1) RETURNING *`;
        try {
            await db.pool.query(subQuery, [id]);
            const result = await db.pool.query(query, [id]);
            res.status(200).json(result.rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    updateUser: async (req, res) => {
        const {id, name, email} = req.body; 
        const query = `UPDATE users SET name = ($1), email = ($2) WHERE id = ($3) RETURNING *`;
        try {
            const result = await db.pool.query(query, [name, email, id]);
            res.status(200).json(result.rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
}
module.exports = usersController;