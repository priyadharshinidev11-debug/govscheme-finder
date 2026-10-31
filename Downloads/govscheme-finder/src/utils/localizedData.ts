import { Scheme, SchemeCategory } from '../types';
import { SupportedLanguage } from '../data/translations';
import { SCHEME_TRANSLATIONS, LocalizedSchemeData } from './schemeTranslations';
import { UI_TRANSLATIONS } from './uiTranslations';

export { SCHEME_TRANSLATIONS, type LocalizedSchemeData, UI_TRANSLATIONS };

// ==========================================
// 1. ALL CATEGORIES TRANSLATIONS (11 LANGUAGES)
// ==========================================
interface LocalizedCategoryData {
  name: string;
  description: string;
}

export const CATEGORY_TRANSLATIONS: Record<SupportedLanguage, Record<string, LocalizedCategoryData>> = {
  en: {
    'agriculture': {
      name: 'Agriculture & Rural Development',
      description: 'Crop subsidies, PM-Kisan financial aid, tractor purchase loans, irrigation tools, and organic farming assistance.'
    },
    'healthcare': {
      name: 'Healthcare & Wellness',
      description: 'Free medical treatment up to ₹5 Lakhs under Ayushman Bharat, generic medicines, and hospital subsidies.'
    },
    'education': {
      name: 'Education & Scholarships',
      description: 'School & college scholarships, free hostel admission, tuition waivers, and educational bank loans.'
    },
    'women-child': {
      name: 'Women & Child Welfare',
      description: 'Monthly direct financial grants, maternal healthcare, girl child education savings, and self-help groups.'
    },
    'housing': {
      name: 'Housing & Shelter',
      description: 'Subsidies for pakka house construction, urban home loans, and rural housing grants under PM Awas Yojana.'
    },
    'entrepreneurship': {
      name: 'Business & Entrepreneurship',
      description: 'Collateral-free Mudra business loans, PM SVANidhi street vendor loans, and MSME startup credit.'
    },
    'employment': {
      name: 'Employment & Skill Development',
      description: 'National apprenticeship stipends, technical job training, placement assistance, and vocational tools.'
    },
    'financial': {
      name: 'Financial Assistance & Social Security',
      description: 'Monthly old-age pensions, low-cost life insurance, accident coverage, and DBT bank welfare.'
    },
    'senior-citizens': {
      name: 'Senior Citizens Welfare',
      description: 'Old-age monthly pensions, free assistive medical devices, geriatric care, and senior travel subsidies.'
    }
  },
  ta: {
    'agriculture': {
      name: 'விவசாயம் மற்றும் ஊரக வளர்ச்சி',
      description: 'பயிர் மானியம், பி.எம் கிசான் ₹6,000 உதவி, டிராக்டர் மானியம், சொட்டு நீர் பாசனம் மற்றும் உழவர் நலன்கள்.'
    },
    'healthcare': {
      name: 'மருத்துவம் மற்றும் நல்வாழ்வு',
      description: 'ஆயுஷ்மான் பாரத் ₹5 லட்சம் இலவச சிகிச்சை, அரசு மருத்துவ காப்பீடு, முதலமைச்சர் விரிவான மருத்துவ திட்டம்.'
    },
    'education': {
      name: 'கல்வி மற்றும் உதவித்தொகை',
      description: 'பள்ளி மற்றும் கல்லூரி கல்வி உதவித்தொகை, புதுமைப் பெண் திட்டம், இலவச மடிக்கணினி மற்றும் கல்விக்கடன்.'
    },
    'women-child': {
      name: 'பெண்கள் மற்றும் குழந்தைகள் நலம்',
      description: 'கலைஞர் மகளிர் உரிமைத் திட்டம் (மாதம் ₹1,000), மகப்பேறு நிதி உதவி, சுகன்யா சம்ரிதி பெண் குழந்தை சேமிப்பு.'
    },
    'housing': {
      name: 'வீட்டு வசதி மற்றும் குடியிருப்பு',
      description: 'பிரதமர் ஆவாஸ் யோஜனா கான்கிரீட் வீடு கட்ட ₹1.20 லட்சம் மானியம் மற்றும் நகர்ப்புற குறைந்த வட்டி வீட்டுக் கடன்.'
    },
    'entrepreneurship': {
      name: 'சுயதொழில் மற்றும் சிறுவணிகம்',
      description: 'பி.எம் முத்ரா பிணையில்லா தொழில் கடன் (₹50,000 முதல் ₹10 லட்சம்), தெருவோர வியாபாரிகள் கடன் (ஸ்வாநிதி).'
    },
    'employment': {
      name: 'வேலைவாய்ப்பு மற்றும் திறன் பயிற்சி',
      description: 'தொழில் பழகுநர் உதவித்தொகை (NAPS), இலவச தொழிற் பயிற்சி மற்றும் வேலைவாய்ப்பு முகாம்கள்.'
    },
    'financial': {
      name: 'நிதி உதவி மற்றும் சமூகப் பாதுகாப்பு',
      description: 'அடல் பென்ஷன் மாத ஓய்வூதியம், குறைந்த பிரீமியம் விபத்து காப்பீடு, நேரடி வங்கி பணப்பரிமாற்றம் (DBT).'
    },
    'senior-citizens': {
      name: 'மூத்த குடிமக்கள் நலன்',
      description: 'முதியோர் மாதாந்திர ஓய்வூதியம், இலவச மருத்துவ உபகரணங்கள் மற்றும் மூத்தோர் கட்டணச் சலுகைகள்.'
    }
  },
  hi: {
    'agriculture': {
      name: 'कृषि एवं ग्रामीण विकास',
      description: 'फसल सब्सिडी, पीएम-किसान ₹6,000 वार्षिक सहायता, ट्रैक्टर खरीद ऋण और खाद-बीज अनुदान।'
    },
    'healthcare': {
      name: 'स्वास्थ्य एवं परिवार कल्याण',
      description: 'आयुष्मान भारत के तहत ₹5 लाख तक का मुफ्त इलाज, जन औषधि दवाइयां और अस्पताल सुरक्षा।'
    },
    'education': {
      name: 'शिक्षा एवं छात्रवृत्ति',
      description: 'राष्ट्रीय छात्रवृत्ति, कॉलेज फीस छूट, मुफ्त हॉस्टल सुविधा और उच्च शिक्षा लोन।'
    },
    'women-child': {
      name: 'महिला एवं बाल विकास',
      description: 'मातृत्व वंदना ₹5,000 सहायता, लाड़ली बहना योजना, सुकन्या समृद्धि खाता और स्वयं सहायता समूह।'
    },
    'housing': {
      name: 'आवास एवं शहरी विकास',
      description: 'पीएम आवास योजना के तहत पक्का घर बनाने के लिए ₹1.20 लाख सब्सिडी और ब्याज राहत।'
    },
    'entrepreneurship': {
      name: 'व्यवसाय एवं स्वरोजगार',
      description: 'बिना गारंटी पीएम मुद्रा व्यापार लोन (₹10 लाख तक), पीएम स्वनिधि रेहड़ी-पटरी विक्रेता ऋण।'
    },
    'employment': {
      name: 'रोजगार एवं कौशल विकास',
      description: 'प्रशिक्षुता (अपेंटिसशिप) स्टाइपेंड, प्रधानमंत्री कौशल विकास प्रशिक्षण और रोजगार सहायता।'
    },
    'financial': {
      name: 'वित्तीय सहायता एवं सामाजिक सुरक्षा',
      description: 'अटल पेंशन योजना, प्रधानमंत्री जीवन ज्योति बीमा, सुरक्षा बीमा और प्रत्यक्ष लाभ अंतरण (DBT)।'
    },
    'senior-citizens': {
      name: 'वरिष्ठ नागरिक कल्याण',
      description: 'वृद्धावस्था मासिक पेंशन, मुफ्त सहायक उपकरण और वरिष्ठ नागरिकों के लिए स्वास्थ्य सुरक्षा।'
    }
  },
  te: {
    'agriculture': {
      name: 'వ్యవసాయం మరియు గ్రామీణాభివృద్ధి',
      description: 'రైతు భరోసా, పీఎం-కిసాన్ ₹6,000 సహాయం, ట్రాక్టర్ సబ్సిడీ మరియు పంట రుణాలు.'
    },
    'healthcare': {
      name: 'ఆరోగ్యం మరియు వైద్య సంరక్షణ',
      description: 'ఆయుష్మాన్ భారత్ ₹5 లక్షల ఉచిత వైద్యం, ఆరోగ్యశ్రీ కార్డు మరియు ఉచిత మందులు.'
    },
    'education': {
      name: 'విద్య మరియు స్కాలర్‌షిప్‌లు',
      description: 'పోస్ట్ మెట్రిక్ స్కాలర్‌షిప్‌లు, విద్యా దీవెన, హాస్టల్ ఫీజు రద్దు మరియు విద్యా రుణాలు.'
    },
    'women-child': {
      name: 'మహిళా మరియు శిశు సంక్షేమం',
      description: 'నెలకు ఆర్థిక సాయం, మాతృత్వ ఆర్థిక ప్రయోజనాలు, సుకన్య సమృద్ధి యోజన.'
    },
    'housing': {
      name: 'గృహ నిర్మాణం మరియు వసతి',
      description: 'పీఎం ఆవాస్ యోజన ద్వారా పక్కా ఇంటి నిర్మాణానికి ₹1.20 లక్షల సబ్సిడీ.'
    },
    'entrepreneurship': {
      name: 'వ్యాపారం మరియు స్వయం ఉపాధి',
      description: 'పూచీకత్తు లేని ముద్ర రుణాలు, వీధి వ్యాపారుల స్వనిధి రుణాలు.'
    },
    'employment': {
      name: 'ఉపాధి మరియు నైపుణ్యాభివృద్ధి',
      description: 'అప్రెంటిస్‌షిప్ స్టైపెండ్, నైపుణ్య శిక్షణ మరియు ఉద్యోగ అవకాశాలు.'
    },
    'financial': {
      name: 'ఆర్థిక భద్రత మరియు పింఛన్లు',
      description: 'అటల్ పెన్షన్ యోజన, ప్రమాద బీమా మరియు ప్రత్యక్ష నగదు బదిలీ (DBT).'
    },
    'senior-citizens': {
      name: 'సీనియర్ సిటిజన్ సంక్షేమం',
      description: 'వృద్ధాప్య పింఛన్లు, ఉచిత వైద్య పరికరాలు మరియు వయోవృద్ధుల సంరక్షణ.'
    }
  },
  kn: {
    'agriculture': {
      name: 'ಕೃಷಿ ಮತ್ತು ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ',
      description: 'ಬೆಳೆ ಸಬ್ಸಿಡಿ, ಪಿಎಂ-ಕಿಸಾನ್ ₹6,000 ನೆರವು, ಟ್ರ್ಯಾಕ್ಟರ್ ಖರೀದಿ ಸಾಲ ಮತ್ತು ರಸಗೊಬ್ಬರ ನೆರವು.'
    },
    'healthcare': {
      name: 'ಆರೋಗ್ಯ ಮತ್ತು ಯೋಗಕ್ಷೇಮ',
      description: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ₹5 ಲಕ್ಷ ಉಚಿತ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಆಸ್ಪತ್ರೆ ಆರೋಗ್ಯ ವಿಮೆ.'
    },
    'education': {
      name: 'ಶಿಕ್ಷಣ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನ',
      description: 'ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ, ಉಚಿತ ಹಾಸ್ಟೆಲ್ ಪ್ರವೇಶ ಮತ್ತು ಉನ್ನತ ಶಿಕ್ಷಣ ಸಾಲ.'
    },
    'women-child': {
      name: 'ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಕಲ್ಯಾಣ',
      description: 'ಗೃಹಲಕ್ಷ್ಮಿ ಮಾಸಿಕ ನೆರವು, ಮಾತೃ ವಂದನಾ ಯೋಜನೆ, ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿ ಉಳಿತಾಯ.'
    },
    'housing': {
      name: 'ವಸತಿ ಮತ್ತು ಆಶ್ರಯ',
      description: 'ಪಿಎಂ ಆವಾಸ್ ಯೋಜನೆಯಡಿ ಪಕ್ಕಾ ಮನೆ ನಿರ್ಮಾಣಕ್ಕೆ ₹1.20 ಲಕ್ಷ ಸಬ್ಸಿಡಿ.'
    },
    'entrepreneurship': {
      name: 'ವ್ಯವಹಾರ ಮತ್ತು ಸ್ವಯಂ ಉದ್ಯೋಗ',
      description: 'ಜಾಮೀನು ರಹಿತ ಮುದ್ರಾ ವ್ಯಾಪಾರ ಸಾಲ, ಪಿಎಂ ಸ್ವನಿಧಿ ಬೀದಿ ವ್ಯಾಪಾರಿ ಸಾಲ.'
    },
    'employment': {
      name: 'ಉದ್ಯೋಗ ಮತ್ತು ಕೌಶಲ್ಯ ತರಬೇತಿ',
      description: 'ಅಪ್ರೆಂಟಿಸ್‌ಶಿಪ್ ಭತ್ಯೆ, ತಾಂತ್ರಿಕ ತರಬೇತಿ ಮತ್ತು ಉದ್ಯೋಗ ಅವಕಾಶಗಳು.'
    },
    'financial': {
      name: 'ಆರ್ಥಿಕ ನೆರವು ಮತ್ತು ಪಿಂಚಣಿ',
      description: 'ಅಟಲ್ ಪಿಂಚಣಿ ಯೋಜನೆ, ಜೀವನ ಜ್ಯೋತಿ ವಿಮೆ ಮತ್ತು ನೇರ ನಗದು ವರ್ಗಾವಣೆ (DBT).'
    },
    'senior-citizens': {
      name: 'ಹಿರಿಯ ನಾಗರಿಕರ ಕಲ್ಯಾಣ',
      description: 'ವೃದ್ಧಾಪ್ಯ ಮಾಸಿಕ ಪಿಂಚಣಿ ಮತ್ತು ಉಚಿತ ವೈದ್ಯಕೀಯ ನೆರವು ಸಾಧನಗಳು.'
    }
  },
  ml: {
    'agriculture': {
      name: 'കൃഷിയും ഗ്രാമവികസനവും',
      description: 'വിള സബ്‌സിഡി, പിഎം-കിസാൻ ₹6,000 വാർഷിക സഹായം, കാർഷിക ഉപകരണ വായ്പ.'
    },
    'healthcare': {
      name: 'ആരോഗ്യവും ക്ഷേമവും',
      description: 'ആയുഷ്മാൻ ഭാരത് ₹5 ലക്ഷം രൂപയുടെ സൗജന്യ ചികിത്സയും കാരുണ്യ ഇൻഷുറൻസും.'
    },
    'education': {
      name: 'വിദ്യാഭ്യാസവും സ്കോളർഷിപ്പും',
      description: 'പോസ്റ്റ് മെട്രിക് സ്കോളർഷിപ്പ്, ഫീസ് ഇളവുകൾ, സൗജന്യ ഹോസ്റ്റൽ സൗകര്യം.'
    },
    'women-child': {
      name: 'വനിതാ ശിശുക്ഷേമം',
      description: 'പ്രസവ ധനസഹായം, സുകന്യ സമൃദ്ധി യോജന, കുടുംബശ്രീ സ്വയംസഹായ വായ്പകൾ.'
    },
    'housing': {
      name: 'ഭവനനിർമ്മാണവും പാർപ്പിടവും',
      description: 'പിഎം ആവാസ് യോജന പക്കാ വീട് നിർമ്മാണത്തിന് ₹1.20 ലക്ഷം സബ്‌സിഡി.'
    },
    'entrepreneurship': {
      name: 'ബിസിനസ്സും സ്വയംതൊഴിലും',
      description: 'ഈടില്ലാത്ത മുദ്ര ബിസിനസ് വായ്പ (₹10 ലക്ഷം വരെ), പിഎം സ്വനിധി വായ്പ.'
    },
    'employment': {
      name: 'തൊഴിലും തൊഴിൽ നൈപുണ്യവും',
      description: 'അപ്രന്റീസ്ഷിപ്പ് സ്റ്റൈപ്പൻഡ്, സാങ്കേതിക പരിശീലനം, തൊഴിൽ മേളകൾ.'
    },
    'financial': {
      name: 'സാമ്പത്തിക സുരക്ഷയും പെൻഷനും',
      description: 'അടൽ പെൻഷൻ യോജന, അപകട ഇൻഷുറൻസ്, നേരിട്ടുള്ള ബാങ്ക് കൈമാറ്റം (DBT).'
    },
    'senior-citizens': {
      name: 'മുതിർന്ന പൗരന്മാരുടെ ക്ഷേമം',
      description: 'വാർദ്ധക്യകാല പെൻഷൻ, സൗജന്യ വൈദ്യസഹായ ഉപകരണങ്ങൾ.'
    }
  },
  bn: {
    'agriculture': {
      name: 'কৃষি ও গ্রামীণ উন্নয়ন',
      description: 'ফসল ভর্তুকি, পিএম-কিসান ₹৬,০০০ অনুদান, ট্র্যাক্টর ঋণ ও সার সহায়তা।'
    },
    'healthcare': {
      name: 'স্বাস্থ্য ও পরিবার কল্যাণ',
      description: 'আয়ুষ্মান ভারত ₹৫ লক্ষ টাকার বিনামূল্যে চিকিৎসা ও হাসপাতাল সুবিধা।'
    },
    'education': {
      name: 'শিক্ষা ও বৃত্তি',
      description: 'জাতীয় বৃত্তি, কলেজ ফি মকুব, কন্যাশ্রী অনুদান ও উচ্চশিক্ষা ঋণ।'
    },
    'women-child': {
      name: 'নারী ও শিশু কল্যাণ',
      description: 'মাতৃত্বকালীন সহায়তা, লক্ষ্মীর ভাণ্ডার, সুকন্যা সমৃদ্ধি যোজনা।'
    },
    'housing': {
      name: 'আবাসন ও বাসস্থান',
      description: 'প্রধানমন্ত্রী আবাস যোজনায় পাকা বাড়ি তৈরির জন্য ₹১.২০ লক্ষ অনুদান।'
    },
    'entrepreneurship': {
      name: 'ব্যবসা ও স্বনির্ভরতা',
      description: 'জামিনবিহীন মুদ্রা লোন (₹১০ লক্ষ পর্যন্ত), পিএম স্বনিধি ক্ষুদ্র ঋণ।'
    },
    'employment': {
      name: 'কর্মসংস্থান ও দক্ষতা বৃদ্ধি',
      description: 'অ্যাপ্রেন্টিসশিপ ভাতা, কারিগরি প্রশিক্ষণ ও চাকরি সহায়তা।'
    },
    'financial': {
      name: 'আর্থিক সুরক্ষা ও পেনশন',
      description: 'অটল পেনশন যোজনা, জীবন জ্যোতি বিমা ও সরকারি সরাসরি অনুদান (DBT)।'
    },
    'senior-citizens': {
      name: 'প্রবীণ নাগরিক কল্যাণ',
      description: 'বার্ধক্যকালীন পেনশন ও বিনামূল্যে সহায়ক স্বাস্থ্য সামগ্রী।'
    }
  },
  mr: {
    'agriculture': {
      name: 'कृषी आणि ग्रामीण विकास',
      description: 'पीक सबसिडी, पीएम-किसान ₹६,००० वार्षिक मदत, ट्रॅक्टर कर्ज व बी-बियाणे अनुदान.'
    },
    'healthcare': {
      name: 'आरोग्य आणि कुटुंब कल्याण',
      description: 'आयुष्मान भारत अंतर्गत ₹५ लाख मोफत उपचार आणि मोफत औषधे.'
    },
    'education': {
      name: 'शिक्षण आणि शिष्यवृत्ती',
      description: 'राष्ट्रीय शिष्यवृत्ती, फी सवलत, वसतिगृह प्रवेश आणि शैक्षणिक कर्ज.'
    },
    'women-child': {
      name: 'महिला आणि बालविकास',
      description: 'लाडकी बहीण योजना, मातृत्व वंदना ₹५,००० मदत, सुकन्या समृद्धी योजना.'
    },
    'housing': {
      name: 'गृहनिर्माण आणि निवारा',
      description: 'पीएम आवास योजनेअंतर्गत घर बांधणीसाठी ₹१.२० लाख सबसिडी.'
    },
    'entrepreneurship': {
      name: 'व्यवसाय आणि स्वयंरोजगार',
      description: 'विनातारण मुद्रा व्यवसाय कर्ज (₹१० लाखांपर्यंत), पीएम स्वनिधी कर्ज.'
    },
    'employment': {
      name: 'रोजगार आणि कौशल्य विकास',
      description: 'शिकाऊ उमेदवारी (अप्रेन्टिसशिप) भत्ता आणि तांत्रिक कौशल्य प्रशिक्षण.'
    },
    'financial': {
      name: 'आर्थिक सहाय्य आणि सामाजिक सुरक्षा',
      description: 'अटल पेन्शन योजना, विमा संरक्षण आणि बँक थेट लाभ हस्तांतरण (DBT).'
    },
    'senior-citizens': {
      name: 'ज्येष्ठ नागरिक कल्याण',
      description: 'वृद्धापकाळ मासिक पेन्शन आणि मोफत वैद्यकीय सहाय्य साधने.'
    }
  },
  gu: {
    'agriculture': {
      name: 'કૃષિ અને ગ્રામીણ વિકાસ',
      description: 'પાક સબસિડી, પીએમ-કિસાન ₹૬,૦૦૦ સહાય અને ખેતી સાધન લોન.'
    },
    'healthcare': {
      name: 'આરોગ્ય અને તબીબી સેવા',
      description: 'આયુષ્માન ભારત અંતર્ગત ₹૫ લાખ સુધી મફત સારવાર અને હોસ્પિટલ વીમો.'
    },
    'education': {
      name: 'શિક્ષણ અને શિષ્યવૃત્તિ',
      description: 'પોસ્ટ મેટ્રિક શિષ્યવૃત્તિ, કોલેજ ફી માફી અને વિદ્યાર્થી લોન.'
    },
    'women-child': {
      name: 'મહિલા અને બાળ કલ્યાણ',
      description: 'માસિક સહાય, માતૃ વંદના યોજના, સુકન્યા સમૃદ્ધિ યોજના.'
    },
    'housing': {
      name: 'આવાસ અને મકાન સહાય',
      description: 'પીએમ આવાસ યોજના હેઠળ પાકું મકાન બનાવવા ₹૧.૨૦ લાખ સબસિડી.'
    },
    'entrepreneurship': {
      name: 'વેપાર અને સ્વરોજગાર',
      description: 'કોલેટરલ-ફ્રી મુદ્રા બિઝનેસ લોન, પીએમ સ્વનિધિ ફેરિયા લોન.'
    },
    'employment': {
      name: 'રોજગાર અને કૌશલ્ય વિકાસ',
      description: 'એપ્રેન્ટિસશીપ સ્ટાઈપેન્ડ અને ટેકનિકલ જોબ ટ્રેનિંગ.'
    },
    'financial': {
      name: 'નાણાકીય સહાય અને પેન્શન',
      description: 'અટલ પેન્શન યોજના, જીવન જ્યોતિ વીમો અને સીધો લાભ (DBT).'
    },
    'senior-citizens': {
      name: 'વરિષ્ઠ નાગરિક કલ્યાણ',
      description: 'વૃદ્ધાવસ્થા માસિક પેન્શન અને મફત તબીબી સહાયક સાધનો.'
    }
  },
  pa: {
    'agriculture': {
      name: 'ਖੇਤੀਬਾੜੀ ਅਤੇ ਪੇਂਡੂ ਵਿਕਾਸ',
      description: 'ਫ਼ਸਲ ਸਬਸਿਡੀ, ਪੀਐਮ-ਕਿਸਾਨ ₹੬,੦੦੦ ਸਹਾਇਤਾ, ਟਰੈਕਟਰ ਕਰਜ਼ਾ ਅਤੇ ਖਾਦ ਰਿਆਇਤ।'
    },
    'healthcare': {
      name: 'ਸਿਹਤ ਅਤੇ ਪਰਿਵਾਰ ਭਲਾਈ',
      description: 'ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ ਤਹਿਤ ₹੫ ਲੱਖ ਦਾ ਮੁਫ਼ਤ ਇਲਾਜ ਅਤੇ ਸਰਕਾਰੀ ਹਸਪਤਾਲ ਸਹੂਲਤਾਂ।'
    },
    'education': {
      name: 'ਸਿੱਖਿਆ ਅਤੇ ਵਜ਼ੀਫ਼ਾ',
      description: 'ਪੋਸਟ ਮੈਟ੍ਰਿਕ ਵਜ਼ੀਫ਼ਾ, ਕਾਲਜ ਫੀਸ ਛੋਟ ਅਤੇ ਮੁਫ਼ਤ ਹੋਸਟਲ ਸਹੂਲਤ।'
    },
    'women-child': {
      name: 'ਮਹਿਲਾ ਅਤੇ ਬਾਲ ਭਲਾਈ',
      description: 'ਮਾਤਾ ਵੰਦਨਾ ₹੫,੦੦੦ ਸਹਾਇਤਾ, ਸੁਕੰਨਿਆ ਸਮ੍ਰਿਧੀ ਖਾਤਾ ਅਤੇ ਮਹੀਨਾਵਾਰ ਭੱਤਾ।'
    },
    'housing': {
      name: 'ਮਕਾਨ ਅਤੇ ਰਿਹਾਇਸ਼',
      description: 'ਪੀਐਮ ਆਵਾਸ ਯੋਜਨਾ ਤਹਿਤ ਪੱਕਾ ਘਰ ਬਣਾਉਣ ਲਈ ₹੧.੨੦ ਲੱਖ ਸਬਸਿਡੀ।'
    },
    'entrepreneurship': {
      name: 'ਕਾਰੋਬਾਰ ਅਤੇ ਸਵੈ-ਰੁਜ਼ਗਾਰ',
      description: 'ਬਿਨਾਂ ਗਾਰੰਟੀ ਮੁਦਰਾ ਲੋਨ (₹੧੦ ਲੱਖ ਤੱਕ), ਪੀਐਮ ਸਵਨਿਧੀ ਕਰਜ਼ਾ।'
    },
    'employment': {
      name: 'ਰੁਜ਼ਗਾਰ ਅਤੇ ਹੁਨਰ ਵਿਕਾਸ',
      description: 'ਅਪ੍ਰੈਂਟਿਸਸ਼ਿਪ ਸਟਾਈਪੈਂਡ, ਤਕਨੀਕੀ ਸਿਖਲਾਈ ਅਤੇ ਨੌਕਰੀ ਦੇ ਮੌਕੇ।'
    },
    'financial': {
      name: 'ਵਿੱਤੀ ਸਹਾਇਤਾ ਅਤੇ ਪੈਨਸ਼ਨ',
      description: 'ਅਟਲ ਪੈਨਸ਼ਨ ਯੋਜਨਾ, ਦੁਰਘਟਨਾ ਬੀਮਾ ਅਤੇ ਸਿੱਧਾ ਲਾਭ ਤਬਾਦਲਾ (DBT)।'
    },
    'senior-citizens': {
      name: 'ਬਜ਼ੁਰਗ ਭਲਾਈ',
      description: 'ਬੁਢਾਪਾ ਪੈਨਸ਼ਨ ਅਤੇ ਮੁਫ਼ਤ ਸਿਹਤ ਸਹਾਇਤਾ ਉਪਕਰਣ।'
    }
  },
  or: {
    'agriculture': {
      name: 'କୃଷି ଓ ଗ୍ରାମୀଣ ବିକାଶ',
      description: 'ଫସଲ ସବସିଡି, ପିଏମ୍-କିଷାନ ₹୬,୦୦୦ ସହାୟତା, ଟ୍ରାକ୍ଟର ଋଣ ଓ କାଳିଆ ଯୋଜନା।'
    },
    'healthcare': {
      name: 'ସ୍ୱାସ୍ଥ୍ୟ ଓ ଚିକିତ୍ସା ସେବା',
      description: 'ଆୟୁଷ୍ମାନ ଭାରତ ₹୫ ଲକ୍ଷ ମାଗଣା ଚିକିତ୍ସା ଓ ବିଜୁ ସ୍ୱାସ୍ଥ୍ୟ କଲ୍ୟାଣ ଯୋଜନା।'
    },
    'education': {
      name: 'ଶିକ୍ଷା ଓ ଛାତ୍ରବୃତ୍ତି',
      description: 'ପୋଷ୍ଟ ମେଟ୍ରିକ୍ ସ୍କଲାରସିପ୍, କଲେଜ ଫି ଛାଡ଼ ଓ ମାଗଣା ଲାପଟପ୍।'
    },
    'women-child': {
      name: 'ମହିଳା ଓ ଶିଶୁ କଲ୍ୟାଣ',
      description: 'ମାତୃତ୍ୱ ସହାୟତା, ସୁଭଦ୍ରା ଯୋଜନା, ସୁକନ୍ୟା ସମୃଦ୍ଧି ଯୋଜନା।'
    },
    'housing': {
      name: 'ଗୃହ ନିର୍ମାଣ ଓ ଆବାସ',
      description: 'ପିଏମ୍ ଆବାସ ଯୋଜନାରେ ପକ୍କା ଘର ପାଇଁ ₹୧.୨୦ ଲକ୍ଷ ସବସିଡି।'
    },
    'entrepreneurship': {
      name: 'ବ୍ୟବସାୟ ଓ ସ୍ୱନିୟୋଜନ',
      description: 'ବିନା ବନ୍ଧକରେ ମୁଦ୍ରା ଲୋନ୍ (₹୧୦ ଲକ୍ଷ ପର୍ଯ୍ୟନ୍ତ), ପିଏମ୍ ସ୍ୱନିଧି ଋଣ।'
    },
    'employment': {
      name: 'ନିଯୁକ୍ତି ଓ ଦକ୍ଷତା ବିକାଶ',
      description: 'ଆପ୍ରେଣ୍ଟିସସିପ୍ ଭତ୍ତା, ବୈଷୟିକ ତାଲିମ ଓ ନିଯୁକ୍ତି ସୁଯୋଗ।'
    },
    'financial': {
      name: 'ଆର୍ଥିକ ସହାୟତା ଓ ପେନସନ୍',
      description: 'ଅଟଳ ପେନସନ୍ ଯୋଜନା, ସୁରକ୍ଷା ବୀମା ଓ ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଖାତାକୁ ଟଙ୍କା (DBT)।'
    },
    'senior-citizens': {
      name: 'ବରିଷ୍ଠ ନାଗରିକ କଲ୍ୟାଣ',
      description: 'ବାର୍ଦ୍ଧକ୍ୟ ଭତ୍ତା ଓ ମାଗଣା ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ ଉପକରଣ।'
    }
  }
};

