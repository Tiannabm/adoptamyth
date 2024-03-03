import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class Pet extends Model<InferAttributes<Pet>, InferCreationAttributes<Pet>> {
    declare id: number;
    declare name: string;
    declare imgUrl: string;
    declare description: string;
    declare createdOn?:Date;
    declare updatedOn?: Date;
}

export function PetFactory(sequelize: Sequelize) {
    Pet.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        imgUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'pet',
        freezeTableName: true,
        sequelize
    });
}

export const petList = [
    {
        id: 1,
        name: "Fawkes the Phoenix",
        imgUrl: "https://paintbynumbersforsale.com/wp-content/uploads/2021/08/Fawkes-Phoenix-Harry-potter-paint-by-numbers.jpg",
        description:"Can not only soar high in flames but can save a life with its tears!"
    
    },
    {
        id: 2,
        name: "Norbert the Dragon",
        imgUrl: "https://monsterlegacy.files.wordpress.com/2017/01/norbertwo.jpg",
        description:"Burps in fire but still cute and cuddly!"
    
    },
    {
        id: 3,
        name: "Fluffy the Dog Triplet",
        imgUrl: "https://monsterlegacy.files.wordpress.com/2017/01/fluffyasleep.jpg",
        description:"Triple the pets, triple the love, and triple the protection!"
    
    }
]