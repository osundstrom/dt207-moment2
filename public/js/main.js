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


//------------------------------PUT (FETCH)---------------------------------//

let id = 4; 

editData("Editid4", "EditStudent", "EditSundsvall", "2099-01-01", "2100-01-01");

async function editData(companyname, jobtitle, location, startdate, enddate) {
  let company = {
    companyname: companyname, 
    jobtitle: jobtitle,
    location: location,
    startdate: startdate,
    enddate: enddate
  }
  
  const response = await fetch(`${url}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(company)
  })
  const data = await response.json();
  console.log(data)
}

//------------------------------DELETE (FETCH)---------------------------------//


deleteData(id);

  async function deleteData(id) {
    
    const response = await fetch(`${url}${id}`, {
      method: "DELETE",
    })

    const data = await response.json();
    console.log(data)
  }


