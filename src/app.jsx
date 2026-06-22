import { useState, useRef, useEffect } from "react";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  en: {
    appTitle: "Positive Discipline", appSubtitle: "Parenting Coach · Jane Nelsen & Lynn Lott",
    footer: "Based on Positive Discipline by Jane Nelsen & Lynn Lott",
    tabs: ["🧭 Situation Coach", "🏡 Family Meeting", "🌱 Reflection"],
    tabIds: ["coach", "meeting", "journal"],
    ageLabel: "Child's age group", ages: ["🧸 Under 8", "🎒 Tweens 8–12", "🎧 Teenagers"],
    coachSubtitle: "Describe what just happened — get Positive Discipline guidance grounded in Jane Nelsen & Lynn Lott's work.",
    situationLabel: "What happened?", situationPlaceholder: "Describe the situation in your own words...",
    coachBtn: "🧭 Get Guidance", thinkingMsg: "Thinking with you...",
    starters: ["My child had a meltdown in public...","Homework battles every night...","They hit their sibling...","Complete refusal to do chores...","Screen time causing constant conflict...","They lied to me about..."],
    sections: { mistaken_goal:["🔍","What's Behind the Behavior"], what_to_do_now:["⚡","What to Do Right Now"], script:["💬","Words You Can Say"], what_not_to_do:["🚫","What to Avoid"], long_term:["📅","Follow Up Later"] },
    meetingSubtitle: "Set up your meeting, then follow the guided steps live.",
    setupTitle: "Meeting Setup", setupSubtitle: "Adjust times before you begin (minutes per step)",
    startMeetingBtn: "▶ Start Meeting",
    stepOfLabel: "Step", ofLabel: "of",
    nextStepBtn: "Next Step →", endMeetingBtn: "⏹ End & Analyze",
    timeLeftLabel: "left in this step", totalLabel: "total elapsed",
    scriptLabel: "💬 Facilitator script",
    transcriptLabel: "📝 Live transcript",
    analyzingMsg: "Analyzing your meeting…",
    newMeetingBtn: "Start New Meeting",
    manualFallback: "or type notes instead",
    manualLabel: "Type or paste meeting notes",
    manualPlaceholder: "Write what was discussed — compliments, problems, solutions, fun activity…",
    analyzeBtn: "✨ Analyze Meeting",
    meetingSections: { compliments:["💛","Compliments & Appreciations"], problems:["🧩","Problems Discussed"], solutions:["✅","Solutions & Action Plan"], followups:["📅","Follow-ups for Next Meeting"], fun:["🎉","Fun Activity Planned"] },
    pdNote: ["🌿","PD Framework Notes"],
    speechUnavailable: "Speech recognition unavailable — transcript will be empty, but the meeting guide still works. You can type notes at the end.",
    journalSubtitle: "End the day with reflection. Growth as a parent is the goal — not perfection.",
    journalLabel: "What happened today? What did you notice about yourself or your child?",
    journalPlaceholder: "I noticed that when I raised my voice, she shut down… / He responded really well when I sat down and asked what was wrong first…",
    reflectBtn: "🌱 Reflect with PD", recentLabel: "🗓 Recent Reflections",
    reflectionSections: { validation:["💚","Validation"], insight:["💡","PD Insight"], growth:["🌱","Growth"], question:["🤔","Sit With This"] },
    steps: [
      { id:"compliments", icon:"💛", label:"Compliments & Appreciations", defaultMin:5,
        tip:"Go around the table. Each person says one genuine compliment or thank-you to another family member. No corrections allowed — only appreciation.",
        script:"Let's start with compliments. Who would like to go first? Say something you appreciate about someone in this family." },
      { id:"followups", icon:"📋", label:"Follow-ups from Last Meeting", defaultMin:3,
        tip:"Review action items from the previous meeting. Did everyone follow through? Celebrate wins. Carry over unresolved items to today's agenda.",
        script:"Last meeting we agreed on a few things. Let's check in — how did that go? What did we accomplish? What didn't happen yet?" },
      { id:"problems", icon:"🧩", label:"Problem-Solving", defaultMin:15,
        tip:"Work through agenda items one by one. Use curiosity questions: What happened? How did it affect you? What ideas do you have? Aim for solutions everyone agrees on.",
        script:"Now let's look at our agenda. For each problem, everyone gets to share their perspective. Then we brainstorm solutions together — no idea is wrong at first." },
      { id:"plan", icon:"✅", label:"Make a Plan & Vote", defaultMin:5,
        tip:"From the ideas generated, choose solutions by consensus or vote. Be specific: who does what, by when? Write it down so there's a record.",
        script:"Which solutions do we want to try this week? Let's vote and decide. Remember — everyone needs to agree, or at least be willing to try it." },
      { id:"fun", icon:"🎉", label:"Plan Something Fun", defaultMin:2,
        tip:"Every family meeting ends with something fun the whole family looks forward to. It can be a movie, a game, a meal together — decided together.",
        script:"Now the best part! What fun thing do we want to do together before our next meeting? Everyone suggest one idea." },
    ],
  },
  pt: {
    appTitle: "Disciplina Positiva", appSubtitle: "Coach de Parentalidade · Jane Nelsen & Lynn Lott",
    footer: "Baseado em Disciplina Positiva de Jane Nelsen & Lynn Lott",
    tabs: ["🧭 Coach de Situação", "🏡 Reunião Familiar", "🌱 Reflexão"],
    tabIds: ["coach", "meeting", "journal"],
    ageLabel: "Faixa etária da criança", ages: ["🧸 Menos de 8", "🎒 Pré-teen 8–12", "🎧 Adolescentes"],
    coachSubtitle: "Descreva o que acabou de acontecer — receba orientação de Disciplina Positiva baseada no trabalho de Jane Nelsen & Lynn Lott.",
    situationLabel: "O que aconteceu?", situationPlaceholder: "Descreva a situação com suas próprias palavras…",
    coachBtn: "🧭 Receber Orientação", thinkingMsg: "Pensando com você…",
    starters: ["Meu filho teve uma crise em público…","Batalhas de lição de casa todo dia…","Ele bateu no irmão…","Recusa total de fazer as tarefas…","Tempo de tela causando conflito constante…","Ele mentiu para mim sobre…"],
    sections: { mistaken_goal:["🔍","O Que Está Por Trás do Comportamento"], what_to_do_now:["⚡","O Que Fazer Agora"], script:["💬","Palavras Que Você Pode Dizer"], what_not_to_do:["🚫","O Que Evitar"], long_term:["📅","Acompanhamento Posterior"] },
    meetingSubtitle: "Configure a reunião e siga os passos guiados ao vivo.",
    setupTitle: "Configurar Reunião", setupSubtitle: "Ajuste os tempos antes de começar (minutos por etapa)",
    startMeetingBtn: "▶ Iniciar Reunião",
    stepOfLabel: "Etapa", ofLabel: "de",
    nextStepBtn: "Próxima Etapa →", endMeetingBtn: "⏹ Encerrar & Analisar",
    timeLeftLabel: "restantes nesta etapa", totalLabel: "tempo total",
    scriptLabel: "💬 Script do facilitador",
    transcriptLabel: "📝 Transcrição ao vivo",
    analyzingMsg: "Analisando sua reunião…",
    newMeetingBtn: "Nova Reunião",
    manualFallback: "ou prefere digitar as notas",
    manualLabel: "Escreva ou cole as notas da reunião",
    manualPlaceholder: "Escreva o que foi discutido — elogios, problemas, soluções, atividade divertida…",
    analyzeBtn: "✨ Analisar Reunião",
    meetingSections: { compliments:["💛","Elogios & Agradecimentos"], problems:["🧩","Problemas Discutidos"], solutions:["✅","Soluções & Plano de Ação"], followups:["📅","Follow-ups para a Próxima Reunião"], fun:["🎉","Atividade Divertida Planejada"] },
    pdNote: ["🌿","Notas do Framework de DP"],
    speechUnavailable: "Reconhecimento de voz indisponível — a transcrição ficará vazia, mas o guia da reunião funciona normalmente. Você pode digitar notas ao final.",
    journalSubtitle: "Termine o dia com reflexão. O crescimento como pai/mãe é o objetivo — não a perfeição.",
    journalLabel: "O que aconteceu hoje? O que você notou sobre você mesmo ou seu filho?",
    journalPlaceholder: "Percebi que quando levantei a voz, ela se fechou… / Ele respondeu muito bem quando sentei e perguntei o que estava errado…",
    reflectBtn: "🌱 Refletir com DP", recentLabel: "🗓 Reflexões Recentes",
    reflectionSections: { validation:["💚","Validação"], insight:["💡","Visão da DP"], growth:["🌱","Crescimento"], question:["🤔","Reflita Sobre Isso"] },
    steps: [
      { id:"compliments", icon:"💛", label:"Elogios & Agradecimentos", defaultMin:5,
        tip:"Passem a palavra. Cada pessoa diz um elogio genuíno ou agradecimento a outro membro da família. Sem correções — apenas apreciação.",
        script:"Vamos começar com elogios. Quem quer começar? Diga algo que você aprecia em alguém desta família." },
      { id:"followups", icon:"📋", label:"Follow-ups da Última Reunião", defaultMin:3,
        tip:"Revisem os itens de ação da reunião anterior. Todo mundo cumpriu? Celebrem os acertos. Itens não resolvidos entram na pauta de hoje.",
        script:"Na última reunião combinamos algumas coisas. Como foi? O que conseguimos fazer? O que ainda não aconteceu?" },
      { id:"problems", icon:"🧩", label:"Resolução de Problemas", defaultMin:15,
        tip:"Trabalhem os itens da pauta um por um. Use perguntas de curiosidade: O que aconteceu? Como isso te afetou? Que ideias você tem? Busquem soluções que todos aceitem.",
        script:"Agora vamos olhar nossa pauta. Para cada problema, todos têm vez de falar. Depois fazemos um brainstorm de soluções juntos — nenhuma ideia é errada no início." },
      { id:"plan", icon:"✅", label:"Fazer um Plano & Votar", defaultMin:5,
        tip:"Das ideias geradas, escolham soluções por consenso ou votação. Sejam específicos: quem faz o quê, até quando? Anotem para ter um registro.",
        script:"Quais soluções queremos tentar essa semana? Vamos votar e decidir. Lembrem — todos precisam concordar, ou pelo menos estar dispostos a tentar." },
      { id:"fun", icon:"🎉", label:"Planejar Algo Divertido", defaultMin:2,
        tip:"Toda reunião familiar termina com algo divertido que a família toda espera ansiosamente. Pode ser um filme, jogo, refeição juntos — decidido em conjunto.",
        script:"Agora a melhor parte! Que coisa divertida queremos fazer juntos antes da próxima reunião? Cada um sugere uma ideia." },
    ],
  },
};

