import "./styles.css";
console.log("hello");

class weatherApi
{
    constructor(){

    this.data;
    }

    async getWeather(location)
    {
        const response=await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+location+'?key=3F26HRSJQUHVH5X589RRYHJVR');
        const data=await response.json();
        return data;
    }

    getRequiredData(data)
    {
        const address=data.address;
        const description=data.description;
        const condition=data.currentConditions;
        const day=data.days[0];
        return {address,description,condition,day};
    }

    async showData(location)
    {
        const fullData=await this.getWeather(location);
        this.data=this.getRequiredData(fullData);
        console.log(this.data);
    }

}

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
class controlFlow
{
    constructor(){
        this.apiObject=new weatherApi();
        this.domItem=new domStuff();
        this.newWeather('london');
        searchBtn.addEventListener('click',()=>{
            const location=searchBox.value;
            if(location==="")
            {
                alert('put some location first');
            }
            else
            {
                this.newWeather(location);
            }
        })
        console.log(this.domItem);
        unitBtn.addEventListener('click',(event)=>
        {
            console.log(this.domItem);
            this.domItem.setTempUnit(this.domItem.unit,this.apiObject.data);
            this.domItem.unit=1-this.domItem.unit;
        })
    }
    async newWeather(location)
    {
        await this.apiObject.showData(location);
        this.domItem.displayResult(this.apiObject.data);
    }
    
}
//main
const form=document.querySelector('form');
const searchBox=form.querySelector('input');
const searchBtn=form.querySelector('button');
const unitBtn=document.querySelector('.tempUnit');
const controlItem=new controlFlow();
