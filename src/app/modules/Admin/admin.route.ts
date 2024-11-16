import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get(
    "/",
    AdminController.getALlAdmin
)


export const adminRoutes = router;