// ─── SYSTEM PROMPTS ───────────────────────────────────────────────────────────
const SYSTEM_EN = `You are a Positive Discipline parenting coach trained in the work of Jane Nelsen and Lynn Lott. RESPOND ONLY IN VALID JSON, no markdown fences, no preamble.
CORE: Connection before correction. Mistaken goals (Undue Attention, Misguided Power, Revenge, Assumed Inadequacy). Kind AND firm. Natural/Logical Consequences. Encouragement not praise.
For COACH: {"summary":"...","mistaken_goal":"... or null","what_to_do_now":"...","tool":"...","what_not_to_do":"...","script":"...","long_term":"...","encouragement":"..."}
For MEETING ANALYSIS: {"compliments":"bullet list","problems":"bullet list","solutions":"bullet list with responsible person and deadline","followups":"bullet list","fun":"activity planned","pd_note":"brief PD observation — what went well, what to improve next time"}
For REFLECTION: {"validation":"...","insight":"...","growth":"...","question":"..."}`;

const SYSTEM_PT = `Você é um coach de Disciplina Positiva para pais, treinado no trabalho de Jane Nelsen e Lynn Lott. RESPONDA SEMPRE EM PORTUGUÊS. APENAS JSON VÁLIDO, sem markdown, sem preâmbulo.
NÚCLEO: Conexão antes da correção. Objetivos equivocados (Atenção Indevida, Poder Equivocado, Vingança, Incompetência Assumida). Gentil E firme. Consequências Naturais/Lógicas. Encorajamento não elogio.
Para COACH: {"summary":"...","mistaken_goal":"... ou null","what_to_do_now":"...","tool":"...","what_not_to_do":"...","script":"...","long_term":"...","encouragement":"..."}
Para ANÁLISE DE REUNIÃO: {"compliments":"lista com marcadores","problems":"lista com marcadores","solutions":"lista com marcadores, responsável e prazo","followups":"lista com marcadores","fun":"atividade planejada","pd_note":"breve observação de DP — o que correu bem, o que melhorar na próxima"}
Para REFLEXÃO: {"validation":"...","insight":"...","growth":"...","question":"..."}`;

