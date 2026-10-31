import { Scheme, SchemeCategory } from '../types';

export const INDIAN_STATES = [
  'All States',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi (NCT)',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

export const OCCUPATIONS = [
  'Any',
  'Student',
  'Farmer / Agricultural Worker',
  'Self Employed / Artisan',
  'Daily Wage / Casual Labor',
  'Street Vendor',
  'Private Sector Employee',
  'Government Employee',
  'Unemployed / Job Seeker',
  'Homemaker',
  'Retired / Senior Citizen',
  'Small Business Owner / Entrepreneur'
];

export const EDUCATION_LEVELS = [
  'Any',
  'No Formal Education',
  'Primary School (Class 1-5)',
  'Middle School (Class 6-8)',
  'Secondary School (10th Pass)',
  'Higher Secondary (12th Pass)',
  'Diploma / ITI',
  'Undergraduate / Bachelor Degree',
  'Postgraduate / Master Degree',
  'Doctorate / Ph.D'
];

export const INITIAL_CATEGORIES: SchemeCategory[] = [
  {
    id: 'agriculture',
    name: 'Agriculture & Rural',
    description: 'Financial support, credit cards, crop insurance, and irrigation for farmers.',
    iconName: 'Wheat'
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Wellness',
    description: 'Medical coverage, subsidized treatments, maternity care, and hospital insurance.',
    iconName: 'HeartPulse'
  },
  {
    id: 'education',
    name: 'Education & Scholarships',
    description: 'Tuition support, national scholarships, hostel allowances, and study loans.',
    iconName: 'GraduationCap'
  },
  {
    id: 'women-child',
    name: 'Women & Child Welfare',
    description: 'Maternity assistance, girl child savings, women empowerment, and nutrition.',
    iconName: 'Users'
  },
  {
    id: 'housing',
    name: 'Housing & Shelter',
    description: 'Affordable urban and rural housing, home construction loans, and interest subsidies.',
    iconName: 'Home'
  },
  {
    id: 'entrepreneurship',
    name: 'Entrepreneurship & MSME',
    description: 'Collateral-free business loans, startup grants, and working capital credit.',
    iconName: 'Briefcase'
  },
  {
    id: 'employment',
    name: 'Employment & Skill Development',
    description: 'Apprenticeship stipends, technical training, job placements, and self-employment.',
    iconName: 'Wrench'
  },
  {
    id: 'financial',
    name: 'Financial Assistance & Social Security',
    description: 'Monthly pensions, life insurance, accident coverage, and DBT transfers.',
    iconName: 'Coins'
  },
  {
    id: 'senior-citizens',
    name: 'Senior Citizens Welfare',
    description: 'Old-age pensions, assisted living devices, and healthcare security for elders.',
    iconName: 'Award'
  }
];

export const INITIAL_SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan-2024',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    shortDescription: 'Income support of ₹6,000 per year in three installments directly to cultivable landholding farmer families.',
    description: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector Scheme that provides income support to all landholding farmer families in the country to supplement their financial needs for procuring various inputs related to agriculture and allied activities as well as domestic needs.',
    objective: 'To augment the income of all landholding farmers and safeguard them from resorting to moneylenders for agriculture expenditures.',
    categoryId: 'agriculture',
    categoryName: 'Agriculture & Rural',
    department: 'Department of Agriculture and Farmers Welfare',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    keyBenefit: '₹6,000 per year via direct bank transfer (3 installments of ₹2,000 each)',
    benefits: [
      'Direct Benefit Transfer (DBT) of ₹6,000 annually into bank accounts',
      'Disbursed in 3 equal installments of ₹2,000 every four months',
      'Complete transparency without middlemen or commission fees',
      'Assistance to purchase seeds, fertilizers, and modern equipment'
    ],
    eligibility: {
      minimumAge: 18,
      maximumAge: 99,
      incomeMaximum: 500000,
      incomeMinimum: 0,
      allowedStates: ['All States'],
      allowedOccupations: ['Farmer / Agricultural Worker', 'Self Employed / Artisan'],
      allowedEducationLevels: ['Any'],
      allowedGenders: ['All'],
      beneficiaryTypes: ['Farmers', 'Landholders', 'Rural Families'],
      otherRequirements: [
        'Must possess cultivable land holding in applicant\'s name',
        'Applicant or family member must not be an institutional landholder',
        'Applicant must not be a serving or retired government officer or income tax payer'
      ]
    },
    requiredDocuments: [
      'Aadhaar Card (linked with mobile number)',
      'Land Ownership / RoR (Record of Rights) Papers',
      'Bank Account Passbook (Aadhaar Seeded & NPCI Active)',
      'Valid Mobile Number'
    ],
    applicationProcess: [
      'Visit the official PM-KISAN web portal (pmkisan.gov.in) or visit nearest Common Service Centre (CSC)',
      'Click on "New Farmer Registration" under the Farmers Corner',
      'Enter Aadhaar number, state, and complete captcha verification',
      'Fill in land record details (Khasra/Khata number) and bank account details',
      'Submit the application and note the reference ID for tracking'
    ],
    applicationMethod: 'Online & Offline',
    officialUrl: 'https://pmkisan.gov.in',
    sourceName: 'Department of Agriculture & Farmers Welfare, Govt of India',
    sourceUrl: 'https://pmkisan.gov.in',
    status: 'active',
    featured: true,
    verificationStatus: 'Verified',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2025-01-10T00:00:00.000Z',
    lastVerifiedAt: '2025-01-10'
  },
  {
    id: 'pm-jay-ayushman',
    name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
    shortDescription: 'Free health coverage up to ₹5 Lakhs per family per year for secondary and tertiary hospitalization.',
    description: 'Ayushman Bharat PM-JAY is the world\'s largest government-funded health assurance scheme. It provides a health cover of ₹5 Lakhs per eligible family per year for secondary and tertiary care hospitalization across public and empanelled private hospitals in India.',
    objective: 'To reduce catastrophic out-of-pocket healthcare expenditures and ensure universal health coverage for vulnerable and low-income citizens.',
    categoryId: 'healthcare',
    categoryName: 'Healthcare & Wellness',
    department: 'National Health Authority (NHA)',
    ministry: 'Ministry of Health and Family Welfare',
    keyBenefit: 'Cashless inpatient treatment up to ₹5,00,000 per family per year',
    benefits: [
      'Health protection cover of up to ₹5,00,000 per family per year',
      'Cashless and paperless access to healthcare services at point of care',
      'Covers pre-existing conditions from Day 1 with no waiting period',
      'Covers up to 3 days of pre-hospitalization and 15 days post-hospitalization costs',
      'Portable across all empanelled hospitals throughout India'
    ],
    eligibility: {
      minimumAge: null,
      maximumAge: null,
      incomeMaximum: 300000,
      incomeMinimum: null,
      allowedStates: ['All States'],
      allowedOccupations: ['Any'],
      allowedEducationLevels: ['Any'],
      allowedGenders: ['All'],
      beneficiaryTypes: ['BPL Families', 'Low Income Families', 'Senior Citizens', 'Informal Workers'],
      otherRequirements: [
        'Family identified under Socio-Economic Caste Census (SECC 2011) or state-specific low income thresholds',
        'Senior citizens aged 70+ now eligible regardless of income under Ayushman Vay Vandana expansion'
      ]
    },
    requiredDocuments: [
      'Aadhaar Card or Ration Card (with family member list)',
      'Mobile Number',
      'Income Certificate / BPL Certificate (if required for state quota)'
    ],
    applicationProcess: [
      'Visit pmjay.gov.in or download the Ayushman App',
      'Click on "Am I Eligible" and enter your mobile number with OTP verification',
      'Search your family details by Ration Card, Aadhaar, or SECC Name',
      'Complete eKYC using Aadhaar OTP or facial authentication at nearest CSC or Empanelled Hospital',
      'Download your Ayushman Golden Card'
    ],
    applicationMethod: 'Online & Offline',
    officialUrl: 'https://pmjay.gov.in',
    sourceName: 'National Health Authority (NHA), Govt of India',
    sourceUrl: 'https://pmjay.gov.in',
    status: 'active',
    featured: true,
    verificationStatus: 'Verified',
    createdAt: '2024-01-20T00:00:00.000Z',
    updatedAt: '2025-02-01T00:00:00.000Z',
    lastVerifiedAt: '2025-02-01'
  },
  {
    id: 'sukanya-samriddhi-yojana',
    name: 'Sukanya Samriddhi Yojana (SSY)',
    shortDescription: 'High-interest, tax-free savings scheme for the girl child under the Beti Bachao Beti Padhao campaign.',
    description: 'Sukanya Samriddhi Account is a government of India backed small savings scheme designed exclusively for parents of girl children. It encourages parents to build a dedicated fund for the future education and marriage expenses of their female child.',
    objective: 'To promote the welfare of the girl child, eradicate female feticide, and secure financial support for higher education and marriage.',
    categoryId: 'women-child',
    categoryName: 'Women & Child Welfare',
    department: 'Department of Economic Affairs',
    ministry: 'Ministry of Finance',
    keyBenefit: '8.2% p.a. guaranteed interest rate + 100% Tax Exemption (EEE status)',
    benefits: [
      'High government-backed compound interest rate (8.2% per annum)',
      'Triple tax exemption (Exempt-Exempt-Exempt) under Section 80C',
      'Deposit flexibility: Minimum ₹250 up to ₹1,50,000 per financial year',
      'Partial withdrawal up to 50% permitted for higher education after age 18'
    ],
    eligibility: {
      minimumAge: 0,
      maximumAge: 10,
      incomeMaximum: null,
      incomeMinimum: null,
      allowedStates: ['All States'],
      allowedOccupations: ['Any'],
      allowedEducationLevels: ['Any'],
      allowedGenders: ['Female'],
      beneficiaryTypes: ['Girl Child', 'Parents / Legal Guardians'],
      otherRequirements: [
        'Girl child must be an Indian citizen below 10 years of age at the time of account opening',
        'Maximum 2 accounts per family (exception allowed for twins/triplets)'
      ]
    },
    requiredDocuments: [
      'Birth Certificate of the girl child',
      'Identity Proof (Aadhaar/PAN/Passport) of Parent/Guardian',
      'Address Proof of Parent/Guardian',
      'Passport size photographs of Parent and Child'
    ],
    applicationProcess: [
      'Visit any Post Office branch or authorized public/private sector bank',
      'Collect and fill the Sukanya Samriddhi Account Opening Form',
      'Attach girl child\'s birth certificate and KYC documents of parent',
      'Deposit the opening amount (minimum ₹250) in cash, cheque, or demand draft',
      'Receive the SSY passbook for future deposit tracking'
    ],
    applicationMethod: 'Offline',
    officialUrl: 'https://www.nsiindia.gov.in',
    sourceName: 'National Savings Institute, Ministry of Finance',
    sourceUrl: 'https://www.nsiindia.gov.in',
    status: 'active',
    featured: true,
    verificationStatus: 'Verified',
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2025-01-15T00:00:00.000Z',
    lastVerifiedAt: '2025-01-15'
  },
  {
    id: 'national-post-matric-scholarship',
    name: 'National Post-Matric Scholarship Scheme for Higher Education',
    shortDescription: 'Financial scholarship and maintenance allowance for students from low-income families pursuing post-matric courses.',
    description: 'A centrally sponsored scheme implemented through the National Scholarship Portal (NSP) to provide financial assistance to meritorious students belonging to disadvantaged and low-income backgrounds studying in Class 11, Class 12, ITI, Diploma, Graduation, and Post-Graduation.',
    objective: 'To reduce student dropouts at post-matric levels and empower economically challenged students to complete higher education.',
    categoryId: 'education',
    categoryName: 'Education & Scholarships',
    department: 'Ministry of Social Justice and Empowerment / Ministry of Education',
    ministry: 'Ministry of Social Justice and Empowerment',
    keyBenefit: 'Full tuition fee reimbursement + monthly maintenance allowance up to ₹13,500/yr',
    benefits: [
      'Reimbursement of non-refundable compulsory course and tuition fees',
      'Monthly maintenance allowance ranging from ₹2,500 to ₹13,500 per year',
      'Additional allowance for study tours, thesis writing, and assistive books',
      'Direct Benefit Transfer directly to the student\'s Aadhaar-linked bank account'
    ],
    eligibility: {
      minimumAge: 15,
      maximumAge: 35,
      incomeMaximum: 250000,
      incomeMinimum: 0,
      allowedStates: ['All States'],
      allowedOccupations: ['Student'],
      allowedEducationLevels: [
        'Higher Secondary (12th Pass)',
        'Diploma / ITI',
        'Undergraduate / Bachelor Degree',
        'Postgraduate / Master Degree',
        'Doctorate / Ph.D'
      ],
      allowedGenders: ['All'],
      beneficiaryTypes: ['Students', 'SC', 'ST', 'OBC', 'EWS', 'Minority'],
      otherRequirements: [
        'Must be enrolled in a recognized school, college, or university',
        'Total annual family income from all sources must not exceed ₹2.50 Lakhs',
        'Student must have passed the previous qualifying examination'
      ]
    },
    requiredDocuments: [
      'Aadhaar Card of the student',
      'Income Certificate issued by competent revenue authority',
      'Caste / Community Certificate (if applicable)',
      'Previous Year Marksheet / Degree Certificate',
      'Fee Receipt of the current academic year',
      'Student Bank Passbook copy'
    ],
    applicationProcess: [
      'Visit the National Scholarship Portal at scholarships.gov.in',
      'Click on "New Registration" and generate One Time Registration (OTR)',
      'Login with OTR credentials and fill the scholarship application form',
      'Upload required academic, income, and fee documents',
      'Submit application to your educational institution for online verification'
    ],
    applicationMethod: 'Online',
    officialUrl: 'https://scholarships.gov.in',
    sourceName: 'National Scholarship Portal, Govt of India',
    sourceUrl: 'https://scholarships.gov.in',
    status: 'active',
    featured: true,
    verificationStatus: 'Verified',
    createdAt: '2024-02-10T00:00:00.000Z',
    updatedAt: '2025-01-20T00:00:00.000Z',
    lastVerifiedAt: '2025-01-20'
  },
  {
    id: 'pm-mudra-yojana',
    name: 'Pradhan Mantri Mudra Yojana (PMMY)',
    shortDescription: 'Collateral-free business loans up to ₹10 Lakhs (and ₹20 Lakhs for Tarun Plus) for small micro-enterprises.',
    description: 'PMMY enables micro and small enterprises in manufacturing, trading, and services sectors to access institutional finance up to ₹10 Lakhs without pledging physical collateral. It offers three loan products: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 Lakhs), and Tarun (₹5 Lakhs to ₹10 Lakhs).',
    objective: 'To fund the unfunded, encourage self-employment, and facilitate formal credit to micro-entrepreneurs.',
    categoryId: 'entrepreneurship',
    categoryName: 'Entrepreneurship & MSME',
    department: 'Department of Financial Services',
    ministry: 'Ministry of Finance',
    keyBenefit: 'Collateral-free business loans up to ₹10,00,000 at competitive interest rates',
    benefits: [
      'Zero collateral or third-party guarantee required',
      'No processing fee for Shishu and Kishore loans',
      'Repayment tenure of up to 5 to 7 years with flexible moratorium',
      'Mudra Debit Card issued for convenient working capital withdrawals'
    ],
    eligibility: {
      minimumAge: 18,
      maximumAge: 65,
      incomeMaximum: null,
      incomeMinimum: null,
      allowedStates: ['All States'],
      allowedOccupations: [
        'Small Business Owner / Entrepreneur',
        'Self Employed / Artisan',
        'Street Vendor',
        'Daily Wage / Casual Labor',
        'Unemployed / Job Seeker'
      ],
      allowedEducationLevels: ['Any'],
      allowedGenders: ['All'],
      beneficiaryTypes: ['Entrepreneurs', 'Artisans', 'Shopkeepers', 'Self Employed'],
      otherRequirements: [
        'Indian citizen with a viable business plan for non-farm income generation',
        'Applicant must not have defaulted on any loan from any commercial bank'
      ]
    },
    requiredDocuments: [
      'Proof of Identity (Aadhaar, Voter ID, PAN, Driving License)',
      'Proof of Residence (Electricity bill, Ration Card, Aadhaar)',
      'Business registration / establishment proof (if existing enterprise)',
      'Project report with estimated cost and projected revenue',
      'Bank statement for the last 6 months'
    ],
    applicationProcess: [
      'Visit the Udyamimitra portal at udyamimitra.in or visit any scheduled commercial bank / NBFC',
      'Select loan category (Shishu, Kishore, or Tarun)',
      'Fill in applicant details, proposed business activity, and loan requirement',
      'Upload business proposal and KYC documents',
      'Bank officer evaluates proposal and sanctions loan'
    ],
    applicationMethod: 'Online & Offline',
    officialUrl: 'https://www.mudra.org.in',
    sourceName: 'MUDRA Limited / Dept of Financial Services, Govt of India',
    sourceUrl: 'https://www.mudra.org.in',
    status: 'active',
    featured: true,
    verificationStatus: 'Verified',
    createdAt: '2024-02-15T00:00:00.000Z',
    updatedAt: '2025-01-25T00:00:00.000Z',
    lastVerifiedAt: '2025-01-25'
  },
  {
    id: 'pm-svanidhi-scheme',
    name: 'PM Street Vendor\'s AtmaNirbhar Nidhi (PM SVANidhi)',
    shortDescription: 'Collateral-free working capital loan starting from ₹10,000 with 7% interest subsidy for street vendors.',
    description: 'PM SVANidhi is a special micro-credit facility for urban street vendors, hawkers, and thekewalas to resume their livelihoods. The scheme provides initial working capital of ₹10,000, followed by ₹20,000 on timely repayment, and ₹50,000 in the third tranche, along with digital transaction cashbacks.',
    objective: 'To facilitate affordable working capital credit, incentivize digital payments, and integrate street vendors into the formal financial ecosystem.',
    categoryId: 'employment',
    categoryName: 'Employment & Skill Development',
    department: 'Urban Poverty Alleviation Division',
    ministry: 'Ministry of Housing and Urban Affairs',
    keyBenefit: 'Collateral-free working capital credit of ₹10,000 to ₹50,000 with 7% interest subsidy',
    benefits: [
      'Initial working capital loan of ₹10,000 without any physical security',
      'Subsequent loan tranches of ₹20,000 and ₹50,000 upon timely repayment',
      '7% interest subsidy credited directly to bank account quarterly',
      'Monthly cashback up to ₹100 for digital transactions'
    ],
    eligibility: {
      minimumAge: 18,
      maximumAge: 70,
      incomeMaximum: 300000,
      incomeMinimum: null,
      allowedStates: ['All States'],
      allowedOccupations: ['Street Vendor', 'Self Employed / Artisan', 'Daily Wage / Casual Labor'],
      allowedEducationLevels: ['Any'],
      allowedGenders: ['All'],
      beneficiaryTypes: ['Street Vendors', 'Hawkers', 'Informal Workers'],
      otherRequirements: [
        'Vendors possessed of Certificate of Vending or Identity Card issued by Urban Local Bodies (ULBs)',
        'Or vendors identified in ULB survey or recommendation letter from Town Vending Committee (TVC)'
      ]
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Voter Identity Card',
      'Vending Certificate / Letter of Recommendation from ULB/Town Vending Committee',
      'Aadhaar-seeded Bank Account Passbook'
    ],
    applicationProcess: [
      'Visit pmsvanidhi.mohua.gov.in or consult your local municipality / Common Service Centre',
      'Log in with your Aadhaar linked mobile number',
      'Verify whether your name exists in the ULB street vendor survey list',
      'Select preferred lending institution and submit loan request',
      'Bank dispatches loan directly into your bank account within 10-15 working days'
    ],
    applicationMethod: 'Online & Offline',
    officialUrl: 'https://pmsvanidhi.mohua.gov.in',
    sourceName: 'Ministry of Housing and Urban Affairs, Govt of India',
    sourceUrl: 'https://pmsvanidhi.mohua.gov.in',
    status: 'active',
    featured: false,
    verificationStatus: 'Verified',
    createdAt: '2024-03-01T00:00:00.000Z',
    updatedAt: '2025-01-30T00:00:00.000Z',
    lastVerifiedAt: '2025-01-30'
  },
  {
    id: 'pm-awas-yojana-gramin',
    name: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
    shortDescription: 'Financial assistance of ₹1.20 Lakh to ₹1.30 Lakh for building pucca houses with clean cooking and toilet facilities.',
    description: 'PMAY-G aims to provide a pucca house with basic amenities to all rural houseless households and those living in kutcha and dilapidated houses. Beneficiaries also receive 90-95 days of unskilled labor wages under MGNREGA and ₹12,000 assistance for toilet construction under Swachh Bharat Mission.',
    objective: 'To achieve "Housing for All" in rural areas by constructing durable, safe, and hygienic homes.',
    categoryId: 'housing',
    categoryName: 'Housing & Shelter',
    department: 'Rural Housing Division',
    ministry: 'Ministry of Rural Development',
    keyBenefit: 'Financial grant up to ₹1,30,000 directly for pucca house construction',
    benefits: [
      'Direct grant of ₹1,20,000 in plain areas and ₹1,30,000 in hilly/difficult/IAP districts',
      'Additional ₹12,000 assistance for construction of household latrine under SBM-G',
      'Entitlement of 90-95 days of unskilled wage employment under MGNREGA (approx ₹18,000-₹22,000)',
      'Free LPG gas connection under PM Ujjwala Yojana and electricity connection'
    ],
    eligibility: {
      minimumAge: 18,
      maximumAge: null,
      incomeMaximum: 250000,
      incomeMinimum: null,
      allowedStates: ['All States'],
      allowedOccupations: ['Any'],
      allowedEducationLevels: ['Any'],
      allowedGenders: ['All'],
      beneficiaryTypes: ['Rural Families', 'BPL Families', 'Houseless Citizens', 'SC/ST Families'],
      otherRequirements: [
        'Family must not own a pucca house anywhere in India',
        'Selection prioritized from Socio-Economic Caste Census (SECC 2011) / Awaas+ list',
        'No member of family should own a motorized 3-wheel or 4-wheel vehicle or mechanized farm equipment'
      ]
    },
    requiredDocuments: [
      'Aadhaar Card of all family members',
      'Bank Account Passbook (DBT/NPCI enabled)',
      'MGNREGA Job Card Number',
      'Land Ownership document or Gram Panchayat consent letter',
      'Mobile Number'
    ],
    applicationProcess: [
      'Verify name in Gram Panchayat Awaas+ priority beneficiary list',
      'Gram Sevak or Panchayat Secretary uploads beneficiary details on AwaasSoft portal',
      'Geo-tagged photo of existing kutcha house is uploaded by authorized field inspector',
      'Upon sanction, installments are released directly into bank account at foundation, lintel, and roof stages',
      'Track status online on pmayg.nic.in with registration number'
    ],
    applicationMethod: 'Online & Offline',
    officialUrl: 'https://pmayg.nic.in',
    sourceName: 'Ministry of Rural Development, Govt of India',
    sourceUrl: 'https://pmayg.nic.in',
    status: 'active',
    featured: true,
    verificationStatus: 'Verified',
    createdAt: '2024-03-05T00:00:00.000Z',
    updatedAt: '2025-02-05T00:00:00.000Z',
    lastVerifiedAt: '2025-02-05'
  },
  {
    id: 'atal-pension-yojana',
    name: 'Atal Pension Yojana (APY)',
    shortDescription: 'Guaranteed lifetime monthly pension of ₹1,000 to ₹5,000 after age 60 for unorganized sector workers.',
    description: 'Atal Pension Yojana is a government-backed periodic pension scheme targeted at workers in the unorganized sector. Under APY, subscribers receive a guaranteed minimum monthly pension ranging from ₹1,000 to ₹5,000 per month upon reaching 60 years of age, depending on their contributions.',
    objective: 'To provide universal old-age financial security and dignified retirement to workers without formal pension coverage.',
    categoryId: 'financial',
    categoryName: 'Financial Assistance & Social Security',
    department: 'Pension Fund Regulatory and Development Authority (PFRDA)',
    ministry: 'Ministry of Finance',
    keyBenefit: 'Guaranteed monthly pension of ₹1,000 to ₹5,000 for lifetime after age 60',
    benefits: [
      'Government-guaranteed pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month from age 60',
      'Spouse receives the exact same pension amount for lifetime upon demise of subscriber',
      'Entire accumulated pension wealth returned to nominee upon demise of both subscriber and spouse',
      'Tax deduction benefits under Section 80CCD'
    ],
    eligibility: {
      minimumAge: 18,
      maximumAge: 40,
      incomeMaximum: null,
      incomeMinimum: null,
      allowedStates: ['All States'],
      allowedOccupations: [
        'Farmer / Agricultural Worker',
        'Daily Wage / Casual Labor',
        'Self Employed / Artisan',
        'Street Vendor',
        'Private Sector Employee',
        'Homemaker',
        'Unemployed / Job Seeker'
      ],
      allowedEducationLevels: ['Any'],
      allowedGenders: ['All'],
      beneficiaryTypes: ['Informal Workers', 'Self Employed', 'Low Income Earners'],
      otherRequirements: [
        'Citizen of India aged between 18 and 40 years',
        'Must hold a valid savings bank account or Post Office savings account',
        'Must not be an income tax payer as per APY guidelines effective Oct 2022'
      ]
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Savings Bank Account Passbook (with auto-debit consent)',
      'Nominee Details and relationship proof',
      'Active Mobile Number'
    ],
    applicationProcess: [
      'Visit your bank branch where you have a savings account or access internet banking',
      'Submit the APY registration form with choice of monthly pension (₹1,000 to ₹5,000)',
      'Provide auto-debit authorization from your savings bank account',
      'Provide spouse and nominee details',
      'Receive your Permanent Retirement Account Number (PRAN) acknowledgment via SMS'
    ],
    applicationMethod: 'Online & Offline',
    officialUrl: 'https://www.npscra.nsdl.co.in',
    sourceName: 'PFRDA / National Pension System Trust',
    sourceUrl: 'https://www.npscra.nsdl.co.in',
    status: 'active',
    featured: false,
    verificationStatus: 'Verified',
    createdAt: '2024-03-10T00:00:00.000Z',
    updatedAt: '2025-02-10T00:00:00.000Z',
    lastVerifiedAt: '2025-02-10'
  },
  {
    id: 'naps-apprenticeship',
    name: 'National Apprenticeship Promotion Scheme (NAPS)',
    shortDescription: 'Government stipend support of ₹1,500/month with industry on-the-job training for youth and graduates.',
    description: 'NAPS promotes apprenticeship training across industrial sectors by reimbursing 25% of prescribed stipend up to ₹1,500 per month per apprentice directly to the apprentice bank account through DBT, empowering youth with industry-ready practical skills.',
    objective: 'To increase the engagement of apprentices, bridge skill gaps, and enhance employability among youth.',
    categoryId: 'employment',
    categoryName: 'Employment & Skill Development',
    department: 'Directorate General of Training',
    ministry: 'Ministry of Skill Development and Entrepreneurship',
    keyBenefit: 'Monthly stipend DBT support up to ₹1,500 + hands-on corporate industry experience',
    benefits: [
      'Direct Benefit Transfer of monthly stipend support directly into apprentice bank account',
      'Nationally recognized National Apprenticeship Certificate (NAC) upon completion',
      'Direct industrial exposure and job placement opportunities in leading enterprises',
      'Structured technical learning modules aligned to National Skills Qualifications Framework'
    ],
    eligibility: {
      minimumAge: 14,
      maximumAge: 35,
      incomeMaximum: null,
      incomeMinimum: null,
      allowedStates: ['All States'],
      allowedOccupations: ['Student', 'Unemployed / Job Seeker'],
      allowedEducationLevels: [
        'Secondary School (10th Pass)',
        'Higher Secondary (12th Pass)',
        'Diploma / ITI',
        'Undergraduate / Bachelor Degree',
        'Postgraduate / Master Degree'
      ],
      allowedGenders: ['All'],
      beneficiaryTypes: ['Students', 'Job Seekers', 'Youth'],
      otherRequirements: [
        'Candidate must have completed minimum age requirement (14 for non-hazardous, 18 for hazardous)',
        'Must have completed minimum educational qualification specified for the designated or optional trade'
      ]
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Educational Certificates / 10th / 12th / ITI / Degree marksheets',
      'Bank Account details (Aadhaar linked)',
      'Recent Passport Photograph'
    ],
    applicationProcess: [
      'Register on the Apprenticeship India Portal (apprenticeshipindia.gov.in)',
      'Complete eKYC and profile information (qualifications and trade preferences)',
      'Search for apprenticeship opportunities by location, sector, and trade',
      'Apply to preferred companies and attend interview or assessment',
      'Sign digital apprenticeship contract online'
    ],
    applicationMethod: 'Online',
    officialUrl: 'https://www.apprenticeshipindia.gov.in',
    sourceName: 'Ministry of Skill Development and Entrepreneurship, Govt of India',
    sourceUrl: 'https://www.apprenticeshipindia.gov.in',
    status: 'active',
    featured: false,
    verificationStatus: 'Verified',
    createdAt: '2024-03-12T00:00:00.000Z',
    updatedAt: '2025-02-12T00:00:00.000Z',
    lastVerifiedAt: '2025-02-12'
  },
  {
    id: 'pm-matru-vandana-yojana',
    name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    shortDescription: 'Cash incentive of ₹5,000 for pregnant women and lactating mothers for health checkups and nutrition.',
    description: 'PMMVY provides financial assistance of ₹5,000 in two installments to eligible pregnant women and lactating mothers for the birth of the first child, and ₹6,000 in a single installment for the second child if it is a girl, promoting institutional deliveries and nutrition.',
    objective: 'To compensate for wage loss, ensure adequate nutrition, and promote institutional deliveries for mothers and infants.',
    categoryId: 'women-child',
    categoryName: 'Women & Child Welfare',
    department: 'Women and Child Development',
    ministry: 'Ministry of Women and Child Development',
    keyBenefit: 'Direct cash assistance of ₹5,000 to ₹6,000 into Aadhaar-linked bank account',
    benefits: [
      '₹5,000 direct cash transfer for first child (in 2 installments on early registration & antenatal checkup)',
      '₹6,000 incentive on birth of second child if the infant is female',
      'Promotes safe institutional deliveries, immunization, and infant nutrition',
      'Paid directly to woman\'s bank account via DBT without intermediaries'
    ],
    eligibility: {
      minimumAge: 19,
      maximumAge: 45,
      incomeMaximum: 800000,
      incomeMinimum: null,
      allowedStates: ['All States'],
      allowedOccupations: ['Any'],
      allowedEducationLevels: ['Any'],
      allowedGenders: ['Female'],
      beneficiaryTypes: ['Women', 'Mothers', 'Low Income Families', 'BPL Families'],
      otherRequirements: [
        'Pregnant women and lactating mothers aged 19 years and above',
        'Not in regular employment with Central/State Government or Public Sector Undertakings (PSUs)',
        'Family income within ₹8 Lakhs or belonging to socially/economically disadvantaged categories'
      ]
    },
    requiredDocuments: [
      'Mother and Child Protection (MCP) Card',
      'Aadhaar Card of the beneficiary woman and her husband',
      'Aadhaar-seeded Bank / Post Office Account Passbook',
      'Eligibility proof (EWS/Ration Card/MNREGA card/e-Shram card if applicable)'
    ],
    applicationProcess: [
      'Register at the nearest Anganwadi Centre (AWC) or approved health facility',
      'Or apply online on the PMMVY Citizen Portal (pmmvy.wcd.gov.in)',
      'Fill Form 1A with MCP Card details within 150 days of LMP (Last Menstrual Period)',
      'Submit Form 1B following at least one Antenatal Checkup (ANC)',
      'Installments are transferred directly through DBT'
    ],
    applicationMethod: 'Online & Offline',
    officialUrl: 'https://pmmvy.wcd.gov.in',
    sourceName: 'Ministry of Women and Child Development, Govt of India',
    sourceUrl: 'https://pmmvy.wcd.gov.in',
    status: 'active',
    featured: false,
    verificationStatus: 'Verified',
    createdAt: '2024-03-15T00:00:00.000Z',
    updatedAt: '2025-02-15T00:00:00.000Z',
    lastVerifiedAt: '2025-02-15'
  },
  {
    id: 'kmut-tamilnadu',
    name: 'Kalaignar Magalir Urimai Thogai Thittam (KMUT)',
    shortDescription: 'Monthly financial grant of ₹1,000 directly deposited into bank accounts of eligible women heads of families in Tamil Nadu.',
    description: 'Kalaignar Magalir Urimai Thogai Thittam is a flagship universal basic income initiative by the Government of Tamil Nadu acknowledging the unpaid care work and economic contribution of women. Eligible women heads of households receive ₹1,000 every month directly through Direct Benefit Transfer (DBT).',
    objective: 'To provide social security, financial autonomy, and dignity to women heads of families in Tamil Nadu.',
    categoryId: 'women-child',
    categoryName: 'Women & Child Welfare',
    department: 'Special Programme Implementation Department',
    ministry: 'Government of Tamil Nadu',
    keyBenefit: '₹1,000 per month directly deposited into beneficiary woman\'s bank account',
    benefits: [
      'Guaranteed monthly cash assistance of ₹1,000 via DBT on the 15th of every month',
      'Encourages financial independence and domestic economic decision-making for women',
      'No physical cash handling; direct bank transfer with SMS notification',
      'Assists in meeting essential household nutritional, medical, and educational needs'
    ],
    eligibility: {
      minimumAge: 21,
      maximumAge: null,
      incomeMaximum: 250000,
      incomeMinimum: null,
      allowedStates: ['Tamil Nadu'],
      allowedOccupations: ['Any', 'Homemaker', 'Daily Wage / Casual Labor', 'Self Employed / Artisan'],
      allowedEducationLevels: ['Any'],
      allowedGenders: ['Female'],
      beneficiaryTypes: ['Women', 'Homemakers', 'Low Income Families'],
      otherRequirements: [
        'Must be a permanent resident of Tamil Nadu with valid Family Smart Ration Card',
        'Annual household income must be less than ₹2.5 Lakhs per year',
        'Annual household electricity consumption should be below 3,600 units',
        'Household should not own more than 5 acres of wetland or 10 acres of dryland',
        'No family member should be a regular government employee or income tax payee'
      ]
    },
    requiredDocuments: [
      'Smart Family Ration Card (showing applicant as woman head of family)',
      'Aadhaar Card (linked with mobile number)',
      'Bank Account Passbook (Aadhaar Seeded)',
      'Electricity Bill (Consumer Number)'
    ],
    applicationProcess: [
      'Obtain KMUT application token from local fair price ration shop or e-Sevai centre',
      'Attend the designated ward/village registration camp with required documents',
      'Biometric / OTP e-KYC verification is completed by the government camp volunteer',
      'Application is scrutinized through field verification and database matching',
      'Approval SMS is sent to registered mobile number; monthly DBT starts on 15th of each month'
    ],
    applicationMethod: 'Online & Offline',
    officialUrl: 'https://kmut.tn.gov.in',
    sourceName: 'Government of Tamil Nadu',
    sourceUrl: 'https://kmut.tn.gov.in',
    status: 'active',
    featured: true,
    verificationStatus: 'Verified',
    createdAt: '2024-01-10T00:00:00.000Z',
    updatedAt: '2025-02-10T00:00:00.000Z',
    lastVerifiedAt: '2025-02-10'
  },
  {
    id: 'pudhumai-penn-tamilnadu',
    name: 'Pudhumai Penn Scheme (Moovalur Ramamirtham Ammaiyar Higher Education)',
    shortDescription: 'Monthly financial assistance of ₹1,000 for female students who studied from Class 6 to 12 in Tamil Nadu Government Schools pursuing higher education.',
    description: 'Under the Pudhumai Penn Scheme, female students who completed their schooling from 6th to 12th standard in Tamil Nadu Government schools receive ₹1,000 per month until the completion of their undergraduate degree, diploma, or ITI course.',
    objective: 'To drastically reduce female student dropout rates after 12th standard and ensure equitable access to higher collegiate and technical education.',
    categoryId: 'education',
    categoryName: 'Education & Scholarships',
    department: 'Social Welfare and Women Empowerment Department',
    ministry: 'Government of Tamil Nadu',
    keyBenefit: '₹1,000 monthly educational stipend throughout the college course duration',
    benefits: [
      'Direct monthly deposit of ₹1,000 into the student\'s individual bank account',
      'Available for full course duration (Degree, Engineering, Medical, Diploma, ITI)',
      'Can be availed in addition to other government merit/community scholarships',
      'Transferred directly via DBT on a monthly schedule'
    ],
    eligibility: {
      minimumAge: 17,
      maximumAge: 25,
      incomeMaximum: null,
      incomeMinimum: null,
      allowedStates: ['Tamil Nadu'],
      allowedOccupations: ['Student'],
      allowedEducationLevels: [
        'Higher Secondary (12th Pass)',
        'Diploma / ITI',
        'Undergraduate / Bachelor Degree'
      ],
      allowedGenders: ['Female'],
      beneficiaryTypes: ['Students', 'Girls', 'Government School Alumni'],
      otherRequirements: [
        'Must have studied continuously from Class 6 to Class 12 in Tamil Nadu Government schools',
        'Must be admitted to a recognized undergraduate degree, polytechnic diploma, or ITI course in Tamil Nadu'
      ]
    },
    requiredDocuments: [
      'School Study Certificate / TC proving Class 6 to 12 in Govt School',
      'Higher Secondary (12th) Mark Sheet',
      'College Admission / Identity Card',
      'Student\'s Individual Aadhaar-linked Bank Account Passbook'
    ],
    applicationProcess: [
      'Apply online through the institutional login at pudhumaipenn.tn.gov.in',
      'College nodal officer verifies school TC and admission records',
      'District Social Welfare Officer sanctions the application',
      'Funds are disbursed directly to student\'s bank account every month'
    ],
    applicationMethod: 'Online',
    officialUrl: 'https://pudhumaipenn.tn.gov.in',
    sourceName: 'Department of Social Welfare, Govt of Tamil Nadu',
    sourceUrl: 'https://pudhumaipenn.tn.gov.in',
    status: 'active',
    featured: true,
    verificationStatus: 'Verified',
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2025-02-15T00:00:00.000Z',
    lastVerifiedAt: '2025-02-15'
  }
];
