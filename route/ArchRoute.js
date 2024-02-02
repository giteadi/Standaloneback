const express = require("express");
const router = express.Router();
const { imageUpload, localFileUpload } = require("../controller/fileUpload");
const { updateData,updatePost,showDate,showAssignTo } = require("../controller/ArchController");


router.post("/imageUpload", imageUpload);
router.post("/local", localFileUpload);
router.post("/updateData", updateData);
router.put("/updatePost",updatePost);
router.get('/showDate',showDate);
router.get('/showAssignTo',showAssignTo);

module.exports = router;
