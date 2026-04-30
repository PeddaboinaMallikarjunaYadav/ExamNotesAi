// Connecting the Gemini API services 
const gemini_url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

// Generating gemini Response
export const generateGeminiResponse = async (prompt) => {
  try {
    // Sending the Request to Gemini API using POST method
    const response = await fetch(
      `${gemini_url}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          contents: [ // conversation
            {
              parts: [ // message chunks
                {
                  text: prompt, // my prompt
                },
              ],
            },
          ],
        }),
      },
    );
    // Checking if the reponse is not correct (Handling HTTP errors) 
    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    //Converting response to json
    const data = await response.json();

    //Extracting AI output
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    // Checking if the text is generated
    if (!text) {
      throw new Error("No Text returned from Gemini");
    }

    //Removing markdown format (can return ```)
    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    
    // Checking if the it's a plain text or json
    let parsed;
    try {
      parsed = JSON.parse(cleanText);
    } catch {
      parsed = cleanText; //fallback
    }
    return parsed;
    //Throwning an error if anything fails
  } catch (e) {
    console.error("Gemini Fetch Error: ", e);
    throw new Error(e.message || "Gemini API fetch Error");
  }
};
