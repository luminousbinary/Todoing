const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const path = require("path")

const date = require(__dirname+"/date.js")

const port = 3000
const app = express()

// console.log(date())

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.use(express.static(path.join("public")))

 
let tasks = ["Init 1", "All next"];
let otherList = []
app.get('/', (req, res) => {

 
    console.log(tasks)
    res.render('index', {
        tasks: tasks,
        listTitle: date(),
        // day: daysOfWeek[today.getDay()], 


    });

    // if (today.getDay()===5){
    //     res.write("Its finaly weekend")
    // }else{
    //     res.write("Another day to make hay")
    // }


})


app.post("/", (req, res) => {
    let task = req.body.newTask

    // tasks.push(task)
    // console.log(req.body)
    if (req.body.list === "Can") {

        otherList.push(task)
        res.redirect("/task")

    } else {
        tasks.push(task)
        res.redirect("/")
    }


})



app.get("/task", (req, res) => {

    res.render("index", { listTitle: "Can you Do it?", tasks: otherList, })
})


app.get("/about" , (req,res)=>{

    res.render("about",{})

})




app.listen(port, () => {
    console.log("Server is running on port " + port)
})


//  // I cut this out from the ejs file
// <!-- <%= theDate %>

// <%    if (day === "Saturday" || day === "Sunday"){ %>
//     <h1 > Huray!!! its finally <em style="color: blue;"><%= day %>  </em> </h1>
// <% } else if( day === "Friday"){ %>
//     <h1>THANK GOD IT'S  <em style="color: aqua;"> <%=day%> </em></h1>
// <%} else { %>
//  <h1>Meh Today is <%=day%> </h1>
// <%}%> -->
