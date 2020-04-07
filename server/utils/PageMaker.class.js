class PageMaker {
    startpage = 0
    endpage = 0
    total = 0
    keyword = ""
    type = ""
    next = false
    prev = false

    /** Constructor */
    constructor() {
        this.startPage = 0;
        this.endPage = 0;
        this.total = 0;
        this.keyword = "";
        this.type = "";
        this.next = false;
        this.prev = false;
    }
    constructor(start, end) {

    }
    setPrev(prev) {
        this.prev = prev;
    }
    getPrev() {
        return this.prev;
    }
    setNext(next) {
        this.next = next;
    }

    getNext() {
        return this.next;
    }
};


/** Export Module PageMaker */
module.exports = PageMaker;