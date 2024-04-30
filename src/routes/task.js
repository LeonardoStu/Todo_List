const express = require('express')

const checklistDepedentRouter = express.Router()
const simpleRouter = express.Router()

const Checklist = require('../models/Checklist')
const Task = require('../models/tasks')

checklistDepedentRouter.get('/:id/tasks/new', async(req, res) => {
    try {
        let task = Task()
        res.status(200).render('tasks/new', {checklistId: req.params.id, task: task})
    } catch (err) {
        res.status(422).render('pagas/error', {err: 'Erro ao carregar a pagina'})
    }
})

simpleRouter.delete('/:id', async(req, res) => {
    try {
        let task = await Task.findByIdAndRemove(req.params.id)
        let checklist = await Checklist.findById(task.checklist)
        let taskToRemove = checklist.tasks.indexOf(task._id)
        checklist.tasks.splice(taskToRemove, 1)
        checklist.save()
        res.redirect(`/checklists/${checklist._id}`)
    } catch (err) {
        res.status(422).render('pagas/error', {err: 'Erro ao carregar a pagina'})
    }
})

checklistDepedentRouter.post('/:id/tasks', async(req, res) => {
    let {name} = req.body.task
    let task = new Task({name, checklist: req.params.id})
    try {
        await task.save()
        let checklist = await Checklist.findById(req.params.id)
        checklist.tasks.push(task)
        await checklist.save()
        res.redirect(`/checklists/${req.params.id}`)
    } catch (err) {
        res.status(422).render('tasks/new', {task: {...task, err}, checklistId: req.params.id})
    }
})

module.exports = {
    checklistDepedent: checklistDepedentRouter,
    simple: simpleRouter
}