const axios = require('axios');

const getLocalizacion = async(lugar) => {

    const url = `https://maps.googleapis.com/maps/api/geocode/json`;
    const key = `AIzaSyDLjrbE2L7He7z8iZvV_pk7e4Uvh2ocKTs`;

    const httpResult = await axios.get(`${url}?address=${lugar}&key=${key}`);
    if (httpResult.data.status === 'ZERO_RESULTS') {
        throw new Error("No encontre lugar llamado: " + lugar);
    };
    const datosLocalizacion = httpResult.data.results[0];
    const localizacion = {
        lugar: datosLocalizacion.formatted_address,
        lat: datosLocalizacion.geometry.location.lat,
        lng: datosLocalizacion.geometry.location.lng
    }
    return localizacion;
}

module.exports = { getLocalizacion };