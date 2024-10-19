

  const getCurrentDay = () => {
    let currentTime = new Date();
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekday[currentTime.getDay()];
  }

  const getCurrentTime = () => {
    var months=["Jan","Feb","Mar","Apr","May","jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    var now = new Date();
    var month = months[now.getMonth() + 1];
    var dates = now.getDate();
    var year = now.getFullYear();
    let hours = now.getHours();
    let min = now.getMinutes();
      //setting logo according to time
    if(hours<4 || hours>21)
    {
        document.getElementById("weather").innerHTML=`<i class="fa-solid fa-moon"></i>`;
        document.getElementById("box").style.backgroundImage=`url(night.jpg)`;
        document.getElementById("box").style.color=`white`;

    }
  
    flag = "AM";
    if (hours > 11) {
      flag = "PM";
      if (hours > 12) {
        hours = hours - 12;
      }
    }
    if (min < 10) {
      min = "0" + min;
    }
    return `${dates} ${month} | ${hours}:${min} ${flag}`;
  };


async function getWeather()
{
    document.getElementById("reload").style.display=`block`;
    document.getElementById("box").style.filter=`blur(2px)`;

    var location;
    location=document.getElementById("city").value || "kanpur";
    document.getElementById("cityname").textContent=location;
    document.getElementById("location").style.display=`block`;
    var API_key="write your API key here";

    //console.log(location)
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key={API_key}&contentType=json`;

        // Fetch weather data
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON response
        let data = await response.json();
        document.getElementById("reload").style.display=`none`;
        document.getElementById("box").style.filter=`blur(0px)`;
      

        // Extract temperature in Celsius
        let temp = data.days[0].temp;

        // Display the temperature
        document.getElementById("temp").innerText = `${temp} ° C`;

        //displaying minimum and maximum temperature
        document.getElementById("min_max").innerText=data.days[0].tempmin + " | "+ data.days[0].tempmax;

        //displaying date and time
        //console.log(getCurrentDay());
        //console.log(getCurrentTime());
        document.getElementById("date").innerText=getCurrentTime();



}

