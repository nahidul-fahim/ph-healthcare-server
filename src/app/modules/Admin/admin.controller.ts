import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import { HttpStatus } from "http-status-ts";
import catchAsync from "../../../shared/catchAsync";

const getALlAdmin = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = await AdminService.getAllAdminFromDb(filters, options);
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Admin data fetched!",
        meta: result.meta,
        data: result.data
    })
});

// get single from db by id
const getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminService.getAdminByIdFromDb(id);
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Admin data fetched!",
        data: result
    })
});

// update data
const updateData = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminService.updateIntoDb(id, req.body);
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Admin data updated",
        data: result
    })
});

// soft delete
const softDelete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminService.softDeleteFromDb(id);
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Admin data deleted",
        data: result
    })
});

export const AdminController = {
    getALlAdmin,
    getById,
    updateData,
    softDelete
}