const Question = require("../models/question");
const User = require("../models/user");
const Vote = require("../models/votes");
const getDate = require("../utils/getDate");

module.exports.showAllQuestions = async (req, res) => {
  const { user } = req.query;
  if (user) {
    const questions = await Question.find({ author: user }).populate("author");
    res.json(questions);
  } else {
    const questions = await Question.find({}).populate("author");
    res.json(questions);
  }
};

module.exports.showOneQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id)
    .populate("author", "firstname")
    .populate({
      path: "answers",
      populate: [
        {
          path: "replies",
        },
        {
          path: "author",
        },
      ],
    });
  res.json(question);
};

module.exports.showByTags = async (req, res) => {
  const { Tags } = req.body;
  const questions = await Question.find({
    tags: { $elemMatch: { $in: Tags } },
  });
  res.json(questions);
};

module.exports.popularQuestions = async (req, res) => {
  var questions = await Question.find({}).populate("author");
  questions = questions
    .sort((a, b) => {
      return b.voteCount - a.voteCount;
    })
    .slice(0, 3);
  res.json(questions);
};

module.exports.addQuestion = async (req, res) => {
  const user = await User.findOne({ outlook_id: req.user.id });
  const question = new Question(req.body);
  question.author = user;
  question.voteCount = 0;
  question.resolved = false;
  question.postedOn = getDate();
  await question.save();
  res.send("Added new question");
};

module.exports.editQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findByIdAndUpdate(id, req.body);
  res.send("Question edited");
};

module.exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findByIdAndDelete(id);
  res.send("Deleted Question");
};

module.exports.addVote = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id)
    .populate("author", "firstname")
    .populate({
      path: "answers",
      populate: [
        {
          path: "replies",
        },
        {
          path: "author",
        },
      ],
    })
    .populate({
      path: "votes",
      populate: [
        {
          path: "user",
        },
      ],
    });
  const userId = req.user.id;
  const user = await User.findOne({ outlook_id: userId });
  const vote = req.body.vote;
  const newVote = new Vote({
    user: user._id,
    vote,
  });
  await newVote.save();
  if (!(vote == 0 || vote == 1 || vote == -1)) {
    res.send("Invalid Vote");
  }
  const existingVote = question.votes.find((v) => v.user._id.equals(user._id));
  if (existingVote) {
    question.voteCount += vote - existingVote.vote;
    question.votes.pull(existingVote);
    question.votes.push(newVote);
  } else if (vote != 0) {
    question.voteCount += vote;
    question.votes.push(newVote);
  }
  await question.save();
  res.json(question);
};

module.exports.resolveQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  question.resolved = !question.resolved;
  await question.save();
  res.send("Success");
};

module.exports.checkVote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const user = await User.findOne({ outlook_id: userId });
  const question = await Question.findById(id).populate("votes");
  const foundUser = question.votes.filter((ques) => ques.user.equals(user._id));
  res.json(foundUser);
};

module.exports.hostelQuestions = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findOne({ outlook_id: userId });
  var hostel = user.hostel;
  if (!hostel) {
    res.json({});
  }
  var questions = await Question.find({
    tags: { $elemMatch: { $in: hostel } },
  }).populate("author");
  if (questions.length > 3) {
    questions = questions
      .sort((a, b) => {
        return b.voteCount - a.voteCount;
      })
      .slice(0, 3);
  }
  res.json({ hostel, questions });
};

module.exports.departmentQuestions = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findOne({ outlook_id: userId });
  var department = user.department;
  if (!department) {
    res.json({});
  }
  var questions = await Question.find({
    tags: { $elemMatch: { $in: department } },
  }).populate("author");
  if (questions.length > 3) {
    questions = questions
      .sort((a, b) => {
        return b.voteCount - a.voteCount;
      })
      .slice(0, 3);
  }
  res.json({ department, questions });
};
