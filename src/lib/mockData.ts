export interface Job {
  id: string;
  title: string;
  employer: string;
  location: string;
  pay: string;
  category: string;
  urgency: "urgent" | "normal" | "flexible";
  postedAt: string;
  description: string;
  skills: string[];
}

export interface Worker {
  id: string;
  name: string;
  skills: string[];
  rating: number;
  completedJobs: number;
  location: string;
  verified: boolean;
  reputationScore: number;
  avatar: string;
  bio: string;
}

export const CATEGORIES = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "Masonry",
  "Welding",
  "Cleaning",
  "Transport",
  "General Labour",
  "Cooking",
  "Laundry",
  "Jua Kali",
];

export const SKILL_CATEGORIES = [
  "Washing & Laundry",
  "Cooking & Catering",
  "Jua Kali",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "Masonry",
  "Welding",
  "Cleaning",
  "Transport",
  "Gardening",
];

export interface SkilledWorker {
  id: string;
  name: string;
  phone: string;
  location: string;
  experience: string;
  skills: string[];
  category: string;
  rating: number;
  bio: string;
}

export const skilledWorkers: SkilledWorker[] = [
  {
    id: "sw1",
    name: "Atieno Akinyi",
    phone: "0712 345 678",
    location: "Kibera, Nairobi",
    experience: "6 years",
    skills: ["Washing", "Ironing", "Dry cleaning"],
    category: "Washing & Laundry",
    rating: 4.7,
    bio: "Reliable laundry specialist. I handle everything from delicate fabrics to heavy bedding.",
  },
  {
    id: "sw2",
    name: "Wafula Barasa",
    phone: "0723 456 789",
    location: "Eastleigh, Nairobi",
    experience: "10 years",
    skills: ["Welding", "Metal fabrication", "Gate installation"],
    category: "Jua Kali",
    rating: 4.9,
    bio: "Jua kali artisan specializing in metal gates, windows, and burglar proofing.",
  },
  {
    id: "sw3",
    name: "Njeri Wambui",
    phone: "0734 567 890",
    location: "Kangemi, Nairobi",
    experience: "8 years",
    skills: ["Kenyan cuisine", "Catering", "Baking"],
    category: "Cooking & Catering",
    rating: 4.8,
    bio: "Professional cook experienced in large events, home cooking, and Kenyan traditional dishes.",
  },
  {
    id: "sw4",
    name: "Odhiambo Onyango",
    phone: "0745 678 901",
    location: "Umoja, Nairobi",
    experience: "12 years",
    skills: ["Plumbing", "Pipe fitting", "Water tank installation"],
    category: "Plumbing",
    rating: 4.6,
    bio: "Master plumber with over a decade of experience fixing leaks, installing tanks, and water systems.",
  },
  {
    id: "sw5",
    name: "Muthoni Karanja",
    phone: "0756 789 012",
    location: "Ngong, Kajiado",
    experience: "4 years",
    skills: ["House cleaning", "Office cleaning", "Fumigation"],
    category: "Cleaning",
    rating: 4.5,
    bio: "Detail-oriented cleaner. Homes, offices, and post-construction cleanup.",
  },
  {
    id: "sw6",
    name: "Kipchoge Langat",
    phone: "0767 890 123",
    location: "Githurai, Nairobi",
    experience: "15 years",
    skills: ["Carpentry", "Furniture making", "Roofing"],
    category: "Carpentry",
    rating: 4.9,
    bio: "Veteran carpenter. Custom furniture, door frames, roofing, and all woodwork.",
  },
  {
    id: "sw7",
    name: "Auma Nyaboke",
    phone: "0778 901 234",
    location: "Kawangware, Nairobi",
    experience: "5 years",
    skills: ["Laundry", "House help", "Childcare"],
    category: "Washing & Laundry",
    rating: 4.4,
    bio: "Hardworking house help experienced in laundry, cooking, and taking care of children.",
  },
  {
    id: "sw8",
    name: "Mutiso Kyalo",
    phone: "0789 012 345",
    location: "Kitengela, Kajiado",
    experience: "7 years",
    skills: ["Painting", "Interior design", "Wallpaper installation"],
    category: "Painting",
    rating: 4.7,
    bio: "Professional painter. Interior and exterior, texture finishes, and wallpaper.",
  },
  {
    id: "sw9",
    name: "Wanjiku Maina",
    phone: "0790 123 456",
    location: "Ruiru, Kiambu",
    experience: "3 years",
    skills: ["Gardening", "Landscaping", "Tree trimming"],
    category: "Gardening",
    rating: 4.3,
    bio: "Green thumb for hire. Garden maintenance, landscaping, and flower arrangement.",
  },
  {
    id: "sw10",
    name: "Hassan Abdille",
    phone: "0701 234 567",
    location: "South C, Nairobi",
    experience: "9 years",
    skills: ["Electrical wiring", "Solar installation", "Appliance repair"],
    category: "Electrical",
    rating: 4.8,
    bio: "Certified electrician. House wiring, solar panels, and electrical repairs.",
  },
];

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Kitchen Plumbing Repair",
    employer: "Wanjiku Homes",
    location: "Westlands, Nairobi",
    pay: "KSh 3,500",
    category: "Plumbing",
    urgency: "urgent",
    postedAt: "2 hours ago",
    description: "Fix leaking kitchen sink and replace old pipes. Must bring own tools. Estimated 3 hours of work.",
    skills: ["Pipe fitting", "Leak repair"],
  },
  {
    id: "2",
    title: "House Wiring Installation",
    employer: "Kamau Properties",
    location: "Kilimani, Nairobi",
    pay: "KSh 8,000",
    category: "Electrical",
    urgency: "normal",
    postedAt: "5 hours ago",
    description: "Full house wiring for a 3-bedroom apartment. Must have electrical certification. Work starts Monday.",
    skills: ["House wiring", "Safety compliance"],
  },
  {
    id: "3",
    title: "Office Furniture Assembly",
    employer: "TechHub Kenya",
    location: "Upperhill, Nairobi",
    pay: "KSh 2,500",
    category: "Carpentry",
    urgency: "flexible",
    postedAt: "1 day ago",
    description: "Assemble 10 office desks and 20 chairs. All materials provided. Must be completed within 2 days.",
    skills: ["Furniture assembly", "Carpentry"],
  },
  {
    id: "4",
    title: "Perimeter Wall Painting",
    employer: "Otieno Estates",
    location: "Karen, Nairobi",
    pay: "KSh 12,000",
    category: "Painting",
    urgency: "normal",
    postedAt: "3 hours ago",
    description: "Paint exterior perimeter wall (approx 200m). Paint will be provided. Team of 2-3 preferred.",
    skills: ["Exterior painting", "Surface preparation"],
  },
  {
    id: "5",
    title: "Borehole Pump Repair",
    employer: "Mwangi Farm",
    location: "Kiambu",
    pay: "KSh 5,000",
    category: "Plumbing",
    urgency: "urgent",
    postedAt: "30 min ago",
    description: "Submersible pump not working. Need experienced fundi to diagnose and repair. Urgent - farm needs water.",
    skills: ["Pump repair", "Diagnostics"],
  },
  {
    id: "6",
    title: "Metal Gate Fabrication",
    employer: "Secure Homes Ltd",
    location: "South B, Nairobi",
    pay: "KSh 15,000",
    category: "Welding",
    urgency: "normal",
    postedAt: "1 day ago",
    description: "Fabricate and install a sliding metal gate. Materials provided. Must have welding equipment.",
    skills: ["Arc welding", "Metal fabrication"],
  },
  {
    id: "7",
    title: "Mama Fua - Weekly Laundry",
    employer: "Njoroge Family",
    location: "Lavington, Nairobi",
    pay: "KSh 1,500",
    category: "Laundry",
    urgency: "normal",
    postedAt: "1 hour ago",
    description: "Weekly laundry for a family of 5. Washing, ironing, and folding. Every Saturday morning.",
    skills: ["Washing", "Ironing"],
  },
  {
    id: "8",
    title: "Chapo & Beans Catering for Event",
    employer: "Mama Pima Events",
    location: "Donholm, Nairobi",
    pay: "KSh 6,000",
    category: "Cooking",
    urgency: "urgent",
    postedAt: "45 min ago",
    description: "Cook for 100 guests this Saturday. Menu: chapati, beans, rice, kachumbari. Ingredients provided.",
    skills: ["Kenyan cuisine", "Bulk cooking"],
  },
  {
    id: "9",
    title: "Jua Kali Window Grills",
    employer: "Mwende Apartments",
    location: "Pipeline, Nairobi",
    pay: "KSh 20,000",
    category: "Jua Kali",
    urgency: "normal",
    postedAt: "6 hours ago",
    description: "Install burglar-proof window grills for 8 windows in apartment block. Must have own welding gear.",
    skills: ["Welding", "Metalwork"],
  },
  {
    id: "10",
    title: "Garden Landscaping & Maintenance",
    employer: "Wangari Residence",
    location: "Runda, Nairobi",
    pay: "KSh 4,000",
    category: "General Labour",
    urgency: "flexible",
    postedAt: "2 days ago",
    description: "Mow lawn, trim hedges, plant flowers, and general garden maintenance. Monthly contract available.",
    skills: ["Gardening", "Landscaping"],
  },
  {
    id: "11",
    title: "Septic Tank Cleaning",
    employer: "Kimani Plots",
    location: "Rongai, Kajiado",
    pay: "KSh 7,000",
    category: "Cleaning",
    urgency: "urgent",
    postedAt: "20 min ago",
    description: "Exhauster needed for septic tank cleaning. 3 tanks in a residential plot. Urgent job.",
    skills: ["Exhauster operation", "Sanitation"],
  },
  {
    id: "12",
    title: "Mkokoteni Transport - Furniture Moving",
    employer: "Ouma Relocations",
    location: "Githurai 45, Nairobi",
    pay: "KSh 2,000",
    category: "Transport",
    urgency: "normal",
    postedAt: "4 hours ago",
    description: "Move household furniture from Githurai to Roysambu using mkokoteni. 2 trips needed.",
    skills: ["Heavy lifting", "Transport"],
  },
  {
    id: "13",
    title: "Ceiling Board Installation",
    employer: "Achieng Builders",
    location: "Kayole, Nairobi",
    pay: "KSh 10,000",
    category: "Carpentry",
    urgency: "normal",
    postedAt: "8 hours ago",
    description: "Install PVC ceiling boards in 4 rooms. Materials provided. Must have experience with T&G boards.",
    skills: ["Ceiling installation", "Carpentry"],
  },
  {
    id: "14",
    title: "Concrete Block Laying",
    employer: "Nyambura Construction",
    location: "Juja, Kiambu",
    pay: "KSh 18,000",
    category: "Masonry",
    urgency: "normal",
    postedAt: "1 day ago",
    description: "Lay concrete blocks for a perimeter wall. Approximately 500 blocks. Must bring own trowel and level.",
    skills: ["Block laying", "Masonry"],
  },
  {
    id: "15",
    title: "House Deep Cleaning",
    employer: "Atieno Homes",
    location: "Syokimau, Machakos",
    pay: "KSh 3,000",
    category: "Cleaning",
    urgency: "flexible",
    postedAt: "3 days ago",
    description: "Post-renovation deep cleaning for a 3-bedroom house. Windows, floors, walls, and bathroom scrubbing.",
    skills: ["Deep cleaning", "Post-construction cleanup"],
  },
];

export const mockWorker: Worker = {
  id: "w1",
  name: "James Ochieng",
  skills: ["Plumbing", "Pipe fitting", "Pump repair", "Water systems"],
  rating: 4.8,
  completedJobs: 47,
  location: "Westlands, Nairobi",
  verified: true,
  reputationScore: 92,
  avatar: "",
  bio: "Experienced fundi with 8 years in plumbing and water systems. Certified by NITA. I bring my own tools and always deliver quality work on time.",
};
