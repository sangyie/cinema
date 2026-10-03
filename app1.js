const express = require('express');
const path = require('node:path');
const app = express();
const port = 8080;
// Publicar archivos estáticos
app.use(express.static('public'));
// Aquí se agregará la ruta que devuelve JSON
// Página 404: siempre al final
app.use((req, res) => {
 res.status(404).sendFile(
 path.join(__dirname, 'public', '404.html')
 );
});
app.listen(port, () => {
 console.log(`Servidor iniciado en http://localhost:${port}`);
});
