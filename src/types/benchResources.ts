export interface BenchResource {
  _id?: string;
  id?: string;
  role: string;
  experience: number;
  techStack: string[];
  monthlyRate: string;
  availability: string;
  isActive?: boolean;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type BenchResourcePayload = {
  role: string;
  experience: number;
  techStack: string[];
  monthlyRate: string;
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
