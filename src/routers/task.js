const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:workoutId/:id', auth, async (req, res) => {
    const _id = req.params.id
    const workoutId = req.params.workoutId

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        const plan = task.plan.find((e) => workoutId == e._id)
        res.send(plan)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/tasks/updateLists/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['date']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        // updates.forEach((update) => task[update].plan.push(req.body[update]))
        task.plan.push(req.body)

        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/tasks/updateWorkout/:id/:listId', auth, async (req, res) => {
    const listId = req.params.listId

    const updates = Object.keys(req.body)
    const allowedUpdates = ['sportName', 'set', 'weight', 'number']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        const index = task.plan.findIndex((e) => listId == e._id)
        task.plan[index].list.push(req.body)

        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router 