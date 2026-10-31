import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Send, 
  Sparkles, 
  Wheat, 
  Users, 
  GraduationCap, 
  HeartPulse, 
  Briefcase, 
  Award, 
  RotateCcw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Info,
  Globe
} from 'lucide-react';
import { Scheme } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../data/translations';

interface MatchedScheme {
  name: string;
  tamilName?: string;
  benefit?: string;
  category?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  speechSummary?: string;
  matchedSchemes?: MatchedScheme[];
  suggestedQuestions?: string[];
  timestamp: string;
}

export interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateScheme?: (schemeIdOrName: string) => void;
  schemes?: Scheme[];
  userProfile?: any;
}

// Category visual cards for citizens in major languages
interface QuickPromptData {
  id: string;
  icon: any;
  color: string;
  titles: Record<string, { title: string; subtitle: string; query: string }>;
}

const CATEGORY_PROMPTS: QuickPromptData[] = [
  {
    id: 'farmers',
    icon: Wheat,
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100',
    titles: {
      en: {
        title: 'Farmers',
        subtitle: 'PM-Kisan, Subsidies, Seeds',
        query: 'What government financial assistance and subsidies are available for farmers and agriculture?'
      },
      ta: {
        title: 'விவசாயிகள்',
        subtitle: 'PM-கிசான், உரம், மானியம்',
        query: 'விவசாயிகளுக்கு என்னென்ன அரசு நிதி உதவி மற்றும் மானியத் திட்டங்கள் உள்ளன?'
      },
      hi: {
        title: 'किसान कल्याण',
        subtitle: 'पीएम-किसान, खाद, कृषि सब्सिडी',
        query: 'किसानों के लिए कौन-कौन सी सरकारी वित्तीय सहायता और सब्सिडी योजनाएं उपलब्ध हैं?'
      },
      te: {
        title: 'రైతులు',
        subtitle: 'పీఎం-కిసాన్, ఎరువులు, సబ్సిడీ',
        query: 'రైతులకు ప్రభుత్వం అందించే ఆర్థిక సహాయం మరియు సబ్సిడీ పథకాలు ఏమిటి?'
      },
      kn: {
        title: 'ರೈತರು',
        subtitle: 'ಪಿಎಂ-ಕಿಸಾನ್, ಸಬ್ಸಿಡಿ, ಗೊಬ್ಬರ',
        query: 'ರೈತರಿಗೆ ಲಭ್ಯವಿರುವ ಸರ್ಕಾರಿ ಆರ್ಥಿಕ ನೆರವು ಮತ್ತು ಸಬ್ಸಿಡಿ ಯೋಜನೆಗಳು ಯಾವುವು?'
      },
      ml: {
        title: 'കർഷകർ',
        subtitle: 'പിഎം-കിസാൻ, സബ്‌സിഡി, വളം',
        query: 'കർഷകർക്ക് ലഭ്യമായ സർക്കാർ ധനസഹായങ്ങളും സബ്‌സിഡി പദ്ധതികളും എന്തൊക്കെയാണ്?'
      },
      bn: {
        title: 'কৃষক কল্যাণ',
        subtitle: 'পিএম-কিষাণ, সার, কৃষি ভর্তুকি',
        query: 'কৃষকদের জন্য সরকারি আর্থিক সহায়তা এবং ভর্তুকি প্রকল্পগুলি কী কী?'
      },
      mr: {
        title: 'शेतकरी',
        subtitle: 'पीएम-किसान, खते, कृषी सबसिडी',
        query: 'शेतकऱ्यांसाठी कोणत्या सरकारी आर्थिक मदत आणि अनुदान योजना उपलब्ध आहेत?'
      },
      gu: {
        title: 'ખેડૂતો',
        subtitle: 'પીએમ-કિસાન, ખાતર, સબસિડી',
        query: 'ખેડૂતો માટે કઈ સરકારી નાણાકીય સહાય અને સબસિડી યોજનાઓ ઉપલબ્ધ છે?'
      },
      pa: {
        title: 'ਕਿਸਾਨ',
        subtitle: 'ਪੀਐਮ-ਕਿਸਾਨ, ਖਾਦ, ਸਬਸਿਡੀ',
        query: 'ਕਿਸਾਨਾਂ ਲਈ ਕਿਹੜੀਆਂ ਸਰਕਾਰੀ ਵਿੱਤੀ ਸਹਾਇਤਾ ਅਤੇ ਸਬਸਿਡੀ ਸਕੀਮਾਂ ਉਪਲਬਧ ਹਨ?'
      },
      od: {
        title: 'କୃଷକ',
        subtitle: 'ପିଏମ-କିଷାନ, ସାର, ସବସିଡି',
        query: 'କୃଷକମାନଙ୍କ ପାଇଁ କେଉଁ ସରକାରୀ ଆର୍ଥିକ ସହାୟତା ଏବଂ ସବସିଡି ଯୋଜନା ଉପଲବ୍ଧ ଅଛି?'
      }
    }
  },
  {
    id: 'women',
    icon: Users,
    color: 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100',
    titles: {
      en: {
        title: 'Women Welfare',
        subtitle: 'Direct Benefits, Self Help',
        query: 'What government financial assistance and welfare schemes are available for women and mothers?'
      },
      ta: {
        title: 'மகளிர் & பெண்கள்',
        subtitle: 'மாதம் ₹1000, மகளிர் உதவி',
        query: 'மகளிர் உரிமைத் தொகை மாதம் ₹1000 பெறுவது எப்படி? பெண்களுக்கு என்னென்ன திட்டங்கள் உள்ளன?'
      },
      hi: {
        title: 'महिला सशक्तिकरण',
        subtitle: 'मासिक सहायता, लाडली बहना, स्वयं सहायता',
        query: 'महिलाओं और माताओं के लिए सरकार की कौन-कौन सी कल्याणकारी और वित्तीय योजनाएं हैं?'
      },
      te: {
        title: 'మహిళా సంక్షేమం',
        subtitle: 'నెలవారీ సహాయం, స్వయం సహాయక సంఘాలు',
        query: 'మహిళలు మరియు తల్లుల కోసం అందుబాటులో ఉన్న ప్రభుత్వ సంక్షేమ పథకాలు ఏమిటి?'
      },
      kn: {
        title: 'ಮಹಿಳೆಯರು',
        subtitle: 'ಗೃಹಲಕ್ಷ್ಮಿ, ಮಾಸಿಕ ನೆರವು, ಸಂಘಗಳು',
        query: 'ಮಹಿಳೆಯರಿಗೆ ಸರ್ಕಾರದಿಂದ ಸಿಗುವ ಮಾಸಿಕ ಆರ್ಥಿಕ ನೆರವು ಮತ್ತು ಯೋಜನೆಗಳ ವಿವರ ತಿಳಿಸಿ.'
      },
      ml: {
        title: 'വനിതകൾ',
        subtitle: 'സ്ത്രീ സുരക്ഷ, ധനസഹായം',
        query: 'സ്ത്രീകൾക്കായി ലഭ്യമായ സർക്കാർ ക്ഷേമപദ്ധതികളും ധനസഹായങ്ങളും എന്തൊക്കെയാണ്?'
      },
      bn: {
        title: 'মহিলা কল্যাণ',
        subtitle: 'লক্ষ্মীর ভাণ্ডার, মাসিক ভাতা',
        query: 'মহিলাদের জন্য সরকারি আর্থিক সহায়তা এবং কল্যাণমূলক প্রকল্পগুলি কী কী?'
      },
      mr: {
        title: 'महिला सक्षमीकरण',
        subtitle: 'लाडकी बहीण, बचत गट योजना',
        query: 'महिलांसाठी शासनाच्या कोणत्या कल्याणकारी आणि आर्थिक मदत योजना उपलब्ध आहेत?'
      },
      gu: {
        title: 'મહિલા કલ્યાણ',
        subtitle: 'માસિક સહાય, સ્વસહાય જૂથ',
        query: 'મહિલાઓ માટે કઈ સરકારી કલ્યાણકારી અને સહાય યોજનાઓ ઉપલબ્ધ છે?'
      },
      pa: {
        title: 'ਔਰਤਾਂ ਦੀ ਭਲਾਈ',
        subtitle: 'ਮਹੀਨਾਵਾਰ ਸਹਾਇਤਾ, ਸਵੈ-ਸਹਾਇਤਾ',
        query: 'ਔਰਤਾਂ ਲਈ ਸਰਕਾਰ ਦੀਆਂ ਕਿਹੜੀਆਂ ਭਲਾਈ ਸਕੀਮਾਂ ਅਤੇ ਵਿੱਤੀ ਸਹਾਇਤਾ ਉਪਲਬਧ ਹਨ?'
      },
      od: {
        title: 'ମହିଳା କଲ୍ୟାଣ',
        subtitle: 'ମାସିକ ସହାୟତା, ସ୍ୱୟଂ ସହାୟକ ଗୋଷ୍ଠୀ',
        query: 'ମହିଳାମାନଙ୍କ ପାଇଁ ସରକାରଙ୍କ କେଉଁ କଲ୍ୟାଣକାରୀ ଏବଂ ଆର୍ଥିକ ଯୋଜନା ରହିଛି?'
      }
    }
  },
  {
    id: 'health',
    icon: HeartPulse,
    color: 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100',
    titles: {
      en: {
        title: 'Free Healthcare',
        subtitle: '₹5 Lakh Health Card Cover',
        query: 'How can I get free medical treatment up to ₹5 lakh under Ayushman Bharat or State Health Insurance?'
      },
      ta: {
        title: 'இலவச மருத்துவம்',
        subtitle: '₹5 லட்சம் மருத்துவ காப்பீடு',
        query: 'ஆயுஷ்மான் பாரத் மற்றும் முதலமைச்சர் மருத்துவக் காப்பீட்டு அட்டை எடுப்பது எப்படி?'
      },
      hi: {
        title: 'मुफ्त इलाज / स्वास्थ्य',
        subtitle: '₹5 लाख आयुष्मान कार्ड बीमा',
        query: 'आयुष्मान भारत या सरकारी स्वास्थ्य बीमा कार्ड से ₹5 लाख तक का मुफ्त इलाज कैसे पाएं?'
      },
      te: {
        title: 'ఉచిత వైద్యం',
        subtitle: '₹5 లక్షల ఆరోగ్య బీమా కార్డు',
        query: 'ఆయుష్మాన్ భారత్ లేదా ఆరోగ్యశ్రీ కింద ₹5 లక్షల వరకు ఉచిత చికిత్స ఎలా పొందాలి?'
      },
      kn: {
        title: 'ಉಚಿತ ಚಿಕಿತ್ಸೆ',
        subtitle: '₹5 ಲಕ್ಷ ಆಯುಷ್ಮಾನ್ ಆರೋಗ್ಯ ಕಾರ್ಡ್',
        query: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಅಥವಾ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಮೂಲಕ ಉಚಿತ ಆಸ್ಪತ್ರೆ ಚಿಕಿತ್ಸೆ ಪಡೆಯುವುದು ಹೇಗೆ?'
      },
      ml: {
        title: 'സൗജന്യ ചികിത്സ',
        subtitle: '₹5 ലക്ഷം ആരോഗ്യ ഇൻഷുറൻസ്',
        query: 'ആയുഷ്മാൻ ഭാരത് പദ്ധതി വഴി സൗജന്യ ചികിത്സ ലഭിക്കുന്നത് എങ്ങനെ?'
      },
      bn: {
        title: 'বিনামূল্যে চিকিৎসা',
        subtitle: '₹৫ লাখ স্বাস্থ্য বীমা কার্ড',
        query: 'আয়ুষ্মান ভারত বা স্বাস্থ্য সাথী প্রকল্পে বিনামূল্যে চিকিৎসা পাওয়ার উপায় কী?'
      },
      mr: {
        title: 'मोफत उपचार / आरोग्य',
        subtitle: '₹५ लाख आयुष्मान आरोग्य कवच',
        query: 'आयुष्मान भारत कार्ड द्वारे ₹५ लाखांपर्यंत मोफत उपचार कसे मिळवायचे?'
      },
      gu: {
        title: 'મફત સારવાર',
        subtitle: '₹૫ લાખ આયુષ્માન કાર્ડ કવચ',
        query: 'આયુષ્માન ભારત યોજના હેઠળ ₹૫ લાખ સુધીની મફત સારવાર કેવી રીતે મેળવવી?'
      },
      pa: {
        title: 'ਮੁਫ਼ਤ ਇਲਾਜ',
        subtitle: '₹5 ਲੱਖ ਆਯੁਸ਼ਮਾਨ ਕਾਰਡ',
        query: 'ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ ਤਹਿਤ ₹5 ਲੱਖ ਤੱਕ ਦਾ ਮੁਫ਼ਤ ਇਲਾਜ ਕਿਵੇਂ ਲਿਆ ਜਾਵੇ?'
      },
      od: {
        title: 'ମାଗଣା ଚିକିତ୍ସା',
        subtitle: '₹୫ ଲକ୍ଷ ସ୍ୱାସ୍ଥ୍ୟ ବୀମା',
        query: 'ଆୟୁଷ୍ମାନ ଭାରତ କିମ୍ବା ବିଜୁ ସ୍ୱାସ୍ଥ୍ୟ କଲ୍ୟାଣ ଯୋଜନାରେ ମାଗଣା ଚିକିତ୍ସା କିପରି ପାଇବା?'
      }
    }
  },
  {
    id: 'education',
    icon: GraduationCap,
    color: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100',
    titles: {
      en: {
        title: 'Student Scholarships',
        subtitle: 'Post-Matric, Higher Studies',
        query: 'What scholarships and fee reimbursement schemes are available for school and college students?'
      },
      ta: {
        title: 'மாணவர் கல்வி',
        subtitle: 'புதுமைப் பெண், கல்வி உதவி',
        query: 'கல்லூரி மாணவிகளுக்கு மாதம் ₹1000 புதுமைப் பெண் திட்டம் மற்றும் கல்வி உதவித்தொகை பற்றி கூறவும்.'
      },
      hi: {
        title: 'छात्रवृत्ति व शिक्षा',
        subtitle: 'पोस्ट-मैट्रिक, कॉलेज छात्रवृत्ति',
        query: 'स्कूल और कॉलेज के छात्रों के लिए कौन-कौन सी सरकारी छात्रवृत्ति योजनाएं उपलब्ध हैं?'
      },
      te: {
        title: 'విద్యార్థి స్కాలర్‌షిప్స్',
        subtitle: 'ఫీజు రీయింబర్స్‌మెంట్, వసతి',
        query: 'విద్యార్థులకు ప్రభుత్వం ఇచ్చే స్కాలర్‌షిప్‌లు మరియు ఫీజు రీయింబర్స్‌మెంట్ వివరాలు చెప్పండి.'
      },
      kn: {
        title: 'ವಿದ್ಯಾರ್ಥಿ ವೇತನ',
        subtitle: 'ಶಾಲೆ-ಕಾಲೇಜು ಸ್ಕಾಲರ್‌ಶಿಪ್',
        query: 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸರ್ಕಾರದ ಸ್ಕಾಲರ್‌ಶಿಪ್ ಮತ್ತು ಶುಲ್ಕ ವಿನಾಯಿತಿ ಸೌಲಭ್ಯಗಳು ಯಾವುವು?'
      },
      ml: {
        title: 'വിദ്യാഭ്യാസ സ്കോളർഷിപ്പ്',
        subtitle: 'സ്കൂൾ-കോളേജ് ധനസഹായം',
        query: 'വിദ്യാർത്ഥികൾക്കായി ലഭ്യമായ പ്രധാന സർക്കാർ സ്കോളർഷിപ്പുകൾ ഏതൊക്കെയാണ്?'
      },
      bn: {
        title: 'শিক্ষার্থী স্কলারশিপ',
        subtitle: 'কন্যাশ্রী, ঐক্যশ্রী, মেরিট স্কলারশিপ',
        query: 'স্কুল ও কলেজের ছাত্রছাত্রীদের জন্য কী কী সরকারি স্কলারশিপ পাওয়া যায়?'
      },
      mr: {
        title: 'विद्यार्थी शिष्यवृत्ती',
        subtitle: 'मॅट्रिकोत्तर शिक्षण, फी सवलत',
        query: 'शाळा आणि कॉलेजच्या विद्यार्थ्यांसाठी शासनाच्या कोणत्या शिष्यवृत्ती योजना आहेत?'
      },
      gu: {
        title: 'વિદ્યાર્થી શિષ્યવૃત્તિ',
        subtitle: 'પોસ્ટ-મેટ્રિક, ફી સહાય',
        query: 'વિદ્યાર્થીઓ માટે સરકારી શિષ્યવૃત્તિ અને ફી સહાય યોજનાઓ કઈ છે?'
      },
      pa: {
        title: 'ਵਿਦਿਆਰਥੀ ਵਜ਼ੀਫਾ',
        subtitle: 'ਪੋਸਟ-ਮੈਟ੍ਰਿਕ, ਪੜ੍ਹਾਈ ਸਹਾਇਤਾ',
        query: 'ਸਕੂਲ ਅਤੇ ਕਾਲਜ ਦੇ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਕਿਹੜੇ ਸਰਕਾਰੀ ਵਜ਼ੀਫੇ ਉਪਲਬਧ ਹਨ?'
      },
      od: {
        title: 'ଛାତ୍ରବୃତ୍ତି',
        subtitle: 'ମେଧାବୃତ୍ତି, ଶିକ୍ଷା ସହାୟତା',
        query: 'ଛାତ୍ରଛାତ୍ରୀମାନଙ୍କ ପାଇଁ ସରକାରୀ ଛାତ୍ରବୃତ୍ତି ଏବଂ ଫି ରିହାତି ଯୋଜନା ବିଷୟରେ ଜଣାନ୍ତୁ।'
      }
    }
  },
  {
    id: 'seniors',
    icon: Award,
    color: 'bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100',
    titles: {
      en: {
        title: 'Senior Citizen Pension',
        subtitle: 'Monthly Social Security',
        query: 'How can elders aged 60 and above apply for old age pension and what documents are needed?'
      },
      ta: {
        title: 'முதியோர் ஓய்வூதியம்',
        subtitle: 'மாதம் ₹1,000 ஓய்வூதியம்',
        query: '60 வயதுக்கு மேற்பட்ட முதியோர்களுக்கு அரசு ஓய்வூதியம் பெறுவது எப்படி? என்ன ஆவணங்கள் தேவை?'
      },
      hi: {
        title: 'वृद्धावस्था पेंशन',
        subtitle: '60+ आयु के लिए मासिक पेंशन',
        query: '60 वर्ष से अधिक उम्र के बुजुर्गों के लिए वृद्धावस्था पेंशन कैसे प्राप्त करें? क्या दस्तावेज चाहिए?'
      },
      te: {
        title: 'వృద్ధాప్య పెన్షన్',
        subtitle: 'నెలవారీ సామాజిక భద్రత',
        query: '60 ఏళ్లు దాటిన వృద్ధులకు ప్రభుత్వ పింఛను ఎలా వస్తుంది? ఏ డాక్యుమెంట్లు అవసరం?'
      },
      kn: {
        title: 'ವೃದ್ಧಾಪ್ಯ ವೇತನ',
        subtitle: 'ಮಾಸಿಕ ಪಿಂಚಣಿ, ಸಾಮಾಜಿಕ ಭದ್ರತೆ',
        query: '60 ವರ್ಷ ಮೇಲ್ಪಟ್ಟ ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ಸರ್ಕಾರಿ ಪಿಂಚಣಿ ಪಡೆಯುವುದು ಹೇಗೆ?'
      },
      ml: {
        title: 'വാർദ്ധക്യ പെൻഷൻ',
        subtitle: 'പ്രതിമാസ ക്ഷേമ പെൻഷൻ',
        query: '60 വയസ്സിന് മുകളിലുള്ളവർക്ക് വാർദ്ധക്യ പെൻഷൻ ലഭിക്കുന്നത് എങ്ങനെ? ആവശ്യമായ രേഖകൾ എന്തൊക്കെ?'
      },
      bn: {
        title: 'বার্ধক্য ভাতা',
        subtitle: '৬০+ বয়স্কদের মাসিক পেনশন',
        query: 'বয়স্ক ব্যক্তিদের বার্ধক্য ভাতা পাওয়ার প্রক্রিয়া এবং প্রয়োজনীয় নথিপত্র কী?'
      },
      mr: {
        title: 'श्रावणबाळ / वृद्धापकाळ पेन्शन',
        subtitle: '६० वर्षे पूर्ण ज्येष्ठांसाठी',
        query: 'ज्येष्ठ नागरिकांसाठी वृद्धापकाळ निवृत्तीवेतन कसे मिळवायचे? कोणती कागदपत्रे लागतात?'
      },
      gu: {
        title: 'વૃદ્ધાવસ્થા પેન્શન',
        subtitle: '૬૦ વર્ષથી વધુ ઉંમર માટે પેન્શન',
        query: 'વૃદ્ધ નાગરિકો માટે સરકારી પેન્શન મેળવવાની પ્રક્રિયા અને કયા દસ્તાવેજો જોઈએ?'
      },
      pa: {
        title: 'ਬੁਢਾਪਾ ਪੈਨਸ਼ਨ',
        subtitle: '60+ ਸਾਲ ਲਈ ਮਹੀਨਾਵਾਰ ਪੈਨਸ਼ਨ',
        query: 'ਬਜ਼ੁਰਗਾਂ ਲਈ ਬੁਢਾਪਾ ਪੈਨਸ਼ਨ ਕਿਵੇਂ ਲਗਵਾਈ ਜਾਵੇ ਅਤੇ ਕਿਹੜੇ ਕਾਗਜ਼ਾਤ ਚਾਹੀਦੇ ਹਨ?'
      },
      od: {
        title: 'ବାର୍ଦ୍ଧକ୍ୟ ଭତ୍ତା',
        subtitle: 'ମାସିକ ପେନସନ, ସାମାଜିକ ସୁରକ୍ଷା',
        query: 'ବୟସ୍କ ବ୍ୟକ୍ତିମାନଙ୍କ ପାଇଁ ବାର୍ଦ୍ଧକ୍ୟ ଭତ୍ତା କିପରି ମିଳିବ ଏବଂ କେଉଁ କାଗଜପତ୍ର ଆବଶ୍ୟକ?'
      }
    }
  },
  {
    id: 'business',
    icon: Briefcase,
    color: 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100',
    titles: {
      en: {
        title: 'Self-Employment Loans',
        subtitle: 'Mudra, SVANidhi, Subsidy',
        query: 'How to get collateral-free business loans under PM Mudra, PM SVANidhi, or PMEGP subsidies?'
      },
      ta: {
        title: 'சுயதொழில் கடன்',
        subtitle: 'முத்ரா, பிஎம் ஸ்வநிதி கடன்',
        query: 'சிறு வியாபாரிகள் மற்றும் சுயதொழில் தொடங்க பிணை இல்லாத அரசு கடன் உதவி பெறுவது எப்படி?'
      },
      hi: {
        title: 'मुद्रा व स्वरोजगार ऋण',
        subtitle: 'बिना गारंटी सरकारी लोन',
        query: 'छोटे व्यापारियों और स्वरोजगार शुरू करने के लिए बिना गारंटी मुद्रा लोन कैसे प्राप्त करें?'
      },
      te: {
        title: 'స్వయం ఉపాధి రుణాలు',
        subtitle: 'ముద్రా, పీఎం స్వనిధి రుణాలు',
        query: 'చిరు వ్యాపారులు మరియు స్వయం ఉపాధి కోసం గ్యారెంటీ లేని ముద్రా లోన్ ఎలా పొందాలి?'
      },
      kn: {
        title: 'ಸ್ವಯಂ ಉದ್ಯೋಗ ಸಾಲ',
        subtitle: 'ಮುದ್ರಾ ಯೋಜನೆ, ಬೀದಿಬದಿ ವ್ಯಾಪಾರ',
        query: 'ಸ್ವಯಂ ಉದ್ಯೋಗ ಆರಂಭಿಸಲು ಗ್ಯಾರಂಟಿ ಇಲ್ಲದ ಮುದ್ರಾ ಸಾಲ ಪಡೆಯುವುದು ಹೇಗೆ?'
      },
      ml: {
        title: 'സ്വയംതൊഴിൽ വായ്പ',
        subtitle: 'മുദ്ര ലോൺ, പിഎം സ്വനിധി',
        query: 'ചെറുകിട സംരംഭകർക്ക് ഗ്യാരണ്ടി ഇല്ലാതെ മുദ്ര വായ്പ ലഭിക്കുന്നത് എങ്ങനെ?'
      },
      bn: {
        title: 'ব্যবসা ও স্বনির্ভর ঋণ',
        subtitle: 'মুদ্রা লোন, পিএম স্বনিধি',
        query: 'ছোট ব্যবসার জন্য জামানতহীন মুদ্রা ঋণ বা সরকারি অনুদান কীভাবে পাবেন?'
      },
      mr: {
        title: 'मुद्रा व स्वयंरोजगार कर्ज',
        subtitle: 'विनातारण सरकारी कर्ज योजना',
        query: 'लहान व्यवसाय किंवा स्वयंरोजगार सुरू करण्यासाठी विनातारण मुद्रा कर्ज कसे मिळवायचे?'
      },
      gu: {
        title: 'સ્વરોજગાર લોન',
        subtitle: 'મુદ્રા લોન, પીએમ સ્વનિધિ',
        query: 'નાના વેપારીઓ અને સ્વરોજગાર માટે ગેરંટી વગરની મુદ્રા લોન કેવી રીતે મેળવવી?'
      },
      pa: {
        title: 'ਸਵੈ-ਰੋਜ਼ਗਾਰ ਕਰਜ਼ਾ',
        subtitle: 'ਮੁਦਰਾ ਲੋਨ, ਬਿਨਾਂ ਗਾਰੰਟੀ',
        query: 'ਛੋਟੇ ਵਪਾਰੀਆਂ ਲਈ ਬਿਨਾਂ ਗਾਰੰਟੀ ਮੁਦਰਾ ਲੋਨ ਕਿਵੇਂ ਪ੍ਰਾਪਤ ਕੀਤਾ ਜਾਵੇ?'
      },
      od: {
        title: 'ସ୍ୱରୋଜଗାର ଋଣ',
        subtitle: 'ମୁଦ୍ରା ଋଣ, ବିନା ବନ୍ଧକ ସହାୟତା',
        query: 'କ୍ଷୁଦ୍ର ବ୍ୟବସାୟ ଏବଂ ସ୍ୱରୋଜଗାର ପାଇଁ ବିନା ବନ୍ଧକରେ ମୁଦ୍ରା ଋଣ କିପରି ପାଇବା?'
      }
    }
  }
];

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  isOpen,
  onClose,
  onNavigateScheme,
  schemes = [],
  userProfile
}) => {
  const { language, setLanguage, t, availableLanguages, languageInfo } = useLanguage();

  // Initial welcome message localized to the active language
  const getInitialMessage = (): ChatMessage => {
    let welcomeText = `வணக்கம்! 🙏 நான் உங்களின் **அரசு நலத்திட்ட வழிகாட்டி**.\n\nபடிக்க சிரமமாக இருந்தாலும் கவலை வேண்டாம். கீழே உள்ள **மைக் (குரல்) பொத்தானை அழுத்தி** உங்கள் தாய்மொழியில் பேசலாம்.\n\nஅல்லது கீழே உள்ள படங்களை தொட்டு உடனடி விடை பெறலாம்!`;
    let speechSummary = `வணக்கம்! நான் உங்களின் அரசு நலத்திட்ட வழிகாட்டி. கீழே உள்ள மைக் பொத்தானை அழுத்தி நீங்கள் தாய்மொழியில் பேசலாம். விவசாயம், மகளிர் உதவி, மருத்துவ காப்பீடு மற்றும் ஓய்வூதியம் பற்றி அறிந்து கொள்ளலாம்.`;
    let suggested = [
      'மகளிர் உரிமைத் தொகை ₹1000 தகுதி என்ன?',
      'விவசாயிகளுக்கு பிஎம் கிசான் பணம் வருவது எப்படி?',
      'முதியோர் ஓய்வூதியத்திற்கு எங்கு செல்வது?'
    ];

    if (language === 'en') {
      welcomeText = `Welcome! 🙏 I am your **Government Schemes Voice Assistant**.\n\nNo need to worry if reading complex official guidelines is difficult. Tap the **big microphone button** below to speak in your preferred Indian language.\n\nOr simply tap the pictures below to discover benefits!`;
      speechSummary = `Welcome! I am your government scheme guide. Press the microphone button below to speak. You can ask about farmers aid, women welfare, free medical insurance, and pensions.`;
      suggested = [
        'How to apply for PM-Kisan ₹6,000 per year?',
        'How to get Ayushman Bharat free health card?',
        'What documents are needed for Old Age Pension?'
      ];
    } else if (language === 'hi') {
      welcomeText = `नमस्ते! 🙏 मैं आपका **सरकारी योजना आवाज सहायक (Voice Guide)** हूँ।\n\nयदि सरकारी नियम पढ़ने या टाइप करने में कठिनाई हो तो चिंता न करें। नीचे दिए गए **माइक बटन को दबाकर** अपनी भाषा में बोलें।\n\nया नीचे दिए गए चित्रों को छूकर तुरंत जानकारी पाएं!`;
      speechSummary = `नमस्ते! मैं आपका सरकारी योजना सहायक हूँ। नीचे माइक बटन दबाकर अपनी भाषा में पूछें। किसान सहायता, महिला योजना, मुफ्त इलाज और पेंशन के बारे में जानकारी पाएं।`;
      suggested = [
        'पीएम किसान सम्मान निधि ₹6,000 कैसे प्राप्त करें?',
        'आयुष्मान भारत ₹5 लाख मुफ्त इलाज कार्ड कैसे बनेगा?',
        'वृद्धावस्था पेंशन के लिए क्या पात्रता है?'
      ];
    } else if (language === 'te') {
      welcomeText = `నమస్కారం! 🙏 నేను మీ **ప్రభుత్వ పథకాల వాయిస్ అసిస్టెంట్**.\n\nచదవడం లేదా టైప్ చేయడం కష్టంగా ఉన్నా చింతించకండి. క్రింద ఉన్న **మైక్ బటన్ నొక్కి** మీ మాతృభాషలో మాట్లాడండి.\n\nలేదా క్రింద ఉన్న బొమ్మలను తాకి తక్షణ సమాధానం పొందండి!`;
      speechSummary = `నమస్కారం! మైక్ బటన్ నొక్కి మీ అనుమానాలను అడగండి. రైతు సహాయం, మహిళా పథకాలు, ఆరోగ్య బీమా గురించి వివరిస్తాను.`;
      suggested = [
        'పీఎం కిసాన్ నిధులు ఎలా పొందాలి?',
        'ఉచిత వైద్యం కోసం ఆరోగ్య కార్డు ఎలా తీసుకోవాలి?',
        'వృద్ధాప్య పింఛనుకు అర్హతలు ఏమిటి?'
      ];
    } else if (language === 'kn') {
      welcomeText = `ನಮಸ್ಕಾರ! 🙏 ನಾನು ನಿಮ್ಮ **ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ**.\n\nಓದಲು ಕಷ್ಟವಾದರೆ ಚಿಂತಿಸಬೇಡಿ. ಕೆಳಗಿನ **ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ** ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿಯೇ ಮಾತನಾಡಿ.\n\nಅಥವಾ ಕೆಳಗಿನ ಚಿತ್ರಗಳನ್ನು ಮುಟ್ಟಿ ಮಾಹಿತಿ ಪಡೆಯಿರಿ!`;
      speechSummary = `ನಮಸ್ಕಾರ! ಕೆಳಗಿನ ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ ಧ್ವನಿ ಮೂಲಕ ಪ್ರಶ್ನೆ ಕೇಳಿ. ಕಿಸಾನ್ ಯೋಜನೆ, ಗೃಹಲಕ್ಷ್ಮಿ, ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಮತ್ತು ಪಿಂಚಣಿ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ.`;
      suggested = [
        'ಪಿಎಂ ಕಿಸಾನ್ ₹6,000 ಹಣ ಪಡೆಯುವುದು ಹೇಗೆ?',
        'ಆಯುಷ್ಮಾನ್ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಪಡೆಯುವುದು ಹೇಗೆ?',
        'ಹಿರಿಯ ನಾಗರಿಕರ ಪಿಂಚಣಿ ನಿಯಮಗಳೇನು?'
      ];
    } else if (language === 'ml') {
      welcomeText = `നമസ്കാരം! 🙏 ഞാൻ നിങ്ങളുടെ **സർക്കാർ ക്ഷേമപദ്ധതി സഹായി** ആണ്.\n\nവായിക്കാൻ പ്രയാസമാണെങ്കിൽ വിഷമിക്കേണ്ടതില്ല. താഴെയുള്ള **മൈക്ക് ബട്ടൺ അമർത്തി** നിങ്ങളുടെ മാതൃഭാഷയിൽ സംസാരിക്കാം.\n\nഅല്ലെങ്കിൽ താഴെയുള്ള ചിത്രങ്ങൾ തൊട്ട് വിവരങ്ങൾ അറിയാം!`;
      speechSummary = `നമസ്കാരം! ഞാൻ നിങ്ങളുടെ സർക്കാർ പദ്ധതി സഹായിയാണ്. താഴെയുള്ള മൈക്ക് ബട്ടൺ അമർത്തി സംസാരിക്കാം.`;
      suggested = [
        'പിഎം കിസാൻ ₹6,000 ആനുകൂല്യം ലഭിക്കുന്നത് എങ്ങനെ?',
        'ആയുഷ്മാൻ സൗജന്യ ചികിത്സാ കാർഡ് എങ്ങനെ ലഭിക്കും?',
        'വാർദ്ധക്യകാല പെൻഷൻ ലഭിക്കാനുള്ള യോഗ്യതകൾ എന്തൊക്കെയാണ്?'
      ];
    } else if (language === 'bn') {
      welcomeText = `নমস্কার! 🙏 আমি আপনার **সরকারি প্রকল্প ভয়েস সহায়ক**।\n\nপড়তে অসুবিধা হলে কোনো চিন্তা নেই। নিচে দেওয়া **মাইক্রোফোন বোতামটি চেপে** আপনার নিজের ভাষায় কথা বলুন।\n\nঅথবা নিচের ছবিগুলোতে স্পর্শ করে তৎক্ষণাৎ তথ্য জানুন!`;
      speechSummary = `নমস্কার! আমি আপনার সরকারি প্রকল্প সহায়ক। নিচের মাইক বোতামটি চেপে কথা বলুন।`;
      suggested = [
        'পিএম-কিষাণ প্রকল্পের সুবিধা কীভাবে পাবেন?',
        'আয়ুষ্মান ভারত বা স্বাস্থ্য সাথী কার্ড কীভাবে বানাবেন?',
        'বার্ধক্য ভাতার জন্য আবেদনের নিয়ম কী?'
      ];
    } else if (language === 'mr') {
      welcomeText = `नमस्कार! 🙏 मी आपला **शासकीय योजना आवाज मार्गदर्शक** आहे.\n\nवाचायला कठीण जात असेल तर काळजी करू नका. खालील **माईक बटण दाबून** आपल्या भाषेत बोला.\n\nकिंवा खालील चित्रांना स्पर्श करून तात्काळ माहिती मिळवा!`;
      speechSummary = `नमस्कार! मी आपला शासकीय योजना मार्गदर्शक आहे. खालील माईक बटण दाबून आपल्या मातृभाषेत बोला.`;
      suggested = [
        'पीएम किसान योजनेचे ₹६,००० कसे मिळवायचे?',
        'आयुष्मान भारत मोफत उपचार कार्ड कसे बनवायचे?',
        'श्रावण बाळ व वृद्धापकाळ निवृत्तीवेतन पात्रता काय आहे?'
      ];
    } else if (language === 'gu') {
      welcomeText = `નમસ્તે! 🙏 હું તમારો **સરકારી યોજના સહાયક** છું.\n\nવાંચવામાં મુશ્કેલી હોય તો ચિંતા કરશો નહીં. નીચે આપેલા **માઇક બટનને દબાવીને** તમારી ભાષામાં બોલો.\n\nઅથવા નીચેના ચિત્રોને સ્પર્શ કરીને તરત જ માહિતી મેળવો!`;
      speechSummary = `નમસ્તે! હું તમારો સરકારી યોજના સહાયક છું. નીચેનું માઇક બટન દબાવીને તમારી ભાષામાં પૂછો.`;
      suggested = [
        'પીએમ-કિસાન ₹૬,૦૦૦ સહાય કેવી રીતે મેળવવી?',
        'આયુષ્માન ભારત ₹૫ લાખ મફત સારવાર કાર્ડ કેવી રીતે મેળવવું?',
        'વૃદ્ધ પેન્શન સહાય યોજના માટે કયા દસ્તાવેજો જોઈએ?'
      ];
    } else if (language === 'pa') {
      welcomeText = `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! 🙏 ਮੈਂ ਤੁਹਾਡਾ **ਸਰਕਾਰੀ ਯੋਜਨਾ ਵੌਇਸ ਗਾਈਡ** ਹਾਂ।\n\nਜੇਕਰ ਪੜ੍ਹਨਾ ਔਖਾ ਲੱਗੇ ਤਾਂ ਚਿੰਤਾ ਨਾ ਕਰੋ। ਹੇਠਾਂ ਦਿੱਤੇ **ਮਾਈਕ ਬਟਨ ਨੂੰ ਦਬਾ ਕੇ** ਆਪਣੀ ਮਾਂ-ਬੋਲੀ ਵਿੱਚ ਬੋਲੋ।\n\nਜਾਂ ਹੇਠਾਂ ਦਿੱਤੀਆਂ ਤਸਵੀਰਾਂ ਨੂੰ ਛੂਹ ਕੇ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ!`
      speechSummary = `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਦਾ ਸਹਾਇਕ ਹਾਂ। ਹੇਠਾਂ ਮਾਈਕ ਬਟਨ ਦਬਾ ਕੇ ਬੋਲੋ।`;
      suggested = [
        'ਪੀਐਮ ਕਿਸਾਨ ₹6,000 ਕਿਸ਼ਤ ਕਿਵੇਂ ਲਈ ਜਾਵੇ?',
        'ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ ਮੁਫ਼ਤ ਇਲਾਜ ਕਾਰਡ ਕਿਵੇਂ ਬਣੇਗਾ?',
        'ਬੁਢਾਪਾ ਪੈਨਸ਼ਨ ਲੈਣ ਲਈ ਕੀ ਸ਼ਰਤਾਂ ਹਨ?'
      ];
    } else if (language === 'od' || (language as any) === 'or') {
      welcomeText = `ନମସ୍କାର! 🙏 ମୁଁ ଆପଣଙ୍କର **ସରକାରୀ ଯୋଜନା ଭଏସ୍ ଗାଇଡ୍**।\n\nପଢିବାକୁ ଅସୁବିଧା ହେଲେ ଚିନ୍ତା କରନ୍ତୁ ନାହିଁ। ତଳେ ଥିବା **ମାଇକ୍ ବଟନ୍ ଦବାଇ** ନିଜ ମାତୃଭାଷାରେ କୁହନ୍ତୁ।\n\nକିମ୍ବା ତଳେ ଥିବା ଛବିକୁ ଛୁଇଁ ସଙ୍ଗେ ସଙ୍ଗେ ସୂଚନା ପାଆନ୍ତୁ!`
      speechSummary = `ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର ସରକାରୀ ଯୋଜନା ସହାୟକ। ତଳେ ଥିବା ମାଇକ୍ ବଟନ୍ ଦବାଇ କଥା ହୁଅନ୍ତୁ।`;
      suggested = [
        'ପିଏମ କିଷାନ ₹୬,୦୦୦ ଟଙ୍କା କିପରି ପାଇବା?',
        'ସ୍ୱାସ୍ଥ୍ୟ ବୀମା କାର୍ଡ଼ କିପରି ତିଆରି କରିବା?',
        'ବୃଦ୍ଧାବସ୍ଥା ପେନସନ ପାଇଁ କଣ ଯୋଗ୍ୟତା ଦରକାର?'
      ];
    }

    return {
      id: `welcome-${language}`,
      sender: 'assistant',
      text: welcomeText,
      speechSummary,
      suggestedQuestions: suggested,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const [messages, setMessages] = useState<ChatMessage[]>([getInitialMessage()]);
  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [isAutoSpeak, setIsAutoSpeak] = useState(true);
  const [isLargeFont, setIsLargeFont] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(0.9); // slightly slower for clarity
  const [showSettings, setShowSettings] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Update initial message when language changes if conversation only has 1 message
  useEffect(() => {
    if (messages.length <= 1) {
      setMessages([getInitialMessage()]);
    }
  }, [language]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Clean up speech synthesis when unmounting or closing
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
    };
  }, []);

  // Text-To-Speech
  const speakText = (textToSpeak: string, messageId?: string) => {
    if (!('speechSynthesis' in window)) {
      setSpeechError(t.speechNotSupported);
      return;
    }

    window.speechSynthesis.cancel();

    if (isSpeaking && speakingMessageId === messageId) {
      setIsSpeaking(false);
      setSpeakingMessageId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const targetCode = languageInfo.speechCode || 'ta-IN';
    utterance.lang = targetCode;
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    // Pick best matching voice if available in system
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang === targetCode || v.lang.replace('_', '-').startsWith(language));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (messageId) setSpeakingMessageId(messageId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    }
  };

  // Speech Recognition (Speech-to-Text)
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError(t.speechNotSupported);
      return;
    }

    stopSpeaking();
    setSpeechError(null);

    try {
      const recognition = new SpeechRecognition();
      const targetCode = languageInfo.speechCode || 'ta-IN';
      recognition.lang = targetCode;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError(t.micPermissionDenied);
        } else if (event.error === 'no-speech') {
          setSpeechError(t.noSpeechDetected);
        } else {
          setSpeechError(t.speechErrorGeneric);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Error starting recognition:', err);
      setIsListening(false);
      setSpeechError(t.speechErrorGeneric);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
      setIsListening(false);
    }
  };

  // Send query to AI Assistant
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputQuery('');
    setSpeechError(null);
    setIsLoading(true);

    try {
      // Build lightweight context of schemes
      const schemesSummary = schemes.map(s => ({
        id: s.id,
        name: s.name,
        categoryName: s.categoryName,
        keyBenefit: s.keyBenefit,
        eligibility: s.eligibility
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language: language,
          conversationHistory: updatedMessages.map(m => ({
            role: m.sender,
            text: m.text
          })),
          userProfile: userProfile || null,
          schemesSummary: schemesSummary.slice(0, 15)
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || data.tamilReply || 'Information could not be retrieved. Please try again.';
      const speechText = data.speechSummary || replyText;

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        speechSummary: speechText,
        matchedSchemes: data.matchedSchemes || [],
        suggestedQuestions: data.suggestedQuestions || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);

      // Automatically speak the summary if auto-speak is enabled
      if (isAutoSpeak && assistantMsg.speechSummary) {
        speakText(assistantMsg.speechSummary, assistantMsg.id);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `assistant-err-${Date.now()}`,
        sender: 'assistant',
        text: `Network connection issue. Please check your connection and ask again.`,
        speechSummary: `Network connection issue. Please ask again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    stopSpeaking();
    stopListening();
    setMessages([getInitialMessage()]);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col h-[92vh] sm:h-[85vh] max-h-[780px] overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/90 text-white flex items-center justify-center shadow-xs shrink-0 ring-2 ring-emerald-400/40">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="voice-modal-title" className="font-extrabold text-sm sm:text-base tracking-tight truncate">
                  {languageInfo.nativeName} {t.navVoiceGuide}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-wide shrink-0">
                  {t.audioAssistance}
                </span>
              </div>
              <p className="text-xs text-indigo-200 truncate mt-0.5">
                {t.speakInVoice} • {t.listenInVoice}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick Language Selector inside assistant */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLangPicker(!showLangPicker)}
                className="px-2.5 py-1.5 rounded-lg bg-indigo-700/80 hover:bg-indigo-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 border border-indigo-500/50 shadow-xs"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span>{languageInfo.nativeName}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showLangPicker && (
                <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-900 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    {t.language}
                  </div>
                  <div className="max-h-56 overflow-y-auto py-1">
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLangPicker(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-indigo-50 transition-colors ${
                          language === lang.code ? 'font-bold text-indigo-700 bg-indigo-50/60' : 'text-slate-700'
                        }`}
                      >
                        <span>{lang.nativeName}</span>
                        <span className="text-[10px] text-slate-400 uppercase">{lang.code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                if (isSpeaking) stopSpeaking();
                setIsAutoSpeak(!isAutoSpeak);
              }}
              title={isAutoSpeak ? t.autoSpeakOn : t.autoSpeakOff}
              className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
                isAutoSpeak ? 'bg-indigo-700 text-amber-300' : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {isAutoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Accessibility Settings Toggle */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              title={t.accessibilitySettings}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Reset chat */}
            <button
              onClick={handleReset}
              title={t.resetChat}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Close modal */}
            <button
              onClick={() => {
                stopSpeaking();
                stopListening();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-600/80 text-white transition-colors ml-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Accessibility & Voice Settings Bar */}
        {showSettings && (
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">{t.fontSize}:</span>
              <button
                onClick={() => setIsLargeFont(false)}
                className={`px-2.5 py-1 rounded text-xs font-bold ${!isLargeFont ? 'bg-indigo-700 text-white' : 'bg-white border text-slate-700'}`}
              >
                {t.normalFont}
              </button>
              <button
                onClick={() => setIsLargeFont(true)}
                className={`px-2.5 py-1 rounded text-xs font-bold ${isLargeFont ? 'bg-indigo-700 text-white' : 'bg-white border text-slate-700'}`}
              >
                {t.largeFont}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">{t.voiceSpeed}:</span>
              <button
                onClick={() => setSpeechRate(0.8)}
                className={`px-2.5 py-1 rounded text-xs font-bold ${speechRate === 0.8 ? 'bg-indigo-700 text-white' : 'bg-white border text-slate-700'}`}
              >
                {t.voiceSlow}
              </button>
              <button
                onClick={() => setSpeechRate(1.0)}
                className={`px-2.5 py-1 rounded text-xs font-bold ${speechRate === 1.0 ? 'bg-indigo-700 text-white' : 'bg-white border text-slate-700'}`}
              >
                {t.voiceNormal}
              </button>
            </div>
          </div>
        )}

        {/* Active Speaking Banner */}
        {isSpeaking && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 flex items-center justify-between text-xs text-emerald-900 animate-in fade-in">
            <div className="flex items-center gap-2 font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span>{t.speakingNow}</span>
            </div>
            <button
              onClick={stopSpeaking}
              className="px-2.5 py-0.5 rounded bg-emerald-200 hover:bg-emerald-300 text-emerald-900 font-bold text-[11px] transition-colors"
            >
              {t.stopVoice}
            </button>
          </div>
        )}

        {/* Chat Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fafc]">
          
          {/* Visual Category Shortcuts for Citizens / Non-Readers */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
              <Info className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t.quickTopicsHelp}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORY_PROMPTS.map((item) => {
                const IconComponent = item.icon;
                const langPrompt = item.titles[language] || item.titles[language === 'or' ? 'od' : 'en'] || item.titles['en'] || item.titles['ta'];
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSendMessage(langPrompt.query)}
                    className={`p-2 rounded-lg border text-left transition-all hover:scale-[1.01] flex items-start gap-2 ${item.color}`}
                  >
                    <div className="p-1 rounded-md bg-white/80 shadow-2xs shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs leading-tight truncate">{langPrompt.title}</div>
                      <div className="text-[10px] opacity-80 leading-tight mt-0.5 truncate">{langPrompt.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-3.5 sm:p-4 shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-700 text-white rounded-tr-xs'
                    : 'bg-white border border-slate-200 text-slate-900 rounded-tl-xs'
                }`}
              >
                {/* Assistant Audio Action Button */}
                {msg.sender === 'assistant' && msg.speechSummary && (
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs">
                    <button
                      onClick={() => speakText(msg.speechSummary!, msg.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                        isSpeaking && speakingMessageId === msg.id
                          ? 'bg-emerald-600 text-white shadow-xs animate-pulse'
                          : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isSpeaking && speakingMessageId === msg.id ? t.speakingNow : `🔊 ${t.listenAloud}`}</span>
                    </button>
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>
                )}

                {/* Main Message Text */}
                <div 
                  className={`leading-relaxed whitespace-pre-line ${
                    isLargeFont ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Matched Scheme Cards if any */}
                {msg.matchedSchemes && msg.matchedSchemes.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {t.matchedSchemesLabel}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.matchedSchemes.map((scheme, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-colors flex flex-col justify-between"
                        >
                          <div>
                            <div className="font-bold text-xs text-slate-900 leading-snug">
                              {scheme.tamilName || scheme.name}
                            </div>
                            {scheme.benefit && (
                              <div className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                                {scheme.benefit}
                              </div>
                            )}
                          </div>
                          {onNavigateScheme && (
                            <button
                              onClick={() => {
                                onNavigateScheme(scheme.name);
                                onClose();
                              }}
                              className="mt-2 text-[10px] font-bold text-indigo-700 hover:text-indigo-800 flex items-center gap-1"
                            >
                              <span>{t.viewSchemeDetails}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Questions */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      {t.suggestedQuestionsLabel}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedQuestions.map((sq, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSendMessage(sq)}
                          className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-150 rounded-full text-[11px] font-medium text-left transition-colors"
                        >
                          💬 {sq}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {msg.sender === 'user' && (
                  <div className="text-right mt-1">
                    <span className="text-[9px] text-indigo-200">{msg.timestamp}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading state indicator */}
          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-3.5 shadow-2xs flex items-center gap-2.5 text-xs text-slate-600">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></div>
                </div>
                <span className="font-semibold">{t.analyzingSchemes}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Speech Error Notice */}
        {speechError && (
          <div className="px-4 py-2 bg-amber-50 border-t border-amber-200 text-amber-900 text-xs flex items-center justify-between">
            <span>⚠️ {speechError}</span>
            <button onClick={() => setSpeechError(null)} className="text-amber-700 font-bold ml-2">×</button>
          </div>
        )}

        {/* Voice Input & Query Bar (Specially Designed for Illiterate and Rural Citizens) */}
        <div className="p-3 bg-white border-t border-slate-200">
          
          {/* Active Voice Listening Banner */}
          {isListening && (
            <div className="mb-2 p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-800">
                <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping"></span>
                <span>{t.micListeningBanner}</span>
              </div>
              <button
                onClick={stopListening}
                className="px-2.5 py-0.5 bg-rose-600 text-white rounded text-[11px] font-bold"
              >
                {t.doneListening}
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* High-Contrast Microphone Button */}
            <button
              id="multilingual-voice-mic-button"
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`p-3 rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0 ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-200'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-100'
              }`}
              title={t.tapToSpeak}
            >
              {isListening ? (
                <>
                  <MicOff className="w-5 h-5" />
                  <span className="text-xs hidden sm:inline">{t.listening}</span>
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5" />
                  <span className="text-xs font-extrabold hidden sm:inline">{t.speakInVoice}</span>
                </>
              )}
            </button>

            {/* Input Field */}
            <div className="relative flex-1">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder={isListening ? t.voiceTypingHere : t.askInLanguagePlaceholder}
                className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                disabled={isLoading}
              />
            </div>

            {/* Send Button */}
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputQuery.trim() || isLoading}
              className="p-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold transition-colors shrink-0 shadow-xs"
              title={t.sendQuery}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1">
            <span>{t.voiceAssistantTip}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
