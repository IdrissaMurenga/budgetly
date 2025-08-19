import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
    const session = await auth()

    if (!session) {
        return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/pages/dashboard']
}