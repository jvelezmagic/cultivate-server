/*
  Warnings:

  - A unique constraint covering the columns `[interview_id,question_id]` on the table `conversations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "conversations_interview_id_question_id_key" ON "conversations"("interview_id", "question_id");
