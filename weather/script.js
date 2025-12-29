const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const cityNameEl = document.getElementById("cityName");
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("desc");
const humidityEl = document.getElementById("humidity");
const iconEl = document.querySelector("#weatherIcon .icon");
const containerEl = document.querySelector(".container");
const bodyEl = document.body;
const iconWrapper = document.getElementById("weatherIcon");

const API_KEY = "8a252f61c3bb5b844bf4473729978c30"; // free key

/* ---------------- PARTICLES ---------------- */
function createParticles(num){
    for(let i=0;i<num;i++){
        const p=document.createElement("div");
        p.classList.add("particle");
        const size=Math.random()*8+2;
        p.style.width=p.style.height=size+"px";
        p.style.background="rgba(255,255,255,0.5)";
        p.style.left=Math.random()*100+"%";
        p.style.top=Math.random()*100+"%";
        p.style.animationDuration=(Math.random()*20+10)+"s";
        bodyEl.appendChild(p);
    }
}
createParticles(50);

/* ---------------- WEATHER EFFECTS ---------------- */
function createRain(num){ removeRain(); for(let i=0;i<num;i++){ const drop=document.createElement("div"); drop.classList.add("rain-drop"); drop.style.left=Math.random()*100+"%"; drop.style.animationDuration=(Math.random()*1+0.5)+"s"; iconWrapper.appendChild(drop); } }
function removeRain(){ document.querySelectorAll(".rain-drop").forEach(d=>d.remove()); }

function createSnow(num){ removeSnow(); for(let i=0;i<num;i++){ const flake=document.createElement("div"); flake.classList.add("snowflake"); flake.style.left=Math.random()*100+"%"; flake.style.animationDuration=(Math.random()*5+5)+"s"; flake.style.width=flake.style.height=(Math.random()*6+4)+"px"; iconWrapper.appendChild(flake); } }
function removeSnow(){ document.querySelectorAll(".snowflake").forEach(f=>f.remove()); }

function createCloud(num){ removeClouds(); for(let i=0;i<num;i++){ const cloud=document.createElement("div"); cloud.classList.add("cloud"); cloud.style.top=Math.random()*30+"%"; cloud.style.width=(Math.random()*60+40)+"px"; cloud.style.height=(Math.random()*30+30)+"px"; cloud.style.animationDuration=(Math.random()*20+20)+"s"; iconWrapper.appendChild(cloud); } }
function removeClouds(){ document.querySelectorAll(".cloud").forEach(c=>c.remove()); }

function createLightning(){ const flash=document.createElement("div"); flash.classList.add("lightning"); iconWrapper.appendChild(flash); setTimeout(()=>flash.remove(),200); }

function createSun(){ removeSun(); const sun=document.createElement("div"); sun.classList.add("sun"); iconWrapper.appendChild(sun); }
function removeSun(){ document.querySelectorAll(".sun").forEach(s=>s.remove()); }

function createWind(num){ removeWind(); for(let i=0;i<num;i++){ const w=document.createElement("div"); w.classList.add("wind"); w.style.top=Math.random()*100+"%"; w.style.width=(Math.random()*50+30)+"px"; w.style.animationDuration=(Math.random()*2+2)+"s"; iconWrapper.appendChild(w); } }
function removeWind(){ document.querySelectorAll(".wind").forEach(w=>w.remove()); }

/* ---------------- WEATHER SOUNDS ---------------- */
let currentSound=null;
function playSound(weatherMain){ stopSound(); const w=weatherMain.toLowerCase(); let soundFile=""; if(w.includes("rain")||w.includes("drizzle")) soundFile="sounds/Rain Sounds   15 seconds soundtrack.m4a"; else if(w.includes("storm")||w.includes("thunder")) soundFile="sounds/Best thunder sound for sleep #thunder #rain #sleep.m4a"; else if(w.includes("wind")) soundFile="sounds/Wind Sound FX - Free download.m4a"; else if(w.includes("sun")) soundFile="sounds/Morning Bird Sounds _ Real Bird Chirping for Relaxation, Meditation, Focus & Deep Sleep.m4a"; else return; currentSound=new Audio(soundFile); currentSound.loop=true; currentSound.volume=0.4; currentSound.play(); }
function stopSound(){ if(currentSound){ currentSound.pause(); currentSound.currentTime=0; currentSound=null; } }

/* ---------------- GET WEATHER ---------------- */
async function getWeather(){
    const city=cityInput.value.trim();
    if(city===""){ alert("Enter city name bai"); return; }
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try{
        const res=await fetch(url);
        const data=await res.json();
        if(data.cod==="404"){ alert("City not found bai!"); return; }

        iconEl.style.opacity=0; containerEl.style.opacity=0.8;
        setTimeout(()=>{
            cityNameEl.innerText=data.name;
            tempEl.innerText="Temperature: "+data.main.temp+"°C";
            descEl.innerText="Condition: "+data.weather[0].description;
            humidityEl.innerText="Humidity: "+data.main.humidity+"%";

            updateIcon(data.weather[0].main);
            updateBackground(data.weather[0].main);

            weatherInfo.classList.remove("hidden");
            iconEl.style.opacity=1; containerEl.style.opacity=1;
        },300);

    }catch(error){ alert("Error loading weather bai"); console.error(error); }
}

/* ---------------- UPDATE ICON ---------------- */
function updateIcon(weatherMain){
    const w=weatherMain.toLowerCase();
    let imgUrl="";

    removeRain(); removeSnow(); removeClouds(); removeSun(); removeWind();

    if(w.includes("cloud")){ imgUrl="images/clouds-cloudporn-weather-lookup-158163.jpeg"; createCloud(3); }
    else if(w.includes("rain")||w.includes("drizzle")){ imgUrl="images/pexels-photo-125510.jpeg"; createRain(50); }
    else if(w.includes("snow")){ imgUrl="images/pexels-photo-688660.jpeg"; createSnow(50); }
    else if(w.includes("storm")||w.includes("thunder")){ imgUrl="images/pexels-photo-1162251.jpeg"; createLightning(); createRain(30); }
    else if(w.includes("sun")){ imgUrl="images/pexels-photo-912364.jpeg"; createSun(); }
    else if(w.includes("wind")){ imgUrl="images/pexels-photo-1030320.jpeg"; createWind(10); }
    else{ imgUrl="images/pexels-photo-1117403.jpeg"; createSun(); }

    iconEl.style.backgroundImage=`url('${imgUrl}')`;
    playSound(weatherMain);
}

/* ---------------- UPDATE BACKGROUND ---------------- */
function updateBackground(weatherMain){
    const w=weatherMain.toLowerCase();
    if(w.includes("sun")) bodyEl.style.background="linear-gradient(135deg, #ffe259, #ffa751)";
    else if(w.includes("cloud")) bodyEl.style.background="linear-gradient(135deg, #d7dde5, #a3b1c6)";
    else if(w.includes("rain")||w.includes("drizzle")) bodyEl.style.background="linear-gradient(135deg, #4e6e8e, #22303d)";
    else if(w.includes("snow")) bodyEl.style.background="linear-gradient(135deg, #e6f0fa, #b9d3eb)";
    else if(w.includes("storm")||w.includes("thunder")) bodyEl.style.background="linear-gradient(135deg, #3a3a3a, #0a0a0a)";
    else if(w.includes("wind")) bodyEl.style.background="linear-gradient(135deg, #89f7fe, #66a6ff)";
    else bodyEl.style.background="linear-gradient(135deg, #4facfe, #00f2fe)";
}
