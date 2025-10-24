# Embedding Atwood Machine Simulation in Canvas LMS

This guide shows you how to enable GitHub Pages and embed the simulation in Canvas LMS.

---

## Part 1: Enable GitHub Pages

### Option A: Using GitHub Web Interface (Recommended)

1. **Go to your repository** (should be open in your browser now):
   https://github.com/vladimirlopez/atwood-machine-simulation

2. **Navigate to Settings**:
   - Click the "Settings" tab at the top of the repository

3. **Find Pages Settings**:
   - In the left sidebar, click "Pages" (under "Code and automation")

4. **Configure Source**:
   - Under "Build and deployment"
   - Source: Select "Deploy from a branch"
   - Branch: Select "main" and "/ (root)"
   - Click "Save"

5. **Wait for Deployment** (1-2 minutes):
   - Refresh the page
   - You'll see a message: "Your site is live at https://vladimirlopez.github.io/atwood-machine-simulation/"

6. **Test the URL**:
   - Visit: https://vladimirlopez.github.io/atwood-machine-simulation/
   - The simulation should load

### Option B: Using GitHub CLI (Alternative)

If the web interface doesn't work, you can use the GitHub API:

```bash
gh api repos/vladimirlopez/atwood-machine-simulation/pages \
  --method POST \
  -f source[branch]=main \
  -f source[path]=/
```

---

## Part 2: Embed in Canvas LMS

Once GitHub Pages is enabled and your URL is live, you have several options:

### Method 1: Embed as an External Tool (iFrame) - RECOMMENDED

This method displays the simulation directly in a Canvas page.

1. **Edit a Canvas Page**:
   - Go to your Canvas course
   - Navigate to Pages → Create a new page or edit an existing one

2. **Switch to HTML Editor**:
   - Click the "HTML Editor" link in the editor toolbar

3. **Add the iFrame Code**:
   ```html
   <h2>Interactive Atwood Machine Simulation</h2>
   <p>Use the controls to adjust masses and initial velocity. Click Start to begin the simulation.</p>
   
   <iframe 
     src="https://vladimirlopez.github.io/atwood-machine-simulation/" 
     width="100%" 
     height="900" 
     style="border: 1px solid #ccc; border-radius: 4px;"
     title="Atwood Machine Simulation">
   </iframe>
   
   <p><a href="https://vladimirlopez.github.io/atwood-machine-simulation/" target="_blank">Open simulation in new window</a></p>
   ```

4. **Adjust Settings**:
   - Increase height if needed (try 900-1000 pixels)
   - The simulation is responsive and will adjust to the width

5. **Save and Publish**

### Method 2: External URL Link

Simpler but requires students to leave Canvas:

1. **Edit a Canvas Page or Module**
2. **Add Content → External URL**
3. **Enter**:
   - Name: "Atwood Machine Simulation"
   - URL: https://vladimirlopez.github.io/atwood-machine-simulation/
   - Check "Load in a new tab"
4. **Save**

### Method 3: External Tool (LTI) - Advanced

For deeper integration with Canvas features:

1. **Go to Settings → Apps**
2. **Add App → By URL**
3. **Configure**:
   - Name: "Atwood Machine"
   - Consumer Key: (create one)
   - Shared Secret: (create one)
   - Config URL: Your LTI configuration URL
   
*Note: This requires setting up LTI on your server, which is more complex*

---

## Part 3: Optimize for Canvas

### A. Make it Full-Width Responsive

If you want the simulation to better fit Canvas, you can modify the CSS:

Edit `styles.css` and add at the top:

```css
/* Canvas LMS optimization */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    .simulation-wrapper {
        grid-template-columns: 1fr;
    }
    
    canvas {
        max-width: 100%;
        height: auto;
    }
}
```

### B. Add Canvas-Friendly Instructions

Consider adding a note at the top of index.html for Canvas users:

```html
<div class="canvas-notice" style="background: #f0f7ff; padding: 15px; margin-bottom: 20px; border-left: 4px solid #2fa4e7;">
    <strong>📚 For Canvas Users:</strong> This simulation works best in full-screen mode. 
    <a href="https://vladimirlopez.github.io/atwood-machine-simulation/" target="_blank">Click here to open in a new window</a>.
</div>
```

---

## Part 4: Create a Canvas Assignment (Optional)

You can turn this into an interactive assignment:

1. **Create Assignment**:
   - Go to Assignments → + Assignment
   - Name: "Atwood Machine Lab"
   - Points: 10

2. **Add Instructions**:
   ```
   Complete the following experiments using the Atwood Machine simulation:
   
   1. Set m₁ = 2 kg, m₂ = 3 kg, v₀ = 0 m/s
      - Record the acceleration and tension
      - Explain why the system accelerates
   
   2. Set m₁ = 2.5 kg, m₂ = 2.5 kg, v₀ = 2 m/s
      - What happens to the acceleration?
      - Describe the motion over time
   
   3. Set m₁ = 2 kg, m₂ = 3 kg, v₀ = -3 m/s
      - Describe what happens to the velocity
      - When does the system change direction?
      - Why does this happen even though acceleration is constant?
   
   Submit your answers as a PDF or text entry.
   ```

3. **Embed the Simulation** (in the assignment description using Method 1 above)

4. **Set Submission Type**: "Online" → "Text Entry" or "File Upload"

---

## Testing Checklist

Before sharing with students:

- [ ] GitHub Pages URL loads correctly
- [ ] Simulation works in the iFrame
- [ ] Controls (sliders, buttons) are responsive
- [ ] Simulation displays properly on desktop
- [ ] Simulation displays properly on mobile (if applicable)
- [ ] Students can access without authentication issues
- [ ] All equations render properly (MathJax)
- [ ] Canvas doesn't block the iFrame (check browser console)

---

## Troubleshooting

### Problem: iFrame doesn't load in Canvas

**Solution 1**: Check Canvas settings
- Admin might need to whitelist `github.io` domain
- Contact your Canvas admin

**Solution 2**: Use External URL instead (Method 2 above)

### Problem: Simulation is cut off

**Solution**: Increase iFrame height:
```html
<iframe height="1000" ...>
```

### Problem: MathJax doesn't render

**Solution**: Add longer load time or check browser console for CDN blocks

### Problem: GitHub Pages not deploying

**Solution**: 
- Check GitHub Actions tab for build errors
- Ensure all files (HTML, CSS, JS) are in root directory
- Wait 5-10 minutes after enabling Pages

---

## Additional Resources

- **Your Live Simulation**: https://vladimirlopez.github.io/atwood-machine-simulation/
- **GitHub Repository**: https://github.com/vladimirlopez/atwood-machine-simulation
- **Canvas Community**: https://community.canvaslms.com/
- **GitHub Pages Docs**: https://docs.github.com/en/pages

---

## Next Steps

1. ✅ Enable GitHub Pages (Part 1)
2. ✅ Test the live URL
3. ✅ Embed in Canvas (Part 2, Method 1)
4. ✅ Share with students
5. 📊 Gather feedback and iterate

Good luck with your Canvas integration!