// 2. SCHEME LOCALIZATION (Imported from ./schemeTranslations)

// ==========================================
// 3. INDIAN STATES IN 11 LANGUAGES
// ==========================================
export const STATE_TRANSLATIONS: Record<string, Record<SupportedLanguage, string>> = {
  'All States': {
    en: 'All States (Pan India)',
    ta: 'அனைத்து மாநிலங்கள் (இந்தியா முழுவதும்)',
    hi: 'सभी राज्य (अखिल भारतीय)',
    te: 'అన్ని రాష్ట్రాలు (భారతదేశ వ్యాప్తంగా)',
    kn: 'ಎಲ್ಲಾ ರಾಜ್ಯಗಳು (ಭಾರತದಾದ್ಯಂತ)',
    ml: 'എല്ലാ സംസ്ഥാനങ്ങളും (ഇന്ത്യയൊട്ടാകെ)',
    bn: 'সমস্ত রাজ্য (সর্বভারতীয়)',
    mr: 'सर्व राज्ये (अखिल भारतीय)',
    gu: 'તમામ રાજ્યો (સમગ્ર ભારત)',
    pa: 'ਸਾਰੇ ਰਾਜ (ਪੂਰੇ ਭਾਰਤ)',
    or: 'ସମସ୍ତ ରାଜ୍ୟ (ସର୍ବଭାରତୀୟ)'
  },
  'Tamil Nadu': {
    en: 'Tamil Nadu',
    ta: 'தமிழ்நாடு',
    hi: 'तमिलनाडु',
    te: 'తమిళనాడు',
    kn: 'ತಮಿಳುನಾಡು',
    ml: 'തമിഴ്നാട്',
    bn: 'তামিলনাড়ু',
    mr: 'तमिळनाडू',
    gu: 'તમિલનાડુ',
    pa: 'ਤਮਿਲਨਾਡੂ',
    or: 'ତାମିଲନାଡୁ'
  },
  'Andhra Pradesh': {
    en: 'Andhra Pradesh',
    ta: 'ஆந்திரப் பிரதேசம்',
    hi: 'आंध्र प्रदेश',
    te: 'ఆంధ్రప్రదేశ్',
    kn: 'ಆಂಧ್ರಪ್ರದೇಶ',
    ml: 'ആന്ധ്രാപ്രദേശ്',
    bn: 'অন্ধ্রপ্রদেশ',
    mr: 'आंध्र प्रदेश',
    gu: 'આંધ્રપ્રદેશ',
    pa: 'ਆਂਧਰਾ ਪ੍ਰਦੇਸ਼',
    or: 'ଆନ୍ଧ୍ରପ୍ରଦେଶ'
  },
  'Karnataka': {
    en: 'Karnataka',
    ta: 'கர்நாடகா',
    hi: 'कर्नाटक',
    te: 'కర్ణాటక',
    kn: 'ಕರ್ನಾಟಕ',
    ml: 'കർണാടക',
    bn: 'কর্ণাটক',
    mr: 'कर्नाटक',
    gu: 'કર્ણાટક',
    pa: 'ਕਰਨਾਟਕ',
    or: 'କର୍ଣ୍ଣାଟକ'
  },
  'Kerala': {
    en: 'Kerala',
    ta: 'கேரளா',
    hi: 'केरल',
    te: 'కేరళ',
    kn: 'ಕೇರಳ',
    ml: 'കേരളം',
    bn: 'কেরল',
    mr: 'केरळ',
    gu: 'કેરળ',
    pa: 'ਕੇਰਲ',
    or: 'କେରଳ'
  },
  'Telangana': {
    en: 'Telangana',
    ta: 'தெலுங்கானா',
    hi: 'तेलंगाना',
    te: 'తెలంగాణ',
    kn: 'ತೆಲಂಗಾಣ',
    ml: 'തെലങ്കാന',
    bn: 'তেলেঙ্গানা',
    mr: 'तेलंगणा',
    gu: 'તેલંગાણા',
    pa: 'ਤੇਲੰਗਾਨਾ',
    or: 'ତେଲେଙ୍ଗାନା'
  },
  'Maharashtra': {
    en: 'Maharashtra',
    ta: 'மகாராஷ்டிரா',
    hi: 'महाराष्ट्र',
    te: 'మహారాష్ట్ర',
    kn: 'ಮಹಾರಾಷ್ಟ್ರ',
    ml: 'മഹാരാഷ്ട്ര',
    bn: 'মহারাষ্ট্র',
    mr: 'महाराष्ट्र',
    gu: 'મહારાષ્ટ્ર',
    pa: 'ਮਹਾਰਾਸ਼ਟਰ',
    or: 'ମହାରାଷ୍ଟ୍ର'
  },
  'West Bengal': {
    en: 'West Bengal',
    ta: 'மேற்கு வங்காளம்',
    hi: 'पश्चिम बंगाल',
    te: 'పశ్చిమ బెంగాల్',
    kn: 'ಪಶ್ಚಿಮ ಬಂಗಾಳ',
    ml: 'പശ്ചിമ ബംഗാൾ',
    bn: 'পশ্চিমবঙ্গ',
    mr: 'पश्चिम बंगाल',
    gu: 'પશ્ચિમ બંગાળ',
    pa: 'ਪੱਛਮੀ ਬੰਗਾਲ',
    or: 'ପଶ୍ଚିମବଙ୍ଗ'
  },
  'Gujarat': {
    en: 'Gujarat',
    ta: 'குஜராத்',
    hi: 'गुजरात',
    te: 'గుజరాత్',
    kn: 'ಗುಜರಾತ್',
    ml: 'ഗുജറാത്ത്',
    bn: 'গুজরাট',
    mr: 'गुजरात',
    gu: 'ગુજરાત',
    pa: 'ਗੁਜਰਾਤ',
    or: 'ଗୁଜରାଟ'
  },
  'Punjab': {
    en: 'Punjab',
    ta: 'பஞ்சாப்',
    hi: 'पंजाब',
    te: 'పంజాబ్',
    kn: 'ಪಂಜಾಬ್',
    ml: 'പഞ്ചാബ്',
    bn: 'পাঞ্জাব',
    mr: 'पंजाब',
    gu: 'પંજાબ',
    pa: 'ਪੰਜਾਬ',
    or: 'ପଞ୍ଜାବ'
  },
  'Odisha': {
    en: 'Odisha',
    ta: 'ஒடிசா',
    hi: 'ओडिशा',
    te: 'ఒడిశా',
    kn: 'ಒಡಿಶಾ',
    ml: 'ഒഡീഷ',
    bn: 'ওড়িশা',
    mr: 'ओडिशा',
    gu: 'ઓડિશા',
    pa: 'ਓਡੀਸ਼ਾ',
    or: 'ଓଡ଼ିଶା'
  },
  'Uttar Pradesh': {
    en: 'Uttar Pradesh',
    ta: 'உத்தரப் பிரதேசம்',
    hi: 'उत्तर प्रदेश',
    te: 'ఉత్తరప్రదేశ్',
    kn: 'ಉತ್ತರ ಪ್ರದೇಶ',
    ml: 'ഉത്തർപ്രദേശ്',
    bn: 'উত্তরপ্রদেশ',
    mr: 'उत्तर प्रदेश',
    gu: 'ઉત્તર પ્રદેશ',
    pa: 'ਉੱਤਰ ਪ੍ਰਦੇਸ਼',
    or: 'ଉତ୍ତର ପ୍ରଦେଶ'
  },
  'Bihar': {
    en: 'Bihar',
    ta: 'பீகார்',
    hi: 'बिहार',
    te: 'బీహార్',
    kn: 'ಬಿಹಾರ',
    ml: 'ബിഹാർ',
    bn: 'বিহার',
    mr: 'बिहार',
    gu: 'બિહાર',
    pa: 'ਬਿਹਾਰ',
    or: 'ବିହାର'
  },
  'Rajasthan': {
    en: 'Rajasthan',
    ta: 'ராஜஸ்தான்',
    hi: 'राजस्थान',
    te: 'రాజస్థాన్',
    kn: 'ರಾಜಸ್ಥಾನ',
    ml: 'രാജസ്ഥാൻ',
    bn: 'রাজস্থান',
    mr: 'राजस्थान',
    gu: 'રાજસ્થાન',
    pa: 'ਰਾਜਸਥਾਨ',
    or: 'ରାଜସ୍ଥାନ'
  },
  'Delhi (NCT)': {
    en: 'Delhi (NCT)',
    ta: 'தில்லி (NCT)',
    hi: 'दिल्ली (एनसीटी)',
    te: 'ఢిల్లీ (NCT)',
    kn: 'ದೆಹಲಿ (NCT)',
    ml: 'ഡൽഹി (NCT)',
    bn: 'দিল্লি (এনসিটি)',
    mr: 'दिल्ली (एनसीटी)',
    gu: 'દિલ્હી (NCT)',
    pa: 'ਦਿੱਲੀ (NCT)',
    or: 'ଦିଲ୍ଲୀ (NCT)'
  }
};

