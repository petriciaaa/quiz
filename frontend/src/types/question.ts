export interface IQuestion {
  _v?: number;
  _id?: number;
  answers: [];
  correct_answer: number | string;
  title: string;
  category: string;
  status?: "idle" | "done";
}
