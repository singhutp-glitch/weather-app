import "./styles.css";
console.log("hello");

async function getWeather()
{
    const response=await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=3F26HRSJQUHVH5X589RRYHJVR');
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
//main
let data;
getWeather().then(function(fullData){
    data=getRequiredData(fullData);
    console.log(data.condition);
});
const form=document.querySelector('form');
const searchBox=form.querySelector('input');
const searchBtn=form.querySelector('button');
searchBtn.addEventListener('click',function(){
    console.log(searchBox.value);
})