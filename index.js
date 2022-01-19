const fs      = require('fs')
const express = require('express');
const app     = express();
const PORT    = 3000;
/**
 * PRODUCTOS
 * */ 
 class Contenedor {
    constructor(archivo) {
        this.archivo = archivo
    }
    getById( id ) { // Recibe un id y devuelve el objeto con ese id, o null si no está.
        
        if (id!='') {
            // LLamo a todo la lista de productos
                const productos = fs.readFileSync( this.archivo, 'utf-8');
            // Valido 
                if (productos!='' && productos.length>0){
                    // Parse
                        let producto    = JSON.parse(productos);
                    // Consulta si existe registro con el valor de id pasado
                        if ( producto.some( item => item.id == id) ) {
                            if ( producto.filter( item => item.id == id) )
                                console.log( producto.filter( item => item.id == id) )
                        }
                        else
                            console.log( `No se encontro registro con el número de ID: ${id}, intente con otro.` )
                }
                else
                    console.log( "No posee productos" )
        }
        else
            console.log( "Para consultar algún registro, necesita pasar un número de registro" )

    }
    getAll() { // Objet[] - Devuelve un array con los objetos presentes en el archivo 
        
        let mensaje = ''
        try {
            mensaje = fs.readFileSync(this.archivo, 'utf-8');
            console.log( mensaje )
            // return mensaje
        }
        catch (err) {
            mensaje =`Error: ${err}`
            // return mensaje
        }
        return mensaje
    }
}
/**
* PRODUCTOS
* */ 

let controlador = new Contenedor('./productos.txt')
        // console.log(  (Math.round( (Math.random() * pro.length) ))  )

app.get('/', (req, res, next) => {
    res.send("Hola Coder !!")
})
// Trae todos los productos
    app.get('/productos', (req, res, next) => {
        res.send( controlador.getAll() )
    })
// Trae un prducto random
    app.get('/productoRandom', (req, res, next) => {
        //
        let pro     = JSON.parse(controlador.getAll());
        let rand    =  pro[( Math.floor( (Math.random() * pro.length) ))];  
        res.send(  `Producto random: ${ JSON.stringify(rand) }` )
    })
// SERVER
    const server = app.listen(PORT, () => {
        console.log(`Server on http://localhost:${PORT}`);
    });
// ON
    server.on("Error", error => console.error(error))



 