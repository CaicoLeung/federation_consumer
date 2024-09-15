
    export type RemoteKeys = 'federation_provider/button' | 'federation_provider/export-app';
    type PackageType<T> = T extends 'federation_provider/export-app' ? typeof import('federation_provider/export-app') :T extends 'federation_provider/button' ? typeof import('federation_provider/button') :any;