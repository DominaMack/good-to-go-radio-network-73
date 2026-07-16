import { useEffect, useMemo, useState } from "react";
import { Clipboard, RotateCcw, Save, Star } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import StationCard from "@/components/StationCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Station } from "@/data/stations";
import { FEATURED_HOMEPAGE_LIMIT, stations } from "@/data/stations";
import { toast } from "sonner";

type StationForm = {
  name: string;
  hostName: string;
  genre: string;
  tagline: string;
  description: string;
  contactEmail: string;
  streamUrl: string;
  tier: Station["tier"];
  featured: boolean;
  homepageRank: string;
  approved: boolean;
  status: Station["status"];
  billingStatus: Station["billingStatus"];
  website: string;
  facebook: string;
  instagram: string;
  youtube: string;
  initials: string;
  gradient: string;
  coverImage: string;
  coverPosition: string;
};

const storageKey = "good-to-go-station-admin-draft";

const defaultForm: StationForm = {
  name: "",
  hostName: "",
  genre: "",
  tagline: "",
  description: "",
  contactEmail: "",
  streamUrl: "",
  tier: "standard",
  featured: false,
  homepageRank: "",
  approved: true,
  status: "active",
  billingStatus: "paid",
  website: "",
  facebook: "",
  instagram: "",
  youtube: "",
  initials: "",
  gradient: "from-emerald-500 via-amber-500 to-stone-900",
  coverImage: "/placeholder.svg",
  coverPosition: "center",
};

const gradients = [
  "from-emerald-500 via-amber-500 to-stone-900",
  "from-yellow-600 via-amber-700 to-zinc-900",
  "from-amber-500 via-orange-600 to-red-800",
  "from-sky-500 via-amber-500 to-zinc-900",
  "from-fuchsia-500 via-amber-500 to-stone-900",
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const autoInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const cleanObject = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(cleanObject);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .map(([key, item]) => [key, cleanObject(item)] as const)
      .filter(([, item]) => {
        if (item === undefined || item === "") return false;
        if (item && typeof item === "object" && !Array.isArray(item)) {
          return Object.keys(item).length > 0;
        }
        return true;
      }),
  );
};

const codeForStation = (station: Station) =>
  `${JSON.stringify(cleanObject(station), null, 2)
    .replace(/"([a-zA-Z0-9_]+)":/g, "$1:")
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n")},`;

const readDraft = () => {
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? { ...defaultForm, ...JSON.parse(saved) } : defaultForm;
  } catch {
    return defaultForm;
  }
};

