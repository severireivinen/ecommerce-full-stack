export interface InputField {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
}

export interface LoginField {
  email: string;
  password: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  location: string;
}
