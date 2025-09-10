import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// Import all character icons
import beastBoyFace from './assets/beast_boy_face_icon.png';
import starfireFace from './assets/starfire_face_icon.png';
import ravenFace from './assets/raven_face_icon.png';
import robinFace from './assets/robin_face_icon.png';
import cyborgFace from './assets/cyborg_face_icon.png';

import beastBoyPower from './assets/beast_boy_power_icon.png';
import starfirePower from './assets/starfire_power_icon.png';
import ravenPower from './assets/raven_power_icon.png';
import robinPower from './assets/robin_power_icon.png';
import cyborgPower from './assets/cyborg_power_icon.png';

// Import endpoint icons
import titansToweIcon from './assets/titans_tower_icon.png';
import alienIcon from './assets/starfire_alien_icon.png';
import blackHoleIcon from './assets/raven_black_pit_icon.png';
import pizzaIcon from './assets/beast_boy_pizza_place_icon.png';
import carIcon from './assets/cyborg_car_icon.png';

// Import villain icons
import hiveFiveIcon from './assets/hive_five_icon.png';
import terraIcon from './assets/terra_icon.png';
import kittenIcon from './assets/kitten_icon.png';
import sladeIcon from './assets/slade_icon.png';

const CHARACTERS = {
  robin: {
    name: 'Robin',
    faceIcon: robinFace,
    powerIcon: robinPower,
    endIcon: titansToweIcon,
    colors: {
      background: '#8B0000',
      walls: '#000000',
      path: '#00FF00',
      popup: '#FFFF00',
      trail: '#00FF00'
    }
  },
  starfire: {
    name: 'Starfire',
    faceIcon: starfireFace,
    powerIcon: starfirePower,
    endIcon: alienIcon,
    colors: {
      background: '#4B0082',
      walls: '#FF1493',
      path: '#00FF7F',
      popup: '#FF4500',
      trail: '#FF1493'
    }
  },
  raven: {
    name: 'Raven',
    faceIcon: ravenFace,
    powerIcon: ravenPower,
    endIcon: blackHoleIcon,
    colors: {
      background: '#191970',
      walls: '#2F4F4F',
      path: '#8A2BE2',
      popup: '#9400D3',
      trail: '#8A2BE2'
    }
  },
  beastboy: {
    name: 'Beast Boy',
    faceIcon: beastBoyFace,
    powerIcon: beastBoyPower,
    endIcon: pizzaIcon,
    colors: {
      background: '#32CD32',
      walls: '#006400',
      path: '#00CED1',
      popup: '#FF00FF',
      trail: '#32CD32'
    }
  },
  cyborg: {
    name: 'Cyborg',
    faceIcon: cyborgFace,
    powerIcon: cyborgPower,
    endIcon: carIcon,
    colors: {
      background: '#2F4F4F',
      walls: '#C0C0C0',
      path: '#1E90FF',
      popup: '#FF0000',
      trail: '#1E90FF'
    }
  }
};

const DIFFICULTIES = {
  easy: { name: 'Easy', villains: ['hive1', 'hive2', 'hive3', 'hive4', 'hive5'] },
  intermediate: { name: 'Intermediate', villains: ['hive1', 'hive2', 'hive3', 'hive4', 'hive5', 'terra', 'kitten'] },
  hard: { name: 'Hard', villains: ['hive1', 'hive2', 'hive3', 'hive4', 'hive5', 'terra', 'kitten', 'slade'] }
};

const VILLAIN_ICONS = {
  hive1: hiveFiveIcon,
  hive2: hiveFiveIcon,
  hive3: hiveFiveIcon,
  hive4: hiveFiveIcon,
  hive5: hiveFiveIcon,
  terra: terraIcon,
  kitten: kittenIcon,
  slade: sladeIcon
};

