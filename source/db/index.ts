import {getCurrencyData} from "../api/currency";

// const mongoose = require('mongoose');

export const connectDB = () => {
    // mongoose.connect('mongodb://localhost/moonotes');

    getCurrencyData()
    // const Schema = mongoose.Schema;

    // const noteSchema = new Schema({
    //     nickname: String,
    //     currentCity: String,
    // });
}