import { User } from "@/types";

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
}
