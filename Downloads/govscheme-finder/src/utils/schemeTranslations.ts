import { SupportedLanguage } from '../data/translations';

export interface LocalizedSchemeData {
  name: string;
  shortDescription: string;
  description?: string;
  objective?: string;
  keyBenefit: string;
  department: string;
  ministry: string;
  categoryName: string;
  benefits?: string[];
  requiredDocuments?: string[];
  applicationProcess?: string[];
}

export const SCHEME_TRANSLATIONS: Record<SupportedLanguage, Record<string, LocalizedSchemeData>> = {
  en: {
    'pm-kisan-2024': {
      name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      shortDescription: 'Income support of ₹6,000 per year in three installments directly to cultivable landholding farmer families.',
      keyBenefit: '₹6,000/year via DBT in 3 installments of ₹2,000 each',
      department: 'Department of Agriculture & Farmers Welfare',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      categoryName: 'Agriculture & Rural'
    },
    'pm-jay-ayushman': {
      name: 'Ayushman Bharat - PM-JAY',
      shortDescription: 'World\'s largest government-funded health assurance scheme providing ₹5 Lakh cover per family per year for secondary and tertiary care hospitalization.',
      keyBenefit: '₹5,00,000 free hospitalization cover per family per year',
      department: 'National Health Authority (NHA)',
      ministry: 'Ministry of Health & Family Welfare',
      categoryName: 'Healthcare & Wellness'
    },
    'sukanya-samriddhi-yojana': {
      name: 'Sukanya Samriddhi Yojana (SSY)',
      shortDescription: 'Government-backed savings scheme for girl children offering high sovereign interest rate, tax exemption, and maturity corpus for education and marriage.',
      keyBenefit: 'Highest sovereign interest (8.2%) with full Section 80C tax exemption',
      department: 'Department of Posts / Financial Services',
      ministry: 'Ministry of Finance',
      categoryName: 'Women & Child Welfare'
    },
    'national-post-matric-scholarship': {
      name: 'Post-Matric Scholarship for SC/ST/OBC Students',
      shortDescription: 'Centrally sponsored financial assistance scheme covering full tuition fees, non-refundable compulsory charges, and monthly maintenance allowance.',
      keyBenefit: '100% tuition fee reimbursement + up to ₹13,500/yr maintenance allowance',
      department: 'Department of Social Justice & Empowerment',
      ministry: 'Ministry of Social Justice & Empowerment',
      categoryName: 'Education & Scholarships'
    },
    'pm-mudra-yojana': {
      name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
      shortDescription: 'Collateral-free institutional micro-credit up to ₹10 Lakhs for micro and small enterprises across Shishu, Kishor, and Tarun categories.',
      keyBenefit: 'Zero-collateral business loans up to ₹10 Lakhs with subsidized interest',
      department: 'Department of Financial Services',
      ministry: 'Ministry of Finance',
      categoryName: 'Business & Entrepreneurship'
    },
    'pm-svanidhi-scheme': {
      name: 'PM Street Vendor\'s AtmaNirbhar Nidhi (PM SVANidhi)',
      shortDescription: 'Special micro-credit facility providing affordable working capital loans to urban street vendors to resume their livelihoods.',
      keyBenefit: 'Collateral-free working capital loan starting at ₹10,000 with 7% interest subsidy',
      department: 'Ministry of Housing and Urban Affairs',
      ministry: 'Ministry of Housing & Urban Affairs',
      categoryName: 'Employment & Skills'
    },
    'pm-awas-yojana-gramin': {
      name: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
      shortDescription: 'Financial assistance to rural houseless and kutcha householders to build pucca houses with clean cooking, toilet, and electricity connections.',
      keyBenefit: '₹1.20 Lakh assistance (Plains) / ₹1.30 Lakh (Hills) + 90 days MGNREGA wages',
      department: 'Department of Rural Development',
      ministry: 'Ministry of Rural Development',
      categoryName: 'Housing & Shelter'
    },
    'atal-pension-yojana': {
      name: 'Atal Pension Yojana (APY)',
      shortDescription: 'Guaranteed pension scheme administered by PFRDA targeting unorganized sector workers with lifetime monthly payout upon reaching age 60.',
      keyBenefit: 'Guaranteed lifetime monthly pension of ₹1,000 to ₹5,000 after age 60',
      department: 'Pension Fund Regulatory and Development Authority',
      ministry: 'Ministry of Finance',
      categoryName: 'Social Security & Pension'
    },
    'naps-apprenticeship': {
      name: 'National Apprenticeship Promotion Scheme (NAPS)',
      shortDescription: 'Financial incentive program by the Central Government promoting industry apprenticeship with monthly stipend co-funding.',
      keyBenefit: 'Direct monthly stipend sharing (25% up to ₹1,500/month) + recognized national certificate',
      department: 'Ministry of Skill Development & Entrepreneurship',
      ministry: 'Ministry of Skill Development & Entrepreneurship',
      categoryName: 'Employment & Skills'
    },
    'pm-matru-vandana-yojana': {
      name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
      shortDescription: 'Direct benefit transfer maternity benefit providing partial cash compensation for wage loss and maternal health encouragement.',
      keyBenefit: '₹5,000 cash incentive in direct installments for first live birth',
      department: 'Ministry of Women & Child Development',
      ministry: 'Ministry of Women & Child Development',
      categoryName: 'Women & Child Welfare'
    },
    'kmut-tamilnadu': {
      name: 'Kalaignar Magalir Urimai Thittam (KMUT)',
      shortDescription: 'Pioneering basic income security scheme recognizing women\'s unpaid labor by providing ₹1,000 every month directly to female heads of families.',
      keyBenefit: '₹1,000 every month directly deposited to bank account (₹12,000/year)',
      department: 'Special Programme Implementation Department',
      ministry: 'Government of Tamil Nadu',
      categoryName: 'Social Security & Pension'
    },
    'pudhumai-penn-tamilnadu': {
      name: 'Pudhumai Penn Scheme (Higher Education Assurance)',
      shortDescription: 'Financial assistance of ₹1,000 per month to female students who studied classes 6 to 12 in government schools to pursue higher education.',
      keyBenefit: '₹1,000/month DBT until completion of bachelor degree/diploma',
      department: 'Social Welfare & Women Empowerment Department',
      ministry: 'Government of Tamil Nadu',
      categoryName: 'Education & Scholarships'
    }
  },
  ta: {
    'pm-kisan-2024': {
      name: 'பிரதமர் கிசான் சம்மான் நிதி (PM-KISAN)',
      shortDescription: 'விவசாய குடும்பங்களுக்கு ஆண்டுக்கு ₹6,000 நேரடி வங்கி நிதி உதவி (தலா ₹2,000 வீதம் 3 தவணைகள்).',
      keyBenefit: 'ஆண்டுக்கு ₹6,000 வங்கி கணக்கில் நேரடி நிதி உதவி',
      department: 'வேளாண்மை மற்றும் உழவர் நலத்துறை',
      ministry: 'மத்திய வேளாண் அமைச்சகம்',
      categoryName: 'விவசாயம் & கிராமப்புறம்'
    },
    'pm-jay-ayushman': {
      name: 'ஆயுஷ்மான் பாரத் - பிரதம மந்திரி ஜன் ஆரோக்கிய திட்டம் (PM-JAY)',
      shortDescription: 'குடும்பத்திற்கு ஆண்டுக்கு ₹5 லட்சம் வரை கட்டணமில்லா மருத்துவமனை சிகிச்சை காப்பீடு.',
      keyBenefit: 'ஆண்டுக்கு ₹5,00,000 இலவச மருத்துவமனை சிகிச்சை காப்பீடு',
      department: 'தேசிய சுகாதார ஆணையம் (NHA)',
      ministry: 'சுகாதாரம் மற்றும் குடும்ப நல அமைச்சகம்',
      categoryName: 'மருத்துவம் & நல்வாழ்வு'
    },
    'sukanya-samriddhi-yojana': {
      name: 'செல்வமகள் சேமிப்பு திட்டம் (சுகன்யா சம்ரிதி)',
      shortDescription: 'பெண் குழந்தைகளின் கல்வி மற்றும் திருமணத்திற்காக 8.2% அதிக வட்டி தரும் வரிவிலக்கு அரசு சேமிப்பு திட்டம்.',
      keyBenefit: '8.2% அதிக அரசு வட்டி மற்றும் 80C முழு வரி விலக்கு',
      department: 'அஞ்சல் துறை / நிதி சேவைகள்',
      ministry: 'மத்திய நிதி அமைச்சகம்',
      categoryName: 'பெண்கள் & குழந்தைகள் நலன்'
    },
    'national-post-matric-scholarship': {
      name: 'பிற்படுத்தப்பட்ட மற்றும் தாழ்த்தப்பட்ட மாணவர்களுக்கான போஸ்ட்-மெட்ரிக் கல்வி உதவித்தொகை',
      shortDescription: '11 ஆம் வகுப்பு முதல் கல்லூரி வரை முழு கல்வி கட்டண திருப்பிளிப்பு மற்றும் மாதாந்திர பராமரிப்பு உதவித்தொகை.',
      keyBenefit: '100% கல்விக் கட்டண விலக்கு + ஆண்டுக்கு ₹13,500 வரை பராமரிப்பு உதவி',
      department: 'சமூக நீதி மற்றும் அதிகாரமளித்தல் துறை',
      ministry: 'சமூக நீதி அமைச்சகம்',
      categoryName: 'கல்வி & உதவித்தொகை'
    },
    'pm-mudra-yojana': {
      name: 'பிரதமர் முத்ரா கடன் திட்டம் (PMMY)',
      shortDescription: 'சிறு மற்றும் குறு தொழில் தொடங்க பிணையில்லா வங்கி கடன் ₹10 லட்சம் வரை (சிஷு, கிஷோர், தருண் கடன்கள்).',
      keyBenefit: 'பிணையில்லா தொழில் கடன் ₹10 லட்சம் வரை குறைந்த வட்டியில்',
      department: 'நிதி சேவைகள் துறை',
      ministry: 'மத்திய நிதி அமைச்சகம்',
      categoryName: 'வணிகம் & தொழில்முனைவு'
    },
    'pm-svanidhi-scheme': {
      name: 'பிரதமர் ஸ்வநிதி சாலையோர வியாபாரிகள் கடன் திட்டம்',
      shortDescription: 'நகர்ப்புற சாலையோர வியாபாரிகளுக்கு ஆரம்ப மூலதனமாக ₹10,000 முதல் ₹50,000 வரை பிணையில்லா நடைமுறை மூலதன கடன்.',
      keyBenefit: 'பிணையில்லா வியாபார கடன் ₹10,000 முதல் 7% வட்டி மானியத்துடன்',
      department: 'வீட்டுவசதி மற்றும் நகர்ப்புற விவகாரங்கள் அமைச்சகம்',
      ministry: 'மத்திய நகர்ப்புற விவகார அமைச்சகம்',
      categoryName: 'வேலைவாய்ப்பு & திறன்கள்'
    },
    'pm-awas-yojana-gramin': {
      name: 'பிரதமர் ஊரக குடியிருப்பு திட்டம் (PMAY-G)',
      shortDescription: 'கிராமப்புற ஏழைகள் சொந்தமாக கான்கிரீட் வீடு கட்டிக்கொள்ள அரசு வழங்கும் ₹1.20 லட்சம் நேரடி மானியம்.',
      keyBenefit: 'வீடு கட்ட ₹1.20 லட்சம் மானியம் + 90 நாட்கள் MGNREGA வேலை ஊதியம்',
      department: 'ஊரக வளர்ச்சித் துறை',
      ministry: 'மத்திய ஊரக வளர்ச்சி அமைச்சகம்',
      categoryName: 'வீட்டுவசதி & இருப்பிடம்'
    },
    'atal-pension-yojana': {
      name: 'அடல் பென்ஷன் திட்டம் (APY)',
      shortDescription: 'அமைப்புசாரா தொழிலாளர்களுக்கு 60 வயதிற்குப் பின் வாழ்நாள் முழுவதும் மாதம் ₹1,000 முதல் ₹5,000 வரை உத்தரவாத ஓய்வூதியம்.',
      keyBenefit: '60 வயதுக்கு பின் வாழ்நாள் முழுவதும் மாதம் ₹1,000 - ₹5,000 வரை அரசு ஓய்வூதியம்',
      department: 'ஓய்வூதிய நிதி ஒழுங்குமுறை ஆணையம் (PFRDA)',
      ministry: 'மத்திய நிதி அமைச்சகம்',
      categoryName: 'சமூக பாதுகாப்பு & ஓய்வூதியம்'
    },
    'naps-apprenticeship': {
      name: 'தேசிய தொழிற்பழகுநர் ஊக்குவிப்பு திட்டம் (NAPS)',
      shortDescription: 'இளைஞர்களுக்கு தொழில் நிறுவனங்களில் நேரடி பயிற்சி மற்றும் மத்திய அரசின் மாதாந்திர உதவித்தொகை பகிர்வு.',
      keyBenefit: 'மாதாந்திர உதவித்தொகையில் 25% (₹1,500 வரை) அரசு பங்களிப்பு + தேசிய சான்றிதழ்',
      department: 'திறன் மேம்பாடு மற்றும் தொழில்முனைவு அமைச்சகம்',
      ministry: 'மத்திய திறன் மேம்பாட்டு அமைச்சகம்',
      categoryName: 'வேலைவாய்ப்பு & திறன்கள்'
    },
    'pm-matru-vandana-yojana': {
      name: 'பிரதமர் மாத்ரு வந்தனா திட்டம் (PMMVY)',
      shortDescription: 'கர்ப்பிணிப் பெண்களுக்கு ஊட்டச்சத்து மற்றும் மருத்துவ சிகிச்சைக்காக ₹5,000 நேரடி பண உதவி.',
      keyBenefit: 'முதல் பிரசவத்திற்கு ₹5,000 நேரடி வங்கி நிதி உதவி',
      department: 'பெண்கள் மற்றும் குழந்தைகள் மேம்பாட்டு அமைச்சகம்',
      ministry: 'மத்திய பெண்கள் & குழந்தைகள் நல அமைச்சகம்',
      categoryName: 'பெண்கள் & குழந்தைகள் நலன்'
    },
    'kmut-tamilnadu': {
      name: 'கலைஞர் மகளிர் உரிமைத் திட்டம் (KMUT)',
      shortDescription: 'குடும்பத்தலைவிகளின் உழைப்பை அங்கீகரித்து தமிழ்நாடு அரசு வழங்கும் மாதம் ₹1,000 வாழ்வாதார உதவித் தொகை.',
      keyBenefit: 'மாதம் ₹1,000 வங்கிக் கணக்கில் நேரடி வரவு (ஆண்டுக்கு ₹12,000)',
      department: 'சிறப்பு திட்ட செயலாக்கத் துறை',
      ministry: 'தமிழ்நாடு அரசு',
      categoryName: 'சமூக பாதுகாப்பு & ஓய்வூதியம்'
    },
    'pudhumai-penn-tamilnadu': {
      name: 'புதுமைப் பெண் திட்டம் (மூவலூர் ராமாமிர்தம் உயர்கல்வி உறுதித் திட்டம்)',
      shortDescription: 'அரசுப் பள்ளிகளில் 6 முதல் 12 ஆம் வகுப்பு வரை படித்து கல்லூரி சேரும் மாணவிகளுக்கு மாதம் ₹1,000 கல்வி உதவித்தொகை.',
      keyBenefit: 'பட்டப்படிப்பு முடியும் வரை மாதம் ₹1,000 நேரடியாக வங்கிக் கணக்கில் வரவு',
      department: 'சமூக நலம் மற்றும் மகளிர் உரிமைத் துறை',
      ministry: 'தமிழ்நாடு அரசு',
      categoryName: 'கல்வி & உதவித்தொகை'
    }
  },
  hi: {
    'pm-kisan-2024': {
      name: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
      shortDescription: 'देश के सभी भूधारक किसान परिवारों को प्रति वर्ष ₹6,000 की वित्तीय सहायता तीन समान किस्तों में बैंक खाते में भेजी जाती है।',
      keyBenefit: '₹6,000 प्रति वर्ष 3 किस्तों में सीधे बैंक खाते में (डीबीटी)',
      department: 'कृषि एवं किसान कल्याण विभाग',
      ministry: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार',
      categoryName: 'कृषि एवं ग्रामीण'
    },
    'pm-jay-ayushman': {
      name: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (PM-JAY)',
      shortDescription: 'गरीब और कमजोर परिवारों को द्वितीयक और तृतीयक देखभाल के लिए प्रति परिवार प्रति वर्ष ₹5 लाख तक का मुफ्त इलाज।',
      keyBenefit: 'प्रति परिवार प्रति वर्ष ₹5,00,000 का मुफ्त अस्पताल इलाज',
      department: 'राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA)',
      ministry: 'स्वास्थ्य एवं परिवार कल्याण मंत्रालय',
      categoryName: 'स्वास्थ्य एवं परिवार कल्याण'
    },
    'sukanya-samriddhi-yojana': {
      name: 'सुकन्या समृद्धि योजना (SSY)',
      shortDescription: 'बालिकाओं के उज्ज्वल भविष्य, उच्च शिक्षा एवं विवाह के लिए 8.2% उच्चतम ब्याज एवं कर-मुक्त सरकारी बचत योजना।',
      keyBenefit: '8.2% सरकारी ब्याज दर और धारा 80C के तहत पूरी टैक्स छूट',
      department: 'डाक विभाग / वित्तीय सेवाएं',
      ministry: 'वित्त मंत्रालय, भारत सरकार',
      categoryName: 'महिला एवं बाल विकास'
    },
    'national-post-matric-scholarship': {
      name: 'एससी/एसटी/ओबीसी छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति',
      shortDescription: 'कक्षा 11 से स्नातकोत्तर तक की पढ़ाई के लिए पूरी ट्यूशन फीस प्रतिपूर्ति और मासिक रखरखाव भत्ता।',
      keyBenefit: '100% ट्यूशन फीस वापसी + ₹13,500 तक वार्षिक रखरखाव भत्ता',
      department: 'सामाजिक न्याय एवं अधिकारिता विभाग',
      ministry: 'सामाजिक न्याय एवं अधिकारिता मंत्रालय',
      categoryName: 'शिक्षा एवं छात्रवृत्ति'
    },
    'pm-mudra-yojana': {
      name: 'प्रधानमंत्री मुद्रा योजना (PMMY)',
      shortDescription: 'सूक्ष्म एवं छोटे उद्यमों को बिना किसी गारंटी के ₹10 लाख तक का ऋण (शिशु, किशोर, तरुण)।',
      keyBenefit: 'बिना गारंटी ₹10 लाख तक का व्यावसायिक ऋण कम ब्याज पर',
      department: 'वित्तीय सेवाएं विभाग',
      ministry: 'वित्त मंत्रालय, भारत सरकार',
      categoryName: 'व्यापार एवं उद्यमिता'
    },
    'pm-svanidhi-scheme': {
      name: 'पीएम स्ट्रीट वेंडर्स आत्मनिर्भर निधि (पीएम स्वनिधि)',
      shortDescription: 'शहरी रेहड़ी-पटरी वालों को अपना व्यवसाय पुनः शुरू करने के लिए ₹10,000 से ₹50,000 तक की कार्यशील पूंजी ऋण।',
      keyBenefit: 'बिना गारंटी ₹10,000 का कार्यशील पूंजी ऋण और 7% ब्याज सब्सिडी',
      department: 'आवासन और शहरी कार्य मंत्रालय',
      ministry: 'आवासन एवं शहरी कार्य मंत्रालय',
      categoryName: 'रोजगार एवं कौशल'
    },
    'pm-awas-yojana-gramin': {
      name: 'प्रधानमंत्री आवास योजना - ग्रामीण (PMAY-G)',
      shortDescription: 'ग्रामीण बेघर और कच्चे घरों में रहने वाले परिवारों को पक्का मकान बनाने के लिए ₹1.20 लाख की सहायता राशि।',
      keyBenefit: 'पक्का मकान बनाने के लिए ₹1.20 लाख अनुदान + 90 दिन मनरेगा मजदूरी',
      department: 'ग्रामीण विकास विभाग',
      ministry: 'ग्रामीण विकास मंत्रालय, भारत सरकार',
      categoryName: 'आवास एवं आश्रय'
    },
    'atal-pension-yojana': {
      name: 'अटल पेंशन योजना (APY)',
      shortDescription: 'असंगठित क्षेत्र के श्रमिकों को 60 वर्ष की आयु के बाद ₹1,000 से ₹5,000 तक की आजीवन मासिक गारंटीकृत पेंशन।',
      keyBenefit: '60 वर्ष की आयु के बाद ₹1,000 से ₹5,000 तक आजीवन मासिक पेंशन',
      department: 'पेंशन निधि विनियामक और विकास प्राधिकरण (PFRDA)',
      ministry: 'वित्त मंत्रालय, भारत सरकार',
      categoryName: 'सामाजिक सुरक्षा एवं पेंशन'
    },
    'naps-apprenticeship': {
      name: 'राष्ट्रीय शिक्षुता संवर्धन योजना (NAPS)',
      shortDescription: 'उद्योगों में युवाओं को व्यावहारिक प्रशिक्षण तथा सरकार द्वारा मासिक वजीफे में वित्तीय अंशदान।',
      keyBenefit: 'मासिक स्टाइपेंड का 25% (₹1,500 तक) सरकारी योगदान + राष्ट्रीय प्रमाणपत्र',
      department: 'कौशल विकास एवं उद्यमिता मंत्रालय',
      ministry: 'कौशल विकास एवं उद्यमिता मंत्रालय',
      categoryName: 'रोजगार एवं कौशल'
    },
    'pm-matru-vandana-yojana': {
      name: 'प्रधानमंत्री मातृ वंदना योजना (PMMVY)',
      shortDescription: 'गर्भवती महिलाओं और स्तनपान कराने वाली माताओं को पोषण और स्वास्थ्य सुरक्षा के लिए ₹5,000 की नकद सहायता।',
      keyBenefit: 'पहले जीवित बच्चे के जन्म पर ₹5,000 की नकद सहायता (डीबीटी)',
      department: 'महिला एवं बाल विकास मंत्रालय',
      ministry: 'महिला एवं बाल विकास मंत्रालय',
      categoryName: 'महिला एवं बाल विकास'
    },
    'kmut-tamilnadu': {
      name: 'कलैग्नार महिला अधिकार योजना (KMUT)',
      shortDescription: 'महिला मुखियाओं के गृह-श्रम को सम्मान देते हुए तमिलनाडु सरकार द्वारा प्रति माह ₹1,000 की बुनियादी आय सहायता।',
      keyBenefit: 'प्रति माह ₹1,000 सीधे बैंक खाते में (वार्षिक ₹12,000)',
      department: 'विशेष कार्यक्रम कार्यान्वयन विभाग',
      ministry: 'तमिलनाडु सरकार',
      categoryName: 'सामाजिक सुरक्षा एवं पेंशन'
    },
    'pudhumai-penn-tamilnadu': {
      name: 'पुधुमई पेन योजना (उच्च शिक्षा प्रोत्साहन)',
      shortDescription: 'सरकारी स्कूलों में कक्षा 6 से 12 तक पढ़ने वाली छात्राओं को कॉलेज में प्रवेश लेने पर ₹1,000 प्रति माह प्रोत्साहन।',
      keyBenefit: 'स्नातक की पढ़ाई पूरी होने तक ₹1,000 प्रति माह सीधे बैंक खाते में',
      department: 'समाज कल्याण एवं महिला अधिकारिता विभाग',
      ministry: 'तमिलनाडु सरकार',
      categoryName: 'शिक्षा एवं छात्रवृत्ति'
    }
  },
  te: {
    'pm-kisan-2024': {
      name: 'ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి (PM-KISAN)',
      shortDescription: 'రైతు కుటుంబాలకు ప్రతి సంవత్సరం ₹6,000 ఆర్థిక సహాయం నేరుగా బ్యాంక్ ఖాతాలో జమ (3 విడతల్లో).',
      keyBenefit: 'సంవత్సరానికి ₹6,000 బ్యాంక్ ఖాతాలో జమ (డీబీటీ పద్ధతిలో)',
      department: 'వ్యవసాయ మరియు రైతు సంక్షేమ శాఖ',
      ministry: 'వ్యవసాయ మరియు రైతు సంక్షేమ మంత్రిత్వ శాఖ',
      categoryName: 'వ్యవసాయం & గ్రామీణాభివృద్ధి'
    },
    'pm-jay-ayushman': {
      name: 'ఆయుష్మాన్ భారత్ - పీఎం-జేఏవై (PM-JAY)',
      shortDescription: 'పేద మరియు మధ్యతరగతి కుటుంబాలకు ప్రతి సంవత్సరం కుటుంబానికి ₹5 లక్షల వరకు ఉచిత ఆసుపత్రి చికిత్స.',
      keyBenefit: 'కుటుంబానికి ఏడాదికి ₹5,00,000 ఉచిత ఆరోగ్య బీమా కవరేజ్',
      department: 'నేషనల్ హెల్త్ అథారిటీ (NHA)',
      ministry: 'ఆరోగ్య మరియు కుటుంబ సంక్షేమ మంత్రిత్వ శాఖ',
      categoryName: 'ఆరోగ్యం & సంక్షేమం'
    },
    'sukanya-samriddhi-yojana': {
      name: 'సుకున్య సమృద్ధి యోజన (SSY)',
      shortDescription: 'బాలికల భవిష్యత్తు, ఉన్నత విద్య మరియు వివాహం కోసం అత్యధిక వడ్డీ (8.2%) మరియు పన్ను మినహాయింపు పథకం.',
      keyBenefit: '8.2% అధిక వడ్డీ మరియు సెక్షన్ 80C కింద పూర్తి పన్ను మినహాయింపు',
      department: 'తపాలా శాఖ / ఆర్థిక సేవలు',
      ministry: 'ఆర్థిక మంత్రిత్వ శాఖ',
      categoryName: 'మహిళా & శిశు సంక్షేమం'
    },
    'national-post-matric-scholarship': {
      name: 'ఎస్సీ/ఎస్టీ/ఓబీసీ విద్యార్థులకు పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్',
      shortDescription: '11వ తరగతి నుండి పీజీ వరకు పూర్తి ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్ మరియు నెలవారీ నిర్వహణ భత్యం.',
      keyBenefit: '100% ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్ + ఏడాదికి ₹13,500 వరకు మెయింటెనెన్స్ అలవెన్స్',
      department: 'సామాజిక న్యాయం మరియు సాధికారత శాఖ',
      ministry: 'సామాజిక న్యాయ మంత్రిత్వ శాఖ',
      categoryName: 'విద్య & స్కాలర్‌షిప్‌లు'
    },
    'pm-mudra-yojana': {
      name: 'ప్రధాన మంత్రి ముద్ర యోజన (PMMY)',
      shortDescription: 'చిన్న మరియు మధ్యతరహా వ్యాపారులకు ఎటువంటి పూచీకత్తు లేకుండా ₹10 లక్షల వరకు తక్కువ వడ్డీ రుణాలు.',
      keyBenefit: 'పూచీకత్తు లేని వ్యాపార రుణం ₹10 లక్షల వరకు',
      department: 'ఆర్థిక సేవల శాఖ',
      ministry: 'కేంద్ర ఆర్థిక మంత్రిత్వ శాఖ',
      categoryName: 'వ్యాపారం & వ్యవస్థాపకత'
    },
    'pm-svanidhi-scheme': {
      name: 'పీఎం స్వనిధి వీధి వ్యాపారుల రుణ పథకం',
      shortDescription: 'పట్టణ వీధి వ్యాపారులకు ₹10,000 నుండి ₹50,000 వరకు వ్యాపార నిర్వహణ రుణం మరియు 7% వడ్డీ రాయితీ.',
      keyBenefit: '₹10,000 వ్యాపార రుణం మరియు 7% వడ్డీ రాయితీ',
      department: 'గృహనిర్మాణం మరియు పట్టణ వ్యవహారాల మంత్రిత్వ శాఖ',
      ministry: 'పట్టణ వ్యవహారాల మంత్రిత్వ శాఖ',
      categoryName: 'ఉపాధి & నైపుణ్యాలు'
    },
    'pm-awas-yojana-gramin': {
      name: 'ప్రధాన మంత్రి ఆవాస్ యోజన - గ్రామీణ్ (PMAY-G)',
      shortDescription: 'గ్రామీణ ప్రాంతాల్లో ఇళ్లు లేని పేదలకు పక్కా ఇల్లు నిర్మించుకోవడానికి ₹1.20 లక్షల ఆర్థిక సహాయం.',
      keyBenefit: 'ఇంటి నిర్మాణానికి ₹1.20 లక్షల సహాయం + 90 రోజుల ఉపాధి హామీ వేతనం',
      department: 'గ్రామీణాభివృద్ధి శాఖ',
      ministry: 'గ్రామీణాభివృద్ధి మంత్రిత్వ శాఖ',
      categoryName: 'గృహనిర్మాణం & వసతి'
    },
    'atal-pension-yojana': {
      name: 'అటల్ పెన్షన్ యోజన (APY)',
      shortDescription: 'అసంఘటిత రంగ కార్మికులకు 60 ఏళ్ల తర్వాత నెలకు ₹1,000 నుండి ₹5,000 వరకు జీవితాంతం పెన్షన్ భరోసా.',
      keyBenefit: '60 ఏళ్లు దాటిన తర్వాత నెలకు ₹1,000 నుండి ₹5,000 వరకు జీవితాంతం పెన్షన్',
      department: 'పెన్షన్ ఫండ్ రెగ్యులేటరీ అండ్ డెవలప్‌మెంట్ అథారిటీ (PFRDA)',
      ministry: 'ఆర్థిక మంత్రిత్వ శాఖ',
      categoryName: 'సామాజిక భద్రత & పెన్షన్'
    },
    'naps-apprenticeship': {
      name: 'నేషనల్ అప్రెంటిస్‌షిప్ ప్రమోషన్ స్కీమ్ (NAPS)',
      shortDescription: 'యువతకు పరిశ్రమల్లో ప్రత్యక్ష శిక్షణ మరియు నెలవారీ స్టైపెండ్‌లో ప్రభుత్వ ఆర్థిక సహకారం.',
      keyBenefit: 'నెలవారీ స్టైపెండ్‌లో 25% (₹1,500 వరకు) ప్రభుత్వ వాటా + జాతీయ గుర్తింపు సర్టిఫికెట్',
      department: 'నైపుణ్యాభివృద్ధి మరియు వ్యవస్థాపకత మంత్రిత్వ శాఖ',
      ministry: 'నైపుణ్యాభివృద్ధి మంత్రిత్వ శాఖ',
      categoryName: 'ఉపాధి & నైపుణ్యాలు'
    },
    'pm-matru-vandana-yojana': {
      name: 'ప్రధాన మంత్రి మాతృ వందన యోజన (PMMVY)',
      shortDescription: 'గర్భిణీ స్త్రీలకు మరియు బాలింతలకు పౌష్టికాహారం మరియు ఆరోగ్య సంరక్షణ కోసం ₹5,000 నగదు ప్రోత్సాహకం.',
      keyBenefit: 'మొదటి కాన్పుకు ₹5,000 నగదు సాయం బ్యాంక్ ఖాతాలో జమ',
      department: 'మహిళా మరియు శిశు అభివృద్ధి మంత్రిత్వ శాఖ',
      ministry: 'మహిళా & శిశు అభివృద్ధి మంత్రిత్వ శాఖ',
      categoryName: 'మహిళా & శిశు సంక్షేమం'
    },
    'kmut-tamilnadu': {
      name: 'కలైంజ్ఞర్ మహిళా హక్కుల పథకం (KMUT)',
      shortDescription: 'గృహిణుల శ్రమను గుర్తిస్తూ తమిళనాడు ప్రభుత్వం అందించే నెలకు ₹1,000 ప్రాథమిక ఆదాయ సహాయం.',
      keyBenefit: 'నెలకు ₹1,000 బ్యాంక్ ఖాతాలో జమ (ఏడాదికి ₹12,000)',
      department: 'ప్రత్యేక పథకాల అమలు శాఖ',
      ministry: 'తమిళనాడు ప్రభుత్వం',
      categoryName: 'సామాజిక భద్రత & పెన్షన్'
    },
    'pudhumai-penn-tamilnadu': {
      name: 'పుదుమై పెణ్ పథకం (ఉన్నత విద్యా భరోసా)',
      shortDescription: 'ప్రభుత్వ పాఠశాలల్లో చదివి కళాశాలలో చేరిన విద్యార్థినులకు నెలకు ₹1,000 ప్రోత్సాహక సాయం.',
      keyBenefit: 'డిగ్రీ పూర్తయ్యే వరకు నెలకు ₹1,000 బ్యాంక్ ఖాతాలో జమ',
      department: 'సాంఘిక సంక్షేమ శాఖ',
      ministry: 'తమిళనాడు ప్రభుత్వం',
      categoryName: 'విద్య & స్కాలర్‌షిప్‌లు'
    }
  },
  kn: {
    'pm-kisan-2024': {
      name: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ (PM-KISAN)',
      shortDescription: 'ದೇಶದ ರೈತ ಕುಟುಂಬಗಳಿಗೆ ವಾರ್ಷಿಕ ₹6,000 ಆರ್ಥಿಕ ನೆರವನ್ನು ಮೂರು ಸಮಾನ ಕಂತುಗಳಲ್ಲಿ ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ ಮಾಡಲಾಗುತ್ತದೆ.',
      keyBenefit: 'ವರ್ಷಕ್ಕೆ ₹6,000 ನೇರ ನಗದು ವರ್ಗಾವಣೆ (DBT ಮೂಲಕ 3 ಕಂತುಗಳಲ್ಲಿ)',
      department: 'ಕೃಷಿ ಮತ್ತು ರೈತರ ಕಲ್ಯಾಣ ಇಲಾಖೆ',
      ministry: 'ಕೃಷಿ ಮತ್ತು ರೈತರ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ',
      categoryName: 'ಕೃಷಿ & ಗ್ರಾಮೀಣ ಅಭಿವೃದ್ಧಿ'
    },
    'pm-jay-ayushman': {
      name: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ - ಪ್ರಧಾನ ಮಂತ್ರಿ ಜನ ಆರೋಗ್ಯ ಯೋಜನೆ (PM-JAY)',
      shortDescription: 'ಬಡ ಮತ್ತು ದುರ್ಬಲ ಕುಟುಂಬಗಳಿಗೆ ಪ್ರತಿ ವರ್ಷ ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೆ ₹5 ಲಕ್ಷದವರೆಗೆ ಉಚಿತ ಆಸ್ಪತ್ರೆ ಚಿಕಿತ್ಸಾ ವಿಮೆ.',
      keyBenefit: 'ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೆ ವಾರ್ಷಿಕ ₹5,00,000 ವರೆಗೆ ಉಚಿತ ಚಿಕಿತ್ಸೆ',
      department: 'ರಾಷ್ಟ್ರೀಯ ಆರೋಗ್ಯ ಪ್ರಾಧಿಕಾರ (NHA)',
      ministry: 'ಆರೋಗ್ಯ ಮತ್ತು ಕುಟುಂಬ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ',
      categoryName: 'ಆರೋಗ್ಯ & ಚಿಕಿತ್ಸೆ'
    },
    'sukanya-samriddhi-yojana': {
      name: 'ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿ ಯೋಜನೆ (SSY)',
      shortDescription: 'ಹೆಣ್ಣು ಮಕ್ಕಳ ಉಜ್ವಲ ಭವಿಷ್ಯ, ಉನ್ನತ ಶಿಕ್ಷಣ ಮತ್ತು ವಿವಾಹಕ್ಕಾಗಿ ಶೇ 8.2 ರಷ್ಟು ಗರಿಷ್ಠ ಬಡ್ಡಿದರ ಮತ್ತು ಪೂರ್ಣ ತೆರಿಗೆ ವಿನಾಯಿತಿ ಇರುವ ಉಳಿತಾಯ ಯೋಜನೆ.',
      keyBenefit: '8.2% ಗರಿಷ್ಠ ಬಡ್ಡಿದರ ಮತ್ತು 80C ಅಡಿಯಲ್ಲಿ ಸಂಪೂರ್ಣ ತೆರಿಗೆ ವಿನಾಯಿತಿ',
      department: 'ಅಂಚೆ ಇಲಾಖೆ / ಹಣಕಾಸು ಸೇವೆಗಳು',
      ministry: 'ಹಣಕಾಸು ಸಚಿವಾಲಯ',
      categoryName: 'ಮಹಿಳಾ & ಮಕ್ಕಳ ಕಲ್ಯಾಣ'
    },
    'national-post-matric-scholarship': {
      name: 'ಪರಿಶಿಷ್ಟ ಜಾತಿ / ಪಂಗಡ / ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನ',
      shortDescription: '11 ನೇ ತರಗತಿಯಿಂದ ಉನ್ನತ ವ್ಯಾಸಂಗದವರೆಗೆ ಪೂರ್ಣ ಬೋಧನಾ ಶುಲ್ಕ ಮರುಪಾವತಿ ಮತ್ತು ಮಾಸಿಕ ನಿರ್ವಹಣಾ ಭತ್ಯೆ.',
      keyBenefit: '100% ಕಾಲೇಜು ಶುಲ್ಕ ಮರುಪಾವತಿ + ವಾರ್ಷಿಕ ₹13,500 ವರೆಗೆ ನಿರ್ವಹಣಾ ಭತ್ಯೆ',
      department: 'ಸಾಮಾಜಿಕ ನ್ಯಾಯ ಮತ್ತು ಸಬಲೀಕರಣ ಇಲಾಖೆ',
      ministry: 'ಸಾಮಾಜಿಕ ನ್ಯಾಯ ಮತ್ತು ಸಬಲೀಕರಣ ಸಚಿವಾಲಯ',
      categoryName: 'ಶಿಕ್ಷಣ & ವಿದ್ಯಾರ್ಥಿವೇತನ'
    },
    'pm-mudra-yojana': {
      name: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಮುದ್ರಾ ಯೋಜನೆ (PMMY)',
      shortDescription: 'ಸಣ್ಣ ಮತ್ತು ಅತಿಸಣ್ಣ ಉದ್ಯಮಿಗಳಿಗೆ ಯಾವುದೇ ಮೇಲಾಧಾರವಿಲ್ಲದೆ ₹10 ಲಕ್ಷದವರೆಗೆ ಸಾಲ ಸೌಲಭ್ಯ.',
      keyBenefit: 'ಯಾವುದೇ ಆಸ್ತಿ ಅಡಮಾನವಿಲ್ಲದೆ ₹10 ಲಕ್ಷದವರೆಗೆ ಕಡಿಮೆ ಬಡ್ಡಿಯಲ್ಲಿ ಸಾಲ',
      department: 'ಹಣಕಾಸು ಸೇವೆಗಳ ಇಲಾಖೆ',
      ministry: 'ಹಣಕಾಸು ಸಚಿವಾಲಯ',
      categoryName: 'ವ್ಯಾಪಾರ & ಉದ್ಯಮಶೀಲತೆ'
    },
    'pm-svanidhi-scheme': {
      name: 'ಪಿಎಂ ಬೀದಿ ವ್ಯಾಪಾರಿಗಳ ಸ್ವನಿಧಿ ಯೋಜನೆ (PM SVANidhi)',
      shortDescription: 'ನಗರ ಪ್ರದೇಶದ ಬೀದಿಬದಿ ವ್ಯಾಪಾರಿಗಳಿಗೆ ತಮ್ಮ ವ್ಯಾಪಾರ ಪುನರಾರಂಭಿಸಲು ₹10,000 ದಿಂದ ₹50,000 ವರೆಗೆ ಸುಲಭ ಬಡ್ಡಿಯ ಸಾಲ.',
      keyBenefit: '₹10,000 ಆರಂಭಿಕ ಬಂಡವಾಳ ಸಾಲ ಮತ್ತು ಶೇ 7 ರಷ್ಟು ಬಡ್ಡಿ ಸಹಾಯಧನ',
      department: 'ವಸತಿ ಮತ್ತು ನಗರ ವ್ಯವಹಾರಗಳ ಸಚಿವಾಲಯ',
      ministry: 'ವಸತಿ ಮತ್ತು ನಗರ ವ್ಯವಹಾರಗಳ ಸಚಿವಾಲಯ',
      categoryName: 'ಉದ್ಯೋಗ & ಕೌಶಲ್ಯ'
    },
    'pm-awas-yojana-gramin': {
      name: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಆವಾಸ್ ಯೋಜನೆ - ಗ್ರಾಮೀಣ (PMAY-G)',
      shortDescription: 'ಗ್ರಾಮೀಣ ಪ್ರದೇಶದ ವಸತಿ ರಹಿತ ಮತ್ತು ಕಚ್ಚಾ ಮನೆಯ ನಿವಾಸಿಗಳಿಗೆ ಪಕ್ಕಾ ಮನೆ ನಿರ್ಮಿಸಲು ₹1.20 ಲಕ್ಷ ನೇರ ಧನಸಹಾಯ.',
      keyBenefit: 'ಮನೆ ನಿರ್ಮಾಣಕ್ಕೆ ₹1.20 ಲಕ್ಷ ಸಹಾಯಧನ + 90 ದಿನಗಳ ನರೇಗಾ ವೇತನ',
      department: 'ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಇಲಾಖೆ',
      ministry: 'ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯ',
      categoryName: 'ವಸತಿ & ಆಶ್ರಯ'
    },
    'atal-pension-yojana': {
      name: 'ಅಟಲ್ ಪಿಂಚಣಿ ಯೋಜನೆ (APY)',
      shortDescription: 'ಅಸಂಘಟಿತ ವಲಯದ ಕಾರ್ಮಿಕರಿಗೆ 60 ವರ್ಷ ತುಂಬಿದ ನಂತರ ಜೀವಮಾನವಿಡೀ ಮಾಸಿಕ ₹1,000 ದಿಂದ ₹5,000 ವರೆಗೆ ಖಾತರಿಯ ಪಿಂಚಣಿ.',
      keyBenefit: '60 ವರ್ಷ ವಯಸ್ಸಿನ ನಂತರ ಜೀವಮಾನ ಪರ್ಯಂತ ಮಾಸಿಕ ₹1,000 - ₹5,000 ಪಿಂಚಣಿ',
      department: 'ಪಿಂಚಣಿ ನಿಧಿ ನಿಯಂತ್ರಣ ಮತ್ತು ಅಭಿವೃದ್ಧಿ ಪ್ರಾಧಿಕಾರ (PFRDA)',
      ministry: 'ಹಣಕಾಸು ಸಚಿವಾಲಯ',
      categoryName: 'ಸಾಮಾಜಿಕ ಭದ್ರತೆ & ಪಿಂಚಣಿ'
    },
    'naps-apprenticeship': {
      name: 'ರಾಷ್ಟ್ರೀಯ ಅಪ್ರೆಂಟಿಸ್‌ಶಿಪ್ ಪ್ರೋತ್ಸಾಹ ಯೋಜನೆ (NAPS)',
      shortDescription: 'ಯುವಜನರಿಗೆ ಕೈಗಾರಿಕೆಗಳಲ್ಲಿ ಪ್ರಾಯೋಗಿಕ ತರಬೇತಿ ಹಾಗೂ ಮಾಸಿಕ ಸ್ಟೈಪೆಂಡ್‌ಗೆ ಸರ್ಕಾರದ ಆರ್ಥಿಕ ಬೆಂಬಲ.',
      keyBenefit: 'ಮಾಸಿಕ ಸ್ಟೈಪೆಂಡ್‌ನಲ್ಲಿ 25% (₹1,500 ವರೆಗೆ) ಸರ್ಕಾರಿ ಪಾಲು + ರಾಷ್ಟ್ರೀಯ ಪ್ರಮಾಣಪತ್ರ',
      department: 'ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಉದ್ಯಮಶೀಲತೆ ಸಚಿವಾಲಯ',
      ministry: 'ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯ',
      categoryName: 'ಉದ್ಯೋಗ & ಕೌಶಲ್ಯ'
    },
    'pm-matru-vandana-yojana': {
      name: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಮಾತೃ ವಂದನಾ ಯೋಜನೆ (PMMVY)',
      shortDescription: 'ಗರ್ಭಿಣಿಯರಿಗೆ ಮತ್ತು ಹಾಲುಣಿಸುವ ತಾಯಂದಿರಿಗೆ ಪೌಷ್ಟಿಕಾಂಶ ಮತ್ತು ಆರೋಗ್ಯ ಸುರಕ್ಷತೆಗಾಗಿ ₹5,000 ನಗದು ನೆರವು.',
      keyBenefit: 'ಮೊದಲ ಮಗುವಿನ ಜನನಕ್ಕೆ ₹5,000 ನೇರ ನಗದು ಸಹಾಯ',
      department: 'ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಅಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯ',
      ministry: 'ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಅಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯ',
      categoryName: 'ಮಹಿಳಾ & ಮಕ್ಕಳ ಕಲ್ಯಾಣ'
    },
    'kmut-tamilnadu': {
      name: 'ಕಲೈಂಜರ್ ಮಹಿಳಾ ಹಕ್ಕು ಯೋಜನೆ (KMUT)',
      shortDescription: 'ಮಹಿಳೆಯರ ಗೃಹ ಶ್ರಮವನ್ನು ಗುರುತಿಸಿ ತಮಿಳುನಾಡು ಸರ್ಕಾರ ನೀಡುವ ಮಾಸಿಕ ₹1,000 ಮೂಲ ಆದಾಯ ಸಹಾಯಧನ.',
      keyBenefit: 'ಪ್ರತಿ ತಿಂಗಳು ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ₹1,000 ನೇರ ಜಮೆ (ವರ್ಷಕ್ಕೆ ₹12,000)',
      department: 'ವಿಶೇಷ ಕಾರ್ಯಕ್ರಮ ಅನುಷ್ಠಾನ ಇಲಾಖೆ',
      ministry: 'ತಮಿಳುನಾಡು ಸರ್ಕಾರ',
      categoryName: 'ಸಾಮಾಜಿಕ ಭದ್ರತೆ & ಪಿಂಚಣಿ'
    },
    'pudhumai-penn-tamilnadu': {
      name: 'ಪುದುಮೈ ಪೆಣ್ ಯೋಜನೆ (ಉನ್ನತ ಶಿಕ್ಷಣ ಭರವಸೆ)',
      shortDescription: 'ಸರ್ಕಾರಿ ಶಾಲೆಗಳಲ್ಲಿ 6 ರಿಂದ 12 ನೇ ತರಗತಿವರೆಗೆ ಓದಿ ಕಾಲೇಜು ಸೇರುವ ಹೆಣ್ಣುಮಕ್ಕಳಿಗೆ ತಿಂಗಳಿಗೆ ₹1,000 ಪ್ರೋತ್ಸಾಹಧನ.',
      keyBenefit: 'ಪದವಿ ಪೂರ್ಣಗೊಳ್ಳುವವರೆಗೆ ತಿಂಗಳಿಗೆ ₹1,000 ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರ ಜಮೆ',
      department: 'ಸಮಾಜ ಕಲ್ಯಾಣ ಮತ್ತು ಮಹಿಳಾ ಸಬಲೀಕರಣ ಇಲಾಖೆ',
      ministry: 'ತಮಿಳುನಾಡು ಸರ್ಕಾರ',
      categoryName: 'ಶಿಕ್ಷಣ & ವಿದ್ಯಾರ್ಥಿವೇತನ'
    }
  },
  ml: {
    'pm-kisan-2024': {
      name: 'പ്രധാനമന്ത്രി കിസാൻ സമ്മാൻ നിധി (PM-KISAN)',
      shortDescription: 'രാജ്യത്തെ കർഷക കുടുംബങ്ങൾക്ക് പ്രതിവർഷം ₹6,000 മൂന്ന് തുല്യ ഗഡുക്കളായി നേരിട്ട് ബാങ്ക് അക്കൗണ്ടിലേക്ക് നൽകുന്നു.',
      keyBenefit: 'പ്രതിവർഷം ₹6,000 നേരിട്ടുള്ള ബാങ്ക് കൈമാറ്റം (3 ഗഡുക്കളായി)',
      department: 'കൃഷി, കർഷക ക്ഷേമ വകുപ്പ്',
      ministry: 'കൃഷി, കർഷക ക്ഷേമ മന്ത്രാലയം',
      categoryName: 'കൃഷി & ഗ്രാമീണ വികസനം'
    },
    'pm-jay-ayushman': {
      name: 'ആയുഷ്മാൻ ഭാരത് - പിഎം-ജെഎവൈ (PM-JAY)',
      shortDescription: 'പാവപ്പെട്ട കുടുംബങ്ങൾക്ക് ആശുപത്രി ചികിത്സയ്ക്കായി പ്രതിവർഷം ₹5 ലക്ഷം രൂപയുടെ സൗജന്യ ആരോഗ്യ ഇൻഷുറൻസ്.',
      keyBenefit: 'കുടുംബത്തിന് പ്രതിവർഷം ₹5,00,000 വരെ സൗജന്യ ആശുപത്രി ചികിത്സ',
      department: 'നാഷണൽ ഹെൽത്ത് അതോറിറ്റി (NHA)',
      ministry: 'ആരോഗ്യ കുടുംബക്ഷേമ മന്ത്രാലയം',
      categoryName: 'ആരോഗ്യം & സുഖജീവിതം'
    },
    'sukanya-samriddhi-yojana': {
      name: 'സുകന്യ സമൃദ്ധി യോജന (SSY)',
      shortDescription: 'പെൺകുട്ടികളുടെ ഉന്നത വിദ്യാഭ്യാസത്തിനും വിവാഹത്തിനുമായി 8.2% ഉയർന്ന പലിശയും പൂർണ്ണ നികുതിയിളവുമുള്ള സമ്പാദ്യ പദ്ധതി.',
      keyBenefit: '8.2% ഉയർന്ന പലിശയും 80C പ്രകാരം പൂർണ്ണ നികുതിയിളവും',
      department: 'തപാൽ വകുപ്പ് / സാമ്പത്തിക സേവനങ്ങൾ',
      ministry: 'ധനകാര്യ മന്ത്രാലയം',
      categoryName: 'വനിതാ ശിശുക്ഷേമം'
    },
    'national-post-matric-scholarship': {
      name: 'പോസ്റ്റ് മെട്രിക് സ്കോളർഷിപ്പ് (എസ്.സി/എസ്.ടി/ഒ.ബി.സി)',
      shortDescription: 'പതിനൊന്നാം ക്ലാസ് മുതൽ ബിരുദാനന്തര ബിരുദം വരെ മുഴുവൻ ട്യൂഷൻ ഫീസ് റീഇംബേഴ്സ്മെന്റും പ്രതിമാസ മെയിന്റനൻസ് അലവൻസും.',
      keyBenefit: '100% ട്യൂഷൻ ഫീസ് തിരികെ നൽകൽ + പ്രതിവർഷം ₹13,500 വരെ അലവൻസ്',
      department: 'സാമൂഹിക നീതി ശാക്തീകരണ വകുപ്പ്',
      ministry: 'സാമൂഹിക നീതി മന്ത്രാലയം',
      categoryName: 'വിദ്യാഭ്യാസം & സ്കോളർഷിപ്പുകൾ'
    },
    'pm-mudra-yojana': {
      name: 'പ്രധാനമന്ത്രി മുദ്ര യോജന (PMMY)',
      shortDescription: 'ചെറുകിട സംരംഭകർക്ക് യാതൊരു ജാമ്യവുമില്ലാതെ ₹10 ലക്ഷം രൂപ വരെ കുറഞ്ഞ പലിശ നിരക്കിൽ ബിസിനസ് വായ്പ.',
      keyBenefit: 'ഈടില്ലാതെ ₹10 ലക്ഷം വരെ ബിസിനസ് വായ്പ',
      department: 'സാമ്പത്തിക സേവന വകുപ്പ്',
      ministry: 'ധനകാര്യ മന്ത്രാലയം',
      categoryName: 'ബിസിനസ് & സംരംഭകത്വം'
    },
    'pm-svanidhi-scheme': {
      name: 'പിഎം സ്വനിധി തെരുവ് കച്ചവട വായ്പാ പദ്ധതി',
      shortDescription: 'തെരുവ് കച്ചവടക്കാർക്ക് ഉപജീവനമാർഗം പുനരാരംഭിക്കാൻ ₹10,000 മുതൽ ₹50,000 വരെ ഈടില്ലാത്ത വായ്പയും 7% പലിശ സബ്‌സിഡിയും.',
      keyBenefit: 'ഈടില്ലാതെ ₹10,000 പ്രവർത്തന മൂലധന വായ്പയും 7% പലിശ സബ്‌സിഡിയും',
      department: 'ഭവന നിർമ്മാണ നഗരകാര്യ മന്ത്രാലയം',
      ministry: 'നഗരകാര്യ മന്ത്രാലയം',
      categoryName: 'തൊഴിൽ & നൈപുണ്യം'
    },
    'pm-awas-yojana-gramin': {
      name: 'പ്രധാനമന്ത്രി ആവാസ് യോജന - ഗ്രാമീൺ (PMAY-G)',
      shortDescription: 'ഗ്രാമീണ ഭവനരഹിതർക്ക് സ്വന്തമായി സുരക്ഷിത വീട് നിർമ്മിക്കുന്നതിനായി ₹1.20 ലക്ഷം ധനസഹായം.',
      keyBenefit: 'വീട് നിർമ്മാണത്തിന് ₹1.20 ലക്ഷം ഗ്രാന്റ് + 90 ദിവസത്തെ തൊഴിലുറപ്പ് വേതനം',
      department: 'ഗ്രാമവികസന വകുപ്പ്',
      ministry: 'ഗ്രാമവികസന മന്ത്രാലയം',
      categoryName: 'ഭവനം & പാർപ്പിടം'
    },
    'atal-pension-yojana': {
      name: 'അടൽ പെൻഷൻ യോജന (APY)',
      shortDescription: 'അസംഘടിത മേഖലയിലെ തൊഴിലാളികൾക്ക് 60 വയസ്സിന് ശേഷം ജീവിതകാലം മുഴുവൻ പ്രതിമാസം ₹1,000 മുതൽ ₹5,000 വരെ ഉറപ്പുള്ള പെൻഷൻ.',
      keyBenefit: '60 വയസ്സിനു ശേഷം പ്രതിമാസം ₹1,000 മുതൽ ₹5,000 വരെ ഉറപ്പുള്ള പെൻഷൻ',
      department: 'പെൻഷൻ ഫണ്ട് റെഗുലേറ്ററി അതോറിറ്റി (PFRDA)',
      ministry: 'ധനകാര്യ മന്ത്രാലയം',
      categoryName: 'സാമൂഹിക സുരക്ഷ & പെൻഷൻ'
    },
    'naps-apprenticeship': {
      name: 'ദേശീയ അപ്രന്റീസ്ഷിപ്പ് പ്രോത്സാഹന പദ്ധതി (NAPS)',
      shortDescription: 'വ്യവസായങ്ങളിൽ പ്രായോഗിക തൊഴിൽ പരിശീലനവും പ്രതിമാസ സ്റ്റൈപ്പൻഡിൽ കേന്ദ്ര സർക്കാരിന്റെ സാമ്പത്തിക വിഹിതവും.',
      keyBenefit: 'പ്രതിമാസ സ്റ്റൈപ്പൻഡിന്റെ 25% (₹1,500 വരെ) സർക്കാർ വിഹിതം + ദേശീയ സർട്ടിഫിക്കറ്റ്',
      department: 'നൈപുണ്യ വികസന സംരംഭകത്വ മന്ത്രാലയം',
      ministry: 'നൈപുണ്യ വികസന മന്ത്രാലയം',
      categoryName: 'തൊഴിൽ & നൈപുണ്യം'
    },
    'pm-matru-vandana-yojana': {
      name: 'പ്രധാനമന്ത്രി മാതൃ വന്ദന യോജന (PMMVY)',
      shortDescription: 'ഗർഭിണികൾക്കും മുലയൂട്ടുന്ന അമ്മമാർക്കും പോഷകാഹാരത്തിനും ആരോഗ്യ സംരക്ഷണത്തിനുമായി ₹5,000 നേരിട്ടുള്ള ധനസഹായം.',
      keyBenefit: 'ആദ്യ പ്രസവത്തിന് ₹5,000 നേരിട്ടുള്ള ബാങ്ക് ധനസഹായം',
      department: 'വനിതാ ശിശുവികസന മന്ത്രാലയം',
      ministry: 'വനിതാ ശിശുവികസന മന്ത്രാലയം',
      categoryName: 'വനിതാ ശിശുക്ഷേമം'
    },
    'kmut-tamilnadu': {
      name: 'കലൈഞ്ജർ വനിതാ അവകാശ പദ്ധതി (KMUT)',
      shortDescription: 'സ്ത്രീകളുടെ ഗാർഹിക അധ്വാനത്തിന് അംഗീകാരമായി തമിഴ്‌നാട് സർക്കാർ നൽകുന്ന പ്രതിമാസം ₹1,000 അടിസ്ഥാന വരുമാന സഹായം.',
      keyBenefit: 'പ്രതിമാസം ₹1,000 ബാങ്ക് അക്കൗണ്ടിലേക്ക് നേരിട്ട് (പ്രതിവർഷം ₹12,000)',
      department: 'പ്രത്യേക പദ്ധതി നിർവ്വഹണ വകുപ്പ്',
      ministry: 'തമിഴ്‌നാട് സർക്കാർ',
      categoryName: 'സാമൂഹിക സുരക്ഷ & പെൻഷൻ'
    },
    'pudhumai-penn-tamilnadu': {
      name: 'പുതുമൈ പെൺ പദ്ധതി (ഉന്നത വിദ്യാഭ്യാസ സഹായം)',
      shortDescription: 'സർക്കാർ സ്കൂളുകളിൽ 6 മുതൽ 12 വരെ പഠിച്ച് കോളേജിൽ ചേരുന്ന പെൺകുട്ടികൾക്ക് പ്രതിമാസം ₹1,000 പ്രോത്സാഹന സഹായം.',
      keyBenefit: 'ബിരുദം പൂർത്തിയാകുന്നതുവരെ പ്രതിമാസം ₹1,000 ബാങ്ക് അക്കൗണ്ടിലേക്ക്',
      department: 'സാമൂഹ്യക്ഷേമ വനിതാ ശാക്തീകരണ വകുപ്പ്',
      ministry: 'തമിഴ്‌നാട് സർക്കാർ',
      categoryName: 'വിദ്യാഭ്യാസം & സ്കോളർഷിപ്പുകൾ'
    }
  },
  bn: {
    'pm-kisan-2024': {
      name: 'প্রধানমন্ত্রী কিষাণ সম্মান নিধি (PM-KISAN)',
      shortDescription: 'দেশের কৃষক পরিবারগুলিকে প্রতি বছর ₹৬,০০০ আর্থিক সহায়তা তিনটি সমান কিস্তিতে সরাসরি ব্যাঙ্ক অ্যাকাউন্টে পাঠানো হয়।',
      keyBenefit: 'ডিবিটি মাধ্যমে বছরে ₹৬,০০০ টাকা সরাসরি ব্যাঙ্ক অ্যাকাউন্টে',
      department: 'কৃষি ও কৃষক কল্যাণ বিভাগ',
      ministry: 'কৃষি ও কৃষক কল্যাণ মন্ত্রক',
      categoryName: 'কৃষি ও গ্রামীণ উন্নয়ন'
    },
    'pm-jay-ayushman': {
      name: 'আয়ুষ্মান ভারত - পিএম-জেএওয়াই (PM-JAY)',
      shortDescription: 'দরিদ্র ও প্রান্তিক পরিবারের জন্য প্রতি পরিবারে প্রতি বছর ₹৫ লাখ টাকা পর্যন্ত সম্পূর্ণ বিনামূল্যে হাসপাতালে চিকিৎসার সুবিধা।',
      keyBenefit: 'পরিবার পিছু বার্ষিক ₹৫,০০,০০০ টাকার বিনামূল্যে চিকিৎসা কভারেজ',
      department: 'জাতীয় স্বাস্থ্য কর্তৃপক্ষ (NHA)',
      ministry: 'স্বাস্থ্য ও পরিবার কল্যাণ মন্ত্রক',
      categoryName: 'স্বাস্থ্য ও চিকিৎসা'
    },
    'sukanya-samriddhi-yojana': {
      name: 'সুকন্যা সমৃদ্ধি যোজনা (SSY)',
      shortDescription: 'কন্যা সন্তানের উচ্চশিক্ষা ও বিবাহের জন্য ৮.২% সর্বোচ্চ সরকারি সুদ ও সম্পূর্ণ করমুক্ত সঞ্চয় প্রকল্প।',
      keyBenefit: '৮.২% সরকারি সুদের হার এবং ধারা ৮০সি অনুযায়ী সম্পূর্ণ কর ছাড়',
      department: 'ডাক বিভাগ / আর্থিক পরিষেবা',
      ministry: 'অর্থ মন্ত্রক, ভারত সরকার',
      categoryName: 'মহিলা ও শিশু কল্যাণ'
    },
    'national-post-matric-scholarship': {
      name: 'তফসিলি জাতি/উপজাতি/ওবিসি শিক্ষার্থীদের পোস্ট-ম্যাট্রিক স্কলারশিপ',
      shortDescription: 'একাদশ শ্রেণি থেকে স্নাতকোত্তর স্তর পর্যন্ত সম্পূর্ণ টিউশন ফি মকুব ও মাসিক রক্ষণাবেক্ষণ ভাতা।',
      keyBenefit: '১০০% টিউশন ফি ফেরত + বার্ষিক সর্বোচ্চ ₹১৩,৫০০ রক্ষণাবেক্ষণ ভাতা',
      department: 'সামাজিক ন্যায় ও ক্ষমতায়ন বিভাগ',
      ministry: 'সামাজিক ন্যায় ও ক্ষমতায়ন মন্ত্রক',
      categoryName: 'শিক্ষা ও বৃত্তি'
    },
    'pm-mudra-yojana': {
      name: 'প্রধানমন্ত্রী মুদ্রা যোজনা (PMMY)',
      shortDescription: 'ক্ষুদ্র ও মাঝারি ব্যবসায়ীদের জন্য কোনো জামানত ছাড়াই ₹১০ লাখ টাকা পর্যন্ত সুলভ সুদে ব্যবসায়িক ঋণ।',
      keyBenefit: 'কোনো গ্যারান্টি ছাড়াই ₹১০ লাখ পর্যন্ত স্বল্প সুদে ব্যবসায়িক ঋণ',
      department: 'আর্থিক পরিষেবা বিভাগ',
      ministry: 'অর্থ মন্ত্রক',
      categoryName: 'ব্যবসা ও উদ্যোক্তা'
    },
    'pm-svanidhi-scheme': {
      name: 'প্রধানমন্ত্রী স্বনিধি হকার্স ঋণ যোজনা (PM SVANidhi)',
      shortDescription: 'শহরাঞ্চলের রাস্তার হকারদের জীবিকা পুনরায় চালু করতে ₹১০,০০০ থেকে ₹৫০,০০০ পর্যন্ত কার্যকরী মূলধন ঋণ ও ৭% সুদ ভর্তুকি।',
      keyBenefit: 'জামানতহীন ₹১০,০০০ কার্যকরী মূলধন ঋণ ও ৭% সুদ ভর্তুকি',
      department: 'আবাসন ও নগর বিষয়ক মন্ত্রক',
      ministry: 'আবাসন ও নগর বিষয়ক মন্ত্রক',
      categoryName: 'কর্মসংস্থান ও দক্ষতা'
    },
    'pm-awas-yojana-gramin': {
      name: 'প্রধানমন্ত্রী গ্রামীণ আবাস যোজনা (PMAY-G)',
      shortDescription: 'গ্রামীণ গৃহহীন পরিবারগুলিকে নিজস্ব পাকা বাড়ি নির্মাণের জন্য ₹১.২০ লাখ টাকার সরকারি অনুদান।',
      keyBenefit: 'বাড়ি তৈরিতে ₹১.২০ লাখ টাকা অনুদান + ৯০ দিনের ১০০ দিনের কাজের মজুরি',
      department: 'গ্রামীণ উন্নয়ন বিভাগ',
      ministry: 'গ্রামীণ উন্নয়ন মন্ত্রক',
      categoryName: 'গৃহনির্মাণ ও বাসস্থান'
    },
    'atal-pension-yojana': {
      name: 'অটল পেনশন যোজনা (APY)',
      shortDescription: 'অসংগঠিত ক্ষেত্রের কর্মীদের ৬০ বছর বয়সের পর আজীবন প্রতি মাসে ₹১,০০০ থেকে ₹৫,০০০ পর্যন্ত নিশ্চিত পেনশন।',
      keyBenefit: '৬০ বছর বয়সের পর আজীবন মাসিক ₹১,০০০ - ₹৫,০০০ নিশ্চিত পেনশন',
      department: 'পেনশন তহবিল নিয়ন্ত্রক ও উন্নয়ন কর্তৃপক্ষ (PFRDA)',
      ministry: 'অর্থ মন্ত্রক',
      categoryName: 'সামাজিক নিরাপত্তা ও পেনশন'
    },
    'naps-apprenticeship': {
      name: 'জাতীয় শিক্ষানবিশি প্রচার প্রকল্প (NAPS)',
      shortDescription: 'শিল্পক্ষেত্রে তরুণদের হাতে-কলমে প্রশিক্ষণ এবং মাসিক উপবৃত্তিতে কেন্দ্রীয় সরকারের আর্থিক অংশীদারি।',
      keyBenefit: 'মাসিক উপবৃত্তির ২৫% (সর্বোচ্চ ₹১,৫০০) সরকারি অনুদান + জাতীয় সার্টিফিকেট',
      department: 'দক্ষতা উন্নয়ন ও উদ্যোক্তা মন্ত্রক',
      ministry: 'দক্ষতা উন্নয়ন মন্ত্রক',
      categoryName: 'কর্মসংস্থান ও দক্ষতা'
    },
    'pm-matru-vandana-yojana': {
      name: 'প্রধানমন্ত্রী মাতৃ বন্দনা যোজনা (PMMVY)',
      shortDescription: 'গর্ভবতী ও স্তন্যদাত্রী মায়েদের পুষ্টি ও স্বাস্থ্য সুরক্ষার জন্য সরাসরি ব্যাঙ্ক অ্যাকাউন্টে ₹৫,০০০ নগদ সহায়তা।',
      keyBenefit: 'প্রথম সন্তানের জন্মের জন্য সরাসরি ₹৫,০০০ নগদ সহায়তা',
      department: 'নারী ও শিশু উন্নয়ন মন্ত্রক',
      ministry: 'নারী ও শিশু উন্নয়ন মন্ত্রক',
      categoryName: 'মহিলা ও শিশু কল্যাণ'
    },
    'kmut-tamilnadu': {
      name: 'কালাইগনার নারী অধিকার প্রকল্প (KMUT)',
      shortDescription: 'মহিলাদের গৃহশ্রমকে সম্মান জানিয়ে তামিলনাড়ু সরকারের প্রতি মাসে ₹১,০০০ সরাসরি আর্থিক সহায়তা।',
      keyBenefit: 'প্রতি মাসে সরাসরি ব্যাঙ্ক অ্যাকাউন্টে ₹১,০০০ (বছরে ₹১২,০০০)',
      department: 'বিশেষ কর্মসূচি বাস্তবায়ন বিভাগ',
      ministry: 'তামিলনাড়ু সরকার',
      categoryName: 'সামাজিক নিরাপত্তা ও পেনশন'
    },
    'pudhumai-penn-tamilnadu': {
      name: 'পুধুমাই পেন যোজনা (উচ্চশিক্ষা নিশ্চয়তা)',
      shortDescription: 'সরকারি স্কুলে ৬ষ্ঠ থেকে ১২শ শ্রেণি পর্যন্ত পড়ে কলেজে ভর্তি হওয়া ছাত্রীদের জন্য প্রতি মাসে ₹১,০০০ উৎসাহ ভাতা।',
      keyBenefit: 'স্নাতক শেষ না হওয়া পর্যন্ত প্রতি মাসে ₹১,০০০ সরাসরি ব্যাঙ্ক অ্যাকাউন্টে',
      department: 'সমাজকল্যাণ ও নারী ক্ষমতায়ন বিভাগ',
      ministry: 'তামিলনাড়ু সরকার',
      categoryName: 'শিক্ষা ও বৃত্তি'
    }
  },
  mr: {
    'pm-kisan-2024': {
      name: 'प्रधानमंत्री किसान सन्मान निधी (PM-KISAN)',
      shortDescription: 'शेतकरी कुटुंबांना दरवर्षी ₹६,००० ची आर्थिक मदत तीन समान हप्त्यांमध्ये थेट बँक खात्यात जमा केली जाते.',
      keyBenefit: 'डीबीटीद्वारे दरवर्षी ₹६,००० थेट बँक खात्यात (३ हप्त्यांमध्ये)',
      department: 'कृषी आणि शेतकरी कल्याण विभाग',
      ministry: 'कृषी व शेतकरी कल्याण मंत्रालय, भारत सरकार',
      categoryName: 'कृषी आणि ग्रामीण विकास'
    },
    'pm-jay-ayushman': {
      name: 'आयुष्मान भारत - पीएम-जेएवाय (PM-JAY)',
      shortDescription: 'गरीब आणि गरजू कुटुंबांसाठी दरवर्षी प्रति कुटुंब ₹५ लाखांपर्यंत मोफत रुग्णालय उपचार आणि आरोग्य विमा.',
      keyBenefit: 'प्रति कुटुंब दरवर्षी ₹५,००,००० पर्यंत मोफत उपचार संरक्षण',
      department: 'राष्ट्रीय आरोग्य प्राधिकरण (NHA)',
      ministry: 'आरोग्य आणि कुटुंब कल्याण मंत्रालय',
      categoryName: 'आरोग्य आणि उपचार'
    },
    'sukanya-samriddhi-yojana': {
      name: 'सुकन्या समृद्धी योजना (SSY)',
      shortDescription: 'मुलींच्या उज्ज्वल भविष्यासाठी, उच्च शिक्षणासाठी आणि विवाहासाठी ८.२% सर्वोच्च सरकारी व्याज आणि संपूर्ण करमुक्त योजना.',
      keyBenefit: '८.२% उच्च व्याजदर आणि कलम ८०सी अंतर्गत संपूर्ण कर सवलत',
      department: 'टपाल विभाग / वित्तीय सेवा',
      ministry: 'वित्त मंत्रालय, भारत सरकार',
      categoryName: 'महिला आणि बालविकास'
    },
    'national-post-matric-scholarship': {
      name: 'अनुसूचित जाती/जमाती/इमाव विद्यार्थ्यांसाठी पोस्ट-मॅट्रिक शिष्यवृत्ती',
      shortDescription: 'इयत्ता ११ वी पासून उच्च शिक्षणापर्यंत पूर्ण शैक्षणिक शुल्क परतावा आणि मासिक निर्वाह भत्ता.',
      keyBenefit: '१००% शैक्षणिक शुल्क माफी + वार्षिक ₹१३,५०० पर्यंत निर्वाह भत्ता',
      department: 'सामाजिक न्याय आणि सक्षमीकरण विभाग',
      ministry: 'सामाजिक न्याय आणि सक्षमीकरण मंत्रालय',
      categoryName: 'शिक्षण आणि शिष्यवृत्ती'
    },
    'pm-mudra-yojana': {
      name: 'प्रधानमंत्री मुद्रा योजना (PMMY)',
      shortDescription: 'लहान आणि मध्यम व्यावसायिकांना कोणत्याही तारणाशिवाय ₹१० लाखांपर्यंत सुलभ व्यवसाय कर्ज.',
      keyBenefit: 'कोणत्याही तारण हमीशिवाय ₹१० लाखांपर्यंत व्यवसाय कर्ज',
      department: 'वित्तीय सेवा विभाग',
      ministry: 'वित्त मंत्रालय',
      categoryName: 'व्यवसाय आणि उद्योजकता'
    },
    'pm-svanidhi-scheme': {
      name: 'पीएम फेरीवाले स्वनिधी योजना (PM SVANidhi)',
      shortDescription: 'शहरी रस्त्यावरील फेरीवाल्यांना व्यवसाय पुन्हा सुरू करण्यासाठी ₹१०,००० ते ₹५०,००० पर्यंत खेळते भांडवल कर्ज व ७% व्याज अनुदान.',
      keyBenefit: 'तारणाशिवाय ₹१०,००० भांडवली कर्ज आणि ७% व्याज अनुदान',
      department: 'गृहनिर्माण आणि शहरी व्यवहार मंत्रालय',
      ministry: 'गृहनिर्माण आणि शहरी व्यवहार मंत्रालय',
      categoryName: 'रोजगार आणि कौशल्य'
    },
    'pm-awas-yojana-gramin': {
      name: 'प्रधानमंत्री आवास योजना - ग्रामीण (PMAY-G)',
      shortDescription: 'ग्रामीण भागातील बेघर आणि कच्च्या घरात राहणाऱ्या कुटुंबांना पक्के घर बांधण्यासाठी ₹१.२० लाखांचे थेट आर्थिक अनुदान.',
      keyBenefit: 'घर बांधण्यासाठी ₹१.२० लाख अनुदान + ९० दिवसांची मनरेगा मजुरी',
      department: 'ग्रामीण विकास विभाग',
      ministry: 'ग्रामीण विकास मंत्रालय',
      categoryName: 'गृहनिर्माण आणि निवारा'
    },
    'atal-pension-yojana': {
      name: 'अटल पेन्शन योजना (APY)',
      shortDescription: 'असंघटित क्षेत्रातील कामगारांना वयाच्या ६० वर्षांनंतर आयुष्यभर दरमहा ₹१,००० ते ₹५,००० पर्यंत हमीची पेन्शन.',
      keyBenefit: 'वयाच्या ६० वर्षानंतर दरमहा ₹१,००० ते ₹५,००० हमीची पेन्शन',
      department: 'पेन्शन फंड नियामक आणि विकास प्राधिकरण (PFRDA)',
      ministry: 'वित्त मंत्रालय',
      categoryName: 'सामाजिक सुरक्षा आणि पेन्शन'
    },
    'naps-apprenticeship': {
      name: 'राष्ट्रीय शिकाऊ उमेदवारी प्रोत्साहन योजना (NAPS)',
      shortDescription: 'उद्योगांमध्ये तरुणांना प्रत्यक्ष प्रशिक्षण आणि मासिक विद्यावेतनात केंद्र सरकारचा आर्थिक सहभाग.',
      keyBenefit: 'मासिक विद्यावेतनात २५% (₹१,५०० पर्यंत) सरकारी वाटा + राष्ट्रीय प्रमाणपत्र',
      department: 'कौशल्य विकास आणि उद्योजकता मंत्रालय',
      ministry: 'कौशल्य विकास मंत्रालय',
      categoryName: 'रोजगार आणि कौशल्य'
    },
    'pm-matru-vandana-yojana': {
      name: 'प्रधानमंत्री मातृ वंदना योजना (PMMVY)',
      shortDescription: 'गरोदर आणि स्तनदा मातांच्या पोषणासाठी आणि आरोग्यासाठी ₹५,००० ची थेट आर्थिक मदत.',
      keyBenefit: 'पहिल्या जिवंत अपत्यासाठी ₹५,००० थेट बँक खात्यात जमा',
      department: 'महिला आणि बालविकास मंत्रालय',
      ministry: 'महिला आणि बालविकास मंत्रालय',
      categoryName: 'महिला आणि बालविकास'
    },
    'kmut-tamilnadu': {
      name: 'कलैग्नार महिला हक्क योजना (KMUT)',
      shortDescription: 'महिलांच्या कौटुंबिक श्रमाचा सन्मान करत तमिळनाडू सरकारतर्फे दरमहा ₹१,००० थेट बँक खात्यात.',
      keyBenefit: 'दरमहा थेट बँक खात्यात ₹१,००० (वार्षिक ₹१२,०००)',
      department: 'विशेष कार्यक्रम अंमलबजावणी विभाग',
      ministry: 'तमिळनाडू शासन',
      categoryName: 'सामाजिक सुरक्षा आणि पेन्शन'
    },
    'pudhumai-penn-tamilnadu': {
      name: 'पुधुमई पेन योजना (उच्च शिक्षण प्रोत्साहन)',
      shortDescription: 'सरकारी शाळांमधून ६वी ते १२वी उत्तीर्ण होऊन महाविद्यालयात प्रवेश घेणाऱ्या विद्यार्थिनींना दरमहा ₹१,००० प्रोत्साहन भत्ता.',
      keyBenefit: 'पदवी पूर्ण होईपर्यंत दरमहा ₹१,००० थेट बँक खात्यात',
      department: 'समाजकल्याण आणि महिला सक्षमीकरण विभाग',
      ministry: 'तमिळनाडू शासन',
      categoryName: 'शिक्षण आणि शिष्यवृत्ती'
    }
  },
  gu: {
    'pm-kisan-2024': {
      name: 'પ્રધાનમંત્રી કિસાન સન્માન નિધિ (PM-KISAN)',
      shortDescription: 'ખેડૂત પરિવારોને વાર્ષિક ₹6,000 ની આર્થિક સહાય ત્રણ સમાન હપ્તામાં સીધી બેંક ખાતામાં જમા થાય છે.',
      keyBenefit: 'ડીબીટી દ્વારા વાર્ષિક ₹6,000 સીધા બેંક ખાતામાં (3 હપ્તામાં)',
      department: 'કૃષિ અને ખેડૂત કલ્યાણ વિભાગ',
      ministry: 'કૃષિ અને ખેડૂત કલ્યાણ મંત્રાલય',
      categoryName: 'કૃષિ અને ગ્રામીણ વિકાસ'
    },
    'pm-jay-ayushman': {
      name: 'આયુષ્માન ભારત - પીએમ-જેએવાય (PM-JAY)',
      shortDescription: 'ગરીબ અને જરૂરિયાતમંદ પરિવારો માટે દર વર્ષે પરિવાર દીઠ ₹5 લાખ સુધીની મફત હોસ્પિટલ સારવાર.',
      keyBenefit: 'પરિવાર દીઠ વાર્ષિક ₹5,00,000 સુધીની મફત સારવાર કવરેજ',
      department: 'નેશનલ હેલ્થ ઓથોરિટી (NHA)',
      ministry: 'આરોગ્ય અને પરિવાર કલ્યાણ મંત્રાલય',
      categoryName: 'આરોગ્ય અને તબીબી સેવા'
    },
    'sukanya-samriddhi-yojana': {
      name: 'સુકન્યા સમૃદ્ધિ યોજના (SSY)',
      shortDescription: 'દીકરીઓના ઉજ્જવળ ભવિષ્ય, ઉચ્ચ શિક્ષણ અને લગ્ન માટે 8.2% સૌથી વધુ વ્યાજ અને કરમુક્ત સરકારી બચત યોજના.',
      keyBenefit: '8.2% ઊંચું વ્યાજ અને કલમ 80C હેઠળ સંપૂર્ણ આવકવેરા મુક્તિ',
      department: 'ટપાલ વિભાગ / નાણાકીય સેવાઓ',
      ministry: 'નાણાં મંત્રાલય, ભારત સરકાર',
      categoryName: 'મહિલા અને બાળ કલ્યાણ'
    },
    'national-post-matric-scholarship': {
      name: 'એસસી/એસટી/ઓબીસી વિદ્યાર્થીઓ માટે પોસ્ટ-મેટ્રિક શિષ્યવૃત્તિ',
      shortDescription: 'ધોરણ 11 થી અનુસ્નાતક સુધી સંપૂર્ણ ટ્યુશન ફી પરત અને માસિક નિર્વાહ ભથ્થું.',
      keyBenefit: '100% ટ્યુશન ફી પરત + વાર્ષિક ₹13,500 સુધી નિર્વાહ ભથ્થું',
      department: 'સામાજિક ન્યાય અને અધિકારીતા વિભાગ',
      ministry: 'સામાજિક ન્યાય અને અધિકારીતા મંત્રાલય',
      categoryName: 'શિક્ષણ અને શિષ્યવૃત્તિ'
    },
    'pm-mudra-yojana': {
      name: 'પ્રધાનમંત્રી મુદ્રા યોજના (PMMY)',
      shortDescription: 'નાના અને સૂક્ષ્મ ઉદ્યોગ સાહસિકો માટે કોઈપણ ગેરંટી વગર ₹10 લાખ સુધીની સસ્તી લોન સહાય.',
      keyBenefit: 'કોઈપણ ગેરંટી વગર ₹10 લાખ સુધી વ્યાપાર લોન',
      department: 'નાણાકીય સેવાઓ વિભાગ',
      ministry: 'નાણાં મંત્રાલય',
      categoryName: 'વેપાર અને ઉદ્યોગસાહસિકતા'
    },
    'pm-svanidhi-scheme': {
      name: 'પીએમ સ્વનિધિ ફેરિયા લોન યોજના (PM SVANidhi)',
      shortDescription: 'શેરી ફેરિયાઓને આજીવિકા પુનઃસ્થાપિત કરવા ₹10,000 થી ₹50,000 સુધીની કાર્યકારી મૂડી લોન અને 7% વ્યાજ સબસિડી.',
      keyBenefit: 'જમીનગીરી વિના ₹10,000 લોન અને 7% વ્યાજ સબસિડી',
      department: 'આવાસ અને શહેરી બાબતોનું મંત્રાલય',
      ministry: 'આવાસ અને શહેરી બાબતોનું મંત્રાલય',
      categoryName: 'રોજગાર અને કૌશલ્ય'
    },
    'pm-awas-yojana-gramin': {
      name: 'પ્રધાનમંત્રી આવાસ યોજના - ગ્રામીણ (PMAY-G)',
      shortDescription: 'ગ્રામીણ ઘરવિહોણા અને કાચા મકાન ધરાવતા પરિવારોને પાકું ઘર બનાવવા ₹1.20 લાખની સીધી સરકારી સહાય.',
      keyBenefit: 'ઘર બનાવવા માટે ₹1.20 લાખ સહાય + 90 દિવસની મનરેગા મજૂરી',
      department: 'ગ્રામીણ વિકાસ વિભાગ',
      ministry: 'ગ્રામીણ વિકાસ મંત્રાલય',
      categoryName: 'આવાસ અને રહેઠાણ'
    },
    'atal-pension-yojana': {
      name: 'અટલ પેન્શન યોજના (APY)',
      shortDescription: 'અસંગઠિત ક્ષેત્રના શ્રમિકોને 60 વર્ષની ઉંમર પછી આજીવન દર મહિને ₹1,000 થી ₹5,000 સુધીની નિશ્ચિત પેન્શન.',
      keyBenefit: '60 વર્ષ પછી દર મહિને ₹1,000 થી ₹5,000 સુધી આજીવન પેન્શન',
      department: 'પેન્શન ફંડ રેગ્યુલેટરી ઓથોરિટી (PFRDA)',
      ministry: 'નાણાં મંત્રાલય',
      categoryName: 'સામાજિક સુરક્ષા અને પેન્શન'
    },
    'naps-apprenticeship': {
      name: 'રાષ્ટ્રીય એપ્રેન્ટિસશીપ પ્રમોશન સ્કીમ (NAPS)',
      shortDescription: 'યુવાનોને ઉદ્યોગોમાં પ્રાયોગિક તાલીમ અને માસિક સ્ટાઈપેન્ડમાં સરકારનો નાણાકીય હિસ્સો.',
      keyBenefit: 'માસિક સ્ટાઈપેન્ડના 25% (₹1,500 સુધી) સરકારી સહાય + રાષ્ટ્રીય પ્રમાણપત્ર',
      department: 'કૌશલ્ય વિકાસ અને ઉદ્યોગસાહસિકતા મંત્રાલય',
      ministry: 'કૌશલ્ય વિકાસ મંત્રાલય',
      categoryName: 'રોજગાર અને કૌશલ્ય'
    },
    'pm-matru-vandana-yojana': {
      name: 'પ્રધાનમંત્રી માતૃ વંદના યોજના (PMMVY)',
      shortDescription: 'સગર્ભા અને ધાત્રી માતાઓના પોષણ અને સારસંભાળ માટે ₹5,000 ની સીધી રોકડ સહાય.',
      keyBenefit: 'પ્રથમ બાળકના જન્મ માટે ₹5,000 સીધા બેંક ખાતામાં',
      department: 'મહિલા અને બાળ વિકાસ મંત્રાલય',
      ministry: 'મહિલા અને બાળ વિકાસ મંત્રાલય',
      categoryName: 'મહિલા અને બાળ કલ્યાણ'
    },
    'kmut-tamilnadu': {
      name: 'કલૈગ્નર મહિલા અધિકાર યોજના (KMUT)',
      shortDescription: 'મહિલાઓના ઘરકામ અને શ્રમનું સન્માન કરી તમિલનાડુ સરકાર તરફથી દર મહિને ₹1,000 ની આવક સહાય.',
      keyBenefit: 'દર મહિને ₹1,000 સીધા બેંક ખાતામાં (વાર્ષિક ₹12,000)',
      department: 'વિશેષ કાર્યક્રમ અમલીકરણ વિભાગ',
      ministry: 'તમિલનાડુ સરકાર',
      categoryName: 'સામાજિક સુરક્ષા અને પેન્શન'
    },
    'pudhumai-penn-tamilnadu': {
      name: 'પુધુમાઈ પેન યોજના (ઉચ્ચ શિક્ષણ સહાય)',
      shortDescription: 'સરકારી શાળાઓમાં 6 થી 12 ભણીને કોલેજમાં પ્રવેશ લેતી વિદ્યાર્થિનીઓને દર મહિને ₹1,000 પ્રોત્સાહન સહાય.',
      keyBenefit: 'ડિગ્રી પૂર્ણ થાય ત્યાં સુધી દર મહિને ₹1,000 સીધા બેંક ખાતામાં',
      department: 'સમાજ કલ્યાણ અને મહિલા સશક્તિકરણ વિભાગ',
      ministry: 'તમિલનાડુ સરકાર',
      categoryName: 'શિક્ષણ અને શિષ્યવૃત્તિ'
    }
  },
  pa: {
    'pm-kisan-2024': {
      name: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸੰਮਾਨ ਨਿਧੀ (PM-KISAN)',
      shortDescription: 'ਕਿਸਾਨ ਪਰਿਵਾਰਾਂ ਨੂੰ ਹਰ ਸਾਲ ₹6,000 ਦੀ ਵਿੱਤੀ ਸਹਾਇਤਾ ਤਿੰਨ ਬਰਾਬਰ ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਸਿੱਧੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਭੇਜੀ ਜਾਂਦੀ ਹੈ।',
      keyBenefit: 'ਡੀਬੀਟੀ ਰਾਹੀਂ ਸਾਲਾਨਾ ₹6,000 ਸਿੱਧੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ (3 ਕਿਸ਼ਤਾਂ ਵਿੱਚ)',
      department: 'ਖੇਤੀਬਾੜੀ ਅਤੇ ਕਿਸਾਨ ਭਲਾਈ ਵਿਭਾਗ',
      ministry: 'ਖੇਤੀਬਾੜੀ ਅਤੇ ਕਿਸਾਨ ਭਲਾਈ ਮੰਤਰਾਲਾ',
      categoryName: 'ਖੇਤੀਬਾੜੀ ਅਤੇ ਪੇਂਡੂ ਵਿਕਾਸ'
    },
    'pm-jay-ayushman': {
      name: 'ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ - ਪੀਐਮ-ਜੇਏਵਾਈ (PM-JAY)',
      shortDescription: 'ਗਰੀਬ ਪਰਿਵਾਰਾਂ ਲਈ ਹਸਪਤਾਲ ਵਿੱਚ ਇਲਾਜ ਲਈ ਪ੍ਰਤੀ ਪਰਿਵਾਰ ਪ੍ਰਤੀ ਸਾਲ ₹5 ਲੱਖ ਤੱਕ ਦਾ ਮੁਫ਼ਤ ਸਿਹਤ ਬੀਮਾ।',
      keyBenefit: 'ਪ੍ਰਤੀ ਪਰਿਵਾਰ ਸਾਲਾਨਾ ₹5,00,000 ਤੱਕ ਮੁਫ਼ਤ ਹਸਪਤਾਲ ਇਲਾਜ',
      department: 'ਨੈਸ਼ਨਲ ਹੈਲਥ ਅਥਾਰਟੀ (NHA)',
      ministry: 'ਸਿਹਤ ਅਤੇ ਪਰਿਵਾਰ ਭਲਾਈ ਮੰਤਰਾਲਾ',
      categoryName: 'ਸਿਹਤ ਅਤੇ ਡਾਕਟਰੀ ਸੇਵਾਵਾਂ'
    },
    'sukanya-samriddhi-yojana': {
      name: 'ਸੁਕੰਨਿਆ ਸਮ੍ਰਿਧੀ ਯੋਜਨਾ (SSY)',
      shortDescription: 'ਧੀਆਂ ਦੇ ਸੁਨਹਿਰੀ ਭਵਿੱਖ, ਉੱਚ ਸਿੱਖਿਆ ਅਤੇ ਵਿਆਹ ਲਈ 8.2% ਸਭ ਤੋਂ ਵੱਧ ਵਿਆਜ ਅਤੇ ਪੂਰੀ ਟੈਕਸ ਛੋਟ ਵਾਲੀ ਬੱਚਤ ਸਕੀਮ।',
      keyBenefit: '8.2% ਉੱਚ ਵਿਆਜ ਦਰ ਅਤੇ ਧਾਰਾ 80C ਅਧੀਨ ਪੂਰੀ ਆਮਦਨ ਟੈਕਸ ਛੋਟ',
      department: 'ਡਾਕ ਵਿਭਾਗ / ਵਿੱਤੀ ਸੇਵਾਵਾਂ',
      ministry: 'ਵਿੱਤ ਮੰਤਰਾਲਾ, ਭਾਰਤ ਸਰਕਾਰ',
      categoryName: 'ਮਹਿਲਾ ਅਤੇ ਬਾਲ ਭਲਾਈ'
    },
    'national-post-matric-scholarship': {
      name: 'ਐਸਸੀ/ਐਸਟੀ/ਓਬੀਸੀ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਪੋਸਟ-ਮੈਟ੍ਰਿਕ ਵਜ਼ੀਫ਼ਾ',
      shortDescription: '11ਵੀਂ ਜਮਾਤ ਤੋਂ ਲੈ ਕੇ ਉੱਚ ਸਿੱਖਿਆ ਤੱਕ ਪੂਰੀ ਟਿਊਸ਼ਨ ਫੀਸ ਵਾਪਸੀ ਅਤੇ ਮਾਸਿਕ ਗੁਜ਼ਾਰਾ ਭੱਤਾ।',
      keyBenefit: '100% ਟਿਊਸ਼ਨ ਫੀਸ ਵਾਪਸੀ + ਸਾਲਾਨਾ ₹13,500 ਤੱਕ ਗੁਜ਼ਾਰਾ ਭੱਤਾ',
      department: 'ਸਮਾਜਿਕ ਨਿਆਂ ਅਤੇ ਅਧਿਕਾਰਤਾ ਵਿਭਾਗ',
      ministry: 'ਸਮਾਜਿਕ ਨਿਆਂ ਮੰਤਰਾਲਾ',
      categoryName: 'ਸਿੱਖਿਆ ਅਤੇ ਵਜ਼ੀਫ਼ੇ'
    },
    'pm-mudra-yojana': {
      name: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਮੁਦਰਾ ਯੋਜਨਾ (PMMY)',
      shortDescription: 'ਛੋਟੇ ਕਾਰੋਬਾਰੀਆਂ ਨੂੰ ਬਿਨਾਂ ਕਿਸੇ ਗਾਰੰਟੀ ਦੇ ₹10 ਲੱਖ ਤੱਕ ਦਾ ਸਸਤਾ ਵਪਾਰਕ ਕਰਜ਼ਾ।',
      keyBenefit: 'ਬਿਨਾਂ ਗਾਰੰਟੀ ₹10 ਲੱਖ ਤੱਕ ਵਪਾਰਕ ਕਰਜ਼ਾ ਘੱਟ ਵਿਆਜ ਤੇ',
      department: 'ਵਿੱਤੀ ਸੇਵਾਵਾਂ ਵਿਭਾਗ',
      ministry: 'ਵਿੱਤ ਮੰਤਰਾਲਾ',
      categoryName: 'ਵਪਾਰ ਅਤੇ ਉੱਦਮਤਾ'
    },
    'pm-svanidhi-scheme': {
      name: 'ਪੀਐਮ ਸਵਨਿਧੀ ਰੇਹੜੀ-ਫੜ੍ਹੀ ਕਰਜ਼ਾ ਯੋਜਨਾ (PM SVANidhi)',
      shortDescription: 'ਸ਼ਹਿਰੀ ਰੇਹੜੀ-ਫੜ੍ਹੀ ਵਾਲਿਆਂ ਨੂੰ ਆਪਣਾ ਕੰਮ ਦੁਬਾਰਾ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ₹10,000 ਤੋਂ ₹50,000 ਤੱਕ ਦਾ ਕਰਜ਼ਾ ਅਤੇ 7% ਵਿਆਜ ਸਬਸਿਡੀ।',
      keyBenefit: 'ਬਿਨਾਂ ਗਾਰੰਟੀ ₹10,000 ਕਾਰਜਸ਼ੀਲ ਪੂੰਜੀ ਕਰਜ਼ਾ ਅਤੇ 7% ਵਿਆਜ ਸਬਸਿਡੀ',
      department: 'ਮਕਾਨ ਉਸਾਰੀ ਅਤੇ ਸ਼ਹਿਰੀ ਮਾਮਲੇ ਮੰਤਰਾਲਾ',
      ministry: 'ਸ਼ਹਿਰੀ ਮਾਮਲੇ ਮੰਤਰਾਲਾ',
      categoryName: 'ਰੁਜ਼ਗਾਰ ਅਤੇ ਹੁਨਰ'
    },
    'pm-awas-yojana-gramin': {
      name: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਆਵਾਸ ਯੋਜਨਾ - ਗ੍ਰਾਮੀਣ (PMAY-G)',
      shortDescription: 'ਪੇਂਡੂ ਬੇਘਰਿਆਂ ਅਤੇ ਕੱਚੇ ਮਕਾਨਾਂ ਵਾਲੇ ਪਰਿਵਾਰਾਂ ਨੂੰ ਪੱਕਾ ਮਕਾਨ ਬਣਾਉਣ ਲਈ ₹1.20 ਲੱਖ ਦੀ ਸਿੱਧੀ ਵਿੱਤੀ ਸਹਾਇਤਾ।',
      keyBenefit: 'ਮਕਾਨ ਉਸਾਰੀ ਲਈ ₹1.20 ਲੱਖ ਸਹਾਇਤਾ + 90 ਦਿਨਾਂ ਦੀ ਮਨਰੇਗਾ ਦਿਹਾੜੀ',
      department: 'ਪੇਂਡੂ ਵਿਕਾਸ ਵਿਭਾਗ',
      ministry: 'ਪੇਂਡੂ ਵਿਕਾਸ ਮੰਤਰਾਲਾ',
      categoryName: 'ਰਿਹਾਇਸ਼ ਅਤੇ ਆਸਰਾ'
    },
    'atal-pension-yojana': {
      name: 'ਅਟਲ ਪੈਨਸ਼ਨ ਯੋਜਨਾ (APY)',
      shortDescription: 'ਗੈਰ-ਜਥੇਬੰਦਕ ਖੇਤਰ ਦੇ ਕਾਮਿਆਂ ਨੂੰ 60 ਸਾਲ ਦੀ ਉਮਰ ਤੋਂ ਬਾਅਦ ਜੀਵਨ ਭਰ ਮਹੀਨਾਵਾਰ ₹1,000 ਤੋਂ ₹5,000 ਤੱਕ ਦੀ ਪੈਨਸ਼ਨ।',
      keyBenefit: '60 ਸਾਲ ਦੀ ਉਮਰ ਤੋਂ ਬਾਅਦ ਉਮਰ ਭਰ ਮਹੀਨਾਵਾਰ ₹1,000 - ₹5,000 ਪੈਨਸ਼ਨ',
      department: 'ਪੈਨਸ਼ਨ ਫੰਡ ਰੈਗੂਲੇਟਰੀ ਅਥਾਰਟੀ (PFRDA)',
      ministry: 'ਵਿੱਤ ਮੰਤਰਾਲਾ',
      categoryName: 'ਸਮਾਜਿਕ ਸੁਰੱਖਿਆ ਅਤੇ ਪੈਨਸ਼ਨ'
    },
    'naps-apprenticeship': {
      name: 'ਰਾਸ਼ਟਰੀ ਅਪ੍ਰੈਂਟਿਸਸ਼ਿਪ ਪ੍ਰਮੋਸ਼ਨ ਸਕੀਮ (NAPS)',
      shortDescription: 'ਨੌਜਵਾਨਾਂ ਨੂੰ ਉਦਯੋਗਾਂ ਵਿੱਚ ਸਿਖਲਾਈ ਅਤੇ ਮਾਸਿਕ ਵਜ਼ੀਫ਼ੇ ਵਿੱਚ ਕੇਂਦਰ ਸਰਕਾਰ ਵੱਲੋਂ ਵਿੱਤੀ ਹਿੱਸੇਦਾਰੀ।',
      keyBenefit: 'ਮਹੀਨਾਵਾਰ ਸਟਾਈਪੈਂਡ ਦਾ 25% (₹1,500 ਤੱਕ) ਸਰਕਾਰੀ ਹਿੱਸਾ + ਰਾਸ਼ਟਰੀ ਸਰਟੀਫਿਕੇਟ',
      department: 'ਹੁਨਰ ਵਿਕਾਸ ਅਤੇ ਉੱਦਮਤਾ ਮੰਤਰਾਲਾ',
      ministry: 'ਹੁਨਰ ਵਿਕਾਸ ਮੰਤਰਾਲਾ',
      categoryName: 'ਰੁਜ਼ਗਾਰ ਅਤੇ ਹੁਨਰ'
    },
    'pm-matru-vandana-yojana': {
      name: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਮਾਤਰੂ ਵੰਦਨਾ ਯੋਜਨਾ (PMMVY)',
      shortDescription: 'ਗਰਭਵਤੀ ਔਰਤਾਂ ਅਤੇ ਦੁੱਧ ਚੁੰਘਾਉਣ ਵਾਲੀਆਂ ਮਾਵਾਂ ਦੀ ਸਿਹਤ ਸੰਭਾਲ ਲਈ ₹5,000 ਦੀ ਸਿੱਧੀ ਨਕਦ ਸਹਾਇਤਾ।',
      keyBenefit: 'ਪਹਿਲੇ ਬੱਚੇ ਦੇ ਜਨਮ ਤੇ ₹5,000 ਸਿੱਧੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ',
      department: 'ਮਹਿਲਾ ਅਤੇ ਬਾਲ ਵਿਕਾਸ ਮੰਤਰਾਲਾ',
      ministry: 'ਮਹਿਲਾ ਅਤੇ ਬਾਲ ਵਿਕਾਸ ਮੰਤਰਾਲਾ',
      categoryName: 'ਮਹਿਲਾ ਅਤੇ ਬਾਲ ਭਲਾਈ'
    },
    'kmut-tamilnadu': {
      name: 'ਕਲੈਗਨਾਰ ਮਹਿਲਾ ਅਧਿਕਾਰ ਯੋਜਨਾ (KMUT)',
      shortDescription: 'ਔਰਤਾਂ ਦੇ ਘਰੇਲੂ ਕੰਮ ਦਾ ਸਨਮਾਨ ਕਰਦੇ ਹੋਏ ਤਾਮਿਲਨਾਡੂ ਸਰਕਾਰ ਵੱਲੋਂ ਪ੍ਰਤੀ ਮਹੀਨਾ ₹1,000 ਦੀ ਵਿੱਤੀ ਸਹਾਇਤਾ।',
      keyBenefit: 'ਹਰ ਮਹੀਨੇ ₹1,000 ਸਿੱਧੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ (ਸਾਲਾਨਾ ₹12,000)',
      department: 'ਵਿਸ਼ੇਸ਼ ਪ੍ਰੋਗਰਾਮ ਲਾਗੂਕਰਨ ਵਿਭਾਗ',
      ministry: 'ਤਾਮਿਲਨਾਡੂ ਸਰਕਾਰ',
      categoryName: 'ਸਮਾਜਿਕ ਸੁਰੱਖਿਆ ਅਤੇ ਪੈਨਸ਼ਨ'
    },
    'pudhumai-penn-tamilnadu': {
      name: 'ਪੁਧੂਮਈ ਪੈੱਨ ਸਕੀਮ (ਉੱਚ ਸਿੱਖਿਆ ਸਹਾਇਤਾ)',
      shortDescription: 'ਸਰਕਾਰੀ ਸਕੂਲਾਂ ਵਿੱਚ 6ਵੀਂ ਤੋਂ 12ਵੀਂ ਪੜ੍ਹ ਕੇ ਕਾਲਜ ਦਾਖਲ ਹੋਣ ਵਾਲੀਆਂ ਵਿਦਿਆਰਥਣਾਂ ਨੂੰ ਪ੍ਰਤੀ ਮਹੀਨਾ ₹1,000 ਵਜ਼ੀਫ਼ਾ।',
      keyBenefit: 'ਡਿਗਰੀ ਮੁਕੰਮਲ ਹੋਣ ਤੱਕ ਪ੍ਰਤੀ ਮਹੀਨਾ ₹1,000 ਸਿੱਧੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ',
      department: 'ਸਮਾਜ ਭਲਾਈ ਅਤੇ ਮਹਿਲਾ ਸਸ਼ਕਤੀਕਰਨ ਵਿਭਾਗ',
      ministry: 'ਤਾਮਿਲਨਾਡੂ ਸਰਕਾਰ',
      categoryName: 'ਸਿੱਖਿਆ ਅਤੇ ਵਜ਼ੀਫ਼ੇ'
    }
  },
  or: {
    'pm-kisan-2024': {
      name: 'ପ୍ରଧାନମନ୍ତ୍ରୀ କିଷାନ ସମ୍ମାନ ନିଧି (PM-KISAN)',
      shortDescription: 'କୃଷକ ପରିବାରମାନଙ୍କୁ ପ୍ରତିବର୍ଷ ₹୬,୦୦୦ ଆର୍ଥିକ ସହାୟତା ତିନୋଟି ସମାନ କିସ୍ତିରେ ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଖାତାକୁ ପ୍ରଦାନ କରାଯାଏ।',
      keyBenefit: 'ଡିବିଟି ମାଧ୍ୟମରେ ବାର୍ଷିକ ₹୬,୦୦୦ ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଖାତାରେ (୩ଟି କିସ୍ତିରେ)',
      department: 'କୃଷି ଏବଂ କୃଷକ କଲ୍ୟାଣ ବିଭାଗ',
      ministry: 'କୃଷି ଏବଂ କୃଷକ କଲ୍ୟାଣ ମନ୍ତ୍ରଣାଳୟ',
      categoryName: 'କୃଷି ଓ ଗ୍ରାମୀଣ ବିକାଶ'
    },
    'pm-jay-ayushman': {
      name: 'ଆୟୁଷ୍ମାନ ଭାରତ - ପିଏମ୍-ଜେଏୱାଇ (PM-JAY)',
      shortDescription: 'ଗରିବ ଓ ଅସହାୟ ପରିବାରମାନଙ୍କ ପାଇଁ ଡାକ୍ତରଖାନାରେ ମାଗଣା ଚିକିତ୍ସା ପାଇଁ ପରିବାର ପିଛା ବାର୍ଷିକ ₹୫ ଲକ୍ଷ ଟଙ୍କାର ସ୍ୱାସ୍ଥ୍ୟ ବୀମା।',
      keyBenefit: 'ପରିବାର ପିଛା ବାର୍ଷିକ ₹୫,୦୦,୦୦୦ ପର୍ଯ୍ୟନ୍ତ ମାଗଣା ଚିକିତ୍ସା ସୁବିଧା',
      department: 'ଜାତୀୟ ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରାଧିକରଣ (NHA)',
      ministry: 'ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ପରିବାର କଲ୍ୟାଣ ମନ୍ତ୍ରଣାଳୟ',
      categoryName: 'ସ୍ୱାସ୍ଥ୍ୟ ଓ ଚିକିତ୍ସା ସେବା'
    },
    'sukanya-samriddhi-yojana': {
      name: 'ସୁକନ୍ୟା ସମୃଦ୍ଧି ଯୋଜନା (SSY)',
      shortDescription: 'କନ୍ୟା ସନ୍ତାନର ଉଜ୍ଜ୍ୱଳ ଭବିଷ୍ୟତ, ଉଚ୍ଚଶିକ୍ଷା ଓ ବିବାହ ପାଇଁ ୮.୨% ସର୍ବୋଚ୍ଚ ସୁଧ ଓ ସମ୍ପୂର୍ଣ୍ଣ ଆୟକର ଛାଡ଼ ଯୋଜନା।',
      keyBenefit: '୮.୨% ଉଚ୍ଚ ସୁଧ ହାର ଏବଂ ଧାରା ୮୦ସି ଅଧୀନରେ ସମ୍ପୂର୍ଣ୍ଣ ଆୟକର ଛାଡ଼',
      department: 'ଡାକ ବିଭାଗ / ଆର୍ଥିକ ସେବା',
      ministry: 'ଅର୍ଥ ମନ୍ତ୍ରଣାଳୟ, ଭାରତ ସରକାର',
      categoryName: 'ମହିଳା ଓ ଶିଶୁ କଲ୍ୟାଣ'
    },
    'national-post-matric-scholarship': {
      name: 'ଅନୁସୂଚିତ ଜାତି/ଜନଜାତି/ପଛୁଆ ବର୍ଗ ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପାଇଁ ପୋଷ୍ଟ-ମେଟ୍ରିକ୍ ବୃତ୍ତି',
      shortDescription: 'ଏକାଦଶ ଶ୍ରେଣୀରୁ ସ୍ନାତକୋତ୍ତର ପର୍ଯ୍ୟନ୍ତ ସମ୍ପୂର୍ଣ୍ଣ କଲେଜ ଫି ଫେରସ୍ତ ଏବଂ ମାସିକ ରକ୍ଷଣାବେକ୍ଷଣ ଭତ୍ତା।',
      keyBenefit: '୧୦୦% ଟିଉସନ୍ ଫି ଛାଡ଼ + ବାର୍ଷିକ ₹୧୩,୫୦୦ ପର୍ଯ୍ୟନ୍ତ ରକ୍ଷଣାବେକ୍ଷଣ ଭତ୍ତା',
      department: 'ସାମାଜିକ ନ୍ୟାୟ ଏବଂ ସଶକ୍ତିକରଣ ବିଭାଗ',
      ministry: 'ସାମାଜିକ ନ୍ୟାୟ ମନ୍ତ୍ରଣାଳୟ',
      categoryName: 'ଶିକ୍ଷା ଓ ଛାତ୍ରବୃତ୍ତି'
    },
    'pm-mudra-yojana': {
      name: 'ପ୍ରଧାନମନ୍ତ୍ରୀ ମୁଦ୍ରା ଯୋଜନା (PMMY)',
      shortDescription: 'କ୍ଷୁଦ୍ର ଓ ମଧ୍ୟମ ବ୍ୟବସାୟୀମାନଙ୍କୁ ବିନା କୌଣସି ବନ୍ଧକରେ ₹୧୦ ଲକ୍ଷ ଟଙ୍କା ପର୍ଯ୍ୟନ୍ତ ସୁଲଭ ବ୍ୟବସାୟିକ ଋଣ।',
      keyBenefit: 'ବିନା ବନ୍ଧକରେ ₹୧୦ ଲକ୍ଷ ପର୍ଯ୍ୟନ୍ତ ବ୍ୟବସାୟ ଋଣ ସୁଲଭ ସୁଧରେ',
      department: 'ଆର୍ଥିକ ସେବା ବିଭାଗ',
      ministry: 'ଅର୍ଥ ମନ୍ତ୍ରଣାଳୟ',
      categoryName: 'ବ୍ୟବସାୟ ଓ ସ୍ୱନିୟୋଜନ'
    },
    'pm-svanidhi-scheme': {
      name: 'ପିଏମ୍ ସ୍ୱନିଧି ଉଠାଦୋକାନୀ ଋଣ ଯୋଜନା (PM SVANidhi)',
      shortDescription: 'ସହରାଞ୍ଚଳର ଉଠାଦୋକାନୀମାନଙ୍କୁ ନିଜ ବ୍ୟବସାୟ ପୁନଃଆରମ୍ଭ କରିବା ପାଇଁ ₹୧୦,୦୦୦ ରୁ ₹୫୦,୦୦୦ ପର୍ଯ୍ୟନ୍ତ ଋଣ ଓ ୭% ସୁଧ ରିହାତି।',
      keyBenefit: 'ବିନା ବନ୍ଧକରେ ₹୧୦,୦୦୦ କାର୍ଯ୍ୟକାରୀ ପୁଞ୍ଜି ଋଣ ଓ ୭% ସୁଧ ରିହାତି',
      department: 'ଗୃହ ନିର୍ମାଣ ଏବଂ ସହରାଞ୍ଚଳ ବ୍ୟାପାର ମନ୍ତ୍ରଣାଳୟ',
      ministry: 'ସହରାଞ୍ଚଳ ବ୍ୟାପାର ମନ୍ତ୍ରଣାଳୟ',
      categoryName: 'ନିଯୁକ୍ତି ଓ ଦକ୍ଷତା ବିକାଶ'
    },
    'pm-awas-yojana-gramin': {
      name: 'ପ୍ରଧାନମନ୍ତ୍ରୀ ଆବାସ ଯୋଜନା - ଗ୍ରାମୀଣ (PMAY-G)',
      shortDescription: 'ଗ୍ରାମାଞ୍ଚଳର ଗୃହହୀନ ଓ କଚ୍ଚା ଘରେ ରହୁଥିବା ପରିବାରକୁ ପକ୍କା ଘର ନିର୍ମାଣ ପାଇଁ ₹୧.୨୦ ଲକ୍ଷର ସିଧାସଳଖ ଅନୁଦାନ।',
      keyBenefit: 'ଘର ନିର୍ମାଣ ପାଇଁ ₹୧.୨୦ ଲକ୍ଷ ସହାୟତା + ୯୦ ଦିନର ମନରେଗା ମଜୁରୀ',
      department: 'ଗ୍ରାମ୍ୟ ଉନ୍ନୟନ ବିଭାଗ',
      ministry: 'ଗ୍ରାମ୍ୟ ଉନ୍ନୟନ ମନ୍ତ୍ରଣାଳୟ',
      categoryName: 'ଗୃହ ନିର୍ମାଣ ଓ ଆବାସ'
    },
    'atal-pension-yojana': {
      name: 'ଅଟଳ ପେନସନ୍ ଯୋଜନା (APY)',
      shortDescription: 'ଅଣସଂଗଠିତ କ୍ଷେତ୍ରର ଶ୍ରମିକମାନଙ୍କୁ ୬୦ ବର୍ଷ ବୟସ ପରେ ଆଜୀବନ ମାସିକ ₹୧,୦୦୦ ରୁ ₹୫,୦୦୦ ପର୍ଯ୍ୟନ୍ତ ନିଶ୍ଚିତ ପେନସନ୍।',
      keyBenefit: '୬୦ ବର୍ଷ ପରେ ଆଜୀବନ ମାସିକ ₹୧,୦୦୦ - ₹୫,୦୦୦ ନିଶ୍ଚିତ ପେନସନ୍',
      department: 'ପେନସନ୍ ପାଣ୍ଠି ନିୟାମକ ଓ ବିକାଶ ପ୍ରାଧିକରଣ (PFRDA)',
      ministry: 'ଅର୍ଥ ମନ୍ତ୍ରଣାଳୟ',
      categoryName: 'ଆର୍ଥିକ ସହାୟତା ଓ ପେନସନ୍'
    },
    'naps-apprenticeship': {
      name: 'ଜାତୀୟ ଆପ୍ରେଣ୍ଟିସସିପ୍ ପ୍ରୋତ୍ସାହନ ଯୋଜନା (NAPS)',
      shortDescription: 'ଯୁବପିଢ଼ିଙ୍କୁ ଶିଳ୍ପାନୁଷ୍ଠାନରେ ପ୍ରାୟୋଗିକ ତାଲିମ ଏବଂ ମାସିକ ଷ୍ଟାଇପେଣ୍ଡରେ କେନ୍ଦ୍ର ସରକାରଙ୍କ ଆର୍ଥିକ ଭାଗିଦାରୀ।',
      keyBenefit: 'ମାସିକ ଷ୍ଟାଇପେଣ୍ଡର ୨୫% (₹୧,୫୦୦ ପର୍ଯ୍ୟନ୍ତ) ସରକାରୀ ସହାୟତା + ଜାତୀୟ ସାର୍ଟିଫିକେଟ୍',
      department: 'ଦକ୍ଷତା ବିକାଶ ଏବଂ ଉଦ୍ୟୋଗିତା ମନ୍ତ୍ରଣାଳୟ',
      ministry: 'ଦକ୍ଷତା ବିକାଶ ମନ୍ତ୍ରଣାଳୟ',
      categoryName: 'ନିଯୁକ୍ତି ଓ ଦକ୍ଷତା ବିକାଶ'
    },
    'pm-matru-vandana-yojana': {
      name: 'ପ୍ରଧାନମନ୍ତ୍ରୀ ମାତୃ ବନ୍ଦନା ଯୋଜନା (PMMVY)',
      shortDescription: 'ଗର୍ଭବତୀ ଓ ସ୍ତନ୍ୟପାନ କରାଉଥିବା ମାଆମାନଙ୍କ ପୁଷ୍ଟିକର ଖାଦ୍ୟ ଓ ସ୍ୱାସ୍ଥ୍ୟ ସୁରକ୍ଷା ପାଇଁ ₹୫,୦୦୦ ସିଧାସଳଖ ଆର୍ଥିକ ସହାୟତା।',
      keyBenefit: 'ପ୍ରଥମ ସନ୍ତାନ ଜନ୍ମ ପାଇଁ ସିଧାସଳଖ ₹୫,୦୦୦ ନଗଦ ସହାୟତା',
      department: 'ମହିଳା ଓ ଶିଶୁ ବିକାଶ ମନ୍ତ୍ରଣାଳୟ',
      ministry: 'ମହିଳା ଓ ଶିଶୁ ବିକାଶ ମନ୍ତ୍ରଣାଳୟ',
      categoryName: 'ମହିଳା ଓ ଶିଶୁ କଲ୍ୟାଣ'
    },
    'kmut-tamilnadu': {
      name: 'କଲାଇଞ୍ଜର ମହିଳା ଅଧିକାର ଯୋଜନା (KMUT)',
      shortDescription: 'ମହିଳାମାନଙ୍କ ଗୃହକର୍ମର ସମ୍ମାନ ଜଣାଇ ତାମିଲନାଡୁ ସରକାରଙ୍କ ଦ୍ୱାରା ପ୍ରତି ମାସରେ ₹୧,୦୦୦ ଆର୍ଥିକ ସହାୟତା।',
      keyBenefit: 'ପ୍ରତି ମାସରେ ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଖାତାକୁ ₹୧,୦୦୦ (ବାର୍ଷିକ ₹୧୨,୦୦୦)',
      department: 'ସ୍ୱତନ୍ତ୍ର କାର୍ଯ୍ୟକ୍ରମ ରୂପାୟନ ବିଭାଗ',
      ministry: 'ତାମିଲନାଡୁ ସରକାର',
      categoryName: 'ଆର୍ଥିକ ସହାୟତା ଓ ପେନସନ୍'
    },
    'pudhumai-penn-tamilnadu': {
      name: 'ପୁଧୁମାଇ ପେନ୍ ଯୋଜନା (ଉଚ୍ଚଶିକ୍ଷା ସୁନିଶ୍ଚିତତା)',
      shortDescription: 'ସରକାରୀ ସ୍କୁଲରେ ୬ଷ୍ଠ ରୁ ୧୨ଶ ପର୍ଯ୍ୟନ୍ତ ପଢ଼ି କଲେଜରେ ନାମ ଲେଖାଉଥିବା ଛାତ୍ରୀମାନଙ୍କୁ ପ୍ରତି ମାସରେ ₹୧,୦୦୦ ବୃତ୍ତି।',
      keyBenefit: 'ସ୍ନାତକ ସରିବା ପର୍ଯ୍ୟନ୍ତ ପ୍ରତି ମାସରେ ₹୧,୦୦୦ ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଖାତାରେ',
      department: 'ସମାଜ କଲ୍ୟାଣ ଏବଂ ମହିଳା ସଶକ୍ତିକରଣ ବିଭାଗ',
      ministry: 'ତାମିଲନାଡୁ ସରକାର',
      categoryName: 'ଶିକ୍ଷା ଓ ଛାତ୍ରବୃତ୍ତି'
    }
  }
};
