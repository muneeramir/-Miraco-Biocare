export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const leadership: TeamMember[] = [
 {
  name: "Dr. Mir Muneer",
  role: "Founder & CEO",
  bio: "Over 25 years of experience in healthcare and life sciences, leading strategic partnerships and business development across India.",
  image: "/drmuneer.png",
},
  {
    name: "Dr. Priya Sharma",
    role: "Chief Scientific Officer",
    bio: "PhD in Molecular Biology with expertise in diagnostics, genomics, and laboratory sciences. Former research director at a leading medical institute.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Arun Mehta",
    role: "Director of Operations",
    bio: "Seasoned operations leader with extensive experience in supply chain management, logistics, and customer service excellence.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "Dr. Sunita Reddy",
    role: "Head of Clinical Diagnostics",
    bio: "Clinical pathologist with deep expertise in laboratory medicine, quality systems, and diagnostic technology implementation.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
  },
];
