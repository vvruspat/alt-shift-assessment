# Cover Letter Generator Application

A Next.js application for generating personalized cover letters with AI integration. This project was built as a test assignment for Variant Group.

## 📋 Project Overview

This application helps users create professional cover letters by:
- Generating AI-powered cover letters based on job details
- Storing created letters locally in the browser
- Tracking progress towards a goal of 5 applications
- Providing a clean, responsive interface for managing applications

### Key Features

- ✅ **AI-Powered Generation**: Uses OpenAI API to create personalized cover letters
- ✅ **Persistent Storage**: Letters are saved locally using Supabase and browser storage
- ✅ **Progress Tracking**: Visual banner showing progress towards 5 applications goal
- ✅ **Responsive Design**: Mobile-first approach with full desktop support
- ✅ **Custom UI Components**: Built from scratch without using pre-made UI kits
- ✅ **Loading States**: Simulates letter generation with loading indicators
- ✅ **Copy to Clipboard**: Easy copying of generated letters

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (no Tailwind)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with Immer
- **AI Integration**: OpenAI API
- **Database**: Supabase
- **Testing**: Vitest + React Testing Library
- **UI Components**: Custom design system built from Figma mockups
- **Animations**: Framer Motion
- **Fonts**: [Fixel](https://github.com/MacPaw/Fixel) font family

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (for database)
- OpenAI API key (for AI generation)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd alt-shift-assessment
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome
- `npm test` - Run Vitest tests
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

## 🏗 Project Structure

```
src/
├── actions/          # Server actions for API calls
├── app/             # Next.js app router pages
├── components/      # Application-specific components
├── constants/       # Application constants
├── lib/            # Utilities and configurations
├── store/          # Zustand state management
├── types/          # TypeScript type definitions
├── uikit/          # Reusable UI component library
│   ├── atoms/      # Basic UI components (Button, Input, etc.)
│   ├── hooks/      # Custom React hooks
│   ├── icons/      # SVG icon components
│   └── styles/     # Global styles and CSS variables
└── utils/          # Helper functions
```

## 🎨 Design System

The application features a custom-built component library created from Figma mockups, including:

- **Atoms**: Button, Input, Card, Badge, Checkbox, Select, Textarea, etc.
- **Layout**: Flex, Grid, Divider, etc.
- **Forms**: FormField, FileInput, Datepicker, etc.
- **Feedback**: Alert, Spinner, Loading states
- **Theme Support**: Light/Dark mode with CSS variables

All components are:
- Fully typed with TypeScript
- Tested with Vitest
- Documented in Storybook
- Styled with CSS Modules
- Responsive and accessible

## 🧪 Testing

The project includes comprehensive tests:

- **Unit Tests**: Component tests using Vitest and React Testing Library
- **Store Tests**: Zustand store logic tests
- **Storybook Tests**: Visual regression testing via Storybook

Run tests:
```bash
npm test
```

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interactions
- Optimized for various screen sizes

## 🔑 Key Implementation Details

### State Management
Uses Zustand with persistence middleware to maintain application state across page reloads.

### AI Integration
Integrates with OpenAI API to generate personalized cover letters based on:
- Job title
- Company name
- Key skills
- Additional details

### Data Persistence
- Local state: Zustand with localStorage persistence
- Remote data: Supabase for cross-device synchronization

### Form Handling
- Form state persisted between page reloads
- Validation with clear error states
- Progressive form completion

## 🎯 Project Requirements Met

- ✅ Two-screen application (Dashboard + Create Form)
- ✅ Motivation banner for reaching 5 applications
- ✅ Persistent storage without server database
- ✅ Custom component library from Figma mockups
- ✅ Mobile-responsive design
- ✅ AI-powered letter generation
- ✅ Loading states (2-3 second simulation)
- ✅ TypeScript + React
- ✅ No Tailwind CSS
