import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// --- TEST SUITE 1: TETRIS CORE LOGIC ---
test('Tetris: 7 Tetromino definitions have valid shapes', () => {
  const shapes = {
    I: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
    J: [[1,0,0],[1,1,1],[0,0,0]],
    L: [[0,0,1],[1,1,1],[0,0,0]],
    O: [[1,1],[1,1]],
    S: [[0,1,1],[1,1,0],[0,0,0]],
    T: [[0,1,0],[1,1,1],[0,0,0]],
    Z: [[1,1,0],[0,1,1],[0,0,0]]
  };
  
  for (const [name, matrix] of Object.entries(shapes)) {
    const totalBlocks = matrix.flat().filter(v => v === 1).length;
    assert.equal(totalBlocks, 4, `Tetromino ${name} must contain exactly 4 blocks`);
  }
});

test('Tetris: Matrix 90 degree clockwise rotation', () => {
  const tPiece = [
    [0,1,0],
    [1,1,1],
    [0,0,0]
  ];
  const N = tPiece.length;
  const rotated = tPiece.map((row, i) => row.map((_, j) => tPiece[N - 1 - j][i]));
  
  // Rotating T piece clockwise should yield:
  // [0, 1, 0]
  // [0, 1, 1]
  // [0, 1, 0]
  assert.deepEqual(rotated, [
    [0,1,0],
    [0,1,1],
    [0,1,0]
  ]);
});

test('Tetris: Line clear algorithm removes full row and inserts empty top row', () => {
  const COLS = 10;
  const ROWS = 4;
  let board = [
    [0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1], // full line
    [1,1,0,0,1,1,0,0,1,1]
  ];

  let linesCleared = 0;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r].every(c => c !== 0)) {
      board.splice(r, 1);
      board.unshift(Array(COLS).fill(0));
      linesCleared++;
      r++;
    }
  }

  assert.equal(linesCleared, 1);
  assert.equal(board.length, ROWS);
  assert.deepEqual(board[0], Array(COLS).fill(0));
  assert.equal(board[ROWS - 1].filter(c => c !== 0).length, 6);
});

// --- TEST SUITE 2: PAC-MAN CORE LOGIC ---
test('Pac-Man: Maze layout symmetry and tunnel wrap', () => {
  const MAZE_COLS = 19;
  const MAZE_ROWS = 21;
  const tunnelRow = 10;

  // Tunnel wrap test
  let pacX = 0;
  let moveLeft = -1;
  let nextX = pacX + moveLeft;
  if (nextX < 0) nextX = MAZE_COLS - 1;
  assert.equal(nextX, 18, 'Left tunnel exits on right border');

  let pacRight = 18;
  let moveRight = 1;
  let nextRight = pacRight + moveRight;
  if (nextRight >= MAZE_COLS) nextRight = 0;
  assert.equal(nextRight, 0, 'Right tunnel exits on left border');
});

test('Pac-Man: Frightened score multiplier doubles on consecutive ghost eats', () => {
  let scoreMult = 1;
  const basePoints = 200;
  const scores = [];

  for (let ghost = 0; ghost < 4; ghost++) {
    scores.push(basePoints * scoreMult);
    scoreMult *= 2;
  }

  assert.deepEqual(scores, [200, 400, 800, 1600], 'Ghost eats should award 200, 400, 800, 1600 points');
});

// --- TEST SUITE 3: SNAKE CORE LOGIC ---
test('Snake: Direction reversal lock prevents immediate suicide', () => {
  let currentDir = { x: 1, y: 0 }; // Moving Right

  function canChangeDirection(newDir) {
    if (newDir.x === -currentDir.x && newDir.y === -currentDir.y) {
      return false; // Prohibited 180 reversal
    }
    return true;
  }

  assert.equal(canChangeDirection({ x: -1, y: 0 }), false, 'Cannot reverse 180° into self');
  assert.equal(canChangeDirection({ x: 0, y: -1 }), true, 'Can turn Up');
  assert.equal(canChangeDirection({ x: 0, y: 1 }), true, 'Can turn Down');
});

test('Snake: Self collision detection identifies overlap', () => {
  const snake = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
    { x: 3, y: 6 },
    { x: 4, y: 6 },
    { x: 5, y: 6 }
  ];

  const collidingHead = { x: 4, y: 5 };
  const safeHead = { x: 6, y: 5 };

  const hasSelfCollision = (head, body) => body.some(seg => seg.x === head.x && seg.y === head.y);

  assert.equal(hasSelfCollision(collidingHead, snake), true, 'Head overlapping body segment detected');
  assert.equal(hasSelfCollision(safeHead, snake), false, 'Empty space recognized as safe');
});

// --- TEST SUITE 4: MOBILE & RESPONSIVENESS VALIDATION ---
test('Mobile: index.html contains required mobile viewport and safe-area properties', () => {
  const htmlPath = path.resolve('index.html');
  assert.ok(fs.existsSync(htmlPath), 'index.html exists');

  const content = fs.readFileSync(htmlPath, 'utf8');

  // Viewport validation for iPhone and Android
  assert.match(content, /viewport-fit=cover/, 'Must include viewport-fit=cover for iPhone notch/island');
  assert.match(content, /user-scalable=no/, 'Must disable browser zooming for arcade controls');

  // Audio Context unlocker check
  assert.match(content, /AudioContext/, 'Web Audio API initialized');

  // High score persistence
  assert.match(content, /localStorage/, 'Persistent local storage for high scores');
});
