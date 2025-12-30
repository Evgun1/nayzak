import { MiddlewareApiConfig } from "@reduxjs/toolkit";
import { NextConfig } from "next";
import { MiddlewareConfig, NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
	return;
}

export const config: MiddlewareConfig = {
	matcher: ["/"],
};
