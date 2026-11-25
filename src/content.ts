export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type Level = 'Beginner' | 'Open to all' | 'Intermediate' | 'Advanced'

export type ClassType = {
  id: string
  code: string
  name: string
  level: Level
  intensity: number
  duration: number
  description: string
  detail: string
  bring: string
  image: string
  alt: string
}

export type Session = {
  id: string
  day: DayKey
  time: string
  classId: string
  coachId: string
  booked: number
  capacity: number
  durationMin?: number
  name?: string
}

export type Coach = {
  id: string
  name: string
  initials: string
  role: string
  specialities: string[]
  years: number
  bio: string
}

export type Plan = {
  id: string
  name: string
  featured?: boolean
  tag?: string
  monthlyPrice: number
  monthlyAllowance: string
  weeklyVisits: number
  packPrice: number
  packTerms: string
  features: string[]
}

export const gym = {
  brand: 'Cinderblock Boxing Club',
  words: ['Cinderblock', 'Boxing', 'Club'],
  discipline: 'boxing and strength training',
  city: 'Oakland, California',
  audience: 'busy adults, from first-timers to amateur fighters',
  established: 2017,
  prefix: 'CB',
  phone: '(510) 555-0172',
  phoneHref: 'tel:+15105550172',
  email: 'hello@cinderblockboxing.com',
  emailHref: 'mailto:hello@cinderblockboxing.com',
  street: '2210 Foundry Row',
  locality: 'Oakland, CA 94607',
  entrance: 'Entrance on Tallow St, roller door with the orange stripe',
  timezone: 'America/Los_Angeles',
}

export const nav = [
  { label: 'Classes', href: './index.html#classes' },
  { label: 'Timetable', href: './timetable.html' },
  { label: 'Pricing', href: './index.html#pricing' },
  { label: 'Coaches', href: './index.html#coaches' },
  { label: 'FAQ', href: './index.html#faq' },
]

export const images = {
  gymFloor: {
    src: './images/gym-floor.webp',
    alt: 'Row of worn heavy bags hanging from a steel beam in a dark warehouse gym',
  },
  ringCorner: {
    src: './images/ring-corner.webp',
    alt: 'Corner of a boxing ring with taped post and dark ropes under a single light',
  },
  handWraps: {
    src: './images/hand-wraps.webp',
    alt: 'Hands wrapping a black hand wrap around the knuckles on a gym bench',
  },
  heavyBag: {
    src: './images/heavy-bag.webp',
    alt: 'Black heavy bag swinging on its chain with chalk dust in the air',
  },
  kettlebells: {
    src: './images/kettlebells.webp',
    alt: 'Row of cast-iron kettlebells and a bowl of chalk on rubber flooring',
  },
  benchGloves: {
    src: './images/bench-gloves.webp',
    alt: 'Worn boxing gloves, skipping rope and hand wrap on a wooden bench',
  },
  blackGloves: {
    src: './images/black-gloves.jpg',
    alt: 'Old pair of black leather boxing gloves with loose laces',
  },
  heavyRopes: {
    src: './images/heavy-ropes.jpg',
    alt: 'Close-up of thick coiled training ropes',
  },
}

export const hero = {
  eyebrow: 'OAKLAND, CALIFORNIA · BOXING & STRENGTH · EST. 2017',
  lines: [
    { text: 'Throw' },
    { text: 'The first' },
    { text: 'Punch.', accent: true },
  ],
  lead: 'Boxing and strength classes for busy adults in Oakland. Sixteen people per class, a coach on every round, and your first session is free.',
  stats: [
    { value: 34, label: 'classes a week' },
    { value: 16, label: 'max per class' },
    { value: 6, pad: 2, label: 'coaches' },
    { value: 1, suffix: 'st', label: 'class free' },
  ],
}

export const marquee = {
  extras: ['Free trial', 'Gloves on loan', '16 max'],
}