async function callClaude(messages, lang, systemOverride) {
  const system = systemOverride || (lang === "pt" ? SYSTEM_PT : SYSTEM_EN);
  const res = await fetch("/api/chat", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1500, system, messages }),
  });
  const data = await res.json();
  const text = data.content?.map(b => b.text||"").join("") || "";
  try { return JSON.parse(text.replace(/```json|```/g,"").trim()); }
  catch { return { error: text }; }
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function Spinner({ msg }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"24px 0", color:"#7c6f5e", justifyContent:"center" }}>
      <div style={{ width:20, height:20, border:"2px solid #e8e0d6", borderTop:"2px solid #c17f5a", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
      <span style={{ fontFamily:"Georgia,serif", fontSize:14 }}>{msg}</span>
    </div>
  );
}
function Section({ icon, title, color, children }) {
  return (
    <div style={{ marginBottom:14, padding:"12px 14px", background:color, borderRadius:8 }}>
      <p style={{ fontWeight:700, fontSize:12, color:"#7c6f5e", marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>{icon} {title}</p>
      {children}
    </div>
  );
}
function Tag({ label }) {
  return <span style={{ display:"inline-block", marginTop:6, padding:"3px 10px", background:"#c17f5a22", color:"#8a5030", borderRadius:20, fontSize:12, fontWeight:600 }}>🛠 {label}</span>;
}
const S = {
  subtitle:{ fontFamily:"Georgia,serif", fontSize:14, color:"#7c6f5e", marginBottom:20, lineHeight:1.6 },
  card:{ background:"#fff", border:"1px solid #e8e0d6", borderRadius:12, padding:"20px", marginBottom:16, boxShadow:"0 1px 4px rgba(0,0,0,0.05)" },
  label:{ display:"block", fontSize:12, fontWeight:700, color:"#7c6f5e", textTransform:"uppercase", letterSpacing:0.5, marginBottom:8 },
  chip:{ padding:"6px 14px", borderRadius:20, border:"none", cursor:"pointer", fontSize:13, fontWeight:500 },
  starter:{ padding:"4px 10px", background:"#f5f0ea", border:"1px solid #e8e0d6", borderRadius:16, fontSize:11, color:"#7c6f5e", cursor:"pointer" },
  textarea:{ width:"100%", border:"1px solid #e0d8d0", borderRadius:8, padding:"12px", fontFamily:"Georgia,serif", fontSize:14, color:"#3a3028", resize:"vertical", background:"#faf8f5", boxSizing:"border-box", outline:"none" },
  input:{ border:"1px solid #e0d8d0", borderRadius:8, padding:"10px 12px", fontFamily:"Georgia,serif", fontSize:14, color:"#3a3028", background:"#faf8f5", outline:"none" },
  primaryBtn:{ marginTop:12, padding:"12px 24px", background:"#c17f5a", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:14, fontWeight:700, fontFamily:"Georgia,serif" },
  secondaryBtn:{ padding:"8px 16px", background:"#f5f0ea", color:"#5a4a3a", border:"1px solid #e0d8d0", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600 },
  bodyText:{ fontFamily:"Georgia,serif", fontSize:14, color:"#3a3028", lineHeight:1.6, margin:0 },
  script:{ fontFamily:"Georgia,serif", fontSize:14, color:"#2a4a6a", lineHeight:1.7, borderLeft:"3px solid #c17f5a", paddingLeft:12, margin:0, fontStyle:"italic" },
};

// ─── COACH TAB ────────────────────────────────────────────────────────────────
function CoachTab({ lang }) {
  const t = T[lang];
  const [situation, setSituation] = useState("");
  const [ages, setAges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
  const AGE_IDS = ["under8","tween","teen"];
  const toggleAge = id => setAges(a => a.includes(id) ? a.filter(x=>x!==id) : [...a,id]);
  const handleSubmit = async () => {
    if (!situation.trim()) return;
    setLoading(true); setResult(null);
    const ageLabel = ages.length ? ages.map(id=>t.ages[AGE_IDS.indexOf(id)]).join(", ") : (lang==="pt"?"idade não especificada":"unspecified age");
    const content = lang==="pt" ? `Faixa etária: ${ageLabel}\n\nSituação: ${situation}` : `Age group: ${ageLabel}\n\nSituation: ${situation}`;
    const res = await callClaude([{role:"user",content}], lang);
    setResult(res); setLoading(false);
    setTimeout(()=>resultRef.current?.scrollIntoView({behavior:"smooth",block:"start"}),100);
  };
  return (
    <div>
      <p style={S.subtitle}>{t.coachSubtitle}</p>
      <div style={S.card}>
        <label style={S.label}>{t.ageLabel}</label>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
          {AGE_IDS.map((id,i)=>(
            <button key={id} onPointerDown={()=>toggleAge(id)} style={{...S.chip,background:ages.includes(id)?"#c17f5a":"#f5f0ea",color:ages.includes(id)?"#fff":"#5a4a3a", WebkitTapHighlightColor:"transparent"}}>{t.ages[i]}</button>
          ))}
        </div>
        <label style={S.label}>{t.situationLabel}</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
          {t.starters.map(s=>(
            <button key={s} onPointerDown={()=>setSituation(s)} style={{...S.starter, WebkitTapHighlightColor:"transparent"}}>{s}</button>
          ))}
        </div>
        <textarea value={situation} onChange={e=>setSituation(e.target.value)} onInput={e=>setSituation(e.target.value)} placeholder={t.situationPlaceholder} style={S.textarea} rows={4}/>
        <button onPointerDown={!situation.trim()||loading ? undefined : handleSubmit} style={{...S.primaryBtn,opacity:!situation.trim()||loading?0.5:1, WebkitTapHighlightColor:"transparent"}}>{t.coachBtn}</button>
      </div>
      {loading && <Spinner msg={t.thinkingMsg}/>}
      {result && !result.error && (
        <div ref={resultRef} style={{...S.card,borderLeft:"4px solid #c17f5a"}}>
          <p style={{fontFamily:"Georgia,serif",fontSize:16,color:"#5a4a3a",marginBottom:20,fontStyle:"italic"}}>"{result.summary}"</p>
          {result.mistaken_goal && <Section icon={t.sections.mistaken_goal[0]} title={t.sections.mistaken_goal[1]} color="#f0e8d8"><p style={S.bodyText}>{result.mistaken_goal}</p></Section>}
          <Section icon={t.sections.what_to_do_now[0]} title={t.sections.what_to_do_now[1]} color="#e8f0e8"><p style={S.bodyText}>{result.what_to_do_now}</p>{result.tool&&<Tag label={result.tool}/>}</Section>
          <Section icon={t.sections.script[0]} title={t.sections.script[1]} color="#e8eef5"><blockquote style={S.script}>"{result.script}"</blockquote></Section>
          <Section icon={t.sections.what_not_to_do[0]} title={t.sections.what_not_to_do[1]} color="#f5e8e8"><p style={S.bodyText}>{result.what_not_to_do}</p></Section>
          <Section icon={t.sections.long_term[0]} title={t.sections.long_term[1]} color="#f5f0e0"><p style={S.bodyText}>{result.long_term}</p></Section>
          <div style={{marginTop:16,padding:"12px 16px",background:"#f9f5f0",borderRadius:8}}>
            <p style={{...S.bodyText,color:"#7c6f5e",fontStyle:"italic"}}>💛 {result.encouragement}</p>
          </div>
        </div>
      )}
      {result?.error && <div style={{...S.card,color:"#a04040"}}>{result.error}</div>}
    </div>
  );
}

// ─── MEETING TAB ──────────────────────────────────────────────────────────────
const DEFAULT_STEP_COLORS = ["#fff9e6","#f0f0ff","#e8f0e8","#e8eef5","#fff0e0"];

function MeetingTab({ lang }) {
  const t = T[lang];
  const [phase, setPhase] = useState("setup"); // setup | running | analyzing | done | manual
  const [stepMins, setStepMins] = useState(t.steps.map(s=>s.defaultMin));
  const [currentStep, setCurrentStep] = useState(0);
  const [stepElapsed, setStepElapsed] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [manualText, setManualText] = useState("");
  const [result, setResult] = useState(null);
  const [speechAvail, setSpeechAvail] = useState(true);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const fullTransRef = useRef("");
  const stepTransRef = useRef({});

  const fmt = s => `${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;
  const stepSecs = stepMins[currentStep] * 60;
  const pct = Math.min(100, (stepElapsed / stepSecs) * 100);
  const timeLeft = Math.max(0, stepSecs - stepElapsed);
  const isOverTime = stepElapsed > stepSecs;

  const startSpeech = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setSpeechAvail(false); return; }
    const r = new SR();
    r.continuous = true; r.interimResults = true;
    r.lang = lang==="pt" ? "pt-BR" : "en-US";
    r.onresult = (e) => {
      let final="", interim="";
      for (let i=0;i<e.results.length;i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript+" ";
        else interim += e.results[i][0].transcript;
      }
      fullTransRef.current = final;
      setTranscript(final+interim);
    };
    r.onerror = () => setSpeechAvail(false);
    r.start();
    recognitionRef.current = r;
  };

  const startMeeting = () => {
    fullTransRef.current = ""; stepTransRef.current = {};
    setTranscript(""); setCurrentStep(0); setStepElapsed(0); setTotalElapsed(0);
    setPhase("running");
    startSpeech();
    timerRef.current = setInterval(()=>{
      setStepElapsed(s=>s+1);
      setTotalElapsed(s=>s+1);
    },1000);
  };

  const advanceStep = () => {
    stepTransRef.current[currentStep] = fullTransRef.current;
    if (currentStep < t.steps.length - 1) {
      setCurrentStep(s=>s+1);
      setStepElapsed(0);
    }
  };

  const endMeeting = async () => {
    stepTransRef.current[currentStep] = fullTransRef.current;
    if (recognitionRef.current) { recognitionRef.current.stop(); recognitionRef.current=null; }
    clearInterval(timerRef.current);
    const fullText = Object.entries(stepTransRef.current).map(([i,tx])=>`[${t.steps[i].label}]:\n${tx||"(no transcript)"}`).join("\n\n") + (fullTransRef.current ? `\n\n[Final]:\n${fullTransRef.current}` : "");
    await analyze(fullText || transcript);
  };

  const analyze = async (text) => {
    setPhase("analyzing");
    const content = lang==="pt"
      ? `Transcrição da reunião familiar (estruturada em etapas):\n\n${text}`
      : `Family meeting transcript (structured by step):\n\n${text}`;
    const sys = (lang==="pt"?SYSTEM_PT:SYSTEM_EN)+(lang==="pt"?"\n\nResponda no modo ANÁLISE DE REUNIÃO.":"\n\nRespond in MEETING ANALYSIS mode.");
    const res = await callClaude([{role:"user",content}], lang, sys);
    setResult(res); setPhase("done");
  };

  const reset = () => {
    if (recognitionRef.current) { recognitionRef.current.stop(); recognitionRef.current=null; }
    clearInterval(timerRef.current);
    setPhase("setup"); setCurrentStep(0); setStepElapsed(0); setTotalElapsed(0);
    setTranscript(""); setManualText(""); setResult(null);
    fullTransRef.current=""; stepTransRef.current={};
  };

  useEffect(()=>()=>{ clearInterval(timerRef.current); if(recognitionRef.current) recognitionRef.current.stop(); },[]);

  // ── SETUP ──
  if (phase==="setup") return (
    <div>
      <p style={S.subtitle}>{t.meetingSubtitle}</p>
      <div style={S.card}>
        <p style={{...S.label, marginBottom:4}}>{t.setupTitle}</p>
        <p style={{...S.bodyText,color:"#aaa",fontSize:12,marginBottom:16}}>{t.setupSubtitle}</p>
        {t.steps.map((step,i)=>(
          <div key={step.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<t.steps.length-1?"1px solid #f0ebe3":"none"}}>
            <span style={{fontSize:20,width:28}}>{step.icon}</span>
            <span style={{...S.bodyText,flex:1,fontSize:13}}>{step.label}</span>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <button onClick={()=>setStepMins(m=>m.map((v,j)=>j===i?Math.max(1,v-1):v))} style={{width:28,height:28,borderRadius:"50%",border:"1px solid #e0d8d0",background:"#f5f0ea",cursor:"pointer",fontSize:16,lineHeight:1}}>−</button>
              <span style={{...S.bodyText,fontWeight:700,width:32,textAlign:"center"}}>{stepMins[i]}m</span>
              <button onClick={()=>setStepMins(m=>m.map((v,j)=>j===i?v+1:v))} style={{width:28,height:28,borderRadius:"50%",border:"1px solid #e0d8d0",background:"#f5f0ea",cursor:"pointer",fontSize:16,lineHeight:1}}>+</button>
            </div>
          </div>
        ))}
        <div style={{marginTop:16,padding:"10px 14px",background:"#f9f5f0",borderRadius:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{...S.bodyText,color:"#7c6f5e",fontSize:13}}>{lang==="pt"?"⏱ Total estimado":"⏱ Total estimated"}</span>
          <span style={{...S.bodyText,fontWeight:700,color:"#c17f5a"}}>{stepMins.reduce((a,b)=>a+b,0)} {lang==="pt"?"min":"min"}</span>
        </div>
        <button onClick={startMeeting} style={{...S.primaryBtn,width:"100%",textAlign:"center",marginTop:16,padding:"14px",fontSize:16}}>
          {t.startMeetingBtn}
        </button>
        {!speechAvail && <p style={{...S.bodyText,color:"#b08060",fontSize:12,marginTop:8}}>{t.speechUnavailable}</p>}
      </div>
      <div style={{textAlign:"center"}}>
        <button onClick={()=>setPhase("manual")} style={{background:"none",border:"none",color:"#b0a090",fontSize:12,cursor:"pointer",textDecoration:"underline"}}>{t.manualFallback}</button>
      </div>
    </div>
  );

  // ── RUNNING ──
  if (phase==="running") {
    const step = t.steps[currentStep];
    const isLast = currentStep === t.steps.length-1;
    return (
      <div>
        {/* Overall progress bar */}
        <div style={{display:"flex",gap:4,marginBottom:16}}>
          {t.steps.map((s,i)=>(
            <div key={s.id} style={{flex:1,height:4,borderRadius:2,background:i<currentStep?"#8ab08a":i===currentStep?"#c17f5a":"#e8e0d6",transition:"background 0.3s"}}/>
          ))}
        </div>

        {/* Step header */}
        <div style={{...S.card,borderLeft:`4px solid ${DEFAULT_STEP_COLORS[currentStep]}`,background:"#fff"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div>
              <p style={{fontSize:11,color:"#aaa",margin:0,textTransform:"uppercase",letterSpacing:0.5}}>{t.stepOfLabel} {currentStep+1} {t.ofLabel} {t.steps.length}</p>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,color:"#3a3028",margin:"4px 0 0"}}>{step.icon} {step.label}</h2>
            </div>
            {/* Total elapsed */}
            <div style={{textAlign:"right"}}>
              <p style={{fontSize:11,color:"#aaa",margin:0}}>{t.totalLabel}</p>
              <p style={{fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,color:"#7c6f5e",margin:0}}>{fmt(totalElapsed)}</p>
            </div>
          </div>

          {/* Step timer */}
          <div style={{margin:"16px 0"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontSize:12,color:isOverTime?"#c04040":"#7c6f5e"}}>{isOverTime?(lang==="pt"?"⚠ Tempo esgotado":"⚠ Time's up"):`${fmt(timeLeft)} ${t.timeLeftLabel}`}</span>
              <span style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:isOverTime?"#c04040":"#c17f5a"}}>{fmt(stepElapsed)}</span>
            </div>
            <div style={{height:8,background:"#f0ebe3",borderRadius:4,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${pct}%`,background:isOverTime?"#e08080":"#c17f5a",borderRadius:4,transition:"width 0.5s"}}/>
            </div>
          </div>

          {/* Tip */}
          <div style={{background:"#f9f5f0",borderRadius:8,padding:"10px 14px",marginBottom:12}}>
            <p style={{fontSize:11,fontWeight:700,color:"#7c6f5e",textTransform:"uppercase",letterSpacing:0.5,marginBottom:4}}>📌 {lang==="pt"?"Dica do framework":"Framework tip"}</p>
            <p style={{...S.bodyText,fontSize:13,color:"#5a4a3a"}}>{step.tip}</p>
          </div>

          {/* Script */}
          <div style={{background:"#e8eef5",borderRadius:8,padding:"10px 14px",marginBottom:16}}>
            <p style={{fontSize:11,fontWeight:700,color:"#7c6f5e",textTransform:"uppercase",letterSpacing:0.5,marginBottom:4}}>{t.scriptLabel}</p>
            <p style={{...S.bodyText,fontSize:13,fontStyle:"italic",color:"#2a4a6a"}}>"{step.script}"</p>
          </div>

          {/* Live transcript preview */}
          {speechAvail && transcript && (
            <div style={{maxHeight:80,overflowY:"auto",background:"#faf8f5",border:"1px solid #e8e0d6",borderRadius:8,padding:"8px 12px",marginBottom:16}}>
              <p style={{fontSize:11,color:"#aaa",marginBottom:4}}>{t.transcriptLabel}</p>
              <p style={{...S.bodyText,fontSize:12,color:"#7c6f5e"}}>{transcript.slice(-300)}</p>
            </div>
          )}

          {/* Action buttons */}
          <div style={{display:"flex",gap:8}}>
            {!isLast && (
              <button onClick={advanceStep} style={{...S.primaryBtn,marginTop:0,flex:1,textAlign:"center"}}>
                {t.nextStepBtn}
              </button>
            )}
            <button onClick={endMeeting} style={{...S.primaryBtn,marginTop:0,flex:isLast?2:1,background:"#6b9b6b",textAlign:"center"}}>
              {t.endMeetingBtn}
            </button>
          </div>
        </div>

        {/* Step dots */}
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>
          {t.steps.map((s,i)=>(
            <div key={s.id} title={s.label} style={{width:8,height:8,borderRadius:"50%",background:i<currentStep?"#8ab08a":i===currentStep?"#c17f5a":"#e8e0d6"}}/>
          ))}
        </div>
      </div>
    );
  }

  // ── ANALYZING ──
  if (phase==="analyzing") return (
    <div style={{textAlign:"center",padding:"40px 20px"}}>
      <Spinner msg={t.analyzingMsg}/>
    </div>
  );

  // ── DONE ──
  if (phase==="done" && result && !result.error) return (
    <div>
      <div style={{...S.card,borderLeft:"4px solid #8ab08a"}}>
        {Object.entries(t.meetingSections).map(([key,[icon,title]],idx)=>(
          result[key] ? (
            <Section key={key} icon={icon} title={title} color={DEFAULT_STEP_COLORS[idx]||"#f9f5f0"}>
              <p style={{...S.bodyText,whiteSpace:"pre-line"}}>{result[key]}</p>
            </Section>
          ) : null
        ))}
        {result.pd_note && (
          <Section icon={t.pdNote[0]} title={t.pdNote[1]} color="#f0e8d8">
            <p style={{...S.bodyText,fontStyle:"italic"}}>{result.pd_note}</p>
          </Section>
        )}
      </div>
      <button onClick={reset} style={{...S.secondaryBtn,marginTop:4}}>{t.newMeetingBtn}</button>
    </div>
  );

  // ── MANUAL ──
  if (phase==="manual") return (
    <div>
      <p style={S.subtitle}>{t.meetingSubtitle}</p>
      <div style={S.card}>
        <label style={S.label}>{t.manualLabel}</label>
        <textarea value={manualText} onChange={e=>setManualText(e.target.value)} placeholder={t.manualPlaceholder} style={S.textarea} rows={8}/>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onPointerDown={!manualText.trim() ? undefined : ()=>analyze(manualText)} style={{...S.primaryBtn,opacity:!manualText.trim()?0.5:1, WebkitTapHighlightColor:"transparent"}}>{t.analyzeBtn}</button>
          <button onPointerDown={reset} style={{...S.secondaryBtn, WebkitTapHighlightColor:"transparent"}}>←</button>
        </div>
      </div>
    </div>
  );

  return null;
}

