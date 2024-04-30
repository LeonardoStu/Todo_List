const express = require('express')

const router = express.Router()

const Checklist = require('../models/Checklist')

router.get('/', async(req, res) => {
    try {
        let checklists = await Checklist.find({})
        res.status(200).render('checklists/index', {checklists: checklists})
    } catch (err) {
        res.status(422).json(err)
        res.status(200).render('pages/erro', {err: 'Erro ao exibir a página'})
    }
})

router.get('/new', async(req, res) => {
    try {
        let checklist = new Checklist()
        res.status(200).render('checklists/new', {checklist: checklist}) 
    } catch (err) {
        res.status(500).render('pages/error', {err: 'Erro ao carregar a página'})
    }
})

router.post('/', async(req, res) => {
    let {name} = req.body.checklist
    let checklist = new Checklist({name})
    try {
        await checklist.save()
        res.redirect('/checklists')
    } catch (err) {
        res.status(422).render('checklists/new', {checklist: {...checklist, err}})
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