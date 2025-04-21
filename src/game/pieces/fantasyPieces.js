export const fantasyPieces = {
  w: {
    k: {
      name: "Solar King",
      description: "Radiant monarch wielding the power of the sun",
      attackSound: "/assets/sounds/king_attack.mp3",
      moveSound: "/assets/sounds/king_move.mp3",
      specialAbility: "Solar Flare - stuns adjacent enemy pieces for one turn"
    },
    q: {
      name: "Fire Sorceress",
      description: "Master of destructive flame magic",
      attackSound: "/assets/sounds/queen_attack.mp3",
      moveSound: "/assets/sounds/queen_move.mp3",
      specialAbility: "Fireball - can attack from 2 squares away"
    },
    // ... other white pieces
  },
  b: {
    k: {
      name: "Shadow Monarch",
      description: "Ruler of darkness who manipulates the void",
      attackSound: "/assets/sounds/king_attack_dark.mp3",
      moveSound: "/assets/sounds/king_move_dark.mp3",
      specialAbility: "Shadow Step - can move through one adjacent piece per game"
    },
    q: {
      name: "Necrotic Witch",
      description: "Harvester of souls and commander of the undead",
      attackSound: "/assets/sounds/queen_attack_dark.mp3",
      moveSound: "/assets/sounds/queen_move_dark.mp3",
      specialAbility: "Life Drain - heals when capturing pieces"
    },
    // ... other black pieces
  }
};

export const getPieceData = (color, type) => {
  return fantasyPieces[color][type];
};
