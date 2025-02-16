const mongo= require("mongoose")

const PollingSchema = new mongo.Schema({
    question: { type: String, required: true },
    options: [
      {
        text: { type: String, required: true },
        votes: { type: Number, default: 0 },
      },
    ],
  });
  
  const Polling = mongoose.model('Polling', PollSchema);
module.exports=Polling