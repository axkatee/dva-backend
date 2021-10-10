const apmtRouter = require('express').Router();
const appointmentRoutes = require('../controllers/appointmentController');
const jwtMiddleware = require('../middlewares/jwt_middleware');

apmtRouter.post('/add', jwtMiddleware.jwtValidate, appointmentRoutes.add);
apmtRouter.post('/update', jwtMiddleware.jwtValidate, appointmentRoutes.update);
apmtRouter.delete('/delete', jwtMiddleware.jwtValidate, appointmentRoutes.delete);
apmtRouter.get('/appointments', jwtMiddleware.jwtValidate, appointmentRoutes.allAppointments);

module.exports = apmtRouter;