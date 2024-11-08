import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import userRouter from './router/userRouter.js';
import adminRouter from './router/adminRouter.js';
import expressSession from 'express-session';

const app = express();

app.use(expressSession({ secret: "1234567890qwertyuio", saveUninitialized: true, resave: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: true }));

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", (request, response) => {
    response.render("index.ejs", { message: "" });
})
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.get("/signout", (req, res) => {
    const check = req.session.email;
    console.log(check);
    if (check == undefined) {

        res.render("index.ejs", { message: "Please Login First" })
    }
    else {
        req.session.email = '';
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.render("index.ejs", { message: "logout Successfully" });
            }
        });
    }
})

app.listen(3000, () => {
    console.log("Connection established successfully");
});