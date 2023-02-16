/**
 * calculate total pagination page from total record and limit
 * @param totalRecord
 * @param limit
 * @returns total page
 */
export const totalPage = (totalRecord: number, limit: number) => {
    return Math.ceil(totalRecord / limit);
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