// ==========================================
// 4. OCCUPATIONS IN 11 LANGUAGES
// ==========================================
export const OCCUPATION_TRANSLATIONS: Record<string, Record<SupportedLanguage, string>> = {
  'Any': {
    en: 'All Occupations',
    ta: 'அனைத்து தொழில்கள்',
    hi: 'सभी व्यवसाय',
    te: 'అన్ని వృత్తులు',
    kn: 'ಎಲ್ಲಾ ಉದ್ಯೋಗಗಳು',
    ml: 'എല്ലാ തൊഴിലുകളും',
    bn: 'সমস্ত পেশা',
    mr: 'सर्व व्यवसाय',
    gu: 'તમામ વ્યવસાયો',
    pa: 'ਸਾਰੇ ਕਿੱਤੇ',
    or: 'ସମସ୍ତ ବୃତ୍ତି'
  },
  'Farmer / Agricultural Worker': {
    en: 'Farmer / Agricultural Worker',
    ta: 'விவசாயி / விவசாயத் தொழிலாளி',
    hi: 'किसान / कृषि श्रमिक',
    te: 'రైతు / వ్యవసాయ కూలీ',
    kn: 'ರೈತ / ಕೃಷಿ ಕಾರ್ಮಿಕ',
    ml: 'കർഷകൻ / കാർഷിക തൊഴിലാളി',
    bn: 'কৃষক / কৃষি শ্রমিক',
    mr: 'शेतकरी / शेतमजूर',
    gu: 'ખેડૂત / કૃષિ મજૂર',
    pa: 'ਕਿਸਾਨ / ਖੇਤ ਮਜ਼ਦੂਰ',
    or: 'କୃଷକ / କୃଷି ଶ୍ରମିକ'
  },
  'Student': {
    en: 'Student',
    ta: 'மாணவர் / மாணவி',
    hi: 'छात्र / छात्रा',
    te: 'విద్యార్థి',
    kn: 'ವಿದ್ಯಾರ್ಥಿ',
    ml: 'വിദ്യാർത്ഥി',
    bn: 'ছাত্র / ছাত্রী',
    mr: 'विद्यार्थी',
    gu: 'વિદ્યાર્થી',
    pa: 'ਵਿਦਿਆਰਥੀ',
    or: 'ଛାତ୍ର / ଛାତ୍ରୀ'
  },
  'Self Employed / Artisan': {
    en: 'Self Employed / Artisan',
    ta: 'சுயதொழில் / கைவினைஞர்',
    hi: 'स्वरोजगार / कारीगर',
    te: 'స్వయం ఉపాధి / చేతివృత్తిదారుడు',
    kn: 'ಸ್ವಯಂ ಉದ್ಯೋಗಿ / ಕುಶಲಕರ್ಮಿ',
    ml: 'സ്വയംതൊഴിൽ / ശിൽപി',
    bn: 'স্বনিযুক্ত / কারিগর',
    mr: 'स्वयंरोजगार / कारागीर',
    gu: 'સ્વરોજગાર / કારીગર',
    pa: 'ਸਵੈ-ਰੁਜ਼ਗਾਰ / ਦਸਤਕਾਰ',
    or: 'ସ୍ୱନିୟୋଜିତ / କାରିଗର'
  },
  'Daily Wage / Casual Labor': {
    en: 'Daily Wage / Casual Labor',
    ta: 'தினக்கூலி தொழிலாளி',
    hi: 'दैनिक वेतनभोगी / दिहाड़ी मजदूर',
    te: 'దినసరి కూలీ',
    kn: 'ದೈನಂದಿನ ಕೂಲಿ ಕಾರ್ಮಿಕ',
    ml: 'ദിവസവേതന തൊഴിലാളി',
    bn: 'দিনমজুর / কায়িক শ্রমিক',
    mr: 'दैनिक वेतन कामगार',
    gu: 'દૈનિક મજૂર',
    pa: 'ਦਿਹਾੜੀਦਾਰ ਮਜ਼ਦੂਰ',
    or: 'ଦିନ ମଜୁରିଆ'
  },
  'Street Vendor': {
    en: 'Street Vendor',
    ta: 'தெருவோர / நடைபாதை வியாபாரி',
    hi: 'रेहड़ी-पटरी / फेरीवाला',
    te: 'వీధి వ్యాపారి',
    kn: 'ಬೀದಿ ವ್ಯಾಪಾರಿ',
    ml: 'തെരുവ് കച്ചവടക്കാരൻ',
    bn: 'হকার / ক্ষুদ্র ব্যবসায়ী',
    mr: 'फेरीवाला',
    gu: 'શેરી ફેરિયો',
    pa: 'ਰੇਹੜੀ-ਫੜ੍ਹੀ ਵਾਲਾ',
    or: 'ଉଠାଦୋକାନୀ'
  },
  'Small Business Owner / Entrepreneur': {
    en: 'Small Business Owner / Entrepreneur',
    ta: 'சிறு தொழில் உரிமையாளர் / தொழில்முனைவோர்',
    hi: 'लघु व्यापारी / उद्यमी',
    te: 'చిన్న వ్యాపార యజమాని',
    kn: 'ಸಣ್ಣ ವ್ಯಾಪಾರಿ / ಉದ್ಯಮಿ',
    ml: 'ചെറുകിട വ്യാപാരി',
    bn: 'ক্ষুদ্র ব্যবসায়ী / উদ্যোক্তা',
    mr: 'लहान व्यावसायिक',
    gu: 'નાના વેપારી',
    pa: 'ਛੋਟਾ ਵਪਾਰੀ',
    or: 'କ୍ଷୁଦ୍ର ବ୍ୟବସାୟୀ'
  },
  'Homemaker': {
    en: 'Homemaker / Housewife',
    ta: 'குடும்பத்தலைவி / இல்லத்தரசி',
    hi: 'गृहिणी',
    te: 'గృహిణి',
    kn: 'ಗೃಹಿಣಿ',
    ml: 'വീട്ടമ്മ',
    bn: 'গৃহিণী',
    mr: 'गृहिणी',
    gu: 'ગૃહિણી',
    pa: 'ਘਰੇਲੂ ਮਹਿਲਾ',
    or: 'ଗୃହିଣୀ'
  },
  'Retired / Senior Citizen': {
    en: 'Retired / Senior Citizen',
    ta: 'ஓய்வு பெற்றவர் / மூத்த குடிமகன்',
    hi: 'सेवानिवृत्त / वरिष्ठ नागरिक',
    te: 'రిటైర్డ్ / సీనియర్ సిటిజన్',
    kn: 'ನಿವೃತ್ತ / ಹಿರಿಯ ನಾಗರಿಕ',
    ml: 'വിരമിച്ചവർ / മുതിർന്ന പൗരൻ',
    bn: 'অবসরপ্রাপ্ত / প্রবীণ নাগরিক',
    mr: 'निवृत्त / ज्येष्ठ नागरिक',
    gu: 'નિવૃત્ત / વરિષ્ઠ નાગરિક',
    pa: 'ਸੇਵਾਮੁਕਤ / ਬਜ਼ੁਰਗ',
    or: 'ଅବସରପ୍ରାପ୍ତ / ବରିଷ୍ଠ ନାଗରିକ'
  },
  'Unemployed / Job Seeker': {
    en: 'Unemployed / Job Seeker',
    ta: 'வேலை தேடுபவர் / இளைஞர்',
    hi: 'बेरोजगार / नौकरी तलाशने वाला',
    te: 'నిరుద్యోగి / ఉద్యోగార్ధి',
    kn: 'ನಿರುದ್ಯೋಗಿ / ಉದ್ಯೋಗಾಕಾಂಕ್ಷಿ',
    ml: 'തൊഴിൽരഹിതൻ',
    bn: 'বেকার / চাকরিপ্রার্থী',
    mr: 'बेरोजगार / नोकरी शोधणारा',
    gu: 'બેરોજગાર / નોકરી શોધનાર',
    pa: 'ਬੇਰੁਜ਼ਗਾਰ / ਨੌਕਰੀ ਲੱਭਣ ਵਾਲਾ',
    or: 'ବେକାରୀ / ଚାକିରି ପ୍ରାର୍ଥୀ'
  }
};

