// this file will help in creating connection with mongodb and add data into database with the help of userschema 
const URL = 'mongodb+srv://Kavya:Kavya16@mycluster.uewuzm8.mongodb.net/?retryWrites=true&w=majority'
import mongoose from "mongoose";

const promise = mongoose.connect(URL, {
    // below are the libraries that help in operating with mongodb.
  useNewUrlParser: true,
  useUnifiedTopology: true
});

promise
  .then(() => {
    console.log('DB Connected...');
  })
  .catch(err => {
    console.error('Error during DB connection:', err); // Change from console.log to console.error
  });
export default mongoose;