module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-preset-env': {
      features: {
        'nesting-rules': true,
      },
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
      stage: 3,
      autoprefixer: {
        flexbox: 'no-2009',
      },
    },
  },
} 