// ==========================================
// 4B. EDUCATION LEVELS IN 11 LANGUAGES
// ==========================================
export const EDUCATION_TRANSLATIONS: Record<string, Record<SupportedLanguage, string>> = {
  'Any': {
    en: 'Any Education Level',
    ta: 'அனைத்து கல்வித் தகுதிகள்',
    hi: 'कोई भी शैक्षणिक योग्यता',
    te: 'ఏదైనా విద్యా అర్హత',
    kn: 'ಯಾವುದೇ ವಿದ್ಯಾಭ್ಯಾಸ',
    ml: 'ഏതെങ്കിലും വിദ്യാഭ്യാസ യോഗ്യത',
    bn: 'যেকোনো শিক্ষাগত যোগ্যতা',
    mr: 'कोणतीही शैक्षणिक पात्रता',
    gu: 'કોઈપણ શૈક્ષણિક લાયકાત',
    pa: 'ਕੋਈ ਵੀ ਵਿੱਦਿਅਕ ਯੋਗਤਾ',
    or: 'ଯେକୌଣସି ଶିକ୍ଷାଗତ ଯୋଗ୍ୟତା'
  },
  'Below 10th Standard': {
    en: 'Below 10th Standard',
    ta: '10 ஆம் வகுப்புக்கு கீழ்',
    hi: '10वीं से कम',
    te: '10వ తరగతి కంటే తక్కువ',
    kn: '10 ನೇ ತರಗತಿಗಿಂತ ಕಡಿಮೆ',
    ml: 'പത്താം ക്ലാസിന് താഴെ',
    bn: 'দশম শ্রেণির নিচে',
    mr: '१०वी पेक्षा कमी',
    gu: '10મા ધોરણથી નીચે',
    pa: '10ਵੀਂ ਤੋਂ ਘੱਟ',
    or: 'ଦଶମ ଶ୍ରେଣୀ ତଳେ'
  },
  '10th Pass (SSLC)': {
    en: '10th Pass (SSLC)',
    ta: '10 ஆம் வகுப்பு தேர்ச்சி (SSLC)',
    hi: '10वीं पास (एसएसएलसी / मैट्रिक)',
    te: '10వ తరగతి ఉత్తీర్ణత (SSLC)',
    kn: '10 ನೇ ತರಗತಿ ಉತ್ತೀರ್ಣ (SSLC)',
    ml: 'പത്താം ക്ലാസ് പാസ് (SSLC)',
    bn: 'দশম শ্রেণি পাস (মাধ্যমিক)',
    mr: '१०वी उत्तीर्ण (एसएससी)',
    gu: '10મું પાસ (એસએસસી)',
    pa: '10ਵੀਂ ਪਾਸ (ਮੈਟ੍ਰਿਕ)',
    or: 'ଦଶମ ପାସ୍'
  },
  '12th Pass (HSC)': {
    en: '12th Pass (HSC)',
    ta: '12 ஆம் வகுப்பு தேர்ச்சி (+2 / HSC)',
    hi: '12वीं पास (इंटरमीडिएट / एचएससी)',
    te: '12వ తరగతి ఉత్తీర్ణత (ఇంటర్)',
    kn: '12 ನೇ ತರಗತಿ ಉತ್ತೀರ್ಣ (ಪಿಯುಸಿ)',
    ml: 'പന്ത്രണ്ടാം ക്ലാസ് പാസ് (+2)',
    bn: 'দ্বাদশ শ্রেণি পাস (উচ্চ মাধ্যমিক)',
    mr: '१२वी उत्तीर्ण (एचएससी)',
    gu: '12મું પાસ (એચએસસી)',
    pa: '12ਵੀਂ ਪਾਸ (ਸੀਨੀਅਰ ਸੈਕੰਡਰੀ)',
    or: 'ଦ୍ୱାଦଶ ପାସ୍'
  },
  'Diploma / ITI': {
    en: 'Diploma / ITI',
    ta: 'டிப்ளமோ / ஐடிஐ (ITI)',
    hi: 'डिप्लोमा / आईटीआई (ITI)',
    te: 'డిప్లొమా / ఐటీఐ (ITI)',
    kn: 'ಡಿಪ್ಲೊಮಾ / ಐಟಿಐ (ITI)',
    ml: 'ഡിപ്ലോമ / ഐടിഐ (ITI)',
    bn: 'ডিপ্লোমা / আইটিআই (ITI)',
    mr: 'डिप्लोमा / आयटीआय (ITI)',
    gu: 'ડિપ્લોમા / આઈટીઆઈ (ITI)',
    pa: 'ਡਿਪਲੋਮਾ / ਆਈ.ਟੀ.ਆਈ',
    or: 'ଡିପ୍ଲୋମା / ଆଇଟିଆଇ'
  },
  'Undergraduate / Bachelor Degree': {
    en: 'Undergraduate / Bachelor Degree',
    ta: 'இளங்கலை பட்டப்படிப்பு (UG)',
    hi: 'स्नातक / बैचलर डिग्री (ग्रेजुएशन)',
    te: 'డిగ్రీ / గ్రాడ్యుయేషన్ (UG)',
    kn: 'ಪದವಿ / ಬ್ಯಾಚುಲರ್ ಡಿಗ್ರಿ (UG)',
    ml: 'ബിരുദം / ബാച്ചിലേഴ്സ് ബിരുദം',
    bn: 'স্নাতক / ব্যাচেলর ডিগ্রি',
    mr: 'पदवी / बॅचलर पदवी',
    gu: 'સ્નાતક / બેચલર ડિગ્રી',
    pa: 'ਗ੍ਰੈਜੂਏਸ਼ਨ / ਬੈਚਲਰ ਡਿਗਰੀ',
    or: 'ସ୍ନାତକ ଡିଗ୍ରୀ'
  },
  'Postgraduate / Master Degree': {
    en: 'Postgraduate / Master Degree',
    ta: 'முதுகலை பட்டப்படிப்பு (PG)',
    hi: 'परास्नातक / मास्टर डिग्री (पोस्ट ग्रेजुएशन)',
    te: 'పీజీ / మాస్టర్స్ డిగ్రీ (PG)',
    kn: 'ಸ್ನಾತಕೋತ್ತರ / ಮಾಸ್ಟರ್ ಡಿಗ್ರಿ (PG)',
    ml: 'ബിരുദാനന്തര ബിരുദം (PG)',
    bn: 'স্নাতকোত্তর / মাস্টার্স ডিগ্রি',
    mr: 'व्युत्पन्न पदवी / मास्टर्स पदवी',
    gu: 'અનુસ્નાતક / માસ્ટર ડિગ્રી',
    pa: 'ਪੋਸਟ ਗ੍ਰੈਜੂਏਸ਼ਨ / ਮਾਸਟਰ ਡਿਗਰੀ',
    or: 'ସ୍ନାତକୋତ୍ତର ଡିଗ୍ରୀ'
  },
  'PhD / Doctorate': {
    en: 'PhD / Doctorate',
    ta: 'முனைவர் பட்டம் (PhD)',
    hi: 'पीएचडी / डॉक्टरेट',
    te: 'పీహెచ్‌డీ / డాక్టరేట్',
    kn: 'ಪಿಎಚ್‌ಡಿ / ಡಾಕ್ಟರೇಟ್',
    ml: 'പിഎച്ച്ഡി / ഡോക്ടറേറ്റ്',
    bn: 'পিএইচডি / ডক্টরেট',
    mr: 'पीएच.डी / डॉक्टरेट',
    gu: 'પીએચડી / ડોક્ટરેટ',
    pa: 'ਪੀ.ਐਚ.ਡੀ / ਡਾਕਟਰੇਟ',
    or: 'ପିଏଚଡି'
  }
};

