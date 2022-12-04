require("dotenv").config()
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const app = express();
const schedules = require("./routes/schedules");
// app.use((req, res, next)=>{
//     console.log("I'm in my middleware");
//     next();
// })

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/schedules", schedules);

app.get("/",(req, res)=>{
    res.status(200).json({
        message: "Hello World!"
    })
});

const port = process.env.PORT ?? 3000;

app.listen(port, ()=>{
    console.log(`Server is running and listening on ${port} and waiting for requests!`);
})