
//Importerar express,cors, kunna förstå json samt skapa express app.
//COrs
const express = require("express"); 
const cors = require("cors"); //CORS (cross orgin resource sharing) så vi kan hämta informationen från webbsidan.
const app = express(); 
const port = 3000; //Port
app.use(express.json()); 
const mysql = require("mysql");  //mysql
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



//Skapa table workexperience med auto increment på id
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
    connection.query("INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate) VALUES (?, ?, ?, ?, ?)", //SQL
    ["Elgiganten", "Lagermedarbetare", "Sundsvall", "2019-02-01", "2022-03-01"], (err, results) => {
    if (err) {
        console.error("Failed insert " + err);
        return;
    }
    console.log("table added id:1");
        });
    

     //Insert till tabellen
     connection.query("INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate) VALUES (?, ?, ?, ?, ?)", //SQL
     ["Siba", "Kassamedarbetare", "Stockholm", "2017-01-01", "2019-01-01"], (err, results) => {
     if (err) {
         console.error("Failed insert " + err);
         return;
     }
     console.log("table added id:2");
         });


     //Insert till tabellen
     connection.query("INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate) VALUES (?, ?, ?, ?, ?)", //SQL
     ["Power", "Säljare", "Oslo", "2015-02-01", "2016-11-01"], (err, results) => {
     if (err) {
         console.error("Failed insert " + err);
         return;
     }
     console.log("table added id:3");
         });



     //Insert till tabellen
     connection.query("INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate) VALUES (?, ?, ?, ?, ?)", //SQL
     ["Telia", "Servicemedarbetare", "Sundsvall", "2014-02-01", "2015-03-01"], (err, results) => {
     if (err) {
         console.error("Failed insert " + err);
         return;
     }
     console.log("table added id:4");
         });


//---------------------------------------------------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//


//---------------------GET------------------------------------------//

//Meddelnade vid API startsida, alltså bara /API
app.get("/api", (request, response) => {
    response.json({message: "Välkommen till min API"}); 
});


//Hämtar allt (allt i workexperience)
app.get("/api/workexperience", (request, response) => {
    connection.query("SELECT * FROM workexperience", (err, results) => {
        if (err) {
            console.log(err); //Om error
            return;
        }
        
        //Datum ska ej ha tidstämpel, blev ex "T23:00:00.000Z" efter varje datum
        results.forEach(result => { //kollar varje
            result.startdate = new Date(result.startdate).toLocaleDateString();//Formatterar datum för start
            result.enddate = new Date(result.enddate).toLocaleDateString(); //formatterar datum för slut
        });

        if (results.length === 0) { //om det finnns 0 results
            response.status(404).json({message: "No tables found"});//Skreivs detta ut
        }
        else {response.json(results);} //Returnerar reusltaten (allt i workexperience)
    
})});

//Hämtar alla companynames
app.get("/api/companyname", (request, response) => {
    connection.query("SELECT companyname FROM workexperience", (err, results) => { //SQL
        if (err) { //om error
            console.log(err);
            return;
        }

        // Gör en array av endast companynames
        const companyNames = results.map(result => result.companyname);

        // Returnera arrayen som json
        if (companyNames.length === 0) { //Om det inte finns något i companynames
            response.status(404).json({message: "No companynames found"}); //skrivs denna ut
        }
        else {response.json(companyNames);}
        
    })
});




//-------------------------POST--------------------------------------//

//Skapar en POST
app.post("/api/workexperience", (request, response) => {

        //Hämtar all info via request.body o döper dem
        let companynameData = request.body.companyname;
        let jobtitleData = request.body.jobtitle;
        let locationData = request.body.location;
        let startdateData = request.body.startdate;
        let enddateData = request.body.enddate;

        //Inget får vara tomt. 
        if (!companynameData || !jobtitleData || !locationData || !startdateData || !enddateData) {
            response.status(400).json({ error: "You have to fill in all fields" }); //Om tomt
            return;
        }

        //Lägga till ny i workexperience
        connection.query("INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate) VALUES (?, ?, ?, ?, ?)", //SQL
            [companynameData, jobtitleData, locationData, startdateData, enddateData],
            (err, results) => {
                if (err) {
                    console.error("Error inserting: ", err);

                    return;
                }

                response.json({message: "workexperience added"}); //Uppdaterat så ej results skickas tilbaka utan ett meddelande.
            }
        );
    })


//----------------------------PUT-----------------------------------//


//skapar en PUT
app.put("/api/workexperience:id", (request, response) => { 
    let idData = request.params.id; //Parametern id, från url
    //console.log(idData)

    //Hämtar all info via request.body o döper dem
    let companynameData = request.body.companyname;
    let jobtitleData = request.body.jobtitle;
    let locationData = request.body.location;
    let startdateData = request.body.startdate;
    let enddateData = request.body.enddate;

        //om någon är tom /ej ifylld
    if (!companynameData || !jobtitleData || !locationData || !startdateData || !enddateData) {
        response.status(400).json({message: "You have to fill in all fields"}); //Skickar detta om if stämmer
        return;
    }

    //Uppdatera tabell
    connection.query("UPDATE workexperience SET companyname = ?, jobtitle = ?, location = ?, startdate = ?, enddate = ? WHERE id = ?", //SQL
    [companynameData, jobtitleData, locationData, startdateData, enddateData, idData],
    (err, results) => {
        if (err) {
            console.log("Failed update: ", err);
            return;
        }

            console.log(results);
            response.json({message: "workexperience updated"}) //Skickar detta om tabellen uppdateras

    })

})

//-------------------------DELETE--------------------------------------//

//Skapar DELETE
app.delete("/api/workexperience:id", (request, response) => {
    let idData = request.params.id; //id från url

    connection.query("DELETE FROM workexperience WHERE id = ?", //SQL
    [idData], (err, results) => {
        if(err) {
            response.status(400).json({message: "failed delete: ", err}); //Om error
            return;
        }
        console.log(results);
        response.json({message: "workexperience deleted"}) //om den raderas
    }) 
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
