import express from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchemas } from "./admin.validation";

const router = express.Router();

router.get(
    "/",
    AdminController.getALlAdmin
)

router.get(
    "/:id",
    AdminController.getById
)

router.patch(
    "/:id",
    validateRequest(adminValidationSchemas.update),
    AdminController.updateData
)

router.delete(
    "/:id",
    AdminController.softDelete
)


export const adminRoutes = router;