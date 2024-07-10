import express from "express"
import { deleteAppointment, getAllAppointments,                                                                      postAppointment, updateAppointmentStatus } from "../Controllers/appointmentController.js"
import { isAdminAuthenticated, isPatientAuthenticated } from "../middleware/auth.js"

const router = express.Router()
router.post("/AppointmentPost",isPatientAuthenticated,postAppointment)
router.get("/getall",isAdminAuthenticated,getAllAppointments)
router.put("/update/:id",isAdminAuthenticated,updateAppointmentStatus)
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointment)


export default router