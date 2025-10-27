import "./styles.css";
console.log("hello");

async function getWeather(location)
{
    const response=await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+location+'?key=3F26HRSJQUHVH5X589RRYHJVR');
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
    fields[3].children[0].textContent=data.condition.temp+'°C';
    fields[4].children[0].textContent=data.condition.feelslike;
    fields[5].children[0].textContent=data.description;
    
}
//main
let data;
showData('london');

const form=document.querySelector('form');
const searchBox=form.querySelector('input');
const searchBtn=form.querySelector('button');
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