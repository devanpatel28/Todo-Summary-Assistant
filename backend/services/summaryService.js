import axios from "axios";
import { getConfig } from "../config/envConfig.js";

export const summarizeTodos = async (todos) => {
  if (!todos.length) return "No todos to summarize.";

  const config = getConfig();
  const COHERE_API_KEY = config.COHERE_API_KEY;
  const SLACK_WEBHOOK_URL = config.SLACK_WEBHOOK_URL;
  const FIREBASE_API_KEY = config.FIREBASE_API_KEY;

  // Log environment variables for debugging
  console.log("COHERE_API_KEY:", COHERE_API_KEY ? "Loaded" : "Missing");
  console.log("SLACK_WEBHOOK_URL:", SLACK_WEBHOOK_URL ? "Loaded" : "Missing");
  console.log("FIREBASE_API_KEY:", FIREBASE_API_KEY ? "Loaded" : "Missing");

  if (!COHERE_API_KEY) {
    console.error("COHERE_API_KEY is not set in config");
    throw new Error("Cohere API key is missing");
  }
  if (!SLACK_WEBHOOK_URL) {
    console.error("SLACK_WEBHOOK_URL is not set in config");
    throw new Error("Slack Webhook URL is missing");
  }

  const todoTitles = todos.map((todo) => todo.title).join("\n");
  const prompt = `Summarize the following to-do list into a concise paragraph:\n${todoTitles}`;

  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/generate",
      {
        prompt,
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data.generations[0].text.trim();

    try {
      await axios.post(SLACK_WEBHOOK_URL, {
        text: `Todo Summary: ${summary}`,
      });
      console.log("Successfully sent summary to Slack:", summary);
    } catch (slackError) {
      console.error("Error sending to Slack:", {
        message: slackError.message,
        response: slackError.response?.data,
        status: slackError.response?.status,
      });
      throw new Error("Failed to send summary to Slack");
    }

    return summary;
  } catch (error) {
    console.error("Error in summarizeTodos:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      axiosCode: error.code,
    });
    throw new Error("Failed to summarize or send to Slack");
  }
};