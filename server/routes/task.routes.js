const Router = require('express')
const router = new Router
const taskController = require('../controllers/task.controller')

router.post('/', taskController.createTask)
router.get('/', taskController.getTasks)
router.put('/', taskController.updateTask)
router.delete('/:id', taskController.deleteTask)

module.exports = router