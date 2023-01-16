const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const path = require("path")
const _ = require("lodash")
// // Database Setup
// Using Node.js `require()`
const e = require('express');
const mongoose = require('mongoose');
const { render } = require("ejs")

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/todoingDB').then(() => console.log('Connected!'));;

const date = require(__dirname + "/date.js")

const port = 3000
const app = express()

// console.log(date())

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.use(express.static(path.join("public")))


// let tasks = ["Init 1", "All next"];

// let otherList = []


const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please input item name"]
    },
});

const Item = mongoose.model("Item", itemSchema);

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema],

})

const List = mongoose.model("List", listSchema);

const item1 = new Item({
    name: "Apple pie baking"
})

const item2 = new Item({
    name: "Orange pie baking"
})

const item3 = new Item({
    name: "Peach pie baking"
})

const bakingThings = [item1, item2, item3]

app.get('/', (req, res) => {

    Item.find({}, (err, tasks) => {

        res.render('index', {
            tasks: tasks,
            listTitle: date(),

        });

    })


    // console.log(tasks)
})


app.get("/:customListName", (req, res) => {
    customListName = req.params.customListName

    Item.findOne({ name: customListName }, (err, foundItem) => {

        // console.log(foundItem);
        if (!err) {
           if (foundItem) {
            console.log(foundItem+" item already exist");
            res.render("item", {foundItem: foundItem})

        } else {
            const list = new List({
                name: customListName,
                items: bakingThings,
            })
        
             list.save();
        
        }
    }else{  console.log(err);
    }
    })
})

// app.get("/:ids", (req, res) => {

//   console.log(req.params.ids);

//     Item.find({}, (err, items) => {

//   console.log(req.params.ids);

//         items.forEach(item => {
//             if (_.lowerCase(req.params.ids) === _.lowerCase(item.name)) {
//                 res.render("item", {item})
//             } else {
//                 console.log("Item not found");
//             }
//         });


//     })

// })

app.post("/", (req, res) => {
    let task = req.body.newTask


    // tasks.push(task)
    // console.log(req.body)
    if (req.body.list === "Can") {

        // otherList.push(task)
        const item = new Item({
            name: task
        });
        Item.insertMany([item], (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully Saved items");
            }
        });
        res.redirect("/task")

    } else {
        const item = new Item({
            name: task
        });
        Item.insertMany([item], (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully Saved items");
            }
        });
        // tasks.push(task)
        res.redirect("/")
    }


})

// app.get("/delete",(req,res)=>{

//     console.log(req.body)
// })

app.post("/delete", (req, res) => {
    removeIdItem = req.body.theCheck;

    Item.findByIdAndRemove(removeIdItem, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Succesfily Deleted");
        }
    })
    res.redirect("/")
})


app.get("/task", (req, res) => {

    res.render("index", { listTitle: "Can you Do it?", tasks: otherList, })
})


app.get("/about", (req, res) => {

    res.render("about", {})

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
