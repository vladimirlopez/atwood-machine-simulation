# Deploying to GitHub Pages

Once you've created your GitHub repository, you can host this simulation online for free using GitHub Pages.

## Method 1: Automatic Setup (Recommended)

1. **Create the repository** using the setup script:
   ```bash
   ./setup-github.sh
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"

3. **Wait a few minutes** and your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/atwood-machine-simulation/
   ```

## Method 2: Manual Setup

If you prefer to do it manually:

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `atwood-machine-simulation`
3. Description: `Interactive HTML5 Atwood Machine physics simulation`
4. Choose "Public" (required for free GitHub Pages)
5. **Don't** initialize with README
6. Click "Create repository"

### Step 2: Push Your Code

```bash
cd "/Users/vladimir.lopez/Desktop/AI/Physics Simulations/Atwood Machine"
git remote add origin https://github.com/YOUR_USERNAME/atwood-machine-simulation.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages**
2. Under "Source", select branch: **main**
3. Click **Save**
4. Your site will be published at: `https://YOUR_USERNAME.github.io/atwood-machine-simulation/`

## Updating Your Live Site

After making changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

GitHub Pages will automatically update within a few minutes.

## Custom Domain (Optional)

If you have a custom domain:

1. In Settings → Pages, add your custom domain
2. Create a `CNAME` file in your repository with your domain
3. Configure DNS settings with your domain provider

## Troubleshooting

### Site not loading?
- Wait 5-10 minutes after first deployment
- Check that repository is public
- Verify GitHub Pages is enabled in Settings

### Changes not appearing?
- Clear browser cache (Cmd+Shift+R on Mac)
- Wait a few minutes for GitHub to rebuild
- Check that you pushed to the correct branch

### 404 Error?
- Make sure the file is named `index.html` (case-sensitive)
- Verify the file is in the root directory, not a subfolder

## Sharing Your Simulation

Once deployed, share your simulation with:
- Students in your classes
- Other educators
- Physics enthusiasts
- On social media with hashtag #PhysicsSimulation

Your URL will be:
```
https://YOUR_USERNAME.github.io/atwood-machine-simulation/
```

## Performance

This simulation:
- ✅ Works on mobile devices
- ✅ No server required
- ✅ Fast loading (pure HTML/CSS/JS)
- ✅ Works offline after first load
- ✅ No dependencies or frameworks

Enjoy teaching physics! 🚀
