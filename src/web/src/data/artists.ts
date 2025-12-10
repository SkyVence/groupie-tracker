export interface Concert {
  date: string;
  location: string;
  venue: string;
}

export interface Artist {
  id: number;
  name: string;
  image: string;
  members: number;
  creationDate: number;
  description: string;
  concerts: Concert[];
}

export const artists: Artist[] = [
  {
    id: 1,
    name: "Queen",
    image: "https://groupietrackers.herokuapp.com/api/images/queen.jpeg",
    members: 4,
    creationDate: 1970,
    description:
      "Queen est un groupe de rock britannique formé en 1970 à Londres. Composé de Freddie Mercury, Brian May, Roger Taylor et John Deacon, le groupe est devenu l'un des plus grands groupes de rock de tous les temps avec des hits comme 'Bohemian Rhapsody', 'We Will Rock You' et 'Don't Stop Me Now'.",
    concerts: [
      {
        date: "15/06/2024",
        location: "Paris, France",
        venue: "Accor Arena",
      },
      {
        date: "20/06/2024",
        location: "Londres, UK",
        venue: "O2 Arena",
      },
      {
        date: "25/06/2024",
        location: "New York, USA",
        venue: "Madison Square Garden",
      },
    ],
  },
  {
    id: 2,
    name: "Pink Floyd",
    image: "https://groupietrackers.herokuapp.com/api/images/pink-floyd.jpeg",
    members: 5,
    creationDate: 1965,
    description:
      "Pink Floyd est un groupe de rock progressif britannique formé à Londres en 1965. Connu pour sa musique psychédélique et ses concerts spectaculaires, le groupe a créé des albums légendaires comme 'The Dark Side of the Moon' et 'The Wall'.",
    concerts: [
      {
        date: "10/07/2024",
        location: "Berlin, Allemagne",
        venue: "Mercedes-Benz Arena",
      },
      {
        date: "18/07/2024",
        location: "Amsterdam, Pays-Bas",
        venue: "Ziggo Dome",
      },
      {
        date: "22/07/2024",
        location: "Barcelone, Espagne",
        venue: "Palau Sant Jordi",
      },
    ],
  },
  {
    id: 3,
    name: "Led Zeppelin",
    image: "https://groupietrackers.herokuapp.com/api/images/led-zeppelin.jpeg",
    members: 4,
    creationDate: 1968,
    description:
      "Led Zeppelin est un groupe de rock britannique formé en 1968. Considéré comme l'un des groupes les plus influents de l'histoire du rock, ils ont défini le hard rock et le heavy metal avec des classiques comme 'Stairway to Heaven' et 'Whole Lotta Love'.",
    concerts: [
      {
        date: "05/08/2024",
        location: "Los Angeles, USA",
        venue: "The Forum",
      },
      {
        date: "12/08/2024",
        location: "Chicago, USA",
        venue: "United Center",
      },
      {
        date: "19/08/2024",
        location: "Toronto, Canada",
        venue: "Scotiabank Arena",
      },
    ],
  },
  {
    id: 4,
    name: "Scorpions",
    image: "https://groupietrackers.herokuapp.com/api/images/scorpions.jpeg",
    members: 5,
    creationDate: 1965,
    description:
      "Scorpions est un groupe de hard rock allemand formé en 1965 à Hanovre. Avec des hits internationaux comme 'Wind of Change' et 'Rock You Like a Hurricane', ils sont devenus l'un des groupes de rock allemands les plus réussis.",
    concerts: [
      {
        date: "01/09/2024",
        location: "Munich, Allemagne",
        venue: "Olympiahalle",
      },
      {
        date: "08/09/2024",
        location: "Vienne, Autriche",
        venue: "Wiener Stadthalle",
      },
      {
        date: "15/09/2024",
        location: "Zurich, Suisse",
        venue: "Hallenstadion",
      },
    ],
  },
  {
    id: 5,
    name: "Soja",
    image: "https://groupietrackers.herokuapp.com/api/images/soja.jpeg",
    members: 8,
    creationDate: 1997,
    description:
      "SOJA (Soldiers of Jah Army) est un groupe de reggae américain formé en 1997 à Arlington, Virginie. Leur musique mélange reggae roots, rock et hip-hop avec des messages positifs et conscients.",
    concerts: [
      {
        date: "20/09/2024",
        location: "Miami, USA",
        venue: "FTX Arena",
      },
      {
        date: "27/09/2024",
        location: "Mexico City, Mexique",
        venue: "Foro Sol",
      },
      {
        date: "05/10/2024",
        location: "São Paulo, Brésil",
        venue: "Allianz Parque",
      },
    ],
  },
  {
    id: 6,
    name: "AC/DC",
    image: "https://groupietrackers.herokuapp.com/api/images/acdc.jpeg",
    members: 5,
    creationDate: 1973,
    description:
      "AC/DC est un groupe de hard rock australien formé en 1973 à Sydney. Avec leur son rock brut et puissant, ils ont créé des anthems comme 'Highway to Hell', 'Back in Black' et 'Thunderstruck', vendant plus de 200 millions d'albums dans le monde.",
    concerts: [
      {
        date: "10/10/2024",
        location: "Sydney, Australie",
        venue: "ANZ Stadium",
      },
      {
        date: "18/10/2024",
        location: "Melbourne, Australie",
        venue: "Marvel Stadium",
      },
      {
        date: "25/10/2024",
        location: "Brisbane, Australie",
        venue: "Suncorp Stadium",
      },
    ],
  },
  {
    id: 7,
    name: "Playboi Carti",
    image:
      "https://groupietrackers.herokuapp.com/api/images/playboi-carti.jpeg",
    members: 1,
    creationDate: 2011,
    description:
      "Playboi Carti est un rappeur américain originaire d'Atlanta, Géorgie. Connu pour son style unique et son flow mélodique, il a révolutionné le rap avec des albums comme 'Die Lit' et 'Whole Lotta Red'. Son approche expérimentale et son esthétique punk ont fait de lui l'un des artistes les plus influents de sa génération.",
    concerts: [
      {
        date: "05/11/2024",
        location: "Atlanta, USA",
        venue: "State Farm Arena",
      },
      {
        date: "12/11/2024",
        location: "Los Angeles, USA",
        venue: "Crypto.com Arena",
      },
      {
        date: "20/11/2024",
        location: "New York, USA",
        venue: "Barclays Center",
      },
    ],
  },
  {
    id: 8,
    name: "Travis Scott",
    image: "https://groupietrackers.herokuapp.com/api/images/travis-scott.jpeg",
    members: 1,
    creationDate: 2008,
    description:
      "Travis Scott est un rappeur, chanteur et producteur américain de Houston, Texas. Connu pour ses performances énergiques et ses productions psychédéliques, il a sorti des albums acclamés comme 'Astroworld' et 'Rodeo'. Ses concerts spectaculaires et son influence sur la culture hip-hop moderne en font l'un des artistes les plus importants de sa génération.",
    concerts: [
      {
        date: "01/12/2024",
        location: "Houston, USA",
        venue: "Toyota Center",
      },
      {
        date: "08/12/2024",
        location: "Miami, USA",
        venue: "FTX Arena",
      },
      {
        date: "15/12/2024",
        location: "Las Vegas, USA",
        venue: "T-Mobile Arena",
      },
    ],
  },
];
