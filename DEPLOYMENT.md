# Deployment Guide

## GitHub Pages Deployment

This project is ready to be deployed on GitHub Pages. Follow these steps:

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select:
   - Branch: `main` (or your default branch)
   - Folder: `/ (root)`
5. Click **Save**

### Step 2: Wait for Deployment

GitHub will automatically build and deploy your site. This usually takes 1-2 minutes.

### Step 3: Access Your Site

Your countdown timer will be available at:
```
https://[your-username].github.io/[repository-name]/
```

For this repository:
```
https://basmulder03.github.io/named-countdown-timer/
```

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the root with your domain name
2. Configure your domain's DNS settings to point to GitHub Pages
3. Update the GitHub Pages settings to use your custom domain

## Testing After Deployment

After deployment, test these features:

1. ✅ Create a timer and verify it counts down
2. ✅ Share the URL and open it in a new tab/window
3. ✅ Generate a short URL using TinyURL
4. ✅ Generate a QR code and scan it with your phone
5. ✅ Test on mobile devices for responsive design

## Troubleshooting

### Site Not Loading

- Wait 5-10 minutes after enabling GitHub Pages
- Check that the branch and folder are correctly configured
- Verify index.html is in the root directory

### APIs Not Working

- TinyURL and QR Server APIs work without authentication
- Check browser console for any CORS or network errors
- Ensure you're accessing the site via HTTPS

### Timer Not Starting from URL

- Verify URL parameters are correctly formatted: `?name=Timer&target=1234567890000`
- Check browser console for JavaScript errors
- Ensure the target timestamp is valid (in milliseconds)

## Updates and Maintenance

To update the site:

1. Make changes to your local files
2. Commit and push to the main branch
3. GitHub Pages will automatically rebuild and deploy

No additional build steps are required as this is a static HTML/CSS/JS project.
