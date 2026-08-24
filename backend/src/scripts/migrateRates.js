import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import BenchResource from '../models/BenchResource.js';

dotenv.config();

async function migrateRates() {
  await connectDB();

  // Find all bench resources. Since chargePerHour might not be on the typed schema, we query all.
  const resources = await BenchResource.find({});
  console.log(`Found ${resources.length} bench resources to check.`);

  let updatedCount = 0;

  for (const resource of resources) {
    // Access the field raw or using .get() because it's removed from the schema definition
    const chargePerHour = resource.get('chargePerHour');
    
    if (chargePerHour) {
      const numericMatch = chargePerHour.match(/(\d+)/);
      if (numericMatch) {
        const hourlyRateVal = parseInt(numericMatch[0], 10);
        const calculatedMonthlyRate = hourlyRateVal * 160;
        const monthlyRateStr = `$${calculatedMonthlyRate.toLocaleString()}/mo`;

        await BenchResource.updateOne(
          { _id: resource._id },
          { 
            $set: { monthlyRate: monthlyRateStr },
            $unset: { chargePerHour: 1 } 
          }
        );

        console.log(`Migrated resource (Role: ${resource.role}, ID: ${resource._id}): "${chargePerHour}" -> "${monthlyRateStr}"`);
        updatedCount++;
      } else {
        console.warn(`Could not parse rate value from "${chargePerHour}" for candidate (Role: ${resource.role}, ID: ${resource._id})`);
      }
    } else if (resource.monthlyRate) {
      console.log(`Resource (Role: ${resource.role}, ID: ${resource._id}) already has monthlyRate: "${resource.monthlyRate}"`);
    } else {
      console.warn(`Resource (Role: ${resource.role}, ID: ${resource._id}) has neither chargePerHour nor monthlyRate.`);
    }
  }

  console.log(`Successfully migrated ${updatedCount} bench resources.`);
  process.exit(0);
}

migrateRates().catch((error) => {
  console.error('Migration failed:', error.message);
  process.exit(1);
});
