import "./styles.css";
console.log("hello");

async function getWeather()
{
    const response=await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=3F26HRSJQUHVH5X589RRYHJVR');
    console.log(response);
}
getWeather();