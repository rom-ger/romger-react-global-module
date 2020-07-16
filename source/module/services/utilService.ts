export class UtilService {
    static nodes: HTMLDivElement[] = [];
    static callbackOutside: () => any = () => null;

    /**
     * Делаем первую букву в строке с большой буквы
     * @param str
     */
    public static setFirstWordToUpperCase(str: string): string {
        let result: string = '';
        for (let i = 0; i < str.length; i++) {
            result = `${result}${i ? str[i] : str[i].toUpperCase()}`;
        }
        return result;
    }

    /**
     * Преобразовываем строку телефона в нормальный вид
     * @param str
     */
    public static phoneMask(str?: string | null): string {
        if (!str) {
            return '';
        }
        let result: string = '';
        for (let i = 0; i < str.length; i++) {
            if (/[0-9\+]/.test(str[i])) {
                result = `${result}${str[i]}`;
            }
        }
        const lengthWithoutCode = 10;
        const lengthWithCode = 11;
        if (result.length < lengthWithoutCode || (result.length > lengthWithCode + 1)) {
            return result;
        }
        let index: number = 2;
        let step1: number = 4;
        let step2: number = 3;
        if (result.length === lengthWithCode) {
            index = 1;
        }
        if (result.length === lengthWithoutCode) {
            result = `+7${result}`;
        }
        result = UtilService.addSubStr(result, index, '(');
        index = index + step1;
        result = UtilService.addSubStr(result, index, ')');
        index = index + step1;
        result = UtilService.addSubStr(result, index, '-');
        index = index + step2;
        result = UtilService.addSubStr(result, index, '-');
        return result;
    }

    /**
     * Вставить подстроку в строку
     */
    public static addSubStr = (str: string, pos: number, subStr: string): string => {
        let beforeSubStr: string = str.substring(0, pos);
        let afterSubStr: string = str.substring(pos, str.length);
        return `${beforeSubStr}${subStr}${afterSubStr}`;
    };

    /**
     * Собираем имя пользователя вида Иванов В.В.
     * @returns {String}
     */
    public static concatPersonName(profileInfo: any | null, full?: boolean): string {
        if (!profileInfo) {
            return '';
        }
        let lastName: string | null = profileInfo.lastName ? profileInfo.lastName : null;
        let firstName: string | null = profileInfo.firstName ? profileInfo.firstName : null;
        let middleName: string | null = profileInfo.middleName ? profileInfo.middleName : null;
        if (!lastName && !firstName && !middleName) {
            return '';
        }
        if (!!lastName && !!firstName && !!middleName) {
            return full ? `${lastName} ${firstName} ${middleName}` : `${lastName} ${firstName.substr(0, 1)}.${middleName.substr(0, 1)}.`;
        }
        if (!!lastName && !!firstName && !middleName) {
            return full ? `${lastName} ${firstName}` : `${lastName} ${firstName.substr(0, 1)}.`;
        }
        if (!!lastName && !firstName && !!middleName) {
            return full ? `${lastName} ${middleName}` : `${lastName} ${middleName.substr(0, 1)}.`;
        }
        if (!lastName && !!firstName && !!middleName) {
            return full ? `${firstName} ${middleName}` : `${firstName} ${middleName.substr(0, 1)}.`;
        }
        if (!!lastName && !firstName && !middleName) {
            return `${lastName}`;
        }
        if (!lastName && !!firstName && !middleName) {
            return `${firstName}`;
        }
        if (!lastName && !firstName && !!middleName) {
            return `${middleName}`;
        }
        return '';
    }

    /**
     * Получить массив уникальных элементов из переданного массива
     * @param array
     */
    static getUniqElementsByArray(array: string[]): string[] {
        let uniqArray: string[] = [];
        array.forEach((el: any) => {
            if (!uniqArray.some(uniqArrayEl => uniqArrayEl === el)) {
                uniqArray.push(el);
            }
        });
        return uniqArray;
    }

    /**
     * Промиз с локальной загрузкой для таблицы
     * @param {*} promise
     * @param setStateCallback
     */
    static promiseWithLoadingTable(
        promise: Promise<any>,
        setStateCallback: (params: any) => any,
    ) {
        setStateCallback({
            loadingTable: true,
        });
        return new Promise((resolve, reject) => {
            promise
                .then((res) => {
                    setStateCallback({
                        loadingTable: false,
                    });
                    return resolve(res);
                })
                .catch((error) => {
                    setStateCallback({
                        loadingTable: false,
                    });
                    return reject(error);
                });
        });
    }

    /**
     * Колбэк при клике
     */
    static handlerCallback = (evt: MouseEvent) => {
        let targetElement: any = evt.target;
        do {
            if (UtilService.nodes.findIndex((node: HTMLDivElement) => targetElement === node) !== -1 || !targetElement) {
                return;
            }
            targetElement = targetElement.parentNode;
        } while (targetElement);
        document.removeEventListener('mousedown', UtilService.handlerCallback, false);
        UtilService.callbackOutside();
        UtilService.nodes = [];
        UtilService.callbackOutside = () => null;
    };

    /**
     * Колбэк на клик по документу, чтобы что-нибудь сделать, если кликнули за пределы элемента
     * @param nodes
     * @param callbackOutside
     */
    static handlerOutsideClick(nodes: HTMLDivElement[], callbackOutside: () => any) {
        UtilService.nodes = nodes;
        UtilService.callbackOutside = callbackOutside;
        document.addEventListener(
            'mousedown',
            UtilService.handlerCallback,
            false,
        );
    }

    /**
     * Форматирование чисел
     */
    static thousandSeparator(sourceValue: number, length: number = 3): string {
        let dex = 10;
        let defaultStep = this._calculateStep(dex, length, 0);
        let roundingIndex = 2;
        let stepResult = 1;
        let prevStep = null;
        let finish = false;
        let result = '';
        let step = -1;
        while (!finish) {
            step++;
            prevStep = this._calculateStep(dex, length, step - 1);
            stepResult = Math.floor(sourceValue / prevStep);
            if (stepResult > defaultStep) {
                stepResult = stepResult % defaultStep;
                result =
                    this._toRequiredStringLength(stepResult, length) +
                    (!!result ? ' ' : '') +
                    result;
            } else {
                finish = true;
                result = stepResult + (!!result ? ' ' : '') + result;
            }
        }
        return this.getDecimal(sourceValue, roundingIndex).length
            ? result + this.getDecimal(sourceValue, roundingIndex)
            : result;
    }

    /**
     * Получение дробной части округленной до нужного разряда
     */
    static getDecimal(num: number, power: number): string {
        let baseExponent = 10;
        let decimal =
            Math.round(
                (num - Math.floor(num)) * Math.pow(baseExponent, power),
            ) / Math.pow(baseExponent, power);
        let decimalString = `${decimal}`;
        decimalString = decimalString.length
            ? decimalString.slice(1)
            : decimalString;
        return decimalString;
    }

    /**
     * Парсим дату
     * @param date
     * @param moment
     */
    static parseDate(date: Date | null, moment: any): string {
        if (!date || !moment(date)
            .isValid()) {
            return '';
        }
        let now = moment(new Date())
            .startOf('day');
        let dateMoment = moment(date)
            .startOf('day');
        if (now.isSame(dateMoment)) {
            return moment(date)
                .format('HH:mm');
        }
        if (now.year() === dateMoment.year()) {
            return moment(date)
                .format('D MMM');
        }
        return moment(date)
            .format('DD.MM.YYYY');
    }

    /**
     * Разделить массив на равные части
     * @param array
     * @param size
     */
    public static chunkArray<T>(array: T[], size: number): T[][] {
        const chunkedArray = [];
        let index = 0;

        while (index < array.length) {
            chunkedArray.push(array.slice(index, index + size));
            index += size;
        }

        return chunkedArray;
    }

    /**
     * Исключающее или
     */
    public static xor = (a: any, b: any): boolean => {
        return !!a && !b || !a && !!b;
    }

    /**
     * Возведение основания 10 в степень
     */
    private static _calculateStep(
        num: number,
        length: number,
        step: number,
    ): number {
        return Math.pow(num, length * (step + 1));
    }

    /**
     * Добавление нолей к строке до необходимой длинны
     */
    private static _toRequiredStringLength(
        num: number,
        reqLength: number,
    ): string {
        let zeroString = '0';
        let stringValue = `${num}`;
        let missingLength = reqLength - stringValue.length;
        if (!missingLength) {
            return stringValue;
        }
        do {
            stringValue = zeroString + stringValue;
        } while (stringValue.length < reqLength);
        return stringValue;
    }
}
