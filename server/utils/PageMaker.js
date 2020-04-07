const PageMaker = (Boards, options) => {
    /** Offset Page */
    let offset = Boards.page < 0 ? 0 : ((parseInt(Boards.page) - 1) * parseInt(Boards.amount));
    /** End Page Set */
    let endPage = parseInt(Math.ceil((Boards.page) / 10.0) * 10);
    /** Start Page */
    let startPage = (endPage - 9) < 0 ? 1 : (endPage - 9);
    /** Real End Page */
    let RealEnd = Math.ceil((total * 1.0) / Boards.amount);
    /** Previous Boolean Check */
    let prevFlag = false;
    /** Next Boolean Check */
    let nextFlag = false;
    /** end page set */
    if (RealEnd <= endPage) {
        endPage = RealEnd;
    }
    /** Previous Boolean Set */
    prevFlag = startPage > 1 ? true : false;
    /** Next Boolean Set */
    nextFlag = endPage < RealEnd ? true : false;
    /** Make List Options */
    let ListOptions = {
        offset: offset,
        endPage: endPage,
        startPage: startPage,
        RealEnd: RealEnd,
        prevFlag: prevFlag,
        nextFlag: nextFlag,
        curPage: Boards.page,
        amount: Boards.amount,
        Search: options
    };
    return ListOptions;
};

module.exports = PageMaker;