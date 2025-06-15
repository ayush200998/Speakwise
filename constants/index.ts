export const subjects = [
  "maths",
  "language",
  "science",
  "history",
  "coding",
  "economics",
];

export const subjectsV2 = [
  'Maths',
  'Language',
  'Science',
  'History',
  'Coding',
  'Economics',
  'Geography',
  'Technology',
]

export const subjectsColors = {
  science: "#E5D0FF",
  maths: "#FFDA6E",
  language: "#BDE7FF",
  coding: "#FFC8E4",
  history: "#FFECC8",
  economics: "#C8FFDF",
};

export const voices = {
  male: { 
    casual: "2BJW5coyhAzSr8STdHbE", 
    formal: "c6SfcYrb2t09NHXiT80T",
    friendly: "2BJW5coyhAzSr8STdHbE", // Maps to casual
    professional: "c6SfcYrb2t09NHXiT80T", // Maps to formal
    enthusiastic: "2BJW5coyhAzSr8STdHbE" // Maps to casual
  },
  female: { 
    casual: "ZIlrSGI4jZqobxRKprJz", 
    formal: "sarah",
    friendly: "ZIlrSGI4jZqobxRKprJz", // Maps to casual
    professional: "sarah", // Maps to formal
    enthusiastic: "ZIlrSGI4jZqobxRKprJz" // Maps to casual
  },
  neutral: { 
    casual: "ZIlrSGI4jZqobxRKprJz", 
    formal: "sarah",
    friendly: "ZIlrSGI4jZqobxRKprJz", 
    professional: "sarah", 
    enthusiastic: "ZIlrSGI4jZqobxRKprJz" 
  },
};

export const recentSessions = [
  {
    id: "1",
    subject: "science",
    name: "Neura the Brainy Explorer",
    topic: "Neural Network of the Brain",
    duration: 45,
    color: "#E5D0FF",
  },
  {
    id: "2",
    subject: "maths",
    name: "Countsy the Number Wizard",
    topic: "Derivatives & Integrals",
    duration: 30,
    color: "#FFDA6E",
  },
  {
    id: "3",
    subject: "language",
    name: "Verba the Vocabulary Builder",
    topic: "English Literature",
    duration: 30,
    color: "#BDE7FF",
  },
  {
    id: "4",
    subject: "coding",
    name: "Codey the Logic Hacker",
    topic: "Intro to If-Else Statements",
    duration: 45,
    color: "#FFC8E4",
  },
  {
    id: "5",
    subject: "history",
    name: "Memo, the Memory Keeper",
    topic: "World Wars: Causes & Consequences",
    duration: 15,
    color: "#FFECC8",
  },
  {
    id: "6",
    subject: "economics",
    name: "The Market Maestro",
    topic: "The Basics of Supply & Demand",
    duration: 10,
    color: "#C8FFDF",
  },
];

// Subject-specific border colors for enhanced UI components
export const subjectBorderColors = {
  Maths: 'border-l-indigo-500 border-t-indigo-100 dark:border-t-indigo-900',
  History: 'border-l-orange-500 border-t-orange-100 dark:border-t-orange-900',
  Science: 'border-l-teal-500 border-t-teal-100 dark:border-t-teal-900',
  Language: 'border-l-rose-500 border-t-rose-100 dark:border-t-rose-900',
  Economics: 'border-l-violet-500 border-t-violet-100 dark:border-t-violet-900',
  Geography: 'border-l-lime-500 border-t-lime-100 dark:border-t-lime-900',
  Coding: 'border-l-pink-500 border-t-pink-100 dark:border-t-pink-900',
  Technology: 'border-l-sky-500 border-t-sky-100 dark:border-t-sky-900',
  default: 'border-l-gray-500 border-t-gray-100 dark:border-t-gray-900',
}

// Subject color mapping for badges and UI elements
export const subjectColors = {
  Maths: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  History: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  Science: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Language: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  Economics: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Geography: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  Coding: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Technology: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
}

// Legacy subject colors for CompanionList (lowercase keys for backward compatibility)
export const subjectColorsLegacy = {
  science: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
  maths: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/50 dark:text-yellow-300 dark:border-yellow-800',
  language: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800',
  coding: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/50 dark:text-pink-300 dark:border-pink-800',
  history: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800',
  economics: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-300 dark:border-green-800',
  default: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/50 dark:text-gray-300 dark:border-gray-800',
}

// Vibrant background colors for subject icons in CompanionCard
export const subjectIconBackgrounds = {
  Maths: 'bg-gradient-to-br from-blue-400 to-indigo-600 shadow-lg shadow-blue-500/25',
  History: 'bg-gradient-to-br from-orange-400 to-red-500 shadow-lg shadow-orange-500/25',
  Science: 'bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/25',
  Language: 'bg-gradient-to-br from-pink-400 to-rose-600 shadow-lg shadow-pink-500/25',
  Economics: 'bg-gradient-to-br from-purple-400 to-violet-600 shadow-lg shadow-purple-500/25',
  Geography: 'bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg shadow-green-500/25',
  Coding: 'bg-gradient-to-br from-fuchsia-400 to-pink-600 shadow-lg shadow-fuchsia-500/25',
  Technology: 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/25',
  // Lowercase versions for backward compatibility
  maths: 'bg-gradient-to-br from-blue-400 to-indigo-600 shadow-lg shadow-blue-500/25',
  history: 'bg-gradient-to-br from-orange-400 to-red-500 shadow-lg shadow-orange-500/25',
  science: 'bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/25',
  language: 'bg-gradient-to-br from-pink-400 to-rose-600 shadow-lg shadow-pink-500/25',
  economics: 'bg-gradient-to-br from-purple-400 to-violet-600 shadow-lg shadow-purple-500/25',
  geography: 'bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg shadow-green-500/25',
  coding: 'bg-gradient-to-br from-fuchsia-400 to-pink-600 shadow-lg shadow-fuchsia-500/25',
  technology: 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/25',
  default: 'bg-gradient-to-br from-gray-400 to-slate-600 shadow-lg shadow-gray-500/25',
}
