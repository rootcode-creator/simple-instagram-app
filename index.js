const express = require("express");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require('uuid');

const methodOverride = require("method-override");
app.use(methodOverride('_method'));

const path = require("path");
app.use(express.urlencoded( { extended:true } ));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, 'images'))); 

app.use(express.json());



let posts = [

    {
        
        id: uuidv4(),
        username: "shakil36",
        image: 'child.jpg',
        name: "Shakil",
        age: 26,
        content: "I love coding!"
    },
    {
        
        id: uuidv4(),
        username: "tanzil22",
        image: 'child2.jpg',
        name: "Tanzil",
        age: 23,
        content: "I love coding!"
    }
];


app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/form", (req, res) => {
    res.render("form.ejs");
});

app.post("/posts", (req, res) => {

    let {username, image, name, age, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, image, name, age, content });
    res.redirect("/posts");

});


app.get("/posts/:id", (req, res) => {
    console.log(req.params);

    let {id} = req.params;
    let post = posts.find((p) => p.id == id);

    res.render("edit.ejs", {post} );

});

app.patch("/posts/edit/:id", (req, res) => {
    console.log(req.params);
    let {id} = req.params;
    let post = posts.find((p) => p.id == id);
    post.name = req.body.name;
    post.age = req.body.age;
    post.content = req.body.content;
    res.redirect("/posts");
   

});


app.get("/posts/details/:id", (req, res) => {

    let {id} = req.params;
    let post = posts.find( (p) => id == p.id);


    res.render("details.ejs", {post} );
    

});



app.delete("/posts/delete/:id", (req, res) => {

    let {id} = req.params;
    posts = posts.filter( (p) => id != p.id);

    res.redirect("/posts");
    

});

app.get("/", (req, res) => {
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
