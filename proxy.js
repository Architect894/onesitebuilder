import { NextResponse } from "next/server";

export function proxy(request) {
    const url = request.nextUrl.clone();
    const host = request.headers.get("host") || "";
    const hostname = host.split(":")[0];

    const isLocalhost = hostname === "localhost";
    const isRootDomain = hostname === "yourdomain.com";
    const isWwwDomain = hostname === "www.yourdomain.com";

    if (isLocalhost || isRootDomain || isWwwDomain) {
        return NextResponse.next();
    }

    if (hostname.endsWith(".localhost")) {
        const subdomain = hostname.replace(".localhost", "");
        url.pathname = `/sites/${subdomain}`;
        return NextResponse.rewrite(url);
    }

    if (hostname.endsWith(".yourdomain.com")) {
        const subdomain = hostname.replace(".yourdomain.com", "");
        url.pathname = `/sites/${subdomain}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}