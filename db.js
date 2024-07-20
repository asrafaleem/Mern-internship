const { default: mongoose } = require('mongoose')
const uri = "mongodb+srv://asraf:12345@cluster0.row32hi.mongodb.net/IT?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri,clientOptions)
