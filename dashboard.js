const KEY="bp_readings";

function classify(sys,dia){
if(sys>=180||dia>=120)return["CRISIS","risk-high"];
if(sys>=140||dia>=90)return["HIGH","risk-high"];
if(sys>=130||dia>=80)return["ELEVATED","risk-elevated"];
return["NORMAL","risk-normal"];
}

function load(){
return JSON.parse(localStorage.getItem(KEY)||"[]");
}

function save(data){
localStorage.setItem(KEY,JSON.stringify(data));
}

function addReading(){
let sys=Number(document.getElementById("sys").value);
let dia=Number(document.getElementById("dia").value);
if(!sys||!dia)return;

let data=load();
data.unshift({sys,dia,time:Date.now()});
save(data);
render();
}

function render(){
let data=load();
let latest=data[0];

if(latest){
let cls=classify(latest.sys,latest.dia);
document.getElementById("latestBP").innerText=`${latest.sys}/${latest.dia}`;
document.getElementById("riskLevel").innerText=cls[0];
document.getElementById("riskLevel").className=cls[1];
}

let list=document.getElementById("readingList");
list.innerHTML=data.map(r=>`${r.sys}/${r.dia}`).join("<br>");

drawChart(data);
}

let chart;

function drawChart(data){
if(!data.length)return;
let ctx=document.getElementById("bpChart");

if(chart)chart.destroy();

chart=new Chart(ctx,{
type:"line",
data:{
labels:data.map(r=>new Date(r.time).toLocaleDateString()),
datasets:[
{label:"Systolic",data:data.map(r=>r.sys)},
{label:"Diastolic",data:data.map(r=>r.dia)}
]
}
});
}

function connectSpecialist(){
alert("Connecting you to a specialist...");
}

render();
