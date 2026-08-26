# 🧪 Chemistry Games (chem-games)

Chemistry Games is a collection of interactive, web-based chemistry games. The project aims to turn foundational chemistry concepts into engaging, fast-paced experiences with immediate visual and sound feedback. Each game focuses on a specific chemistry skill while using game mechanics to encourage active thinking rather than simply presenting information.

## 🏗️ Architecture Overview

The project is organised to keep **chemistry data, game configuration, gameplay logic and shared UI** as separate as practical. This makes it easier to build new games without duplicating the same systems.

### Core Chemistry Data

Scientific data is stored centrally under: `src/core-engine/data`

This includes chemistry-related information such as elements, compounds and other shared scientific data. Games can reuse the same underlying data rather than maintaining separate copies.

### Game Configuration

Game-specific settings are stored under: `src/core-engine/config/games`

These configuration files contain gameplay parameters such as level progression, speeds, scoring and other tuning values. This allows gameplay to be adjusted without mixing all of the configuration directly into the game components.

### Shared Game Systems

Common gameplay and interface functionality is implemented through shared components and hooks. These include:

- Game state and pause/resume behaviour
- Shared headers and game statistics
- Game overlays for pause, failure and progression states
- Instructions and settings modals
- Shared game footer/navigation
- Sound and feedback systems
- Game-session recording

The goal is for individual games to focus primarily on their own chemistry mechanics while reusing these common systems.

### Game-Specific Components

Each game has its own page and components under the games area. More complex games can separate their main arena/game loop into a dedicated `GameArena` component.

This keeps the page responsible for coordinating game state, configuration and shared UI, while the arena handles the game-specific interactive mechanics.

### Technology

The project is built with **Next.js, React, TypeScript and Tailwind CSS**, with additional libraries and browser APIs used where appropriate for game interaction, audio and chemistry functionality.

---

## 🎮 Current Mini-Games

### 1. Formula Blaster 🚀

Formula Blaster is a fast-paced recognition game where chemical formulas move through the play area and players must identify the correct formula before time runs out.

The game is designed to practise rapid recognition of chemical notation while providing immediate feedback when the player makes an incorrect selection.

**Core interaction:**
- Identify the target chemical formula.
- Select the correct moving formula.
- Respond quickly as difficulty increases.

The game uses arcade-style movement, scoring and feedback to turn formula recognition into an active task rather than passive recall.

### 2. Acid-Base Classification 🧪

Acid-Base Classification is a sorting game focused on identifying whether chemical compounds are:

- Acid
- Base
- Neutral

Compounds are presented in a randomised sequence and players must quickly sort them into the correct category.

The game also includes input protection to prevent accidental double-clicks or rapid repeated inputs from corrupting scoring and game tracking.

**Core interaction:**
- Examine a compound.
- Determine its acid/base classification.
- Sort it into the appropriate category.
- Receive immediate feedback.

### 3. Neutralise ⚡

Neutralise is an arcade-style chemistry game in which incoming acids and bases approach the player's laboratory. The player must select the appropriate ion and fire it to neutralise the incoming chemical.

The core chemistry interaction is:

- Use **H⁺** to neutralise a base.
- Use **OH⁻** to neutralise an acid.

The game combines chemical reasoning with action-game mechanics. Players need to identify the type of incoming chemical, select the appropriate ion and react quickly.

---

## 🚧 Games in Development

### 4. Reaction Balancer ⚖️

Reaction Balancer is being developed as a chemistry game focused on balancing chemical equations.

Players will adjust the coefficients of reactants and products so that the number of atoms of each element is equal on both sides of the equation.

The goal is to turn equation balancing into an interactive problem-solving task rather than a worksheet-style exercise.

The game is intended to complement the faster recognition-based games with a more deliberate reasoning activity.

### 5. Bond Builder 🔗

Bond Builder is being developed as an interactive game focused on constructing molecules and understanding chemical bonding.

The game will explore interactions with atoms and bonds rather than relying only on text-based chemical formulas.

This game is also a potential early use case for richer molecular visualisation, allowing chemical structures to become interactive objects rather than static images.

---

## 🚀 Roadmap

### 1. Complete the New Games

Continue development of Reaction Balancer and Bond Builder, with particular attention to making their interactions meaningfully connected to the underlying chemistry concepts.

### 2. Player Progress & Analytics

Expand the existing game-session tracking to support more comprehensive player progress.

Potential functionality includes:

- Persistent player profiles
- Saved progress
- Highest level reached
- High scores
- Game history
- Progress and performance information

### 3. Expand the Game Library

Add games covering a broader range of chemistry concepts and learning interactions.

The longer-term goal is not simply to create more games, but to provide different types of interactions for different kinds of chemistry thinking, including recognition, classification, balancing, construction, prediction and problem solving.

### 4. Interactive Chemistry Visualisation

Introduce richer molecular representations where they provide meaningful educational value.

A planned direction is to use a shared molecular visualisation component so that molecules can eventually be displayed and interacted with consistently across multiple games.

Potential applications include:

- Displaying molecular structures alongside formulas
- Highlighting atoms or bonds
- Identifying functional groups
- Constructing molecules
- Connecting molecular structures with chemical equations

### 5. Broader Platform Features

As the game library develops, additional platform-level features can be considered, including improved progress tracking, teacher-facing information and tools that make it easier to use the games across different learning contexts.

---

## 🛠️ Installation & Setup

Ensure you have **Node.js (v18+)** installed.

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd chem-games
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the local development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

