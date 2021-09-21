import { PrismaClient, Prisma } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

const customerData: Prisma.CustomerCreateInput[] = [
  {
    email: "sebu-95@hotmail.com",
    firstName: "Severi",
    lastName: "Reivinen",
    password: "test123",
    phone: "0505616073",
  },
  {
    email: "lauri.peltonen@gmail.com",
    firstName: "Lauri",
    lastName: "Peltonen",
    password: "test123",
    phone: "0401231234",
  },
];

const categoryData: Prisma.ProductCategoryCreateInput[] = [
  {
    name: "Shirts",
    description: "T-shirts, long-sleeves, all kinds of shirts",
  },
  {
    name: "Pants",
    description: "jeans, sweatpants, shorts",
  },
  {
    name: "Jackets",
    description: "All jackets",
  },
];

const productData: Prisma.ProductCreateInput[] = [
  {
    name: "Black T-Shirt",
    price: 5.99,
    description: "Cool and cozy",
    stock: 12,
    location: "5C12",
  },
  {
    name: "White Design T-Shirt",
    price: 79.99,
    description: "Be cool like me",
    stock: 3,
    location: "5C13",
  },
  {
    name: "Black Ripped Jeans",
    price: 49.99,
    description: "Made in china",
    stock: 5,
    location: "5C14",
  },
  {
    name: "Fur Coat",
    price: 799.99,
    description: "Cold at winter, hot at sumemr",
    stock: 1,
    location: "5C15",
  },
];

async function main() {
  console.log(`Starting seeding...`);
  for (const pc of categoryData) {
    const category = await prisma.productCategory.create({
      data: pc,
    });
    console.log(`Created category with id: ${category.id}`);
  }

  for (const p of productData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created product with id: ${product.id}`);
  }

  for (const c of customerData) {
    const hashedPassword = await argon2.hash(c.password);
    const customer = await prisma.customer.create({
      data: { ...c, password: hashedPassword },
    });
    console.log(`Created customer with id: ${customer.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
