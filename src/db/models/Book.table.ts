import {DataTypes} from 'sequelize'
import { sequelize } from '../pgConnection';

export const Book = sequelize.define('Book', {
    bookId          : {type:DataTypes.INTEGER,  primaryKey:true, autoIncrement: true, allowNull: false},
    title           : {type:DataTypes.STRING,   allowNull: false},
    description     : {type:DataTypes.STRING,   allowNull: false},
    // author          : {type:DataTypes.STRING,   allowNull: false},
    editorial       : {type:DataTypes.STRING,   allowNull: false},
    stock           : {type:DataTypes.BIGINT,   allowNull: false},
    image           : {type:DataTypes.STRING,   allowNull: false},
    price           : {type:DataTypes.BIGINT,   allowNull: false},
    code            : {type:DataTypes.STRING,   allowNull: false},
    pages           : {type:DataTypes.BIGINT,   allowNull: false},
    language        : {type:DataTypes.STRING,   allowNull: false},
    release         : {type:DataTypes.STRING,   allowNull: false},
    // category        : {type:DataTypes.ENUM(),   allowNull: false},
    sold            : {type:DataTypes.BIGINT,   allowNull: false},
    type            : {type:DataTypes.ENUM('physical', 'pdf', 'graphic'),   allowNull: false},
})
