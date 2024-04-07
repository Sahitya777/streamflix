import { getSelf } from "./auth-service";
import { db } from "./db";


export const getRecommended = async () => {
    let userId;
    try{
        const self=await getSelf();
        userId=self.id;
    }catch(err){
        userId=null;
    }
    console.log(userId,"id")
    let users:any=[]
    if(userId){
        users=await db.user.findMany({
            where:{
                NOT:{
                    id:userId,
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
    console.log(users,'is')
    return users;
};