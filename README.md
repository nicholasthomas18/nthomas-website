# Personal Portfolio

A modern, minimal personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Inspired by [zackballam.com](https://zackballam.com). Deployable on Vercel.

## Features

- **Pages:** Home (hero, intro, featured projects), Projects (filterable grid + detail pages), About (bio, skills, experience timeline), Thoughts (MDX with dynamic routes), Resume, Contact (form + social links)
- **Design:** Dark theme, smooth animations, card-based project layout, responsive mobile-first
- **Content:** Projects in local JSON; thought posts as MDX in `content/thoughts/`
- **Quality:** Strong typing, accessible (ARIA, semantic HTML), SEO metadata, performance-conscious structure

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)
- [Framer Motion](https://www.framer.com/motion/)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) + [gray-matter](https://github.com/jonschlinkert/gray-matter) for MDX thought posts

## Folder structure

```
├── app/
│   ├── layout.tsx          # Root layout, fonts
│   ├── page.tsx            # Home
│   ├── globals.css
│   ├── not-found.tsx
│   ├── about/page.tsx
│   ├── thoughts/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── resume/page.tsx
│   ├── contact/page.tsx
│   └── projects/
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProjectCard.tsx
│   ├── BlogCard.tsx
│   └── PageTransition.tsx
├── contexts/
│   └── ThemeContext.tsx
├── data/
│   ├── projects.ts         # Project list & helpers
│   ├── about.ts            # Bio, skills, experience
│   └── thoughts.ts         # Thought post slug/content helpers
├── content/
│   └── thoughts/           # MDX posts
├── lib/
│   └── utils.ts
├── types/
│   └── index.ts
└── public/
    └── images/             # Add project images here
```

## Run locally

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the dev server**

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).

2. Go to [vercel.com](https://vercel.com) and sign in with your Git provider.

3. **Import** the repository:
   - Click **Add New… → Project**
   - Select the repo and click **Import**

4. **Configure (optional):**
   - Framework Preset: **Next.js**
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - No env vars needed for the base setup

5. Click **Deploy**. Vercel will build and host the site and give you a URL. Future pushes to the main branch will trigger automatic deployments.

### Custom domain

In the Vercel project: **Settings → Domains** → add your domain and follow the DNS instructions.

## Customization

- **Identity & copy:** Edit `data/about.ts` (name, tagline, bio, skills, experience) and `app/page.tsx` hero text.
- **Projects:** Edit `data/projects.ts`; add optional `image` (path under `public/`), `content`, or `link`.
- **Thoughts:** Add `.mdx` files in `content/thoughts/` with frontmatter (`title`, `excerpt`, `date`, `author`, `tags`).
- **Resume:** Add a PDF at `public/resume.pdf`; the Resume page links to it. Edit `data/about.ts` experience for the inline resume section.
- **Contact form:** Replace the demo submit handler in `app/contact/page.tsx` with your backend (e.g. [Formspree](https://formspree.io), [Resend](https://resend.com), or a Next.js API route).
- **Social links:** Update `components/Footer.tsx` and the social links in `app/contact/page.tsx` and `data/about.ts` if used elsewhere.
- **Theme:** Tweak CSS variables in `app/globals.css` and palette in `tailwind.config.ts`.

## Performance & images

- Use the Next.js `<Image>` component (already used in `ProjectCard` and project detail) for images under `public/`. Add project images to `public/images/` and set `image: "/images/your-image.jpg"` in `data/projects.ts`.
- For external images, configure `next.config.js` `images.domains` (or `remotePatterns` in newer Next.js) as needed.

## License

MIT.
