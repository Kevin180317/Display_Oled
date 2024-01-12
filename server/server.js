// 1. Importa los módulos necesarios
const express = require('express');
const { exec } = require('child_process');

// 2. Crea una instancia de Express
const app = express();

// 3. Define una ruta GET en '/test'
app.get('/test', (req, res) => {
  // Ejecuta el comando de Bash
  exec('node C:\\Users\\Usuario\\OneDrive\\Escritorio\\oled\\server\\hola.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el comando: ${error.message}`);
      return res.status(500).send(`Error al ejecutar el comando: ${error.message}`);
    }
    if (stderr) {
      console.error(`Error en la salida del comando: ${stderr}`);
      return res.status(500).send(`Error en la salida del comando: ${stderr}`);
    }
    console.log(`Salida del comando: ${stdout}`);
    res.send(`Salida del comando: ${stdout}`);
  });
});

// 4. Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});