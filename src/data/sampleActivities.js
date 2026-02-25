// Sample activities data for initial setup
// In production, these would be stored in Firestore

export const sampleActivities = [
  {
    title: "Watch & Wonder Together",
    duration: 15,
    prepLevel: "Low",
    description: "Pick a short video or TV episode to watch together (animal documentary, animated show, etc.). Pause periodically to discuss emotions you see.",
    skills: ["Social Awareness", "Responsible Decision-Making"],
    scenarios: ["Free Time", "After School", "Weekend Morning"],
    timeWindows: ["Evenings", "Weekends"],
    activityTypes: ["Conversation", "Storytelling"],
    instructions: "1. Choose a short video (5-10 minutes) that shows characters or animals expressing emotions.\n2. Watch together and pause every 2-3 minutes.\n3. Ask: 'What feeling do you think that character has? How can you tell?'\n4. Let your child answer first, then share your observations.",
    reflectionPrompts: [
      "How could you tell what feeling that was?",
      "Do different people show the same feeling in different ways?",
      "Have you felt this way before?"
    ],
    childReflectionQuestions: [
      "What did you learn about reading emotions?",
      "Which feelings were easiest to guess?"
    ],
    parentReflectionQuestions: [
      "Did they pick up on subtle cues?",
      "What emotions came up naturally?",
      "How can this help in real situations?"
    ]
  },
  {
    title: "Role Swap Conflict",
    duration: 10,
    prepLevel: "Medium",
    description: "Think of a recent disagreement. Act it out, but swap roles—you play your child, and they play you.",
    skills: ["Relationship Skills", "Social Awareness"],
    scenarios: ["Free Time", "After School", "Weekend Morning"],
    timeWindows: ["Evenings", "Weekends"],
    activityTypes: ["Role-Play", "Conversation"],
    instructions: "1. Think of a recent small disagreement or conflict.\n2. Explain: 'Let's act this out, but you'll be me and I'll be you.'\n3. Act out the scenario with swapped roles.\n4. Afterward, discuss: 'How did it feel to be in my shoes?'",
    reflectionPrompts: [
      "What was it like to see things from the other person's perspective?",
      "Did you notice anything new about the situation?",
      "How might this help us understand each other better?"
    ],
    childReflectionQuestions: [
      "What did you learn from swapping roles?",
      "Was it hard or easy to play the other person?"
    ],
    parentReflectionQuestions: [
      "What surprised you about their portrayal of you?",
      "Did this reveal anything about how they see you?",
      "How can we use this understanding?"
    ]
  },
  {
    title: "Gratitude Scavenger Hunt",
    duration: 10,
    prepLevel: "Low",
    description: "Take a walk together and find things you're grateful for. Take turns sharing what you notice.",
    skills: ["Self-Awareness", "Social Awareness"],
    scenarios: ["On the Way to School", "After School", "Outdoor"],
    timeWindows: ["After School", "Weekends"],
    activityTypes: ["Outdoor", "Conversation"],
    instructions: "1. Go for a short walk together (around the block, in a park, or even around your home).\n2. Take turns pointing out things you're grateful for.\n3. Try to notice different types: nature, people, objects, experiences.\n4. Share why each thing matters to you.",
    reflectionPrompts: [
      "What made you feel grateful today?",
      "Did you notice things you usually take for granted?",
      "How did it feel to share gratitude together?"
    ],
    childReflectionQuestions: [
      "What was your favorite thing you found?",
      "Did this change how you see things around you?"
    ],
    parentReflectionQuestions: [
      "What did they notice that surprised you?",
      "How did practicing gratitude together feel?",
      "What can we do to remember these moments?"
    ]
  },
  {
    title: "Draw a Place That Feels Safe",
    duration: 12,
    prepLevel: "Low",
    description: "Both of you draw a place where you feel safe and calm. Share your drawings and talk about what makes these places special.",
    skills: ["Self-Awareness", "Self-Management"],
    scenarios: ["Bedtime", "Free Time", "Weekend Morning"],
    timeWindows: ["Evenings", "Weekends"],
    activityTypes: ["Arts & Crafts", "Conversation"],
    instructions: "1. Get paper and drawing supplies.\n2. Set a timer for 5 minutes.\n3. Each person draws a place where they feel safe and calm.\n4. Share your drawings and explain what makes these places special.\n5. Discuss: 'What can we do to feel this way more often?'",
    reflectionPrompts: [
      "What makes your safe place feel that way?",
      "Can we create moments of safety in our daily life?",
      "How does thinking about safe places help when you're worried?"
    ],
    childReflectionQuestions: [
      "What did you draw and why?",
      "How do you feel when you think about your safe place?"
    ],
    parentReflectionQuestions: [
      "What did their drawing reveal about what makes them feel secure?",
      "How can we incorporate elements of safety into our routine?",
      "What did you learn about their needs?"
    ]
  },
  {
    title: "Emotion Charades",
    duration: 10,
    prepLevel: "Low",
    description: "Take turns acting out different emotions without words. The other person guesses what emotion you're showing.",
    skills: ["Social Awareness", "Self-Awareness"],
    scenarios: ["Free Time", "After School", "Mealtime"],
    timeWindows: ["After School", "Evenings"],
    activityTypes: ["Games", "Role-Play"],
    instructions: "1. Write down emotions on small pieces of paper (happy, sad, angry, excited, worried, proud, etc.).\n2. Take turns picking a paper and acting out that emotion.\n3. The other person guesses the emotion.\n4. After guessing, discuss: 'When have you felt this way?'",
    reflectionPrompts: [
      "What clues helped you guess the emotion?",
      "Are some emotions easier to show than others?",
      "How do our bodies show emotions?"
    ],
    childReflectionQuestions: [
      "Which emotion was easiest to act out?",
      "Which was hardest? Why?"
    ],
    parentReflectionQuestions: [
      "What did you notice about how they express emotions?",
      "Did this reveal anything about their emotional awareness?",
      "How can we use body language to understand each other better?"
    ]
  },
  {
    title: "Mindful Breathing Together",
    duration: 8,
    prepLevel: "Low",
    description: "Sit together and practice breathing exercises. Count breaths and notice how your body feels.",
    skills: ["Self-Management", "Self-Awareness"],
    scenarios: ["Bedtime", "Free Time", "Weekend Morning"],
    timeWindows: ["Evenings", "Weekends"],
    activityTypes: ["Mindfulness"],
    instructions: "1. Find a comfortable place to sit together.\n2. Close your eyes or look at something calming.\n3. Breathe in slowly for 4 counts, hold for 2, breathe out for 4.\n4. Do this 5 times together.\n5. Afterward, share: 'How does your body feel now?'",
    reflectionPrompts: [
      "What did you notice about your breathing?",
      "How did your body feel before and after?",
      "When might this be helpful?"
    ],
    childReflectionQuestions: [
      "Did this help you feel calmer?",
      "What did you notice?"
    ],
    parentReflectionQuestions: [
      "How did they respond to the breathing exercise?",
      "What moments might benefit from this practice?",
      "How can we make this a regular habit?"
    ]
  }
];
