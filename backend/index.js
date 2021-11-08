const express = require('express');
const cors = require('cors');

const animesRouter = require('./routes/animes.routes');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/animes', animesRouter);

const port = 3000;
app.listen(port, () =>
    console.log(`Servidor rodando em http://localhost:${port}`));