import {
  Calendar,
  Clock,
  Gift,
  Heart,
  Home,
  MapPin,
  ScrollText,
  Sparkles,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

export const HOST_NAME = "Prawn";
export const GUEST_NAME = "Kay";
export const GUEST_AVATAR = "/images/kay-profile.png";
export const HOST_AVATAR = "/images/prawn-profile.png";

export const heroTagline = "Invite-only stay · 10 km away · Emotionally overprepared";

export const aprilMemory = {
  label: "Last stay: April",
  quote: "Guest stayed for one week. The property has not emotionally recovered since.",
};

export const bookingStatus = "Awaiting guest approval";
export const bookingTotal = "Priceless, obviously";

export interface TrustBadge {
  icon: LucideIcon;
  label: string;
}

export const trustBadges: TrustBadge[] = [
  { icon: Sparkles, label: "Zero cleaning fee" },
  { icon: Heart, label: "Unlimited cuddles" },
  { icon: Clock, label: "Late checkout negotiable" },
];

export interface BookingDetail {
  icon: LucideIcon;
  label: string;
  value: string;
}

export const bookingDetails: BookingDetail[] = [
  { icon: MapPin, label: "Location", value: "Uttam Society" },
  { icon: User, label: "Host", value: "Prawn" },
  { icon: Calendar, label: "Check-in", value: "Anytime · Jun 19–20, 2026" },
  { icon: Users, label: "Guests", value: "1 very special guest" },
  { icon: Home, label: "Stay type", value: "Private home experience" },
];

export interface GalleryItem {
  filename: string;
  alt: string;
  title: string;
  caption: string;
}

export const galleryItems: GalleryItem[] = [
  {
    filename: "home-living-room.png",
    alt: "Living room with TV and white media console",
    title: "Living room",
    caption: "Where the stay officially begins",
  },
  {
    filename: "home-bedroom.png",
    alt: "Bedroom with desk and ambient lighting",
    title: "Bedroom",
    caption: "Premium comfort department",
  },
  {
    filename: "home-exterior-day.png",
    alt: "Uttam Society driveway and parking on a sunny day",
    title: "The neighbourhood",
    caption: "10 km away, zero traffic drama",
  },
  {
    filename: "home-exterior-dusk.png",
    alt: "Uttam Society at golden hour from the balcony",
    title: "Golden hour view",
    caption: "Best for overthinking and talking",
  },
  {
    filename: "home-exterior-night.png",
    alt: "Uttam Society parking area under a full moon",
    title: "Night view",
    caption: "Quiet, safe, and very residential",
  },
];

export interface StayDetail {
  icon: LucideIcon;
  title: string;
  description: string;
  meta?: { icon: LucideIcon; text: string };
}

export const stayDetails: StayDetail[] = [
  {
    icon: Heart,
    title: "Hosted by Prawn",
    description:
      "Known for questionable jokes, decent hospitality, and taking this booking far more seriously than usual.",
    meta: { icon: MapPin, text: "10 km away · emotionally closer" },
  },
  {
    icon: ScrollText,
    title: "House rules",
    description: "Arrive happy. Stay comfortable. Laugh at the host's jokes occasionally.",
  },
  {
    icon: Gift,
    title: "Included",
    description:
      "Snacks, privacy, long conversations, and a stay that has been pending since April.",
  },
];

export interface PriceRow {
  label: string;
  value: string;
}

export const priceBreakdown: PriceRow[] = [
  { label: "Stay at Uttam Airbnb", value: "₹0" },
  { label: "Cleaning fee", value: "Waived — host is trying to impress you" },
  { label: "Service fee", value: "One smile" },
  { label: "Taxes", value: "Paid in blushes" },
];

export const priceTotal: PriceRow = {
  label: "Total",
  value: "Confirmed after one yes",
};

export const sinceLastStay: string[] = [
  "Pillows have been emotionally prepared.",
  "The host has improved slightly.",
  "The room missed its guest.",
  "Checkout policy has become more flexible.",
];

export const hostNote = {
  paragraphs: [
    "Your previous stay in April received excellent internal reviews. The host has been waiting to reopen Uttam Airbnb for one very specific guest.",
    "This booking comes with priority check-in, unnecessary excitement, and full access to the best parts of the house.",
  ],
  signOff: "— Prawn, your host",
};

export const itinerary: string[] = [
  "Arrival and fake check-in formalities",
  "House tour even though you already know the house",
  "Snacks inspection",
  "One movie that takes 40 minutes to decide",
  "Long conversations",
  "Optional nap",
  "Late checkout, obviously",
];

export const checkInInstructions: string[] = [
  "Arrive at Uttam Society.",
  'Message "I\'m here" to the host.',
  "Host will appear pretending to be normal.",
  "Enter and accept premium hospitality.",
  "Do not question why this website exists.",
];

export interface Review {
  quote: string;
  author: string;
  role: string;
  image?: string;
}

export const reviews: Review[] = [
  {
    quote: "Guest was excellent. Left the place better just by being there.",
    author: "Prawn",
    role: "Host",
  },
  {
    quote: "The host was slightly dramatic but the stay was comfortable. Would visit again.",
    author: "Kay",
    role: "Guest · April stay",
  },
  {
    quote: "Uttam has never looked this premium. For real for real",
    author: "Uttam",
    role: "House",
    image: "/images/home-exterior-day.png",
  },
];

export const bookingPassDetails: PriceRow[] = [
  { label: "Guest", value: "Kay" },
  { label: "Host", value: "Prawn" },
  { label: "Stay", value: "Uttam Airbnb" },
  { label: "Valid for", value: "One very special guest" },
];

export const bookingPassStub: PriceRow[] = [
  { label: "Booking ID", value: "PRWN-KAY-27122025" },
  { label: "Access", value: "Invite-only" },
];

export const bookingIdReminder = {
  title: "Psst — save the booking ID.",
  lines: [
    "At check-in, Prawn will ask for it like it's a speakeasy password.",
    "No ID, no entry. Dramatic? Yes. Effective? Also yes.",
  ],
  cta: "Fine, I'll remember",
};

export const bookingPassSurprise = {
  url: "https://media1.tenor.com/m/XebIzZQMgWcAAAAC/goma-peach-cute.gif",
  scanPrompt: "Scan with your phone",
  scanHint: "A tiny host-approved surprise. Opens in your browser.",
};

export const footerLines = [
  "Uttam Airbnb · Hosted with care by Prawn - Love you baby!",
  "Not listed publicly. Invite-only stay.",
  "Reopened after April due to popular demand.",
];

export const cancellationPolicy = {
  title: "Cancellation policy",
  lines: [
    "Cancellation is only allowed with a valid reason, three emotional documents, and final approval from Prawn.",
    "Current approval rate: 0%.",
  ],
};
