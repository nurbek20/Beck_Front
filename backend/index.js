// 19952002
const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors')

const app = express();
app.use(cors()) 
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth-route'))
app.use('/api/todo', require('./routes/todo-route'))

async function start() {
    try {
        await mongoose.connect('mongodb+srv://nurbek:1w2e3@cluster0.8ur67ps.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, () => {
            console.log(`Server started on Port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}
start()





// , {
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     useCreateIndex:true,
//     useFindAndModify:true
// }