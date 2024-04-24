const express = require('express')
const {query} = require('../helpers/db.js')
const authenticateToken = require('../middleware/authenticateToken.js')

const addNewPostRouter = express.Router()


addNewPostRouter.post("/new",authenticateToken,async(req,res)=>
{
    try {
        const sql = 'INSERT INTO posts (user_id, title, category_name, content, cover_image) VALUES ($1, $2, $3, $4, $5) returning *'
        const result = await query(sql,[req.body.userId, req.body.title, req.body.catName, req.body.content, req.body.coverpic])
        res.status(200).json(result.rows[0])} 
        catch(error){        
        console.error('Error is ', error);
        res.status(500).json({ message: 'Server error' });
    }
})

addNewPostRouter.delete("/delete/:id", async(req,res)=> {
    const id = Number(req.params.id)
    try {
        const sql ='delete from post where id = $1'
        await query(sql,[id])
        res.status(200).json({id:id})

    } catch(error){
        res.statusMessage = error
        res.status(500).json({error : error})
    }
})

module.exports = addNewPostRouter;