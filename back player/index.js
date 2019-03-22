'use strict';

const Hapi = require('hapi');
const fs = require('fs');
const inert = require('inert');
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


     server.register({
         register: require('inert')
     }, (err) =>{
        if (err){
            throw err
        }
     


    
    server.route({
        method: 'POST',
        path: '/uploads',
        handler: function (request, h) {

            console.log('post');
            
            return h.file('/uploads/sygnal.mp3');
        } 
        
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            console.log('hello');
            
            return 'Hello, world!';
        }
    });









server.route({
    method: 'GET',
    path: '/uploads/{sygnal}',
    handler:(request, h) => {
        file: '/uploads/sygnal.mp3';
        console.log('get song');
        return h.file('/uploads/sygnal.mp3');
        //return {files: request.params.sygnal };
    }  
})





    server.start();
    console.log(`Server running at: ${server.info.uri}`);


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
    });
});





/*
server.route({
    method: 'GET',
    path: '/uploads/{sygnal}',
    handler:(request, h) => {
        file: '/uploads/sygnal.mp3';
        console.log('get song');
        return h.file('/uploads/sygnal.mp3');
        //return {files: request.params.sygnal };
    }  
})

server.route({
    method: 'POST',
    path: '/uploads',
    handler:(request, h) => {
        
        const plik = request.params.upload
        file: plik ;
        console.log('post file');
        return {status: 'ok'};
    }
})
*/