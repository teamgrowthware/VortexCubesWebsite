import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import BenchResource from '../models/BenchResource.js';

dotenv.config();

function convertRateToINRRange(rateStr) {
  if (!rateStr) return null;
  
  // If it already contains Rs., do not convert again
  if (rateStr.includes('Rs.')) {
    return rateStr;
  }

  // Parse out numeric digits
  const cleanStr = rateStr.replace(/,/g, '');
  const numericMatch = cleanStr.match(/(\d+)/);
  if (!numericMatch) return null;

  const rawNum = parseInt(numericMatch[0], 10);
  let usdMonthly = rawNum;

  // Determine if the input rate is hourly or monthly USD
  // E.g., "$75/hr", "45", "120" vs "$12,000/mo"
  const isHourly = rateStr.includes('/hr') || rateStr.includes('hr') || rawNum < 500;
  if (isHourly) {
    usdMonthly = rawNum * 160;
  }

  // Convert USD monthly to INR monthly salary range
  // Assuming a mid-point conversion of 1 USD = 8.33 relative value to Indian market scales
  const midPoint = Math.round((usdMonthly * 8.33) / 5000) * 5000;
  const minVal = Math.round((midPoint * 0.8) / 5000) * 5000;
  const maxVal = Math.round((midPoint * 1.2) / 5000) * 5000;

  return `Rs. ${minVal.toLocaleString('en-IN')} \u2013 Rs. ${maxVal.toLocaleString('en-IN')}`;
}

async function migrateRatesToINR() {
  await connectDB();

  const resources = await BenchResource.find({});
  console.log(`Found ${resources.length} bench resources to check.`);

  let updatedCount = 0;

  for (const resource of resources) {
    const currentRate = resource.monthlyRate;
    const newRate = convertRateToINRRange(currentRate);

    if (newRate && newRate !== currentRate) {
      await BenchResource.updateOne(
        { _id: resource._id },
        { $set: { monthlyRate: newRate } }
      );
      console.log(`Migrated resource (Role: ${resource.role}, ID: ${resource._id}): "${currentRate}" -> "${newRate}"`);
      updatedCount++;
    } else {
      console.log(`Skipped/No changes for (Role: ${resource.role}, ID: ${resource._id}): "${currentRate}"`);
    }
  }

  console.log(`Successfully migrated ${updatedCount} bench resources.`);
  process.exit(0);
}

migrateRatesToINR().catch((error) => {
  console.error('Migration failed:', error.message);
  process.exit(1);
});
