import mongoose from "mongoose";

const SuperheroSchema = new mongoose.Schema({
    nickname: {type: String, required: true},
    real_name: {type: String, required: true},
    origin_description: {type: String},
    superpowers: {type: String},
    catch_phrase: {type: String},
    images: {type: [String], default: []},
}, {timestamps: true});

export default mongoose.model( 'Superhero', SuperheroSchema);