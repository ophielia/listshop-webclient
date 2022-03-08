export default class EmailValidator {

    static isValid(text: string): boolean {
        return true
    }

    static isValidAndVerified(text: string, verification: string): boolean {
        return true
    }

    static isValidEmail(text: string): boolean {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)) {
            return true;
        }
        alert("You have entered an invalid email address!")
        return false;
    }
}