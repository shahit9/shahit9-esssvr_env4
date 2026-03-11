import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend
} from "recharts";

// ── EMBEDDED DATA ─────────────────────────────────────────────────────────────
const RAW = {"2418470":[{"i":0,"lbl":"09-Mar 00:xx","res":0.302,"cpu":1.0,"mem":0.3,"shr":76.43,"state":"S","time":"2:12.63"},{"i":1,"lbl":"09-Mar 00:xx","res":0.302,"cpu":1.0,"mem":0.3,"shr":76.43,"state":"S","time":"2:12.83"},{"i":2,"lbl":"09-Mar 00:xx","res":0.302,"cpu":1.0,"mem":0.3,"shr":76.43,"state":"S","time":"2:13.03"},{"i":3,"lbl":"09-Mar 00:xx","res":0.302,"cpu":1.0,"mem":0.3,"shr":76.43,"state":"S","time":"2:13.17"},{"i":4,"lbl":"09-Mar 00:xx","res":0.302,"cpu":1.0,"mem":0.3,"shr":76.43,"state":"S","time":"2:13.29"},{"i":5,"lbl":"09-Mar 00:xx","res":0.302,"cpu":1.0,"mem":0.3,"shr":76.43,"state":"S","time":"2:13.61"},{"i":6,"lbl":"09-Mar 00:xx","res":0.302,"cpu":1.0,"mem":0.3,"shr":76.43,"state":"S","time":"2:13.73"},{"i":7,"lbl":"09-Mar 00:xx","res":0.302,"cpu":1.0,"mem":0.3,"shr":76.43,"state":"S","time":"2:13.87"},{"i":8,"lbl":"09-Mar 00:xx","res":0.302,"cpu":1.0,"mem":0.3,"shr":76.43,"state":"S","time":"2:14.26"},{"i":9,"lbl":"09-Mar 00:xx","res":0.302,"cpu":1.0,"mem":0.3,"shr":76.43,"state":"S","time":"2:14.32"},{"i":10,"lbl":"09-Mar 00:xx","res":0.302,"cpu":1.0,"mem":0.3,"shr":76.43,"state":"S","time":"2:14.64"},{"i":11,"lbl":"09-Mar 00:xx","res":0.302,"cpu":1.0,"mem":0.3,"shr":76.43,"state":"S","time":"2:14.68"},{"i":12,"lbl":"09-Mar 01:xx","res":0.4888,"cpu":1.0,"mem":0.4,"shr":76.65,"state":"S","time":"2:22.21"},{"i":13,"lbl":"09-Mar 01:xx","res":0.5026,"cpu":14.6,"mem":0.4,"shr":76.91,"state":"S","time":"2:34.16"},{"i":14,"lbl":"09-Mar 01:xx","res":0.5026,"cpu":1.0,"mem":0.4,"shr":76.91,"state":"S","time":"2:34.35"},{"i":25,"lbl":"09-Mar 01:xx","res":0.5026,"cpu":1.0,"mem":0.4,"shr":76.91,"state":"S","time":"2:36.04"},{"i":26,"lbl":"09-Mar 02:xx","res":0.5026,"cpu":1.0,"mem":0.4,"shr":76.91,"state":"S","time":"2:36.62"},{"i":33,"lbl":"09-Mar 03:xx","res":0.4958,"cpu":1.0,"mem":0.4,"shr":76.64,"state":"S","time":"2:39.31"},{"i":45,"lbl":"09-Mar 04:xx","res":0.4958,"cpu":1.9,"mem":0.4,"shr":76.64,"state":"S","time":"2:42.40"},{"i":51,"lbl":"09-Mar 05:xx","res":0.4958,"cpu":1.0,"mem":0.4,"shr":76.64,"state":"S","time":"2:43.73"},{"i":58,"lbl":"09-Mar 06:xx","res":0.5056,"cpu":1.0,"mem":0.4,"shr":76.64,"state":"S","time":"2:46.81"},{"i":69,"lbl":"09-Mar 07:xx","res":0.5056,"cpu":1.0,"mem":0.4,"shr":76.64,"state":"S","time":"2:49.22"},{"i":78,"lbl":"09-Mar 08:xx","res":0.5051,"cpu":1.0,"mem":0.4,"shr":76.64,"state":"S","time":"2:52.87"},{"i":87,"lbl":"09-Mar 09:xx","res":0.5051,"cpu":1.0,"mem":0.4,"shr":76.64,"state":"S","time":"2:55.95"},{"i":99,"lbl":"09-Mar 10:xx","res":0.5046,"cpu":1.0,"mem":0.4,"shr":76.64,"state":"S","time":"2:59.85"},{"i":108,"lbl":"09-Mar 11:xx","res":0.5039,"cpu":2.0,"mem":0.4,"shr":76.64,"state":"S","time":"3:03.17"},{"i":122,"lbl":"09-Mar 12:xx","res":0.5034,"cpu":1.0,"mem":0.4,"shr":76.64,"state":"S","time":"3:07.50"},{"i":127,"lbl":"09-Mar 13:xx","res":0.5034,"cpu":1.0,"mem":0.4,"shr":76.64,"state":"S","time":"3:10.95"},{"i":137,"lbl":"09-Mar 14:xx","res":0.5034,"cpu":1.0,"mem":0.4,"shr":76.64,"state":"S","time":"3:14.47"},{"i":146,"lbl":"09-Mar 15:xx","res":0.5028,"cpu":1.0,"mem":0.4,"shr":76.52,"state":"S","time":"3:17.19"},{"i":149,"lbl":"09-Mar 15:xx ⚡TRIGGER","res":0.4352,"cpu":100.0,"mem":0.4,"shr":76.8,"state":"S","time":"3:24.41"},{"i":150,"lbl":"09-Mar 15:xx","res":0.6479,"cpu":99.0,"mem":0.6,"shr":76.86,"state":"S","time":"3:37.97"},{"i":151,"lbl":"09-Mar 15:xx","res":0.647,"cpu":99.0,"mem":0.6,"shr":76.86,"state":"S","time":"4:07.48"},{"i":152,"lbl":"09-Mar 15:xx","res":0.647,"cpu":100.0,"mem":0.6,"shr":76.86,"state":"S","time":"4:37.47"},{"i":153,"lbl":"09-Mar 15:xx","res":0.647,"cpu":100.0,"mem":0.6,"shr":76.86,"state":"S","time":"5:11.18"},{"i":154,"lbl":"09-Mar 15:xx","res":0.647,"cpu":99.0,"mem":0.6,"shr":76.86,"state":"S","time":"5:41.06"},{"i":155,"lbl":"09-Mar 15:xx","res":0.647,"cpu":100.0,"mem":0.6,"shr":76.86,"state":"S","time":"6:11.10"},{"i":156,"lbl":"09-Mar 15:xx","res":0.647,"cpu":99.0,"mem":0.6,"shr":76.86,"state":"S","time":"6:42.33"},{"i":157,"lbl":"09-Mar 15:xx ⚡2nd thread","res":0.6509,"cpu":199.0,"mem":0.6,"shr":76.86,"state":"S","time":"7:38.90"},{"i":158,"lbl":"09-Mar 15:xx","res":0.6509,"cpu":200.0,"mem":0.6,"shr":76.86,"state":"S","time":"8:38.82"},{"i":159,"lbl":"09-Mar 15:xx","res":0.6509,"cpu":194.2,"mem":0.6,"shr":76.86,"state":"S","time":"9:38.44"},{"i":160,"lbl":"09-Mar 15:xx","res":0.6509,"cpu":197.1,"mem":0.6,"shr":76.86,"state":"S","time":"10:38.56"},{"i":161,"lbl":"09-Mar 15:xx","res":0.6509,"cpu":199.0,"mem":0.6,"shr":76.86,"state":"S","time":"11:38.68"},{"i":162,"lbl":"09-Mar 15:xx 🔴7.2GB jump","res":7.2,"cpu":201.0,"mem":6.2,"shr":76.84,"state":"S","time":"12:38.68"},{"i":163,"lbl":"09-Mar 15:xx","res":7.5,"cpu":198.1,"mem":6.4,"shr":76.84,"state":"S","time":"13:38.55"},{"i":164,"lbl":"09-Mar 15:xx","res":7.7,"cpu":198.1,"mem":6.6,"shr":76.97,"state":"S","time":"14:38.48"},{"i":165,"lbl":"09-Mar 15:xx","res":7.9,"cpu":196.1,"mem":6.7,"shr":76.97,"state":"S","time":"15:38.33"},{"i":166,"lbl":"09-Mar 15:xx","res":8.0,"cpu":193.2,"mem":6.9,"shr":76.97,"state":"S","time":"16:38.21"},{"i":167,"lbl":"09-Mar 15:xx","res":15.0,"cpu":195.1,"mem":12.9,"shr":76.98,"state":"S","time":"17:37.72"},{"i":170,"lbl":"09-Mar 15:xx","res":16.3,"cpu":199.0,"mem":14.0,"shr":76.98,"state":"S","time":"21:36.33"},{"i":175,"lbl":"09-Mar 15:xx","res":17.8,"cpu":201.0,"mem":15.3,"shr":76.93,"state":"S","time":"26:34.98"},{"i":180,"lbl":"09-Mar 15:xx","res":19.4,"cpu":198.1,"mem":16.6,"shr":76.16,"state":"S","time":"31:33.33"},{"i":185,"lbl":"09-Mar 15:xx","res":21.0,"cpu":199.0,"mem":18.0,"shr":76.15,"state":"S","time":"36:32.56"},{"i":190,"lbl":"09-Mar 15:xx","res":22.6,"cpu":199.0,"mem":19.4,"shr":75.57,"state":"S","time":"41:30.89"},{"i":195,"lbl":"09-Mar 15:xx","res":23.3,"cpu":199.0,"mem":19.9,"shr":75.0,"state":"S","time":"46:28.55"},{"i":200,"lbl":"09-Mar 15:xx","res":23.3,"cpu":200.0,"mem":19.9,"shr":75.0,"state":"S","time":"51:28.55"},{"i":205,"lbl":"09-Mar 15:xx","res":23.3,"cpu":201.0,"mem":19.9,"shr":75.0,"state":"S","time":"56:27.72"},{"i":207,"lbl":"09-Mar 15:xx","res":23.3,"cpu":202.0,"mem":19.9,"shr":74.23,"state":"S","time":"58:27.54"},{"i":213,"lbl":"09-Mar 15:xx","res":23.7,"cpu":193.2,"mem":20.3,"shr":74.23,"state":"S","time":"64:26.97"},{"i":220,"lbl":"09-Mar 15:xx","res":25.9,"cpu":199.0,"mem":22.2,"shr":73.8,"state":"S","time":"71:22.43"},{"i":230,"lbl":"09-Mar 15:xx","res":27.4,"cpu":197.1,"mem":23.5,"shr":73.45,"state":"S","time":"81:19.48"},{"i":240,"lbl":"09-Mar 15:xx","res":29.0,"cpu":196.1,"mem":24.8,"shr":73.24,"state":"S","time":"91:02.86"},{"i":243,"lbl":"09-Mar 16:xx","res":29.7,"cpu":197.1,"mem":25.4,"shr":67.82,"state":"S","time":"94:00.59"},{"i":250,"lbl":"09-Mar 16:xx","res":30.1,"cpu":193.0,"mem":25.8,"shr":67.32,"state":"S","time":"100:56.27"},{"i":260,"lbl":"09-Mar 16:xx","res":31.4,"cpu":195.1,"mem":26.9,"shr":67.27,"state":"S","time":"110:25.59"},{"i":270,"lbl":"09-Mar 16:xx","res":31.7,"cpu":191.3,"mem":27.1,"shr":67.27,"state":"S","time":"119:50.47"},{"i":280,"lbl":"09-Mar 16:xx","res":33.0,"cpu":193.1,"mem":28.3,"shr":67.27,"state":"S","time":"129:20.87"},{"i":285,"lbl":"09-Mar 16:xx","res":33.7,"cpu":189.3,"mem":28.9,"shr":66.5,"state":"S","time":"134:00.76"},{"i":290,"lbl":"09-Mar 16:xx","res":35.3,"cpu":194.1,"mem":30.3,"shr":66.47,"state":"S","time":"138:50.60"},{"i":295,"lbl":"09-Mar 16:xx","res":36.8,"cpu":188.3,"mem":31.5,"shr":62.28,"state":"S","time":"143:39.44"},{"i":296,"lbl":"09-Mar 16:xx 🟡SHR warn","res":37.0,"cpu":136.3,"mem":31.7,"shr":49.96,"state":"S","time":"144:36.05"},{"i":297,"lbl":"09-Mar 16:xx","res":37.3,"cpu":146.6,"mem":32.0,"shr":38.9,"state":"S","time":"145:28.26"},{"i":298,"lbl":"09-Mar 16:xx","res":37.6,"cpu":190.3,"mem":32.2,"shr":38.2,"state":"S","time":"146:24.75"},{"i":300,"lbl":"09-Mar 16:xx","res":38.2,"cpu":192.2,"mem":32.8,"shr":35.3,"state":"S","time":"148:20.19"},{"i":303,"lbl":"09-Mar 16:xx","res":39.2,"cpu":192.2,"mem":33.6,"shr":31.29,"state":"S","time":"151:11.73"},{"i":304,"lbl":"09-Mar 16:xx 🔴CPU stall","res":39.2,"cpu":9.7,"mem":33.6,"shr":7.38,"state":"S","time":"151:34.12"},{"i":305,"lbl":"09-Mar 16:xx 💥SHR collapse","res":39.2,"cpu":10.4,"mem":33.6,"shr":1.29,"state":"S","time":"151:38.31"}],"1091945":[{"i":0,"lbl":"09-Mar 01:xx","res":0.4495,"cpu":53.4,"mem":0.4,"shr":76.08,"state":"S","time":"0:22.84"},{"i":5,"lbl":"09-Mar 01:xx","res":0.4495,"cpu":1.0,"mem":0.4,"shr":76.08,"state":"S","time":"0:23.98"},{"i":13,"lbl":"09-Mar 02:xx","res":0.4495,"cpu":1.0,"mem":0.4,"shr":76.08,"state":"S","time":"0:25.47"},{"i":23,"lbl":"09-Mar 03:xx","res":0.4493,"cpu":1.0,"mem":0.4,"shr":75.86,"state":"S","time":"0:27.91"},{"i":31,"lbl":"09-Mar 04:xx","res":0.4493,"cpu":1.0,"mem":0.4,"shr":75.86,"state":"S","time":"0:30.44"},{"i":38,"lbl":"09-Mar 05:xx","res":0.4493,"cpu":1.0,"mem":0.4,"shr":75.86,"state":"S","time":"0:32.77"},{"i":48,"lbl":"09-Mar 06:xx","res":0.4493,"cpu":1.0,"mem":0.4,"shr":75.86,"state":"S","time":"0:35.19"},{"i":57,"lbl":"09-Mar 07:xx","res":0.4658,"cpu":1.0,"mem":0.4,"shr":75.86,"state":"S","time":"0:37.64"},{"i":59,"lbl":"09-Mar 07:xx","res":0.4658,"cpu":1.0,"mem":0.4,"shr":75.86,"state":"S","time":"0:37.80"}],"265786":[{"i":0,"lbl":"09-Mar 19:xx","res":0.2725,"cpu":1.0,"mem":0.2,"shr":70.8,"state":"S","time":"0:04.82"},{"i":3,"lbl":"09-Mar 19:xx","res":0.286,"cpu":1.0,"mem":0.2,"shr":70.8,"state":"S","time":"0:06.16"},{"i":6,"lbl":"09-Mar 19:xx","res":0.289,"cpu":4.9,"mem":0.2,"shr":70.87,"state":"S","time":"0:07.55"},{"i":10,"lbl":"09-Mar 20:xx","res":0.2899,"cpu":1.0,"mem":0.2,"shr":70.99,"state":"S","time":"0:08.63"},{"i":20,"lbl":"09-Mar 20:xx","res":0.2901,"cpu":17.5,"mem":0.2,"shr":70.99,"state":"S","time":"0:11.59"},{"i":23,"lbl":"09-Mar 20:xx","res":0.2901,"cpu":1.0,"mem":0.2,"shr":71.04,"state":"S","time":"0:17.10"},{"i":28,"lbl":"09-Mar 21:xx","res":0.2901,"cpu":1.0,"mem":0.2,"shr":71.04,"state":"S","time":"0:18.66"},{"i":29,"lbl":"09-Mar 21:xx","res":0.2923,"cpu":1.0,"mem":0.3,"shr":71.04,"state":"S","time":"0:19.12"},{"i":41,"lbl":"09-Mar 22:xx","res":0.2923,"cpu":1.0,"mem":0.3,"shr":71.04,"state":"S","time":"0:21.68"},{"i":49,"lbl":"09-Mar 23:xx","res":0.2923,"cpu":1.0,"mem":0.3,"shr":71.04,"state":"S","time":"0:24.95"},{"i":54,"lbl":"09-Mar 23:xx","res":0.2923,"cpu":1.0,"mem":0.3,"shr":71.04,"state":"S","time":"0:27.22"}]};

