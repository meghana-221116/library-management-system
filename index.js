const express = require('express');
const app = express();
const PORT =3000;

app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200).send({
        "message":"Home Page"
    })
})

// app.all('*',(req,res)=>{
//     res.status(500).json({
//         "message":"Not built yet"
//     })
// })
app.listen(PORT,()=>{
    console.log(`Server is up and running http://localhost:${PORT}`)
})