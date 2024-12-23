export function trimTrailingSlash(url: string) {
    return url.replace(/\/+$/, '');
}
