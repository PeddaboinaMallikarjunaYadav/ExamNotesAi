import Notes from "../models/nodes.model.js";
import userModel from "../models/user.model.js";
import { generateGeminiResponse } from "../services/gemini.services.js";
import { buildPrompt } from "../utils/promptBuilder.js";

export const generateNotes = async (req, res) => {
  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false, // Initially giving them false if user requires them then will update
      includeDiagram = false,
      includeChart = false,
    } = req.body; // Getting all the required things to generate notes

    if (!topic || typeof topic !== "string") {
      return res.status(400).json({ message: "Topic is Required" }); // If uses dosen't enter any topic
    }

    const user = await userModel.findById(req.userId); // Getting the user from the DB
    if (!user) {
      return res.status(400).json({ message: "User is not found" }); // If uses dosen't exists
    }
    if (user.credits < 10) {
      user.isCreditAvailable = false; // Changing the credit avalibality
      await user.save();
      return res.status(403).json({ message: "Insufficient credits" }); // Checking if user has enough credits
    }

    // getting the prompt from promptBuilder.js
    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    //Creating a delay for each API call
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let aiResponse;

    // Generating the AI Reponse
    try {
      aiResponse = await generateGeminiResponse(prompt);
    } catch (e) {
      if (
        e.message?.includes("RESOURCE_EXHAUSTED") ||
        e.message?.includes("429")
      ) {
        await delay(50000);
        aiResponse = await generateGeminiResponse(prompt);
      } else if (e.message?.toLowerCase().includes("quota")) {
        return res
          .status(429)
          .json({ message: "Daily quota exceeded. Try again tomorrow" });
      } else {
        throw e;
      }
    }
    // Storing the user's history
    const notes = await Notes.create({
      user: user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
      content: aiResponse, // storing the ai Response
    });

    user.credits -= 10;
    if (user.credits <= 0) user.isCreditAvailable = false;

    if (!Array.isArray(user.notes)) {
      user.notes = [];
    }

    user.notes.push(notes._id);

    await user.save();

    return res.status(200).json({
      data: aiResponse,
      notes: notes._id,
      creditsLeft: user.credits,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI Generation failed",
      message: error.message,
    });
  }
};
