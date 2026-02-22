function showPatient(){
document.getElementById("patientLogin").style.display="block";
document.getElementById("clinicianLogin").style.display="none";
}

function showClinician(){
document.getElementById("patientLogin").style.display="none";
document.getElementById("clinicianLogin").style.display="block";
}

function patientLogin(){
localStorage.setItem("role","patient");
window.location="dashboard.html";
}

function clinicianLogin(){
localStorage.setItem("role","clinician");
window.location="clinician.html";
}

function logout(){
localStorage.removeItem("role");
window.location="index.html";
}
