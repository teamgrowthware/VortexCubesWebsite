import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import BenchResource from '../models/BenchResource.js';

dotenv.config();

const MAPPING = {
  'MERN Stack': 'Full Stack',
  'Frontend Development': 'React Developer',
  'Backend Development': 'Full Stack',
  'Mobile Development': 'React Native Developer',
  'AI/ML': 'QA Engineer',
  'DevOps': 'Project Manager',
};

async function migrateTechStacks() {
  await connectDB();

  const resources = await BenchResource.find({});
  console.log(`Found ${resources.length} bench resources to check.`);

  let updatedCount = 0;

  for (const resource of resources) {
    const originalTechStack = resource.techStack || [];
    const newTechStackSet = new Set();

    for (const tech of originalTechStack) {
      if (MAPPING[tech]) {
        newTechStackSet.add(MAPPING[tech]);
      } else {
        newTechStackSet.add(tech);
      }
    }

    const newTechStack = Array.from(newTechStackSet);

    // Check if there are changes
    const hasChanges =
      newTechStack.length !== originalTechStack.length ||
      originalTechStack.some((tech) => !newTechStackSet.has(tech));

    if (hasChanges) {
      resource.techStack = newTechStack;
      await resource.save();
      console.log(`Updated resource (Role: ${resource.role}, ID: ${resource._id}): [${originalTechStack.join(', ')}] -> [${newTechStack.join(', ')}]`);
      updatedCount++;
    }
  }

  console.log(`Successfully migrated ${updatedCount} bench resources.`);
  process.exit(0);
}

migrateTechStacks().catch((error) => {
  console.error('Migration failed:', error.message);
  process.exit(1);
});
