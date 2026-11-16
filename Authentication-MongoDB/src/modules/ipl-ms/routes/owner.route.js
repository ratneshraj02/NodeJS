import { Router } from 'express';
import * as ownerController from '../controllers/owner.controller.js';

const router = Router();

//create a new owner
router.post('/', ownerController.createOwner);

//Get all owner
router.get('/', ownerController.getAllOwner);

//get owner by Id
router.get('/:id', ownerController.getOwnerById);

//update owner by id
router.put('/', ownerController.updateOwner);

//delete owner by Id
router.delete('/:id', ownerController.deleteOwner);

export default router;
