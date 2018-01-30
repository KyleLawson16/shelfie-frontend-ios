users: [
  {
    user_ID: 1,
    first_name: "Kyle",
    last_name: "Lawson",
    username: "KyleLawson16",
    email: "kyle.lawson7@yahoo.com",
    password: "password",
  },
  {
    user_ID: 2,
    first_name: "Brendan",
    last_name: "Barbato",
    username: "ToughGuy",
    email: "brendan@shelfiechallenge.com",
    password: "password"
  }
]

Games: [
  {
    game_ID: 1,
    date: '02/21/2018',
    team_1: 1,
    team_2: 'New York Yankees',
    home_team: 1,
    organization: 1,
    location: 'Fenway Park, Boston, MA',
  }
]

Submissions: [
  {
    submission_ID: 1,
    user_ID: 1,
    challenge_ID: 1,
    game_ID: 1,
    type: 'video',
    path: 'video.mov',
    caption: 'We were cheering loud!',
    likes: [
      'user_ID',
      'user_ID',
      'user_ID',
    ]
  }
]

Challenges: [
  {
    challenge_ID: 1,
    name: 'Cheer on your team',
    description: 'Record a video of you starting a chant!',
    pt_value: 25
  },
  {
    challenge_ID: 2,
    name: 'Player photo',
    description: 'Take a photo with a player.',
    pt_value: 25
  },
  {
    challenge_ID: 3,
    name: 'Hot dog',
    description: 'Take a photo of a hot dog with your favorite toppings.',
    pt_value: 10
  },
  {
    challenge_ID: 4,
    name: 'Scoreboard',
    description: 'Take a photo of the scoreboard while your team is winning.',
    pt_value: 5
  },
  {
    challenge_ID: 5,
    name: 'Souvenir',
    description: 'Take a photo of a souvenir from the game',
    pt_value: 25
  },
  {
    challenge_ID: 2,
    name: 'Friends & Family',
    description: 'Take a group photo.',
    pt_value: 5
  },
]

Organizations: [
  {
    Org_ID: 1,
    name: 'Boston Red Sox',
    address: 'Fenway Park, Boston, MA',
    contacts: [
      1,
      2
    ]
  }
]

Contacts: [
  {
    contact_ID: 1,
    first_name: 'Johhny',
    last_name: 'Roger',
    title: 'Assistant sales manager',
    phone: '703-245-3761'
  },
  {
    contact_ID: 2,
    first_name: 'John',
    last_name: 'Farrel',
    title: 'Manager',
    phone: '704-265-3261'
  },
]
