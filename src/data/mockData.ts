import { Master, PlaceItem, ShortItem, WorkItem, ReviewItem } from '../types';

export const PLACES_DATA: PlaceItem[] = [
  {
    id: 'studio-x',
    name: 'Studio X',
    city: 'Moscow',
    district: 'Patriarch Ponds',
    address: 'Malaya Bronnaya, 28/2',
    rating: 4.9,
    reviewsCount: 184,
    description: 'Minimalist industrial space on Patriarch Ponds. Concrete, raw steel, warm natural lighting, and curated specialty coffee. Independent workspaces for top stylists and colorists.',
    photos: [
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80'
    ],
    workingMasterIds: ['master-anna', 'master-max', 'master-elena'],
    amenities: ['Specialty Coffee Bar', 'Dedicated Wash Stations', 'Valet Parking', 'High-Speed Wi-Fi', 'Private VIP Room'],
    lat: 55.7628,
    lng: 37.5931
  },
  {
    id: 'atelier-blanche',
    name: 'Atelier Blanche',
    city: 'Moscow',
    district: 'Kitay-Gorod',
    address: 'Pokrovsky Boulevard, 14',
    rating: 4.8,
    reviewsCount: 220,
    description: 'Restored 19th century neoclassical atelier with arched high ceilings, botanical greenery, and serene acoustics. Focused on skin ritualism, clean aesthetics, and Japanese hair care.',
    photos: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1629732047847-50219e9c5aef?auto=format&fit=crop&w=1000&q=80'
    ],
    workingMasterIds: ['master-diana', 'master-alisa'],
    amenities: ['Organic Tea Menu', 'Dyson Airflow Lab', 'Quiet Zone', 'Terrace Garden'],
    lat: 55.7558,
    lng: 37.6445
  },
  {
    id: 'the-concrete-room',
    name: 'The Concrete Room',
    city: 'Moscow',
    district: 'Flacon / Dmitrovskaya',
    address: 'Bolshaya Novodmitrovskaya, 36',
    rating: 4.95,
    reviewsCount: 310,
    description: 'Raw brickwork and architectural brutalism. A community hub for precision barbers, custom texture specialists, and contemporary hand-poked tattoo artists.',
    photos: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1000&q=80'
    ],
    workingMasterIds: ['master-marcus', 'master-roman'],
    amenities: ['Custom Vinyl Station', 'Draft Cold Brew', 'Pet Friendly', 'Bicycle Storage'],
    lat: 55.8052,
    lng: 37.5855
  }
];

