

const express = require("express");

const cors = require("cors");



const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());

const mysql = require("mysql");


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));

//app.set("view engine", "ejs"); //View engine ejs (html typ)
//app.use(express.static("public")); //Statiska filer (css typ)

app.use(cors());
//---------------------------------------------------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//

//ansluta till mysql
const connection = mysql.createConnection({
    host: "localhost",
    user: "moment2",
    password: "pass",
    database: "moment2"
});


//Om man lyckas ansluta eller inte
connection.connect((err) => {
    if (err) {
        console.error("Connection failed " + err);
        return;
    }
    console.log("Connection worked")
});

//---------------------------------------------------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//

//Ta bort table om de redan finns
connection.query("DROP TABLE IF EXISTS workexperience;", (err) => {
    if(err) throw err;
    console.log("Table dropped");
});



//Skapa table workexperience
connection.query(`CREATE TABLE workexperience (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    companyname VARCHAR(200),
    jobtitle  VARCHAR(200),
    location  VARCHAR(200),
    startdate DATE, 
    enddate DATE )` , 
    (err, table) => {
        if(err) throw err;

        console.log("Table created " + table);
    });


     //Insert till tabellen
    connection.query("INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate) VALUES (?, ?, ?, ?, ?)", 
    ["Elgiganten", "Lagermedarbetare", "Sundsvall", "2019-02-01", "2022-03-01"], (err, results) => {
    if (err) {
        console.error("Failed insert " + err);
        return;
    }
    console.table( results );
        });
    

     //Insert till tabellen
     connection.query("INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate) VALUES (?, ?, ?, ?, ?)", 
     ["Siba", "Kassamedarbetare", "Stockholm", "2017-01-01", "2019-01-01"], (err, results) => {
     if (err) {
         console.error("Failed insert " + err);
         return;
     }
     console.table( results );
         });


     //Insert till tabellen
     connection.query("INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate) VALUES (?, ?, ?, ?, ?)", 
     ["Power", "Säljare", "Oslo", "2015-02-01", "2016-11-01"], (err, results) => {
     if (err) {
         console.error("Failed insert " + err);
         return;
     }
     console.table( results );
         });



     //Insert till tabellen
     connection.query("INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate) VALUES (?, ?, ?, ?, ?)", 
     ["Telia", "Servicemedarbetare", "Sundsvall", "2014-02-01", "2015-03-01"], (err, results) => {
     if (err) {
         console.error("Failed insert " + err);
         return;
     }
     console.table( results );
         });


//---------------------------------------------------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//


//---------------------GET------------------------------------------//

//Meddelnade vid API startsida
app.get("/api", (request, response) => {
    response.json({message: "Välkommen till min API"});
});


//Hämtar allt
app.get("/api/workexperience", (request, response) => {
    connection.query("SELECT * FROM workexperience", (err, results) => {
        if (err) {
            console.log("Error to get api: " + err)
            return;
        }
        
        //Datum ska ej ha tidstämpel, blev ex "T23:00:00.000Z" efter varje datum
        results.forEach(result => {
            result.startdate = new Date(result.startdate).toLocaleDateString();//Formatterar
            result.enddate = new Date(result.enddate).toLocaleDateString(); //formatterar
        });

        if (results.length === 0) {
            response.status(404).json({message: "No tables found"});
        }
        else {response.json(results);} //Returnerar reusltaten (allt i workexperience)
    
})});

//Hämtar alla companynames
app.get("/api/companyname", (request, response) => {
    connection.query("SELECT companyname FROM workexperience", (err, results) => {
        if (err) {
            console.log("Error to get api: " + err)
            return;
        }

        // Gör en array av endast companynames
        const companyNames = results.map(result => result.companyname);

        // Returnera arrayen som json
        if (companyNames.length === 0) {
            response.status(404).json({message: "No companynames found"});
        }
        else {response.json(companyNames);}
        
    })
});




//-------------------------POST--------------------------------------//

app.post("/api/workexperience", (request, response) => {

        let companynameData = request.body.companyname;
        let jobtitleData = request.body.jobtitle;
        let locationData = request.body.location;
        let startdateData = request.body.startdate;
        let enddateData = request.body.enddate;

        //Inget får vara tomt. 
        if (!companynameData || !jobtitleData || !locationData || !startdateData || !enddateData) {
            response.status(400).json({ error: "You have to fill in all fields" });
            return;
        }

        //Lägga till
        connection.query("INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate) VALUES (?, ?, ?, ?, ?)",
            [companynameData, jobtitleData, locationData, startdateData, enddateData],
            (err, results) => {
                if (err) {
                    console.error("Error inserting: ", err);

                    return;
                }

                response.json({results});
            }
        );
    })









//---------------------------------------------------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//


//Starta
app.listen(port, () => {
    console.log("Server started on: " + port)
});





//---------------------------------------------------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//
