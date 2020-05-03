var Stack = function() {
    this.count = 0;
    this.storage = {};
}

Stack.prototype.push = function(value) {
    this.storage[this.count] = value;
    this.count++;
}

Stack.prototype.pop = function() {
    if (this.count === 0) {
        return undefined;
    }

    this.count--;
    var result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
}

Stack.prototype.size = function() {
    return this.count;
}

Stack.prototype.peek = function() {
    if (this.count === 0) {
        return undefined;
    }

    return this.storage[this.count];
}

Stack.prototype.clear = function() {
    for (let i = 0; i < this.count; i++) {
        delete this.storage[i];
        this.count = 0;
    }
}

export default Stack