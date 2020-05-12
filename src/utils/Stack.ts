class Stack<T> {
    private count: number;
    private storage: T[];
    
    constructor() {
        this.count = 0
        this.storage = []
    }

    push(value: T): void {
        this.storage[this.count] = value
        this.count++;
    }

    pop(): T | undefined {
        if (this.count === 0) {
            return undefined;
        }
    
        this.count--;
        const result = this.storage[this.count];
        delete this.storage[this.count];
        return result;
    }

    peek(): T | undefined {
        if (this.count === 0) {
            return undefined;
        }
    
        return this.storage[this.count-1];
    }
    
    size(): number {
        return this.count;
    }

    clear(): void {
        for (let i = 0; i < this.count; i++) {
            delete this.storage[i];
            this.count = 0;
        }
    }    
}

export default Stack