export default class User {
    constructor(
        private id: number,
        private name: string,
        private password: string,
        private token: string
    ) {
    }

    get Id(): number {
        return this.id;
    }

    get Name(): string {
        return this.name;
    }

    get Token(): string {
        return this.token;
    }

    set Token(value: string) {
        this.token = value;
    }

    ComparePasswords(passwordToCompare: string): boolean {
        return this.password === passwordToCompare;
    }
}