const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// Mysql
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Colombia2019*',
  database : 'bd_actfijos'
});

// Rutas
app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

// Lista de activos
app.get('/activos', (req, res) => {
    const sql = 'select * from activos';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay datos');
        }
    });
    
    
   // res.send('Lista de activos');
});

// Lista de activos x ID
app.get('/activos/:id', (req, res) => {
    const { id } = req.params;
    const sql = `Select * from activos where id = ${id}`;
    
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay datos');
        }
    });

    //res.send('Lista de activos por ID');
});

// Adicionar un activo
app.post('/addActivo', (req, res) => {

    const sql = 'INSERT INTO activos SET ?';

    const activosObj = {
        nombre: req.body.nombre,
        placanueva: req.body.placanueva,
        marca: req.body.marca,
        serie: req.body.serie,
        estado: req.body.estado
    };

    connection.query(sql, activosObj, error => {
        if (error) throw error;
        res.send('Activo creado!');
    });
    //res.send('Nuevo activo');
});

// Actualizar un activo
app.put('/updateActivo/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, placanueva, marca, serie, estado } = req.body;
    const sql = `update activos set nombre ='${nombre}', placanueva ='${placanueva}', marca ='${marca}', serie ='${serie}', estado ='${estado}'
    where id = ${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Activo actualizado!');
    });
//    res.send('Actualizar activo');
});

// Eliminar un activo
app.delete('/deleteActivo/:id', (req, res) => {
    const { id } = req.params;
    const sql = `delete from activos where id = ${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Activo Eliminado!');
    });
    //    res.send('Eliminar activo');
});




// Verificar conexion
connection.connect(error => {
    if (error) throw error;
    console.log('BD arriba!');
});

app.listen(PORT, () => console.log('Server running'));