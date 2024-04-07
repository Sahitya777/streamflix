// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let userIdCheck;
  const { id } = req.body;
  const { userId } = getAuth(req);
  if (id === userId) {
    res.status(400).json({ message: "Cannot follow yourself" });
  } else {
      if (!userId) {
        throw new Error("Unauthorized");
      }

      const otheruser=await db.user.findUnique({
        where:{
            id:id
        }
      })
      if(!otheruser){
        return res.status(404).json({message:"No user found to follow"})
      }
    
      const exisitingFollow=await db.follow.findFirst({
        where:{
            followerId:userId,
            followingId:otheruser.id
        }
      })

      if(exisitingFollow){
        return res.status(404).json({message:"Already Following"})
      }

      const follow = await db.follow.create({
        data: {
          followerId: userId,
          followingId: otheruser.id,
        },
        include: {
          following: true,
          follower: true,
        },
      });


      return res.status(200).json({ follow:follow });
  }

}
