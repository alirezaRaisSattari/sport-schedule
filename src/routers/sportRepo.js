const express = require('express')
const Repo = require('../models/sportRepo')
const router = new express.Router()

router.get('/repo/get', async (req, res) => {
    try {
        const repo = await Repo.find({})
        console.log(repo);  
        res.status(201).send({ repo })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/repo/post', async (req, res) => {
    try {
        const exist = await Repo.findOne({ name: req.body.name })
        if (exist) {
            res.status(400).send({ "msg": "duplicated" })
            return
        }

        const repo = new Repo(req.body)

        await repo.save()
        res.status(201).send({ repo })
    } catch (e) {
        res.status(400).send()
    }
})

router.put('/repo/edit/:id', async (req, res) => {
    try {
        const exist = Repo.findOne({ email: req.body.email })
        if (exist) res.status(400).send({ "msg": "duplicated" })
        const repo = new Repo(req.body)

        await repo.save()
        res.status(201).send({ repo })
    } catch (e) {
        res.status(400).send()
    }
}
)
router.delete('/repo/delete/:id', async (req, res) => {
    try {
        const exist = Repo.findOne({ email: req.body.email })
        if (exist) res.status(400).send({ "msg": "duplicated" })
        const repo = new Repo(req.body)

        await repo.save()
        res.status(201).send({ repo })
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router