const Polling = require("../model/model");

const creationgPollQuestion = async (req, res) => {
  try {
    const poll = new Polling(req.body);
    await poll.save();
    res.status(201).json(poll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fetchingAllPolls = async (req, res) => {
  try {
    const polls = await Polling.find();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const voting = async (req, res) => {
  try {
    const { id } = req.params;
    const { optionIndex } = req.body;

    const updateResult = await Polling.findByIdAndUpdate(
      id,
      { _id: id, [`options.${optionIndex}`]: { $exists: true } },
      {
        $inc: { [`options.${optionIndex}.votes`]: 1 },
      }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ error: "Poll not found or option index is invalid" });
    }

    res.json({ poll: updateResult });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while voting on the poll" });
  }
};

module.exports={creationgPollQuestion,fetchingAllPolls,voting}