// ── COLOURS ───────────────────────────────────────────────────────────────────
const PIDS = {
  "2418470": { label:"PID 2418470 (RUNAWAY)",  color:"#ff4d4f", dash:""       },
  "1091945": { label:"PID 1091945 (Companion)",color:"#36cfc9", dash:"5 5"    },
  "265786":  { label:"PID 265786 (Respawn)",   color:"#73d13d", dash:"3 3"    },
};

const BG   = "#0d1117";
const CARD = "#161b22";
const BORDER = "#30363d";

const METRICS = [
  { key:"res",  label:"RES Memory (GB)",        unit:"GB",  refLines:[{v:8,c:"#faad14",l:"Warn 8GB"},{v:20,c:"#ff7a00",l:"20 GB"},{v:39.2,c:"#ff4d4f",l:"Peak 39.2GB"}], domain:[0,45] },
  { key:"cpu",  label:"CPU Usage (%)",           unit:"%",   refLines:[{v:100,c:"#faad14",l:"100%"},{v:202,c:"#ff4d4f",l:"Peak 202%"}], domain:[0,230] },
  { key:"mem",  label:"% System RAM",            unit:"%",   refLines:[{v:5,c:"#faad14",l:"Warn 5%"},{v:20,c:"#ff7a00",l:"20%"},{v:33.6,c:"#ff4d4f",l:"Peak 33.6%"}], domain:[0,40] },
  { key:"shr",  label:"SHR Shared Memory (KB)",  unit:"KB",  refLines:[{v:65,c:"#faad14",l:"Warn 65KB"},{v:40,c:"#ff7a00",l:"Critical 40KB"},{v:1.29,c:"#ff4d4f",l:"Collapse 1.3KB"}], domain:[0,85] },
];

