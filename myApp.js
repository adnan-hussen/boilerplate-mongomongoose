require('dotenv').config();
let mongoose=require('mongoose')
const MONGO_URI=process.env.MONGO_URI

mongoose.connect(MONGO_URI, {useNewUrlParser:true , useUnifiedTopology:true})

const personSchema=new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      
    },
    age:Number,
    favoriteFoods:[String],
  }
)

let Person=mongoose.model('Person',personSchema)


const createAndSavePerson = (done) => {
  let person=new Person(
    {
      name:"Adnan",
      age:22,
      favoriteFoods:["Shawarma","Pizza","Bananas"]
    }
  )
  person.save((err,data)=>{
    if(err) return done(err);
    done(null,data);
  })
  
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err,data)=>{
    if (err) return done(err)
    done(null, data)
  })
    

};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err, data)=>{
    if (err) return done(err)
    done(null,data)})
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:[food]},(err, data)=>{
    if (err) return done(err)
    done(null, data)
  })
 
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId}, (err,data)=>{
    if (err) return done(err)
    done(null,data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id:personId},(err,person)=>{
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson)=>{
      if (err) return done(err);
      done(null,updatedPerson)
    })
  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
     {name:personName},
     {age:ageToSet},
     {new: true},
     (err,person)=>{
      if (err) return done(err);
      done(null, person)
    }) 
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId},(err,removedPerson)=>{
    if (err) return done(err)
    done(null, removedPerson)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},
    (err, data)=>{
      if (err) return done(err)
      done(null, data)
    }
  )
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
  .sort({name:1})
  .limit(2).select({age:0})
  .exec((err, data)=>{
    if (err) return done(err)
    done(null, data)
  })

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
