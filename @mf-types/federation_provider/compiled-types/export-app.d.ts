declare const _default: () => {
    render(info: import("@module-federation/bridge-react").RenderFnParams & any): Promise<void>;
    destroy(info: {
        dom: HTMLElement;
    }): Promise<void>;
    rawComponent: import("react").ComponentType<unknown>;
    __BRIDGE_FN__: (_args: unknown) => void;
};
export default _default;
