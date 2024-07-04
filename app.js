const express = require("express")
const app = express()
require('dotenv').config();
const tasks = require('./src/routes/tasks')
const connectDb = require('./src/db/connection')
const Product = require('./src/db/schema')
const cors = require('cors');
const uri = process.env.DATABASE_URL; 


const port = 8000

// middlewares
app.use(express.json())
app.use(cors());
app.use('/api/v1/tasks', tasks)

const Start = async () => {
    try {
        await connectDb(uri);
        app.listen(port, async () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
        console.log("db mongoose error");
    }

}
Start()





