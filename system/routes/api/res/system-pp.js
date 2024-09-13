/*
Filename:
  optiplex/system/routes/api/res/user-pp.js
Description:
    returns all available profile pictures for users
    
Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

export default async function (_req, res) {
  res.json(systemPPs);
}

export const systemPPs = [
  "banana",
  "beer",
  "beet",
  "bread",
  "cheese",
  "cherry",
  "cocktail",
  "cookies",
  "corn",
  "crab",
  "cup",
  "cupcake",
  "garlic",
  "hamburger",
  "hazelnut",
  "hops",
  "ingredients",
  "kiwi",
  "milk",
  "octopus",
  "pineapple",
  "pizza",
  "pomegranate",
  "porridge",
  "pretzel",
  "steak",
  "taco",
  "tapas",
  "tomato",
  "watermelon"
];
