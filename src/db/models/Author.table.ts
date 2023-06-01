import {DataTypes} from 'sequelize'
import { sequelize } from '../pgConnection';
import { Book } from './Book.table';

export const Author = sequelize.define('Author', {
    authorId            : {type:DataTypes.INTEGER,  primaryKey:true, autoIncrement: true, allowNull: false},
    name                : {type:DataTypes.STRING,   allowNull: false},
})

Author.hasMany(Book, {
    foreignKey: 'bookId',
    // sourceKey: 'bookId'
})

Book.belongsTo(Author, {
    foreignKey: 'authorId',
    // targetKey: 'authorId'
})