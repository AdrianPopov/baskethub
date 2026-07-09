import { NextResponse } from "next/server";
import { adminFirestore, adminMessaging } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { title, body } = await req.json();

    const snapshot = await adminFirestore.collection("users").get();

    const tokens = snapshot.docs
      .map((doc) => doc.data().fcmToken)
      .filter(Boolean);

    console.log("TOKENS:", tokens);

    if (tokens.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Немає FCM токенів",
      });
    }

    const response = await adminMessaging.sendEachForMulticast({
      tokens,
      notification: {
        title,
        body,
      },
    });
    response.responses.forEach(async (res, index) => {
  if (!res.success && res.error?.code === "messaging/registration-token-not-registered") {
    const badToken = tokens[index];

    const users = await adminFirestore
      .collection("users")
      .where("fcmToken", "==", badToken)
      .get();

    users.forEach(async (doc) => {
      await doc.ref.update({
        fcmToken: null,
      });
    });
  }
});

    console.log("FULL RESPONSE:");
    console.dir(response, { depth: null });

    return NextResponse.json({
      success: true,
      sent: response.successCount,
      failed: response.failureCount,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}