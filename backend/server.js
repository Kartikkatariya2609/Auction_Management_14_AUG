import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dco1xmksp",
  api_key: "382388921422672",
  api_secret: "bgJqvGqup2HVAGQDSeE_54NZd8s",
});

app.listen(5000, () => {
  console.log(`Server listening on port ${5000}`);
});
