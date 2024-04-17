import { IQuestion } from "types/question";

export const findQuizById = <T extends IQuestion>(
  arr: T[],
  id: number | string | undefined
): T | any => {
  return arr.find((quiz) => quiz._id === id);
};
