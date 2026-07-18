import { describe, expect, it } from "vitest";
import { stationDraftFromPayload } from "../../api/_lib/station-draft.js";

describe("stationDraftFromPayload", () => {
  it("maps common GHL station form fields into a station draft", () => {
    const draft = stationDraftFromPayload({
      station_name: "Joyful Noise Radio",
      contactName: "Avery Brown",
      email: "avery@example.com",
      stationGenre: "Gospel",
      stationDescription: "Praise and worship every day.",
      plan: "Featured station",
      youtubeUrl: "https://youtube.com/@joyfulnoise",
    });

    expect(draft).toMatchObject({
      id: "station-joyful-noise-radio",
      slug: "joyful-noise-radio",
      name: "Joyful Noise Radio",
      hostName: "Avery Brown",
      contactEmail: "avery@example.com",
      genre: "Gospel",
      tier: "featured",
      featured: true,
      status: "draft",
      billingStatus: "paid",
      socialLinks: {
        youtube: "https://youtube.com/@joyfulnoise",
      },
    });
  });
});
