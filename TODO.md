# To do

## Threads strip: fetch her posts automatically

Use Meta's official Threads API (no scraping). The "From my Threads" strip updates on its own when she posts.

- [ ] Cherry logs in once to a Meta developer app and grants `threads_basic` (plus `threads_manage_insights` for like counts).
- [ ] Store the long-lived token (60 days) as a Vercel env var; refresh it on a schedule before it expires.
- [ ] Server-side fetch of `/me/threads` (text, permalink, timestamp, media) with hourly revalidate; fall back to `posts` in `app/data.ts` if the API fails.
- [ ] **Language:** posts are Malay. Decide: show as-is, or machine-translate. Machine translation breaks the "translations wait for her sign-off" rule, so label it clearly or let her approve in `/admin`.
- [ ] **Off-topic posts:** only show posts about skincare/makeup. Filter by a Shopee link in her self-reply, or a hashtag she adds.
- [ ] Later, maybe: read Shopee links from her self-replies to suggest new products in `/admin` (she still fills in the product name).
