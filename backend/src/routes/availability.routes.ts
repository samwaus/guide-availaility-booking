import express from 'express';
import AvailabilityCtrl from '../controllers/availability.controller';

const router = express.Router();

router.get('/:id', AvailabilityCtrl.apiGetAvailabilityByUserId);
router.post('/', AvailabilityCtrl.apiCreateAvailability);
router.put('/', AvailabilityCtrl.apiUpdateAvailability);
router.delete('/', AvailabilityCtrl.apiDeleteAvailability);

export default router;
