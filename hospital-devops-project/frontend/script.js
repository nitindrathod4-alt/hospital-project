document.getElementById("patientForm").addEventListener("submit", async (e)=>{
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    department: document.getElementById("department").value
  };

  await fetch("http://localhost:5000/api/patient",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  });

  alert("Patient Data Saved");
});