// ==========================================
// 5. HELPER FUNCTIONS TO GET LOCALIZED DATA
// ==========================================
export function getLocalizedCategory(cat: SchemeCategory, lang: SupportedLanguage): SchemeCategory {
  const dict = CATEGORY_TRANSLATIONS[lang] || CATEGORY_TRANSLATIONS.en;
  const translation = dict[cat.id];
  if (!translation) return cat;
  return {
    ...cat,
    name: translation.name,
    description: translation.description
  };
}

export function getLocalizedScheme(scheme: Scheme, lang: SupportedLanguage): Scheme {
  const dict = SCHEME_TRANSLATIONS[lang] || SCHEME_TRANSLATIONS.en;
  const translation = dict[scheme.id];
  if (!translation) {
    // If not explicitly defined, still localize categoryName if available
    const catDict = CATEGORY_TRANSLATIONS[lang] || CATEGORY_TRANSLATIONS.en;
    const catTranslation = catDict[scheme.categoryId];
    return {
      ...scheme,
      categoryName: catTranslation?.name || scheme.categoryName
    };
  }
  return {
    ...scheme,
    name: translation.name,
    shortDescription: translation.shortDescription,
    description: translation.description || scheme.description,
    objective: translation.objective || scheme.objective,
    keyBenefit: translation.keyBenefit,
    department: translation.department,
    ministry: translation.ministry,
    categoryName: translation.categoryName,
    benefits: translation.benefits && translation.benefits.length > 0 ? translation.benefits : scheme.benefits,
    requiredDocuments: translation.requiredDocuments && translation.requiredDocuments.length > 0 ? translation.requiredDocuments : scheme.requiredDocuments,
    applicationProcess: translation.applicationProcess && translation.applicationProcess.length > 0 ? translation.applicationProcess : scheme.applicationProcess
  };
}

