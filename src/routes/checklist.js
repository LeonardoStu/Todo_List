const express = require('express')

const router = express.Router()

const Checklist = require('../models/checklist')

router.get('/', async(req, res) => {
    try {
        let checklists = await Checklist.find({})
        res.status(200).render('checklists/index', {checklists: checklists})
    } catch (err) {
        res.status(422).json(err)
        res.status(200).render('pages/erro', {err: 'Erro ao exibir a página'})
    }
})

router.post('/', async(req, res) => {
    let {name} = req.body
    try {
        let checklist = await Checklist.create({name})
        res.status(200).send(checklist)
    } catch (err) {
        res.status(422).json(err)
    }
})

router.get('/:id',async(req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id)
        res.status(200).render('checklists/show', {checklist: checklist})
    } catch (err) {
        res.status(422).json(err)
        res.status(200).render('pages/erro', {err: 'Erro ao exibir a página de lista de tarefas'})
    }
})

router.put('/:id', async(req, res) => {
    let {name} = req.body
    try {
        let checklist = await Checklist.findByIdAndUpdate(req.params.id, {name}, {new: true})
        res.status(200).send(checklist);
    } catch (err) {
        res.status(422).json(err)
    }
})

router.delete('/:id', async(req, res) => {
    try {
        let checklist = await Checklist.findByIdAndDelete(req.params.id)
        res.status(200).json(checklist);
    } catch (err) {
        res.status(422).json(err)
    }
})
module.exports = router