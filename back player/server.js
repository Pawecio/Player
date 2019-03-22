'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const fs = require('fs');
const randomize = require('randomatic')
const path = require('path');

const server = Hapi.server({
    port: 3001,
    host: 'localhost',
    routes: {
        cors: {origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        },        
        
    },
});

const handleFileUpload = file => {
    return new Promise((resolve, reject) => {
        const filename = randomize('Aa0',16);
        fs.writeFile(__dirname + '/files/' + filename + '.mp3', file, err => {
         if (err) {
          reject(err)
         }
         resolve({ message: 'Upload successfully!' })
         console.log('koniec');
      })
    })
   }


const start = async () => {

    await server.register(require('inert'));

    server.route({
        method: 'POST',
        path: '/uploads',
        config:{  
        handler: async (req, h) => {
            console.log('post');
            const { payload } = req 
            const response = handleFileUpload(payload.song);
            //console.log(song);

            return response
            
        },
            payload:{
                maxBytes: 1048576,
                output: 'stream',
                parse: true,
            }
        }
        
    })

    server.route({
        method: 'GET',
        path: '/{name}',
        handler: (req, h) => {
            conosole.log('');
        }
    })

    await server.start();

    console.log('Server running at:', server.info.uri);
};

start();