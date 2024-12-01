import express from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchemas } from "./admin.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
    "/",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    AdminController.getALlAdmin
)

router.get(
    "/:id",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    AdminController.getById
)

router.patch(
    "/:id",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(adminValidationSchemas.update),
    AdminController.updateData
)

router.delete(
    "/:id",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    AdminController.softDelete
)


export const adminRoutes = router;