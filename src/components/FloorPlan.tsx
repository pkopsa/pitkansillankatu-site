export default function FloorPlan() {
  const extW = "#94a3b8";
  const intW = "#64748b";
  const EW = 3;
  const IW = 2;
  const roomFill = "#1e3349";
  const wetFill  = "#162a3a";
  const corrFill = "#152535";
  const cabFill  = "#182d42";
  const door = "#f59e0b";
  const win  = "#7dd3fc";
  const txt  = "#e2e8f0";
  const sub  = "#64748b";
  const dim  = "#475569";

  // Scale: 30px = 1m
  // North wall (Pitkänsillankatu) = y=58 (top)
  // Entrance west wall = x=75
  //
  // Layout west→east along north:
  //   Eteinen above (no room):  x=75  → x=165  (3m)
  //   Kitchen:                  x=165 → x=240  (2.5m), y=58→188
  //   Living room:              x=240 → x=390  (5.0m), y=58→188
  //   Bedroom:                  x=390 → x=480  (3.0m), y=58→188
  //
  // Corridor:  x=75→390, y=188→248  (1h=2m)
  //   Cabinets on south (right when entering): y=238→248
  //   Kitchen door:     x=175→207, y=188 (north wall)
  //   Living room door: x=355→385, y=188 (near east end of living, north wall)
  //
  // WC (small square, south of corridor, door aligned with living room door):
  //   x=340→390, y=248→308  (1.7m × 2m)
  //   Door: x=355→385, y=248 (south wall of corridor, aligned with LR door)
  //
  // Bathroom (south of corridor, west of WC, behind living room south wall):
  //   x=240→340, y=248→328  (3.3m × 2.7m)
  //   Door: x=260→290, y=248 (south wall of corridor)

  const // x coords
    xW   = 75,   // west wall
    xKit = 165,  // kitchen west wall (3m from entrance)
    xLiv = 240,  // living west wall
    xBed = 390,  // bedroom west wall = corridor east end
    xE   = 480,  // east exterior wall

    // y coords
    yN   = 58,   // north exterior wall (Pitkänsillankatu)
    yCS  = 188,  // corridor north wall (rooms south wall)
    yCE  = 248,  // corridor south wall (wet rooms top)
    yWCb = 308,  // WC south wall
    yBth = 328,  // bathroom south wall

    // Entrance door on SOUTH wall of corridor, near west end
    entL = 78,
    entR = 110,

    // Kitchen door gap (corridor north wall y=188)
    kdL = 175,
    kdR = 207,

    // Living room door gap — left/west edge of living room
    ldL = 245,
    ldR = 277,

    // Bedroom↔Living internal door
    bdT = 110,
    bdB = 142,

    // WC west (=xLiv=240), east boundary
    xWCe = 295,   // WC east = bathroom west

    // WC door aligned with living room door
    wdL = 245,
    wdR = 277,

    // Bathroom door (east of WC)
    bthL = 310,
    bthR = 340;

  return (
    <svg
      viewBox="0 0 560 470"
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-label="Pohjapiirros – Pitkänsillankatu 33 A 13, 69 m²"
    >
      {/* BG */}
      <rect width="560" height="470" fill="#0f172a" rx="16"/>

      {/* Header */}
      <text x="280" y="24" textAnchor="middle" fill="#f59e0b" fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="1.5">
        POHJAPIIRROS — PITKÄNSILLANKATU 33 A 13
      </text>
      <text x="280" y="38" textAnchor="middle" fill={sub} fontSize="9" fontFamily="system-ui,sans-serif">
        69 m²  ·  Suuntaa-antava arvio  ·  Mitoitus tarkistetaan esittelyssä
      </text>
      <text x="280" y="52" textAnchor="middle" fill={win} fontSize="8.5" fontFamily="system-ui,sans-serif" fontWeight="600" letterSpacing="1">
        ↑  PITKÄNSILLANKATU  (ikkunat kadullepäin)  ↑
      </text>

      {/* ── ROOM FILLS ── */}
      <rect x={xKit} y={yN}  width={xLiv-xKit}  height={yCS-yN}  fill={roomFill}/>
      <rect x={xLiv} y={yN}  width={xBed-xLiv}  height={yCS-yN}  fill={roomFill}/>
      <rect x={xBed} y={yN}  width={xE-xBed}    height={yCS-yN}  fill={roomFill}/>
      <rect x={xW}   y={yCS} width={xBed-xW}    height={yCE-yCS} fill={corrFill}/>
      <rect x={xW}   y={yCE-12} width={xBed-xW} height={12}      fill={cabFill}/>
      {/* WC — west (smaller, closer to entrance) */}
      <rect x={xLiv} y={yCE} width={xWCe-xLiv}  height={yWCb-yCE} fill={wetFill}/>
      {/* Bathroom — east (larger) */}
      <rect x={xWCe} y={yCE} width={xBed-xWCe}  height={yBth-yCE} fill={wetFill}/>

      {/* ── EXTERIOR WALLS ── */}
      {/* North solid (rooms) */}
      <line x1={xKit} y1={yN} x2={xE}   y2={yN}  stroke={extW} strokeWidth={EW}/>
      {/* North dashed (eteinen, no room) */}
      <line x1={xW}   y1={yN} x2={xKit} y2={yN}  stroke={extW} strokeWidth={EW} strokeDasharray="6,3" opacity="0.4"/>
      {/* West wall — full, no door here anymore */}
      <line x1={xW}   y1={yN}  x2={xW}  y2={yCE} stroke={extW} strokeWidth={EW}/>
      {/* East wall (rooms) */}
      <line x1={xE}   y1={yN}  x2={xE}  y2={yCS} stroke={extW} strokeWidth={EW}/>
      {/* South of corridor west of WC — entrance door gap entL→entR */}
      <line x1={xW}   y1={yCE} x2={entL} y2={yCE} stroke={extW} strokeWidth={EW}/>
      <line x1={entR} y1={yCE} x2={xLiv} y2={yCE} stroke={extW} strokeWidth={EW}/>
      {/* WC south */}
      <line x1={xLiv} y1={yWCb} x2={xWCe} y2={yWCb} stroke={extW} strokeWidth={EW}/>
      {/* Bathroom south */}
      <line x1={xWCe} y1={yBth} x2={xBed} y2={yBth} stroke={extW} strokeWidth={EW}/>
      {/* West of WC (=xLiv) */}
      <line x1={xLiv} y1={yCE} x2={xLiv} y2={yWCb} stroke={extW} strokeWidth={EW}/>
      {/* East of bathroom (=xBed) */}
      <line x1={xBed} y1={yCE} x2={xBed} y2={yBth} stroke={extW} strokeWidth={EW}/>

      {/* ── INTERIOR WALLS ── */}
      {/* Kitchen / Living */}
      <line x1={xLiv} y1={yN}  x2={xLiv} y2={yCS} stroke={intW} strokeWidth={IW}/>
      {/* Living / Bedroom — door gap bdT→bdB */}
      <line x1={xBed} y1={yN}  x2={xBed} y2={bdT} stroke={intW} strokeWidth={IW}/>
      <line x1={xBed} y1={bdB} x2={xBed} y2={yCS} stroke={intW} strokeWidth={IW}/>
      {/* Corridor north wall — kitchen door gap, living door gap */}
      <line x1={xW}   y1={yCS} x2={kdL}  y2={yCS} stroke={intW} strokeWidth={IW}/>
      <line x1={kdR}  y1={yCS} x2={xLiv} y2={yCS} stroke={intW} strokeWidth={IW}/>
      <line x1={xLiv} y1={yCS} x2={ldL}  y2={yCS} stroke={intW} strokeWidth={IW}/>
      <line x1={ldR}  y1={yCS} x2={xBed} y2={yCS} stroke={intW} strokeWidth={IW}/>
      {/* Bedroom south (no corridor) */}
      <line x1={xBed} y1={yCS} x2={xE}   y2={yCS} stroke={intW} strokeWidth={IW}/>
      {/* Corridor east wall */}
      <line x1={xBed} y1={yCS} x2={xBed} y2={yCE} stroke={intW} strokeWidth={IW}/>
      {/* WC / Bathroom divider */}
      <line x1={xWCe} y1={yCE} x2={xWCe} y2={yBth} stroke={intW} strokeWidth={IW}/>
      {/* WC south (shorter) — already drawn as ext wall above */}
      {/* Corridor south wall: WC door gap wdL→wdR, bathroom door gap bthL→bthR */}
      <line x1={xLiv} y1={yCE} x2={wdL}  y2={yCE} stroke={intW} strokeWidth={IW}/>
      <line x1={wdR}  y1={yCE} x2={bthL} y2={yCE} stroke={intW} strokeWidth={IW}/>
      <line x1={bthR} y1={yCE} x2={xBed} y2={yCE} stroke={intW} strokeWidth={IW}/>

      {/* ── WINDOWS (north wall) ── */}
      <rect x={xKit+8}  y={yN-1} width={xLiv-xKit-16} height={6} fill={win} rx="1"/>
      <rect x={xLiv+10} y={yN-1} width={xBed-xLiv-20} height={6} fill={win} rx="1"/>
      <rect x={xBed+10} y={yN-1} width={xE-xBed-20}   height={6} fill={win} rx="1"/>

      {/* ── DOORS ── */}
      {/* Entrance door — south wall of corridor, near west end, opens inward (north) */}
      <line x1={entL} y1={yCE} x2={entL} y2={yCE-30} stroke={door} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${entR} ${yCE} A 32 32 0 0 0 ${entL} ${yCE-30}`} fill="none" stroke={door} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>
      <text x={(entL+entR)/2} y={yCE+14} textAnchor="middle" fill={door} fontSize="7" fontFamily="system-ui,sans-serif" fontWeight="700">ULKO-OVI</text>
      <text x={(entL+entR)/2} y={yCE+24} textAnchor="middle" fill={door} fontSize="7" fontFamily="system-ui,sans-serif">↑</text>

      {/* Kitchen door (hinge kdR, swings north into kitchen) */}
      <line x1={kdR} y1={yCS} x2={kdR} y2={yCS-32} stroke={door} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${kdL} ${yCS} A 32 32 0 0 1 ${kdR} ${yCS-32}`} fill="none" stroke={door} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* Living room door (hinge ldL, swings north into living) */}
      <line x1={ldL} y1={yCS} x2={ldL} y2={yCS-32} stroke={door} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${ldR} ${yCS} A 32 32 0 0 0 ${ldL} ${yCS-32}`} fill="none" stroke={door} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* Bedroom door from living (hinge bdB, swings east into bedroom) */}
      <line x1={xBed} y1={bdB} x2={xBed-32} y2={bdB} stroke={door} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${xBed} ${bdT} A 32 32 0 0 0 ${xBed-32} ${bdB}`} fill="none" stroke={door} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* WC door (hinge wdR, swings south into WC) — aligned with LR door */}
      <line x1={wdR} y1={yCE} x2={wdR} y2={yCE+30} stroke={door} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${wdL} ${yCE} A 30 30 0 0 1 ${wdR} ${yCE+30}`} fill="none" stroke={door} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* Bathroom door (hinge bthR, swings south into bathroom) */}
      <line x1={bthR} y1={yCE} x2={bthR} y2={yCE+30} stroke={door} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${bthL} ${yCE} A 30 30 0 0 1 ${bthR} ${yCE+30}`} fill="none" stroke={door} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* ── CABINET + ELECTRICAL BOX ── */}
      <rect x={xW+2} y={yCE-12} width={xBed-xW-4} height={10} fill="#1a3050" stroke="#2d4a6a" strokeWidth="1" rx="1"/>
      <text x={(xW+xBed)/2} y={yCE-5} textAnchor="middle" fill="#3d6a9a" fontSize="7" fontFamily="system-ui,sans-serif">kaapistot</text>
      <rect x={xW+4} y={yCS+4} width={14} height={10} fill="#1a2f45" stroke="#2d4a6a" strokeWidth="1" rx="1"/>
      <text x={xW+11} y={yCS+12} textAnchor="middle" fill="#3d6a9a" fontSize="5.5">⚡</text>

      {/* ── WALKING ROUTE ARROW ── */}
      <text x={xW+22} y={(yCS+yCE)/2+4} fill="#334155" fontSize="8.5" fontFamily="system-ui,sans-serif" letterSpacing="1">
        → → → → → → → → → → → →
      </text>

      {/* ── ROOM LABELS ── */}
      <text x={(xKit+xLiv)/2} y={yN+60} textAnchor="middle" fill={txt} fontSize="10" fontFamily="system-ui,sans-serif" fontWeight="600">KEITTIÖ</text>
      <text x={(xKit+xLiv)/2} y={yN+74} textAnchor="middle" fill={sub} fontSize="9"  fontFamily="system-ui,sans-serif">~11 m²</text>
      <text x={(xKit+xLiv)/2} y={yN+86} textAnchor="middle" fill={dim} fontSize="8"  fontFamily="system-ui,sans-serif">2,5 × 4,3 m</text>

      <text x={(xLiv+xBed)/2} y={yN+60} textAnchor="middle" fill={txt} fontSize="10" fontFamily="system-ui,sans-serif" fontWeight="600">OLOHUONE</text>
      <text x={(xLiv+xBed)/2} y={yN+74} textAnchor="middle" fill={sub} fontSize="9"  fontFamily="system-ui,sans-serif">~21 m²</text>
      <text x={(xLiv+xBed)/2} y={yN+86} textAnchor="middle" fill={dim} fontSize="8"  fontFamily="system-ui,sans-serif">5,0 × 4,3 m</text>

      <text x={(xBed+xE)/2} y={yN+55} textAnchor="middle" fill={txt} fontSize="10" fontFamily="system-ui,sans-serif" fontWeight="600">MAKUU-</text>
      <text x={(xBed+xE)/2} y={yN+68} textAnchor="middle" fill={txt} fontSize="10" fontFamily="system-ui,sans-serif" fontWeight="600">HUONE</text>
      <text x={(xBed+xE)/2} y={yN+83} textAnchor="middle" fill={sub} fontSize="9"  fontFamily="system-ui,sans-serif">~13 m²</text>
      <text x={(xBed+xE)/2} y={yN+95} textAnchor="middle" fill={dim} fontSize="8"  fontFamily="system-ui,sans-serif">3,0 × 4,3 m</text>

      <text x={(xW+xKit)/2} y={(yCS+yCE)/2+4} textAnchor="middle" fill="#334155" fontSize="8" fontFamily="system-ui,sans-serif" fontWeight="600">ETEINEN</text>
      <text x={(xKit+xLiv)/2+20} y={(yCS+yCE)/2+4} textAnchor="middle" fill="#1e3a52" fontSize="8.5" fontFamily="system-ui,sans-serif" fontWeight="600">KÄYTÄVÄ</text>

      {/* WC west (smaller) */}
      <text x={(xLiv+xWCe)/2} y={yCE+30} textAnchor="middle" fill={txt} fontSize="9" fontFamily="system-ui,sans-serif" fontWeight="600">WC</text>
      <text x={(xLiv+xWCe)/2} y={yCE+44} textAnchor="middle" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif">~3 m²</text>

      {/* Bathroom east (larger) */}
      <text x={(xWCe+xBed)/2} y={yCE+38} textAnchor="middle" fill={txt} fontSize="9" fontFamily="system-ui,sans-serif" fontWeight="600">KYLPY-</text>
      <text x={(xWCe+xBed)/2} y={yCE+51} textAnchor="middle" fill={txt} fontSize="9" fontFamily="system-ui,sans-serif" fontWeight="600">HUONE</text>
      <text x={(xWCe+xBed)/2} y={yCE+64} textAnchor="middle" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif">~8 m²</text>

      {/* Alignment dashed line: LR door ↔ WC door */}
      <line x1={(wdL+wdR)/2} y1={yCS+2} x2={(wdL+wdR)/2} y2={yCE-14} stroke={door} strokeWidth="0.8" strokeDasharray="2,2" opacity="0.35"/>

      {/* ── DIMENSION LINES (bottom) ── */}
      <line x1={xW}   y1={420} x2={xKit} y2={420} stroke={dim} strokeWidth="1"/>
      <line x1={xKit} y1={420} x2={xLiv} y2={420} stroke={dim} strokeWidth="1"/>
      <line x1={xLiv} y1={420} x2={xBed} y2={420} stroke={dim} strokeWidth="1"/>
      <line x1={xBed} y1={420} x2={xE}   y2={420} stroke={dim} strokeWidth="1"/>
      {[xW,xKit,xLiv,xBed,xE].map(x=>(
        <line key={x} x1={x} y1="416" x2={x} y2="424" stroke={dim} strokeWidth="1"/>
      ))}
      <text x={(xW+xKit)/2}   y={435} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif">3,0 m</text>
      <text x={(xKit+xLiv)/2} y={435} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif">2,5 m</text>
      <text x={(xLiv+xBed)/2} y={435} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif">5,0 m</text>
      <text x={(xBed+xE)/2}   y={435} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif">3,0 m</text>
      <text x={(xW+xE)/2}     y={452} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif">← yhteensä ~13,5 m →</text>

      {/* ── LEFT HEIGHT DIMS ── */}
      <line x1="58" y1={yN}  x2="58" y2={yCS} stroke={dim} strokeWidth="1"/>
      <line x1="58" y1={yCS} x2="58" y2={yCE} stroke={dim} strokeWidth="1"/>
      {[yN,yCS,yCE].map(y=>(
        <line key={y} x1="54" y1={y} x2="62" y2={y} stroke={dim} strokeWidth="1"/>
      ))}
      <text x="46" y={(yN+yCS)/2} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif" transform={`rotate(-90,46,${(yN+yCS)/2})`}>4,3 m</text>
      <text x="46" y={(yCS+yCE)/2} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif" transform={`rotate(-90,46,${(yCS+yCE)/2})`}>2,0 m</text>

      {/* ── LEGEND ── */}
      <rect x="82" y="340" width="210" height="68" fill="#0a1628" stroke="#1e293b" strokeWidth="1" rx="6" opacity="0.95"/>
      <text x="187" y="354" textAnchor="middle" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif" fontWeight="700">SELITE</text>
      <line x1="90" y1="365" x2="118" y2="365" stroke={win} strokeWidth="4"/>
      <text x="124" y="368" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif">Ikkuna (Pitkänsillankatu)</text>
      <line x1="90" y1="380" x2="118" y2="380" stroke={door} strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="124" y="383" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif">Oven kaarisuunta</text>
      <line x1="90" y1="396" x2="118" y2="396" stroke={extW} strokeWidth="2.5"/>
      <text x="124" y="399" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif">Ulkoseinä</text>

      {/* North arrow */}
      <text x="510" y="370" textAnchor="middle" fill={sub} fontSize="22">↑</text>
      <text x="510" y="387" textAnchor="middle" fill={sub} fontSize="9" fontFamily="system-ui,sans-serif" fontWeight="700">P</text>
      <text x="510" y="398" textAnchor="middle" fill={dim} fontSize="7" fontFamily="system-ui,sans-serif">(arvio)</text>
    </svg>
  );
}
