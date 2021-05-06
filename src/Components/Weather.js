import React, { useState, useEffect } from 'react';
const Weather = () => {

    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Lucknow");

    useEffect(() => {
        const fetchApi = () => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=b76a25cbcbe3930a8f3fd74f611ebefc`
            fetch(url)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setCity(data.main);
                })
        }
        fetchApi();
    }, [search])

    const getDate = new Date();
    const currentDate = getDate.toDateString();

    return (
        <>
            <div className="info">
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
                            <div className="location">{search}</div>
                            <div className="date">{currentDate}</div>
                        </div>

                        <div className="weather-box">
                            <div className="temp">{city.temp}° Cel</div>
                            <div className="temp-minmax">Min : {city.temp_min}° Cel |  Max : {city.temp_max}° Cel</div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Weather;
