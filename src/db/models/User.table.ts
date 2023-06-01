import {DataTypes} from 'sequelize'
import { sequelize } from '../pgConnection';

export const User = sequelize.define('User', {
    userId:         {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    firstName:      {type: DataTypes.STRING,allowNull: false},
    lastName:       {type: DataTypes.STRING,allowNull: false},
    email:          {type: DataTypes.STRING,allowNull: false},
    password:       {type: DataTypes.STRING,allowNull: false},
    country:        {type: DataTypes.STRING,allowNull: false},    
    status:         {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: true},     
    role:           {type: DataTypes.STRING,allowNull: false,defaultValue: 'client'},        
    typeAccount:    {type: DataTypes.STRING,allowNull: false,defaultValue: 'regular'}, 
    balance:        {type: DataTypes.BIGINT,allowNull: false,},    
    discount:       {type: DataTypes.BIGINT,allowNull: false,},
    freeShipping:   {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: false},
    registerDate:   {type: DataTypes.DATE,allowNull: false},  
    updatedDate:    {type: DataTypes.DATE,allowNull: false}   
});
