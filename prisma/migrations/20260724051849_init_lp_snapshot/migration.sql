-- CreateTable
CREATE TABLE "lp_snapshots" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalUSD" DOUBLE PRECISION NOT NULL,
    "feesUSD" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "lp_snapshots_pkey" PRIMARY KEY ("id")
);
