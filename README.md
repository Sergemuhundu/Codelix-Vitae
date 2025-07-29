# ResumeAI - Professional Resume Generator SaaS

A comprehensive, production-ready resume generator SaaS application built with modern web technologies. Create ATS-optimized resumes, generate AI-powered cover letters, and manage your professional profile—all in one platform.

## 🚀 Features

### Core Functionality
- **Resume Builder**: Template-based resume creation with drag-and-drop functionality
- **ATS Optimization**: OpenAI integration to analyze and optimize resumes for ATS compatibility
- **Cover Letter Generator**: AI-powered cover letter creation based on job descriptions
- **Job-Specific Resume Generation**: Parse job offers and automatically tailor resumes
- **User Profile Management**: Store user information, work history, skills, and education

### Template System
- **11 Professional Templates**: Including 4 free and 7 premium templates
- **Free Templates**: Modern, Minimal, Professional, Sidebar
- **Premium Templates**: Executive Premium, Tech Focused, Creative Minimal, Startup Dynamic, Academic Research, Corporate Elite, Dark Sidebar
- **Template Categories**: Modern, Professional, Executive, Tech, Creative, Academic
- **Real-time Preview**: Live preview of resume changes
- **Template Filtering**: Filter by free, premium, or all templates

### Premium Features
- **Premium Templates**: 7 exclusive premium templates with advanced styling
- **Unlimited Downloads**: No restrictions on PDF generation
- **Advanced ATS Optimization**: Enhanced scoring and improvement suggestions
- **AI Cover Letter Generation**: Intelligent cover letter creation
- **Priority Support**: Dedicated customer support
- **Custom Branding**: PDF export with custom branding options

### Technical Features
- **Multi-language Support**: English and French with i18n
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Sync**: Automatic saving and synchronization
- **Secure Authentication**: JWT-based auth with Supabase
- **Database Management**: Comprehensive data modeling with RLS policies

## 🛠 Tech Stack

- **Frontend**: Next.js 14+ with TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Database, Authentication, Real-time)
- **AI Integration**: OpenAI GPT-4 for content generation and optimization
- **Payments**: Stripe for subscription management
- **Deployment**: Vercel-ready with static export support
- **Database**: PostgreSQL with Row Level Security

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Supabase project set up
- OpenAI API key (for AI features)
- Stripe account (for payments)

## 🏗 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/resumeai.git
   cd resumeai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # OpenAI Configuration
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   NEXT_PUBLIC_STRIPE_PRICE_MONTHLY=price_monthly_id
   NEXT_PUBLIC_STRIPE_PRICE_YEARLY=price_yearly_id
   ```

4. **Database Setup**
   Run the migration file in your Supabase dashboard:
   ```sql
   -- Execute the contents of supabase/migrations/create_schema.sql
   ```

5. **Stripe Configuration**
   Set up your Stripe products and webhooks:
   - Create monthly ($5) and yearly ($50) subscription products
   - Configure webhook endpoint: `your-domain.com/api/stripe/webhooks`
   - Add webhook events: `checkout.session.completed`, `customer.subscription.updated`, etc.

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📁 Project Structure

```
resumeai/
├── app/                        # Next.js App Router
│   ├── (dashboard)/           # Protected dashboard routes
│   │   ├── page.tsx          # Dashboard home
│   │   ├── builder/          # Resume builder
│   │   ├── ats-optimizer/    # ATS optimization
│   │   ├── cover-letter/     # Cover letter generator
│   │   ├── profile/          # User profile
│   │   └── billing/          # Subscription management
│   ├── auth/                 # Authentication pages
│   ├── api/                  # API routes
│   └── globals.css           # Global styles
├── components/               # Reusable components
│   ├── ui/                  # shadcn/ui components
│   ├── builder/             # Resume builder components
│   │   ├── template-selector.tsx    # Template selection with premium support
│   │   ├── premium-template-card.tsx # Premium template display
│   │   └── ...
│   └── dashboard/           # Dashboard-specific components
│       ├── premium-banner.tsx       # Premium upgrade banner
│       ├── template-stats.tsx       # Template statistics
│       └── ...
├── lib/                     # Utility libraries
│   ├── auth.tsx            # Authentication context
│   ├── supabase.ts         # Database operations
│   ├── openai.ts           # AI integration
│   ├── stripe.ts           # Payment processing
│   └── templates.ts        # Template definitions and utilities
├── hooks/                   # Custom hooks
│   ├── use-subscription.ts # Subscription management
│   └── use-toast.ts        # Toast notifications
├── supabase/               # Database migrations
└── public/                 # Static assets
```

## 🔐 Authentication & Security

- **Supabase Auth**: Email/password authentication with JWT tokens
- **Row Level Security**: Database-level security policies
- **API Protection**: Server-side validation for all API endpoints
- **Subscription Validation**: Middleware for premium feature access

## 💰 Subscription Model

### Free Tier
- 2 resume downloads per month
- 4 basic templates (Modern, Minimal, Professional, Sidebar)
- Standard support
- Basic ATS optimization

### Pro Tier ($5/month, $50/year)
- Unlimited resume downloads
- All 10 templates (4 free + 6 premium)
- Priority support
- Advanced ATS optimization
- AI cover letter generation
- Job-specific resume tailoring
- Custom PDF branding

## 🎨 Template System

### Free Templates
- **Modern**: Clean and contemporary design with subtle gradients
- **Minimal**: Simple and elegant layout with focus on content
- **Professional**: Traditional business style with structured sections
- **Sidebar**: Two-column layout with blue sidebar and white main content

### Premium Templates
- **Executive Premium**: Sophisticated design for senior leadership positions
- **Tech Focused**: Technical layout optimized for software engineering roles
- **Creative Minimal**: Minimalist design with creative touches for design roles
- **Startup Dynamic**: Dynamic design for startup and fast-paced environments
- **Academic Research**: Traditional format for academic and research positions
- **Corporate Elite**: Premium corporate design for Fortune 500 companies
- **Dark Sidebar**: Professional two-column layout with dark sidebar and profile picture

## 🌐 Internationalization

The application supports multiple languages:
- English (default)
- French
- Easy to extend for additional languages

## 📊 Database Schema

### Core Tables
- `user_profiles`: User information and professional details
- `resumes`: Resume content and metadata
- `cover_letters`: Generated cover letters
- `subscriptions`: Stripe subscription management
- `resume_templates`: Available resume templates

## 🔧 API Endpoints

### Template Management
- `GET /api/templates/check-access`: Check user's access to premium templates
- `POST /api/generate-pdf`: Generate PDF with selected template
- `POST /api/ai-suggestions`: Get AI-powered resume suggestions

### Subscription Management
- `POST /api/stripe/create-checkout-session`: Create Stripe checkout session
- `POST /api/stripe/webhooks`: Handle Stripe webhooks

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables
Ensure all required environment variables are set in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@resumeai.com or join our Slack channel.

## 🗺 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced template editor
- [ ] Resume analytics dashboard
- [ ] Integration with job boards
- [ ] Multi-language templates
- [ ] Advanced AI features