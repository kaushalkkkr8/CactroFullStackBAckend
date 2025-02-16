const { fetchingAllPolls, voting, creationgPollQuestion } = require("../Controller/pollController");
const pollValidation = require("../middleware/pollMiddleware");

const router = require("express").Router();

router.route("/polls").post(pollValidation, creationgPollQuestion);
router.route("/polls").get(fetchingAllPolls);
router.route("/polls/:id").post(voting);

module.exports = router;
