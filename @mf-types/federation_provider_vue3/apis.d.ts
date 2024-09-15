
    export type RemoteKeys = 'federation_provider_vue3/export-app';
    type PackageType<T> = T extends 'federation_provider_vue3/export-app' ? typeof import('federation_provider_vue3/export-app') :any;