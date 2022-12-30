class NodeDLL<T> {
    public value: T;
    public prev: NodeDLL<T> | null;
    public next: NodeDLL<T> | null;
    constructor(value: T, prev: NodeDLL<T> | null = null, next: NodeDLL<T> | null = null) {
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}

class DoublyLinkedList<T> {
    private head: NodeDLL<T> | null = null;
    private tail: NodeDLL<T> | null = null;

    push(value: T): void {
        if (this.tail) {
            this.tail.next = new NodeDLL(value, this.tail, null);
            this.tail = this.tail.next;
        } else {
            this.head = new NodeDLL(value, null, null);
            this.tail = this.head;
        }
    }

    pop(): T {
        var val: T = this.tail!.value;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail!.prev!.next = null;
            this.tail = this.tail!.prev;
        }
        return val;
    }

    shift(): T {
        var val: T = this.head!.value;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head!.next!.prev = null;
            this.head = this.head!.next;
        }
        return val;
    }

    unshift(value: T): void {
        if (this.head) {
            this.head.prev = new NodeDLL(value, null, this.head);
            this.head = this.head.prev;
        } else {
            this.head = new NodeDLL(value, null, null);
            this.tail = this.head;
        }
    }
}