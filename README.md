# React Audio Player with Visualization

A modern, interactive music player built with React, TypeScript, and Vite featuring real-time audio spectrum visualization. This application provides a sleek interface for playing audio files with animated visual feedback that responds to the music's frequency data.

## ✨ Features

- **Audio Playback**: Play/pause controls with seek functionality
- **Real-time Visualization**: Dynamic audio spectrum analyzer with gradient effects
- **Rotating Album Art**: Animated cover image that rotates during playback
- **Modern UI**: Material-UI components with dark theme
- **Responsive Design**: Optimized for various screen sizes
- **TypeScript Support**: Full type safety throughout the application

## 🚀 Demo

The player includes:
- Interactive play/pause/previous/next controls
- Real-time audio frequency visualization using Canvas API
- Smooth animations powered by Framer Motion
- Elegant Material-UI design system

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **UI Framework**: Material-UI (MUI) v7
- **Animations**: Framer Motion
- **Audio Processing**: Web Audio API
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Custom SVG icons via SVGR
- **Font**: Jost font family

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-audio-player-visualization
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎵 Usage

1. The application loads with a default track
2. Click the play button to start playback
3. Watch the real-time audio visualization respond to the music
4. Use the slider to seek to different positions in the track
5. Album artwork rotates smoothly during playback

## 📁 Project Structure

```
src/
├── components/
│   ├── media-player.tsx          # Main player component
│   └── media-player.styled.ts    # Styled components
├── contexts/
│   └── media.context.tsx         # Media state management
├── hooks/
│   └── index.ts                  # Custom hooks
├── data/
│   └── media.ts                  # Sample media data
├── types.d.ts                    # TypeScript definitions
└── theme/                        # MUI theme configuration
```

## 🎨 Key Components

### MediaPlayer
The main component that handles:
- Audio playback using HTML5 audio element
- Web Audio API integration for visualization
- Canvas-based spectrum analyzer
- Play/pause state management

### Audio Visualization
- Uses Web Audio API's `AnalyserNode` for frequency data
- Renders real-time bars using HTML5 Canvas
- Gradient effects for visual appeal
- Responsive to audio amplitude

## 🔧 Configuration

### Audio Files
Place your audio files in the `public/media/` directory and update the media data in `src/data/media.ts`:

```typescript
export const mediaData: IMedia[] = [
  {
    id: 1,
    title: 'Your Song Title',
    artist: 'Artist Name',
    file_url: '/media/your-audio-file.m4a',
    cover_image: 'cover-image.jpg'
  }
]
```

### Theme Customization
Modify the theme in `src/theme/` directory to customize colors, typography, and component styles.

## 📱 Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

*Note: Web Audio API support required for visualization features*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- Framer Motion for smooth animations
- Web Audio API for making real-time audio analysis possible
