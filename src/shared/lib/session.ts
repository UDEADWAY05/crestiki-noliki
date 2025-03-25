import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionEntity, UserEntity } from '@/entities/user/model/types'
import { left, right } from '@/shared/lib/either'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

async function encrypt(session: SessionEntity) {
    const payload = {
        id: session.id,
        login: session.login,
        expiredAt: session.expiredAt
    }

    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        const data = {
            id: payload.id,
            login: payload.login,
            expiredAt: payload.expiredAt
        }
        return right(data as SessionEntity)
    } catch (error) {
        return left('Failed to verify session')
    }
}

const userToSession = (user: UserEntity, expiredAt: string): SessionEntity => {
    return {
        id: user.id,
        login: user.login,
        expiredAt
    }
}

async function addSession(user: UserEntity) {
    const sessionData = userToSession(user, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString());
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt(sessionData)
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}

const verifySession = async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (session.type === 'left') {
        redirect('/login')
    }

    return { isAuth: true, session: session.value }
}

export const sessionService = {
    addSession,
    deleteSession,
    verifySession,
    decrypt,
    encrypt,
}