export const INITIAL_MASTERS: Master[] = [
  {
    id: 'master-anna',
    name: 'Anna Ivanova',
    handle: '@anna.hair',
    specialization: 'Hair Stylist & Blonde Specialist',
    category: 'hair',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewCount: 342,
    followersCount: 1240,
    isFollowing: false,
    city: 'Moscow',
    district: 'Patriarch Ponds',
    distanceKm: 0.8,
    startingPrice: 3500,
    about: '10+ years dedicated to natural architectural haircuts, lived-in blonde, and gentle airtouch transitions. I prioritize hair texture health over aggressive lightening.',
    instagram: 'anna.ivanova.hair',
    currentPlaceId: 'studio-x',
    currentPlaceName: 'Studio X',
    careerHistory: [
      { year: '2026', placeName: 'Studio X', role: 'Resident Color Director & Educator', isCurrent: true, notes: 'Focus on airtouch and organic scalp health' },
      { year: '2024–2025', placeName: 'Atelier Blanche', role: 'Senior Colorist', notes: 'Japanese treatment protocols and custom pigments' },
      { year: '2021–2023', placeName: 'Buro Beauty', role: 'Stylist & Color Specialist' },
      { year: '2019', placeName: 'Vidal Sassoon Academy London', role: 'ABC Cutting Certification' }
    ],
    services: [
      {
        id: 'serv-anna-1',
        name: 'Architectural Haircut',
        category: 'hair',
        description: 'Bespoke precision dry & wet cut taking into account cranial geometry, natural whorls, and daily ease of styling.',
        durationMinutes: 60,
        priceFrom: 4500,
        image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'serv-anna-2',
        name: 'Airtouch / Lived-in Blonde',
        category: 'hair',
        description: 'Micro-strand air displacement technique with seamless root fade lasting 6–9 months without visible regrowth lines.',
        durationMinutes: 180,
        priceFrom: 11000,
        image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'serv-anna-3',
        name: 'Gloss & Organic Keratin Glaze',
        category: 'hair',
        description: 'Acidic pH gloss restoration that seals cuticles, neutralizes unwanted brassiness, and infuses mirror shine.',
        durationMinutes: 75,
        priceFrom: 5500,
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
      }
    ],
    works: [
      {
        id: 'work-anna-1',
        masterId: 'master-anna',
        title: 'Nordic Vanilla Airtouch & Soft Curtain Layers',
        mediaUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'portrait',
        likesCount: 148,
        isLiked: false,
        serviceId: 'serv-anna-2',
        serviceName: 'Airtouch / Lived-in Blonde',
        tags: ['Blonde', 'Airtouch', 'Lived-in'],
        date: 'Yesterday'
      },
      {
        id: 'work-anna-2',
        masterId: 'master-anna',
        title: 'French Bob with Natural Texture & Weightless Edge',
        mediaUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'square',
        likesCount: 92,
        isLiked: false,
        serviceId: 'serv-anna-1',
        serviceName: 'Architectural Haircut',
        tags: ['French Bob', 'Precision Cut'],
        date: '3 days ago'
      },
      {
        id: 'work-anna-3',
        masterId: 'master-anna',
        title: 'Deep Chestnut Gloss and Silk Blowout',
        mediaUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'portrait',
        likesCount: 204,
        isLiked: false,
        serviceId: 'serv-anna-3',
        serviceName: 'Gloss & Organic Keratin Glaze',
        tags: ['Gloss', 'Shine', 'Brunette'],
        date: '5 days ago'
      },
      {
        id: 'work-anna-4',
        masterId: 'master-anna',
        title: 'Before & After: Correcting Banding into Milky Sand Blonde',
        mediaUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'portrait',
        likesCount: 312,
        isLiked: true,
        isBeforeAfter: true,
        beforeMediaUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
        serviceId: 'serv-anna-2',
        serviceName: 'Airtouch / Lived-in Blonde',
        tags: ['Color Correction', 'Transformation'],
        date: '1 week ago'
      }
    ],
    shorts: [
      {
        id: 'short-anna-1',
        masterId: 'master-anna',
        masterName: 'Anna Ivanova',
        masterAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        specialization: 'Hair Stylist',
        title: 'The exact air blow technique that creates seamless blonde gradients',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hairdresser-brushing-womans-hair-41221-large.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80',
        views: 4820,
        duration: 18,
        category: 'hair',
        serviceId: 'serv-anna-2',
        serviceName: 'Airtouch / Lived-in Blonde',
        priceFrom: 11000,
        likes: 640,
        isLiked: false
      },
      {
        id: 'short-anna-2',
        masterId: 'master-anna',
        masterName: 'Anna Ivanova',
        masterAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        specialization: 'Hair Stylist',
        title: 'Dry cut texturizing for natural volume without products',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stylist-combing-womans-wet-hair-41222-large.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
        views: 2910,
        duration: 12,
        category: 'hair',
        serviceId: 'serv-anna-1',
        serviceName: 'Architectural Haircut',
        priceFrom: 4500,
        likes: 388,
        isLiked: false
      }
    ],
    reviews: [
      {
        id: 'rev-anna-1',
        authorName: 'Polina Voronova',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'September 18, 2026',
        serviceName: 'Airtouch / Lived-in Blonde',
        text: 'Anna is a genius of color. My blonde has never felt this soft, and the transition at the roots is completely invisible. Three months later it still looks fresh.'
      },
      {
        id: 'rev-anna-2',
        authorName: 'Ksenia Zaytseva',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'August 30, 2026',
        serviceName: 'Architectural Haircut',
        text: 'The best bob in Moscow. No blow dryer needed in the morning — I just air dry and it falls into place organically.'
      }
    ],
    availability: {
      '2026-09-22': ['14:30', '17:00'],
      '2026-09-23': ['11:00', '13:30', '16:00', '19:00'],
      '2026-09-24': ['10:00', '14:00', '17:30'],
      '2026-09-25': ['12:00', '15:30', '18:00'],
      '2026-09-26': ['10:30', '13:00', '16:30']
    },
    lat: 55.7628,
    lng: 37.5931
  },
  {
    id: 'master-marcus',
    name: 'Marcus Chen',
    handle: '@marcus.barber',
    specialization: 'Precision Barber & Beard Sculptor',
    category: 'barber',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
    rating: 4.95,
    reviewCount: 286,
    followersCount: 1890,
    isFollowing: false,
    city: 'Moscow',
    district: 'Flacon / Dmitrovskaya',
    distanceKm: 2.1,
    startingPrice: 3200,
    about: 'Zero-compromise scissor craft and straight razor fading. Working with hair density patterns and organic head anatomy.',
    instagram: 'marcus.chen.craft',
    currentPlaceId: 'the-concrete-room',
    currentPlaceName: 'The Concrete Room',
    careerHistory: [
      { year: '2025–2026', placeName: 'The Concrete Room', role: 'Lead Resident Craftsman', isCurrent: true },
      { year: '2023–2025', placeName: 'Fjord Men’s Atelier', role: 'Senior Barber' },
      { year: '2022', placeName: 'Schorem Old School Rotterdam', role: 'Advanced Fade & Shave' }
    ],
    services: [
      {
        id: 'serv-marcus-1',
        name: 'Architectural Fade & Scissor Cut',
        category: 'barber',
        description: 'Taper or skin fade with scissor-sculpted top, hot towel finish, and cold mint toner.',
        durationMinutes: 50,
        priceFrom: 3600,
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'serv-marcus-2',
        name: 'Beard Reconstruction & Hot Towel Shave',
        category: 'barber',
        description: 'Precision symmetry sculpting with traditional badger brush lather and Japanese feather blade edge.',
        durationMinutes: 40,
        priceFrom: 2800,
        image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80'
      }
    ],
    works: [
      {
        id: 'work-marcus-1',
        masterId: 'master-marcus',
        title: 'Skin Taper with Textured Crop and Clean Contours',
        mediaUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'square',
        likesCount: 184,
        tags: ['Skin Fade', 'Crop', 'Texture'],
        date: '2 days ago'
      },
      {
        id: 'work-marcus-2',
        masterId: 'master-marcus',
        title: 'Full Beard Alignment and Natural Mustache Taper',
        mediaUrl: 'https://images.unsplash.com/photo-1517832606589-7629c33971a6?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'portrait',
        likesCount: 220,
        tags: ['Beard', 'Hot Towel', 'Grooming'],
        date: '4 days ago'
      }
    ],
    shorts: [
      {
        id: 'short-marcus-1',
        masterId: 'master-marcus',
        masterName: 'Marcus Chen',
        masterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        specialization: 'Precision Barber',
        title: 'Foil shaver blend in 15 seconds flat',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barber-trimming-the-beard-of-a-client-41235-large.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80',
        views: 6150,
        duration: 15,
        category: 'barber',
        serviceId: 'serv-marcus-1',
        serviceName: 'Architectural Fade & Scissor Cut',
        priceFrom: 3600,
        likes: 820
      }
    ],
    reviews: [
      {
        id: 'rev-marcus-1',
        authorName: 'Dmitry Orlov',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'September 15, 2026',
        serviceName: 'Architectural Fade & Scissor Cut',
        text: 'Marcus is on another level. Attention to detail is surgical. The studio atmosphere is also exceptionally calm.'
      }
    ],
    availability: {
      '2026-09-22': ['16:00', '18:00'],
      '2026-09-23': ['10:00', '12:00', '15:00', '17:00'],
      '2026-09-24': ['11:30', '14:00', '16:30']
    },
    lat: 55.8052,
    lng: 37.5855
  },
  {
    id: 'master-elena',
    name: 'Elena Rostova',
    handle: '@elena.minimal.nails',
    specialization: 'Japanese Aesthetic Manicure & Nail Art',
    category: 'nails',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80',
    rating: 4.93,
    reviewCount: 412,
    followersCount: 2450,
    isFollowing: false,
    city: 'Moscow',
    district: 'Patriarch Ponds',
    distanceKm: 0.9,
    startingPrice: 3800,
    about: 'Strict non-invasive apparatus manicure and micro-art. Natural nail strengthening using hypoallergenic mineral formulas without thick gel bulking.',
    instagram: 'elena.rostova.nails',
    currentPlaceId: 'studio-x',
    currentPlaceName: 'Studio X',
    careerHistory: [
      { year: '2025–2026', placeName: 'Studio X', role: 'Resident Nail Specialist', isCurrent: true },
      { year: '2023–2025', placeName: 'Mahash Spa', role: 'Top Manicure Artist' },
      { year: '2022', placeName: 'Tokyo Nail Institute', role: 'Calgel & Dry Hardware Masterclass' }
    ],
    services: [
      {
        id: 'serv-elena-1',
        name: 'Japanese Mineral Manicure & Clean Cuticle',
        category: 'nails',
        description: 'Dry apparatus technique followed by pearl paste polishing and natural beeswax sealing.',
        durationMinutes: 60,
        priceFrom: 3800,
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'serv-elena-2',
        name: 'Fine Architectural Gel & Micro-Chrome Art',
        category: 'nails',
        description: 'Ultra-thin anatomical reinforcement with bespoke negative space, metallic chrome accents, or muted earth tones.',
        durationMinutes: 90,
        priceFrom: 5200,
        image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80'
      }
    ],
    works: [
      {
        id: 'work-elena-1',
        masterId: 'master-elena',
        title: 'Minimalist Chrome Droplets on Sheer Milky Base',
        mediaUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'square',
        likesCount: 420,
        tags: ['Micro Art', 'Chrome', 'Clean Girl'],
        date: 'Yesterday'
      },
      {
        id: 'work-elena-2',
        masterId: 'master-elena',
        title: 'Raw Japanese Pearl Polish on Short Natural Nails',
        mediaUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'portrait',
        likesCount: 380,
        tags: ['Japanese Manicure', 'Natural'],
        date: '4 days ago'
      }
    ],
    shorts: [
      {
        id: 'short-elena-1',
        masterId: 'master-elena',
        masterName: 'Elena Rostova',
        masterAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        specialization: 'Nail Artist',
        title: 'Natural nail shine without gel polish: Japanese mineral method',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-manicurist-applying-varnish-on-a-customers-nails-41224-large.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80',
        views: 8400,
        duration: 14,
        category: 'nails',
        serviceId: 'serv-elena-1',
        serviceName: 'Japanese Mineral Manicure',
        priceFrom: 3800,
        likes: 910
      }
    ],
    reviews: [
      {
        id: 'rev-elena-1',
        authorName: 'Vlada Chernova',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'September 12, 2026',
        serviceName: 'Fine Architectural Gel',
        text: 'The only master in town who understands ultra-thin natural nail architecture. Never bulky, lasts 4 weeks impeccably.'
      }
    ],
    availability: {
      '2026-09-22': ['15:00', '17:30'],
      '2026-09-23': ['10:30', '13:00', '18:00'],
      '2026-09-24': ['11:00', '14:30', '17:00']
    },
    lat: 55.7628,
    lng: 37.5931
  },
  {
    id: 'master-diana',
    name: 'Diana Lee',
    handle: '@diana.skin.ritual',
    specialization: 'Skin Therapist & Facial Sculpting',
    category: 'skin',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
    rating: 4.98,
    reviewCount: 198,
    followersCount: 1650,
    isFollowing: false,
    city: 'Moscow',
    district: 'Kitay-Gorod',
    distanceKm: 1.4,
    startingPrice: 6500,
    about: 'Holistic facial buccal massage, myofascial sculpting, and non-traumatic clinical peels. Enhancing lymphatic drainage and natural bone structure.',
    instagram: 'diana.skin.craft',
    currentPlaceId: 'atelier-blanche',
    currentPlaceName: 'Atelier Blanche',
    careerHistory: [
      { year: '2024–2026', placeName: 'Atelier Blanche', role: 'Resident Facial Sculptor', isCurrent: true },
      { year: '2022–2024', placeName: 'Enhel Wellness Center', role: 'Dermal Therapist' }
    ],
    services: [
      {
        id: 'serv-diana-1',
        name: 'Deep Myofascial & Buccal Face Sculpting',
        category: 'skin',
        description: 'Sculptural lifting treatment combining intraoral buccal massage, shoulder decompression, and cold jade gua sha.',
        durationMinutes: 75,
        priceFrom: 7500,
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'serv-diana-2',
        name: 'Biologique Recherche Oxygenation Protocol',
        category: 'skin',
        description: 'Micro-exfoliation with customized serums to oxygenate tired urban skin and restore barrier integrity.',
        durationMinutes: 90,
        priceFrom: 9500,
        image: 'https://images.unsplash.com/photo-1512290900672-1f48651f6760?auto=format&fit=crop&w=600&q=80'
      }
    ],
    works: [
      {
        id: 'work-diana-1',
        masterId: 'master-diana',
        title: 'Post-Buccal Sculpting: Immediate Cheekbone Contour & Lymph Drain',
        mediaUrl: 'https://images.unsplash.com/photo-1512290900672-1f48651f6760?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'portrait',
        likesCount: 290,
        tags: ['Gua Sha', 'Facial Sculpting', 'Glow'],
        date: '3 days ago'
      }
    ],
    shorts: [
      {
        id: 'short-diana-1',
        masterId: 'master-diana',
        masterName: 'Diana Lee',
        masterAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        specialization: 'Skin Therapist',
        title: 'Lymphatic drainage morning press: 3 key pressure points',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-beautician-applying-facial-cream-to-a-client-41226-large.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1512290900672-1f48651f6760?auto=format&fit=crop&w=600&q=80',
        views: 7200,
        duration: 20,
        category: 'skin',
        serviceId: 'serv-diana-1',
        serviceName: 'Deep Myofascial Sculpting',
        priceFrom: 7500,
        likes: 740
      }
    ],
    reviews: [
      {
        id: 'rev-diana-1',
        authorName: 'Svetlana Mirova',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'September 10, 2026',
        serviceName: 'Deep Myofascial & Buccal Face Sculpting',
        text: 'The tension in my jaw and neck melted completely. My cheekbones look lifted without a single needle.'
      }
    ],
    availability: {
      '2026-09-22': ['17:00'],
      '2026-09-23': ['12:00', '15:00'],
      '2026-09-24': ['11:00', '16:00', '18:30']
    },
    lat: 55.7558,
    lng: 37.6445
  },
  {
    id: 'master-alisa',
    name: 'Alisa Volkova',
    handle: '@alisa.brows.art',
    specialization: 'Editorial Eyebrow & Lamination Artist',
    category: 'brows',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=1200&q=80',
    rating: 4.88,
    reviewCount: 164,
    followersCount: 1120,
    isFollowing: false,
    city: 'Moscow',
    district: 'Kitay-Gorod',
    distanceKm: 1.5,
    startingPrice: 2800,
    about: 'Preserving raw natural brow architecture. Delicate lightening, feather lamination, and bespoke color toning without harsh stencils.',
    instagram: 'alisa.brows',
    currentPlaceId: 'atelier-blanche',
    currentPlaceName: 'Atelier Blanche',
    careerHistory: [
      { year: '2025–2026', placeName: 'Atelier Blanche', role: 'Brow Resident', isCurrent: true },
      { year: '2024', placeName: 'Brow Up! Moscow', role: 'Senior Brow Stylist' }
    ],
    services: [
      {
        id: 'serv-alisa-1',
        name: 'Organic Brow Lamination & Tint',
        category: 'brows',
        description: 'Gentle cysteamine keratin formula that sets unruly hairs into place while infusing panthenol and silk proteins.',
        durationMinutes: 45,
        priceFrom: 3200,
        image: 'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=600&q=80'
      }
    ],
    works: [
      {
        id: 'work-alisa-1',
        masterId: 'master-alisa',
        title: 'Feathered Fluffy Brows with Sheer Hazel Tint',
        mediaUrl: 'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'square',
        likesCount: 175,
        tags: ['Fluffy Brows', 'Lamination'],
        date: '5 days ago'
      }
    ],
    shorts: [],
    reviews: [
      {
        id: 'rev-alisa-1',
        authorName: 'Irina Markova',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'September 5, 2026',
        serviceName: 'Organic Brow Lamination & Tint',
        text: 'Zero black marker brow effect! Alisa matched my ginger blonde undertone flawlessly.'
      }
    ],
    availability: {
      '2026-09-22': ['13:00', '15:30', '18:00'],
      '2026-09-23': ['11:00', '14:00', '16:30']
    },
    lat: 55.7558,
    lng: 37.6445
  },
  {
    id: 'master-roman',
    name: 'Roman K.',
    handle: '@roman.fine.ink',
    specialization: 'Fine-line & Botanical Tattoo',
    category: 'tattoo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=80',
    rating: 4.97,
    reviewCount: 145,
    followersCount: 3100,
    isFollowing: false,
    city: 'Moscow',
    district: 'Flacon / Dmitrovskaya',
    distanceKm: 2.2,
    startingPrice: 7000,
    about: 'Single-needle botanical and typographic miniature tattoos. Smooth greywash gradients and microscopic precision healing.',
    instagram: 'roman.tattoo.space',
    currentPlaceId: 'the-concrete-room',
    currentPlaceName: 'The Concrete Room',
    careerHistory: [
      { year: '2024–2026', placeName: 'The Concrete Room', role: 'Resident Tattooist', isCurrent: true },
      { year: '2022–2024', placeName: 'Sashatattooing Moscow', role: 'Junior Resident' }
    ],
    services: [
      {
        id: 'serv-roman-1',
        name: 'Single Needle Botanical Miniature (up to 8cm)',
        category: 'tattoo',
        description: 'Delicate anatomical placement of custom botanical sketches using microscopic 0.25mm single needle.',
        durationMinutes: 120,
        priceFrom: 8500,
        image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=600&q=80'
      }
    ],
    works: [
      {
        id: 'work-roman-1',
        masterId: 'master-roman',
        title: 'Micro Wild Fern on Inner Forearm',
        mediaUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'portrait',
        likesCount: 520,
        tags: ['Single Needle', 'Botanical', 'Fine Line'],
        date: '1 week ago'
      }
    ],
    shorts: [],
    reviews: [
      {
        id: 'rev-roman-1',
        authorName: 'Mikhail B.',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'September 1, 2026',
        serviceName: 'Single Needle Botanical Miniature',
        text: 'The lines are as thin as pencil graphite. Healed cleanly without any spreading.'
      }
    ],
    availability: {
      '2026-09-24': ['13:00', '16:00'],
      '2026-09-25': ['14:00', '17:00']
    },
    lat: 55.8052,
    lng: 37.5855
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'book-101',
    masterId: 'master-anna',
    masterName: 'Anna Ivanova',
    masterAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    serviceId: 'serv-anna-1',
    serviceName: 'Architectural Haircut',
    servicePrice: 4500,
    placeName: 'Studio X',
    date: '2026-09-24',
    time: '14:00',
    clientName: 'Anastasia S.',
    clientPhone: '+7 (916) 555-0192',
    clientNote: 'Would like to keep collarbone length with subtle layers',
    status: 'confirmed' as const,
    createdAt: '2026-09-20'
  }
];

export const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    masterId: 'master-anna',
    sender: 'user' as const,
    text: 'Hi Anna! I’d like to book an airtouch coloring. My hair is natural dark blonde, chest length.',
    timestamp: '11:42'
  },
  {
    id: 'msg-2',
    masterId: 'master-anna',
    sender: 'master' as const,
    text: 'Hello! That sounds like a wonderful base to work with. We can achieve a very soft luminous gradient that grows out seamlessly. Here is the service details:',
    timestamp: '11:45',
    contextCard: {
      serviceId: 'serv-anna-2',
      serviceName: 'Airtouch / Lived-in Blonde',
      priceFrom: 11000,
      durationMinutes: 180
    }
  },
  {
    id: 'msg-3',
    masterId: 'master-anna',
    sender: 'master' as const,
    text: 'I have open slots this Thursday at 14:00 or Friday at 12:00. You can tap the card above to pick your preferred time directly!',
    timestamp: '11:46'
  }
];

export const initialMasters: Master[] = INITIAL_MASTERS;
export const initialPlaces: PlaceItem[] = PLACES_DATA;
export const allShorts: ShortItem[] = INITIAL_MASTERS.flatMap((m) => m.shorts);

