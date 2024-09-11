import { ReactNode } from "react";

export interface INavLinkItem {
  to: string;
  icon: ReactNode;
  text: string;
}

export interface IUser {
  id: number;
  emailId: string;
  name: string;
  profileImage: string;
  role: string;
  password: string;
}
