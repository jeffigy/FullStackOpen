import { PORT } from "./config/env.config.mjs";
import app from "./app.mjs";

app.listen(PORT, () => {
  console.log(`App is running @ port ${PORT}`);
});
