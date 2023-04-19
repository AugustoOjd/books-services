import mongoose, {Schema, model} from 'mongoose';

const CartSchema = new Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Book'
                }, 
                quantity: { type: Number, default: 1 }
            }
        ],
        default: []
    }
})


export const CartModel = model('Cart', CartSchema)