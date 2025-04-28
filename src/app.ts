import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { StudentRoutes } from './app/Modules/student/student.route';
const app: Application = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());

app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

// app.post('/gotdata', (req:Request, res:Response)=>{
//   res.send('got data')
// })

export default app;
