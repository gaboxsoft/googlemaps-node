const axios = require('axios');

const getCoordenadas = async(lugar) => {

    const urlGoogleMaps = `https://maps.googleapis.com/maps/api/geocode/json`;
    const gogleKey = `AIzaSyDLjrbE2L7He7z8iZvV_pk7e4Uvh2ocKTs`;
    const httpGetGoogleMaps = `${urlGoogleMaps}?address=${lugar}&key=${gogleKey}`;

    const httpResult = await axios.get(httpGetGoogleMaps);
    if (httpResult.data.status === 'ZERO_RESULTS') {
        throw new Error("No encontre lugar llamado: " + lugar);
    };
    const localizacion = httpResult.data.results[0];
    const coordenadas = {
        lugar: localizacion.formatted_address,
        lat: localizacion.geometry.location.lat,
        lng: localizacion.geometry.location.lng
    }
    return coordenadas;
}

module.exports = { getCoordenadas };