export function getLocalizedState(stateName: string, lang: SupportedLanguage): string {
  const map = STATE_TRANSLATIONS[stateName];
  if (!map) return stateName;
  return map[lang] || map.en || stateName;
}

export function getLocalizedOccupation(occupation: string, lang: SupportedLanguage): string {
  const map = OCCUPATION_TRANSLATIONS[occupation];
  if (!map) return occupation;
  return map[lang] || map.en || occupation;
}

export function getLocalizedEducation(education: string, lang: SupportedLanguage): string {
  const map = EDUCATION_TRANSLATIONS[education];
  if (!map) return education;
  return map[lang] || map.en || education;
}

// 6. COMPREHENSIVE UI TRANSLATIONS (Imported from ./uiTranslations)

// ==========================================
// 7. CITIZEN FOOTER & PORTAL TRANSLATIONS (11 LANGUAGES)
// ==========================================
export interface FooterTranslations {
  statutoryNoticeTitle: string;
  footerNoticeText: string;
  citizenNavigation: string;
  verifiedPortals: string;
  openDataPortal: string;
  nationalPortal: string;
  scholarshipsPortal: string;
  citizenHelpdesk: string;
  tollFreeHelpline: string;
  headquartersLocation: string;
  copyrightPlatform: string;
  disclaimerBtn: string;
}

