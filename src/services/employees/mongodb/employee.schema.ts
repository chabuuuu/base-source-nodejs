import mongoose from './client';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Employee = new Schema({
    id: { type: Number },
    full_name: { type: String },
    date_of_birth: { type: Date },
    gender: { type: String },
    address: { type: String },
    phone_number: { type: String },
    email: { type: String },
    job_title: { type: String },
    start_date: { type: Date },
    salary: { type: Number },
    profile_picture: { type: String },
    password: { type: String },
});
// module.exports = Employee;
export default Employee;
