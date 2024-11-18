import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
import { paginationHelper } from "../../../helpers/paginationHelper";

const prisma = new PrismaClient();

// get all admin from db
const getAllAdminFromDb = async (params: any, options: any) => {
    const { searchTerm, ...filterData } = params;
    const { limit, page, skip } = paginationHelper.calculatePagination(options);
    const andConditions: Prisma.AdminWhereInput[] = [];

    // functionality for search term
    if (searchTerm) {
        andConditions.push({
            OR: adminSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    // functionality for filtering
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.AdminWhereInput = { AND: andConditions }
    const result = await prisma.admin.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ?
            {
                [options.sortBy]: options.sortOrder
            }
            :
            {
                createdAt: 'desc'
            }
    });
    const total = await prisma.admin.count({
        where: whereConditions
    })
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
}

// get single admin from db
const getAdminByIdFromDb = async (id: string) => {
    const result = await prisma.admin.findUnique({
        where: {
            id,
            isDeleted: false
        }
    });
    return result;
}


export const AdminService = {
    getAllAdminFromDb,
    getAdminByIdFromDb
}