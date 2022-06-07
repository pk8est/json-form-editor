
export class Supplier{
    constructor(call) {
        this.$call = typeof call === "function" ? call : () => call
    }

    get(...params){
        return this.$call(...params)
    }
}

export class JsonSchemaSupplier extends Supplier{

}

export class JsonPropSupplier extends Supplier{

}