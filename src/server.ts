import express from 'express';
import cors from 'cors';
import path from 'path';
import { errors } from 'celebrate';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use('/tmp', express.static(path.resolve(__dirname, '..', 'src', 'tmp')));

app.use(errors());

app.listen(3333);
