import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

// notFound
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found')
    res.status(404)
    next(error)
  })
  
  // catch all
  app.use((error:Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500)
    res.json({ error: error.message})
  })

app.listen(3333);