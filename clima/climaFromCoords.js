const axios = require('axios');
const fs = require('fs');


const get = async(latitud, longitud) => {

    const apiKey = '6fd04c6fd957148792d8d270ff37a29b';
    const url = 'http://api.openweathermap.org/data/2.5/weather';
    const unidad = 'metric';
    const httpGetClima = `${url}?lat=${latitud}&lon=${longitud}&units=${unidad}&appid=${apiKey}`;
    const httpResult = await axios.get(httpGetClima);
    if (httpResult.data.error) {
        console.log('error en algo==>', httpResult.data);
        throw new Error("No encontre clima: " + httpResult.data.message);
    };
    const datosClima = httpResult.data;
    const clima = {
        lugar: datosClima.name,
        temperatura: datosClima.main.temp,
    }
    return clima;


}

// const getLocalizacion = async(lugar) => {

//     const url = `https://maps.googleapis.com/maps/api/geocode/json`;
//     const key = `AIzaSyDLjrbE2L7He7z8iZvV_pk7e4Uvh2ocKTs`;

//     const httpResult = await axios.get(`${url}?address=${lugar}&key=${key}`);
//     if (httpResult.data.status === 'ZERO_RESULTS') {
//         throw new Error("No encontre lugar llamado: " + lugar);
//     };
//     const datosLocalizacion = httpResult.data.results[0];
//     const localizacion = {
//         lugar: datosLocalizacion.formatted_address,
//         lat: datosLocalizacion.geometry.location.lat,
//         lng: datosLocalizacion.geometry.location.lng
//     }
//     return localizacion;
// }

module.exports = {get };