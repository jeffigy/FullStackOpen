const mongoose = require("mongoose");
const app = require("./app");
const { PORT } = require("./config/env.config");

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`App is running @ port ${PORT}`);
  });
});
