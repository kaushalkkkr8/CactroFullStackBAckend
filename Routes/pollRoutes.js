const { fetchingAllPolls, voting } = require("../Controller/pollController");
const pollValidation = require("../middleware/pollMiddleware");

const router = require("express").Router();

router.route("/polls").post(pollValidation,);
router.route("/polls").get(fetchingAllPolls);
router.route("/polls/:id").post(voting);
 
module.exports=router