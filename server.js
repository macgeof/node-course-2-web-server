const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
  const now = new Date().toString();
  const log = `${now}: ${request.method} ${request.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log');
    }
  });
  console.log(log);
  next();
});

// app.use((request, response, next) => {
//   response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage:'Welcome to the home of me'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (request, response) => {
  response.render('projects.hbs', {
    pageTitle: 'Projects Page',
    welcomeMessage: 'Here is where my projects will live'
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage:'Bad request'
  });
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
