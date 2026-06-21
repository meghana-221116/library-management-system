const express = require('express');
// const {users} = require("../data/users.json");
const dotenv = require("dotenv")

// import database connection
const dbConnection = require('./databaseConnection')
// importing routers
const usersRouter =require("./routes/users");
const booksRouter =require("./routes/books");

dotenv.config();


const app = express();

dbConnection();


const PORT =3000;

app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200).send({
        "message":"Home Page"
    })
})
app.use("/users",usersRouter);

app.use("/books",booksRouter);

/**
 * Route: /users
 * Method: GEt
 * Description: get all the list of users in the system
 * Access: Public
 * Parameters: None
 */
app.get('/users',(req,res)=>{
    res.status(200).json({
        success:true,
        data:users
    })
})
/**
 * Route: /users/:id
 * Method: GET
 * Description: get users by their id
 * Access: Public
 * Parameters: None
 */
app.get('/users/:id',(req,res)=>{
    const {id} =req.params;
    const user = users.find((each)=>each.id === id)
    if(!user){
        return res.status(404).json({
            succes:false,
            message:`User Not Found For id: ${id}`
        })
    }
    res.status(200).json({
        success:true,
        data:user
    })
})
/**
 * Route: /users
 * Method: POST
 * Description: Register the new user to particular system
 * Access: Public
 * Parameters: None
 */
app.post('/users',(req,res)=>{
    // req.body should have the following fields
    const {id,name,surname,email,subscriptionType,subscriptionDate} =req.body;
    // check if all required fields are present 
    if(!id||!name||!surname||!email||!subscriptionType||!subscriptionDate){
        return res.status(400).json({
            succes:false,
            message:"Please provide all the requested fields"
        })

    }
    // check if user already exist
    const user = users.find((each)=>each.id === id)
        if(user){
            return res.status(409).json({
            succes:false,
            message:`User Already Exists with Id: ${id}`

        })
    }
    // if al checks pass,create the user
    // and push into user array
    users.push({
        id,name,surname,email,subscriptionType,subscriptionDate })
    res.status(201).json({
        success:true,
        message:"User Created Successfully"
    })

})
/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user by their id
 * Access: Public
 * Parameters: None
 */
app.put('/user/:id',(req,res)=>{
    const {id} =req.params;
    const {data} =req.body;
    // check if that user exist
    const user = users.find((each)=>each.id === id)
     if(!user){
            return res.status(404).json({
            succes:false,
            message:`User not found for id : ${id}`

        })
    }
    // Object.assign(user,data)
    // with spread operator
    const updateUser= users.map((each)=>{
        if(each.id === id){
            return{
                ...each,
                ...data,
            }
        }
        return each
    })
    res.status(200).json({
        success:true,
        data:updateUser,
        message:"User Updated Successfully"
    })
})
/**
 * Route: /users/:id
 * Method: DELETE
 * Description: deleting a user by their id
 * Access: Public
 * Parameters: None
 */
app.delete('/users/:id',(req,res)=>{
    const {id} = req.params;
    // Check if the user exists
    const user =users.find((each)=>each.id === id)
    if(!user){
        return res.status(404).json({
            success : false,
            message:`User not found for id: ${id}`
    })
}
// if user exist and have to filter it out from the users array
    const updatedUsers =users.filter((each)=>each.id !== id)
    res.status(200).json({
        success : true,
        data:updatedUsers,
        message:"User Deleted successfully"
    })

});





app.listen(PORT,()=>{
    console.log(`Server is up and running http://localhost:${PORT}`)
})