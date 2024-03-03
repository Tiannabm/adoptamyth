import { NextFunction, Request, Response, RequestHandler } from "express";
import { Pet } from "../models/pet";
import * as mysql from 'mysql';
import { MysqlError } from 'mysql';


const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Password!',
    database: 'petdb'
})

db.connect((err: MysqlError) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + db.threadId);
});



export const getAllPets: RequestHandler = async (req, res, next) => {
    const allPets = await Pet.findAll();
    
    res.render('allPets', { petList: allPets });
}

export const getPetById: RequestHandler = async (req, res, next) => {

    let petId = parseInt(req.params.id);

    const onePet = await Pet.findByPk(petId);

    if (onePet) {
        res.render('petDetails', { foundPet: onePet });
    } else {
        res.status(404).render('error', { message: 'Pet not found!' });
    }
}

export const createAPet: RequestHandler = async (req, res, next) => {
   try {  
        let newPet: Pet = req.body;
        const createdPet = await Pet.create(newPet);

        res.redirect('/pets');
        console.log(newPet);

    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Error creating pet' });
        }
}

export const deletePet: RequestHandler = async (req, res, next) => {
    let petId: number = parseInt(req.params.id);

        const deleted = await Pet.destroy({
            where: { id: petId }
        });

        if (deleted) {
            res.redirect('/pets');
        } else {
            res.status(404).render('error', { message: 'Cannot delete pet' });
        }
}

export const addPetPage: RequestHandler = (req, res, next) => {
    res.render('newPet');
}

export const editPetPage: RequestHandler = async (req, res, next) => {
    let petId: number = parseInt(req.params.id);

    if (isNaN(petId)) {
        res.status(400).render('error', { message: 'Invalid pet ID' });
        return;
    }

    let onePet = await Pet.findByPk(petId);


    if (onePet) {
        res.render('editPet', { foundPet: onePet });
    } else {
        res.status(404).render('error', { message: 'Pet not found' });
    }
}

export const editPet: RequestHandler = async (req, res, next) => {
    let petId: number = parseInt(req.params.id);
    let updatedPet: Pet = req.body;

    let [updated] = await Pet.update(updatedPet, {
        where: { id: petId }
    });

    if (updated === 1) {

        let newPetDeets = await Pet.findByPk(petId);

        res.render('petDetails', { foundPet: newPetDeets });

    } else {
        res.render('error', { message: 'Pet could not be updated' });
    }
}