// Maze patterns for each difficulty and subject
const MAZE_PATTERNS = {
  easy: {
    math: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,2,0,0,0,1,0,0,0,1,0,0,0,0,1],
      [1,0,1,1,0,1,0,1,0,1,0,1,1,0,1],
      [1,0,0,0,0,0,0,1,0,0,0,1,0,0,1],
      [1,1,1,0,1,1,1,1,0,1,1,1,0,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
      [1,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
      [1,1,1,0,1,1,0,1,0,1,1,0,1,1,1],
      [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    geography: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,2,0,0,1,0,0,0,1,0,0,0,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
      [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
      [1,0,1,1,1,1,1,1,1,0,1,0,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
      [1,1,1,0,1,1,1,0,1,1,1,1,1,0,1],
      [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1],
      [1,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
      [1,1,1,1,0,1,1,0,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
      [1,0,1,1,1,1,1,0,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]
  },
  intermediate: {
    math: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,2,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1],
      [1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1],
      [1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
      [1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
      [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,0,1],
      [1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1],
      [1,1,1,0,1,1,0,1,0,1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    geography: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,2,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1],
      [1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
      [1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1],
      [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1],
      [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
      [1,1,1,1,0,1,1,0,1,1,1,0,1,0,1,1,1],
      [1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
      [1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]
  },
  hard: {
    math: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,2,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
      [1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
      [1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1],
      [1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
      [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,0,1,0,1],
      [1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1],
      [1,1,1,0,1,1,0,1,0,1,1,0,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    geography: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,2,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1],
      [1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
      [1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
      [1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1],
      [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
      [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1],
      [1,1,1,1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]
  }
};

// Quiz questions
const QUIZ_QUESTIONS = {
  math: {
    easy: [
      { question: "What is 5 + 3?", options: ["6", "7", "8", "9"], correct: 2 },
      { question: "What is 10 - 4?", options: ["5", "6", "7", "8"], correct: 1 },
      { question: "What is 3 × 4?", options: ["10", "11", "12", "13"], correct: 2 },
      { question: "What is 15 ÷ 3?", options: ["4", "5", "6", "7"], correct: 1 },
      { question: "What is 7 + 8?", options: ["14", "15", "16", "17"], correct: 1 }
    ],
    intermediate: [
      { question: "What is 12 × 7?", options: ["82", "83", "84", "85"], correct: 2 },
      { question: "What is 144 ÷ 12?", options: ["11", "12", "13", "14"], correct: 1 },
      { question: "What is 25²?", options: ["525", "625", "725", "825"], correct: 1 },
      { question: "What is √64?", options: ["6", "7", "8", "9"], correct: 2 },
      { question: "What is 15% of 200?", options: ["25", "30", "35", "40"], correct: 1 },
      { question: "What is 8³?", options: ["512", "524", "536", "548"], correct: 0 },
      { question: "What is 17 × 13?", options: ["219", "220", "221", "222"], correct: 2 }
    ],
    hard: [
      { question: "What is the derivative of x²?", options: ["x", "2x", "x²", "2x²"], correct: 1 },
      { question: "What is sin(90°)?", options: ["0", "0.5", "1", "√2/2"], correct: 2 },
      { question: "What is log₁₀(1000)?", options: ["2", "3", "4", "5"], correct: 1 },
      { question: "What is ∫x dx?", options: ["x", "x²", "x²/2", "2x"], correct: 2 },
      { question: "What is the value of π to 3 decimal places?", options: ["3.141", "3.142", "3.143", "3.144"], correct: 1 },
      { question: "What is e^0?", options: ["0", "1", "e", "∞"], correct: 1 },
      { question: "What is the quadratic formula?", options: ["x = -b ± √(b²-4ac)/2a", "x = b ± √(b²+4ac)/2a", "x = -b ± √(b²+4ac)/2a", "x = b ± √(b²-4ac)/2a"], correct: 0 },
      { question: "What is cos(0°)?", options: ["0", "0.5", "1", "√3/2"], correct: 2 }
    ]
  },
  geography: {
    easy: [
      { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
      { question: "Which continent is Egypt in?", options: ["Asia", "Africa", "Europe", "Australia"], correct: 1 },
      { question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
      { question: "Which country has the most people?", options: ["India", "China", "USA", "Russia"], correct: 1 },
      { question: "What is the longest river?", options: ["Amazon", "Nile", "Mississippi", "Yangtze"], correct: 1 }
    ],
    intermediate: [
      { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], correct: 2 },
      { question: "Which mountain range contains Mount Everest?", options: ["Andes", "Rockies", "Alps", "Himalayas"], correct: 3 },
      { question: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], correct: 1 },
      { question: "Which desert is the largest in the world?", options: ["Sahara", "Gobi", "Antarctica", "Arabian"], correct: 2 },
      { question: "What is the deepest ocean trench?", options: ["Puerto Rico", "Java", "Mariana", "Peru-Chile"], correct: 2 },
      { question: "Which country has the most time zones?", options: ["Russia", "USA", "China", "France"], correct: 3 },
      { question: "What is the highest waterfall in the world?", options: ["Niagara", "Victoria", "Angel", "Iguazu"], correct: 2 }
    ],
    hard: [
      { question: "What is the most densely populated country?", options: ["Singapore", "Monaco", "Vatican City", "Malta"], correct: 1 },
      { question: "Which tectonic plate is Japan on?", options: ["Pacific", "Eurasian", "Philippine", "North American"], correct: 0 },
      { question: "What is the driest place on Earth?", options: ["Death Valley", "Atacama Desert", "Antarctica", "Sahara"], correct: 1 },
      { question: "Which strait separates Europe and Africa?", options: ["Bering", "Gibraltar", "Hormuz", "Malacca"], correct: 1 },
      { question: "What is the southernmost capital city?", options: ["Wellington", "Canberra", "Buenos Aires", "Cape Town"], correct: 0 },
      { question: "Which country has the most UNESCO World Heritage Sites?", options: ["China", "Italy", "Spain", "France"], correct: 1 },
      { question: "What is the largest island in the Mediterranean?", options: ["Sardinia", "Cyprus", "Sicily", "Corsica"], correct: 2 },
      { question: "Which river flows through the most countries?", options: ["Nile", "Amazon", "Danube", "Rhine"], correct: 2 }
    ]
  }
};

function App() {
  const [gameState, setGameState] = useState('start'); // start, character, difficulty, subject, playing, question, win, lose
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [maze, setMaze] = useState([]);
  const [villains, setVillains] = useState([]);
  const [defeatedVillains, setDefeatedVillains] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [stars, setStars] = useState(0);
  const [trail, setTrail] = useState([]);
  const [showLifeLostPopup, setShowLifeLostPopup] = useState(false);
  const [characterProgress, setCharacterProgress] = useState({
    robin: { completedLevels: [], currentLevel: 1 },
    starfire: { completedLevels: [], currentLevel: 1 },
    raven: { completedLevels: [], currentLevel: 1 },
    beastboy: { completedLevels: [], currentLevel: 1 },
    cyborg: { completedLevels: [], currentLevel: 1 }
  });
  const [dots, setDots] = useState([]);
  const [collectedDots, setCollectedDots] = useState([]);

  // Initialize game when character, difficulty, and subject are selected
  useEffect(() => {
    if (selectedCharacter && selectedDifficulty && selectedSubject) {
      initializeGame();
    }
  }, [selectedCharacter, selectedDifficulty, selectedSubject]);

  const initializeGame = () => {
    const mazePattern = MAZE_PATTERNS[selectedDifficulty][selectedSubject];
    setMaze(mazePattern);
    
    // Find start position (2) and set player there
    for (let y = 0; y < mazePattern.length; y++) {
      for (let x = 0; x < mazePattern[y].length; x++) {
        if (mazePattern[y][x] === 2) {
          setPlayerPosition({ x, y });
          break;
        }
      }
    }

    // Place villains randomly in the maze
    const villainList = DIFFICULTIES[selectedDifficulty].villains;
    const placedVillains = [];
    const availablePositions = [];

    // Find all available positions (0 = path)
    for (let y = 0; y < mazePattern.length; y++) {
      for (let x = 0; x < mazePattern[y].length; x++) {
        if (mazePattern[y][x] === 0) {
          availablePositions.push({ x, y });
        }
      }
    }

    // Place villains randomly, with Slade near the end if present
    villainList.forEach((villain, index) => {
      let position;
      if (villain === 'slade') {
        // Place Slade near the end
        const endPositions = availablePositions.filter(pos => 
          pos.x > mazePattern[0].length - 5 && pos.y > mazePattern.length - 5
        );
        position = endPositions[Math.floor(Math.random() * endPositions.length)] || 
                  availablePositions[Math.floor(Math.random() * availablePositions.length)];
      } else {
        position = availablePositions[Math.floor(Math.random() * availablePositions.length)];
      }
      
      placedVillains.push({
        id: villain,
        x: position.x,
        y: position.y,
        defeated: false
      });
      
      // Remove position from available positions
      const posIndex = availablePositions.findIndex(p => p.x === position.x && p.y === position.y);
      if (posIndex > -1) {
        availablePositions.splice(posIndex, 1);
      }
    });

    setVillains(placedVillains);
    setDefeatedVillains([]);
    setLives(3);
    setScore(0);
    setCorrectAnswers(0);
    setTotalQuestions(0);
    setStars(0);
    setTrail([]);
    
    // Initialize dots on all path cells
    const pathDots = [];
    for (let y = 0; y < mazePattern.length; y++) {
      for (let x = 0; x < mazePattern[y].length; x++) {
        if (mazePattern[y][x] === 0 || mazePattern[y][x] === 2) { // Path cells and start
          // Don't place dots where villains are
          const hasVillain = placedVillains.some(v => v.x === x && v.y === y);
          if (!hasVillain) {
            pathDots.push({ x, y });
          }
        }
      }
    }
    setDots(pathDots);
    setCollectedDots([]);
    
    setGameState('playing');
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== 'playing') return;

      let newX = playerPosition.x;
      let newY = playerPosition.y;

      switch (e.key) {
        case 'ArrowUp':
          newY--;
          break;
        case 'ArrowDown':
          newY++;
          break;
        case 'ArrowLeft':
          newX--;
          break;
        case 'ArrowRight':
          newX++;
          break;
        default:
          return;
      }

      // Check if new position is valid (not a wall)
      if (maze[newY] && maze[newY][newX] !== 1) {
        const oldPosition = { ...playerPosition };
        setPlayerPosition({ x: newX, y: newY });
        
        // Update trail
        setTrail(prevTrail => {
          const newTrail = [...prevTrail];
          const existingIndex = newTrail.findIndex(t => t.x === oldPosition.x && t.y === oldPosition.y);
          
          if (existingIndex === -1) {
            // Add new trail position
            newTrail.push(oldPosition);
          }
          
          // If moving backward, remove trail
          const backwardIndex = newTrail.findIndex(t => t.x === newX && t.y === newY);
          if (backwardIndex > -1) {
            return newTrail.slice(0, backwardIndex);
          }
          
          return newTrail;
        });

        // Check for villain collision
        const collidedVillain = villains.find(v => 
          v.x === newX && v.y === newY && !v.defeated
        );
        
        // Check for dot collection
        const dotIndex = dots.findIndex(dot => dot.x === newX && dot.y === newY);
        if (dotIndex > -1 && !collectedDots.some(cd => cd.x === newX && cd.y === newY)) {
          setCollectedDots(prev => [...prev, { x: newX, y: newY }]);
          setScore(prev => prev + 10); // Add points for collecting dots
        }
        
        if (collidedVillain) {
          // Start question for this villain
          const questions = QUIZ_QUESTIONS[selectedSubject][selectedDifficulty];
          const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
          setCurrentQuestion({ ...randomQuestion, villainId: collidedVillain.id });
          setGameState('question');
        }

        // Check if reached end (3)
        if (maze[newY][newX] === 3) {
          // Check if all villains are defeated before allowing win
          const allVillainsDefeated = villains.every(villain => villain.defeated);
          if (allVillainsDefeated) {
            // Mark level as completed for this character
            const levelKey = `${selectedDifficulty}_${selectedSubject}`;
            setCharacterProgress(prev => ({
              ...prev,
              [selectedCharacter]: {
                ...prev[selectedCharacter],
                completedLevels: [...new Set([...prev[selectedCharacter].completedLevels, levelKey])]
              }
            }));
            
            calculateStars();
            setGameState('win');
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, playerPosition, maze, villains, selectedSubject, selectedDifficulty]);

  const calculateStars = () => {
    const percentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
    let earnedStars = 0;
    
    if (percentage >= 90) earnedStars = 3;
    else if (percentage >= 70) earnedStars = 2;
    else if (percentage >= 50) earnedStars = 1;
    
    setStars(earnedStars);
  };

  const handleAnswerClick = (answerIndex) => {
    const isCorrect = answerIndex === currentQuestion.correct;
    setTotalQuestions(prev => prev + 1);
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setScore(prev => prev + 100);
      
      // Mark villain as defeated
      setVillains(prev => prev.map(v => 
        v.id === currentQuestion.villainId ? { ...v, defeated: true } : v
      ));
      setDefeatedVillains(prev => [...prev, currentQuestion.villainId]);
    } else {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameState('lose');
        } else {
          setShowLifeLostPopup(true);
          setTimeout(() => setShowLifeLostPopup(false), 2000);
        }
        return newLives;
      });
    }
    
    setCurrentQuestion(null);
    setGameState('playing');
  };

  const resetGame = () => {
    setGameState('start');
    setSelectedCharacter(null);
    setSelectedDifficulty(null);
    setSelectedSubject(null);
    setPlayerPosition({ x: 1, y: 1 });
    setMaze([]);
    setVillains([]);
    setDefeatedVillains([]);
    setCurrentQuestion(null);
    setLives(3);
    setScore(0);
    setCorrectAnswers(0);
    setTotalQuestions(0);
    setStars(0);
    setTrail([]);
    // Don't reset characterProgress - preserve level completion across games
  };

  const renderMaze = () => {
    if (!maze.length || !selectedCharacter) return null;

    const character = CHARACTERS[selectedCharacter];
    const cellSize = 25;

    return (
      <div 
        className="maze-container"
        style={{
          backgroundColor: character.colors.background,
          padding: '20px',
          borderRadius: '10px',
          border: '3px solid #FFD700'
        }}
      >
        <div 
          className="maze"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${maze[0].length}, ${cellSize}px)`,
            gap: '1px',
            backgroundColor: character.colors.walls,
            padding: '2px',
            borderRadius: '5px'
          }}
        >
          {maze.map((row, y) =>
            row.map((cell, x) => {
              const isPlayer = playerPosition.x === x && playerPosition.y === y;
              const isTrail = trail.some(t => t.x === x && t.y === y);
              const villain = villains.find(v => v.x === x && v.y === y && !v.defeated);
              const isEnd = cell === 3;
              const hasDot = dots.some(dot => dot.x === x && dot.y === y) && 
                           !collectedDots.some(cd => cd.x === x && cd.y === y) &&
                           !isPlayer && !villain && !isEnd;

              let backgroundColor = character.colors.walls;
              if (cell === 0 || cell === 2 || cell === 3) {
                backgroundColor = isTrail ? character.colors.trail : character.colors.path;
              }

              return (
                <div
                  key={`${x}-${y}`}
                  className="maze-cell"
                  style={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    backgroundColor,
                    position: 'relative',
                    borderRadius: cell === 1 ? '3px' : '0'
                  }}
                >
                  {hasDot && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '4px',
                        height: '4px',
                        backgroundColor: '#FFD700',
                        borderRadius: '50%',
                        boxShadow: '0 0 3px rgba(255, 215, 0, 0.8)'
                      }}
                    />
                  )}
                  {isPlayer && (
                    <img
                      src={character.powerIcon}
                      alt={character.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  )}
                  {villain && (
                    <img
                      src={VILLAIN_ICONS[villain.id]}
                      alt={villain.id}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  )}
                  {isEnd && (
                    <img
                      src={character.endIcon}
                      alt="Exit"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const renderGameUI = () => {
    if (gameState !== 'playing') return null;

    return (
      <div className="game-ui">
        <div className="ui-item">Score: {score}</div>
        <div className="ui-item">Lives: {lives}</div>
        <div className="ui-item">Defeated: {defeatedVillains.length}</div>
      </div>
    );
  };

  const renderStars = (count) => {
    return (
      <div className="stars">
        {[1, 2, 3].map(i => (
          <span key={i} className={`star ${i <= count ? 'filled' : ''}`}>★</span>
        ))}
      </div>
    );
  };

  // Render different game states
  if (gameState === 'start') {
    return (
      <div className="app">
        <div className="start-screen">
          <h1 className="game-title">TEEN TITANS GO!</h1>
          <h2 className="game-subtitle">MAZE ADVENTURE</h2>
          <button className="start-button" onClick={() => setGameState('character')}>
            START GAME
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'character') {
    return (
      <div className="app">
        <div className="selection-screen">
          <h2>SELECT YOUR TITAN</h2>
          <div className="character-grid">
            {Object.entries(CHARACTERS).map(([key, character]) => {
              const progress = characterProgress[key];
              const completedCount = progress.completedLevels.length;
              
              return (
                <div
                  key={key}
                  className="character-option"
                  onClick={() => {
                    setSelectedCharacter(key);
                    setGameState('difficulty');
                  }}
                >
                  <img src={character.faceIcon} alt={character.name} />
                  <span>{character.name}</span>
                  <div className="progress-indicator">
                    Levels Completed: {completedCount}/6
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'difficulty') {
    return (
      <div className="app">
        <div className="selection-screen">
          <h2>SELECT DIFFICULTY</h2>
          <div className="difficulty-grid">
            {Object.entries(DIFFICULTIES).map(([key, difficulty]) => (
              <button
                key={key}
                className="difficulty-button"
                onClick={() => {
                  setSelectedDifficulty(key);
                  setGameState('subject');
                }}
              >
                {difficulty.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'subject') {
    return (
      <div className="app">
        <div className="selection-screen">
          <h2>SELECT SUBJECT</h2>
          <div className="subject-grid">
            <button
              className="subject-button"
              onClick={() => setSelectedSubject('math')}
            >
              MATH
            </button>
            <button
              className="subject-button"
              onClick={() => setSelectedSubject('geography')}
            >
              GEOGRAPHY
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'question') {
    const character = CHARACTERS[selectedCharacter];
    return (
      <div className="app">
        <div 
          className="question-screen"
          style={{ backgroundColor: character.colors.popup }}
        >
          <h3>{currentQuestion.question}</h3>
          <div className="answer-options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className="answer-button"
                onClick={() => handleAnswerClick(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'win') {
    return (
      <div className="app">
        <div className="end-screen win-screen">
          <h2>VICTORY!</h2>
          <p>You completed the maze!</p>
          {renderStars(stars)}
          <p>Final Score: {score}</p>
          <p>Questions Answered Correctly: {correctAnswers}/{totalQuestions}</p>
          <button className="restart-button" onClick={resetGame}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'lose') {
    return (
      <div className="app">
        <div className="end-screen lose-screen">
          <h2>GAME OVER</h2>
          <p>You ran out of lives!</p>
          <p>Final Score: {score}</p>
          <button className="restart-button" onClick={resetGame}>
            TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  // Playing state
  return (
    <div className="app">
      {renderGameUI()}
      {renderMaze()}
      {showLifeLostPopup && (
        <div className="life-lost-popup">
          <p>Life Lost!</p>
        </div>
      )}
      <div className="controls">
        <p>Use arrow keys to move</p>
      </div>
    </div>
  );
}

export default App;

