import { useState, useRef } from "react";

const T = {
  bg:     "#fff",
  surface:"#f8f8f8",
  border: "#e0e0e0",
  ink:    "#111111",
  muted:  "#888888",
  faint:  "#f2f2f2",
  c1:     "#111111",
  c2:     "#111111",
  c3:     "#111111",
  c4:     "#111111",
  c5:     "#111111",
};

const mono = "'Courier New', Courier, monospace";
const serif = "Georgia, 'Times New Roman', serif";

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${T.bg}; font-family: ${serif}; color: ${T.ink}; }
  input, button { font-family: ${mono}; }

  .inp {
    background: ${T.bg};
    border: 1px solid ${T.border};
    border-bottom: 2px solid ${T.ink};
    color: ${T.ink};
    padding: 8px 10px;
    font-size: 13px;
    outline: none;
    width: 100%;
    transition: border-bottom-color .15s;
    border-radius: 0;
  }
  .inp:focus { border-bottom-color: #555; }
  .inp::placeholder { color: #bbb; }

  .btn {
    background: ${T.ink};
    color: ${T.bg};
    border: none;
    padding: 9px 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    white-space: nowrap;
    transition: opacity .15s;
  }
  .btn:hover { opacity: .75; }
  .btn-ghost {
    background: transparent;
    color: ${T.ink};
    border: 1px solid ${T.border};
    padding: 8px 18px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    white-space: nowrap;
    transition: background .15s, color .15s;
  }
  .btn-ghost:hover { background: ${T.ink}; color: #fff; }

  .task-row:hover .del { opacity: 1 !important; }

  @media (max-width: 680px) {
    .duo { grid-template-columns: 1fr !important; }
  }
`;

function Styles() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

/* ── layout primitives ──────────────────────────────────────────────────────── */
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: T.bg,
      border: `1px solid ${T.border}`,
      padding: "28px 24px",
      ...style,
    }}>{children}</div>
  );
}

function Label({ n }) {
  return (
    <div style={{
      fontFamily: mono, fontSize: 10, letterSpacing: 3,
      color: T.muted, marginBottom: 8,
    }}>PART {n}</div>
  );
}

function Title({ children }) {
  return (
    <h2 style={{
      fontFamily: serif,
      fontSize: "clamp(16px, 2vw, 19px)",
      fontWeight: 700, color: T.ink,
      marginBottom: 4, lineHeight: 1.2,
    }}>{children}</h2>
  );
}

function Hint({ children }) {
  return (
    <p style={{
      fontFamily: mono, fontSize: 11,
      color: T.muted, marginBottom: 20,
    }}>{children}</p>
  );
}

/* output box — shows only the final result, clean */
function Output({ label, value, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      marginTop: 16,
      borderTop: `1px solid ${T.border}`,
      paddingTop: 16,
    }}>
      {label && (
        <div style={{ fontFamily: mono, fontSize: 10, color: T.muted, letterSpacing: 2, marginBottom: 8 }}>
          {label}
        </div>
      )}
      <div style={{
        fontFamily: mono, fontSize: 13,
        color: T.ink, lineHeight: 1.7,
      }}>{value}</div>
    </div>
  );
}

/* ── PART 1 ─────────────────────────────────────────────────────────────────── */
function Part1() {
  const [name,   setName]   = useState("");
  const [course, setCourse] = useState("");
  const [year,   setYear]   = useState("");
  const [out,    setOut]    = useState(null);

  function run() {
    const n = name.trim()   || "Student";
    const c = course.trim() || "the Course";
    const y = year          || new Date().getFullYear();
    setOut(`Welcome ${n} to the ${c} course. (${y})`);
  }

  return (
    <Card>
      <Label n="1" />
      <Title>JavaScript Basics</Title>
      <Hint>Variables · console output</Hint>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <input className="inp" value={name}   onChange={e => setName(e.target.value)}   placeholder="Student name" />
        <input className="inp" value={course} onChange={e => setCourse(e.target.value)} placeholder="Course name" />
        <div style={{ display: "flex", gap: 8 }}>
          <input className="inp" value={year} onChange={e => setYear(e.target.value)} placeholder="Year" type="number" style={{ flex: 1 }} />
          <button className="btn" onClick={run}>Run</button>
        </div>
      </div>
      <Output label="CONSOLE OUTPUT" value={out} visible={!!out} />
    </Card>
  );
}

/* ── PART 2 ─────────────────────────────────────────────────────────────────── */
function Part2() {
  const DEFAULT = "Welcome to my website";
  const CHANGED = "JavaScript is controlling this page!";
  const [heading, setHeading] = useState(DEFAULT);
  const toggled = heading === CHANGED;

  return (
    <Card>
      <Label n="2" />
      <Title>DOM Manipulation</Title>
      <Hint>getElementById · update heading text</Hint>

      <div style={{
        border: `1px solid ${T.border}`,
        padding: "20px 16px",
        textAlign: "center",
        background: T.faint,
        marginBottom: 14,
      }}>
        <p style={{
          fontFamily: serif,
          fontSize: "clamp(13px, 1.8vw, 16px)",
          fontWeight: 700,
          color: T.ink,
          marginBottom: 16,
          minHeight: 24,
          transition: "opacity .2s",
        }}>{heading}</p>
        <button
          className="btn-ghost"
          onClick={() => setHeading(toggled ? DEFAULT : CHANGED)}
        >{toggled ? "↺ Reset" : "Change Heading"}</button>
      </div>

      <div style={{
        fontFamily: mono, fontSize: 11, color: T.muted,
        borderTop: `1px solid ${T.border}`, paddingTop: 12,
      }}>
        State: <span style={{ color: T.ink }}>{toggled ? "changed" : "default"}</span>
      </div>
    </Card>
  );
}

/* ── PART 3 ─────────────────────────────────────────────────────────────────── */
function Part3() {
  const [log,   setLog]   = useState([]);
  const [count, setCount] = useState(0);

  function handleClick() {
    const ts = new Date().toLocaleTimeString();
    setCount(c => c + 1);
    setLog(p => [`${ts} — You clicked the button!`, ...p].slice(0, 5));
  }

  return (
    <Card>
      <Label n="3" />
      <Title>Event Handling</Title>
      <Hint>addEventListener · click logger</Hint>

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <button className="btn" onClick={handleClick}>Click Me</button>
        {count > 0 && (
          <span style={{ fontFamily: mono, fontSize: 12, color: T.muted }}>
            {count} event{count > 1 ? "s" : ""} fired
          </span>
        )}
      </div>

      <div style={{
        borderTop: `1px solid ${T.border}`, paddingTop: 14,
        fontFamily: mono, fontSize: 12, minHeight: 36,
      }}>
        {log.length === 0
          ? <span style={{ color: T.muted }}>No events yet.</span>
          : log.map((l, i) => (
            <div key={i} style={{
              color: i === 0 ? T.ink : T.muted,
              padding: "2px 0",
              lineHeight: 1.7,
            }}>{l}</div>
          ))}
      </div>
    </Card>
  );
}

/* ── PART 4 ─────────────────────────────────────────────────────────────────── */
function Part4() {
  const [a, setA]     = useState("");
  const [b, setB]     = useState("");
  const [res, setRes] = useState(null);

  function calc() {
    const na = parseFloat(a), nb = parseFloat(b);
    if (isNaN(na) || isNaN(nb)) { setRes({ err: "Enter valid numbers." }); return; }
    setRes({ add: na + nb, sub: na - nb, mul: na * nb, div: nb !== 0 ? na / nb : null });
  }

  const fmt = v =>
    v === null ? "undefined (÷ 0)"
    : typeof v === "number" ? v.toLocaleString(undefined, { maximumFractionDigits: 8 })
    : v;

  return (
    <Card>
      <Label n="4" />
      <Title>Simple Calculator</Title>
      <Hint>Two inputs · four operations</Hint>

      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <input className="inp" value={a} onChange={e => setA(e.target.value)} placeholder="Number 1" type="number" style={{ flex: 1, minWidth: 80 }} />
        <input className="inp" value={b} onChange={e => setB(e.target.value)} placeholder="Number 2" type="number" style={{ flex: 1, minWidth: 80 }} />
        <button className="btn" onClick={calc}>Calculate</button>
      </div>

      {res?.err && <p style={{ fontFamily: mono, fontSize: 12, color: "#c00", marginBottom: 8 }}>{res.err}</p>}

      {res && !res.err && (
        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Addition",       sym: "+", val: res.add },
            { label: "Subtraction",    sym: "−", val: res.sub },
            { label: "Multiplication", sym: "×", val: res.mul },
            { label: "Division",       sym: "÷", val: res.div },
          ].map(op => (
            <div key={op.sym} style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              paddingBottom: 8, borderBottom: `1px solid ${T.border}`,
            }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: T.muted }}>
                {a || "a"} {op.sym} {b || "b"}
              </span>
              <span style={{ fontFamily: mono, fontSize: 15, fontWeight: 700, color: T.ink }}>
                = {fmt(op.val)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

/* ── PART 5 ─────────────────────────────────────────────────────────────────── */
function Part5() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Study JavaScript",  done: false },
    { id: 2, text: "Finish assignment", done: false },
    { id: 3, text: "Practice coding",   done: false },
  ]);
  const [val, setVal] = useState("");
  const nid = useRef(10);

  function add() {
    const t = val.trim();
    if (!t) return;
    setTasks(p => [...p, { id: nid.current++, text: t, done: false }]);
    setVal("");
  }
  function remove(id) { setTasks(p => p.filter(t => t.id !== id)); }
  function toggle(id)  { setTasks(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t)); }

  const done  = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const pct   = total ? Math.round(done / total * 100) : 0;

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
        <div>
          <Label n="5" />
          <Title>To-Do List</Title>
          <Hint>Add · remove · mark complete</Hint>
        </div>
        <div style={{ textAlign: "right", fontFamily: mono }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: T.ink, lineHeight: 1 }}>{pct}%</div>
          <div style={{ fontSize: 11, color: T.muted }}>{done}/{total} done</div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ background: T.faint, height: 3, marginBottom: 20, borderRadius: 2 }}>
        <div style={{
          background: T.ink, height: "100%", borderRadius: 2,
          width: `${pct}%`, transition: "width .4s ease",
        }} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          className="inp"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()}
          placeholder="Add a task and press Enter…"
          style={{ flex: 1 }}
        />
        <button className="btn" onClick={add}>Add</button>
      </div>

      {/* Task list */}
      {tasks.length === 0
        ? <p style={{ fontFamily: mono, fontSize: 12, color: T.muted }}>No tasks.</p>
        : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: 8,
          }}>
            {tasks.map(task => (
              <div
                key={task.id}
                className="task-row"
                onClick={() => toggle(task.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  border: `1px solid ${task.done ? T.border : "#ccc"}`,
                  padding: "10px 12px",
                  background: task.done ? T.faint : T.bg,
                  cursor: "pointer",
                  transition: "all .15s",
                }}
              >
                {/* checkbox */}
                <div style={{
                  width: 16, height: 16, flexShrink: 0,
                  border: `1.5px solid ${task.done ? T.ink : T.border}`,
                  background: task.done ? T.ink : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all .15s",
                }}>
                  {task.done && <span style={{ color: "#fff", fontSize: 9, fontWeight: 900, lineHeight: 1 }}>✓</span>}
                </div>

                <span style={{
                  flex: 1, fontFamily: mono, fontSize: 12,
                  color: task.done ? T.muted : T.ink,
                  textDecoration: task.done ? "line-through" : "none",
                  transition: "all .15s",
                }}>{task.text}</span>

                <button
                  className="del"
                  onClick={e => { e.stopPropagation(); remove(task.id); }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: T.muted, fontSize: 13, lineHeight: 1,
                    opacity: 0, transition: "opacity .15s",
                    padding: "0 2px", flexShrink: 0,
                  }}
                >✕</button>
              </div>
            ))}
          </div>
        )}
    </Card>
  );
}

/* ── APP ─────────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Styles />
      <div style={{ minHeight: "100vh", background: T.bg, padding: "0 0 80px" }}>

        {/* Header */}
        <header style={{
          borderBottom: `1px solid ${T.border}`,
          padding: "32px 32px 28px",
          marginBottom: 32,
        }}>
          <div style={{ maxWidth: 1020, margin: "0 auto" }}>
            
            <h1 style={{
              fontFamily: serif,
              fontSize: "clamp(22px, 4vw, 38px)",
              fontWeight: 700, color: T.ink, lineHeight: 1.1,
            }}>
              Interactive Web Pages
            </h1>
            <div style={{ display: "flex", gap: 24, marginTop: 14, flexWrap: "wrap" }}>
              {["JS Basics","DOM","Events","Calculator","To-Do"].map((l, i) => (
                <span key={l} style={{
                  fontFamily: mono, fontSize: 11, color: T.muted,
                }}>P{i+1} · {l}</span>
              ))}
            </div>
          </div>
        </header>

        {/* Grid */}
        <main style={{ maxWidth: 1020, margin: "0 auto", padding: "0 20px" }}>

          {/* Row 1: Part 1 + 2 */}
          <div className="duo" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 16, marginBottom: 16,
          }}>
            <Part1 />
            <Part2 />
          </div>

          {/* Row 2: Part 3 + 4 */}
          <div className="duo" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 16, marginBottom: 16,
          }}>
            <Part3 />
            <Part4 />
          </div>

          {/* Row 3: Part 5 full width */}
          <Part5 />

          <footer style={{
            marginTop: 28, textAlign: "center",
            fontFamily: mono, fontSize: 11, color: T.muted,
            paddingTop: 20, borderTop: `1px solid ${T.border}`,
          }}>
            5 parts · 100 marks · React + Vite
          </footer>
        </main>
      </div>
    </>
  );
}
