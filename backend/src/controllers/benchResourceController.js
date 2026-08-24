import BenchResource from '../models/BenchResource.js';

function normalizeBenchResourcePayload(body) {
  return {
    role: body.role?.trim(),
    experience: Number(body.experience),
    techStack: Array.isArray(body.techStack) ? body.techStack : [],
    monthlyRate: body.monthlyRate?.trim(),
    availability: body.availability?.trim(),
    isActive: body.isActive ?? true,
    sortOrder: Number(body.sortOrder || 0),
  };
}

function validateBenchResourcePayload(payload) {
  if (!payload.role || !payload.monthlyRate || !payload.availability) {
    return 'Role, monthly rate, and availability are required.';
  }

  if (!Number.isFinite(payload.experience) || payload.experience < 0) {
    return 'Experience must be a number greater than or equal to 0.';
  }

  if (!Array.isArray(payload.techStack) || payload.techStack.length === 0) {
    return 'At least one technology is required.';
  }

  return '';
}

export async function getPublicBenchResources(req, res) {
  const resources = await BenchResource.find({ isActive: true }).sort({ sortOrder: 1, createdAt: 1 });
  res.json(resources);
}

export async function getAdminBenchResources(req, res) {
  const resources = await BenchResource.find().sort({ sortOrder: 1, createdAt: 1 });
  res.json(resources);
}

export async function createBenchResource(req, res) {
  const payload = normalizeBenchResourcePayload(req.body);
  const validationError = validateBenchResourcePayload(payload);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  // Shift existing resources to make room
  await BenchResource.updateMany(
    { sortOrder: { $gte: payload.sortOrder } },
    { $inc: { sortOrder: 1 } }
  );

  const resource = await BenchResource.create(payload);
  res.status(201).json(resource);
}

export async function updateBenchResource(req, res) {
  const payload = normalizeBenchResourcePayload(req.body);
  const validationError = validateBenchResourcePayload(payload);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const existingResource = await BenchResource.findById(req.params.id);
  if (!existingResource) {
    return res.status(404).json({ message: 'Bench resource not found.' });
  }

  const oldSortOrder = existingResource.sortOrder;
  const newSortOrder = payload.sortOrder;

  if (oldSortOrder !== newSortOrder) {
    if (oldSortOrder > newSortOrder) {
      // Moving up (e.g., 5 to 2) -> Shift items down
      await BenchResource.updateMany(
        { sortOrder: { $gte: newSortOrder, $lt: oldSortOrder } },
        { $inc: { sortOrder: 1 } }
      );
    } else {
      // Moving down (e.g., 2 to 5) -> Shift items up
      await BenchResource.updateMany(
        { sortOrder: { $gt: oldSortOrder, $lte: newSortOrder } },
        { $inc: { sortOrder: -1 } }
      );
    }
  }

  const resource = await BenchResource.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  res.json(resource);
}

export async function deleteBenchResource(req, res) {
  const resource = await BenchResource.findByIdAndDelete(req.params.id);

  if (!resource) {
    return res.status(404).json({ message: 'Bench resource not found.' });
  }

  // Shift items up to close the gap
  await BenchResource.updateMany(
    { sortOrder: { $gt: resource.sortOrder } },
    { $inc: { sortOrder: -1 } }
  );

  res.json({ message: 'Bench resource deleted.' });
}
