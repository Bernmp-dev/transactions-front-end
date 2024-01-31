export class TransactionEntity {
    id?: number | null;
    category?: string | null;
    value?: number | null;
    date?: string | null;

    constructor(id?:number|null, nome?:string|null, idade?:number|null, email?:string|null){
        this.id = id;
        this.category = nome;
        this.value = idade;
        this.date = email;
    }
}