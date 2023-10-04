import { Schema } from 'redis-om';
import client from './client';
import { Repository } from 'redis-om';
/* our entity */
// class Person extends Entity {}
// /* create a Schema for Person */
// const personSchema = new Schema(Person, {
//     name: { type: 'string'},
//     id: { type: 'number' }
//   })
// /* use the client to create a Repository just for Persons */
// export const personRepository = client.fetchRepository(personSchema)
// console.log("done creating");
// /* create the index for Person */
// await personRepository.createIndex()

const employeeSchema = new Schema('employee', {
    id: { type: 'number' },
    full_name: { type: 'string' },
    date_of_birth: { type: 'date' },
    gender: { type: 'string' },
    address: { type: 'string' },
    phone_number: { type: 'string' },
    email: { type: 'string' },
    job_title: { type: 'string' },
    start_date: { type: 'date' },
    salary: { type: 'number' },
    profile_picture: { type: 'string' },
    password: { type: 'string' },
});
export const employeeRepository = new Repository(employeeSchema, client);
console.log('Done creating employee redis');
//   employeeRepository.createIndex();
