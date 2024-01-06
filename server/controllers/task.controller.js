const db = require('../db')

class TaskController {
    async createTask(req, res) {
        const { title, description, status } = req.body
        const query = `INSERT INTO tasks (title, description, status) values ($1, $2, $3) RETURNING *`
        const values = [title, description, status]

        try {
            const result = await db.query(query, values)
            res.json(result.rows[0])
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error creating task' })
        }
    }

    async getTasks(req, res) {
        const query = `SELECT * FROM tasks ORDER BY id ASC`

        try {
            const result = await db.query(query)
            res.json(result.rows)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error get tasks' })
        }
    }

    async updateTask(req, res) {
        const { id, title, description, status } = req.body
        const query = `UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *`
        const values = [title, description, status, id]

        try {
            const result = await db.query(query, values)
            res.json(result.rows[0])
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error update task' })
        }
    }

    async deleteTask(req, res) {
        const id = req.params.id
        const query = `DELETE FROM tasks WHERE id = $1`
        const values = [id]

        try {
            await db.query(query, values)
            res.status(200).json()
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error delete task' })
        }
    }
}

module.exports = new TaskController()