import express from "express"
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from "../Controllers/userController.js"
import {isAdminAuthenticated, isPatientAuthenticated,} from "../middleware/auth.js"

const router = express.Router()

router.post("/patient/register",patientRegister)
router.post("/login",login)
router.post("/Admin/addnew",isAdminAuthenticated,addNewAdmin)
router.get("/alldoctors",getAllDoctors)
router.get("/Admin/me",isAdminAuthenticated,getUserDetails)
router.get("/Patient/me",isPatientAuthenticated ,getUserDetails)
router.get("/Admin/logout",isAdminAuthenticated ,logoutAdmin)
router.get("/Patient/logout",isPatientAuthenticated ,logoutPatient)
router.post("/Doctor/addnew",isAdminAuthenticated, addNewDoctor)
router.get("/Doctors",isAdminAuthenticated,getAllDoctors)





export default router