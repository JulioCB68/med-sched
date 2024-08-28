/* eslint-disable camelcase */
import { isBefore } from "date-fns";
import { google } from "googleapis";
import { db } from "./prisma";

export async function getGoogleOAuthToken(userId: string) {
  const account = await db.account.findFirstOrThrow({
    where: {
      provider: "google",
      userId,
    },
  });

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );

  auth.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at ? account.expires_at * 1000 : null,
  });

  if (!account.expires_at) {
    return auth;
  }

  const isTokenExpired = isBefore(
    new Date(account.expires_at * 1000),
    new Date(),
  );

  if (isTokenExpired) {
    const { credentials } = await auth.refreshAccessToken();
    const {
      access_token,
      expiry_date,
      id_token,
      refresh_token,
      scope,
      token_type,
    } = credentials;

    await db.account.update({
      where: {
        id: account.id,
      },
      data: {
        access_token,
        expires_at: expiry_date ? Math.floor(expiry_date / 1000) : null,
        id_token,
        refresh_token,
        scope,
        token_type,
      },
    });

    auth.setCredentials({
      access_token,
      refresh_token,
      expiry_date,
    });
  }

  return auth;
}
