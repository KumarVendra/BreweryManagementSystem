const mongoose = require("mongoose");
const { app } = require("./server");

mongoose.connect("mongodb://localhost:27017/cafeDB")
  .then(() => {
    console.log("Mongo connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch(err => console.error(err));