// ── TOOLTIP ───────────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label, metricUnit }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1c2128", border:"1px solid #444", borderRadius:8, padding:"10px 14px", fontSize:12 }}>
      <p style={{ color:"#8b949e", marginBottom:6, fontWeight:600 }}>{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} style={{ color: p.color, marginBottom:2 }}>
          {p.name}: <strong>{p.value?.toFixed?.(2) ?? p.value} {metricUnit}</strong>
        </div>
      ))}
    </div>
  );
};

// ── STAT PILL ─────────────────────────────────────────────────────────────────
const Pill = ({ label, value, color="#ff4d4f" }) => (
  <div style={{ background:CARD, border:`1px solid ${BORDER}`, borderRadius:8, padding:"10px 16px", minWidth:130, textAlign:"center" }}>
    <div style={{ color, fontSize:20, fontWeight:700 }}>{value}</div>
    <div style={{ color:"#8b949e", fontSize:11, marginTop:3 }}>{label}</div>
  </div>
);

// ── INCIDENT BADGE ────────────────────────────────────────────────────────────
const Badge = ({ text, color="#ff4d4f", bg="#2d1b1b" }) => (
  <span style={{ background:bg, color, border:`1px solid ${color}`, borderRadius:4, padding:"2px 8px", fontSize:11, fontWeight:600, marginRight:6 }}>{text}</span>
);

