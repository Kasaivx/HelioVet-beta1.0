import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB, disconnectDB,} from "./config/db.js";
import helmet from "helmet";
import patients from "./routes/patients.routes.js"
import auth from "./routes/auth.route.js"
import vetAppoint from"./routes/vetappointments.routes.js"
import medrec from "./routes/medrec.route.js"
import stock from "./routes/stock.routes.js"
// import all controllers

//data base stuff//

connectDB();
///database stuff//

// express stuff
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.disable("x-powered-by");
app.use(helmet());

app.use(express.json());


///APIroutes///middleware stuff///
app.use("/auth", auth);
app.use("/patient", patients );
app.use("/vetappointments",vetAppoint);
app.use("/medrec",medrec)
app.use("/stock",stock)

//hosting the server            ;ASDW
const PORT = 5001;
const server = app.listen(PORT, () => {
  console.log(`server raho ymshi fe ${PORT}`);
});
//handle unhandled promise rejections (db cnx errs)
process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
//handel uncuaght exseptions
process.on("uncaughtException", async (err) => {
  console.error("uncaught exception:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

//graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
console.log("ENV OK")
console.log("DATABASE_URL FULL =", process.env.DATABASE_URL);