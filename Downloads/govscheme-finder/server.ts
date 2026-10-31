import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// System instruction for Multilingual Citizen Scheme Assistant (All Major Indian Languages)
const MULTILINGUAL_ASSISTANT_SYSTEM_PROMPT = `
You are the official 'Indian Citizen Welfare & Government Schemes Guide' (அரசு நலத்திட்ட வழிகாட்டி / सरकारी योजना मार्गदर्शक / ప్రభుత్వ సంక్షేಮ పథకాల గైడ్ / ಸರ್ಕಾರಿ ಯೋಜನೆ ಮಾರ್ಗದರ್ಶಿ / സർക്കാർ ക്ഷേമപദ്ധതി സഹായി / সরকারি প্রকল্প সহায়ক).
You are an empathetic, patient, simple-language AI guide built to break literacy and language barriers for Indian citizens, especially rural residents, farmers, women, elders, students, daily-wage workers, and small business owners across all Indian states and Union Territories.

You are fully fluent in all major Indian languages:
1. Tamil (தமிழ்)
2. Hindi (हिन्दी)
3. Telugu (తెలుగు)
4. Kannada (ಕನ್ನಡ)
5. Malayalam (മലയാളം)
6. Bengali (বাংলা)
7. Marathi (मराठी)
8. Gujarati (ગુજરાતી)
9. Punjabi (ਪੰਜਾਬੀ)
10. Odia (ଓଡ଼ିଆ)
11. English

Primary Directives:
1. TARGET LANGUAGE & CODE-SWITCHING (COMBINATION OF LANGUAGES):
   - Fully support pure regional languages (Tamil, Hindi, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, Odia, English).
   - Fully support COMBINATIONS OF LANGUAGES and code-mixing (e.g. Tanglish "naan farmer enaku enna scheme iruku", Hinglish "mujhe agriculture scheme ke baare mein batao", Tenglish "nenu farmer ni naaku PM kisan eppudu vastundi", Kanglish, etc.).
   - When a user asks in a code-mixed or transliterated Indian language, instantly understand their request and reply either in their active app language or in warm, simple bilingual/conversational style so that rural and semi-literate beneficiaries understand clearly.
2. SIMPLICITY OVER JARGON: Never use confusing bureaucratic or legalistic terms. Explain procedures in everyday words that an ordinary citizen or non-reader can immediately understand.
3. STRUCTURED BREAKDOWN: Every scheme answer MUST cover:
   - 📌 Scheme Name (in target language & English)
   - 💰 What assistance is given (exact ₹ amount, direct bank transfer, free cashless medical cover, pension, laptop, or subsidy)
   - 👥 Who is eligible (age, income ceiling, occupation, land ownership)
   - 📄 Required documents (Aadhaar, Ration Card, Bank Passbook, Land Patta, etc.)
   - 🏛️ Where and how to apply (Nearest CSC/e-Sevai center, Taluk/Panchayat office, or official website)
4. 'speechSummary': Create 2-4 crisp, warm sentences in the target language designed to be read aloud via Text-To-Speech audio playback for citizens who cannot read screen text.
5. 'matchedSchemes': Return matching schemes with their localized name, category, and benefit.
6. 'suggestedQuestions': 2-3 natural follow-up questions in the target language.

Always return strictly valid JSON matching this schema:
{
  "reply": "Full friendly response in the target language with clean formatting, emojis, and clear sections",
  "tamilReply": "Response in Tamil if requested or fallback string",
  "speechSummary": "2-3 crisp spoken sentences in the target language for text-to-speech audio playback",
  "languageCode": "ta|hi|te|kn|ml|bn|mr|gu|pa|or|en",
  "matchedSchemes": [
    {
      "name": "Scheme Name",
      "tamilName": "திட்டத்தின் பெயர்",
      "localizedName": "Name in target language",
      "benefit": "Key benefit description",
      "category": "Category name"
    }
  ],
  "suggestedQuestions": ["Question 1", "Question 2", "Question 3"]
}
`;

// API Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'GovScheme Finder API',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    supportedLanguages: ['en', 'ta', 'hi', 'te', 'kn', 'ml', 'bn', 'mr', 'gu', 'pa', 'or'],
  });
});

