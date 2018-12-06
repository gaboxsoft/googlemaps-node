const fs = require('fs');
const localizacion = require('./googlemaps/googlemaps');

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
console.log(argv.lugar)

const lugar = argv.lugar ? argv.lugar : encodeURI("Tetitla Otzolotepec México");
localizacion.getLocalizacion(lugar)
    .then(loc => {
        console.log('Dirección =>> ', loc.lugar);
        console.log('latitud=>> ', loc.lat);
        console.log('longitud=>> ', loc.lng);
    })
    .catch(e => console.log(e));



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