/*
Filename:
  optiplex/system/database/schema/Meal.js
Description:
  Structure of Meal data in optiplex database

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/


import { Schema, model } from "mongoose";

const mealSchema = Schema({
    title: String,
    description: String,
    photo: String,
    date: Date,
    system: { type: Schema.Types.ObjectId, ref: "System"},
    author: { type: Schema.Types.ObjectId, ref: "User"},
    eaters: [{ type: Schema.Types.ObjectId, ref: "User"}],
    likes: [{ type: Schema.Types.ObjectId, ref: "User"}],
    comments: [{ author: { type: Schema.Types.ObjectId, ref: "User"}, body: String, date: Date }],
    shares: Number,
    views: Number
});

const Meal = model("Meal", mealSchema);

export default Meal;