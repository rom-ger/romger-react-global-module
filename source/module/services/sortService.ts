import { IBaseSortDTO } from '../../interfaces';
import SORT_DIRECTION from '../enums/sortDirection';

export class SortService {
    /**
     * Отсортирован ли столбец и в какую сторону?
     * @param str
     */
    public static sortDirection(sort: IBaseSortDTO, fieldName: string): boolean | null {
        if (sort.field !== fieldName) {
            return null;
        }
        return sort.direction === SORT_DIRECTION.ASC.value;
    }

    /**
     * Отсортировать по этому столбцу
     * @param fieldName
     */
    public static sortTable = (sort: IBaseSortDTO, fieldName: string, callback: (sort: IBaseSortDTO) => any) => {
        if (sort.field === fieldName) {
            sort.direction = sort.direction === SORT_DIRECTION.ASC.value ? SORT_DIRECTION.DESC.value : SORT_DIRECTION.ASC.value;
        } else {
            sort.field = fieldName;
            sort.direction = SORT_DIRECTION.ASC.value;
        }
        callback(sort);
    }
}
