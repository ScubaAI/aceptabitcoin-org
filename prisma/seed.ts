/**
 * Prisma Seed Script — Ahorro Beta Invite Codes
 * 
 * Puebla la tabla InviteCode con 10 códigos de invitación beta.
 * Prefijos semánticos para rastrear el origen de cada usuario:
 * - GEN: Fundadores / early adopters
 * - TEST: QA interno
 * - PART: Partners / colaboradores
 * - COMM: Comunidad general
 * 
 * Ejecutar: npx prisma db seed
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BETA_CODES = [
  // Fundadores (3)
  "ABMX-GEN1-2026",
  "ABMX-GEN2-2026",
  "ABMX-GEN3-2026",
  
  // QA interno (2)
  "ABMX-TEST-0001",
  "ABMX-TEST-0002",
  
  // Partners (2)
  "ABMX-PART-0001",
  "ABMX-PART-0002",
  
  // Comunidad (3)
  "ABMX-COMM-0001",
  "ABMX-COMM-0002",
  "ABMX-COMM-0003",
];

async function main() {
  console.log("🌱 Seeding Ahorro beta invite codes...");

  for (const code of BETA_CODES) {
    await prisma.inviteCode.upsert({
      where: { code },
      update: {},
      create: { code },
    });
  }

  console.log(`✅ Seeded ${BETA_CODES.length} invite codes`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
