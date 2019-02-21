
let interior_features = {
   appliances: ['Dishwasher','Dryer', 'Garbage disposal', 'Refriderator', 'Washer'],
   heating_cooling: ['forced air', 'fan', 'speeder air'],
   year_built: function (min,max) {
    return Math.round(Math.random() * (max-min) + min);
   },
   kitchen_features: ['Counter', 'Pantry', 'Updated Kitchen', 'Eat In Kitchen'],
   flooring: 2342
};



