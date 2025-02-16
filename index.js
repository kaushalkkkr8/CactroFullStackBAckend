const express= require ("express")
const cors= require("cors")
const Polling = require("./model/model")
const app = express()

require("dotenv").config()
require("./db.connect")
const PORT= 8000

app.get("/",(req,res)=>{
    res.send("Hello Cracto")
})

app.post('/api/polls', async (req, res) => {
    try {
      const poll = new Polling(req.body);
      await poll.save();
      res.status(201).json(poll);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get all polls
  app.get('/api/polls', async (req, res) => {
    try {
      const polls = await Polling.find();
      res.json(polls);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  app.post('/api/polls/:id/vote', async (req, res) => {
    try {
      const { id } = req.params;
      const { optionIndex } = req.body;
  
      const updateResult = await Polling.findByIdAndUpdate (id,
        { _id: id, [`options.${optionIndex}`]: { $exists: true } },
        {
          $inc: { [`options.${optionIndex}.votes`]: 1 },
        }
      );
  
      if (updateResult.matchedCount === 0) {
        return res.status(404).json({ error: 'Poll not found or option index is invalid' });
      }
  
  
      res.json({ poll: updateResult });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while voting on the poll' });
    }
  });
  


app.listen(PORT,()=>{
    console.log("App is running on port: ",PORT);
    
})

app.use(express.json())
app.use(cors())