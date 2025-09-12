export interface NavItem {
  name: string;
  path: string;
  external?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
}