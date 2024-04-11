//------------------------------POST (FETCH)---------------------------------//

let url = "http://localhost:3000/api/workexperience";

createData("MIUN", "Student", "Sundsvall", "2023-08-01", "2025-06-01");

async function createData(companyname, jobtitle, location, startdate, enddate) {
  let company = {
    companyname: companyname, 
    jobtitle: jobtitle,
    location: location,
    startdate: startdate,
    enddate: enddate
  }
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(company)
  })
  const data = await response.json();
  console.log(data)
}

