import { Router } from 'express';
import * as sponsorController from '../controllers/sponsor.controller.js';
import { authenticate } from '../../auth/auth.middleware.js';
import { CreateSponsorDto, UpdateSponsorDto } from '../dto/sponsor.dto.js';
import validate from '../../../common/middleware/validate.middleware.js';

const router = Router();

// All sponsor routes require a valid logged-in user
router.use(authenticate);

//create a new sponsor
router.post('/', validate(CreateSponsorDto), sponsorController.createSponsor);

//Get all sponsor
router.get('/', sponsorController.getAllSponsor);

//get sponsor by Id
router.get('/:id', sponsorController.getSponsorById);

//update sponsor by id
router.put('/:id', validate(UpdateSponsorDto), sponsorController.updateSponsor);

//delete sponsor by Id
router.delete('/:id', sponsorController.deleteSponsor);

export default router;
