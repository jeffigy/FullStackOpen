import { JwtPayload } from "jsonwebtoken";
import { UserSelect } from "./user.type";

export type DecodedToken = JwtPayload & {
  userInfo: { userId: UserSelect["userId"] };
};
