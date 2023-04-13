import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name:           { type: String, require: true},
    lastName:       { type: String, require: true},
    email:          { type: String, require: true, unique: true},
    password:       { type: String, require: true},
    country:        { type: String, require: true},
    status:         { type: Boolean, require: true},
    typeAccount:    { type: String, require: true, default: 'regular'},
    balance:        { type: Number, require: true},
    discount:       { type: Number, require: true},
    freeShipping:   { type: Boolean, require: true},
    registerDate:   { type: Date},
    updatedDate:    { type: Date},
    cart:           { type: []},
    history:        { type: []},
});


export const UserModel = model('User', userSchema)