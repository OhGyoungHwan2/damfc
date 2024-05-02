"use server";

import { cookies } from "next/headers";

export async function deleteCookies(name: string) {
  cookies().delete(name);
}

export async function setCookies(name: string, data: object) {
  cookies().set(name, JSON.stringify(data), {
    maxAge: 10 * 365 * 24 * 60 * 60,
  });
}
