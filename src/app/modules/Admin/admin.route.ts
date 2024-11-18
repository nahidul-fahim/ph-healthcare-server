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


export const adminRoutes = router;