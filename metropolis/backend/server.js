import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

// Controllers
import mainPageController from './controllers/mainPageController';
import coloniesPageController from './controllers/coloniesPageController';

// and create our instances
const app = express();
const router = express.Router();

// Set backend server proxy port to 3001
const API_PORT = process.env.API_PORT || 3001;
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Use our router configuration when we call /api
app.use('/api', router);

// Home page api routes
router.get('/statistics/mongo', mainPageController.fetchStatisticsFromMongo);
router.get('/statistics/ethereum', mainPageController.fetchStatisticsFromEthereum);
router.get('/time-series-data/', mainPageController.fetchTimeSeriesData);

// Colonies page api routes
router.get('/colonies/', coloniesPageController.getPageOfColonies);
router.get('/colonies/:pageId', coloniesPageController.getPageOfColonies);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));