import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { z } from "zod";



export async function GET(request: Request){
    const user = await currentUser();

    if(!user){
        redirect("/sign-in")
    }

    const { searchParams } = new URL(request.url); //search params
    const paramType = searchParams.get("type") // paramtype 
    const validator = z.enum(["income", "expense"]).nullable(); //validator

    const queryParams = validator.safeParse(paramType); // the actual search params


    if(!queryParams.success){
        return Response.json(queryParams.error, {
            status: 400,
        })
    }

    const type = queryParams.data;
    const categories = await prisma.category.findMany({
        where: {
            userId: user.id,
            ...(type && { type }), // include the type of filters if it is defined
        },
        orderBy: {
            name: "asc",
        },
    })

    return Response.json(categories, {
        status: 200,
    })
}