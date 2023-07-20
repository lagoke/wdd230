//Lazy loading
const images = document.querySelectorAll("[data-src]");


function preloadImage(img) {
    const src= img.getAttribute("data-src");
    if (!src) {
        return;
    }

    img.src = src;
}
const imgOptions = {
    threshold: 1,
    rootMargin: "0px 0px 300px 0px"
};

const imgObserver = new IntersectionObserver((entries,
     imgObserver) => {
       entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
       })
}, imgOptions);

images.forEach(image => {
    imgObserver.observe(image);
});

//End - Lazy Loading







//Hamburger button script
function toggleMenu() {
  const primaryNav = document.querySelector("#primary-navigation");
  const hamburgerButton = document.querySelector("#hamburgerButton");

  if (primaryNav) {
      primaryNav.classList.toggle("open");
  }
  if (hamburgerButton) {
      hamburgerButton.classList.toggle("open");
  }
}

const x = document.querySelector("#hamburgerButton");
if (x) {
  x.onclick = toggleMenu;
}
//End of Hamburger button script



// Last Modified Date script
const el = document.querySelector("#currently");
if (el) {
  el.innerHTML = "Last Modified Date: " + document.lastModified;
}

const datefield = document.querySelector(".currentDate");

const now = new Date();

const fulldateUK = new Intl.DateTimeFormat("en-UK", {
  dateStyle: "full"
}).format(now);

if (datefield) {
  datefield.innerHTML = `${fulldateUK}`;
}

// End of Last Modified Date script




// WEATHER FORECAST SCRIPT
const url = "https://api.openweathermap.org/data/3.0/onecall?lat=33.1581&lon=-117.3506&exclude=minutely,hourly,alerts&appid=c2aca1c7991c8e388fe1ab63e0fe2cc9&units=imperial";
let WeatherIcon = document.querySelector('#weathericon');
let CurrentTemp = document.querySelector('#temp');
let WeatherDescription = document.querySelector('#weather-description');
let WeatherHumidity = document.querySelector('#humidity-value');
let FirstDayTemp = document.querySelector('#firstdaytemp');
let SecondDayTemp = document.querySelector('#seconddaytemp');
let ThirdDayTemp = document.querySelector('#thirddaytemp');


function getDayName(date) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
}

function formatDate(date) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${monthNames[date.getMonth()]} ${date.getDate()}`;
}


function getNextNDays(n) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    days.push({name: getDayName(nextDay), date: formatDate(nextDay)});
  }
  return days;
}

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      //console.log(data);
      displayResult(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

function displayResult(data) {
  const nextThreeDays = getNextNDays(4);

  if (WeatherHumidity) {
    WeatherHumidity.textContent = data.current.humidity;
  }

  if (CurrentTemp) {
    CurrentTemp.textContent = `${nextThreeDays[0].name}, ${nextThreeDays[0].date}: ${data.current.temp}°F`;
  }

  if (FirstDayTemp) {
    const temp = data.daily[1].temp.day.toFixed(0);
   FirstDayTemp.textContent = `${nextThreeDays[1].name} ,${nextThreeDays[1].date}: ${temp}°F`;
  }

  if (SecondDayTemp) {
    const temp = data.daily[2].temp.day.toFixed(0);
    SecondDayTemp.textContent = `${nextThreeDays[2].name} ,${nextThreeDays[2].date}: ${temp}°F`;
  }

  if (ThirdDayTemp) {
   const temp = data.daily[3].temp.day.toFixed(0);
   ThirdDayTemp.textContent = `${nextThreeDays[3].name} ,${nextThreeDays[3].date}: ${temp}°F`;
  }

  if (WeatherIcon && WeatherDescription) {
    const srcicon = `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;
    const description = data.current.weather[0].description;

    WeatherIcon.setAttribute('src', srcicon);
    WeatherIcon.setAttribute('alt', description);
    WeatherDescription.textContent = description;
  }
}





