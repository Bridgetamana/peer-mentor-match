import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function GET() {
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ profile: null }, { status: 401 })
    
    let profile = await prisma.userProfile.findFirst({
        where: { email: session.user.email },
        select: { id: true, userId: true, role: true, completed: true, data: true, email: true },
    })
    
    if (profile && profile.userId !== session.user.id) {
        try {
            await prisma.userProfile.update({ 
                where: { id: profile.id }, 
                data: { userId: session.user.id } 
            })
            profile.userId = session.user.id
        } catch {}
    }
    
    return NextResponse.json({ profile }, { status: 200 })
}