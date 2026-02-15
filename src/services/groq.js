import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true, // Required for client-side API calls
});

/**
 * Fetches a response from Groq based on user message and selected language.
 * @param {string} userMessage - The user's input message.
 * @param {string} language - The selected language name (e.g., 'English', 'Pidgin').
 * @returns {Promise<string>} - The AI generated response.
 */
export const getGroqResponse = async (userMessage, language = 'English') => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are Insuria AI, a professional but friendly insurance advisor for the broad African market (Nigeria, Ghana, Kenya, South Africa, etc.). 
                    Your goal is to help users understand their policies, prices, and claims.
                    Respond ONLY in the requested language: ${language}.
                    
                    STRICT RULES:
                    - If language is 'English', you must use formal, Standard English. Do NOT use Pidgin or "broken" English.
                    - If language is 'Pidgin', you must use natural West African Pidgin English.
                    - If language is 'Yoruba', 'Hausa', or 'Igbo', use formal versions of those languages.
                    
                    Be concise, helpful, and accurate. Mention relevant African insurance contexts (like NHIS in Nigeria, NHIF in Kenya, diverse motor insurance laws, etc.) when relevant.`
                },
                {
                    role: "user",
                    content: userMessage,
                },
            ],
            model: "llama-3.3-70b-versatile",
        });

        return chatCompletion.choices[0]?.message?.content || "I no fit process that request right now. Abeg try again later.";
    } catch (error) {
        console.error("Groq API Error:", error);
        return "Sorry, I'm having trouble connecting to my brain. Please check your internet or try again later.";
    }
};

/**
 * Analyzes an image for damage assessment.
 * @param {string} imageBase64 - The base64 string of the image.
 * @returns {Promise<Object>} - The analysis result in JSON format.
 */
export const analyzeDamage = async (imageBase64) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Analyze this image for vehicle damage. 
                            Provide a repair estimate relevant to the African market (in Naira).
                            
                            Return ONLY a raw JSON object (no markdown formatting) with this exact structure:
                            {
                                "risk_title": "Short title of the risk (e.g. Structural Risk Detected)",
                                "risk_description": "2 sentence description of the damage and safety implication.",
                                "parts": [
                                    {"name": "Part Name", "cost": "Estimated Cost (e.g. ₦45,000)"},
                                    ... (list 3-4 major parts)
                                ],
                                "total_estimate": "Total Cost (e.g. ₦250,000)",
                                "repairability": "High/Medium/Low"
                            }`
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: imageBase64,
                            },
                        },
                    ],
                },
            ],
            model: "llama-3.2-90b-vision-preview",
            temperature: 0.1,
            max_tokens: 1024,
        });

        const content = chatCompletion.choices[0]?.message?.content;
        // Clean markdown code blocks if present
        const jsonString = content.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Vision API Error Full:", error);
        throw new Error(error.message || "Failed to analyze image");
    }
};
