import { useState, useMemo } from "react";
import { Search, Eye, Heart, Globe, Grid3X3, Flame } from "lucide-react";

// --- DATA ---
const alphabetLinks = ["Main", "#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

interface CategoryItem {
  name: string;
  count?: number;
  icon?: string;
  hot?: boolean;
}

interface CategoryGroup {
  title: string;
  items: CategoryItem[];
}

interface Section {
  name: string;
  icon: string;
  groups: CategoryGroup[];
}

const sections: Section[] = [
  {
    name: "Appearance",
    icon: "eye",
    groups: [
      { title: "AGE", items: [{ name: "Teen 18+", count: 1743 }, { name: "Young 22+", count: 4343 }, { name: "MILF", count: 1487 }, { name: "Mature", count: 290 }, { name: "Granny", count: 56 }] },
      { title: "ETHNICITY", items: [{ name: "Arab", count: 167 }, { name: "Asian", count: 879 }, { name: "Ebony", count: 622 }, { name: "Indian", count: 449 }, { name: "Latina", count: 3632 }, { name: "Mixed", count: 258 }, { name: "White", count: 2469 }] },
      { title: "BODY TYPE", items: [{ name: "Skinny", count: 3041 }, { name: "Athletic", count: 738 }, { name: "Medium", count: 2597 }, { name: "Curvy", count: 1669 }, { name: "BBW", count: 399 }] },
      { title: "HAIR", items: [{ name: "Blonde", count: 1255 }, { name: "Black", count: 2478 }, { name: "Brunette", count: 3859 }, { name: "Redhead", count: 404 }, { name: "Colorful", count: 385 }] },
      { title: "BODY TRAITS", items: [{ name: "Bald", count: 15 }, { name: "Big Ass", count: 4974 }, { name: "Big Clit", count: 1807 }, { name: "Big Nipples", count: 2407 }, { name: "Big Tits", count: 3472 }, { name: "Hairy armpits", count: 509 }, { name: "Hairy Pussy", count: 1257 }, { name: "Shaven", count: 4637 }, { name: "Small Tits", count: 2780 }, { name: "Trimmed", count: 2099 }] },
    ],
  },
  {
    name: "Activities on Request",
    icon: "flame",
    groups: [
      { title: "PRIVATE SHOW", items: [{ name: "8-12 tk", count: 3984 }, { name: "16-24 tk", count: 2285 }, { name: "32-60 tk", count: 1650 }, { name: "90+ tk", count: 391 }, { name: "Video Call (Cam2Cam)", count: 7851 }, { name: "Recordable Privates", count: 5940 }, { name: "Spy on Shows", count: 382 }] },
      { title: "ACTIVITIES", items: [{ name: "69 Position", count: 1211 }, { name: "Ahegao", count: 5146 }, { name: "Anal", count: 3058, hot: true }, { name: "Anal Toys", count: 2606 }, { name: "Ass to Mouth", count: 1310 }, { name: "Blowjob", count: 5988, hot: true }, { name: "Bukkake", count: 208 }, { name: "Camel Toe", count: 4680 }, { name: "Cock Rating", count: 3455 }, { name: "Cosplay", count: 1322, hot: true }, { name: "Cowgirl", count: 4579 }, { name: "Creampie", count: 2129 }, { name: "Cumshot", count: 1432 }, { name: "Deepthroat", count: 4935, hot: true }, { name: "Dildo or Vibrator", count: 6069 }, { name: "Dirty Talk", count: 5801 }, { name: "Doggy Style", count: 6830, hot: true }, { name: "Double Penetration", count: 1736 }, { name: "Erotic Dance", count: 6720 }, { name: "Facesitting", count: 1910 }, { name: "Facial", count: 1995 }, { name: "Fingering", count: 6843, hot: true }, { name: "Fisting", count: 906 }, { name: "Flashing", count: 3438 }, { name: "Footjob", count: 2448 }, { name: "Foursome", count: 24 }, { name: "Fuck Machine", count: 896, hot: true }, { name: "Gagging", count: 2128 }, { name: "Gangbang", count: 44 }, { name: "Gape", count: 706 }] },
      { title: "", items: [{ name: "Glory Hole", count: 188 }, { name: "Handjob", count: 3619 }, { name: "Hardcore", count: 263 }, { name: "Humiliation", count: 3673 }, { name: "Jerk-off Instruction", count: 3386 }, { name: "Massage", count: 2105 }, { name: "Masturbation", count: 6674 }, { name: "Nipple Toys", count: 2649 }, { name: "Oil Show", count: 5955 }, { name: "Orgasm", count: 5305 }, { name: "Pegging", count: 386 }, { name: "Pussy Licking", count: 742 }, { name: "Role Play", count: 4180 }, { name: "Sex Toys", count: 5599 }, { name: "Sexting", count: 5801 }] },
      { title: "", items: [{ name: "Shower", count: 1962 }, { name: "Spanking", count: 6623 }, { name: "Squirt", count: 3743 }, { name: "Strapon", count: 642 }, { name: "Striptease", count: 6317 }, { name: "Swing", count: 225 }, { name: "Threesome", count: 46 }, { name: "Tittyfuck", count: 4796 }, { name: "Topless", count: 5697 }, { name: "Twerk", count: 5255 }, { name: "Upskirt", count: 2829 }, { name: "Yoga", count: 1801 }] },
      { title: "DEVICE", items: [{ name: "Anal Toys", count: 2606 }, { name: "Dildo or Vibrator", count: 6069 }, { name: "Fuck Machine", count: 896, hot: true }, { name: "Interactive Toy", count: 4834 }, { name: "Kiiroo", count: 2 }, { name: "Lovense", count: 4834 }, { name: "Nipple Toys", count: 2649 }, { name: "Sex Toys", count: 5599 }, { name: "Strapon", count: 642 }] },
    ],
  },
  {
    name: "Specifics",
    icon: "grid",
    groups: [
      { title: "SUBCULTURES", items: [{ name: "Anime Girls", count: 511 }, { name: "Club Girls", count: 329 }, { name: "E-girl", count: 284 }, { name: "Emo", count: 265 }, { name: "Gamers", count: 329 }, { name: "Glamour", count: 1176 }, { name: "Goth", count: 422 }, { name: "Gym Babe", count: 748 }, { name: "Housewives", count: 1020 }, { name: "K-pop", count: 193 }, { name: "Nerds", count: 185 }, { name: "Punks", count: 95 }, { name: "Queers", count: 63 }, { name: "Romantic", count: 1268 }, { name: "Student", count: 2804 }, { name: "Tomboys", count: 149 }] },
      { title: "BROADCAST", items: [{ name: "HD", count: 7622 }, { name: "Mobile", count: 1561 }, { name: "Recordable", count: 6351 }, { name: "VR Cams", count: 223 }] },
      { title: "SHOW TYPE", items: [{ name: "ASMR", count: 189 }, { name: "Cooking", count: 1112 }, { name: "Flirting", count: 28 }, { name: "Group Sex", count: 108 }, { name: "Interracial", count: 9 }, { name: "New Models", count: 1424 }, { name: "Office", count: 1233 }, { name: "Old & Young 22+", count: 39 }, { name: "Outdoor", count: 1207 }, { name: "Pornstars", count: 1 }, { name: "POV", count: 1574 }, { name: "Ticket & Group Shows", count: 196 }, { name: "Video Games", count: 99, hot: true }, { name: "VTubers" }] },
      { title: "GENDER IDENTITY", items: [{ name: "Non-binary", count: 59 }] },
      { title: "ORIENTATION", items: [{ name: "Lesbian", count: 214 }] },
    ],
  },
  {
    name: "Countries & Languages",
    icon: "globe",
    groups: [
      { title: "NORTH AMERICA", items: [{ name: "🇺🇸 American", count: 136 }, { name: "🇨🇦 Canadian", count: 21 }, { name: "🇲🇽 Mexican", count: 8 }] },
      { title: "SOUTH AMERICA", items: [{ name: "🇦🇷 Argentinian", count: 30 }, { name: "🇧🇷 Brazilian", count: 61 }, { name: "🇨🇱 Chilean", count: 4 }, { name: "🇨🇴 Colombian", count: 3178 }, { name: "🇪🇨 Ecuadorian", count: 5 }, { name: "🇵🇪 Peruvian", count: 3 }, { name: "🇺🇾 Uruguayan" }, { name: "🇻🇪 Venezuelan", count: 164 }] },
      { title: "EUROPE", items: [{ name: "🇦🇹 Austrian", count: 10 }, { name: "🇧🇪 Belgian", count: 4 }, { name: "🇧🇬 Bulgarian", count: 1 }, { name: "🇭🇷 Croatian" }, { name: "🇨🇿 Czech", count: 3 }, { name: "🇩🇰 Danish" }, { name: "🇳🇱 Dutch", count: 9 }, { name: "🇪🇪 Estonian" }, { name: "🇫🇮 Finnish" }, { name: "🇫🇷 French", count: 37 }, { name: "🇬🇪 Georgian" }, { name: "🇩🇪 German", count: 71 }, { name: "🇬🇷 Greek", count: 3 }, { name: "🇭🇺 Hungarian", count: 25 }, { name: "🇮🇪 Irish", count: 1 }, { name: "🇮🇹 Italian", count: 30 }, { name: "🇱🇻 Latvian", count: 2 }, { name: "🇱🇹 Lithuanian", count: 1 }, { name: "🇳🇴 Nordic", count: 9 }, { name: "🇳🇴 Norwegian" }, { name: "🇵🇱 Polish", count: 15 }, { name: "🇵🇹 Portuguese", count: 1 }, { name: "🇷🇴 Romanian", count: 153 }, { name: "🇷🇸 Serbian", count: 6 }, { name: "🇸🇰 Slovakian", count: 2 }, { name: "🇸🇮 Slovenian" }, { name: "🇪🇸 Spanish", count: 21 }, { name: "🇸🇪 Swedish", count: 9 }, { name: "🇨🇭 Swiss", count: 2 }, { name: "🇬🇧 UK Models", count: 50 }, { name: "🇺🇦 Ukrainian", count: 157 }] },
      { title: "ASIA & PACIFIC", items: [{ name: "🇦🇺 Australian", count: 2 }, { name: "🇨🇳 Chinese", count: 107 }, { name: "🇵🇭 Filipino", count: 54 }, { name: "🇮🇳 Indian", count: 563 }, { name: "🇯🇵 Japanese", count: 26 }, { name: "🇰🇷 Korean", count: 1 }, { name: "🇲🇾 Malaysian", count: 1 }, { name: "🇱🇰 Sri Lankan", count: 13 }, { name: "🇹🇭 Thai", count: 7 }, { name: "🇻🇳 Vietnamese", count: 124 }] },
      { title: "AFRICA", items: [{ name: "African", count: 361 }, { name: "Kenyan", count: 72 }, { name: "Malagasy", count: 3 }, { name: "Nigerian" }, { name: "South African", count: 246 }, { name: "Ugandan", count: 2 }, { name: "Zimbabwean", count: 22 }] },
      { title: "MIDDLE EAST", items: [{ name: "Arab", count: 152 }, { name: "Israeli", count: 2 }, { name: "Turkish", count: 26 }] },
      { title: "LANGUAGES", items: [{ name: "Portuguese Speaking", count: 62 }, { name: "Russian Speaking", count: 518 }, { name: "Spanish Speaking", count: 3414 }] },
    ],
  },
  {
    name: "Fetishes & Kinks",
    icon: "heart",
    groups: [
      { title: "", items: [{ name: "BDSM", count: 101 }, { name: "Cock Rating", count: 3148 }, { name: "Corset", count: 988 }, { name: "Cuckold", count: 944 }, { name: "Foot Fetish", count: 4955, hot: true }, { name: "Heels", count: 4298 }] },
      { title: "", items: [{ name: "Jeans", count: 425 }, { name: "Latex", count: 1032 }, { name: "Leather", count: 1275 }, { name: "Mistress", count: 1532 }, { name: "Nylon", count: 1819 }, { name: "Piercing", count: 615 }] },
      { title: "", items: [{ name: "Pregnant", count: 35 }, { name: "Smoking", count: 2422 }, { name: "Sport Gear", count: 519 }, { name: "Tattoos", count: 994 }] },
    ],
  },
];

// --- COMPONENTS ---

const SectionIcon = ({ icon }: { icon: string }) => {
  const cls = "w-6 h-6 text-muted-foreground";
  switch (icon) {
    case "eye": return <Eye className={cls} />;
    case "flame": return <Flame className={cls} />;
    case "grid": return <Grid3X3 className={cls} />;
    case "globe": return <Globe className={cls} />;
    case "heart": return <Heart className={cls} />;
    default: return null;
  }
};

const Index = () => {
  const [search, setSearch] = useState("");
  const [activeAlpha, setActiveAlpha] = useState("Main");

  const filteredSections = useMemo(() => {
    if (!search.trim()) return sections;
    const q = search.toLowerCase();
    return sections
      .map((s) => ({
        ...s,
        groups: s.groups
          .map((g) => ({
            ...g,
            items: g.items.filter((i) => i.name.toLowerCase().includes(q)),
          }))
          .filter((g) => g.items.length > 0),
      }))
      .filter((s) => s.groups.length > 0);
  }, [search]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center gap-4 flex-wrap">
          <h1 className="text-xl font-bold">All Categories - Cam Girls on Live Sex Chat</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Find categories"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[hsl(0,0%,15%)] border border-border rounded-full pl-9 pr-4 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring w-48"
            />
          </div>
        </div>

        {/* Alphabet nav */}
        <div className="flex gap-3 mt-3 flex-wrap text-sm">
          {alphabetLinks.map((letter) => (
            <button
              key={letter}
              onClick={() => setActiveAlpha(letter)}
              className={`hover:text-[hsl(0,70%,55%)] transition-colors ${
                activeAlpha === letter ? "text-[hsl(0,70%,55%)] border-b-2 border-[hsl(0,70%,55%)]" : "text-muted-foreground"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="px-6 py-6 space-y-10 max-w-[1400px]">
        {filteredSections.map((section) => (
          <div key={section.name}>
            <div className="flex items-center gap-2 mb-4">
              <SectionIcon icon={section.icon} />
              <h2 className="text-2xl font-bold">{section.name}</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-0">
              {section.groups.map((group, gi) => (
                <div key={gi} className="mb-4">
                  {group.title && (
                    <div className="text-xs font-bold tracking-wider text-muted-foreground bg-[hsl(0,0%,15%)] px-2 py-1 rounded mb-2 uppercase">
                      {group.title}
                    </div>
                  )}
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href="#" className="hover:underline text-foreground">
                          {item.name}
                          {item.hot && <span className="text-[hsl(340,80%,60%)] ml-1 text-xs">✦</span>}
                        </a>
                        {item.count !== undefined && (
                          <span className="text-muted-foreground ml-1">{item.count}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-[1400px]">
          <div>
            <h3 className="font-bold text-lg mb-3">STRIPCHAT</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The world's premier 18+ LIVE adult entertainment destination. Watch, chat, and explore your desires with real people streaming live every day.
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              All models appearing on this site have contractually confirmed that they are 18 years of age or older.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-wider text-muted-foreground mb-3">STRIPCHAT</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">About Stripchat</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Reddit</a></li>
              <li><a href="#" className="hover:underline">Media Inquiries</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-wider text-muted-foreground mb-3">LEGAL & SAFETY</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Use</a></li>
              <li><a href="#" className="hover:underline">DMCA Policy</a></li>
              <li><a href="#" className="hover:underline">Cookies Policy</a></li>
              <li><a href="#" className="hover:underline">Parental Control Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-wider text-muted-foreground mb-3">HELP & SUPPORT</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Support & FAQ</a></li>
              <li><a href="#" className="hover:underline">Billing Support</a></li>
              <li><a href="#" className="hover:underline">DMCA Protection</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-border text-xs text-muted-foreground text-center">
          18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement
        </div>
      </footer>
    </div>
  );
};

export default Index;
