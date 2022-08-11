const util = require('util');
const mysql = require('mysql');
const db = require('../../dbMySQL.js');
const pool = require('../../dbPostGresSQL.js');
const Task = require('../models/task.js');
const table = 'task'


const listTask =  async (req, res) =>{
        // pool.query('SELECT * FROM task ORDER BY id ASC', (error, results) => {
        //     console.log("results.rows", results);
        //     if (error) {
        //       throw error
        //     }
        //     res.status(200).json(results.rows)
        //   })

        Task.find()
        .select('_id name category isCompleted')
        .then((tasks)=>{ 
            return res.status(200).json({
                success: true,
                data:tasks,
                error:null,
              });
        })
        .catch((error)=>{
            return res.status(400).json({
                success: false,
                data:null,
                error:error,
                });
        })
}

const infoTask = async (req, res) =>{
        // pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        //     if (error) {
        //       throw error
        //     }
        //     res.status(201).json({
        //         success: true,
        //         data:results.rows,
        //         error:null,
        //       });
        // })
        Task.findById(req.params.id)
        .select('_id name category isCompleted')
        .then((task)=>{ 
            return res.status(200).json({
                success: true,
                data:task,
                error:null,
              });
        })
        .catch((error)=>{
            return res.status(400).json({
                success: false,
                data:null,
                error:error,
                });
        })
    }


const createTask = async (req, res) =>{
        const { name, category, isCompleted } = req.body;
        // pool.query('INSERT INTO task (name, category, isCompleted) VALUES ($1, $2, $3)', [name, category, isCompleted], (error, results) => {
        //     if (error) {
        //        return res.status(400).json({
        //            success: false,
        //            data:null,
        //            error:error,
        //           });
        //     }
        //     res.status(201).json({
        //         success: true,
        //         data:"Create task success!",
        //         error:null,
        //       });
        // })
        const task = new Task({
            name: name,
            category: category,
            isCompleted: isCompleted
        });

        return task.save()
        .then((newTask) => {
            return res.status(201).json({
                success: true,
                data:newTask,
                error:null,
              });
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                data:null,
                error:error,
            });
        })

    }

const updateTask = async (req, res) =>{
    // pool.query(
    //     'UPDATE task SET name = $1, category = $2, isCompleted= $3  WHERE id = $4',
    //     [name, category, isCompleted, id],
    //     (error, results) => {
    //       if (error) {
    //        return res.status(400).json({
    //            success: false,
    //            data:null,
    //            error:error,
    //           });
    //       }
    //       res.status(200).json({
    //         success: true,
    //         data:"Update task success!",
    //         error:null,
    //       });
    //     }
    // )
    Task.findByIdAndUpdate(req.params.id, req.body)
    .then((task) => {
        return res.status(201).json({
            success: true,
            data:task._id,
            error:null,
          });
    })
    .catch((error) => {
        return res.status(400).json({
            success: false,
            data:null,
            error:error,
        });
    })
      
}

const deleteTask = async (req, res) =>{
    // pool.query('DELETE FROM task WHERE id = $1', [id], (error, results) => {
    //     if (error) {
            // return res.status(201).json({
            //     success: true,
            //     data:null,
            //     error:null,
            // });
    //     }
    //     res.status(200).json({
    //         success: true,
    //         data:"Delete task success!",
    //         error:null,
    //       });
    // })
    Task.findByIdAndDelete(req.params.id)
    .then((task) => {
        return res.status(201).json({
            success: true,
            data:null,
            error:null,
          });
    })
    .catch((error) => {
        return res.status(400).json({
            success: false,
            data:null,
            error:error,
        });
    })
    
}

module.exports = {
    listTask,
    infoTask,
    createTask,
    updateTask,
    deleteTask,
}