// Unified Multilingual & Tamil Chat Assistant Endpoint Handler
async function handleChatRequest(req: Request, res: Response) {
  try {
    const { 
      message, 
      conversationHistory = [], 
      userProfile, 
      schemesSummary = [],
      language = 'ta' // Default to Tamil or requested Indian language
    } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getGeminiClient();

    // If Gemini key is not configured, provide localized rule-based Indian language responses
    if (!ai) {
      console.warn('GEMINI_API_KEY is not set. Falling back to local multilingual knowledge engine.');
      const fallbackResponse = generateLocalMultilingualResponse(message, language, userProfile);
      res.json(fallbackResponse);
      return;
    }

    // Build context about available schemes and user
    let contextPrompt = `Target Language for this response: ${language} (Code: ${language}). Please reply strictly in this language.\n`;
    if (userProfile) {
      contextPrompt += `\nCitizen Profile: State: ${userProfile.state || 'All India'}, Occupation: ${userProfile.occupation || 'Not specified'}, Age: ${userProfile.age || 'Not specified'}, Gender: ${userProfile.gender || 'All'}, Annual Income: ₹${userProfile.incomeAnnual || 'Not specified'}.\n`;
    }

    if (schemesSummary && schemesSummary.length > 0) {
      contextPrompt += `\nAvailable Verified Government Schemes in Database:\n` +
        schemesSummary.slice(0, 15).map((s: any) => `- ${s.name} (${s.categoryName}): ${s.keyBenefit}. Age: ${s.eligibility?.minimumAge || 0}-${s.eligibility?.maximumAge || 'No limit'}, Allowed: ${s.eligibility?.allowedOccupations?.join(', ')}`).join('\n') + '\n';
    }

    // Build chat history
    const formattedHistory = conversationHistory.slice(-4).map((item: any) => ({
      role: item.role === 'user' ? 'user' : 'model',
      parts: [{ text: item.text }],
    }));

    const currentPrompt = `${contextPrompt}\nUser Query: "${message}"\nPlease answer warmly and clearly in the target language (${language}).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        ...formattedHistory,
        {
          role: 'user',
          parts: [{ text: currentPrompt }],
        },
      ],
      config: {
        systemInstruction: MULTILINGUAL_ASSISTANT_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: 'The detailed, empathetic answer in the requested Indian language with friendly emojis and steps.',
            },
            tamilReply: {
              type: Type.STRING,
              description: 'Tamil version or same as reply for backward compatibility.',
            },
            speechSummary: {
              type: Type.STRING,
              description: 'Short 2-3 sentence spoken summary in the target language for illiterate citizens via audio text-to-speech.',
            },
            languageCode: {
              type: Type.STRING,
              description: 'The language code (e.g. ta, hi, te, kn, ml, bn, mr, gu, pa, or, en).',
            },
            matchedSchemes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  tamilName: { type: Type.STRING },
                  localizedName: { type: Type.STRING },
                  benefit: { type: Type.STRING },
                  category: { type: Type.STRING },
                },
              },
            },
            suggestedQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['speechSummary'],
        },
      },
    });

    const outputText = response.text || '';
    try {
      const parsed = JSON.parse(outputText);
      if (!parsed.reply && parsed.tamilReply) {
        parsed.reply = parsed.tamilReply;
      }
      if (!parsed.tamilReply && parsed.reply) {
        parsed.tamilReply = parsed.reply;
      }
      parsed.languageCode = parsed.languageCode || language;
      res.json(parsed);
    } catch (parseError) {
      const fallback = generateLocalMultilingualResponse(message, language, userProfile);
      res.json(fallback);
    }
  } catch (error: any) {
    console.warn('Gemini API call failed or unavailable, providing local multilingual guidance:', error?.message || error);
    const fallbackResponse = generateLocalMultilingualResponse(req.body.message || '', req.body.language || 'ta', req.body.userProfile);
    res.json(fallbackResponse);
  }
}

// Support both endpoints
app.post('/api/chat', handleChatRequest);
app.post('/api/chat/tamil', handleChatRequest);
app.post('/api/chat/multilingual', handleChatRequest);

// Local Multilingual Response Engine for Indian Languages
function generateLocalMultilingualResponse(query: string, lang: string = 'ta', profile: any = null) {
  const q = (query || '').toLowerCase();
  const l = (lang || 'ta').toLowerCase();

  // Detect topic: farmers, women, health, seniors, students, business
  // Handles native scripts, English, Tanglish, Hinglish, Tenglish, Kanglish code-mixing
  const isFarmer = q.includes('விவசாயி') || q.includes('உழவர்') || q.includes('kisan') || q.includes('kisaan') || q.includes('kheti') || q.includes('vivasaayi') || q.includes('vivasayam') || q.includes('fasal') || q.includes('किसान') || q.includes('రైతు') || q.includes('raithu') || q.includes('ರೈತ') || q.includes('raitha') || q.includes('കർഷക') || q.includes('কৃষক') || q.includes('krishak') || q.includes('शेतकरी') || q.includes('ખેડૂત') || q.includes('ਕਿਸਾਨ') || q.includes('ଚାଷୀ') || q.includes('farmer') || q.includes('agri') || q.includes('agriculture') || q.includes('crop');
  const isWomen = q.includes('பெண்') || q.includes('மகளிர்') || q.includes('உரிமை') || q.includes('mahila') || q.includes('magalir') || q.includes('penngal') || q.includes('ladli') || q.includes('महिला') || q.includes('aurat') || q.includes('stree') || q.includes('మహిళ') || q.includes('mahilalu') || q.includes('ಮಹಿಳೆ') || q.includes('mahileyaru') || q.includes('സ്ത്രീ') || q.includes('নারী') || q.includes('স্ত্রী') || q.includes('સ્ત્રી') || q.includes('ਔਰਤ') || q.includes('ମହିଳା') || q.includes('women') || q.includes('female') || q.includes('1000') || q.includes('shakti');
  const isHealth = q.includes('மருத்துவ') || q.includes('சிகிச்சை') || q.includes('காப்பீடு') || q.includes('maruthuvam') || q.includes('kaapeedu') || q.includes('ayushman') || q.includes('स्वास्थ्य') || q.includes('swasthya') || q.includes('ilaaj') || q.includes('hospital') || q.includes('ఆరోగ్య') || q.includes('aarogyam') || q.includes('చికిత్స') || q.includes('ಆರೋಗ್ಯ') || q.includes('ಆಸ್ಪತ್ರೆ') || q.includes('ആരോഗ്യ') || q.includes('ചികിത്സ') || q.includes('স্বাস্থ্য') || q.includes('ডাক্তার') || q.includes('आरोग्य') || q.includes('दवाखाना') || q.includes('સ્વાસ્થ્ય') || q.includes('ઇલાજ') || q.includes('ਸਿਹਤ') || q.includes('ਹਸਪਤਾਲ') || q.includes('ସ୍ୱାସ୍ଥ୍ୟ') || q.includes('ଚିକିତ୍ସା') || q.includes('health') || q.includes('medical') || q.includes('insurance');
  const isSenior = q.includes('முதியோர்') || q.includes('ஓய்வூதியம்') || q.includes('muthiyor') || q.includes('oyvoothiyam') || q.includes('pension') || q.includes('वृद्ध') || q.includes('बुजुर्ग') || q.includes('vridha') || q.includes('bujurg') || q.includes('పెన్షన్') || q.includes('వృద్ధాప్య') || q.includes('vrudhapya') || q.includes('ಪಿಂಚಣಿ') || q.includes('ಹಿರಿಯ') || q.includes('പെൻഷൻ') || q.includes('വാർദ്ധക്യ') || q.includes('পেনশন') || q.includes('বার্ধক্য') || q.includes('पेन्शन') || q.includes('ज्येष्ठ') || q.includes('પેન્શન') || q.includes('વૃદ્ધ') || q.includes('ਪੈਨਸ਼ਨ') || q.includes('ਬਜ਼ੁਰਗ') || q.includes('ପେନସନ') || q.includes('old age') || q.includes('senior');
  const isStudent = q.includes('மாணவ') || q.includes('கல்வி') || q.includes('manavargal') || q.includes('kalvi') || q.includes('padippu') || q.includes('scholarship') || q.includes('छात्र') || q.includes('chhatra') || q.includes('padhai') || q.includes('shiksha') || q.includes('విద్యార్థి') || q.includes('chaduvu') || q.includes('ವಿದ್ಯಾರ್ಥಿ') || q.includes('ಶಿಕ್ಷಣ') || q.includes('വിദ്യാർത്ഥി') || q.includes('വിദ്യാഭ്യാസം') || q.includes('ছাত্র') || q.includes('শিক্ষা') || q.includes('विद्यार्थी') || q.includes('शिक्षण') || q.includes('વિદ્યાર્થી') || q.includes('શિક્ષણ') || q.includes('ਵਿਦਿਆਰਥੀ') || q.includes('ਪੜ੍ਹਾਈ') || q.includes('ଛାତ୍ର') || q.includes('ଶିକ୍ଷା') || q.includes('student') || q.includes('college') || q.includes('school');
  const isBusiness = q.includes('கடன்') || q.includes('சுயதொழில்') || q.includes('kadan') || q.includes('thozhil') || q.includes('loan') || q.includes('mudra') || q.includes('ऋण') || q.includes('karz') || q.includes('vyapar') || q.includes('rojgar') || q.includes('రుణ') || q.includes('వ్యాపారం') || q.includes('సాల') || q.includes('ಉದ್ಯೋಗ') || q.includes('ವಾയ്പ') || q.includes('സംരംഭം') || q.includes('ঋণ') || q.includes('ব্যবসা') || q.includes('कर्ज') || q.includes('व्यवसाय') || q.includes('લોન') || q.includes('ધંધો') || q.includes('ਕਰਜ਼ਾ') || q.includes('ਕਾਰੋਬਾਰ') || q.includes('ଋଣ') || q.includes('ବ୍ୟବସାୟ') || q.includes('business') || q.includes('startup') || q.includes('self employ');

  // Multi-language response templates
  if (isFarmer) {
    if (l === 'hi') {
      return {
        reply: `🌾 **किसान कल्याणकारी योजनाएं:**\n\n1. **प्रधानमंत्री किसान सम्मान निधि (PM-KISAN):**\n- 💰 **लाभ:** ₹6,000 प्रति वर्ष 3 किश्तों (प्रत्येक ₹2,000) में सीधे बैंक खाते में।\n- 👥 **पात्रता:** सभी किसान परिवार जिनके पास खेती योग्य भूमि है।\n- 📄 **दस्तावेज:** आधार कार्ड, खतौनी/भूलेख, बैंक पासबुक।\n- 🏛️ **आवेदन:** नजदीकी सीएससी सेंटर (CSC) या pmkisan.gov.in पर।\n\n2. **प्रधानमंत्री फसल बीमा योजना (PMFBY):**\n- प्राकृतिक आपदाओं से फसल नुकसान पर न्यूनतम प्रीमियम पर बीमा सहायता।`,
        tamilReply: `🌾 **விவசாயிகளுக்கான உதவித்தொகை: பிஎம் கிசான் திட்டம் மூலம் ஆண்டுக்கு ₹6,000.**`,
        speechSummary: `नमस्ते! किसानों को पीएम किसान योजना के तहत हर साल छह हजार रुपये तीन किस्तों में सीधे बैंक खाते में मिलते हैं। इसके लिए आधार कार्ड और जमीन के दस्तावेज चाहिए। नजदीकी सीएससी सेंटर में आवेदन करें।`,
        languageCode: 'hi',
        matchedSchemes: [{ name: 'PM Kisan Samman Nidhi', localizedName: 'पीएम किसान सम्मान निधि', benefit: '₹6,000 प्रति वर्ष सीधा लाभ', category: 'कृषि एवं ग्रामीण' }],
        suggestedQuestions: ['पीएम किसान की अगली किस्त कब आएगी?', 'फसल बीमा कैसे करवाएं?', 'खाद और बीज पर क्या सब्सिडी मिलती है?']
      };
    }
    if (l === 'te') {
      return {
        reply: `🌾 **రైతు సంక్షేమ పథకాలు:**\n\n1. **పీఎం కిసాన్ సమ్మాన్ నిధి (PM-KISAN):**\n- 💰 **సహాయం:** ఏడాదికి ₹6,000 మూడు విడతల్లో నేరుగా బ్యాంకు ఖాతాలో జమ.\n- 👥 **అర్హత:** సాగుభూమి ఉన్న రైతులందరూ అర్హులు.\n- 📄 **పత్రాలు:** ఆధార్ కార్డు, పట్టాదార్ పాస్ బుక్, బ్యాంకు ఖాతా.\n- 🏛️ **దరఖాస్తు:** మీ-సేవా లేదా pmkisan.gov.in ద్వారా.`,
        tamilReply: `🌾 **விவசாயிகளுக்கான உதவித்தொகை.**`,
        speechSummary: `నమస్కారం! పీఎం కిసాన్ ద్వారా రైతులకు ఏడాదికి ఆరు వేల రూపాయలు నేరుగా బ్యాంకు ఖాతాలో అందుతాయి. మీ-సేవా కేంద్రంలో దరఖాస్తు చేసుకోవచ్చు.`,
        languageCode: 'te',
        matchedSchemes: [{ name: 'PM Kisan Samman Nidhi', localizedName: 'పీఎం కిసాన్ సమ్మాన్ నిధి', benefit: 'ఏడాదికి ₹6,000 సహాయం', category: 'వ్యవసాయం' }],
        suggestedQuestions: ['పీఎం కిసాన్ డబ్బులు పడ్డాయో లేదో ఎలా చూడాలి?', 'రైతు బీమా ఎలా పొందాలి?']
      };
    }
    if (l === 'kn') {
      return {
        reply: `🌾 **ರೈತರ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳು:**\n\n1. **ಪ್ರಧಾನ ಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ (PM-KISAN):**\n- 💰 **ನೆರವು:** ವರ್ಷಕ್ಕೆ ₹6,000 ಮೂರು ಕಂತುಗಳಲ್ಲಿ ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ.\n- 👥 **ಅರ್ಹತೆ:** ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬಗಳು.\n- 📄 **ದಾಖಲೆಗಳು:** ಆಧಾರ್ ಕಾರ್ಡ್, ಪಹಣಿ (RTC), ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್.\n- 🏛️ **ಅರ್ಜಿ:** ಗ್ರಾಮ ಒನ್ ಅಥವಾ pmkisan.gov.in ನಲ್ಲಿ ಸಲ್ಲಿಸಿ.`,
        tamilReply: `🌾 **விவசாயிகளுக்கான திட்டம்.**`,
        speechSummary: `ನಮಸ್ಕಾರ! ಪಿಎಂ ಕಿಸಾನ್ ಯೋಜನೆಯಡಿ ರೈತರಿಗೆ ವರ್ಷಕ್ಕೆ ಆರು ಸಾವಿರ ರೂಪಾಯಿ ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಸಿಗುತ್ತದೆ. ಆಧಾರ್ ಮತ್ತು ಪಹಣಿ ನೀಡಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.`,
        languageCode: 'kn',
        matchedSchemes: [{ name: 'PM Kisan Samman Nidhi', localizedName: 'ಪಿಎಂ ಕಿಸಾನ್ ಯೋಜನೆ', benefit: 'ವರ್ಷಕ್ಕೆ ₹6,000 ನೇರ ನೆರವು', category: 'ಕೃಷಿ' }],
        suggestedQuestions: ['ಕಿಸಾನ್ ಕಂತಿನ ಹಣ ಬಂದಿದೆಯೇ ಎಂದು ತಿಳಿಯುವುದು ಹೇಗೆ?', 'ಬೆಳೆ ವಿಮೆ ಮಾಡಿಸುವುದು ಹೇಗೆ?']
      };
    }
    if (l === 'ml') {
      return {
        reply: `🌾 **കർഷക ക്ഷേമപദ്ധതികൾ:**\n\n1. **പിഎം കിസാൻ സമ്മാൻ നിധി (PM-KISAN):**\n- 💰 **സഹായം:** വർഷത്തിൽ ₹6,000 (3 ഗഡുക്കളായി ₹2,000 വീതം) നേരിട്ട് ബാങ്ക് അക്കൗണ്ടിലേക്ക്.\n- 👥 **അർഹത:** കൃഷിഭൂമിയുള്ള എല്ലാ കർഷക കുടുംബങ്ങൾക്കും.\n- 📄 **രേഖകൾ:** ആധാർ കാർഡ്, ഭൂമിയുടെ കരം രസീത്, ബാങ്ക് പാസ്ബുക്ക്.\n- 🏛️ **അപേക്ഷ:** അക്ഷയ കേന്ദ്രം അല്ലെങ്കിൽ pmkisan.gov.in വഴി.`,
        tamilReply: `🌾 **விவசாயிகளுக்கான உதவித்தொகை.**`,
        speechSummary: `നമസ്കാരം! കർഷകർക്ക് പിഎം കിസാൻ പദ്ധതി വഴി പ്രതിവർഷം ആറായിരം രൂപ നേരിട്ട് ബാങ്ക് അക്കൗണ്ടിൽ ലഭിക്കും. അക്ഷയ കേന്ദ്രം വഴി അപേക്ഷിക്കാം.`,
        languageCode: 'ml',
        matchedSchemes: [{ name: 'PM Kisan Samman Nidhi', localizedName: 'പിഎം കിസാൻ പദ്ധതി', benefit: 'പ്രതിവർഷം ₹6,000 സഹായം', category: 'കൃഷി' }],
        suggestedQuestions: ['പിഎം കിസാൻ പണം വന്നോ എന്ന് എങ്ങനെ പരിശോധിക്കാം?']
      };
    }
    if (l === 'bn') {
      return {
        reply: `🌾 **কৃষক কল্যাণ প্রকল্পসমূহ:**\n\n1. **প্রধানমন্ত্রী কিষাণ সম্মান নিধি (PM-KISAN):**\n- 💰 **সুবিধা:** বছরে ₹6,000 তিনটি কিস্তিতে (প্রতিটি ₹2,000) সরাসরি ব্যাঙ্ক অ্যাকাউন্টে।\n- 👥 **যোগ্যতা:** কৃষিজমি থাকা সকল কৃষক পরিবার।\n- 📄 **নথি:** আধার কার্ড, জমির খতিয়ান/পর্চা, ব্যাঙ্ক পাশবই।\n- 🏛️ **আবেদন:** নিকটবর্তী বাংলা সহায়তা কেন্দ্র (BSK), সিএসসি বা pmkisan.gov.in এ।`,
        tamilReply: `🌾 **விவசாயிகளுக்கான உதவி.**`,
        speechSummary: `নমস্কার! পিএম কিষাণ প্রকল্পে কৃষকরা বছরে ৬,০০০ টাকা সরাসরি অ্যাকাউন্টে পান। আধার কার্ড ও জমির কাগজ নিয়ে বিএসকে বা সিএসসিতে আবেদন করুন।`,
        languageCode: 'bn',
        matchedSchemes: [{ name: 'PM Kisan Samman Nidhi', localizedName: 'পিএম কিষাণ সম্মান নিধি', benefit: 'বছরে ₹6,000 সরাসরি অনুদান', category: 'কৃষি ও গ্রামীণ' }],
        suggestedQuestions: ['পিএম কিষাণ কিস্তির টাকা এসেছে কিনা কীভাবে দেখব?']
      };
    }
    if (l === 'mr') {
      return {
        reply: `🌾 **शेतकऱ्यांसाठी कल्याणकारी योजना:**\n\n1. **पंतप्रधान किसान सन्मान निधी (PM-KISAN) व नमो शेतकरी योजना:**\n- 💰 **लाभ:** केंद्र शासनाचे ₹6,000 + राज्य शासनाचे ₹6,000 = एकूण ₹12,000 प्रति वर्ष थेट बँक खात्यात.\n- 👥 **पात्रता:** शेतजमीन धारक शेतकरी कुटुंबे.\n- 📄 **कागदपत्रे:** आधार कार्ड, ७/१२ उतारा व ८-अ, बँक पासबूक.\n- 🏛️ **अर्ज:** आपले सरकार सेवा केंद्र किंवा pmkisan.gov.in.`,
        tamilReply: `🌾 **விவசாயிகளுக்கான உதவி.**`,
        speechSummary: `नमस्कार! शेतकऱ्यांना पीएम किसान व नमो शेतकरी योजनेतून वर्षाला थेट खात्यात मदत मिळते. आधार व सातबारा जोडून सेतू केंद्रात अर्ज करा.`,
        languageCode: 'mr',
        matchedSchemes: [{ name: 'PM Kisan Samman Nidhi', localizedName: 'पीएम किसान सन्मान निधी', benefit: 'वार्षिक थेट मदत', category: 'कृषी' }],
        suggestedQuestions: ['हप्ता जमा झाला की नाही कसे तपासायचे?']
      };
    }
    if (l === 'gu') {
      return {
        reply: `🌾 **ખેડૂત કલ્યાણકારી યોજનાઓ:**\n\n1. **પ્રધાનમંત્રી કિસાન સન્માન નિધિ (PM-KISAN):**\n- 💰 **સહાય:** વાર્ષિક ₹6,000 ત્રણ હપ્તામાં સીધા બેંક ખાતામાં.\n- 👥 **પાત્રતા:** ખેતીની જમીન ધરાવતા તમામ ખેડૂતો.\n- 📄 **દસ્તાવેજ:** આધાર કાર્ડ, ૭/૧૨ અને ૮-અ નો ઉતારો, બેંક પાસબુક.\n- 🏛️ **અરજી:** ઈ-ગ્રામ કેન્દ્ર અથવા pmkisan.gov.in.`,
        tamilReply: `🌾 **விவசாயிகளுக்கான திட்டம்.**`,
        speechSummary: `નમસ્તે! પીએમ કિસાન યોજના હેઠળ ખેડૂતોને વાર્ષિક છ હજાર રૂપિયા સીધા બેંક ખાતામાં મળે છે. ઈ-ગ્રામ કેન્દ્ર પરથી અરજી કરી શકો છો.`,
        languageCode: 'gu',
        matchedSchemes: [{ name: 'PM Kisan Samman Nidhi', localizedName: 'પીએમ કિસાન યોજના', benefit: 'વાર્ષિક ₹6,000 સહાય', category: 'કૃષિ' }],
        suggestedQuestions: ['હપ્તો જમા થયો કે નહીં કેવી રીતે જોવો?']
      };
    }
    // Default Tamil
    return {
      reply: `🌾 **விவசாயிகளுக்கான முக்கிய அரசுத் திட்டங்கள்:**\n\n1. **பிரதான் மந்திரி கிசான் சம்மான் நிதி (PM-KISAN):**\n- 💰 **உதவி:** ஆண்டுக்கு ₹6,000 வங்கி கணக்கில் நேரடியாக 3 தவணைகளாக (தலா ₹2,000) செலுத்தப்படும்.\n- 👥 **தகுதி:** சொந்தமாக விவசாய நிலம் வைத்திருக்கும் அனைத்து உழவர் குடும்பங்கள்.\n- 📄 **ஆவணங்கள்:** ஆதார் அட்டை, நிலப் பட்டா/சிட்டா, வங்கி கணக்கு புத்தகம்.\n- 🏛️ **விண்ணப்பிக்க:** அருகிலுள்ள இ-சேவை மையம் அல்லது pmkisan.gov.in இணையதளம்.\n\n2. **தமிழ்நாடு உழவர் பாதுகாப்புத் திட்டம்:**\n- விபத்து நிவாரணம், முதியோர் ஓய்வூதியம் மற்றும் கல்வி உதவி.`,
      tamilReply: `🌾 **விவசாயிகளுக்கான முக்கிய அரசுத் திட்டங்கள்:**\n\n1. **பிரதான் மந்திரி கிசான் சம்மான் நிதி (PM-KISAN):**\n- 💰 **உதவி:** ஆண்டுக்கு ₹6,000 வங்கி கணக்கில் நேரடியாக 3 தவணைகளாக (தலா ₹2,000) செலுத்தப்படும்.\n- 👥 **தகுதி:** சொந்தமாக விவசாய நிலம் வைத்திருக்கும் அனைத்து உழவர் குடும்பங்கள்.\n- 📄 **ஆவணங்கள்:** ஆதார் அட்டை, நிலப் பட்டா/சிட்டா, வங்கி கணக்கு புத்தகம்.\n- 🏛️ **விண்ணப்பிக்க:** அருகிலுள்ள இ-சேவை மையம் அல்லது pmkisan.gov.in இணையதளம்.`,
      speechSummary: `வணக்கம்! விவசாயிகளுக்கு பி.எம் கிசான் திட்டம் மூலம் ஆண்டுக்கு ஆறாயிரம் ரூபாய் நேரடியாக வங்கிக் கணக்கில் கிடைக்கிறது. இதற்கு ஆதார் அட்டை மற்றும் நிலப் பட்டா தேவை. அருகிலுள்ள இ-சேவை மையத்தில் விண்ணப்பிக்கலாம்.`,
      languageCode: 'ta',
      matchedSchemes: [{ name: 'PM Kisan Samman Nidhi', tamilName: 'பிஎம் கிசான் திட்டம்', localizedName: 'பிஎம் கிசான் திட்டம்', benefit: 'ஆண்டுக்கு ₹6,000 நேரடி உதவி', category: 'விவசாயம் & ஊரகம்' }],
      suggestedQuestions: ['பி.எம் கிசான் தவணை பணம் வந்ததா என பார்ப்பது எப்படி?', 'விவசாய உபகரணங்களுக்கு மானியம் கிடைக்குமா?', 'பயிர் காப்பீடு செய்வது எப்படி?']
    };
  }

  if (isWomen) {
    if (l === 'hi') {
      return {
        reply: `👩 **महिला एवं मातृत्व कल्याण योजनाएं:**\n\n1. **मातृत्व वंदना एवं महिला सहायता योजनाएं:**\n- 💰 **सहायता:** गर्भवती महिलाओं को पोषण हेतु ₹5,000 से ₹6,000 तक की प्रत्यक्ष सहायता।\n- 👥 **पात्रता:** 19 वर्ष या अधिक आयु की गर्भवती महिलाएं।\n- 📄 **दस्तावेज:** आधार कार्ड, मातृ एवं शिशु सुरक्षा कार्ड (MCP), बैंक पासबुक।\n\n2. **सुकन्या समृद्धि योजना (SSY):**\n- 10 वर्ष तक की बालिकाओं के लिए 8.2% की उच्चतम ब्याज दर वाली बचत योजना।`,
        tamilReply: `👩 **பெண்களுக்கான திட்டங்கள்.**`,
        speechSummary: `नमस्ते! महिलाओं के लिए मातृत्व सहायता योजना में पांच से छह हजार रुपये सीधे बैंक खाते में मिलते हैं। इसके अलावा सुकन्या समृद्धि में बच्चियों के लिए उच्च ब्याज वाली बचत योजना उपलब्ध है।`,
        languageCode: 'hi',
        matchedSchemes: [{ name: 'PMMVY Maternity Benefit', localizedName: 'प्रधानमंत्री मातृ वंदना योजना', benefit: '₹5,000 मातृत्व पोषण सहायता', category: 'महिला एवं बाल विकास' }],
        suggestedQuestions: ['सुकन्या समृद्धि खाता कैसे खोलें?', 'महिला स्वयं सहायता समूह को क्या लाभ मिलता है?']
      };
    }
    // Default Tamil for Women
    return {
      reply: `👩 **பெண்கள் மற்றும் குடும்பத் தலைவிகளுக்கான நலத்திட்டங்கள்:**\n\n1. **கலைஞர் மகளிர் உரிமைத் திட்டம் (KMUT):**\n- 💰 **உதவி:** குடும்பத் தலைவிகளுக்கு மாதம் ₹1,000 வங்கி கணக்கில் வரவு வைக்கப்படும்.\n- 👥 **தகுதி:** 21 வயது நிரம்பிய குடும்பத் தலைவிகள், ஆண்டு வருமானம் ₹2.5 லட்சத்திற்குள் இருக்க வேண்டும்.\n- 📄 **ஆவணங்கள்:** குடும்ப அட்டை (ரேஷன் கார்டு), ஆதார் அட்டை, வங்கி பாஸ்புக், மின் கட்டண அட்டை.\n- 🏛️ **விண்ணப்பிக்க:** இ-சேவை மையம் அல்லது சிறப்பு முகாம்கள்.\n\n2. **புதுமைப் பெண் திட்டம் (Moovalur Higher Education):**\n- அரசுப் பள்ளியில் 6 முதல் 12 வரை படித்து உயர்கல்வி படிக்கும் மாணவிகளுக்கு மாதம் ₹1,000 கல்வி உதவி.\n\n3. **சுகன்யா சம்ரித்தி யோஜனா (செல்வ மகள் சேமிப்பு):**\n- 10 வயதுக்குட்பட்ட பெண் குழந்தைகளுக்கு 8.2% வட்டியுடன் கூடிய உயர் சேமிப்பு திட்டம்.`,
      tamilReply: `👩 **பெண்கள் மற்றும் குடும்பத் தலைவிகளுக்கான நலத்திட்டங்கள்:**\n\n1. **கலைஞர் மகளிர் உரிமைத் திட்டம் (KMUT):**\n- 💰 **உதவி:** குடும்பத் தலைவிகளுக்கு மாதம் ₹1,000 வங்கி கணக்கில் வரவு வைக்கப்படும்.`,
      speechSummary: `வணக்கம்! தகுதியுள்ள குடும்பத் தலைவிகளுக்கு மாதம் ஆயிரம் ரூபாய் மகளிர் உரிமைத் தொகை வங்கி கணக்கில் கிடைக்கிறது. மேலும் மாணவிகளுக்கு மாதம் ஆயிரம் ரூபாய் புதுமைப் பெண் திட்டம் மூலம் வழங்கப்படுகிறது.`,
      languageCode: 'ta',
      matchedSchemes: [
        { name: 'Kalaignar Magalir Urimai Thogai', tamilName: 'கலைஞர் மகளிர் உரிமைத் திட்டம்', localizedName: 'கலைஞர் மகளிர் உரிமைத் திட்டம்', benefit: 'மாதம் ₹1,000 வங்கி கணக்கில்', category: 'பெண்கள் நலன்' },
        { name: 'Pudhumai Penn Scheme', tamilName: 'புதுமைப் பெண் திட்டம்', localizedName: 'புதுமைப் பெண் திட்டம்', benefit: 'மாணவிகளுக்கு மாதம் ₹1,000', category: 'கல்வி' }
      ],
      suggestedQuestions: ['மகளிர் உரிமை தொகைக்கு ரேஷன் கார்டு போதுமா?', 'புதுமைப் பெண் திட்டத்திற்கு எப்படி விண்ணப்பிப்பது?']
    };
  }

  if (isHealth) {
    if (l === 'hi') {
      return {
        reply: `🏥 **मुफ्त स्वास्थ्य एवं इलाज योजनाएं:**\n\n1. **आयुष्मान भारत (AB-PMJAY):**\n- 💰 **सहायता:** प्रति परिवार प्रति वर्ष ₹5,00,000 तक का मुफ्त कैशलेस इलाज।\n- 👥 **पात्रता:** सामाजिक-आर्थिक जनगणना (SECC) में शामिल परिवार एवं 70 वर्ष से अधिक उम्र के सभी वरिष्ठ नागरिक।\n- 📄 **दस्तावेज:** आधार कार्ड, राशन कार्ड।\n- 🏛️ **कार्ड बनवाने के लिए:** नजदीकी सरकारी अस्पताल या सीएससी केंद्र।`,
        tamilReply: `🏥 **மருத்துவ சிகிச்சை: ₹5 லட்சம் வரை இலவச சிகிச்சை.**`,
        speechSummary: `नमस्ते! आयुष्मान भारत योजना में प्रति वर्ष पांच लाख रुपये तक का मुफ्त इलाज मिलता है। नजदीकी सरकारी अस्पताल या सीएससी से आयुष्मान कार्ड बनवा सकते हैं।`,
        languageCode: 'hi',
        matchedSchemes: [{ name: 'Ayushman Bharat PM-JAY', localizedName: 'आयुष्मान भारत योजना', benefit: '₹5 लाख तक मुफ्त इलाज', category: 'स्वास्थ्य' }],
        suggestedQuestions: ['आयुष्मान कार्ड लिस्ट में नाम कैसे देखें?', '70 साल के बुजुर्गों का कार्ड कैसे बनता है?']
      };
    }
    // Default Tamil for Health
    return {
      reply: `🏥 **மருத்துவ சிகிச்சை மற்றும் இலவச காப்பீட்டுத் திட்டங்கள்:**\n\n1. **முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம் (CMCHIS) & ஆயுஷ்மான் பாரத் (AB-PMJAY):**\n- 💰 **உதவி:** குடும்பத்திற்கு ஆண்டுக்கு ₹5,00,000 வரை அரசு மற்றும் தனியார் மருத்துவமனைகளில் ரொக்கமில்லா (Cashless) இலவச சிகிச்சை.\n- 👥 **தகுதி:** ஆண்டு வருமானம் ₹1.20 லட்சத்திற்குள் உள்ள குடும்பங்கள் (மற்றும் 70 வயதுக்கு மேற்பட்ட முதியவர்கள்).\n- 📄 **ஆவணங்கள்:** ஸ்மார்ட் ரேஷன் கார்டு, ஆதார் அட்டை, வருமான சான்றிதழ்.\n- 🏛️ **கார்டு பெற:** மாவட்ட ஆட்சியர் அலுவலகம், அரசு தலைமை மருத்துவமனை அல்லது இ-சேவை மையம்.`,
      tamilReply: `🏥 **மருத்துவ சிகிச்சை: முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம் மூலம் ₹5,00,000 வரை இலவச சிகிச்சை.**`,
      speechSummary: `வணக்கம்! அரசு மற்றும் தனியார் மருத்துவமனைகளில் இலவச சிகிச்சை பெற ஆண்டுக்கு ஐந்து லட்சம் ரூபாய் வரை மருத்துவக் காப்பீடு கிடைக்கிறது. ஸ்மார்ட் ரேஷன் அட்டை மற்றும் ஆதார் மூலம் அட்டை பெற்றுக்கொள்ளலாம்.`,
      languageCode: 'ta',
      matchedSchemes: [{ name: 'Ayushman Bharat & CMCHIS', tamilName: 'முதலமைச்சரின் மருத்துவக் காப்பீடு', localizedName: 'மருத்துவக் காப்பீடு', benefit: 'ஆண்டுக்கு ₹5 லட்சம் இலவச சிகிச்சை', category: 'மருத்துவம்' }],
      suggestedQuestions: ['மருத்துவ காப்பீட்டு அட்டை பெற எங்கு செல்வது?', '70 வயது முதியவர்களுக்கு இலவச அட்டை கிடைக்குமா?']
    };
  }

  // General Welcoming Response in requested Indian language
  if (l === 'hi') {
    return {
      reply: `नमस्ते! 🙏 मैं आपका **सरकारी योजना मार्गदर्शक (Voice Guide)** हूँ।\n\nआप किसी भी विषय में जानकारी प्राप्त कर सकते हैं:\n\n🌾 **किसान भाई** - पीएम किसान (₹6,000), खाद सब्सिडी, फसल बीमा\n👩 **महिलाएं** - लाडली बहना, मातृत्व सहायता, सुकन्या समृद्धि\n🏥 **मुफ्त इलाज** - आयुष्मान भारत कार्ड (₹5 लाख तक मुफ्त उपचार)\n🎓 **छात्र** - छात्रवृत्ति, मुफ्त लैपटॉप व पढ़ाई हेतु सहायता\n👴 **बुजुर्ग** - वृद्धावस्था पेंशन व मुफ्त इलाज\n💼 **स्वरोजगार** - मुद्रा लोन व स्वनिधि ऋण\n\nआप नीचे दिए गए चित्रों को छूकर पूछ सकते हैं या बोलकर सवाल कर सकते हैं!`,
      tamilReply: `வணக்கம்! நான் உங்கள் அரசு நலத்திட்ட வழிகாட்டி.`,
      speechSummary: `नमस्ते! मैं आपका सरकारी योजना सहायक हूँ। किसान सम्मान निधि, महिलाओं की सहायता, पांच लाख का मुफ्त आयुष्मान कार्ड या बुजुर्ग पेंशन के बारे में जानने के लिए माइक दबाकर बोलें।`,
      languageCode: 'hi',
      matchedSchemes: [
        { name: 'PM Kisan Samman Nidhi', localizedName: 'पीएम किसान सम्मान निधि', benefit: '₹6,000 प्रति वर्ष', category: 'कृषि' },
        { name: 'Ayushman Bharat PM-JAY', localizedName: 'आयुष्मान भारत कार्ड', benefit: '₹5 लाख मुफ्त इलाज', category: 'स्वास्थ्य' }
      ],
      suggestedQuestions: ['किसानों को क्या-क्या सरकारी लाभ मिलता है?', 'आयुष्मान कार्ड कैसे बनवाएं?', 'मुद्रा लोन के नियम क्या हैं?']
    };
  }

  if (l === 'te') {
    return {
      reply: `నమస్కారం! 🙏 నేను మీ **ప్రభుత్వ సంక్షేమ పథకాల గైడ్ (Voice Guide)**.\n\nమీరు ఏ పథకం గురించి తెలుసుకోవాలనుకుంటున్నారో అడగండి:\n\n🌾 **రైతులు** - పీఎం కిసాన్ (₹6,000), ఎరువుల సబ్సిడీ\n👩 **మహిళలు** - ఆర్థిక సహాయం, ప్రసూతి పథకాలు\n🏥 **వైద్యం** - ₹5 లక్షల ఉచిత వైద్య చికిత్స (ఆయుష్మాన్ భారత్)\n🎓 **విద్యార్థులు** - ఉపకార వేతనాలు & ఫీజు రీయింబర్స్‌మెంట్\n👴 **వృద్ధులు** - వృద్ధాప్య పింఛను\n💼 **వ్యాపార రుణాలు** - ముద్ర లోన్\n\nమైక్ బటన్ నొక్కి మీ స్వంత గొంతుతో మాట్లాడండి!`,
      tamilReply: `வணக்கம்!`,
      speechSummary: `నమస్కారం! నేను మీ ప్రభుత్వ పథకాల సహాయకుడిని. రైతు సహాయం, ఉచిత వైద్యం లేదా పింఛన్ల గురించి తెలుసుకోవడానికి మైక్ నొక్కి మాట్లాడండి.`,
      languageCode: 'te',
      matchedSchemes: [{ name: 'PM Kisan', localizedName: 'పీఎం కిసాన్', benefit: 'ఏడాదికి ₹6,000', category: 'వ్యవసాయం' }],
      suggestedQuestions: ['రైతులకు ఏం పథకాలు ఉన్నాయి?', 'ఆయుష్మాన్ భారత్ ఎలా పొందాలి?']
    };
  }

  if (l === 'kn') {
    return {
      reply: `ನಮಸ್ಕಾರ! 🙏 ನಾನು ನಿಮ್ಮ **ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ**.\n\nನಿಮಗೆ ಅಗತ್ಯವಿರುವ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ ತಿಳಿಯಿರಿ:\n\n🌾 **ರೈತರು** - ಪಿಎಂ ಕಿಸಾನ್ (ವರ್ಷಕ್ಕೆ ₹6,000), ರಸಗೊಬ್ಬರ ಸಬ್ಸಿಡಿ\n👩 **ಮಹಿಳೆಯರು** - ಗೃಹಲಕ್ಷ್ಮಿ ಮತ್ತು ಮಾಸಿಕ ನೆರವು\n🏥 **ಉಚಿತ ಚಿಕಿತ್ಸೆ** - ₹5 ಲಕ್ಷದವರೆಗೆ ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಕಾರ್ಡ್\n🎓 **ವಿದ್ಯಾರ್ಥಿಗಳು** - ವಿದ್ಯಾರ್ಥಿವೇತನ ಮತ್ತು ಉಚಿತ ಲ್ಯಾಪ್‌ಟಾಪ್\n👴 **ಹಿರಿಯ ನಾಗರಿಕರು** - ವೃದ್ಧಾಪ್ಯ ಪಿಂಚಣಿ\n💼 **ಉದ್ಯಮ ಸಾಲ** - ಮುದ್ರಾ ಯೋಜನೆ\n\nಮಾತನಾಡಲು ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ!`,
      tamilReply: `வணக்கம்!`,
      speechSummary: `ನಮಸ್ಕಾರ! ರೈತರ ನೆರವು, ಮಹಿಳಾ ಯೋಜನೆ ಅಥವಾ ಉಚಿತ ಆರೋಗ್ಯ ವಿಮೆ ಬಗ್ಗೆ ತಿಳಿಯಲು ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ.`,
      languageCode: 'kn',
      matchedSchemes: [{ name: 'PM Kisan', localizedName: 'ಪಿಎಂ ಕಿಸಾನ್', benefit: 'ವರ್ಷಕ್ಕೆ ₹6,000', category: 'ಕೃಷಿ' }],
      suggestedQuestions: ['ರೈತರಿಗೆ ಯಾವ ಯೋಜನೆಗಳಿವೆ?', 'ಆಯುಷ್ಮಾನ್ ಕಾರ್ಡ್ ಪಡೆಯುವುದು ಹೇಗೆ?']
    };
  }

  if (l === 'ml') {
    return {
      reply: `നമസ്കാരം! 🙏 ഞാൻ നിങ്ങളുടെ **സർക്കാർ ക്ഷേമപദ്ധതി ശബ്ദ സഹായി**.\n\nനിങ്ങൾക്ക് ഏത് പദ്ധതിയെക്കുറിച്ചാണ് അറിയേണ്ടത്?\n\n🌾 **കർഷകർ** - പിഎം കിസാൻ (പ്രതിവർഷം ₹6,000), സബ്സിഡി\n👩 **സ്ത്രീകൾ** - മാസവരുമാനം, പ്രസവ സഹായം\n🏥 **സൗജന്യ ചികിത്സ** - ₹5 ലക്ഷം വരെ സൗജന്യ ഇൻഷുറൻസ്\n🎓 **വിദ്യാർത്ഥികൾ** - സ്കോളർഷിപ്പ്, സൗജന്യ ലാപ്ടോപ്പ്\n👴 **മുതിർന്നവർ** - വാർദ്ധക്യ പെൻഷൻ\n💼 **വായ്പകൾ** - മുദ്ര ലോൺ\n\nസംസാരിക്കാൻ മൈക്ക് അമർത്തുക!`,
      tamilReply: `வணக்கம்!`,
      speechSummary: `നമസ്കാരം! കർഷക സഹായം, സൗജന്യ ചികിത്സ അല്ലെങ്കിൽ പെൻഷൻ എന്നിവയെക്കുറിച്ച് അറിയാൻ സംസാരിക്കൂ.`,
      languageCode: 'ml',
      matchedSchemes: [{ name: 'PM Kisan', localizedName: 'പിഎം കിസാൻ', benefit: 'പ്രതിവർഷം ₹6,000', category: 'കൃഷി' }],
      suggestedQuestions: ['കർഷകർക്ക് എന്തെല്ലാം പദ്ധതികൾ ഉണ്ട്?']
    };
  }

  if (l === 'bn') {
    return {
      reply: `নমস্কার! 🙏 আমি আপনার **সরকারি প্রকল্প ভয়েস সহকারী**।\n\nআপনি কোন প্রকল্প সম্পর্কে জানতে চান?\n\n🌾 **কৃষক ভাই** - পিএম কিষাণ (বছরে ₹৬,০০০), সার ও ভর্তুকি\n👩 **মহিলারা** - মাসিক অনুদান ও মাতৃত্বকালীন সাহায্য\n🏥 **বিনামূল্যে চিকিৎসা** - আয়ুষ্মান ভারত কার্ড (₹৫ লাখ পর্যন্ত)\n🎓 **ছাত্রছাত্রী** - স্কলারশিপ ও বিনামূল্যে ল্যাপটপ\n👴 **বয়স্করা** - বার্ধক্য ভাতা ও পেনশন\n💼 **ব্যবসার ঋণ** - মুদ্রা লোন\n\nকথা বলতে মাইক চাপুন!`,
      tamilReply: `வணக்கம்!`,
      speechSummary: `নমস্কার! কৃষক সহায়তা, বিনামূল্যে চিকিৎসা বা মহিলাদের প্রকল্প সম্পর্কে জানতে মাইক চেপে কথা বলুন।`,
      languageCode: 'bn',
      matchedSchemes: [{ name: 'PM Kisan', localizedName: 'পিএম কিষাণ', benefit: 'বছরে ₹6,000', category: 'কৃষি' }],
      suggestedQuestions: ['কৃষকদের জন্য কী কী প্রকল্প আছে?']
    };
  }

  if (l === 'mr') {
    return {
      reply: `नमस्कार! 🙏 मी आपला **शासकीय योजना आवाज मार्गदर्शक** आहे.\n\nआपल्याला कोणत्या योजनेबद्दल माहिती हवी आहे?\n\n🌾 **शेतकरी बांधव** - पीएम किसान (वार्षिक ₹6,000), खते व अनुदान\n👩 **महिला** - लाडकी बहीण, मासिक अनुदान\n🏥 **मोफत उपचार** - आयुष्मान भारत कार्ड (₹5 लाखांपर्यंत)\n🎓 **विद्यार्थी** - शिष्यवृत्ती व लॅपटॉप\n👴 **ज्येष्ठ नागरिक** - वृद्धापकाळ पेन्शन\n💼 **व्यवसाय कर्ज** - मुद्रा कर्ज\n\nबोलण्यासाठी माइक दाबा!`,
      tamilReply: `வணக்கம்!`,
      speechSummary: `नमस्कार! शेतकरी मदत, मोफत उपचार किंवा पेन्शनबद्दल माहितीसाठी माइक दाबून बोला.`,
      languageCode: 'mr',
      matchedSchemes: [{ name: 'PM Kisan', localizedName: 'पीएम किसान', benefit: 'वार्षिक ₹6,000', category: 'कृषी' }],
      suggestedQuestions: ['शेतकऱ्यांसाठी कोणत्या योजना आहेत?']
    };
  }

  // Default Tamil Welcoming Response
  return {
    reply: `வணக்கம்! 🙏 நான் உங்களின் **அரசு நலத்திட்ட வழிகாட்டி (Voice Guide)**.\n\nநீங்கள் எந்த துறையைச் சேர்ந்தவர் என்பதை கூறினால், உங்களுக்குரிய சிறந்த அரசுத் திட்டங்களை எளிய முறையில் விளக்குகிறேன்:\n\n🌾 **விவசாயி** - பிஎம் கிசான் (ஆண்டுக்கு ₹6000), உர மானியம்\n👩 **பெண்கள்** - மகளிர் உரிமைத் தொகை (மாதம் ₹1000), புதுமைப் பெண்\n🏥 **மருத்துவம்** - ₹5 லட்சம் வரை இலவச மருத்துவ சிகிச்சை அட்டை\n🎓 **மாணவர்கள்** - பள்ளி & கல்லூரி கல்வி உதவித்தொகை, இலவச மடிக்கணினி\n💼 **சுயதொழில் / வியாபாரம்** - முத்ரா கடன், பிஎம் ஸ்வநிதி\n👴 **முதியோர்** - மாதம் ₹1,000 ஓய்வூதியம், இலவச சிகிச்சை\n\nநீங்கள் மேலே உள்ள பொத்தான்களைத் தொட்டு கேட்கலாம், அல்லது மைக் அழுத்தி பேசலாம்!`,
    tamilReply: `வணக்கம்! 🙏 நான் உங்களின் **அரசு நலத்திட்ட வழிகாட்டி**.\n\n🌾 **விவசாயி** - பிஎம் கிசான்\n👩 **பெண்கள்** - மகளிர் உரிமைத் தொகை\n🏥 **மருத்துவம்** - ₹5 லட்சம் வரை இலவச சிகிச்சை\n🎓 **மாணவர்கள்** - கல்வி உதவி\n👴 **முதியோர்** - ஓய்வூதியம்`,
    speechSummary: `வணக்கம்! நான் உங்கள் அரசு நலத்திட்ட வழிகாட்டி. விவசாயம், பெண்கள் உதவித்தொகை, இலவச மருத்துவம், மாணவர்கள் கல்வி உதவி அல்லது முதியோர் ஓய்வூதியம் குறித்து அறிய மைக் பொத்தானை அழுத்தி பேசுங்கள்.`,
    languageCode: 'ta',
    matchedSchemes: [
      { name: 'Pradhan Mantri Kisan Samman Nidhi', tamilName: 'பி.எம் கிசான் திட்டம்', localizedName: 'பி.எம் கிசான் திட்டம்', benefit: 'ஆண்டுக்கு ₹6,000', category: 'விவசாயம்' },
      { name: 'Kalaignar Magalir Urimai Thogai', tamilName: 'மகளிர் உரிமைத் திட்டம்', localizedName: 'மகளிர் உரிமைத் திட்டம்', benefit: 'மாதம் ₹1,000', category: 'பெண்கள் நலன்' },
      { name: 'Ayushman Bharat PM-JAY', tamilName: 'ஆயுஷ்மான் பாரத் மருத்துவ அட்டை', localizedName: 'ஆயுஷ்மான் பாரத் மருத்துவ அட்டை', benefit: 'ஆண்டுக்கு ₹5 லட்சம் இலவச சிகிச்சை', category: 'மருத்துவம்' }
    ],
    suggestedQuestions: [
      'விவசாயிகளுக்கான உதவித்தொகை என்னென்ன?',
      'மகளிர் உரிமைத் தொகை ₹1000 பெறுவது எப்படி?',
      'இலவச மருத்துவ சிகிச்சை அட்டை எடுப்பது எப்படி?'
    ]
  };
}

// Vite Middleware for Dev vs Static serving for Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GovScheme Finder server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