export const classTypes: ClassType[] = [
  {
    id: 'fundamentals',
    code: 'FU',
    name: 'Fundamentals',
    level: 'Beginner',
    intensity: 2,
    duration: 60,
    description:
      'Stance, guard, footwork and the six basic punches, taught in small groups. Where everyone starts.',
    detail: 'Each session ends with three rounds on the bag so you leave having hit something.',
    bring: 'Water, a towel, hand wraps (we lend them for your first month).',
    image: images.handWraps.src,
    alt: images.handWraps.alt,
  },
  {
    id: 'bag-rounds',
    code: 'BR',
    name: 'Bag Rounds',
    level: 'Open to all',
    intensity: 4,
    duration: 45,
    description:
      'Twelve three-minute rounds on the heavy bags with combinations called from the floor. Loud, sweaty, scalable.',
    detail: 'The coach calls combinations from the floor. You work at your own pace inside the round.',
    bring: 'Wraps and 12–16 oz gloves (loaners on the wall).',
    image: images.heavyBag.src,
    alt: images.heavyBag.alt,
  },
  {
    id: 'pad-lab',
    code: 'PL',
    name: 'Pad Lab',
    level: 'Intermediate',
    intensity: 3,
    duration: 60,
    description:
      'Partner pad work: you hold, you hit, a coach corrects every round. Sharpens timing and defence.',
    detail: 'You swap holder and hitter every round, and the coach steps in when the timing slips.',
    bring: 'Wraps, gloves, and patience with your partner.',
    image: images.benchGloves.src,
    alt: images.benchGloves.alt,
  },
  {
    id: 'sparring',
    code: 'SP',
    name: 'Sparring',
    level: 'Advanced',
    intensity: 5,
    duration: 75,
    description:
      'Controlled, coach-matched technical sparring for members cleared by a coach. Headgear and mouthguard required.',
    detail: 'Partners are matched by weight, level and temperament. Headgear stays on the whole session.',
    bring: 'Mouthguard, headgear, 16 oz sparring gloves, coach sign-off.',
    image: images.ringCorner.src,
    alt: images.ringCorner.alt,
  },
  {
    id: 'iron-hour',
    code: 'IH',
    name: 'Iron Hour',
    level: 'Open to all',
    intensity: 3,
    duration: 60,
    description:
      'Barbell and kettlebell strength in small squads: squat, hinge, press, carry. Programmed in six-week blocks.',
    detail: 'The block is written for six weeks: same lifts, small jumps in load, a coach on the floor.',
    bring: 'Flat shoes or bare feet, a notebook if you like logging lifts.',
    image: images.kettlebells.src,
    alt: images.kettlebells.alt,
  },
  {
    id: 'engine',
    code: 'EN',
    name: 'Engine',
    level: 'Open to all',
    intensity: 5,
    duration: 45,
    description:
      'Conditioning circuits with ropes, sleds, skipping and bodyweight. Built to make round three feel like round one.',
    detail: 'Stations rotate on a clock. Skip what hurts and the coach will give you a substitute.',
    bring: 'Water. Lots of it.',
    image: images.heavyRopes.src,
    alt: images.heavyRopes.alt,
  },
]

