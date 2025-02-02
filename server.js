db.tv_shows.find({ name: "Soon Premiere" })
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware для обработки JSON и URL-encoded данных
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Heroku App</title>
        </head>
        <body>
            <h1>Hello, World! Deployed with Heroku.</h1>
            <p>Enter your name:</p>
            <form action="/greet" method="post">
                <input type="text" name="name" placeholder="Your Name" />
                <button type="submit">Greet Me!</button>
            </form>
            <br/>
            <p> Add 2 numbers below: </p>
            <form action="/sum" method="get">
              <input type="text" name="a" placeholder="First number"/>
              <input type="text" name="b" placeholder="Second number"/>
              <button type="submit"> Sum it! </button>
            </form>
            <br/>
              <p> Get User by id </p>
            <form action="/user" method="get">
              <input type="text" name="id" placeholder="User Id"/>
                <button type="submit"> Get User </button>
            </form>
                <br/>
            <a href="/api/items"> Get API data! </a>
         <br/>
            <a href="/headers"> Get headers! </a>
                <br/>
            <form action="/data" method="post">
              <input type="text" name="name" placeholder="Name"/>
              <input type="text" name="age" placeholder="Age"/>
                 <button type="submit">Send Json</button>
            </form>

        </body>
        </html>
    `);
});

app.post('/greet', (req, res) => {
    const name = req.body.name;
    res.send(`<h1>Hello, ${name}!</h1><a href="/">Go Back</a>`);
});


app.get('/items/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    res.send(`Viewing item with ID: ${itemId}`);
});

// More detailed parameter processing
app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    if (isNaN(a) || isNaN(b)) {
      return res.status(400).send('Invalid parameters. Please provide numbers for a and b.');
    }

    res.send(`The sum of ${a} and ${b} is: ${a + b}`);
});

// Get user by id
app.get('/user',(req,res)=>{
  const userId = req.query.id;
  if(!userId){
    return res.status(400).send("Please provide user id!");
  }
   res.send(`Getting user with id : ${userId}`);
});

app.get('/api/items', (req, res) => {
  const items = [
    { id: 1, name: 'Item 1', description: 'Description of Item 1' },
    { id: 2, name: 'Item 2', description: 'Description of Item 2' },
    { id: 3, name: 'Item 3', description: 'Description of Item 3' }
  ];
  res.json(items);
});
// Get Headers
app.get('/headers', (req, res) => {
    const headers = req.headers;
    res.json(headers);
});
// Send Json data
app.post('/data',(req,res)=>{
  const name = req.body.name;
  const age = req.body.age;
    if(!name || !age){
       return res.status(400).send("Please provide name and age.")
    }
    res.status(201).json({ message: 'Data received', name:name, age:age});
});

// Catch 404
app.use((req, res) => {
    res.status(404).send("404: Sorry, the page you're looking for doesn't exist.");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
