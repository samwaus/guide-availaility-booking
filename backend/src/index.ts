import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors'
import dotenv from 'dotenv';
import availabilityRouter from './routes/availability.routes'

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello</h1>');
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

//register the enpoints
app.use("/api/v1/availability", availabilityRouter);