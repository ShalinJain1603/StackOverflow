const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        vote: {
            type: Number,
            required: true
        }
    }
);


const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;