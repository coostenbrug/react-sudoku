class Stack {
    constructor() {
        this.count = 0
        this.storage = {}
    }

    push(value) {
        this.storage[this.count] = value
        this.count++;
    }

    pop() {
        if (this.count === 0) {
            return undefined;
        }
    
        this.count--;
        var result = this.storage[this.count];
        delete this.storage[this.count];
        return result;
    }

    peek() {
        if (this.count === 0) {
            return undefined;
        }
    
        return this.storage[this.count-1];
    }
    
    size() {
        return this.count;
    }

    clear() {
        for (let i = 0; i < this.count; i++) {
            delete this.storage[i];
            this.count = 0;
        }
    }    
}

export default Stack