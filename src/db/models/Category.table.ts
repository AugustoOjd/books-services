import {DataTypes} from 'sequelize'
import { sequelize } from '../pgConnection';
import { Book } from './Book.table';

export const Category = sequelize.define('Category', {
    categoryId:     {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:           {type: DataTypes.ENUM('classic', 'crime', 'fantasy', 'horror', 'romance'), allowNull: false}
})

Category.hasMany(Book, {
    foreignKey: 'bookId',
    // sourceKey: 'bookId'
})

Book.belongsTo(Category, {
    foreignKey: 'categoryId',
    // targetKey: 'authorId'
})