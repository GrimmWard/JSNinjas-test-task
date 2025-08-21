import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import router from "./routes/routes.js";
import cors from "cors";

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT;
const db_url = process.env.DATABASE_URL;

app.use('/superheroes', router)

mongoose.connect(db_url)
    .then(() => console.log("Database Connected!"))
    .catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
