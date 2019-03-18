
const get_random = function (array) {
   if (array.length < 1) {
     return ''
   } else {
     return array[Math.floor((Math.random()*array.length))];
   }
 };

 let houseFeatures = {
   type: ['Single Family', 'Multifamily', 'Condo', 'Townhome'],
   year_built: function (min,max) {
     return Math.round(Math.random() * (max-min) + min);
    },
   heating:['No Data', 'None', 'Central'],
   cooling: ['None', 'Central'],
   parking: ['None', '1 Space', '2 Spaces', '3 Spaces'],
   lot: function (min,max) {
     return Math.round(Math.random() * (max-min) + min)
    },
   appliances: ['Dishwasher','Dryer', 'Garbage disposal', 'Refrigerator', 'Washer'],
    intHeating: ['Forced air', 'Fan', 'Speeder air'],
    intCooling: ['None', 'A/C', 'Central'],
    kitchen_features: ['Counter', 'Pantry', 'Updated Kitchen', 'Eat In Kitchen'],
    flooring: function (min,max) {
     return Math.round(Math.random() * (max-min) + min)}
 };

 const createFeatures = (numRecords=100) => {
   var features = [];

     for (let i = 0; i < numRecords; i++) {
       features.push({
         type: get_random(houseFeatures.type),
         year_built: houseFeatures.year_built(1900,2006),
         heating: get_random(houseFeatures.heating),
         cooling: get_random(houseFeatures.cooling),
         parking: get_random(houseFeatures.parking),
         lot: houseFeatures.lot(1000,3000),
         bedrooms: Math.round(Math.random() * 4),
         bathrooms: Math.round(Math.random() * 4),
         appliances: get_random(houseFeatures.appliances),
         int_heating: get_random(houseFeatures.intHeating),
         int_cooling: get_random(houseFeatures.intCooling),
         kitchen:  get_random(houseFeatures.kitchen_features),
         flooring: houseFeatures.flooring(1000,3000),
         sqft: houseFeatures.flooring(1000,3000),
         days_on_zillow: houseFeatures.flooring(1, 100)
       });
     }
   return features;
 };



module.exports = {
   createFeatures
};

