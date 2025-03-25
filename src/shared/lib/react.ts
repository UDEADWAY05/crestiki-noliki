import { useActionState as useActionStateReact } from "react";

export function useActionState<State, InitialState>(
    action: (state: Awaited<State>) => State | Promise<State>,
    initialState: InitialState,
    permalink?: string
): [
        state: Awaited<State> | InitialState,
        dispatch: () => void,
        isPending: boolean
    ];

export function useActionState(action: any, initialState: any, permalink?: any) {
    return useActionStateReact(action, initialState, permalink)
}