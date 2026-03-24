const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const questions = [
  {
    id: 1,
    question: "Which Azure service is used to host web apps?",
    options: [
      "Azure Functions",
      "Azure App Service",
      "Azure Blob Storage",
      "Azure SQL Database",
    ],
    answer: "Azure App Service",
  },
  {
    id: 2,
    question: "A company wants to stop buying physical servers and instead pay only for the computing resources they use each month. Which financial model does this represent?",
    options: [
      "Fixed Asset Investment",
      "Resource Depreciation",
      "Capital Expenditure (CapEx)",
      "Operational Expenditure (OpEx)",
    ],
    answer: "Operational Expenditure (OpEx)",
  },
  {
    id: 3,
    question: "Which cloud attribute ensures that a service remains available even if a component or a whole data center fails?",
    options: [
      "Elasticity",
      "Agility",
      "High Availability",
      "Scalability",
    ],
    answer: "High Availability",
  },
];

// Default route
app.get("/", (req, res) => {
  res.send("Quiz Backend is running 🚀 Use /question (GET) or /answer (POST)");
});

let currentQuestionIndex = 0;

app.get("/question", (req, res) => {
  res.json(questions[currentQuestionIndex]);
});

app.post("/answer", (req, res) => {
  const { answer } = req.body;
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = answer === currentQuestion.answer;

  // Move to next question or reset
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    currentQuestionIndex = 0; // reset for next round
  }

  res.json({
    correct: isCorrect,
    correctAnswer: currentQuestion.answer,
    nextQuestionAvailable: currentQuestionIndex < questions.length,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});