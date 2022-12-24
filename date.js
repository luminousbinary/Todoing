

var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

var today = new Date()



function getDate( ){
var options = { weekday: "long", day: "numeric", month: "long" }

    var date = today.toLocaleDateString("en-us", options)

    return date
}

function getDay(){
var options = { weekday: "long"}

    var date = today.toLocaleDateString("en-us", options)

}


module.exports = getDate