import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import router from "./routes/routes.js";



const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
const db_url = process.env.DATABASE_URL;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/superheroes', router)


mongoose.connect(db_url)
    .then(() => console.log("Database Connected!"))
    .catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
