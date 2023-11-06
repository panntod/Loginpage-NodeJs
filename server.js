const express = require("express");
const session = require("express-session");
const app = express();
const PORT = 9090;

const routes = require("./routes/route"); // Mungkin Anda perlu menyesuaikan path ini.
const db = require("./config/database"); // Import konfigurasi database

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/assets"));

app.use("/", routes); // Menggunakan rute yang sudah Anda buat sebelumnya.

db.connect((err) => {
  if (err) {
    console.log("Can't connect to database" + "\n" + err.message);
    return;
  }
  console.log("Database is connected");
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
