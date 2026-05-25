# 🌊 Ocean & Night Sky — Bioluminescence Website

A dark, editorial website exploring deep-sea bioluminescence. Built with **Next.js 14 App Router**, styled with a custom ocean design system, and powered by **Outstatic CMS** — a Git-based headless CMS that stores content directly in your GitHub repository.

---

## 📁 Project Structure

```
ocean-site/
├── app/
│   ├── layout.tsx              # Root layout (Navbar + Footer)
│   ├── page.tsx                # Home page (hero + article)
│   ├── globals.css             # Design tokens, animations
│   ├── explore/page.tsx        # Creature field guide
│   ├── blog/
│   │   ├── page.tsx            # Blog listing (reads from CMS)
│   │   └── [slug]/page.tsx     # Individual post
│   ├── about/page.tsx          # About page
│   ├── outstatic/[[...ost]]/   # CMS admin UI
│   └── api/outstatic/[...ost]/ # CMS API routes
├── components/
│   ├── Navbar.tsx              # Responsive sticky navbar
│   ├── Footer.tsx              # Site footer
│   └── ScrollReveal.tsx        # Scroll animation trigger
├── outstatic-content/
│   ├── outstatic.json          # Collection schema
│   └── posts/                  # Markdown blog posts
├── .env.example                # Environment variable template
└── README.md
```

---

## 🚀 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in every variable (see the **Environment Variables** section below).

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) — the site will be live.

Visit [http://localhost:3000/outstatic](http://localhost:3000/outstatic) — to access the CMS dashboard.

---

## 🔑 Environment Variables

These variables are **required** for Outstatic CMS to work. Without them, the site still renders but the CMS admin dashboard will not function.

| Variable | Description | Example |
|---|---|---|
| `OST_GITHUB_ID` | GitHub OAuth App Client ID | `Iv1.abc123def456` |
| `OST_GITHUB_SECRET` | GitHub OAuth App Client Secret | `abc123...` |
| `OST_TOKEN_SECRET` | Random secret (min 32 chars) | `openssl rand -base64 32` |
| `OST_REPO_SLUG` | Your repo in `owner/repo` format | `jane/ocean-site` |
| `OST_REPO_BRANCH` | Branch to read/write content | `main` |
| `NEXT_PUBLIC_SITE_URL` | Full URL of your site (no trailing slash) | `https://ocean-site.vercel.app` |

### How to get your GitHub OAuth credentials

1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in the form:
   - **Application name:** Ocean Site CMS (or anything you like)
   - **Homepage URL:** `https://your-site.vercel.app`
   - **Authorization callback URL:** `https://your-site.vercel.app/api/outstatic/callback`
   - For local dev use: `http://localhost:3000/api/outstatic/callback`
4. Click **"Register application"**
5. Copy **Client ID** → `OST_GITHUB_ID`
6. Click **"Generate a new client secret"** → `OST_GITHUB_SECRET`

### How to generate a token secret

Run this in your terminal:

```bash
openssl rand -base64 32
```

Copy the output into `OST_TOKEN_SECRET`.

---

## ☁️ Deploying to Vercel

### Step 1 — Push your code to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2 — Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repo
4. Vercel will auto-detect **Next.js** — no build config needed
5. **Do not deploy yet** — add environment variables first (Step 3)

### Step 3 — Add environment variables in Vercel

1. In the Vercel import screen, expand **"Environment Variables"**
2. Add each variable from the table above, one by one:

| Name | Value |
|---|---|
| `OST_GITHUB_ID` | _(your GitHub OAuth Client ID)_ |
| `OST_GITHUB_SECRET` | _(your GitHub OAuth Client Secret)_ |
| `OST_TOKEN_SECRET` | _(your generated random secret)_ |
| `OST_REPO_SLUG` | `your-username/your-repo-name` |
| `OST_REPO_BRANCH` | `main` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` |

> **Important:** Set `NEXT_PUBLIC_SITE_URL` to your **actual Vercel URL**. You can find this after the first deployment in the Vercel dashboard under "Domains". If you add a custom domain later, update this variable.

3. Click **"Deploy"**

### Step 4 — Update GitHub OAuth callback URL

After deployment, go back to your GitHub OAuth App settings:

1. [github.com/settings/developers](https://github.com/settings/developers)
2. Click your OAuth App
3. Update **Authorization callback URL** to:
   ```
   https://your-project.vercel.app/api/outstatic/callback
   ```
4. Save changes

---

## ✍️ Using the CMS

### Access the dashboard

Visit `/outstatic` on your deployed site (or `localhost:3000/outstatic` locally).

Sign in with your **GitHub account** (the one that owns the repository).

### Creating a post

1. Click **"Posts"** in the CMS sidebar
2. Click **"New Post"**
3. Fill in the title, description, and write content in Markdown
4. Set **Status** to `published`
5. Click **"Save"** — this commits the post as a `.md` file directly to your GitHub repo

### Redeployment

Vercel automatically redeploys when a new commit is pushed to your `main` branch. Since Outstatic saves posts as GitHub commits, your site will **redeploy automatically** every time you publish a post.

---

## 🎨 Customisation

### Colors

All design tokens are in `app/globals.css` under `:root`:

```css
:root {
  --ocean-deep:   #030d1a;
  --ocean-dark:   #05111f;
  --ocean-blue:   #38bdf8;
  --ocean-teal:   #2dd4bf;
  --ocean-accent: #4ec9b0;
  /* ... */
}
```

### Navigation links

Edit the `links` array in `components/Navbar.tsx`:

```ts
const links = [
  { href: '/',        label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/blog',    label: 'Journal' },
  { href: '/about',   label: 'About' },
]
```

### Adding a new page

1. Create `app/your-page/page.tsx`
2. Add it to the `links` array in `Navbar.tsx`

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org) | React framework, App Router, SSG |
| [Outstatic](https://outstatic.com) | Git-based headless CMS |
| [Tailwind CSS](https://tailwindcss.com) | Utility CSS |
| [markdown-it](https://github.com/markdown-it/markdown-it) | Markdown → HTML rendering |
| [Vercel](https://vercel.com) | Hosting & CI/CD |

---

## ❓ Troubleshooting

**CMS login fails / redirect error**
→ Check that `NEXT_PUBLIC_SITE_URL` matches your actual URL exactly (no trailing slash), and that the GitHub OAuth callback URL matches.

**Posts don't appear on the blog page**
→ Make sure posts are in `outstatic-content/posts/` and have `status: 'published'` in their frontmatter.

**Build fails on Vercel**
→ Check all environment variables are added. Run `npm run build` locally to catch errors before pushing.

**CMS asks for repo access but fails**
→ Ensure the GitHub account you log into the CMS with has write access to the repository set in `OST_REPO_SLUG`.

---

## 📄 License

MIT — free to use, modify, and deploy.
