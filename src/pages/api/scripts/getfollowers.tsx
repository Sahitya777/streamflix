// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(req.method==="GET"){
    const {userId}=req.query;
    const user=await db.user.findUnique({
        where:{
            externalUserId:String(userId)
        }
    })
    if(!user){
        return res.status(404).json({error:"No user found" });
    }
    const followedusers=await db.follow.findMany({
        where:{
            followerId:String(user.id)
        },
        include:{
            following:true
        }
    })
    if (!followedusers) {
      return res.status(200).json({followedusers:[] });
    }
    return res.status(200).json({followedusers:followedusers})
  }
}
