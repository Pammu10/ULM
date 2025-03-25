import config from "@/lib/config";
import Imagekit from "imagekit";
import { NextResponse } from "next/server";

const imagekit =  new Imagekit({
    publicKey: config.env.imagekit.publicKey!,
    privateKey: config.env.imagekit.privateKey!,
    urlEndpoint: config.env.imagekit.urlEndpoint!
})


export async function GET() {
    return NextResponse.json(imagekit.getAuthenticationParameters())
}