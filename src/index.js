import "./styles.css";
console.log("hello");

async function getWeather(location)
{
    const response=await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+location+'?unitGroup=metric&include=current&key=3F26HRSJQUHVH5X589RRYHJVR');
    const data=await response.json();
    return data;
}
function getRequiredData(data)
{
    const address=data.address;
    const description=data.description;
    const condition=data.currentConditions;
    const day=data.days[0];
    return {address,description,condition,day};
}
async function showData(location)
{
    const fullData=await getWeather(location);
    data=getRequiredData(fullData);
    displayResult(data);
    
}
function displayResult(data)
{
    const container=document.querySelector('.result');
    const fields=container.children;
    console.log(fields[0].children);
    fields[0].children[0].textContent=data.address;
    fields[1].children[0].textContent=data.day.datetime;
    fields[2].children[0].textContent=data.condition.conditions;
    fields[3].children[0].textContent=data.condition.temp+' °C';
    fields[4].children[0].textContent=data.condition.feelslike+' °C';
    fields[5].children[0].textContent=data.description;
    
}
function cToF(temp)
{
    return temp*9/5 +32;
}
function setTempUnit()
{
    const container=document.querySelector('.result');
    const fields=container.children;
    let temp1;
    let temp2;   
    if(unit===0)
    {
        temp1=cToF(data.condition.temp);
        temp2=cToF(data.condition.feelslike);

        fields[3].children[0].textContent=temp1+' °F';
        fields[4].children[0].textContent=temp2+' °F';
        unitBtn.textContent="get Celsius";
        unit=1;
    }
    else{
        temp1=data.condition.temp;
        temp2=data.condition.feelslike;
        fields[3].children[0].textContent=temp1+' °C';
        fields[4].children[0].textContent=temp2+' °C';
        unitBtn.textContent="get Fahrenheit";
        unit=0;
    }
}
//main
let data;
let unit=0;
showData('london');

const form=document.querySelector('form');
const searchBox=form.querySelector('input');
const searchBtn=form.querySelector('button');
const unitBtn=document.querySelector('.tempUnit');
console.log(unitBtn);
searchBtn.addEventListener('click',function(){
    const location=searchBox.value;
    if(location==="")
    {
        alert('put some location first');
    }
    else
    {
        showData(location);
    }
})
unitBtn.addEventListener('click',function(event)
{
    setTempUnit();
})