import { FC, PropsWithChildren } from "react"

export const AppLayout: FC<PropsWithChildren> = ({children}) => {
    return <div className="h-screen w-screen">{children}</div>
}