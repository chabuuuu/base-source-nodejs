import { RedisClientType, createClient } from 'redis';
import { employeeRepository } from './om/person';
import client from './om/client';
import { Entity, EntityId } from 'redis-om';
export class RedisService {
    constructor() {
        this.connect();
    }

    async connect() {
        await client.connect();
        await employeeRepository.createIndex();
        console.log('Done create redis index');
    }

    async test() {}
    async addData(data: any, id: any) {
        console.log(data);
        data.id = Number(id);
        data.date_of_birth = new Date(data.date_of_birth);
        data.start_date = new Date(data.start_date);
        data.salary = Number(data.salary);

        try {
            const employee = await employeeRepository.save(data);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async readData(
        filter: any,
        page: any,
        perPage: any,
        skip: any,
        total: number,
    ): Promise<any> {
        var data;
        const monthBirth = filter.monthBirth;
        const gender = filter.gender;
        page = page?.toString();
        perPage = perPage?.toString();
        skip = skip?.toString();
        data = await employeeRepository.search().return.page(skip, perPage);
        if (monthBirth != null || gender != null) {
            var filterData: Array<any> = data;

            if (gender != null) {
                var genderDataFilter = await employeeRepository
                    .search()
                    .where('gender')
                    .equals(gender)
                    .return.all();
                filterData = genderDataFilter;
                console.log('FIlter by gender' + filterData);
            }
            if (monthBirth != null) {
                console.log('filterdata length: ' + filterData.length);

                // for (var i = 0; i < filterData.length; i++) {
                //     console.log(filterData[i].date_of_birth.toISOString());

                //     var data_mothBirth = filterData[i]?.date_of_birth?.toISOString().substring(5,7);
                //     console.log(data_mothBirth);
                //     console.log("monthbirth" + monthBirth);

                //     // if ( data_mothBirth.localeCompare(monthBirth.toString()) != 0){
                //     //     // filterData.push(data[i]);
                //     //     console.log(filterData[i]?.date_of_birth);

                //     //     filterData = filterData.splice(Number(i), 1);
                //     // }
                // }

                filterData = filterData.filter(function (item) {
                    return (
                        item.date_of_birth
                            .toISOString()
                            .substring(5, 7)
                            .localeCompare(monthBirth) == 0
                    );
                });

                console.log('Filter by month' + filterData);
            }
            const result: any = {
                data: filterData,
                totalCount: filterData.length,
                from: 'redis',
            };
            return result;
            // console.log(monthBirth, gender);
        } else {
            const result: any = {
                data: data,
                page: page,
                perPage: perPage,
                totalCount: total,
                from: 'redis',
            };
            return result;
        }
    }
    async count(): Promise<number> {
        var count = await employeeRepository.search().returnCount();
        console.log('Total count of redis employee: ' + count);
        return count;
    }
    async syncWithDB(data: any) {
        const dataList = data.data;

        await client.flushAll();
        await employeeRepository.createIndex();
        for (const element of dataList) {
            await employeeRepository.save(element);
        }
    }
    async delete(id: any) {
        const employee = await employeeRepository
            .search()
            .where('id')
            .equals(Number(id))
            .return.first();
        if (employee != null) {
            var redisId: any = employee[EntityId];
            console.log('Redis ID of employee we will delete: ' + redisId);
            await employeeRepository.remove(redisId);
            console.log('Delete employee from redis!');
        }
    }
    async update(id: number, data: any) {
        var employee = await employeeRepository
            .search()
            .where('id')
            .equals(id)
            .return.first();
        if (employee != null) {
            var redisId: any = employee[EntityId];
            console.log('Redis ID of employee we will update: ' + redisId);
            employee.full_name = data.full_name ?? employee.full_name;
            employee.date_of_birth =
                data.date_of_birth ?? employee.date_of_birth;
            employee.gender = data.gender ?? employee.gender;
            employee.address = data.address ?? employee.address;
            employee.phone_number = data.phone_number ?? employee.phone_number;
            employee.email = data.email ?? employee.email;
            employee.job_title = data.job_title ?? employee.job_title;
            employee.start_date = data.start_date ?? employee.start_date;
            employee.salary = data.salary ?? employee.salary;
            employee.profile_picture =
                data.profile_picture ?? employee.profile_picture;
            employee.password = data.password ?? employee.password;
            await employeeRepository.save(employee);
            console.log('Update employee on redis!');
        }
    }
}