export const levels: { id: string; label: Level | 'Any level' }[] = [
  { id: 'any', label: 'Any level' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'open-to-all', label: 'Open to all' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
]

export const sessions: Session[] = [
  { id: 'mon-0600', day: 'mon', time: '06:00', classId: 'engine', coachId: 'km', booked: 11, capacity: 16 },
  { id: 'mon-0715', day: 'mon', time: '07:15', classId: 'fundamentals', coachId: 'mr', booked: 9, capacity: 16 },
  { id: 'mon-1215', day: 'mon', time: '12:15', classId: 'bag-rounds', coachId: 'pa', booked: 14, capacity: 16 },
  { id: 'mon-1730', day: 'mon', time: '17:30', classId: 'fundamentals', coachId: 'mr', booked: 16, capacity: 16 },
  { id: 'mon-1845', day: 'mon', time: '18:45', classId: 'pad-lab', coachId: 'tw', booked: 12, capacity: 16 },
  { id: 'mon-2000', day: 'mon', time: '20:00', classId: 'iron-hour', coachId: 'do', booked: 8, capacity: 16 },
  { id: 'tue-0600', day: 'tue', time: '06:00', classId: 'iron-hour', coachId: 'do', booked: 10, capacity: 16 },
  { id: 'tue-0715', day: 'tue', time: '07:15', classId: 'bag-rounds', coachId: 'pa', booked: 13, capacity: 16 },
  { id: 'tue-1215', day: 'tue', time: '12:15', classId: 'engine', coachId: 'km', booked: 7, capacity: 16 },
  { id: 'tue-1730', day: 'tue', time: '17:30', classId: 'bag-rounds', coachId: 'km', booked: 15, capacity: 16 },
  { id: 'tue-1845', day: 'tue', time: '18:45', classId: 'sparring', coachId: 'tw', booked: 10, capacity: 12 },
  { id: 'tue-2000', day: 'tue', time: '20:00', classId: 'fundamentals', coachId: 'ic', booked: 11, capacity: 16 },
  { id: 'wed-0600', day: 'wed', time: '06:00', classId: 'engine', coachId: 'km', booked: 12, capacity: 16 },
  { id: 'wed-0715', day: 'wed', time: '07:15', classId: 'fundamentals', coachId: 'ic', booked: 6, capacity: 16 },
  { id: 'wed-1215', day: 'wed', time: '12:15', classId: 'iron-hour', coachId: 'do', booked: 9, capacity: 16 },
  { id: 'wed-1730', day: 'wed', time: '17:30', classId: 'fundamentals', coachId: 'mr', booked: 14, capacity: 16 },
  { id: 'wed-1845', day: 'wed', time: '18:45', classId: 'pad-lab', coachId: 'pa', booked: 13, capacity: 16 },
  { id: 'wed-2000', day: 'wed', time: '20:00', classId: 'bag-rounds', coachId: 'km', booked: 9, capacity: 16 },
  { id: 'thu-0600', day: 'thu', time: '06:00', classId: 'iron-hour', coachId: 'do', booked: 11, capacity: 16 },
  { id: 'thu-0715', day: 'thu', time: '07:15', classId: 'bag-rounds', coachId: 'pa', booked: 10, capacity: 16 },
  { id: 'thu-1215', day: 'thu', time: '12:15', classId: 'engine', coachId: 'km', booked: 8, capacity: 16 },
  { id: 'thu-1730', day: 'thu', time: '17:30', classId: 'pad-lab', coachId: 'tw', booked: 15, capacity: 16 },
  { id: 'thu-1845', day: 'thu', time: '18:45', classId: 'sparring', coachId: 'tw', booked: 12, capacity: 12 },
  { id: 'thu-2000', day: 'thu', time: '20:00', classId: 'engine', coachId: 'km', booked: 6, capacity: 16 },
  { id: 'fri-0600', day: 'fri', time: '06:00', classId: 'engine', coachId: 'km', booked: 9, capacity: 16 },
  { id: 'fri-0715', day: 'fri', time: '07:15', classId: 'fundamentals', coachId: 'ic', booked: 8, capacity: 16 },
  { id: 'fri-1215', day: 'fri', time: '12:15', classId: 'bag-rounds', coachId: 'pa', booked: 12, capacity: 16 },
  { id: 'fri-1730', day: 'fri', time: '17:30', classId: 'iron-hour', coachId: 'do', booked: 13, capacity: 16 },
  { id: 'fri-1845', day: 'fri', time: '18:45', classId: 'bag-rounds', coachId: 'mr', booked: 16, capacity: 16 },
  { id: 'sat-0900', day: 'sat', time: '09:00', classId: 'fundamentals', coachId: 'mr', booked: 15, capacity: 16 },
  { id: 'sat-1015', day: 'sat', time: '10:15', classId: 'pad-lab', coachId: 'pa', booked: 11, capacity: 16 },
  { id: 'sat-1130', day: 'sat', time: '11:30', classId: 'sparring', coachId: 'tw', booked: 9, capacity: 12, durationMin: 90, name: 'Open sparring' },
  { id: 'sun-0900', day: 'sun', time: '09:00', classId: 'iron-hour', coachId: 'do', booked: 7, capacity: 16 },
  { id: 'sun-1015', day: 'sun', time: '10:15', classId: 'bag-rounds', coachId: 'ic', booked: 10, capacity: 16 },
]

export const coaches: Coach[] = [
  {
    id: 'mr',
    name: 'Marco Ruelas',
    initials: 'MR',
    role: 'Head coach',
    specialities: ['Footwork', 'Fundamentals', 'Southpaw stance'],
    years: 14,
    bio: 'Built the beginner programme. Will fix your feet before he lets you hit anything.',
  },
  {
    id: 'pa',
    name: 'Priya Anand',
    initials: 'PA',
    role: 'Coach',
    specialities: ['Bag Rounds', 'Pad work', 'Combinations'],
    years: 8,
    bio: "Calls the loudest rounds in the building and remembers everyone's favourite combo.",
  },
  {
    id: 'tw',
    name: 'Tomasz Wierzba',
    initials: 'TW',
    role: 'Ring coach',
    specialities: ['Sparring', 'Defence', 'Ring craft'],
    years: 11,
    bio: 'Runs every sparring session and matches partners by weight, level and temperament.',
  },
  {
    id: 'do',
    name: 'Dee Okafor',
    initials: 'DO',
    role: 'Strength lead',
    specialities: ['Barbell', 'Kettlebells', 'Mobility'],
    years: 9,
    bio: 'Writes the six-week Iron Hour blocks. Former competitive powerlifter, permanent chalk on her hands.',
  },
  {
    id: 'km',
    name: 'Kofi Mensah',
    initials: 'KM',
    role: 'Conditioning coach',
    specialities: ['Engine', 'Ropes & sleds', 'Recovery'],
    years: 6,
    bio: 'Designs Engine so the last round hurts less every week. Keeps the rope wall tidy.',
  },
  {
    id: 'ic',
    name: 'Inés Calderón',
    initials: 'IC',
    role: 'Coach',
    specialities: ['Fundamentals', 'Technique', 'Early-morning classes'],
    years: 5,
    bio: 'Teaches the 07:15 crowd and the Tuesday night beginners. Patient, precise, relentless about guard.',
  },
]

export const plans: Plan[] = [
  {
    id: 'off-peak',
    name: 'Off-peak',
    monthlyPrice: 99,
    monthlyAllowance: 'Unlimited classes before 16:00 and at weekends',
    weeklyVisits: 3,
    packPrice: 120,
    packTerms: '10 off-peak classes, use within 3 months',
    features: [
      'Every class type before 16:00',
      'Weekend classes',
      'Gloves and wraps on loan for month one',
      'Freeze up to 4 weeks a year',
    ],
  },
  {
    id: 'anytime',
    name: 'Anytime',
    featured: true,
    tag: 'Most picked',
    monthlyPrice: 149,
    monthlyAllowance: 'Unlimited classes, any time',
    weeklyVisits: 6,
    packPrice: 160,
    packTerms: '10 classes, any time, use within 3 months',
    features: [
      'All 34 weekly sessions',
      'Sparring once cleared by a coach',
      'Bring a friend free once a month',
      'Freeze up to 4 weeks a year',
    ],
  },
  {
    id: 'anytime-coaching',
    name: 'Anytime + Coaching',
    monthlyPrice: 259,
    monthlyAllowance: 'Unlimited classes plus two 30-minute private sessions a month',
    weeklyVisits: 6,
    packPrice: 240,
    packTerms: '10 classes plus two 30-minute private sessions, use within 3 months',
    features: [
      'Everything in Anytime',
      'Two private sessions with any coach',
      'A written six-week strength block',
      'Priority booking on full classes',
    ],
  },
]

export const results = {
  stats: [
    { value: 412, label: 'active members', bar: true },
    { value: 86, suffix: '%', label: 'still training after 6 months', bar: true },
    { value: 11600, suffix: '+', label: 'classes coached since 2017', bar: true },
    { value: 38, label: "members' first amateur bouts", bar: true },
  ],
  note: 'Results from real routines of individual members; yours depend on how often you train and what you eat.',
}

export const quotes = [
  {
    text: 'I walked in not knowing how to make a fist. Fourteen months later I box three nights a week and sleep like a stone.',
    fact: 'Down 9 kg · 3 classes / week',
    by: 'Renata V. — member since 2023, accountant',
  },
  {
    text: 'Iron Hour fixed my back and my deadlift in the same year. Dee writes the blocks, I just show up and do them.',
    fact: 'Deadlift 60 → 115 kg in 9 months',
    by: 'Jonah P. — member since 2022, line cook',
  },
  {
    text: 'Tomasz never let me spar until I was ready, and then he matched me perfectly. My first bout felt like a Saturday class.',
    fact: 'First amateur bout · won on points',
    by: 'Lucía M. — member since 2021, nurse',
  },
]

export const trial = {
  lines: [
    { text: 'Your first' },
    { text: 'Round is on us.', accent: true },
  ],
  lead: 'Pick a class, tell us a little about you and show up 15 minutes early. A coach meets you at the desk, wraps your hands and stays with you all session.',
  checks: ['Gloves and wraps on loan', 'Showers, lockers and towels', 'No contract, no card, no hard sell'],
  experiences: [
    { id: 'never', label: 'Never thrown a punch' },
    { id: 'few', label: 'A few classes' },
    { id: 'competed', label: "I've competed" },
  ],
  age: "I'm 16 or older and will fill in a short health form at the desk.",
}

export const faq = [
  {
    q: "I've never boxed. Am I too unfit to start?",
    a: 'No. Fundamentals is built for day one: technique first, conditioning second, and every drill has an easier version. Most members came in unable to finish a three-minute round.',
  },
  {
    q: 'Will I get hit?',
    a: 'Not unless you choose to. Fundamentals, Bag Rounds, Pad Lab, Iron Hour and Engine are no-contact. Sparring is optional and only open once a coach has cleared you, usually after three to six months.',
  },
  {
    q: 'What should I wear and bring?',
    a: 'Trainers or bare feet, clothes you can move in, water and a towel. We lend gloves and wraps for your first month; after that, 12–16 oz gloves cost around $60.',
  },
  {
    q: 'How big are the classes?',
    a: 'Sixteen people maximum, twelve for Sparring, with at least one coach on the floor and two in Fundamentals on weekday evenings.',
  },
  {
    q: "I'm 47. Is this a young person's gym?",
    a: 'Our members range from 16 to 68. The median age is 34, and the 07:15 crowd skews older and very punctual.',
  },
  {
    q: 'How often should a beginner train?',
    a: 'Two or three times a week: two Fundamentals and one Iron Hour or Engine is the mix we recommend for the first eight weeks.',
  },
  {
    q: 'Can I freeze or cancel?',
    a: "Monthly plans can be frozen for up to four weeks a year and cancelled with 30 days' notice. Packs never auto-renew and last three months.",
  },
  {
    q: 'Is there parking?',
    a: 'Twelve free spots in the yard off Tallow Street, a covered bike rack inside the door, and the 14 bus stops at Foundry Row and 3rd.',
  },
]

export const visit = {
  hours: [
    { id: 'weekday', label: 'Mon–Thu', time: '05:45–21:30' },
    { id: 'fri', label: 'Fri', time: '05:45–19:30' },
    { id: 'sat', label: 'Sat', time: '08:30–13:00' },
    { id: 'sun', label: 'Sun', time: '08:30–11:30' },
  ],
}

export const footer = {
  blurb: '© 2017–present Cinderblock Boxing Club. Train hard, tap gloves, put the weights back.',
  credit: 'Template by VibeFather',
  creditHref: 'https://vibefather.ai/t/boxing-and-strength-gym-website',
  club: [
    { label: 'Pricing', href: './index.html#pricing' },
    { label: 'Coaches', href: './index.html#coaches' },
    { label: 'Results', href: './index.html#results' },
    { label: 'FAQ', href: './index.html#faq' },
  ],
}

export const sections = {
  classes: {
    index: '01',
    label: 'Classes',
    lines: [
      { text: 'Six ways' },
      { text: 'To empty the tank.', accent: true },
    ],
    lead: 'Every class is capped, coached and scaled. Start at Fundamentals, add what you like, come as often as your plan allows.',
  },
  pricing: {
    index: '02',
    label: 'Membership',
    count: 'No joining fee',
    lines: [
      { text: 'Pick your' },
      { text: 'Round count.', accent: true },
    ],
    note: "Monthly plans roll month to month: cancel with 30 days' notice at the desk or by email. Packs never auto-renew. Students and first responders get 15% off monthly plans with ID.",
  },
  coaches: {
    index: '03',
    label: 'Coaches',
    lines: [
      { text: 'Cornered by' },
      { text: 'People who care.', accent: true },
    ],
  },
  results: {
    index: '04',
    label: 'Results',
  },
  trial: {
    index: '05',
    label: 'Free trial',
    count: '1 class · no card',
  },
  faq: {
    index: '06',
    label: 'First-timer FAQ',
    lines: [
      { text: 'Ask before' },
      { text: 'You ask.', accent: true },
    ],
    caption: 'Loaner gloves live on the wall by the desk.',
  },
}

export const timetablePage = {
  kicker: 'Timetable',
  lines: [{ text: 'The week.' }],
  lead: '34 classes, six types, sixteen people max. Tap any class for the details, then book it as your free trial.',
  ctaLines: [
    { text: 'First class' },
    { text: 'Is free.', accent: true },
  ],
}

export const rules = [
  {
    title: 'Be early',
    body: 'Doors to the floor close 5 minutes after start. Ten minutes early gets you wrapped and warm.',
  },
  {
    title: 'Tap gloves',
    body: 'Partners rotate every round. Respect the person holding the pads.',
  },
  {
    title: 'Wipe it down',
    body: 'Bags, benches and bars get wiped after use. Spray bottles hang on every pillar.',
  },
  {
    title: 'Tell the coach',
    body: "Injury, bad night's sleep, first time back: say so before the warm-up and we'll scale it.",
  },
]
