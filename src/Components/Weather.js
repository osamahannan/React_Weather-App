import React, { useState, useEffect } from 'react';
const Weather = () => {

    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Lucknow");
    const [country, setCountry] = useState("IN");
    const [weather, setWeather] = useState("");
    

    useEffect(() => {
        const fetchApi = () => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=b76a25cbcbe3930a8f3fd74f611ebefc`
            fetch(url)
                .then(res => {
                    if(!res.ok)
                    {
                        console.log(res);
                        message=-1;
                    throw Error('No Data Found');
                    return res.json();
                })
                .then(data => {
                    setCity(data.main);
                    setCountry(data.sys);
                    setWeather(data.weather);
                })
                .catch(e => {
                    console.log(e.message);
                })
        }
        fetchApi();
    }, [search])

    const getDate = new Date();
    const currentDate = getDate.toDateString();

    return (
        <>
            <div className={(city!=null && weather) ? (weather[0].main==='Rain'? 'info rain':((city.temp < 16) ? 'info' : 'info cold')) : 'info'}>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search for a city..."
                        onChange={(event) => { setSearch(event.target.value) }} />
                </div>
                {!city ?
                    (
                        <>
                            <div className="not-found">No Data Found</div>
                        </>
                    ) :
                    (
                        <>
                            <div className="location-box">
                                <div className="location">{search.charAt(0).toUpperCase() + search.slice(1)}, {!country ? "" : country.country}</div>
                                <div className="date">{currentDate}</div>
                            </div>

                            <div className="weather-box">
                                <div className="temp">{Math.round(city.temp)}° Cel</div>
                                <div className="temp-minmax">Min : {city.temp_min}° Cel |  Max : {city.temp_max}° Cel</div>
                                <div className="weather">{!weather ? "" : weather[0].main}</div>
                            </div>
                        </>
                    )}
            </div>

        </>
    );
}

export default Weather;
