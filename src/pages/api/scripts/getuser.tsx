// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(req.method==="GET"){
    const {username}=req.query;
    const user=await db.user.findUnique({
        where:{
            username:String(username)
        }
    })
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({user:user})
  }
}
