const {BookModel,UserModel} =require('../models');
const IssuedBook =require("../DTO/book-dto");

// const getAllBooks=()=>{

// }

// const getsingleBookBtId=()=>{

// }

// incase 100 s of methos
// exports.getsingleBookBtId=()=>{

// }
//  router.get('/',(req,res)=>{
//     res.status(200).json({
//         success:true,
//         data:books
//     })
// })

exports.getAllBooks=async(req,res)=>{

    const books = await Bookmodel.find()
    if(books.length === 0){
        return res.status.json({
            success:false,
            message:"No Books in the system"
        })
    }
    res.status(200).json({
        success:true,
        data:books
    })

}

exports.getSingleBookById=async(req,res)=>{
    const {id} = req.params;
    const book = await BookModel.findById(id)
    if(!book){
        return res.status(404).json({
            success:false,
            message:`Book not found for id: ${id}`
        })
    }
    res.status(200).json({
            success:true,
            message:book
        })
}


// router.get('/issued/for-users',(req,res)=>{
//     const usersWithIssuedBooks = users.filter((each)=>{
//         if(each.issuedBook){
//             return each;
//         }
//     })
//     const issuedBooks=[];
//    userWithIssuedBooks.forEach((each)=>{
//     const book =books.find((book)=>book.id===each.issuedBook);
//     book.issuedBy = each.name;
//     book.issueDate =each.issueDate;
//     book.returnDate=each.returnDate;

//     issuedBooks.push(book)
//    })
    
//    if(!issuedBooks===0){
//     return res.status(404).json({
//         success:false,
//         message:"No Books Issued yet"
//     })
//    }
//     res.status(200).json({
//         success:true,
//         data:issuedBooks
//     });
// })

exports.getAllIssuedBooks=async(req,res)=>{
    const users = await UserModel.find({
        issuedBook :{$exists : true},
        
    }).populate("issuedBook")

    const issuedBooks =users.map((each)=>{
        return newIssuedBook(each);
    })
    if(issuedBooks.length === 0){
        return res.status(404).json({
         success:false,
        message:"No Books Issued yet"
    })
   }
    res.status(200).json({
        success:true,
        data:issuedBooks
    })
}

// router.post('/',(req,res)=>{
//     // req.body should have the following fields
//     // "id": 1,
//     // "name": "The Alchemist",
//     // "author": "Paulo Coelho",
//     // "genre": "Fiction",
//     // "price": 299,
//     // "publisher": "HarperCollins"
//     const {id,name,author,genre,price,publisher} =req.body;
//     // check if all required fields are present 
//     if(!id||!name||!author||!genre||!price||!publisher){
//         return res.status(400).json({
//             success:false,
//             message:"Please provide all the requested fields"
//         })

//     }
//     // check if user already exist
//     const book = books.find((each)=>each.id === id)
//         if(book){
//             return res.status(409).json({
//             succes:false,
//             message:`book Already Exists with Id: ${id}`

//         })
//     }
//     // if al checks pass,create the user
//     // and push into user array
//     books.push({
//         id,name,author,genre,price,publisher })
//     res.status(201).json({
//         success:true,
//         message:"book Created Successfully"
//     })

// })

exports.addNewBook = async(req,res)=>{
    const {data} =req.body;
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success:false,
            message:"Please provide data to add fields"

        })
    }
    await BookModel.create(data);
    const allBooks =await BookModel.find();
    res.status(201).json({
        success:true,
        message:"book Created Successfully",
        data:data
    })
}

//  router.put('/:id',(req,res)=>{
//     const {id} =req.params;
//     const {data} =req.body;
//     // check if that user exist
//     const book = books.find((each)=>each.id === id)
//      if(!book){
//             return res.status(404).json({
//             success:false,
//             message:`book not found for id : ${id}`

//         })
//     }
//     // update the book details
// //    Object.assign(book,data)
//  const updateBook= books.map((each)=>{
//         if(each.id === id){
//             return{
//                 ...each,
//                 ...data,
//             }
//         }
//         return each;
//     })
    
//     res.status(200).json({
//         success:true,
//         data:updateBook,
//         message:"Book Updated Successfully"
//     })
// })
exports.updateBookById=async(req,res)=>{
    const {id} =req.params;
    const {data} =req.body;
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success:false,
            message:"Please provide the data to upadte"
        })
    }
    const updateBook =await BookModel.findOneAndUpdate(
        { _id:id },
        data,
        { new:true }
    );
    if(!updateBook){
        return res.status(400).json({
            success:false,
            message:"Book not found"
        })
    }
    res.status(200).json({
        success:true,
        message:"Book updated successfully",
        data:updateBook
    })
}

//  router.delete('/:id',(req,res)=>{
//     const {id} = req.params;
//     // Check if the book exists
//     const book =books.find((each)=>each.id === id)
//     if(!book){
//         return res.status(404).json({
//             success : false,
//             message:`Book not found for id: ${id}`
//     })
// }
// // if book exist and have to filter it out from the book array
//     const updatedBooks =books.filter((each)=>each.id !== id)
//     res.status(200).json({
//         success : true,
//         data:updatedBooks,
//         message:"Book Deleted successfully"
//     })

// });

exports.deleteBookById = async(req,res)=>{
    const {id} =req.params;
    // check if book exists
    const book =await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book not found"
        })
    }
    await BookModel.findByIdAndDelete(id);
    res.status(200).json({
        success:true,
        message:"Book deletd successfully"
    })

}
module.exports={
    getAllBooks,getsingleBookBtId,getAllIssuedBooks,updateBookById
}