const AdminStations = () => {
  const [form, setForm] = useState<StationForm>(() =>
    typeof window === "undefined" ? defaultForm : readDraft(),
  );

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(form));
  }, [form]);

  const slug = slugify(form.name || "new-station");
  const currentFeaturedCount = stations.filter((station) => station.featured).length;
  const station = useMemo<Station>(
    () => ({
      id: `station-${slug}`,
      slug,
      name: form.name || "New Station",
      hostName: form.hostName || form.name || "Host to be announced",
      genre: form.genre || undefined,
      tagline: form.tagline || "New Voice",
      description: form.description || "Station description to be added.",
      contactEmail: form.contactEmail || undefined,
      streamUrl: form.streamUrl || undefined,
      tier: form.tier,
      featured: form.featured,
      approved: form.approved,
      homepageRank: form.featured && form.homepageRank ? Number(form.homepageRank) : undefined,
      status: form.status,
      billingStatus: form.billingStatus,
      socialLinks: {
        website: form.website || undefined,
        facebook: form.facebook || undefined,
        instagram: form.instagram || undefined,
        youtube: form.youtube || undefined,
      },
      gradient: form.gradient,
      initials: form.initials || autoInitials(form.name || "New Station"),
      coverImage: form.coverImage || "/placeholder.svg",
      coverPosition: form.coverPosition || "center",
    }),
    [form, slug],
  );

  const stationCode = useMemo(() => codeForStation(station), [station]);

  const update = <Key extends keyof StationForm>(key: Key, value: StationForm[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const copyStationCode = async () => {
    try {
      await navigator.clipboard.writeText(stationCode);
      toast.success("Station entry copied", {
        description: "Paste it into src/data/stations.ts when it is ready to publish.",
      });
    } catch {
      toast.error("Clipboard blocked", {
        description: "Select the generated entry and copy it manually.",
      });
    }
  };

  const resetDraft = () => {
    setForm(defaultForm);
    window.localStorage.removeItem(storageKey);
    toast.success("Draft reset");
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Admin"
        title="Station Builder"
        subtitle="Create station entries, choose tiers, and manage homepage featured slots."
      />

      <section className="bg-background py-12">
        <div className="container-custom grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-3xl">Station Details</h2>
                  <p className="text-sm text-muted-foreground">Slug: {slug}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={form.featured ? "default" : "outline"}>
                    {form.featured ? "Featured" : "Network"}
                  </Badge>
                  <Badge variant="secondary">{form.tier}</Badge>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="station-name">Station Name</Label>
                  <Input id="station-name" value={form.name} onChange={(event) => update("name", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="host-name">Host Or Group Name</Label>
                  <Input id="host-name" value={form.hostName} onChange={(event) => update("hostName", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Input id="genre" value={form.genre} onChange={(event) => update("genre", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input id="tagline" value={form.tagline} onChange={(event) => update("tagline", event.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={6}
                    value={form.description}
                    onChange={(event) => update("description", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={form.contactEmail}
                    onChange={(event) => update("contactEmail", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stream-url">Stream URL</Label>
                  <Input id="stream-url" value={form.streamUrl} onChange={(event) => update("streamUrl", event.target.value)} />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="font-display text-3xl">Placement</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Tier</Label>
                  <Select value={form.tier} onValueChange={(value: Station["tier"]) => update("tier", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="homepage-rank">Homepage Rank</Label>
                  <Input
                    id="homepage-rank"
                    type="number"
                    min="1"
                    max={FEATURED_HOMEPAGE_LIMIT}
                    value={form.homepageRank}
                    disabled={!form.featured}
                    onChange={(event) => update("homepageRank", event.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-3">
                  <div>
                    <Label htmlFor="featured-slot">Featured Slot</Label>
                    <p className="text-xs text-muted-foreground">
                      {currentFeaturedCount}/{FEATURED_HOMEPAGE_LIMIT} homepage slots used
                    </p>
                  </div>
                  <Switch
                    id="featured-slot"
                    checked={form.featured}
                    onCheckedChange={(checked) => update("featured", checked)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(value: Station["status"]) => update("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Billing</Label>
                  <Select
                    value={form.billingStatus}
                    onValueChange={(value: Station["billingStatus"]) => update("billingStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="past_due">Past Due</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-3">
                  <div>
                    <Label htmlFor="approved">Approved</Label>
                    <p className="text-xs text-muted-foreground">Visible when active and paid</p>
                  </div>
                  <Switch id="approved" checked={form.approved} onCheckedChange={(checked) => update("approved", checked)} />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="font-display text-3xl">Media And Links</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cover-image">Cover Image URL</Label>
                  <Input id="cover-image" value={form.coverImage} onChange={(event) => update("coverImage", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cover-position">Image Position</Label>
                  <Input
                    id="cover-position"
                    value={form.coverPosition}
                    onChange={(event) => update("coverPosition", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="initials">Card Initials</Label>
                  <Input id="initials" value={form.initials} onChange={(event) => update("initials", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Card Color</Label>
                  <Select value={form.gradient} onValueChange={(value) => update("gradient", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {gradients.map((gradient) => (
                        <SelectItem key={gradient} value={gradient}>
                          {gradient.replace(/-/g, " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" value={form.website} onChange={(event) => update("website", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" value={form.facebook} onChange={(event) => update("facebook", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" value={form.instagram} onChange={(event) => update("instagram", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input id="youtube" value={form.youtube} onChange={(event) => update("youtube", event.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="font-display text-3xl">Preview</h2>
                {form.featured && <Star className="h-5 w-5 fill-primary text-primary" />}
              </div>
              <StationCard station={station} variant="detailed" interactive={false} />
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="font-display text-3xl">Station Entry</h2>
                <Button size="sm" onClick={copyStationCode} className="bg-gradient-gold-bright text-background">
                  <Clipboard className="mr-2 h-4 w-4" /> Copy
                </Button>
              </div>
              <pre className="max-h-[520px] overflow-auto rounded-md border border-border bg-background p-4 text-xs text-muted-foreground">
                <code>{stationCode}</code>
              </pre>
              <div className="mt-4 flex gap-3">
                <Button variant="outline" onClick={() => toast.success("Draft saved", { description: "Saved in this browser." })}>
                  <Save className="mr-2 h-4 w-4" /> Save Draft
                </Button>
                <Button variant="outline" onClick={resetDraft}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default AdminStations;
