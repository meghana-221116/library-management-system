const express = require('express');
const {users} = require("../data/users.json");
const router = express.Router();
/**
 * Route: /users
 * Method: GEt
 * Description: get all the list of users in the system
 * Access: Public
 * Parameters: None
 */
 router.get('/',(req,res)=>{
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
 router.get('/:id',(req,res)=>{
    const {id} =req.params;
    const user = users.find((each)=>each.id === id)
    if(!user){
        return res.status(404).json({
            success:false,
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
 router.post('/',(req,res)=>{
    // req.body should have the following fields
    const {id,name,surname,email,subscriptionType,subscriptionDate} =req.body;
    // check if all required fields are present 
    if(!id||!name||!surname||!email||!subscriptionType||!subscriptionDate){
        return res.status(400).json({
            success:false,
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
 router.put('/:id',(req,res)=>{
    const {id} =req.params;
    const {data} =req.body;
    // check if that user exist
    const user = users.find((each)=>each.id === id)
     if(!user){
            return res.status(404).json({
            success:false,
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
 router.delete('/:id',(req,res)=>{
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

/**
 * Route: /users/subsription-details/:id
 * Method: get
 * Description: get all subscription details of the user by their id
 * Access: Public
 * Parameters: None
 */
router.get('/subscription-details/:id', (req, res) => {

    const { id } = req.params;

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User Not Found for id: ${id}`
        });
    }

    // Convert date to days
    const getDateInDays = (data = '') => {
        let date;

        if (data) {
            date = new Date(data);
        } else {
            date = new Date();
        }

        let days = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));

        return days;
    };

    // Calculate subscription expiry date
    const subscriptionType = (date) => {

        if (user.subscriptionType === "Basic") {
            date = date + 90;
        } else if (user.subscriptionType === "Standard") {
            date = date + 180;
        } else if (user.subscriptionType === "Premium") {
            date = date + 365;
        }

        return date;
    };

    // Subscription Expiration Calculation

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);

    let subscriptionExpiration =
        subscriptionType(subscriptionDate);

    const data = {
        ...user,

        subscriptionExpired:
            subscriptionExpiration < currentDate,

        subscriptionDaysLeft: subscriptionExpiration - currentDate,

        daysLeftForExpiration: returnDate - currentDate,

        returnDate: returnDate < currentDate? "Book is overdue": user.returnDate,

        fine:returnDate < currentDate? (subscriptionExpiration <= currentDate ? 200: 100) : 0
    };

    return res.status(200).json({
        success: true,
        data: data
    });
});

module.exports =router;