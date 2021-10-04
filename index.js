const express = require('express')
const cors = require('cors')
const path = require("path");
const bcrypt = require('bcrypt');
const app = express()
const port = 3000

var corsOptions = {
  origin: "*"
}

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

require("./app/routes/user.routes")(app);
require("./app/routes/restaurant.routes")(app);
require("./app/routes/stamp.routes")(app);
require("./app/routes/favorite.routes")(app);

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
