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
