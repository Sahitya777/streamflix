// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    if(req.method==="GET"){
        let userIdCheck;
        const { userId } = getAuth(req);
    
        if (!userId) {
            throw new Error("Unauthorized");
          }
    
        const user = await db.user.findUnique({
            where: { externalUserId: userId },
          });
        try{
            if(user){
                userIdCheck=user.id;
            }
        }catch(err){
            userIdCheck=null;
        }
        let users:any=[]
        if(userIdCheck){
            users=await db.user.findMany({
                where:{
                    NOT:{
                        id:userIdCheck,
                    }
                },
                orderBy:{
                    createdAt:"desc"
                }
    
            })
        }else{
            try{
                users=await db.user.findMany({
                    orderBy:{
                        createdAt:"desc"
                    }
                })
            }catch(err){
                console.log(err,'err')
            }
        }
      return res.status(200).json({ users: users });
    }
}
