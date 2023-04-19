import mongoose, {Schema, model} from 'mongoose';

const HistorySchema = new Schema({
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


export const HistoryModel = model('History', HistorySchema)