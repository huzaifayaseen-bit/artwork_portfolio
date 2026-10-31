export async function onRequestPost(context) {
  try {
    const webhookUrl = context.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return new Response(
        JSON.stringify({ error: "DISCORD_WEBHOOK_URL environment variable is not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await context.request.json();
    const {
      category,
      scope,
      referenceLink,
      notes,
      timeline,
      commercialUse,
      clientContact,
    } = body;

    const embed = {
      title: "⚡ NEW COMMISSION BRIEF RECEIVED",
      description: "A client just generated and submitted a new commission brief from the portfolio!",
      color: 0xffde59,
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
      footer: {
        text: "Emilia Art Portfolio // Automated Lead Delivery",
      },
      timestamp: new Date().toISOString(),
    };

    const discordResponse = await fetch(webhookUrl, {
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
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error?.message || "Failed to process commission brief." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}