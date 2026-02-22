function load(){
return JSON.parse(localStorage.getItem("bp_readings")||"[]");
}

function classify(sys,dia){
if(sys>=180||dia>=120)return"CRISIS";
if(sys>=140||dia>=90)return"HIGH";
if(sys>=130||dia>=80)return"ELEVATED";
return"NORMAL";
}

function render(){
let data=load();
let container=document.getElementById("patients");

container.innerHTML=data.map(r=>{
let risk=classify(r.sys,r.dia);
return `<div>
<h3>${r.sys}/${r.dia}</h3>
<p>${risk}</p>
</div>`;
}).join("");
}

render();
