import { MiddlewareApiConfig } from "@reduxjs/toolkit";
import { NextConfig } from "next";
import { MiddlewareConfig, NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
	const url = request.nextUrl;
	const userAgent = request.headers.get("user-agent") || "";
	const isSmartphone =
		/Android.*Mobile|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			userAgent,
		);
	const isTablet = /iPad|Android(?!.*Mobile)|Tablet|PlayBook|Silk/i.test(
		userAgent,
	);

	console.log(isSmartphone, isTablet);

	return;
}

export const config: MiddlewareConfig = {
	matcher: ["/"],
};
