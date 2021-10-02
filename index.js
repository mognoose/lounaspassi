const express = require('express')
const { exec } = require("child_process");
const bodyParser = require("body-parser")
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors')
const path = require("path");
const app = express()
const port = 3000

var corsOptions = {
  origin: "*"
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }));


const db_name = path.join(__dirname, "db", "lp.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'lp.db'");
});

// require('./db/setup.js')


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/stamps", (req, res) => {
  const sql = "SELECT * FROM stamps WHERE user = '"+req.query.user+"' AND restaurant = '"+req.query.restaurant+"'"
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(rows);
  });
});

app.get("/restaurants", (req, res) => {
  const sql = "SELECT * FROM restaurants WHERE name like '%"+req.query.q+"%' ORDER BY id;"
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(rows);
  });
});

app.get("/restaurant", (req, res) => {
  const sql = "SELECT * FROM restaurants WHERE id = '"+req.query.restaurant+"';"
  db.get(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(rows);
  });
});

app.get('/stamp/', (req, res) => {
  addStamp(req.query.restaurant, req.query.user)
  res.send('Stamp added '+req.query.user)
})

app.post('/clear/', (req, res) => {
  clearStamps(req.body.restaurant, req.body.user)
  res.send('cleared '+req.body.user)
})

app.post('/register', (req, res) => {
  console.log(req.body);
  res.send('created')
})

const addStamp = function(restaurant, user){
  const res = sql("INSERT INTO stamps (user, restaurant) VALUES('"+user+"', '"+restaurant+"');")
  console.log(res)
}

const clearStamps = function(restaurant, user){
  const res = sql("DELETE FROM stamps WHERE user = '"+user+"' AND restaurant = '"+restaurant+"';")
  console.log(res)
}

const getId = function(restaurant){
  console.log(restaurant);
  const sql = "SELECT id FROM restaurants WHERE token = '"+restaurant+"';"
  let res = db['all'](sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("GETID", rows);
    return rows
  });
  return res
}

const sql = function(sql){
  db.run(sql, err => {
    if (err) {
      console.error(err.message);
      return err.message
    }
    console.log("Success");
    return "success"
  });
}

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const io = require("socket.io")(server, {
  cors:{
    origins: ["*"],
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST",
        "Access-Control-Allow-Headers": "my-custom-header",
        "Access-Control-Allow-Credentials": true
      });
      res.end();
    }
  }
});

io.on('connection', socket => {
  console.log("SOCKET:", socket.id)
  io.emit('PING', {test: 'test'})

  socket.on('STAMPED', async data => {
    io.emit('PING', data)
  })

})
