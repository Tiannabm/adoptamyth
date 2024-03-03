import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import path from 'path';
import { db } from './models';
import { getAllPets } from './controllers/petController';
import petRoutes from './routes/petRoutes'

const app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../src/public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "../src/views"));
app.set('view options', {layout: 'layout'});

app.get('/', getAllPets )
app.use('/pets', petRoutes );


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).render('error', {
        message: "This is not the URL you are looking for!"
    });
})

db.sync().then(() => {
    console.info("Connected to the database!")
});

app.listen(3000);