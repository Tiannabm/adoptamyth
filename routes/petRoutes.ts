import { Router } from "express";
import { addPetPage, createAPet, deletePet, editPet, editPetPage, getAllPets, getPetById } from "../controllers/petController";



const router = Router();


router.get('/', getAllPets);


router.get('/new', addPetPage);
router.post('/new', createAPet);

router.get('/edit/:id', editPetPage);
router.post('/edit/:id', editPet)

router.post('/delete/:id', deletePet);
router.get('/:id', getPetById);

export default router;