export const FOOTER_TRANSLATIONS: Record<SupportedLanguage, FooterTranslations> = {
  en: {
    statutoryNoticeTitle: 'Statutory Notice:',
    footerNoticeText: 'GovScheme Finder provides informational eligibility matching based on user-entered demographics. Final scheme approvals, documents scrutiny, and direct benefit transfers are sanctioned solely by the designated Ministry or District Administrative Authority.',
    citizenNavigation: 'Citizen Navigation',
    verifiedPortals: 'Verified Portals',
    openDataPortal: 'data.gov.in (Open Data)',
    nationalPortal: 'india.gov.in (National Portal)',
    scholarshipsPortal: 'scholarships.gov.in (NSP)',
    citizenHelpdesk: 'Citizen Helpdesk',
    tollFreeHelpline: 'Toll Free: 1800-11-0033',
    headquartersLocation: 'New Delhi, India',
    copyrightPlatform: 'GovScheme National Discovery Platform. All rights reserved.',
    disclaimerBtn: 'Disclaimer'
  },
  ta: {
    statutoryNoticeTitle: 'அதிகாரப்பூர்வ சட்டப்பூர்வ அறிவிப்பு:',
    footerNoticeText: 'அரசு நலத்திட்ட வழிகாட்டி என்பது குடிமக்களின் தகவல் வழிகாட்டலுக்கான தளம். திட்டங்களின் இறுதி ஒப்புதல், ஆவண சரிபார்ப்பு மற்றும் நேரடி பலன் பரிமாற்றம் (DBT) சம்பந்தப்பட்ட அமைச்சகம் அல்லது மாவட்ட நிர்வாக அதிகாரத்தால் மட்டுமே வழங்கப்படும்.',
    citizenNavigation: 'குடிமக்கள் வழிகாட்டி',
    verifiedPortals: 'சரிபார்க்கப்பட்ட அரசு தளங்கள்',
    openDataPortal: 'data.gov.in (திறந்த தரவு தளம்)',
    nationalPortal: 'india.gov.in (தேசிய அரசு தளம்)',
    scholarshipsPortal: 'scholarships.gov.in (தேசிய கல்வி உதவித்தொகை - NSP)',
    citizenHelpdesk: 'குடிமக்கள் உதவி மையம்',
    tollFreeHelpline: 'கட்டணமில்லா உதவி எண்: 1800-11-0033',
    headquartersLocation: 'புது தில்லி, இந்தியா',
    copyrightPlatform: 'அரசு நலத்திட்ட தேசிய தளம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    disclaimerBtn: 'மறுப்புரை'
  },
  hi: {
    statutoryNoticeTitle: 'सांविधिक सूचना:',
    footerNoticeText: 'सरकारी योजना खोज पोर्टल केवल सूचना और पात्रता मार्गदर्शन के लिए है। योजनाओं की अंतिम स्वीकृति, दस्तावेज सत्यापन और प्रत्यक्ष लाभ हस्तांतरण संबंधित मंत्रालय या जिला प्रशासनिक प्राधिकरण द्वारा ही किया जाता है।',
    citizenNavigation: 'नागरिक नेविगेशन',
    verifiedPortals: 'सत्यापित सरकारी पोर्टल',
    openDataPortal: 'data.gov.in (ओपन डेटा पोर्टल)',
    nationalPortal: 'india.gov.in (राष्ट्रीय पोर्टल)',
    scholarshipsPortal: 'scholarships.gov.in (राष्ट्रीय छात्रवृत्ति - NSP)',
    citizenHelpdesk: 'नागरिक सहायता केंद्र',
    tollFreeHelpline: 'टोल फ्री: 1800-11-0033',
    headquartersLocation: 'नई दिल्ली, भारत',
    copyrightPlatform: 'सरकारी योजना राष्ट्रीय खोज मंच। सर्वाधिकार सुरक्षित।',
    disclaimerBtn: 'अस्वीकरण'
  },
  te: {
    statutoryNoticeTitle: 'చట్టబద్ధమైన నోటీసు:',
    footerNoticeText: 'ప్రభుత్వ పథకాల పోర్టల్ సమాచార మార్గదర్శకత్వం కోసం మాత్రమే. పథకాల తుది ఆమోదం, పత్రాల పరిశీలన మరియు ప్రత్యక్ష ప్రయోజన బదిలీ (DBT) సంబంధిత మంత్రిత్వ శాఖ లేదా జిల్లా అధికార యంత్రాంగం ద్వారా మాత్రమే నిర్వహించబడుతుంది.',
    citizenNavigation: 'పౌర నావిగేషన్',
    verifiedPortals: 'ధృవీకరించబడిన ప్రభుత్వ పోర్టల్స్',
    openDataPortal: 'data.gov.in (ఓపెన్ డేటా పోర్టల్)',
    nationalPortal: 'india.gov.in (జాతీయ పోర్టల్)',
    scholarshipsPortal: 'scholarships.gov.in (జాతీయ స్కాలర్‌షిప్ - NSP)',
    citizenHelpdesk: 'పౌర సహాయ కేంద్రం',
    tollFreeHelpline: 'టోల్ ఫ్రీ: 1800-11-0033',
    headquartersLocation: 'న్యూఢిల్లీ, భారతదేశం',
    copyrightPlatform: 'ప్రభుత్వ పథకాల జాతీయ పోర్టల్. సర్వహక్కులు ప్రత్యేకించబడ్డాయి.',
    disclaimerBtn: 'నిరాకరణ'
  },
  kn: {
    statutoryNoticeTitle: 'ಶಾಸನಬದ್ಧ ಸೂಚನೆ:',
    footerNoticeText: 'ಸರ್ಕಾರಿ ಯೋಜನೆ ಶೋಧಕವು ಮಾಹಿತಿ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ. ಯೋಜನೆಗಳ ಅಂತಿಮ ಅನುಮೋದನೆ, ದಾಖಲೆಗಳ ಪರಿಶೀಲನೆ ಮತ್ತು ನೇರ ನಗದು ವರ್ಗಾವಣೆ (DBT) ಸಂಬಂಧಪಟ್ಟ ಸಚಿವಾಲಯ ಅಥವಾ ಜಿಲ್ಲಾ ಪ್ರಾಧಿಕಾರದಿಂದ ಮಾತ್ರ ನೀಡಲಾಗುತ್ತದೆ.',
    citizenNavigation: 'ನಾಗರಿಕ ಮಾರ್ಗದರ್ಶಿ',
    verifiedPortals: 'ದೃಢೀಕರಿಸಿದ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ಗಳು',
    openDataPortal: 'data.gov.in (ಮುಕ್ತ ದತ್ತಾಂಶ ಪೋರ್ಟಲ್)',
    nationalPortal: 'india.gov.in (ರಾಷ್ಟ್ರೀಯ ಪೋರ್ಟಲ್)',
    scholarshipsPortal: 'scholarships.gov.in (ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ - NSP)',
    citizenHelpdesk: 'ನಾಗರಿಕ ಸಹಾಯ ಕೇಂದ್ರ',
    tollFreeHelpline: 'ಉಚಿತ ಸಹಾಯವಾಣಿ: 1800-11-0033',
    headquartersLocation: 'ನವದೆಹಲಿ, ಭಾರತ',
    copyrightPlatform: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ರಾಷ್ಟ್ರೀಯ ವೇದಿಕೆ. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
    disclaimerBtn: 'ಹಕ್ಕುತ್ಯಾಗ'
  },
  ml: {
    statutoryNoticeTitle: 'നിയമപരമായ അറിയിപ്പ്:',
    footerNoticeText: 'സർക്കാർ പദ്ധതി സഹായി എന്നത് വിവര ആവശ്യങ്ങൾക്കുള്ള മാർഗ്ഗനിർദ്ദേശം മാത്രമാണ്. പദ്ധതികളുടെ അന്തിമ അനുമതി, രേഖകളുടെ പരിശോധന, നേരിട്ടുള്ള ആനുകൂല്യ കൈമാറ്റം (DBT) എന്നിവ ബന്ധപ്പെട്ട മന്ത്രാലയമോ ജില്ലാ അധികാരിയോ മാത്രമാണ് നൽകുന്നത്.',
    citizenNavigation: 'പൗരന്മാർക്കുള്ള വഴികാട്ടി',
    verifiedPortals: 'സ്ഥിരീകരിച്ച സർക്കാർ പോർട്ടലുകൾ',
    openDataPortal: 'data.gov.in (ഓപ്പൺ ഡാറ്റ പോർട്ടൽ)',
    nationalPortal: 'india.gov.in (ദേശീയ പോർട്ടൽ)',
    scholarshipsPortal: 'scholarships.gov.in (ദേശീയ സ്കോളർഷിപ്പ് - NSP)',
    citizenHelpdesk: 'പൗര സഹായ കേന്ദ്രം',
    tollFreeHelpline: 'സൗജന്യ നമ്പർ: 1800-11-0033',
    headquartersLocation: 'ന്യൂഡൽഹി, ഇന്ത്യ',
    copyrightPlatform: 'സർക്കാർ പദ്ധതി ദേശീയ പ്ലാറ്റ്‌ഫോം. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.',
    disclaimerBtn: 'നിരാകരണം'
  },
  bn: {
    statutoryNoticeTitle: 'সংবিধিবদ্ধ বিজ্ঞপ্তি:',
    footerNoticeText: 'সরকারি প্রকল্প সহায়ক কেবল তথ্য ও নির্দেশনার জন্য। প্রকল্পের চূড়ান্ত অনুমোদন, নথি যাচাই এবং সরাসরি সুবিধা হস্তান্তর (DBT) সংশ্লিষ্ট মন্ত্রণালয় বা জেলা প্রশাসনিক কর্তৃপক্ষের মাধ্যমেই প্রদান করা হয়।',
    citizenNavigation: 'নাগরিক নেভিগেশন',
    verifiedPortals: 'যাচাইকৃত সরকারি পোর্টাল',
    openDataPortal: 'data.gov.in (উন্মুক্ত তথ্য পোর্টাল)',
    nationalPortal: 'india.gov.in (জাতীয় পোর্টাল)',
    scholarshipsPortal: 'scholarships.gov.in (জাতীয় বৃত্তি পোর্টাল - NSP)',
    citizenHelpdesk: 'নাগরিক সহায়তা কেন্দ্র',
    tollFreeHelpline: 'টোল ফ্রি: 1800-11-0033',
    headquartersLocation: 'নয়াদিল্লি, ভারত',
    copyrightPlatform: 'সরকারি প্রকল্প জাতীয় প্ল্যাটফর্ম। সর্বস্বত্ব সংরক্ষিত।',
    disclaimerBtn: 'দাবিত্যাগ'
  },
  mr: {
    statutoryNoticeTitle: 'वैधानिक सूचना:',
    footerNoticeText: 'शासकीय योजना मार्गदर्शक केवळ माहिती आणि मार्गदर्शनासाठी आहे. योजनांची अंतिम मंजुरी, कागदपत्रांची पडताळणी आणि थेट लाभ हस्तांतरण (DBT) केवळ संबंधित मंत्रालय किंवा जिल्हा प्रशासकीय प्राधिकरणाकडूनच केले जाते.',
    citizenNavigation: 'नागरिक मार्गदर्शक',
    verifiedPortals: 'सत्यापित शासकीय पोर्टल्स',
    openDataPortal: 'data.gov.in (ओपन डेटा पोर्टल)',
    nationalPortal: 'india.gov.in (राष्ट्रीय पोर्टल)',
    scholarshipsPortal: 'scholarships.gov.in (राष्ट्रीय शिष्यवृत्ती - NSP)',
    citizenHelpdesk: 'नागरिक मदत कक्ष',
    tollFreeHelpline: 'टोल फ्री: 1800-11-0033',
    headquartersLocation: 'नवी दिल्ली, भारत',
    copyrightPlatform: 'शासकीय योजना राष्ट्रीय मंच. सर्व हक्क राखीव.',
    disclaimerBtn: 'अस्वीकरण'
  },
  gu: {
    statutoryNoticeTitle: 'વૈધાનિક સૂચના:',
    footerNoticeText: 'સરકારી યોજના પોર્ટલ માત્ર માહિતી અને માર્ગદર્શન માટે છે. યોજનાઓની અંતિમ મંજૂરી, દસ્તાવેજ ચકાસણી અને સીધા લાભ ટ્રાન્સફર (DBT) સંબંધિત મંત્રાલય અથવા જિલ્લા સત્તામંડળ દ્વારા જ કરવામાં આવે છે.',
    citizenNavigation: 'નાગરિક માર્ગદર્શન',
    verifiedPortals: 'ચકાસાયેલ સરકારી પોર્ટલ',
    openDataPortal: 'data.gov.in (ઓપન ડેટા પોર્ટલ)',
    nationalPortal: 'india.gov.in (રાષ્ટ્રીય પોર્ટલ)',
    scholarshipsPortal: 'scholarships.gov.in (રાષ્ટ્રીય સ્કોલરશિપ - NSP)',
    citizenHelpdesk: 'નાગરિક સહાયતા કેન્દ્ર',
    tollFreeHelpline: 'ટોલ ફ્રી: 1800-11-0033',
    headquartersLocation: 'નવી દિલ્હી, ભારત',
    copyrightPlatform: 'સરકારી યોજના રાષ્ટ્રીય મંચ. સર્વહક સ્વાધીન.',
    disclaimerBtn: 'અસ્વીકરણ'
  },
  pa: {
    statutoryNoticeTitle: 'ਕਾਨੂੰਨੀ ਨੋਟਿਸ:',
    footerNoticeText: 'ਸਰਕਾਰੀ ਸਕੀਮ ਪੋਰਟਲ ਸਿਰਫ਼ ਜਾਣਕਾਰੀ ਅਤੇ ਮਾਰਗਦਰਸ਼ਨ ਲਈ ਹੈ। ਸਕੀਮਾਂ ਦੀ ਅੰਤਿਮ ਪ੍ਰਵਾਨਗੀ, ਦਸਤਾਵੇਜ਼ਾਂ ਦੀ ਜਾਂਚ ਅਤੇ ਸਿੱਧਾ ਲਾਭ ਤਬਾਦਲਾ (DBT) ਸਬੰਧਤ ਮੰਤਰਾਲੇ ਜਾਂ ਜ਼ਿਲ੍ਹਾ ਪ੍ਰਸ਼ਾਸਨ ਦੁਆਰਾ ਹੀ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।',
    citizenNavigation: 'ਨਾਗਰਿਕ ਨੇਵੀਗੇਸ਼ਨ',
    verifiedPortals: 'ਤਸਦੀਕਸ਼ੁਦਾ ਸਰਕਾਰੀ ਪੋਰਟਲ',
    openDataPortal: 'data.gov.in (ਓਪਨ ਡੇਟਾ ਪੋਰਟਲ)',
    nationalPortal: 'india.gov.in (ਰਾਸ਼ਟਰੀ ਪੋਰਟਲ)',
    scholarshipsPortal: 'scholarships.gov.in (ਰਾਸ਼ਟਰੀ ਵਜ਼ੀਫ਼ਾ - NSP)',
    citizenHelpdesk: 'ਨਾਗਰਿਕ ਸਹਾਇਤਾ ਕੇਂਦਰ',
    tollFreeHelpline: 'ਟੋਲ ਫ੍ਰੀ: 1800-11-0033',
    headquartersLocation: 'ਨਵੀਂ ਦਿੱਲੀ, ਭਾਰਤ',
    copyrightPlatform: 'ਸਰਕਾਰੀ ਯੋਜਨਾ ਰਾਸ਼ਟਰੀ ਮੰਚ। ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।',
    disclaimerBtn: 'ਬੇਦਾਅਵਾ'
  },
  or: {
    statutoryNoticeTitle: 'ବିଧିବଦ୍ଧ ସୂଚନା:',
    footerNoticeText: 'ସରକାରୀ ଯୋଜନା ପୋର୍ଟାଲ କେବଳ ସୂଚନା ଏବଂ ମାର୍ଗଦର୍ଶନ ପାଇଁ ଉଦ୍ଦିଷ୍ଟ। ଯୋଜନାର ଚୂଡ଼ାନ୍ତ ଅନୁମୋଦନ, ଦଲିଲ ଯାଞ୍ଚ ଏବଂ ପ୍ରତ୍ୟକ୍ଷ ଲାଭ ହସ୍ତାନ୍ତର (DBT) କେବଳ ସମ୍ପୃକ୍ତ ମନ୍ତ୍ରଣାଳୟ କିମ୍ବା ଜିଲ୍ଲା ପ୍ରଶାସନିକ କର୍ତ୍ତୃପକ୍ଷଙ୍କ ଦ୍ୱାରା କରାଯାଏ।',
    citizenNavigation: 'ନାଗରିକ ନେଭିଗେସନ୍',
    verifiedPortals: 'ଯାଞ୍ଚ ହୋଇଥିବା ସରକାରୀ ପୋର୍ଟାଲ୍',
    openDataPortal: 'data.gov.in (ମୁକ୍ତ ତଥ୍ୟ ପୋର୍ଟାଲ୍)',
    nationalPortal: 'india.gov.in (ଜାତୀୟ ପୋର୍ଟାଲ୍)',
    scholarshipsPortal: 'scholarships.gov.in (ଜାତୀୟ ବୃତ୍ତି ପୋର୍ଟାଲ୍ - NSP)',
    citizenHelpdesk: 'ନାଗରିକ ସହାୟତା କେନ୍ଦ୍ର',
    tollFreeHelpline: 'ଟୋଲ୍ ଫ୍ରି: 1800-11-0033',
    headquartersLocation: 'ନୂଆଦିଲ୍ଲୀ, ଭାରତ',
    copyrightPlatform: 'ସରକାରୀ ଯୋଜନା ଜାତୀୟ ମଞ୍ଚ। ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ।',
    disclaimerBtn: 'ଦାବିତ୍ୟାଗ'
  }
};

export function getLocalizedFooter(lang: SupportedLanguage): FooterTranslations {
  return FOOTER_TRANSLATIONS[lang] || FOOTER_TRANSLATIONS.en;
}

