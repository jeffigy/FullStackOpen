import { UserSelect } from "./user.type";

declare global {
  namespace Express {
    interface Request {
      userId: UserSelect["userId"];
    }
  }
}