// ─── JOURNAL TAB ──────────────────────────────────────────────────────────────
function JournalTab({ lang }) {
  const t = T[lang];
  const [reflection, setReflection] = useState("");
  const [ages, setAges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [entries, setEntries] = useState([]);
  const AGE_IDS = ["under8","tween","teen"];
  const toggleAge = id => setAges(a => a.includes(id)?a.filter(x=>x!==id):[...a,id]);
  const handleReflect = async () => {
    if (!reflection.trim()) return;
    setLoading(true);
    const ageLabel = ages.length?ages.map(id=>t.ages[AGE_IDS.indexOf(id)]).join(", "):(lang==="pt"?"não especificada":"unspecified");
    const content = lang==="pt"?`Reflexão (idade: ${ageLabel}):\n\n${reflection}`:`Reflection (child age: ${ageLabel}):\n\n${reflection}`;
    const sys = (lang==="pt"?SYSTEM_PT:SYSTEM_EN)+(lang==="pt"?"\n\nResponda no modo REFLEXÃO.":"\n\nRespond in REFLECTION mode.");
    const res = await callClaude([{role:"user",content}],lang,sys);
    setResult(res);
    const date = new Date().toLocaleDateString(lang==="pt"?"pt-BR":"en-US",{month:"short",day:"numeric"});
    setEntries(e=>[{date,text:reflection,insight:res.insight},...e.slice(0,9)]);
    setLoading(false);
  };
  return (
    <div>
      <p style={S.subtitle}>{t.journalSubtitle}</p>
      <div style={S.card}>
        <label style={S.label}>{t.ageLabel}</label>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
          {AGE_IDS.map((id,i)=>(
            <button key={id} onPointerDown={()=>toggleAge(id)} style={{...S.chip,background:ages.includes(id)?"#8ab08a":"#f5f0ea",color:ages.includes(id)?"#fff":"#5a4a3a", WebkitTapHighlightColor:"transparent"}}>{t.ages[i]}</button>
          ))}
        </div>
        <label style={S.label}>{t.journalLabel}</label>
        <textarea value={reflection} onChange={e=>setReflection(e.target.value)} onInput={e=>setReflection(e.target.value)} placeholder={t.journalPlaceholder} style={S.textarea} rows={5}/>
        <button onPointerDown={!reflection.trim()||loading ? undefined : handleReflect} style={{...S.primaryBtn,background:"#6b9b6b",opacity:!reflection.trim()||loading?0.5:1, WebkitTapHighlightColor:"transparent"}}>{t.reflectBtn}</button>
      </div>
      {loading&&<Spinner msg={t.thinkingMsg}/>}
      {result&&!result.error&&(
        <div style={{...S.card,borderLeft:"4px solid #6b9b6b"}}>
          {Object.entries(t.reflectionSections).map(([key,[icon,title]])=>(
            result[key]&&(
              <Section key={key} icon={icon} title={title} color={key==="validation"?"#e8f0e8":key==="insight"?"#f0e8d8":key==="growth"?"#e8eef5":"#f9f5f0"}>
                <p style={{...S.bodyText,fontStyle:key==="question"?"italic":"normal"}}>{result[key]}</p>
              </Section>
            )
          ))}
        </div>
      )}
      {entries.length>0&&(
        <div style={{marginTop:24}}>
          <h3 style={{fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,color:"#7c6f5e",marginBottom:12}}>{t.recentLabel}</h3>
          {entries.map((e,i)=>(
            <div key={i} style={{...S.card,padding:"12px 16px",marginBottom:8}}>
              <p style={{fontSize:11,color:"#aaa",marginBottom:4}}>{e.date}</p>
              <p style={{...S.bodyText,marginBottom:4}}>{e.text.substring(0,120)}{e.text.length>120?"...":""}</p>
              {e.insight&&<p style={{...S.bodyText,color:"#8a5030",fontSize:12,fontStyle:"italic"}}>↳ {e.insight?.substring(0,100)}...</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("pt");
  const [tab, setTab] = useState("coach");
  const t = T[lang];
  return (
    <div style={{minHeight:"100vh",maxHeight:"100vh",overflowY:"auto",background:"#f5f0ea",fontFamily:"Georgia,serif",WebkitOverflowScrolling:"touch"}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}textarea:focus,input:focus{border-color:#c17f5a!important}`}</style>
      <div style={{background:"#3a3028",padding:"20px 20px 14px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:16,right:16,display:"flex",gap:4}}>
          {["pt","en"].map(l=>(
            <button key={l} onClick={()=>setLang(l)} style={{padding:"4px 10px",borderRadius:12,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,background:lang===l?"#f5c87a":"#5a4a3a",color:lang===l?"#3a3028":"#b0a090"}}>
              {l==="pt"?"🇧🇷 PT":"🇺🇸 EN"}
            </button>
          ))}
        </div>
        <h1 style={{color:"#f5f0ea",fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,margin:0}}>🌿 {t.appTitle}</h1>
        <p style={{color:"#b0a090",fontSize:11,marginTop:4,letterSpacing:1,textTransform:"uppercase"}}>{t.appSubtitle}</p>
      </div>
      <div style={{display:"flex",background:"#2d251e",padding:"0 12px"}}>
        {t.tabIds.map((id,i)=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"12px 4px",background:"none",border:"none",cursor:"pointer",color:tab===id?"#f5c87a":"#9a8a7a",borderBottom:tab===id?"2px solid #f5c87a":"2px solid transparent",fontSize:11,fontWeight:tab===id?700:400}}>
            {t.tabs[i]}
          </button>
        ))}
      </div>
      <div style={{maxWidth:640,margin:"0 auto",padding:"20px 16px"}}>
        {tab==="coach"&&<CoachTab lang={lang}/>}
        {tab==="meeting"&&<MeetingTab lang={lang}/>}
        {tab==="journal"&&<JournalTab lang={lang}/>}
      </div>
      <div style={{textAlign:"center",padding:"20px",color:"#b0a090",fontSize:11}}><em>{t.footer}</em></div>
    </div>
  );
}
