import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const productData: Prisma.productCreateInput[] = [
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
  for (const p of productData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created product with id: ${product.id}`);
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
