import { Router } from 'express';
import * as ownerController from '../controllers/owner.controller.js';
import { authenticate } from '../../auth/auth.middleware.js';
import { CreateOwnerDto, UpdateOwnerDto } from '../dto/owner.dto.js';
import validate from '../../../common/middleware/validate.middleware.js';

const router = Router();

// All owner routes require a valid logged-in user
router.use(authenticate);

//create a new owner
router.post('/', validate(CreateOwnerDto), ownerController.createOwner);

//Get all owner
router.get('/', ownerController.getAllOwner);

//get owner by Id
router.get('/:id', ownerController.getOwnerById);

//update owner by id
router.put('/:id', validate(UpdateOwnerDto), ownerController.updateOwner);

//delete owner by Id
router.delete('/:id', ownerController.deleteOwner);

export default router;
