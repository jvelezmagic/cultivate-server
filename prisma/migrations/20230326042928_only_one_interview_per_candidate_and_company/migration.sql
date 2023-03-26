/*
  Warnings:

  - A unique constraint covering the columns `[candidate_id,company_id]` on the table `interviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "interviews_candidate_id_company_id_key" ON "interviews"("candidate_id", "company_id");
