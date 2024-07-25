import { PrismaClient } from '@prisma/client';


const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, new technology',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica Q2',
      price: 5000,
      description: 'Small, compact, innovative',
    },
  ];
}

function getClients() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17270',
      name: 'John Doe',
      address: '123 Main Street, London',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17280',
      name: 'Jane Doe',
      address: '123 Main Street, London',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17290',
      name: 'Thomas Jefferson',
      address: 'Baker Street 12B, New York',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      clientId: 'fd105551-0f0d-4a9f-bc41-c559c8a17270',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      address: '123 Main Street, London',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      clientId: 'fd105551-0f0d-4a9f-bc41-c559c8a17280',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      address: '123 Main Street, London',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      clientId: 'fd105551-0f0d-4a9f-bc41-c559c8a17290',
      productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      address: 'Baker Street 12B, New York',
    },
  ];
}

async function seed() {
  
  await Promise.all(
    getProducts().map((product) => db.product.create({ data: product }))
  );

  await Promise.all(
    getClients().map((client) => db.client.create({ data: client }))
  );

  await Promise.all(
    getOrders().map(({ clientId, productId, ...orderData }) =>
      db.order.create({
        data: {
          ...orderData,
          client: {
            connect: { id: clientId },
          },
          product: {
            connect: { id: productId },
          },
        },
      })
    )
  );
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });