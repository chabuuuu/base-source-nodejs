export class ConverStringToObject {
    convert(query: any): any {
        const filterData = {
            monthBirth: null,
            gender: null,
        };
        query = JSON.parse(query);
        console.log(query);
        for (const q of query) {
            switch (q.key) {
                case 'monthBirth':
                    filterData.monthBirth = q.value;
                    break;
                case 'gender':
                    filterData.gender = q.value;
                default:
                    break;
            }
        }
        return filterData;
    }
}
