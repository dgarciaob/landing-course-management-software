const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Dirección Comercial" },
        { name: "Tributario" },
        { name: "Legal" },
        { name: "Marketing" },
        { name: "Ventas" },
      ],
    });
    console.log("Categories seeded successfully");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
