/**
 * Service for Nigerian Text-to-Speech (TTS) using AmeboGPT.
 * This service converts text into audio with authentic Nigerian accents.
 */

const AMEBO_VOICES = {
    'English': 'ezinne-female', // Example AmeboGPT voice identifiers
    'Pidgin': 'pidgin-male',
    'Yoruba': 'olu-male',
    'Hausa': 'musa-male',
    'Igbo': 'chidi-male'
};

const API_BASE_URL = 'https://api.amebogpt.com.ng/v1';

/**
 * Converts text to speech using AmeboGPT with native Nigerian accents.
 * @param {string} text - The text to speak.
 * @param {string} language - The language key ('English', 'Pidgin', etc.).
 */
export const speakNative = async (text, language = 'English') => {
    const apiKey = import.meta.env.VITE_VOICE_API_KEY;

    if (!apiKey) {
        console.warn("No VITE_VOICE_API_KEY found. Falling back to browser Speech API.");
        speakWithBrowser(text, language);
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/tts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                voice_id: AMEBO_VOICES[language] || AMEBO_VOICES['English'],
                format: 'mp3'
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "AmeboGPT API Error");
        }

        const data = await response.json();

        // AmeboGPT typically returns a URL or the actual audio data
        const audioUrl = data.audio_url || data.url;

        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        } else {
            throw new Error("No audio URL returned from AmeboGPT");
        }
    } catch (error) {
        console.error("AmeboGPT Speech Failed:", error);
        // Fallback to browser TTS if API fails
        speakWithBrowser(text, language);
    }
};

/**
 * Fallback to built-in browser speech synthesis.
 */
const speakWithBrowser = (text, language) => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Map language names to likely browser-supported codes
    const langMap = {
        'English': 'en-NG',
        'Pidgin': 'en-NG',
        'Yoruba': 'yo-NG',
        'Hausa': 'ha-NG',
        'Igbo': 'ig-NG'
    };

    utterance.lang = langMap[language] || 'en-NG';
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    synth.speak(utterance);
};
