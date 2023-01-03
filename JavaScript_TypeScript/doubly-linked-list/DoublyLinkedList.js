var NodeDLL = /** @class */ (function () {
    function NodeDLL(value, prev, next) {
        if (prev === void 0) { prev = null; }
        if (next === void 0) { next = null; }
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
    return NodeDLL;
}());
var DoublyLinkedList = /** @class */ (function () {
    function DoublyLinkedList() {
        this.head = null;
        this.tail = null;
    }
    DoublyLinkedList.prototype.push = function (value) {
        if (this.tail) {
            this.tail.next = new NodeDLL(value, this.tail, null);
            this.tail = this.tail.next;
        }
        else {
            this.head = new NodeDLL(value, null, null);
            this.tail = this.head;
        }
    };
    DoublyLinkedList.prototype.pop = function () {
        var val = this.tail.value;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.tail.prev.next = null;
            this.tail = this.tail.prev;
        }
        return val;
    };
    DoublyLinkedList.prototype.shift = function () {
        var val = this.head.value;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.head.next.prev = null;
            this.head = this.head.next;
        }
        return val;
    };
    DoublyLinkedList.prototype.unshift = function (value) {
        if (this.head) {
            this.head.prev = new NodeDLL(value, null, this.head);
            this.head = this.head.prev;
        }
        else {
            this.head = new NodeDLL(value, null, null);
            this.tail = this.head;
        }
    };
    return DoublyLinkedList;
}());
