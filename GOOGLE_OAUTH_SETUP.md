# Google OAuth Setup for CVAdapter

This guide explains how to set up Google OAuth authentication in your Supabase project for CVAdapter.

## Prerequisites

1. A Supabase project
2. A Google Cloud Console project
3. The CVAdapter application code

## Step 1: Set up Google OAuth in Google Cloud Console

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)
4. Go to "Credentials" in the left sidebar
5. Click "Create Credentials" → "OAuth 2.0 Client IDs"
6. Choose "Web application" as the application type
7. Add your authorized redirect URIs:
   - **IMPORTANT**: Use your Supabase project's callback URL, not your application's callback URL
   - The format should be: `https://YOUR_SUPABASE_PROJECT_ID.supabase.co/auth/v1/callback`
   - Example: `https://ggstsllekkxmnfrfmzvf.supabase.co/auth/v1/callback`
8. Note down your **Client ID** and **Client Secret**

## Step 2: Configure Supabase Authentication

1. Go to your Supabase project dashboard
2. Navigate to "Authentication" → "Providers"
3. Find "Google" in the list and click on it
4. Enable Google authentication by toggling the switch
5. Enter your Google OAuth credentials:
   - **Client ID**: Your Google OAuth Client ID
   - **Client Secret**: Your Google OAuth Client Secret
6. Save the configuration

## Step 3: Update Environment Variables

Add the following environment variables to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 4: Test the Integration

1. Start your development server: `yarn dev`
2. Navigate to `/auth/login` or `/auth/signup`
3. Click the "Continue with Google" button
4. You should be redirected to Google's OAuth consent screen
5. After authentication, you should be redirected back to your application

## Features Added

- ✅ Google OAuth sign-in button on login page
- ✅ Google OAuth sign-in button on signup page
- ✅ Reusable Google sign-in button component
- ✅ Updated auth context with Google OAuth support
- ✅ Updated auth callback route for OAuth handling
- ✅ Proper error handling and loading states

## Troubleshooting

### Common Issues

1. **"redirect_uri_mismatch" error**
   - **Solution**: Make sure you're using your Supabase project's callback URL in Google Cloud Console
   - The redirect URI should be: `https://YOUR_SUPABASE_PROJECT_ID.supabase.co/auth/v1/callback`
   - Do NOT use your application's callback URL like `http://localhost:3000/auth/callback`

2. **"Invalid redirect URI" error**
   - Make sure your redirect URI in Google Cloud Console matches exactly with your Supabase callback URL
   - Check that you're using the correct protocol (https for Supabase)
   - Ensure there are no trailing slashes or extra characters

3. **"Client ID not found" error**
   - Verify that your Google OAuth Client ID is correct
   - Ensure the Google+ API is enabled in your Google Cloud project

4. **"Supabase configuration missing" error**
   - Check that your environment variables are properly set
   - Restart your development server after updating environment variables

### Testing in Production

When deploying to production:

1. **No changes needed for redirect URIs** - Supabase handles the OAuth flow
2. Update your Supabase project settings if needed
3. Ensure your environment variables are set in your hosting platform

## Security Notes

- Never commit your Google OAuth Client Secret to version control
- Use environment variables for all sensitive configuration
- Regularly rotate your OAuth credentials
- Monitor your OAuth usage in Google Cloud Console

## How Supabase OAuth Works

When using Supabase OAuth:
1. User clicks "Continue with Google"
2. Supabase redirects to Google with its own callback URL
3. Google redirects back to Supabase's callback URL
4. Supabase exchanges the code for a session
5. Supabase redirects to your application's callback URL
6. Your application handles the final redirect to the dashboard

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables) 