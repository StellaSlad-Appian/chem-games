## 🧪 chem-games

​chem-games is a collection of interactive, web-based chemistry games. The goal of this project is to turn foundational chemistry concepts into fun, fast-paced, arcade-style games with immediate visual and sound feedback.

## ​🏗️ How the Project is Structured

​The code is built to keep the look and design of the games separate from the scientific logic and data.

​- **Ref Data:** All scientific data, like properties of atoms and molecules, is kept in the folder `src/core-engine/data`. This ensures every game uses the exact same correct scientific data.
- **Level Settings:** Note: Right now, the levels, game speeds, and scoring rules are still mixed directly into the game code. Moving these into a separate, easy-to-edit configuration file is planned for a future update.
- **Shared Layouts:** The game headers, stats tracking, and navigation panels use a shared design so the user experience feels identical across different games.

## ​🎮 Current Mini-Games

​1. Formula Blaster 🚀

​An arcade game where floating elements move up the screen, and players must quickly identify and click the correct chemical formulas before time runs out.
If you make a mistake, a review screen pops up to show you the correct answer so you can learn from it immediately.

​2. Acid-Base Classification 🧪

​A fast-paced sorting game focused on identifying whether chemical compounds are acids, bases, or neutral.
​Category Sorting: Randomized compounds appear, and players must instantly sort them into the correct column (Acid, Base, Neutral, or Amphoteric).
​Input Protection: The game blocks double-clicking or rapid accidental inputs to keep scores and game tracking accurate.

## ​🚀 Future Upgrades & Roadmap

​1. Clean Up Game Settings (Near Term)

​Move all level speeds, point thresholds, and progression settings out of the main game files into a simple, dedicated settings folder so they are easier to tweak.

​2. Saving Player Progress (Next Phase)

​Right now, players have to restart at Level 1 every time they open the game. The next step is adding a save system to:
​Allow players to create an account and log in securely.
​Save the highest level reached and lifetime high score to a database.
​Automatically restore the player's progress whenever they return to the site.

​3. New Game Modes

​- **Valence Matcher:** A drag-and-drop puzzle where players pair matching positive and negative ions together to build balanced, stable compounds.
​- **Stoichiometry Balance:** A balancing game where users change molecules' numbers to make sure both sides of a chemical equation are perfectly equal.

---

## 🛠️ Installation & Setup

Ensure you have **Node.js (v18+)** installed.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/chem-games.git](https://github.com/your-username/chem-games.git)
   cd chem-games
2. **Install dependencies:**
   ```bash
   npm install
3. **Run the local development server:**
   ```bash
   npm run dev
4. **Open** http://localhost:3000 **in your browser to run the application.**
