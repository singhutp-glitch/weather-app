import "./styles.css";
console.log("hello");

class domStuff
{
    constructor()
    {

    }
    unit=0;
    displayResult(data)
    {
        const container=document.querySelector('.result');
        const fields=container.children;
        console.log(fields[0].children);
        fields[0].children[0].textContent=data.address;
        fields[1].children[0].textContent=data.day.datetime;
        fields[2].children[0].textContent=data.condition.conditions;
        this.setTempUnit(1-this.unit,data);
        fields[5].children[0].textContent=data.description;
        console.log(data.description);
        
    }

    setTempUnit(unit,data)
    {
        const container=document.querySelector('.result');
        const fields=container.children;
        let temp1;
        let temp2;   
        if(unit===0)
        {
            temp1=data.condition.temp.toFixed(1);
            temp2=data.condition.feelslike.toFixed(1);

            fields[3].children[0].textContent=temp1+' °F';
            fields[4].children[0].textContent=temp2+' °F';
            unitBtn.textContent="get Celsius";
        }
        else{
            temp1=this.fToC(data.condition.temp).toFixed(1);
            temp2=this.fToC(data.condition.feelslike).toFixed(1);
            fields[3].children[0].textContent=temp1+' °C';
            fields[4].children[0].textContent=temp2+' °C';
            unitBtn.textContent="get Fahrenheit";
        }
    }
    fToC(temp)
    {
        return (temp-32)*5/9;
    }

}
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
async function showData(location,domItem)
{
    const fullData=await getWeather(location);
    data=getRequiredData(fullData);
    domItem.displayResult(data);
    
}

//main
let data;
const domItem=new domStuff();
showData('london',domItem);
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
        showData(location,domItem);
    }
})
unitBtn.addEventListener('click',function(event)
{
    domItem.setTempUnit(domItem.unit,data);
    domItem.unit=1-domItem.unit;
})