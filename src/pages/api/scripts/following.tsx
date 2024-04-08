// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method==="GET"){
    let userIdCheck;
    const { followingid } = req.query;
    const { userId } = getAuth(req);
    const currentuser=await db.user.findUnique({
      where:{
        externalUserId:String(userId)
      }
  })
  if(!currentuser){
    return res.status(404).json({message:"Unauthorized"});
  }
    if (followingid === currentuser.id) {
      res.status(400).json({ message: "Cannot follow yourself" });
    } else {
        if (!userId) {
          return res.status(404).json({message:"Unauthorized"});
        }
  
        const otheruser=await db.user.findUnique({
          where:{
              id:String(followingid)
          }
        })
        if(!otheruser){
          return res.status(404).json({message:"No user found to follow"})
        }
      
        const exisitingFollow=await db.follow.findFirst({
          where:{
              followerId:currentuser.id,
              followingId:otheruser.id
          }
        })
  
        return res.status(200).json({exisitingFollow:!!exisitingFollow})
  
        // const follow = await db.follow.create({
        //   data: {
        //     followerId: userId,
        //     followingId: otheruser.id,
        //   },
        //   include: {
        //     following: true,
        //     follower: true,
        //   },
        // });
        // return res.status(200).json({ follow:follow });
    }

  }else if(req.method=="POST"){
      let userIdCheck;
      const { followingid,actionType } = req.body;
      const { userId } = getAuth(req);
      const currentuser=await db.user.findUnique({
        where:{
          externalUserId:String(userId)
        }
    })
    if(!currentuser){
      return res.status(404).json({message:"Unauthorized"});
    }
      if (followingid === currentuser.id) {
        res.status(400).json({ message: "Cannot follow yourself" });
      } else {
          if (!userId) {
            return res.status(404).json({message:"Unauthorized"});
          }
    
          const otheruser=await db.user.findUnique({
            where:{
                id:String(followingid)
            }
          })
          if(!otheruser){
            return res.status(404).json({message:"No user found to follow"})
          }
        
          const exisitingFollow:any=await db.follow.findFirst({
            where:{
                followerId:currentuser.id,
                followingId:otheruser.id
            }
          })

          if(exisitingFollow && actionType=="follow"){
            return res.status(400).json({exisitingFollow:true})
          }
          if(actionType==="follow"){
            const follow = await db.follow.create({
              data: {
                followerId: currentuser.id,
                followingId: otheruser.id,
              },
              include: {
                following: true,
                follower: true,
              },
            });
            return res.status(200).json({ follow:follow });
          }else if(actionType==="unfollow"){
            if(!exisitingFollow){
              return res.status(400).json({exisitingFollow:false})
            }
            const unfollow=await db.follow.delete({
              where:{
                id:exisitingFollow.id
              },
              include:{
                following:true
              }
            })
            return res.status(200).json({ unfollow:unfollow });
          }
          
      }
  }

}
