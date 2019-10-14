const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userAgent = require('express-useragent');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(userAgent.express());

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

app.use(express.static(`${__dirname}/public`));

app.get('/api/whoami', (req, res) => {
    res.json({
        'ip-address': req.ip,
        'language': req.acceptsLanguages()[0],
        'operating system': req.useragent.os,
        'browser': req.useragent.browser,
        'desktop?': req.useragent.isDesktop,
        'mobile?': req.useragent.isMobile,
    })
});

app.use((req, res) => {
    res.sendFile(`${__dirname}/views/404.html`, 404);
});

app.listen(port, console.log(`App is listening on port ${port}. This is great news!`));
