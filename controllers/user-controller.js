const {BookModel,UserModel} =require('../models');
const IssuedBook =require("../DTO/book-dto");


//  router.get('/',(req,res)=>{
//     res.status(200).json({
//         success:true,
//         data:users
//     })
// })
exports.getAllUsers=async(req,res)=>{

    const users =await UserModel.find();
    if(!users||users.length === 0){
        return res.status(404).json({
            success:false,
            message:"No users found"
        });
    }
    res.status(200).json({
        success:true,
        data:users
    });
}


//  router.get('/:id',(req,res)=>{
//     const {id} =req.params;
//     const user = users.find((each)=>each.id === id)
//     if(!user){
//         return res.status(404).json({
//             success:false,
//             message:`User Not Found For id: ${id}`
//         })
//     }
//     res.status(200).json({
//         success:true,
//         data:user
//     })
// })
exports.getSingleUserById =async(req,res)=>{
    const {id} =req.params;
    const user =await UserModel.findBy(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found"
        });
    }
    res.status(200).json({
        success:true,
        data:user
    });

}


//  router.post('/',(req,res)=>{
//     // req.body should have the following fields
//     const {id,name,surname,email,subscriptionType,subscriptionDate} =req.body;
//     // check if all required fields are present 
//     if(!id||!name||!surname||!email||!subscriptionType||!subscriptionDate){
//         return res.status(400).json({
//             success:false,
//             message:"Please provide all the requested fields"
//         })

//     }
//     // check if user already exist
//     const user = users.find((each)=>each.id === id)
//         if(user){
//             return res.status(409).json({
//             succes:false,
//             message:`User Already Exists with Id: ${id}`

//         })
//     }
//     // if al checks pass,create the user
//     // and push into user array
//     users.push({
//         id,name,surname,email,subscriptionType,subscriptionDate })
//     res.status(201).json({
//         success:true,
//         message:"User Created Successfully"
//     })

// })
exports.createUser=async(req,res)=>{
    const {data} =req.body;
    if(!data || Object.keys(data).length === 0){
            return res.status(400).json({
                success:false,
                message:"Please provide data to create a user"
    
            })
        }
        await UserModel.create(data);
        const getAllUser = await UserModel.find()
        res.status(201).json({
            success:true,
            message:"user Created Successfully",
            data:getAllUser
        })
    }

//  router.put('/:id',(req,res)=>{
//     const {id} =req.params;
//     const {data} =req.body;
//     // check if that user exist
//     const user = users.find((each)=>each.id === id)
//      if(!user){
//             return res.status(404).json({
//             success:false,
//             message:`User not found for id : ${id}`

//         })
//     }
//     // Object.assign(user,data)
//     // with spread operator
//     const updateUser= users.map((each)=>{
//         if(each.id === id){
//             return{
//                 ...each,
//                 ...data,
//             }
//         }
//         return each
//     })
//     res.status(200).json({
//         success:true,
//         data:updateUser,
//         message:"User Updated Successfully"
//     })
// })
exports.updateUserById=async(req,res)=>{

    const {id} =req.params;
        const {data} =req.body;
        if(!data || Object.keys(data).length === 0){
            return res.status(400).json({
                success:false,
                message:"please provide the data to update user"
            })
        }
        const user =await UserModel.findById(id)
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found"
            });
        }
        const updateUser=await UserModel.findByIdAndUpdate(id,data,{new:true});
        res.status(200).json({
            success:true,
            message:"User updated successfully",
            data:updateBook
        })
    }

//  router.delete('/:id',(req,res)=>{
//     const {id} = req.params;
//     // Check if the user exists
//     const user =users.find((each)=>each.id === id)
//     if(!user){
//         return res.status(404).json({
//             success : false,
//             message:`User not found for id: ${id}`
//     })
// }
// // if user exist and have to filter it out from the users array
//     const updatedUsers =users.filter((each)=>each.id !== id)
//     res.status(200).json({
//         success : true,
//         data:updatedUsers,
//         message:"User Deleted successfully"
//     })

// });
exports.deleteUserById=async(req,res)=>{
    const {id} =req.params;
        // check if book exists
        const user =await UserModel.findById(id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"user deletd successfully"
        })
    

}


// router.get('/subscription-details/:id', (req, res) => {

//     const { id } = req.params;

//     const user = users.find((user) => user.id === id);

//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: `User Not Found for id: ${id}`
//         });
//     }

//     // Convert date to days
//     const getDateInDays = (data = '') => {
//         let date;

//         if (data) {
//             date = new Date(data);
//         } else {
//             date = new Date();
//         }

//         let days = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));

//         return days;
//     };

//     // Calculate subscription expiry date
//     const subscriptionType = (date) => {

//         if (user.subscriptionType === "Basic") {
//             date = date + 90;
//         } else if (user.subscriptionType === "Standard") {
//             date = date + 180;
//         } else if (user.subscriptionType === "Premium") {
//             date = date + 365;
//         }

//         return date;
//     };

//     // Subscription Expiration Calculation

//     let returnDate = getDateInDays(user.returnDate);
//     let currentDate = getDateInDays();
//     let subscriptionDate = getDateInDays(user.subscriptionDate);

//     let subscriptionExpiration =
//         subscriptionType(subscriptionDate);

//     const data = {
//         ...user,

//         subscriptionExpired:
//             subscriptionExpiration < currentDate,

//         subscriptionDaysLeft: subscriptionExpiration - currentDate,

//         daysLeftForExpiration: returnDate - currentDate,

//         returnDate: returnDate < currentDate? "Book is overdue": user.returnDate,

//         fine:returnDate < currentDate? (subscriptionExpiration <= currentDate ? 200: 100) : 0
//     };

//     return res.status(200).json({
//         success: true,
//         data: data
//     });
// });
exports.getSubscriptionDetailsById = async(req,res)=>{
    const { id } = req.params;

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User Not Found for id: ${id}`
        });
    }
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
}

    
   
       
        



