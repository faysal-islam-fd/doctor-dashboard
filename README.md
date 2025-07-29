# Doctor Dashboard - Servigo

A modern, responsive doctor dashboard built with React, TypeScript, and Tailwind CSS v4. Features a comprehensive medical practice management system with patient management, appointment scheduling, prescription management, and analytics.

## 🚀 Features

- **📊 Dashboard Overview** - Real-time statistics and key metrics
- **👥 Patient Management** - Complete patient profiles and medical history
- **📅 Appointment Scheduling** - Calendar view with appointment management
- **💊 Prescription Management** - Create and manage prescriptions
- **📈 Analytics** - Detailed performance analytics and reports
- **💰 Revenue Tracking** - Financial metrics and revenue analysis
- **⚙️ Settings** - Comprehensive system configuration
- **📱 Responsive Design** - Works perfectly on all devices
- **🎨 Modern UI** - Beautiful glassmorphism design with smooth animations

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization
- **date-fns** - Date manipulation utilities

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd doctor-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub** - Push your code to a GitHub repository
2. **Connect to Vercel** - Go to [vercel.com](https://vercel.com) and import your repository
3. **Configure Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **Deploy** - Click "Deploy" and your app will be live!

### Option 3: Deploy via Git Integration

```bash
# Add Vercel remote
vercel --link

# Deploy on every push
git push origin main
```

## ⚙️ Configuration

The project includes optimized configuration for Vercel deployment:

- **`vercel.json`** - Vercel deployment configuration
- **`.vercelignore`** - Files to exclude from deployment
- **SPA Routing** - All routes redirect to `index.html` for client-side routing
- **Asset Optimization** - Static assets are cached for performance

## 📁 Project Structure

```
doctor-dashboard/
├── src/
│   ├── components/
│   │   └── Layout/
│   │       └── DashboardLayout.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Patients.tsx
│   │   ├── Appointments.tsx
│   │   ├── Prescriptions.tsx
│   │   ├── Analytics.tsx
│   │   ├── Revenue.tsx
│   │   ├── Profile.tsx
│   │   └── Settings.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── types/
│   │   └── index.ts
│   └── main.tsx
├── public/
├── vercel.json
├── .vercelignore
└── package.json
```

## 🎯 Key Features

### Modal-Sidebar Interaction
- Sidebar automatically hides when modals open
- Sidebar reappears when modals close
- Smooth animations and transitions

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface

### Performance Optimized
- Code splitting and lazy loading
- Optimized bundle size
- Fast loading times

## 🔧 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📊 Build Output

The build process creates optimized files in the `dist/` directory:
- **HTML**: `index.html` (entry point)
- **CSS**: `assets/index-*.css` (optimized styles)
- **JS**: `assets/index-*.js` (optimized JavaScript)

## 🌐 Environment Variables

No environment variables are required for this demo application. All data is mocked for demonstration purposes.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Ready for deployment!** 🚀

Your doctor dashboard is now fully configured for Vercel deployment with optimized build settings, proper routing, and all TypeScript errors resolved.
