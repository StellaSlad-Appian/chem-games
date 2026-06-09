# 🧪 ChemGames

ChemGames is a highly interactive suite of gamified web applications built with Next.js and TypeScript. The games are designed to transform foundational chemistry concepts into engaging, arcade-style user experiences.

## 🏗️ Architecture & Core Design

ChemGames is engineered around a **Strict Separation of Concerns (SoC)** framework, decoupling game state machines and core chemical data layers from presentation layouts.

* **Centralized Chemical Database:** All chemical formulas, ion configurations, molar masses, and difficulty structures are managed within an immutable data layer (`src/core-engine/db.ts`). This allows all current and future mini-games to share a single scientific source of truth.
* **Unified Layout Strategy:** A shared, responsive 3-column `GamesHeader` layout guarantees UI, performance stats, and tracking metrics remain perfectly aligned across diverse gameplay environments.
* **Performance-First Animations:** Interactive visual assets utilize Tailwind properties combined with hardware-accelerated transitions (`will-change-transform`) to deliver fluid, sub-frame rendering without layout shifts or dropped frames.

---

## 🎮 Current Mini-Games

### 1. Formula Blaster 🚀
An action-arcade challenge where users identify and capture target molecular formulas under tight time constraints.

* **Object-Permanence Color Model:** Implements an advanced color-generation mechanic where floating elements capture a shifting neon border style at spawn. They lock this style permanently during their lifecycle, preventing visual distraction and preserving color-based tracking.
* **Inline Subscript Parsing:** Features an automated typographic parser that handles raw chemical formula strings and safely formats subscripts inline without runtime rendering bottlenecks.
* **Contextual Feedback Banner:** Tracks incorrect inputs to provide a real-time chemical review overlay, offering immediate educational scaffolding.

### 2. Acid-Base Classification 🧪
A fast-paced, matrix-sorting game focused on identifying compound acidity properties.

* **Categorical Matrix Sorting:** Demands quick identification of random compounds, requiring users to sort them instantly into Acid, Base, or Neutral categories.
* **State Safety Management:** Utilizes strict interaction handlers to prevent duplicate input submissions and maintain clean execution cycles.

---

## 🚀 Future Roadmap & Extension Scope

ChemGames is architected to scale seamlessly from a frontend game collection into a full-featured educational platform.

### 1. User Database & State Persistence (Next Phase)
To remove the limitation of forcing players to restart at Level 1 on every session, a backend persistence layer is planned:
* **Authentication:** NextAuth.js or Clerk integration for secure user sign-ins.
* **Data Storage:** Prisma ORM paired with a PostgreSQL database to manage user progress profiles.
* **State Restoring:** A relational tracking schema will store metrics like `highest_level_reached` and `lifetime_high_score`, enabling the game engine to dynamically restore an individual's earned difficulty level upon launch.

### 2. Upcoming Game Modes
The modular codebase allows new educational engines to plug directly into the shared state architecture:
* **Valence Matcher:** A card-matching or drag-and-drop puzzle pairing ions to build structurally stable neutral compounds.
* **Stoichiometry Balance:** A balance-driven game where users manipulate coefficients to satisfy conservation of mass laws.

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
