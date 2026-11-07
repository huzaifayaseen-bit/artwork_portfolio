interface Env {
  DISCORD_WEBHOOK_URL?: string;
}

interface CloudflarePagesContext {
  request: Request;
  env: Env;
}

export async function onRequestPost(context: CloudflarePagesContext): Promise<Response> {
  try {
    const webhookUrl = context.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return new Response(
        JSON.stringify({ error: "DISCORD_WEBHOOK_URL environment variable is not configured on Cloudflare Pages." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const contentType = context.request.headers.get("content-type") || "";

    let category = "Not specified";
    let scope = "Not specified";
    let referenceLink = "";
    let notes = "";
    let timeline = "Standard";
    let commercialUse = false;
    let clientContact = "";
    let receiptFile: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await context.request.formData();
      category = (formData.get("category") as string) || "Not specified";
      scope = (formData.get("scope") as string) || "Not specified";
      referenceLink = (formData.get("referenceLink") as string) || "";
      notes = (formData.get("notes") as string) || "";
      timeline = (formData.get("timeline") as string) || "Standard";
      commercialUse = formData.get("commercialUse") === "true";
      clientContact = (formData.get("clientContact") as string) || "";

      const fileEntry = formData.get("receipt");
      if (fileEntry && typeof fileEntry === "object" && "arrayBuffer" in fileEntry) {
        receiptFile = fileEntry as File;
      }
    } else {
      const body = (await context.request.json().catch(() => ({}))) as Record<string, any>;
      category = body.category || "Not specified";
      scope = body.scope || "Not specified";
      referenceLink = body.referenceLink || "";
      notes = body.notes || "";
      timeline = body.timeline || "Standard";
      commercialUse = Boolean(body.commercialUse);
      clientContact = body.clientContact || "";
    }

    const embed = {
      title: receiptFile
        ? "🟢 VERIFIED BRIEF WITH PAYMENT RECEIPT"
        : "⚡ NEW COMMISSION INQUIRY BRIEF",
      description: receiptFile
        ? "A client submitted a confirmed commission brief along with proof of payment / deposit!"
        : "A client submitted a commission brief from the portfolio!",
      color: 0xffde59, // Comic Yellow hex
      fields: [
        {
          name: "👤 Client Contact (Discord / Email)",
          value: clientContact ? String(clientContact).trim() : "Not provided",
          inline: false,
        },
        {
          name: "🎨 Artwork Category",
          value: category || "Not specified",
          inline: true,
        },
        {
          name: "📐 Scope",
          value: scope || "Not specified",
          inline: true,
        },
        {
          name: "⏱ Timeline Target",
          value: timeline || "Standard",
          inline: true,
        },
        {
          name: "📜 Licensing Rights",
          value: commercialUse ? "Commercial Buyout Rights Requested" : "Personal Use Only ($0)",
          inline: true,
        },
        {
          name: "🔗 Reference Link",
          value: referenceLink && referenceLink.trim() ? referenceLink.trim() : "None provided",
          inline: false,
        },
        {
          name: "📝 Notes & Vibe",
          value: notes && notes.trim() ? notes.trim() : "Awaiting discussion",
          inline: false,
        },
      ],
      ...(receiptFile
        ? {
            image: {
              url: "attachment://receipt.png",
            },
          }
        : {}),
      footer: {
        text: receiptFile
          ? "Emilia Art Portfolio // Verified Commission Delivery"
          : "Emilia Art Portfolio // Commission Lead Delivery",
      },
      timestamp: new Date().toISOString(),
    };

    let discordResponse: Response;

    if (receiptFile) {
      const discordFormData = new FormData();
      const payloadJson = JSON.stringify({
        username: "Emilia Portfolio Transceiver",
        avatar_url: "https://emiliaart.studio/assets/artworks/artwork_samples/pfp/28.jpg",
        embeds: [embed],
      });

      discordFormData.append("payload_json", payloadJson);
      const receiptBuffer = await receiptFile.arrayBuffer();
      const receiptBlob = new Blob([receiptBuffer], { type: receiptFile.type || "image/png" });
      discordFormData.append("files[0]", receiptBlob, "receipt.png");

      discordResponse = await fetch(webhookUrl, {
        method: "POST",
        body: discordFormData,
      });
    } else {
      discordResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "Emilia Portfolio Transceiver",
          avatar_url: "https://emiliaart.studio/assets/artworks/artwork_samples/pfp/28.jpg",
          embeds: [embed],
        }),
      });
    }

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text();
      return new Response(
        JSON.stringify({ error: `Discord Webhook returned status ${discordResponse.status}: ${errorText}` }),
        { status: discordResponse.status, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error?.message || "Failed to process commission brief." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
