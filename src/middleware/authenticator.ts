import { verifyToken } from "@/lib/jwtUtils";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


export default function authenticate(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = verifyToken(token);
      return handler(req, res);
    } catch {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}
