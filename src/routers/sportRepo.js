const express = require('express')
const Repo = require('../models/sportRepo')
const router = new express.Router()

router.get('/repo/get', async (req, res) => {
    try {
        const repo = await Repo.find({})
        res.status(201).send([...repo])
    } catch (e) {
        res.status(400).send()
    }
})

// router.get('/repo/search', async (req, res) => {
//     try {
//         // res.status(400)
//         let repo = await Repo.find({})
//         repo = [...repo]
//         console.log(req.body.name, repo);
//         repo = repo.filter(s => s.includes('شنا'))
//         console.log(11111);
//         res.status(201).send([...repo])
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

router.post('/repo/post', async (req, res) => {
    try {
        const exist = await Repo.findOne({ name: req.body.name })
        if (exist) {
            res.status(400).send({ "msg": "duplicated" })
            return
        }

        const repo = new Repo({
            name: req.body.name,
        })

        await repo.save()
        res.status(201).send({ repo })
    } catch (e) {
        console.log(e);
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