const apmtRouter = require('express').Router();
const appointmentRoutes = require('../controllers/appointmentController');
const jwtMiddleware = require('../middlewares/jwt_middleware');

apmtRouter.post('/add', appointmentRoutes.add);
apmtRouter.post('/update', appointmentRoutes.update);
apmtRouter.delete('/delete', appointmentRoutes.delete);
apmtRouter.get('/appointments', appointmentRoutes.allAppointments);

module.exports = apmtRouter;