// ── CHART CARD ────────────────────────────────────────────────────────────────
const ChartCard = ({ metric, pidData, activePids }) => {
  const series = useMemo(() => {
    const map = {};
    Object.entries(pidData).forEach(([pid, pts]) => {
      pts.forEach(p => {
        const k = p.i;
        if (!map[k]) map[k] = { idx: k, lbl: p.lbl.replace(/ [⚡🔴🟡💥].*/,"") };
        map[k][pid] = p[metric.key];
      });
    });
    return Object.values(map).sort((a,b)=>a.idx-b.idx);
  }, [pidData, metric.key]);

  return (
    <div style={{ background:CARD, border:`1px solid ${BORDER}`, borderRadius:12, padding:"20px 24px", marginBottom:24 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h3 style={{ color:"#e6edf3", margin:0, fontSize:15, fontWeight:600 }}>{metric.label}</h3>
        <div style={{ display:"flex", gap:8 }}>
          {Object.entries(PIDS).map(([pid,cfg]) =>
            activePids.includes(pid) && (
              <div key={pid} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:"#8b949e" }}>
                <div style={{ width:20, height:2, background:cfg.color, borderRadius:1 }}/>
                {cfg.label.split(" ")[0]} {cfg.label.split(" ")[1]}
              </div>
            )
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={series} margin={{ top:4, right:16, bottom:4, left:8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
          <XAxis dataKey="lbl" tick={{ fill:"#6e7681", fontSize:10 }} interval={Math.floor(series.length/8)} />
          <YAxis domain={metric.domain} tick={{ fill:"#6e7681", fontSize:10 }} unit={` ${metric.unit}`} width={62} />
          <Tooltip content={<CustomTooltip metricUnit={metric.unit} />} />
          {metric.refLines.map(r => (
            <ReferenceLine key={r.v} y={r.v} stroke={r.c} strokeDasharray="4 3" label={{ value:r.l, fill:r.c, fontSize:10, position:"right" }} />
          ))}
          {Object.entries(PIDS).map(([pid,cfg]) =>
            activePids.includes(pid) && (
              <Line key={pid} type="monotone" dataKey={pid} name={cfg.label} stroke={cfg.color}
                strokeWidth={pid==="2418470"?2:1.5} strokeDasharray={cfg.dash}
                dot={false} activeDot={{ r:4 }} connectNulls />
            )
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// ── TIMELINE EVENTS ───────────────────────────────────────────────────────────
const EVENTS = [
  { time:"09-Mar 00:xx", label:"Observation start", detail:"PID 2418470 already running (TIME+ 2:12)", color:"#58a6ff" },
  { time:"09-Mar 01:xx", label:"PID 1091945 spawns", detail:"Companion process: spawn spike 53.4% → idle 1%", color:"#36cfc9" },
  { time:"09-Mar 07:xx", label:"PID 1091945 exits", detail:"Graceful exit after ~6hr overnight task", color:"#36cfc9" },
  { time:"09-Mar 14:xx", label:"Last idle sample", detail:"RES stable 0.50 GB, CPU 1%, SHR 76.6 KB — all normal", color:"#73d13d" },
  { time:"09-Mar 15:xx ⚡", label:"BATCH TRIGGER", detail:"CPU 1% → 100% instantly. Single-thread index phase begins", color:"#faad14", bold:true },
  { time:"09-Mar 15:xx ⚡", label:"2nd thread added", detail:"CPU escalates 100% → 200% (MAXCALCTHREADS=2 confirmed)", color:"#ff7a00", bold:true },
  { time:"09-Mar 15:xx 🔴", label:"0.65 → 7.2 GB cache jump", detail:"Single-interval 10× RES jump. BSO data cache allocated", color:"#ff4d4f", bold:true },
  { time:"09-Mar 15-16:xx", label:"Sustained runaway ~520 MB/min", detail:"Two threads, 190–202% CPU. RES climbs 7.2 → 39.2 GB over ~1hr", color:"#ff4d4f" },
  { time:"09-Mar 16:xx 🟡", label:"SHR warning", detail:"SHR drops 76.6 → 50 KB at RES 37.0 GB / 31.7% RAM. OOM pressure begins", color:"#faad14", bold:true },
  { time:"09-Mar 16:xx 🔴", label:"CPU stall & SHR collapse", detail:"CPU drops to ~10%. SHR collapses 50 KB → 1.3 KB. Process stalled", color:"#ff4d4f", bold:true },
  { time:"16:xx – 19:xx", label:"3-HR GAP — VM hung / Infra restart", detail:"OLED-OOM Watch LOG ONLY — no action. OOM Reaper inactive. VM entered intermittent hung state impacting ATK. Infra team restarted FA VM to recover", color:"#a371f7", bold:true },
  { time:"09-Mar 19:xx 🟢", label:"PID 265786 respawns", detail:"Oracle Fusion auto-respawn. RES 0.27 GB, SHR 70.8 KB — clean recovery", color:"#73d13d", bold:true },
];

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function ENV4Chart() {
  const [activePids, setActivePids] = useState(["2418470","1091945","265786"]);

  const togglePid = pid =>
    setActivePids(p => p.includes(pid) ? p.filter(x=>x!==pid) : [...p,pid]);

  return (
    <div style={{ background:BG, minHeight:"100vh", padding:"28px 32px", fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", color:"#e6edf3" }}>

      {/* HEADER */}
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
          <div style={{ width:4, height:36, background:"linear-gradient(180deg,#ff4d4f,#faad14)", borderRadius:2 }}/>
          <div>
            <h1 style={{ margin:0, fontSize:22, fontWeight:700, color:"#e6edf3" }}>
              ESSSVR Memory Utilization — Machine FA1-ENV4
            </h1>
            <p style={{ margin:0, color:"#8b949e", fontSize:13 }}>
              09 March 2026 · 421 samples · 3 PIDs · ~116.7 GB RAM
            </p>
          </div>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <Badge text="RUNAWAY DETECTED" color="#ff4d4f" bg="#2d1b1b"/>
          <Badge text="OLED-OOM: LOG ONLY — NO ACTION" color="#ff7a00" bg="#2d1a0a"/>
          <Badge text="OOM REAPER: INACTIVE" color="#faad14" bg="#2d2500"/>
          <Badge text="VM HUNG — ATK IMPACTED" color="#a371f7" bg="#1e1530"/>
          <Badge text="INFRA RESTART REQUIRED" color="#ff4d4f" bg="#2d1b1b"/>
          <Badge text="RECOVERED: PID 265786" color="#73d13d" bg="#0d2018"/>
        </div>
      </div>

      {/* STAT PILLS */}
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:28 }}>
        <Pill label="Peak RES Memory"       value="39.2 GB"     color="#ff4d4f"/>
        <Pill label="Peak % System RAM"     value="33.6%"       color="#ff7a00"/>
        <Pill label="Peak CPU (2 threads)"  value="~202%"       color="#faad14"/>
        <Pill label="SHR at Collapse"       value="1.3 KB"      color="#ff4d4f"/>
        <Pill label="Growth Rate"           value="~520 MB/min" color="#ff7a00"/>
        <Pill label="Runaway Duration"      value="~1 hour"     color="#faad14"/>
        <Pill label="3-hr Gap / VM Restart" value="16→19:xx"    color="#a371f7"/>
        <Pill label="Outcome"               value="Terminated ✓"color="#73d13d"/>
      </div>

      {/* PID TOGGLES */}
      <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap" }}>
        {Object.entries(PIDS).map(([pid,cfg]) => (
          <button key={pid} onClick={() => togglePid(pid)}
            style={{ background: activePids.includes(pid) ? cfg.color+"22" : CARD,
              border:`1px solid ${activePids.includes(pid) ? cfg.color : BORDER}`,
              color: activePids.includes(pid) ? cfg.color : "#6e7681",
              borderRadius:8, padding:"6px 14px", cursor:"pointer", fontSize:12, fontWeight:600, transition:"all .2s" }}>
            {cfg.label}
          </button>
        ))}
      </div>

      {/* CHARTS */}
      {METRICS.map(m => (
        <ChartCard key={m.key} metric={m} pidData={RAW} activePids={activePids} />
      ))}

      {/* INCIDENT TIMELINE */}
      <div style={{ background:CARD, border:`1px solid ${BORDER}`, borderRadius:12, padding:"20px 24px", marginBottom:24 }}>
        <h3 style={{ color:"#e6edf3", margin:"0 0 16px 0", fontSize:15, fontWeight:600 }}>📋 Incident Timeline</h3>
        <div style={{ position:"relative", paddingLeft:20 }}>
          <div style={{ position:"absolute", left:7, top:0, bottom:0, width:2, background:"linear-gradient(180deg,#58a6ff22,#ff4d4f,#a371f7,#73d13d22)" }}/>
          {EVENTS.map((e,i) => (
            <div key={i} style={{ display:"flex", gap:14, marginBottom:14, position:"relative" }}>
              <div style={{ width:10, height:10, borderRadius:"50%", background:e.color, marginTop:3, flexShrink:0, zIndex:1 }}/>
              <div>
                <div style={{ display:"flex", gap:8, alignItems:"baseline", flexWrap:"wrap" }}>
                  <span style={{ color:"#6e7681", fontSize:11, fontFamily:"monospace" }}>{e.time}</span>
                  <span style={{ color:e.color, fontSize:13, fontWeight: e.bold ? 700 : 400 }}>{e.label}</span>
                </div>
                <div style={{ color:"#8b949e", fontSize:12, marginTop:2 }}>{e.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CRITICAL CALLOUT */}
      <div style={{ background:"#2d1a0a", border:"1px solid #ff7a00", borderRadius:12, padding:"16px 20px", marginBottom:24 }}>
        <div style={{ color:"#ff7a00", fontWeight:700, fontSize:13, marginBottom:8 }}>⚠️ CRITICAL — Why No Automated Protection Fired</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:12 }}>
          {[
            { icon:"📊", title:"OLED-OOM Watch — LOG ONLY", body:"Tool detected every memory breach but was in LOG ONLY mode. Zero automated action taken. Switching to ACTION mode (RES > 8 GB threshold) would have terminated PID 2418470 before SHR collapse." },
            { icon:"🎲", title:"Kernel OOM Reaper — Random Behaviour", body:"Linux OOM Reaper is non-deterministic. It did not fire timely during the runaway. Oracle oom_score_adj overrides and available swap/page reclaim delayed or prevented automatic kill." },
            { icon:"💻", title:"VM Intermittent Hung State", body:"Extreme memory pressure (39.2 GB / 33.6% RAM + SHR collapse) caused repeated on/off VM hangs. Kernel page reclaim and TLB shootdowns starved the scheduler across all processes." },
            { icon:"🔗", title:"ATK Service Impacted", body:"ATK (Oracle Application Toolkit) experienced health check failures and request degradation during VM hung windows. On/off nature made root cause difficult to diagnose in real time." },
            { icon:"🔄", title:"Infra Team FA VM Restart", body:"With no automated recovery, Infra team manually restarted the FA VM. Full restart was required — VM was too hung for targeted process kill via remote management." },
          ].map((c,i) => (
            <div key={i} style={{ background:"#1c1205", border:"1px solid #3d2800", borderRadius:8, padding:"12px 14px" }}>
              <div style={{ fontWeight:600, color:"#faad14", marginBottom:4, fontSize:12 }}>{c.icon} {c.title}</div>
              <div style={{ color:"#a8875a", fontSize:11, lineHeight:1.5 }}>{c.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:14, display:"flex", justifyContent:"space-between", fontSize:11, color:"#6e7681" }}>
        <span>ESSSVR Memory Runaway — Machine FA2-ENV4 · 09 March 2026</span>
        <span>Toggle PIDs using buttons above to isolate individual process behaviour</span>
      </div>
    </div>
  );
}
