import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notFound';
import router from './app/routes';



const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(bodyParser.json());

app.use('/api/v1', router);
// app.use('/api/v1/users', UserRoutes);

const test = async(req: Request, res: Response) => {
  const a= 10;
  res.send(a)
  //  Promise.reject();
}

app.get('/', test);

app.use(globalErrorHandlers);
app.use(notFound)

// app.post('/gotdata', (req:Request, res:Response)=>{
//   res.send('got data')
// })

export default app;
