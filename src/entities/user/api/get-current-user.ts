import { sessionService } from "@/shared/lib/session"
import { userApi } from "./user.api"

export const getCurrentUser = async () => {
    const { session } = await sessionService.verifySession()

    return userApi.getUser({ id: session.id })
}