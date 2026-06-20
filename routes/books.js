const express = require('express');
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");
const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: get all the list of books in the system
 * Access: Public
 * Parameters: None
 */
 router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        data:books
    })
})

/**
 * Route: /books/:id
 * Method: GET
 * Description: get users by their id
 * Access: Public
 * Parameters: None
 */
 router.get('/:id',(req,res)=>{
    const {id} =req.params;
    const book = books.find((each)=>each.id === id)
    if(!book){
        return res.status(404).json({
            success:false,
            message:`book Not Found For id: ${id}`
        })
    }
    res.status(200).json({
        success:true,
        data:book
    })
})
/**
 * Route: /books
 * Method: POST
 * Description: Register the new book to particular system
 * Access: Public
 * Parameters: None
 */
 router.post('/',(req,res)=>{
    // req.body should have the following fields
    // "id": 1,
    // "name": "The Alchemist",
    // "author": "Paulo Coelho",
    // "genre": "Fiction",
    // "price": 299,
    // "publisher": "HarperCollins"
    const {id,name,author,genre,price,publisher} =req.body;
    // check if all required fields are present 
    if(!id||!name||!author||!genre||!price||!publisher){
        return res.status(400).json({
            success:false,
            message:"Please provide all the requested fields"
        })

    }
    // check if user already exist
    const book = books.find((each)=>each.id === id)
        if(book){
            return res.status(409).json({
            succes:false,
            message:`book Already Exists with Id: ${id}`

        })
    }
    // if al checks pass,create the user
    // and push into user array
    books.push({
        id,name,author,genre,price,publisher })
    res.status(201).json({
        success:true,
        message:"book Created Successfully"
    })

})
/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a user by their id
 * Access: Public
 * Parameters: None
 */
 router.put('/:id',(req,res)=>{
    const {id} =req.params;
    const {data} =req.body;
    // check if that user exist
    const book = books.find((each)=>each.id === id)
     if(!book){
            return res.status(404).json({
            success:false,
            message:`book not found for id : ${id}`

        })
    }
    // update the book details
//    Object.assign(book,data)
 const updateBook= books.map((each)=>{
        if(each.id === id){
            return{
                ...each,
                ...data,
            }
        }
        return each;
    })
    
    res.status(200).json({
        success:true,
        data:updateBook,
        message:"Book Updated Successfully"
    })
})
/**
 * Route: /books/:id
 * Method: DELETE
 * Description: deleting a user by their id
 * Access: Public
 * Parameters: None
 */
 router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    // Check if the book exists
    const book =books.find((each)=>each.id === id)
    if(!book){
        return res.status(404).json({
            success : false,
            message:`Book not found for id: ${id}`
    })
}
// if book exist and have to filter it out from the book array
    const updatedBooks =books.filter((each)=>each.id !== id)
    res.status(200).json({
        success : true,
        data:updatedBooks,
        message:"Book Deleted successfully"
    })

});
/**
 * Route: /books/issued/for-users
 * Method:GET
 * Description: get all the issued books
 * Access: Public
 * Parameters: None
 */
router.get('/issued/for-users',(req,res)=>{
    const usersWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook){
            return each;
        }
    })
    const issuedBooks=[];
   userWithIssuedBooks.forEach((each)=>{
    const book =books.find((book)=>book.id===each.issuedBook);
    book.issuedBy = each.name;
    book.issueDate =each.issueDate;
    book.returnDate=each.returnDate;

    issuedBooks.push(book)
   })
    
   if(!issuedBooks===0){
    return res.status(404).json({
        success:false,
        message:"No Books Issued yet"
    })
   }
    res.status(200).json({
        success:true,
        data:issuedBooks
    });
})






 module.exports = router;