const express = require("express");
const app = express();
const path = require("path")
const port = process.env.PORT || 2000;
const session = require("express-session")
const Register = require("./models/register")
const Exercise = require("./models/exercisemodel")
require("./db/conn");

const static_path = path.join(__dirname,'../public')
const templates_path = path.join(__dirname,"../components/views")

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(static_path));
app.set('view engine', 'ejs');
app.set("views",templates_path);

app.get("/", (req,res)=> {
    res.render("login")
});
app.get("/signup", (req,res)=> {
    res.render("signup")
});
app.get("/login", (req,res)=> {
    res.render("login")
});
app.post("/signup", async (req,res)=> {
    try{
        const Password = req.body.password;
        const Confirmpassword = req.body.cpassword;
        
        if(Password == Confirmpassword){

            const registerEmployee = new Register({
                Name: req.body.Name,
                email: req.body.email,
                password: Password,
                cpassword: Confirmpassword
            })
            
            const registered = await registerEmployee.save();
            res.status(201).render('login');
        }

        else{
            res.send(`passwords are not matching`)
        }
    }
    catch(err){
        res.status(400).send(err);
    }
});

app.post("/login",(req,res)=>{
    res.render('index')
})

app.get("/exercise",(req,res)=>{
    res.render('exercise')
})

app.post("/exercise", async (req,res)=> {
    try{
        const registerExercise = new Exercise({
            name: req.body.name,
            type: req.body.type,
            datess: req.body.datess,
            timess: req.body.timess,
            distance: req.body.distance,
            heartrate: req.body.heartrate,
            calories: req.body.calories,
            notes: req.body.notes
        })

        const registeredExercise = await registerExercise.save();
            res.status(201).render('exercise');
    }
    catch(err){
        res.status(400).send(err);
    }
});
app.get('/exerciseslist',(req, res)=>{
    Exercise.find({})
    .then((x)=>{
        res.render('exerciseslist', {x})
        console.log(x);
    }).catch((y) =>{
        console.log(y);
    })
})

app.post('/exerciseslist',(req,res)=>{
    res.render('exerciseslist');
})

app.get("/index",(req,res)=>{
    res.render('index');
})

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
  }));

app.get('/logout', (req, res) => {
    // Clear session data
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      } else {
        // Redirect to login page
        res.redirect('/login');
      }
    });
    // window.history.pushState(null, null, window.location.href);
    // window.onpopstate = function() {
    // window.history.go(1);
// };
  });

app.listen(port)