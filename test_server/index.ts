import dotenv from "dotenv"

dotenv.config();

import express, {NextFunction, Request, Response} from 'express';
import bodyParser from "body-parser";
import env from "./lib/validateEnv";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req: Request, res: Response)  => {
  res.writeHead(200, { 'Content-Type': "application/vnd.orangeott.v1+json"});
  res.write(JSON.stringify(
    {
      "gS": "1.98.0-master_3fdbec36",
      "aS": "1.98.0-master_3fdbec36",
      "ahS": "1.40.0-master_3fdbec36",
      "iaS": "1.46.0-master_3fdbec36", 
      "nS": "1.46.0-master_3fdbec36",
      "lS": "1.27.0-master_3fdbec36", 
    }
  ));
  res.end();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error ocurred!";
  let statusCode = 500;
  res.status(statusCode).json({error: errorMessage});
});

app.listen(env.PORT, () => {
  return console.log(`Express is listening at http://localhost:${env.PORT}`);
});