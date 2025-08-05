
## Key Components

### HomePage
The main component that handles:
- Article display with infinite scroll
- Search functionality with debouncing
- GSAP animations for smooth transitions
- Dynamic grid layout based on available space

### useNews Hook
Custom hook that manages:
- Article fetching from multiple APIs
- Pagination and infinite scroll logic
- Loading and error states
- Search query handling

### ArticleCard
Displays article previews with:
- Responsive image handling
- Truncated descriptions
- Publication date formatting
- Click navigation to full article

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animation library for smooth transitions
- **Axios** - HTTP client for API requests
- **React Hooks** - State management and side effects

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Infinite Scroll**: Load articles on demand to reduce initial bundle size
- **Debounced Search**: Prevent excessive API calls during typing
- **Server-Side Rendering**: Fast initial page loads
- **Dynamic Grid**: Responsive layout that adapts to screen size

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [NewsAPI](https://newsapi.org) for providing news data
- [The Guardian](https://open-platform.theguardian.com) for their open API
- [Next.js](https://nextjs.org) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework