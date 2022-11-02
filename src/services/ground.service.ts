import PaginatedResponse from "../types/paginated-response";
import { getPagination } from "../utils";
import Pagination from "../types/pagination";

import { Ground } from "../models/grounds";

export const getGroundsService = function(pagination: Pagination, filters: any = {}): Promise<PaginatedResponse> {
    let result: PaginatedResponse = { total: 0, previous: {}, next: {}, data: {}, rowsPerPage: 0 };

    let page = pagination.page || 0;
    let size = pagination.size || 10;

    return new Promise(async (resolve, reject) => {
        const { limit, offset } = getPagination(page, size);
        try {
            const totalGrounds = await Ground.countDocuments().exec();
            let startIndex = +page * limit;
            const endIndex = (page + 1) * limit;
            result.total = totalGrounds;
            if (startIndex > 0) {
                result.previous = {
                    pageNumber: page - 1,
                    limit: limit,
                };
            }
            if (endIndex < (await Ground.countDocuments().exec())) {
                result.next = {
                    pageNumber: page + 1,
                    limit: limit,
                };
            }
            result.data = await Ground.find(filters)
                .sort("-_id")
                .skip(startIndex)
                .limit(limit)
                .exec();
            result.rowsPerPage = limit;
            resolve(result);
        } catch (err) {
           reject({ total: 0, previous: {}, next: {}, data: {}, rowsPerPage: 0 });
        }
    });
   
};