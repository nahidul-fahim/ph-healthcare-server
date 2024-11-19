import express from "express";
import { AdminController } from "./admin.controller";

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
    AdminController.updateData
)

router.delete(
    "/:id",
    AdminController.softDelete
)


export const adminRoutes = router;