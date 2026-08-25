import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import BenchResource from '../models/BenchResource.js';

dotenv.config();

const benchResources = [
  {
    role: 'Senior Backend Architect',
    experience: 8,
    techStack: ['Full Stack', 'Project Manager'],
    monthlyRate: 'Rs. 80,000 – Rs. 1,20,000',
    availability: 'Immediate',
    sortOrder: 1,
  },
  {
    role: 'Machine Learning Engineer',
    experience: 4,
    techStack: ['QA Engineer'],
    monthlyRate: 'Rs. 90,000 – Rs. 1,35,000',
    availability: 'Within 1 week',
    sortOrder: 2,
  },
  {
    role: 'Full Stack Engineer',
    experience: 6,
    techStack: ['Full Stack', 'React Developer'],
    monthlyRate: 'Rs. 70,000 – Rs. 1,05,000',
    availability: 'Immediate',
    sortOrder: 3,
  },
  {
    role: 'AI Integration Specialist',
    experience: 3,
    techStack: ['QA Engineer', 'Full Stack'],
    monthlyRate: 'Rs. 75,000 – Rs. 1,15,000',
    availability: 'Immediate',
    sortOrder: 4,
  },
  {
    role: 'Mobile Developer',
    experience: 2,
    techStack: ['React Native Developer', 'React Developer'],
    monthlyRate: 'Rs. 55,000 – Rs. 80,000',
    availability: 'Within 2 weeks',
    sortOrder: 5,
  },
  {
    role: 'Senior AI Engineer',
    experience: 7,
    techStack: ['QA Engineer'],
    monthlyRate: 'Rs. 95,000 – Rs. 1,45,000',
    availability: 'Immediate',
    sortOrder: 6,
  },
  {
    role: 'Frontend Engineer',
    experience: 3,
    techStack: ['React Developer', 'UI/UX'],
    monthlyRate: 'Rs. 65,000 – Rs. 95,000',
    availability: 'Immediate',
    sortOrder: 7,
  },
  {
    role: 'DevOps Engineer',
    experience: 1,
    techStack: ['Project Manager'],
    monthlyRate: 'Rs. 50,000 – Rs. 75,000',
    availability: 'Within 1 week',
    sortOrder: 8,
  },
  {
    role: 'Data Scientist',
    experience: 5,
    techStack: ['QA Engineer'],
    monthlyRate: 'Rs. 75,000 – Rs. 1,15,000',
    availability: 'Within 1 week',
    sortOrder: 9,
  },
  {
    role: 'Full Stack AI Engineer',
    experience: 6,
    techStack: ['Full Stack', 'QA Engineer'],
    monthlyRate: 'Rs. 85,000 – Rs. 1,30,000',
    availability: 'Immediate',
    sortOrder: 10,
  },
  {
    role: 'ML Platform Architect',
    experience: 9,
    techStack: ['QA Engineer', 'Full Stack'],
    monthlyRate: 'Rs. 1,00,000 – Rs. 1,50,000',
    availability: 'Within 2 weeks',
    sortOrder: 11,
  },
  {
    role: 'MERN Stack Developer',
    experience: 4,
    techStack: ['Full Stack', 'React Developer', 'UI/UX'],
    monthlyRate: 'Rs. 70,000 – Rs. 1,05,000',
    availability: 'Immediate',
    sortOrder: 12,
  },
];

async function seedBenchResources() {
  await connectDB();
  await BenchResource.deleteMany({});
  await BenchResource.insertMany(benchResources);
  console.log(`Seeded ${benchResources.length} bench resources.`);
  process.exit(0);
}

seedBenchResources().catch((error) => {
  console.error('Failed to seed bench resources:', error.message);
  process.exit(1);
});
