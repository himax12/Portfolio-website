# SETUP INSTRUCTIONS

## Quick Start (5 minutes)

### Step 1: Install Dependencies

\`\`\`bash
npm install
\`\`\`

### Step 2: Add Your Profile Picture

1. Add your profile picture to `public/profile.jpg`
2. Recommended size: 400x400px, square
3. Supported formats: JPG, PNG, WebP

### Step 3: Update Your Information

Edit `config/site.ts` and replace:

- `name`: Your full name
- `title`: Your role (Developer, Designer, Founder, etc.)
- `description`: Your bio (2-3 sentences)
- `githubUsername`: Your GitHub username (for contribution graph)
- All social links (email, github, twitter)

### Step 4: Add Your Projects

In `config/site.ts`, update the `projects` array:

1. Add project images to `public/projects/`
2. For each project, fill in:
   - title
   - description
   - image path (e.g., "/projects/my-project.jpg")
   - tags (technologies used)
   - liveUrl (if deployed)
   - githubUrl (if open source)
   - isLive: true/false

### Step 5: Customize Tech Stack

Update the `stack` object in `config/site.ts` with your actual technologies:

- frontend
- backend
- database
- languages
- tools
- web3 (or remove if not applicable)

### Step 6: Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000

## Image Guidelines

### Profile Picture

- **Size**: 400x400px (square)
- **Format**: JPG, PNG, or WebP
- **Quality**: High resolution, professional
- **Location**: `public/profile.jpg`

### Project Images

- **Size**: Minimum 1200x800px (3:2 aspect ratio)
- **Format**: JPG, PNG, or WebP
- **Quality**: High resolution, clear UI/UX screenshots
- **Location**: `public/projects/[project-name].jpg`

### Resume (Optional)

- **Format**: PDF
- **Location**: `public/resume.pdf`

## Customization Tips

### Change Colors

Edit `app/globals.css` to customize colors:
\`\`\`css
:root {
--background: 0 0% 100%; /_ Light mode background _/
--foreground: 0 0% 3.9%; /_ Light mode text _/
}

.dark {
--background: 0 0% 7%; /_ Dark mode background _/
--foreground: 0 0% 98%; /_ Dark mode text _/
}
\`\`\`

### Add Animation Speed

In component files, adjust `transition` durations:
\`\`\`typescript
transition: { duration: 0.5 } // Make this faster (0.3) or slower (0.8)
\`\`\`

### Change Default Theme

In `app/layout.tsx`, change `defaultTheme`:
\`\`\`typescript
<ThemeProvider defaultTheme="dark"> // or "light" or "system"
\`\`\`

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

### Deploy to Netlify

1. Push your code to GitHub
2. Go to https://netlify.com
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `.next`

## Troubleshooting

### Images Not Showing

- Check file paths are correct (case-sensitive)
- Ensure images are in the `public/` folder
- Verify image extensions match the file names

### GitHub Calendar Not Showing

- Verify your GitHub username is correct in `config/site.ts`
- Check that your profile is public
- Wait a few seconds for the API to load

### Theme Toggle Not Working

- Clear browser cache
- Check that `next-themes` is installed: `npm install next-themes`

### Build Errors

- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Run `npm run build`

## Need Help?

Check the README.md for more detailed information.

Happy building! 🚀
