//------------------------------POST (FETCH)---------------------------------//

let url = "http://localhost:3000/api/workexperience"; //skapare url

createData("MIUN", "Student", "Sundsvall", "2023-08-01", "2025-06-01"); //Kallar funktion med parametrar som behövs
 
//funktion för att skapa nytt (POST)
async function createData(companyname, jobtitle, location, startdate, enddate) {
  
  //skapar objektet company som sätts efter de inmatade paramertrarna
  let company = {
    companyname: companyname, 
    jobtitle: jobtitle,
    location: location,
    startdate: startdate,
    enddate: enddate
  }
  
  const response = await fetch(url, { //skickat fet mot url
    method: "POST", //POST förfrågan
    headers: {
      "Content-Type": "application/json", //JSON fromat
    },

    body: JSON.stringify(company) //Gör om company till json
  })
  const data = await response.json(); //Väntar på json
  console.log(data) 
}


//------------------------------PUT (FETCH)---------------------------------//

let id = 4; //väljer id

editData("Editid4", "EditStudent", "EditSundsvall", "2099-01-01", "2100-01-01"); //Kallar funktion med parametrar som behövs

//Funktion för att redigera/ändra data till ett visst id
async function editData(companyname, jobtitle, location, startdate, enddate) { 
  
  //skapar objektet company som sätts efter de inmatade paramertrarna
  let company = {
    companyname: companyname, 
    jobtitle: jobtitle,
    location: location,
    startdate: startdate,
    enddate: enddate
  }
  
  const response = await fetch(`${url}${id}`, { //url med id.
    method: "PUT", //PUT Förfrågan
    headers: {
      "Content-Type": "application/json", //JSON format
    },

    body: JSON.stringify(company) //Omvandlar till json
  })
  const data = await response.json(); 

  console.log(data)
}

//------------------------------DELETE (FETCH)---------------------------------//


deleteData(id);//kallar funktion med id

  async function deleteData(id) { //Funtktion för att radera
    
    const response = await fetch(`${url}${id}`, { //fetch url med id
      method: "DELETE", //delete förfrågan
    })
    const data = await response.json();//Väntar till json
    console.log(data)
  }


