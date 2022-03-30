const mongoose = require("mongoose");
// mongodb://localhost:27017/pixalive'

mongoose.connect('mongodb+srv://Pixalive:Pixalive1234@cluster0.tpv8o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
.then(()=> {
    console.log("DB connected");
})
.catch((err)=> {
    console.log("DB not connceted", err);
})