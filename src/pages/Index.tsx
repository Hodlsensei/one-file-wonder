import { useState, useMemo } from "react";
import { Search } from "lucide-react";

const alphabetLinks = ["Main", "#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

interface CatItem {
  name: string;
  count?: number;
  hot?: boolean;
}
interface CatGroup {
  title: string;
  items: CatItem[];
}
interface Section {
  name: string;
  emoji: string;
  groups: CatGroup[];
}

const sections: Section[] = [
  {
    name: "Appearance", emoji: "👁",
    groups: [
      { title: "AGE", items: [{ name: "Teen 18+", count: 1743 }, { name: "Young 22+", count: 4343 }, { name: "MILF", count: 1487 }, { name: "Mature", count: 290 }, { name: "Granny", count: 56 }] },
      { title: "ETHNICITY", items: [{ name: "Arab", count: 167 }, { name: "Asian", count: 879 }, { name: "Ebony", count: 622 }, { name: "Indian", count: 449 }, { name: "Latina", count: 3632 }, { name: "Mixed", count: 258 }, { name: "White", count: 2469 }] },
      { title: "BODY TYPE", items: [{ name: "Skinny", count: 3041 }, { name: "Athletic", count: 738 }, { name: "Medium", count: 2597 }, { name: "Curvy", count: 1669 }, { name: "BBW", count: 399 }] },
      { title: "HAIR", items: [{ name: "Blonde", count: 1255 }, { name: "Black", count: 2478 }, { name: "Brunette", count: 3859 }, { name: "Redhead", count: 404 }, { name: "Colorful", count: 385 }] },
      { title: "BODY TRAITS", items: [{ name: "Bald", count: 15 }, { name: "Big Ass", count: 4974 }, { name: "Big Clit", count: 1807 }, { name: "Big Nipples", count: 2407 }, { name: "Big Tits", count: 3472 }, { name: "Hairy armpits", count: 509 }, { name: "Hairy Pussy", count: 1257 }, { name: "Shaven", count: 4637 }, { name: "Small Tits", count: 2780 }, { name: "Trimmed", count: 2099 }] },
    ],
  },
  {
    name: "Activities on Request", emoji: "🎭",
    groups: [
      { title: "PRIVATE SHOW", items: [{ name: "8-12 tk", count: 3984 }, { name: "16-24 tk", count: 2285 }, { name: "32-60 tk", count: 1650 }, { name: "90+ tk", count: 391 }, { name: "Video Call (Cam2Cam)", count: 7851 }, { name: "Recordable Privates", count: 5940 }, { name: "Spy on Shows", count: 382 }] },
      { title: "ACTIVITIES", items: [{ name: "69 Position", count: 1211 }, { name: "Ahegao", count: 5146 }, { name: "Anal", count: 3058, hot: true }, { name: "Anal Toys", count: 2606 }, { name: "Ass to Mouth", count: 1310 }, { name: "Blowjob", count: 5988, hot: true }, { name: "Bukkake", count: 208 }, { name: "Camel Toe", count: 4680 }, { name: "Cock Rating", count: 3455 }, { name: "Cosplay", count: 1322, hot: true }, { name: "Cowgirl", count: 4579 }, { name: "Creampie", count: 2129 }, { name: "Cumshot", count: 1432 }, { name: "Deepthroat", count: 4935, hot: true }, { name: "Dildo or Vibrator", count: 6069 }, { name: "Dirty Talk", count: 5801 }, { name: "Doggy Style", count: 6830, hot: true }, { name: "Double Penetration", count: 1736 }, { name: "Erotic Dance", count: 6720 }, { name: "Facesitting", count: 1910 }, { name: "Facial", count: 1995 }, { name: "Fingering", count: 6843, hot: true }, { name: "Fisting", count: 906 }, { name: "Flashing", count: 3438 }, { name: "Footjob", count: 2448 }, { name: "Foursome", count: 24 }, { name: "Fuck Machine", count: 896, hot: true }, { name: "Gagging", count: 2128 }, { name: "Gangbang", count: 44 }, { name: "Gape", count: 706 }, { name: "Glory Hole", count: 188 }, { name: "Handjob", count: 3619 }, { name: "Hardcore", count: 263 }, { name: "Humiliation", count: 3673 }, { name: "Jerk-off Instruction", count: 3386 }, { name: "Massage", count: 2105 }, { name: "Masturbation", count: 6674 }, { name: "Nipple Toys", count: 2649 }, { name: "Oil Show", count: 5955 }, { name: "Orgasm", count: 5305 }, { name: "Pegging", count: 386 }, { name: "Pussy Licking", count: 742 }, { name: "Role Play", count: 4180 }, { name: "Sex Toys", count: 5599 }, { name: "Sexting", count: 5801 }, { name: "Shower", count: 1962 }, { name: "Spanking", count: 6623 }, { name: "Squirt", count: 3743 }, { name: "Strapon", count: 642 }, { name: "Striptease", count: 6317 }, { name: "Swing", count: 225 }, { name: "Threesome", count: 46 }, { name: "Tittyfuck", count: 4796 }, { name: "Topless", count: 5697 }, { name: "Twerk", count: 5255 }, { name: "Upskirt", count: 2829 }, { name: "Yoga", count: 1801 }] },
      { title: "DEVICE", items: [{ name: "Anal Toys", count: 2606 }, { name: "Dildo or Vibrator", count: 6069 }, { name: "Fuck Machine", count: 896, hot: true }, { name: "Interactive Toy", count: 4834 }, { name: "Kiiroo", count: 2 }, { name: "Lovense", count: 4834 }, { name: "Nipple Toys", count: 2649 }, { name: "Sex Toys", count: 5599 }, { name: "Strapon", count: 642 }] },
    ],
  },
  {
    name: "Specifics", emoji: "⊞",
    groups: [
      { title: "SUBCULTURES", items: [{ name: "Anime Girls", count: 511 }, { name: "Club Girls", count: 329 }, { name: "E-girl", count: 284 }, { name: "Emo", count: 265 }, { name: "Gamers", count: 329 }, { name: "Glamour", count: 1176 }, { name: "Goth", count: 422 }, { name: "Gym Babe", count: 748 }, { name: "Housewives", count: 1020 }, { name: "K-pop", count: 193 }, { name: "Nerds", count: 185 }, { name: "Punks", count: 95 }, { name: "Queers", count: 63 }, { name: "Romantic", count: 1268 }, { name: "Student", count: 2804 }, { name: "Tomboys", count: 149 }] },
      { title: "BROADCAST", items: [{ name: "HD", count: 7622 }, { name: "📱 Mobile", count: 1561 }, { name: "🎥 Recordable", count: 6351 }, { name: "🥽 VR Cams", count: 223 }] },
      { title: "SHOW TYPE", items: [{ name: "ASMR", count: 189 }, { name: "Cooking", count: 1112 }, { name: "🎭 Flirting", count: 28 }, { name: "Group Sex", count: 108 }, { name: "Interracial", count: 9 }, { name: "⚡ New Models", count: 1424 }, { name: "Office", count: 1233 }, { name: "Old & Young 22+", count: 39 }, { name: "Outdoor", count: 1207 }, { name: "Pornstars", count: 1 }, { name: "POV", count: 1574 }, { name: "🎟 Ticket & Group Shows", count: 196 }, { name: "Video Games", count: 99, hot: true }, { name: "VTubers" }] },
      { title: "GENDER IDENTITY", items: [{ name: "Non-binary", count: 59 }] },
      { title: "ORIENTATION", items: [{ name: "Lesbian", count: 214 }] },
    ],
  },
  {
    name: "Countries & Languages", emoji: "🌐",
    groups: [
      { title: "NORTH AMERICA", items: [{ name: "🇺🇸 American", count: 136 }, { name: "🇨🇦 Canadian", count: 21 }, { name: "🇲🇽 Mexican", count: 8 }] },
      { title: "SOUTH AMERICA", items: [{ name: "🇦🇷 Argentinian", count: 30 }, { name: "🇧🇷 Brazilian", count: 61 }, { name: "🇨🇱 Chilean", count: 4 }, { name: "🇨🇴 Colombian", count: 3178 }, { name: "🇪🇨 Ecuadorian", count: 5 }, { name: "🇵🇪 Peruvian", count: 3 }, { name: "🇺🇾 Uruguayan" }, { name: "🇻🇪 Venezuelan", count: 164 }] },
      { title: "EUROPE", items: [{ name: "🇦🇹 Austrian", count: 10 }, { name: "🇧🇪 Belgian", count: 4 }, { name: "🇧🇬 Bulgarian", count: 1 }, { name: "🇭🇷 Croatian" }, { name: "🇨🇿 Czech", count: 3 }, { name: "🇩🇰 Danish" }, { name: "🇳🇱 Dutch", count: 9 }, { name: "🇪🇪 Estonian" }, { name: "🇫🇮 Finnish" }, { name: "🇫🇷 French", count: 37 }, { name: "🇬🇪 Georgian" }, { name: "🇩🇪 German", count: 71 }, { name: "🇬🇷 Greek", count: 3 }, { name: "🇭🇺 Hungarian", count: 25 }, { name: "🇮🇪 Irish", count: 1 }, { name: "🇮🇹 Italian", count: 30 }, { name: "🇱🇻 Latvian", count: 2 }, { name: "🇱🇹 Lithuanian", count: 1 }, { name: "🇳🇴 Nordic", count: 9 }, { name: "🇳🇴 Norwegian" }, { name: "🇵🇱 Polish", count: 15 }, { name: "🇵🇹 Portuguese", count: 1 }, { name: "🇷🇴 Romanian", count: 153 }, { name: "🇷🇸 Serbian", count: 6 }, { name: "🇸🇰 Slovakian", count: 2 }, { name: "🇸🇮 Slovenian" }, { name: "🇪🇸 Spanish", count: 21 }, { name: "🇸🇪 Swedish", count: 9 }, { name: "🇨🇭 Swiss", count: 2 }, { name: "🇬🇧 UK Models", count: 50 }, { name: "🇺🇦 Ukrainian", count: 157 }] },
      { title: "ASIA & PACIFIC", items: [{ name: "🇦🇺 Australian", count: 2 }, { name: "🇨🇳 Chinese", count: 107 }, { name: "🇵🇭 Filipino", count: 54 }, { name: "🇮🇳 Indian", count: 563 }, { name: "🇯🇵 Japanese", count: 26 }, { name: "🇰🇷 Korean", count: 1 }, { name: "🇲🇾 Malaysian", count: 1 }, { name: "🇱🇰 Sri Lankan", count: 13 }, { name: "🇹🇭 Thai", count: 7 }, { name: "🇻🇳 Vietnamese", count: 124 }] },
      { title: "AFRICA", items: [{ name: "🌍 African", count: 361 }, { name: "🇰🇪 Kenyan", count: 72 }, { name: "🇲🇬 Malagasy", count: 3 }, { name: "🇳🇬 Nigerian" }, { name: "🇿🇦 South African", count: 246 }, { name: "🇺🇬 Ugandan", count: 2 }, { name: "🇿🇼 Zimbabwean", count: 22 }] },
      { title: "MIDDLE EAST", items: [{ name: "Arab", count: 152 }, { name: "🇮🇱 Israeli", count: 2 }, { name: "🇹🇷 Turkish", count: 26 }] },
      { title: "LANGUAGES", items: [{ name: "🇧🇷 Portuguese Speaking", count: 62 }, { name: "🇷🇺 Russian Speaking", count: 518 }, { name: "🇪🇸 Spanish Speaking", count: 3414 }] },
    ],
  },
  {
    name: "Fetishes & Kinks", emoji: "👠",
    groups: [
      { title: "", items: [{ name: "🔗 BDSM", count: 101 }, { name: "Cock Rating", count: 3148 }, { name: "Corset", count: 988 }, { name: "Cuckold", count: 944 }, { name: "Foot Fetish", count: 4955, hot: true }, { name: "Heels", count: 4298 }] },
      { title: "", items: [{ name: "Jeans", count: 425 }, { name: "Latex", count: 1032 }, { name: "Leather", count: 1275 }, { name: "Mistress", count: 1532 }, { name: "Nylon", count: 1819 }, { name: "Piercing", count: 615 }] },
      { title: "", items: [{ name: "Pregnant", count: 35 }, { name: "Smoking", count: 2422 }, { name: "Sport Gear", count: 519 }, { name: "Tattoos", count: 994 }] },
    ],
  },
];

// Split long activity lists into columns of ~15 items for multi-column display
function splitItems(items: CatItem[], cols: number): CatItem[][] {
  const perCol = Math.ceil(items.length / cols);
  const result: CatItem[][] = [];
  for (let i = 0; i < cols; i++) {
    result.push(items.slice(i * perCol, (i + 1) * perCol));
  }
  return result;
}

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
          .map((g) => ({ ...g, items: g.items.filter((i) => i.name.toLowerCase().includes(q)) }))
          .filter((g) => g.items.length > 0),
      }))
      .filter((s) => s.groups.length > 0);
  }, [search]);

  return (
    <div style={{ backgroundColor: "#0b0b0b", color: "#c8c8c8", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", minHeight: "100vh", fontSize: "13px" }}>
      {/* Header bar */}
      <div style={{ borderBottom: "1px solid #2a2a2a", padding: "16px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>All Categories - Cam Girls on Live Sex Chat</h1>
          <div style={{ position: "relative" }}>
            <Search style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "#666" }} />
            <input
              type="text"
              placeholder="Find categories"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 20, paddingLeft: 30, paddingRight: 14, paddingTop: 6, paddingBottom: 6, fontSize: 13, color: "#ccc", outline: "none", width: 180 }}
            />
          </div>
        </div>
        {/* Alphabet nav */}
        <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
          {alphabetLinks.map((l) => (
            <button
              key={l}
              onClick={() => setActiveAlpha(l)}
              style={{
                background: "none", border: "none", cursor: "pointer", fontSize: 13, padding: "2px 0",
                color: activeAlpha === l ? "#e04050" : "#888",
                borderBottom: activeAlpha === l ? "2px solid #e04050" : "2px solid transparent",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: "24px 24px 40px", maxWidth: 1400 }}>
        {filteredSections.map((section) => {
          // Activities section: merge all ACTIVITIES items into multi-column layout
          const isActivities = section.name === "Activities on Request";
          const isFetish = section.name === "Fetishes & Kinks";

          return (
            <div key={section.name} style={{ marginBottom: 48 }}>
              {/* Section header */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>{section.emoji}</span>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>{section.name}</h2>
              </div>

              {isActivities ? (
                <ActivitiesLayout groups={section.groups} />
              ) : isFetish ? (
                <FetishLayout groups={section.groups} />
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0 24px" }}>
                  {section.groups.map((g, gi) => (
                    <GroupColumn key={gi} group={g} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #222", padding: "40px 24px 0", background: "#111" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32, maxWidth: 1400 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>💬</span>
              <span style={{ fontWeight: 700, fontSize: 16, color: "#fff", letterSpacing: 2 }}>STRIPCHAT</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 13, border: "1px solid #555", borderRadius: 4, padding: "2px 8px", color: "#aaa" }}>🌐 English ▾</span>
            </div>
            <p style={{ fontSize: 11, color: "#777", lineHeight: 1.6, maxWidth: 400 }}>
              Stripchat is the world's premier 18+ LIVE adult entertainment destination for real connection and adult play. Watch, chat, and explore your desires with real people streaming live every day, and over 150,000 amateurs, professionals, and couples to choose from every month.
            </p>
            <p style={{ fontSize: 11, color: "#777", marginTop: 8 }}>
              All models appearing on this site have contractually confirmed to us that they are 18 years of age or older.
            </p>
            <div style={{ marginTop: 16, background: "#1a1a1a", borderRadius: 8, padding: 12, display: "flex", alignItems: "center", gap: 12, maxWidth: 320 }}>
              <div style={{ width: 60, height: 60, background: "#fff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#000", fontWeight: 700 }}>QR</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>Get Stripchat App</div>
                <div style={{ fontSize: 11, color: "#888" }}>For quick mobile access & notifications, scan the QR code with your phone camera</div>
              </div>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#888", marginBottom: 12, textTransform: "uppercase" }}>Stripchat</h4>
            <FooterLinks items={["About Stripchat", "Blog", "X", "Reddit", "Media Inquiries"]} />
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#888", marginBottom: 12, textTransform: "uppercase" }}>Legal & Safety</h4>
            <FooterLinks items={["Privacy Policy", "Terms of Use", "DMCA Policy", "Cookies Policy", "Parental Control Guide", "EU Research Program", "Anti-Slavery Help"]} />
            <div style={{ marginTop: 16 }}>
              <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#888", marginBottom: 12, textTransform: "uppercase" }}>Work With Us</h4>
              <FooterLinks items={["Affiliate Program"]} />
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#888", marginBottom: 12, textTransform: "uppercase" }}>Help & Support</h4>
            <FooterLinks items={["Support & FAQ", "Billing Support", "DMCA Protection"]} />
          </div>
        </div>

        {/* Questions button */}
        <div style={{ marginTop: 24 }}>
          <button style={{ background: "transparent", border: "1px solid #555", borderRadius: 20, padding: "8px 20px", color: "#ccc", fontSize: 13, cursor: "pointer" }}>
            I Have Questions Left
          </button>
        </div>

        {/* Bottom logos bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24, paddingTop: 16, borderTop: "1px solid #222", paddingBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontWeight: 900, fontSize: 18, color: "#888", letterSpacing: 1 }}>RTA</span>
            <span style={{ fontSize: 10, color: "#666", borderLeft: "1px solid #333", paddingLeft: 12 }}>SafeLabeling.org<br />COMPLIANT WEBSITE</span>
            <span style={{ fontWeight: 800, fontSize: 14, color: "#888", letterSpacing: 1 }}>ASACP</span>
            <span style={{ fontSize: 10, color: "#666" }}>APPROVED MEMBER</span>
          </div>
          <div style={{ fontSize: 11, color: "#555", textAlign: "center", flex: 1 }}>
            18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement
          </div>
          <div style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #555", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#888", fontWeight: 700 }}>18+</div>
        </div>

        {/* Bottom CTA banner */}
        <div style={{ background: "linear-gradient(90deg, #e04050, #ff6060)", margin: "0 -24px", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <span style={{ fontSize: 20 }}>💬</span>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>Join Stripchat to interact with models!</span>
          <button style={{ background: "transparent", border: "2px solid #fff", borderRadius: 20, padding: "6px 20px", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            Join FREE
          </button>
        </div>
      </footer>
    </div>
  );
};

/* Render a single column group with title bar */
function GroupColumn({ group }: { group: CatGroup }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {group.title && (
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#888", background: "#1a1a1a", padding: "4px 8px", borderRadius: 3, marginBottom: 6, textTransform: "uppercase", borderLeft: "3px solid #e04050" }}>
          {group.title}
        </div>
      )}
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {group.items.map((item) => (
          <li key={item.name} style={{ padding: "2px 0" }}>
            <a href="#" style={{ color: "#c8c8c8", textDecoration: "none" }}>
              {item.name}
              {item.hot && <span style={{ color: "#e04080", marginLeft: 4, fontSize: 10 }}>✦</span>}
            </a>
            {item.count !== undefined && <span style={{ color: "#555", marginLeft: 4 }}>{item.count}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Activities section: PRIVATE SHOW col | ACTIVITIES multi-col | DEVICE col */
function ActivitiesLayout({ groups }: { groups: CatGroup[] }) {
  const privateShow = groups.find((g) => g.title === "PRIVATE SHOW");
  const activities = groups.find((g) => g.title === "ACTIVITIES");
  const device = groups.find((g) => g.title === "DEVICE");

  const actCols = activities ? splitItems(activities.items, 4) : [];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 4fr 1fr", gap: "0 24px" }}>
      {privateShow && <GroupColumn group={privateShow} />}
      <div>
        {activities && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#888", background: "#1a1a1a", padding: "4px 8px", borderRadius: 3, marginBottom: 6, textTransform: "uppercase", borderLeft: "3px solid #e04050" }}>
              ACTIVITIES
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0 16px" }}>
              {actCols.map((col, ci) => (
                <ul key={ci} style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {col.map((item) => (
                    <li key={item.name} style={{ padding: "2px 0" }}>
                      <a href="#" style={{ color: "#c8c8c8", textDecoration: "none" }}>
                        {item.name}
                        {item.hot && <span style={{ color: "#e04080", marginLeft: 4, fontSize: 10 }}>✦</span>}
                      </a>
                      {item.count !== undefined && <span style={{ color: "#555", marginLeft: 4 }}>{item.count}</span>}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        )}
      </div>
      {device && <GroupColumn group={device} />}
    </div>
  );
}

/* Fetishes: 3 columns no headers */
function FetishLayout({ groups }: { groups: CatGroup[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0 24px" }}>
      {groups.map((g, gi) => (
        <ul key={gi} style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {g.items.map((item) => (
            <li key={item.name} style={{ padding: "2px 0" }}>
              <a href="#" style={{ color: "#c8c8c8", textDecoration: "none" }}>
                {item.name}
                {item.hot && <span style={{ color: "#e04080", marginLeft: 4, fontSize: 10 }}>✦</span>}
              </a>
              {item.count !== undefined && <span style={{ color: "#555", marginLeft: 4 }}>{item.count}</span>}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

function FooterLinks({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {items.map((item) => (
        <li key={item} style={{ padding: "3px 0" }}>
          <a href="#" style={{ color: "#aaa", textDecoration: "none", fontSize: 13 }}>{item}</a>
        </li>
      ))}
    </ul>
  );
}

export default Index;
