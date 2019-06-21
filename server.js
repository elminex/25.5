const express = require('express');
const app = express();

app.use(express.static('assets'));

app.use((req, res, next) => {
    console.log('Hej, jestem pośrednikiem między żądaniem a odpowiedzią!');
    next();
});

app.get('/', (req,res) => {
    console.log('Otrzymałem żądanie GET');
    res.sendFile('/index.html');
});

app.get('/userform', (req, res) => {
    const response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    res.json(response);
});

app.use('/store', (req, res, next) => {
    console.log('Hej, jestem pośrednikiem przy żądaniu do /store');
    next();
})

app.get('/store', (req, res) => {
    res.send('To jest sklep');
});

const server = app.listen(3000, 'localhost', () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Przykładowa aplikacja nasłuchuje na http://${host}:${port}`);
});