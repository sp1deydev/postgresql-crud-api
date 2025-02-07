const db = require('./../configs/db.configs');

const commentsController = {
    getAllComments: async (req, res) => {
        const {offset, limit, search, orderBy, order} = req.query;
        let filter = '';
        if(search) {
            filter += `WHERE content LIKE '${search}%' `;
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
        if(offset) {
            filter += `OFFSET ${offset} `;
        }
        if(limit) {
            filter += `LIMIT ${limit} `;
        }
        const query = `SELECT c.id, c.userid, c.content, u.name FROM comments c ${filter} INNER JOIN users u ON c.userid = u.id`;
        try {
            const result = await db.pool.query(query);
            res.status(200).json(result.rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    getAllCommentsCount: async (req, res) => {
        const {offset, limit, search} = req.query;
        let filter = '';
        if(search) {
            filter += `WHERE content LIKE '${search}%' `;
        }
        if(offset) {
            filter += `OFFSET ${offset} `;
        }
        if(limit) {
            filter += `LIMIT ${limit} `;
        }
        const query = `SELECT COUNT(*) FROM comments ${filter}` ;
        try {
            const result = await db.pool.query(query);
            res.status(200).json(result.rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    getCommentById: async (req, res) => {
        const id = req.params.id;
        const query = `SELECT * FROM comments WHERE id = ${id}`;
        try {
            const result = await db.pool.query(query);
            res.status(200).json(result.rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    createComment: async (req, res) => {
        const {userId, content} = req.body;
        const query = `INSERT INTO comments (userid, content) VALUES ($1, $2) RETURNING *`;
        try {
            const result = await db.pool.query(query, [userId, content]);
            res.status(200).json(result.rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    deleteComment: async (req, res) => {
        const {id} = req.body; 
        const query = `DELETE FROM comments WHERE id = ($1) RETURNING *`;
        try {
            const result = await db.pool.query(query, [id]);
            res.status(200).json(result.rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    updateComment: async (req, res) => {
        const {id, content} = req.body; 
        const query = `UPDATE comments SET content = ($1) WHERE id = ($2) RETURNING *`;
        try {
            const result = await db.pool.query(query, [content, id]);
            res.status(200).json(result.rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
}
module.exports = commentsController;