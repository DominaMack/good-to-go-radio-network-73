const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const autoInitials = (name) =>
  String(name || "New Station")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const normalizeKey = (key) =>
  String(key).toLowerCase().replace(/[^a-z0-9]/g, "");

export const flattenPayload = (value, prefix = "", output = {}) => {
  if (!value || typeof value !== "object") return output;

  for (const [key, item] of Object.entries(value)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (item && typeof item === "object" && !Array.isArray(item)) {
      flattenPayload(item, nextKey, output);
    } else {
      output[nextKey] = item;
      output[key] = item;
    }
  }

  return output;
};

const buildLookup = (payload) => {
  const flat = flattenPayload(payload);
  return Object.fromEntries(
    Object.entries(flat).map(([key, value]) => [normalizeKey(key), value]),
  );
};

const pick = (lookup, keys) => {
  for (const key of keys) {
    const value = lookup[normalizeKey(key)];
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return String(value).trim();
    }
  }
  return "";
};

const asBool = (value) => {
  const normalized = String(value ?? "").trim().toLowerCase();
  return ["1", "true", "yes", "y", "featured", "premium"].includes(normalized);
};

const normalizeTier = (value) => {
  const tier = String(value || "").toLowerCase();
  if (tier.includes("premium")) return "premium";
  if (tier.includes("feature")) return "featured";
  return "standard";
};

export const stationDraftFromPayload = (payload) => {
  const lookup = buildLookup(payload);
  const name = pick(lookup, [
    "stationName",
    "station_name",
    "radioStationName",
    "radio_station_name",
    "businessName",
    "companyName",
    "organization",
  ]);
  const hostName = pick(lookup, [
    "hostName",
    "host_name",
    "ownerName",
    "contactName",
    "fullName",
    "name",
  ]);
  const genre = pick(lookup, ["genre", "stationGenre", "format", "musicType"]);
  const tagline = pick(lookup, ["tagline", "slogan", "stationTagline"]);
  const description = pick(lookup, [
    "description",
    "stationDescription",
    "about",
    "bio",
    "ministryBio",
  ]);
  const contactEmail = pick(lookup, [
    "contactEmail",
    "stationEmail",
    "email",
    "emailAddress",
  ]);
  const streamUrl = pick(lookup, ["streamUrl", "streamURL", "radioStreamUrl", "listenUrl"]);
  const tierValue = pick(lookup, ["tier", "stationTier", "plan", "package", "productName"]);
  const tier = normalizeTier(tierValue);
  const featuredValue = pick(lookup, ["featured", "homepageFeatured", "homePageSlot"]);
  const featured = asBool(featuredValue) || tier === "featured" || tier === "premium";
  const homepageRank = pick(lookup, ["homepageRank", "homePageRank", "featuredRank"]);
  const coverImage = pick(lookup, ["coverImage", "coverImageUrl", "photo", "photoUrl", "image"]);
  const website = pick(lookup, ["website", "websiteUrl"]);
  const facebook = pick(lookup, ["facebook", "facebookUrl"]);
  const instagram = pick(lookup, ["instagram", "instagramUrl"]);
  const youtube = pick(lookup, ["youtube", "youtubeUrl"]);
  const slug = slugify(name || hostName || "new-station");

  return {
    id: `station-${slug}`,
    slug,
    name: name || "New Station",
    hostName: hostName || name || "Host to be announced",
    genre,
    tagline: tagline || "New Voice",
    description: description || "Station description to be added.",
    contactEmail,
    streamUrl,
    tier,
    featured,
    approved: false,
    homepageRank: featured && homepageRank ? Number(homepageRank) : undefined,
    status: "draft",
    billingStatus: "paid",
    socialLinks: {
      website,
      facebook,
      instagram,
      youtube,
    },
    gradient: "from-emerald-500 via-amber-500 to-stone-900",
    initials: autoInitials(name || hostName),
    coverImage: coverImage || "/placeholder.svg",
    coverPosition: "center",
  };
};

export const compactStationDraft = (station) =>
  Object.fromEntries(
    Object.entries(station)
      .map(([key, value]) => {
        if (value && typeof value === "object" && !Array.isArray(value)) {
          return [key, compactStationDraft(value)];
        }
        return [key, value];
      })
      .filter(([, value]) => {
        if (value === "" || value === undefined || value === null) return false;
        if (value && typeof value === "object" && !Array.isArray(value)) {
          return Object.keys(value).length > 0;
        }
        return true;
      }),
  );
