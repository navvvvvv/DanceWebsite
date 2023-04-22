const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
main().catch(err => console.log(err));dzxz
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 80;

// define mongoose schema 
const contactDance = new mongoose.Schema({
  name: String,
  phone: String,
  enail: String,
  address: String,
  dsc: String,
});

const contact = mongoose.model('Kitten', contactDance);


// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
    const params = { };
  res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
    const params = { };
  res.status(200).render("contact.pug", params);
});
app.post("/contact", (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
      res.send("This data has been saved to the database")
    }).catch(() => {
      res.status(400).send("item was not sanved to the database")
    })
  // res.status(200).render("contact.pug");
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
  });
  