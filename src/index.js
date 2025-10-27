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
    const condition=data.currentConditions;
    const day=data.days[0];
    return {address,condition,day};
}
function showData(location)
{
    getWeather(location).then(function(fullData){
    data=getRequiredData(fullData);
    console.log(data.condition.conditions);
});
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