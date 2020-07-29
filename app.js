var express = require('express');

var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	campgrounds =
	[
		{name: "Himachal", image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
		{name: "Assam", image: "https://images.unsplash.com/photo-1571687949921-1306bfb24b72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
		{name: "Abu", image: "https://images.unsplash.com/photo-1528433556524-74e7e3bfa599?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" }
	]
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(3000, function(req, res){
	console.log("Server has started...");
});