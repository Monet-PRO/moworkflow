# MoWorkflow

**Idea → monetised animated video, in one flow.**

Niche research · Prompt library · Script Studio · Image Lab · Video Forge · Voice Library (UK + African dialects) · Projects · Credits.

Built with React 19 + Vite + Tailwind. Dark, animated, fully responsive.

---

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # → dist/
```

## Deploy free

### Netlify (recommended)
1. Push this folder to GitHub.
2. Netlify → *Add new site* → *Import from Git*.
3. Build command `npm run build`, publish directory `dist`. (`netlify.toml` already sets this.)
4. Done — you get `https://moworkflow.netlify.app` to share.

### GitHub Pages
`vite.config.js` uses `base: "./"` and the app uses `HashRouter`, so it works on Pages with no extra config:

```bash
npm run build
npx gh-pages -d dist
```

---

## Project structure

```
src/
  components/
    Hero.jsx     — animated production-line hero (CSS/SVG, not a real GIF, so it stays sharp)
    Shell.jsx    — sidebar + topbar + credit meter
    ui.jsx       — Section, Stat, Bar, GenTile, Spinner, ProBadge
  pages/         — Dashboard, Niche, Prompts, Script, Images, Video, Voices, Projects, Pricing
  data.js        — all mock data (niches, voices, prompts, projects)
```

---

## ⚠️ Read this before you promise users "unlimited free"

This is a **UI prototype**. Every generate button is mocked with a timer. To make it real:

| Capability | Provider options | Real cost |
|---|---|---|
| Realistic images | Replicate (Flux/SDXL), fal.ai | ~$0.003 / image |
| Image → video | Kling, Runway Gen-3, Luma (via fal/Replicate) | ~$0.05–0.50 / 5s clip |
| Text → video | Veo 3, Kling, Sora API | ~$0.10–0.75 / clip |
| Script / prompts | OpenAI, Anthropic, Groq (cheap) | <$0.001 |
| UK + African voices | ElevenLabs (best Yoruba/Igbo/Hausa), Spitch.app (Nigerian-native) | ~$0.02 / 1k chars |

**Three hard truths:**

1. **Netlify and GitHub Pages are static hosts.** They cannot run AI models. Generation must call an external API.
2. **Never put API keys in the frontend.** Anyone can read your bundle. Use **Netlify Functions** (free tier: 125k invocations/month) as a proxy — put keys in Netlify env vars.
3. **"Unlimited free video" is not survivable.** GPU seconds cost real money. The included model is honest:
   - **Free:** 10 scene credits/day → acquisition funnel
   - **Creator $19/mo:** where the margin is
   - **BYOK:** users paste their own keys → genuinely unlimited, costs you $0

### Wiring a real endpoint

`netlify/functions/generate-image.js`:
```js
export default async (req) => {
  const { prompt } = await req.json();
  const r = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Netlify.env.get("REPLICATE_TOKEN")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ version: "<model-version>", input: { prompt } }),
  });
  return new Response(await r.text(), { headers: { "Content-Type": "application/json" } });
};
```
Then call `fetch("/.netlify/functions/generate-image", ...)` from `Images.jsx`.

---

## Suggested build order

1. **Ship this UI** — get it live, collect a waitlist. Costs $0.
2. Add **Supabase** auth + a `credits` table (free tier).
3. Wire **script generation** first — it's nearly free and proves value.
4. Wire **images** next (~$0.003 each, survivable at 10/day).
5. Wire **voice** (ElevenLabs or Spitch for Nigerian dialects).
6. Wire **video last** — it's the expensive one. Gate it behind paid or BYOK from day one.
7. Add **Paystack** for NGN payments (better than Stripe for Nigerian users).
