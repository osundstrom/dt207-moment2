
//Express, sql, bodyParser
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const port = 3000;

