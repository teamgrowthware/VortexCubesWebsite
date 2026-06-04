export interface BenchResource {
  _id?: string;
  id?: string;
  name: string;
  role: string;
  experience: number;
  techStack: string[];
  chargePerHour: string;
  availability: string;
  isActive?: boolean;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type BenchResourcePayload = {
  name: string;
  role: string;
  experience: number;
  techStack: string[];
  chargePerHour: string;
  availability: string;
  isActive: boolean;
  sortOrder: number;
};

export type AdminAuthResponse = {
  token: string;
  admin: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};
