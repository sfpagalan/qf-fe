# qf-fe

KamiQuestApp/
│
├── src/
│   ├── components/                  # Reusable components
│   │   ├── StoryProgression.js
│   │   ├── StatusWindow.js
│   │   └── ...                      # Other custom components
│   │
│   ├── screens/                     # Screen components
│   │   ├── HomeScreen.js
│   │   ├── CreateCharacterScreen.js
│   │   ├── QuestForgeScreen.js
│   │   └── AboutScreen.js
│   │
│   ├── navigation/                  # Navigation related files
│   │   └── AppNavigator.js
│   │
│   ├── api/                         # API related functions
│   │   └── openAiApi.js             # Interaction with OpenAI API
│   │
│   ├── utils/                       # Utility functions and constants
│   │   └── ...                      # Helpers, constants, etc.
│   │
│   ├── assets/                      # Static assets (images, fonts, etc.)
│   │   └── ...
│   │
│   ├── App.js                       # Main application entry point
│   └── index.js                     # Root component
│
├── app.json                         # Expo configuration
└── package.json                     # Project dependencies and scripts


KamiQuestServer/
│
├── src/
│   ├── controllers/                 # Controller functions for routes
│   │   └── storyController.js       # Handlers for story logic
│   │
│   ├── routes/                      # Express route definitions
│   │   └── storyRoutes.js           # Routes for story interactions
│   │
│   ├── models/                      # Database models
│   │   └── characterModel.js        # Model for character data
│   │
│   ├── utils/                       # Utility functions and helpers
│   │   └── ...
│   │
│   ├── app.js                       # Express app setup
│   └── server.js                    # Entry point for the server
│
├── .env                             # Environment variables
└── package.json                     # Project dependencies and scripts
