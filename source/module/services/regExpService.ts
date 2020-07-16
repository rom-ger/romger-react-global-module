export class RegExpService {
    static readonly PASSWORD = /([0-9]{1})([a-z]{1})([A-Z]{1})/;
    static readonly EMAIL = /^[-._a-zA-Z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
    static readonly FULL_NAME = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']$/;
    static readonly NON_CYRILLIC_SYMBOLS = /^[^а-яА-ЯЁё]*$/;
}
