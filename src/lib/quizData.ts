export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export const skillQuizzes: Record<string, QuizQuestion[]> = {
  Plumbing: [
    { question: "What tool is commonly used to fix pipe leaks?", options: ["Hammer", "Pipe wrench", "Screwdriver", "Chisel"], correctIndex: 1 },
    { question: "What is pipe fitting?", options: ["Painting pipes", "Connecting pipes and fixtures", "Breaking pipes", "Measuring rooms"], correctIndex: 1 },
    { question: "Which material is commonly used for water supply pipes?", options: ["Wood", "PVC / Copper", "Glass", "Concrete"], correctIndex: 1 },
    { question: "What safety gear should a plumber always wear?", options: ["Tie and suit", "Gloves and safety glasses", "Headphones", "Sandals"], correctIndex: 1 },
    { question: "What does a P-trap do?", options: ["Traps pests", "Prevents sewer gases from entering", "Stores water", "Heats water"], correctIndex: 1 },
  ],
  Electrical: [
    { question: "What is voltage?", options: ["Speed of current", "Electrical pressure/force", "Wire thickness", "Light brightness"], correctIndex: 1 },
    { question: "What safety device prevents circuit overloads?", options: ["Switch", "Bulb", "Circuit breaker / Fuse", "Plug"], correctIndex: 2 },
    { question: "Which wire color is typically used for ground/earth?", options: ["Red", "Blue", "Green/Yellow", "Black"], correctIndex: 2 },
    { question: "What should you always do before working on electrical wiring?", options: ["Wet your hands", "Turn off the power", "Stand on metal", "Work barefoot"], correctIndex: 1 },
    { question: "What unit measures electrical current?", options: ["Volts", "Watts", "Amperes", "Ohms"], correctIndex: 2 },
  ],
  Welding: [
    { question: "What is the primary purpose of a welding helmet?", options: ["Style", "Protect eyes from arc flash", "Keep hair tidy", "Communication"], correctIndex: 1 },
    { question: "Which gas is commonly used in MIG welding?", options: ["Oxygen", "Nitrogen", "Argon / CO2", "Helium"], correctIndex: 2 },
    { question: "What does MIG stand for?", options: ["Metal Inert Gas", "Manual Iron Grip", "Micro Ignition Gun", "Metal Iron Glow"], correctIndex: 0 },
    { question: "What PPE is essential for welding?", options: ["Sunglasses", "Leather gloves and apron", "Shorts", "Sandals"], correctIndex: 1 },
    { question: "What type of joint connects two pieces at a right angle?", options: ["Butt joint", "Lap joint", "T-joint", "Edge joint"], correctIndex: 2 },
  ],
  Carpentry: [
    { question: "What tool is used to measure angles in woodwork?", options: ["Tape measure", "Protractor / Bevel gauge", "Hammer", "Saw"], correctIndex: 1 },
    { question: "What is a mortise and tenon?", options: ["A type of wood stain", "A wood joint", "A cutting tool", "A type of tree"], correctIndex: 1 },
    { question: "Which saw is best for curved cuts?", options: ["Crosscut saw", "Jigsaw / Coping saw", "Rip saw", "Hacksaw"], correctIndex: 1 },
    { question: "What does sanding do to wood?", options: ["Makes it wet", "Smooths the surface", "Adds color", "Makes it heavier"], correctIndex: 1 },
    { question: "What safety equipment should a carpenter wear?", options: ["Tie", "Safety goggles and ear protection", "Flip flops", "Jewelry"], correctIndex: 1 },
  ],
  Cooking: [
    { question: "What temperature should a fridge be set to?", options: ["10°C", "0-4°C", "20°C", "-10°C"], correctIndex: 1 },
    { question: "What is cross-contamination?", options: ["Mixing spices", "Spreading bacteria between foods", "Overcooking", "Using two pots"], correctIndex: 1 },
    { question: "Which oil has the highest smoke point?", options: ["Olive oil", "Butter", "Avocado oil", "Coconut oil"], correctIndex: 2 },
    { question: "What is the correct way to check meat is cooked?", options: ["By color alone", "Using a meat thermometer", "Pressing it", "Smelling it"], correctIndex: 1 },
    { question: "What does FIFO mean in kitchen management?", options: ["First In, First Out", "Fast In, Fast Out", "Food Is For Others", "Fresh Is Fine Only"], correctIndex: 0 },
  ],
  Masonry: [
    { question: "What is the primary binding material in masonry?", options: ["Water", "Cement mortar", "Glue", "Sand"], correctIndex: 1 },
    { question: "What tool is used to spread mortar?", options: ["Shovel", "Trowel", "Hammer", "Pliers"], correctIndex: 1 },
    { question: "What is a spirit level used for?", options: ["Mixing cement", "Checking if surface is level", "Cutting bricks", "Measuring weight"], correctIndex: 1 },
    { question: "What ratio of cement to sand is commonly used?", options: ["1:1", "1:3 or 1:4", "1:10", "5:1"], correctIndex: 1 },
    { question: "What PPE is needed for masonry work?", options: ["Suit", "Hard hat, gloves, boots", "Sandals", "Shorts"], correctIndex: 1 },
  ],
};

export function getQuizForSkill(skillCategory: string): QuizQuestion[] {
  const normalized = Object.keys(skillQuizzes).find(
    (k) => k.toLowerCase() === skillCategory.toLowerCase()
  );
  if (normalized) return skillQuizzes[normalized];
  // Default generic quiz
  return [
    { question: "Why is safety important in your trade?", options: ["It's not important", "Prevents injuries and accidents", "It slows you down", "Only for beginners"], correctIndex: 1 },
    { question: "What should you do before starting a job?", options: ["Start immediately", "Assess the task and prepare tools", "Call a friend", "Take a nap"], correctIndex: 1 },
    { question: "How do you handle a client complaint?", options: ["Ignore it", "Listen and resolve professionally", "Argue back", "Leave the job"], correctIndex: 1 },
    { question: "What does quality workmanship mean?", options: ["Finishing fast", "Doing work to a high standard", "Using cheap materials", "Skipping steps"], correctIndex: 1 },
    { question: "Why is it important to keep your tools maintained?", options: ["It's not", "Ensures safety and efficiency", "For show", "To sell them"], correctIndex: 1 },
  ];
}
