import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function handler(req, res) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.status(200).json(session);
}
