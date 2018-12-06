const fs = require('fs');
const localizacionGoogleMaps = require('./googlemaps/googlemaps');
const climaFromCoords = require('./clima/climaFromCoords');
const colors = require('colors');

const argv = require('yargs')
    .options({
        lugar: {
            demandOption: false,
            alias: 'l',
            desc: 'Lugar de cualquier parte del mundo.'
        }
    })
    .help()
    .argv;

console.log('=========' + argv.lugar + "===============\n");

const lugar = encodeURI(argv.lugar ? argv.lugar : "Tetitla Otzolotepec México");


const getClima = async(lugar) => {
    try {

        const coordenadas = await localizacionGoogleMaps.getCoordenadas(lugar);
        let result = `Lugar: `.green + coordenadas.lugar.red + `\n` +
            `latitud: `.green + coordenadas.lat + `\n` +
            `longitud: `.green + coordenadas.lng + `\n`;

        const clima = await climaFromCoords.get(coordenadas.lat, coordenadas.lng);

        return result +=
            `La temperatura en ${clima.lugar} es de ${clima.temperatura} grados centígrados`.red + `\n`;

    } catch (error) {
        return (`No pude encontrar el clima para ` + lugar);
    }
}


getClima(lugar)
    .then(msg => console.log(msg))
    .catch(e => clg(e));





// const axios = require('axios');

// let ubicacion = argv.lugar ? argv.lugar : encodeURI("Tetitla Otzolotepec México");
// let url = `https://maps.googleapis.com/maps/api/geocode/json`;
// let key = `AIzaSyDLjrbE2L7He7z8iZvV_pk7e4Uvh2ocKTs`;
// axios.get(`${url}?address=${ubicacion}&key=${key}`)
//     .then(resp => {
//         // console.log(JSON.stringify(resp.data, undefined, 2), resp.status);
//         // fs.writeFile("data.json", JSON.stringify(resp.data, undefined, 2),
//         //     err => console.log(err));
//         // console.log('[0]=>> ', resp.data);
//         // console.log('======================================================');
//         let localizacion = resp.data.results[0];
//         console.log('formatted_address=>> ', localizacion.formatted_address);
//         console.log('geometry.location=>> ', localizacion.geometry.location);
//         console.log('geometry.location.latitud=>> ', localizacion.geometry.location.lat);
//         console.log('geometry.location.longitud=>> ', localizacion.geometry.location.lng);
//     })
//     .catch(err => console.log(`Error!! ${err}`));