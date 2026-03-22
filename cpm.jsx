import { useState, useMemo } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
:root{
  --bg:#07091280;--sf:#0B0F1C;--cd:#111827;--cd2:#16202E;
  --bd:#1B2740;--bd2:#243352;
  --ac:#00CFFF;--ac2:#FF6B35;--ac3:#A78BFA;
  --ok:#10D98E;--wn:#F59E0B;--er:#F43F5E;
  --tx:#DDE6F0;--txm:#6B82A0;--txd:#324058;
}
body{font-family:'IBM Plex Sans',sans-serif;background:#07091299;color:var(--tx)}
.app{display:flex;height:100vh;overflow:hidden;background:var(--sf)}
/* sidebar */
.sb{width:208px;min-width:208px;background:#0A0E1A;border-right:1px solid var(--bd);display:flex;flex-direction:column}
.sb-logo{padding:18px 16px 15px;border-bottom:1px solid var(--bd)}
.sb-logo h1{font-family:'Syne',sans-serif;font-size:19px;font-weight:800;color:var(--ac);letter-spacing:-.5px}
.sb-logo p{font-size:8.5px;color:var(--txm);text-transform:uppercase;letter-spacing:2px;margin-top:3px}
.sb-nav{padding:8px 0;flex:1;overflow-y:auto}
.sb-sec{font-size:8.5px;color:var(--txd);text-transform:uppercase;letter-spacing:2px;padding:12px 14px 3px}
.nb{display:flex;align-items:center;gap:9px;padding:8px 14px;cursor:pointer;font-size:12.5px;color:var(--txm);border-left:2px solid transparent;transition:all .12s;width:100%;background:none;border-top:none;border-right:none;border-bottom:none;font-family:'IBM Plex Sans',sans-serif;text-align:left}
.nb:hover{color:var(--tx);background:rgba(255,255,255,.025)}
.nb.on{color:var(--ac);background:rgba(0,207,255,.07);border-left-color:var(--ac);font-weight:500}
/* main */
.main{flex:1;overflow-y:auto;background:var(--sf)}
.pg{padding:24px 26px}
.ph{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px}
.ph-l h2{font-family:'Syne',sans-serif;font-size:21px;font-weight:700}
.ph-l p{color:var(--txm);font-size:11.5px;margin-top:3px}
/* grids */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
/* cards */
.cd{background:var(--cd);border:1px solid var(--bd);border-radius:9px;padding:16px}
.cd-sm{background:var(--cd);border:1px solid var(--bd);border-radius:8px;padding:11px 14px}
.ct{font-family:'Syne',sans-serif;font-size:10px;font-weight:700;color:var(--txm);text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px}
/* stats */
.sn{font-family:'IBM Plex Mono',monospace;font-size:28px;font-weight:500;line-height:1.1}
.sl{font-size:10px;color:var(--txm);margin-top:5px;text-transform:uppercase;letter-spacing:.5px}
/* table */
.tbl{width:100%;border-collapse:collapse;font-size:12px}
.tbl th{text-align:left;padding:6px 9px;color:var(--txm);font-size:9.5px;text-transform:uppercase;letter-spacing:.8px;border-bottom:1px solid var(--bd);font-weight:500}
.tbl td{padding:8px 9px;border-bottom:1px solid var(--bd);vertical-align:middle}
.tbl tr:last-child td{border-bottom:none}
.tbl tr:hover td{background:rgba(255,255,255,.012)}
/* avatar */
.av{width:27px;height:27px;border-radius:6px;background:rgba(0,207,255,.1);color:var(--ac);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;font-family:'IBM Plex Mono',monospace;flex-shrink:0}
/* badges */
.b{display:inline-block;padding:1.5px 6px;border-radius:3px;font-size:9.5px;font-weight:600;font-family:'IBM Plex Mono',monospace;white-space:nowrap}
.bb{background:rgba(0,207,255,.12);color:var(--ac)}
.bo{background:rgba(255,107,53,.12);color:var(--ac2)}
.bg{background:rgba(16,217,142,.12);color:var(--ok)}
.by{background:rgba(245,158,11,.12);color:var(--wn)}
.br{background:rgba(244,63,94,.12);color:var(--er)}
.bz{background:rgba(107,130,160,.1);color:var(--txm)}
.bp{background:rgba(167,139,250,.12);color:var(--ac3)}
/* buttons */
.btn{display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:6px;border:none;cursor:pointer;font-size:11.5px;font-weight:500;font-family:'IBM Plex Sans',sans-serif;transition:all .12s}
.btn-p{background:var(--ac);color:#000}
.btn-p:hover{background:#1AE0FF}
.btn-o{background:transparent;color:var(--txm);border:1px solid var(--bd)}
.btn-o:hover{border-color:var(--ac);color:var(--ac)}
.btn-s{padding:3px 8px;font-size:10.5px}
/* input */
.inp{background:#0A0E1A;border:1px solid var(--bd);color:var(--tx);padding:6px 9px;border-radius:6px;font-size:12px;font-family:'IBM Plex Sans',sans-serif;outline:none;transition:border .12s}
.inp:focus{border-color:var(--ac)}
select.inp option{background:#111827}
/* progress */
.pb{height:4px;background:var(--bd);border-radius:2px;overflow:hidden}
.pf{height:100%;border-radius:2px;background:var(--ac)}
/* rows */
.row{display:flex;align-items:center;gap:8px}
.f1{flex:1}
.cr{display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--bd)}
.cr:last-child{border-bottom:none}
/* alerts */
.al{padding:8px 11px;border-radius:6px;font-size:11.5px;margin-bottom:7px;line-height:1.4}
.alw{background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);color:var(--wn)}
.ale{background:rgba(244,63,94,.08);border:1px solid rgba(244,63,94,.2);color:var(--er)}
.ali{background:rgba(0,207,255,.06);border:1px solid rgba(0,207,255,.16);color:var(--ac)}
/* country chip */
.cc{display:inline-flex;align-items:center;gap:4px;padding:3px 7px;border-radius:4px;font-size:11px;background:var(--cd);border:1px solid var(--bd);margin:2px;cursor:pointer;transition:all .12s;user-select:none}
.cc.on{border-color:var(--ac);color:var(--ac);background:rgba(0,207,255,.07)}
/* misc */
.mono{font-family:'IBM Plex Mono',monospace}
.txm{color:var(--txm)}
.txs{font-size:11px;color:var(--txm)}
.ms-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:2px}
`;

/* ─── DATA ─────────────────────────────────── */
const COUNTRIES = [
  {id:'BR',name:'Brasil',flag:'🇧🇷'},
  {id:'IN',name:'Índia',flag:'🇮🇳'},
  {id:'MY',name:'Malásia',flag:'🇲🇾'},
  {id:'TW',name:'Taiwan',flag:'🇹🇼'},
  {id:'ZA',name:'África do Sul',flag:'🇿🇦'},
  {id:'ID',name:'Indonésia',flag:'🇮🇩'},
  {id:'PH',name:'Filipinas',flag:'🇵🇭'},
  {id:'KE',name:'Quênia',flag:'🇰🇪'},
  {id:'KZ',name:'Cazaquistão',flag:'🇰🇿'},
];

const HOLIDAYS = {
  BR:[
    {date:'2026-01-01',name:'Ano Novo'},{date:'2026-02-16',name:'Carnaval'},{date:'2026-02-17',name:'Carnaval (2º dia)'},
    {date:'2026-04-03',name:'Sexta-Feira Santa'},{date:'2026-04-21',name:'Tiradentes'},{date:'2026-05-01',name:'Dia do Trabalho'},
    {date:'2026-06-04',name:'Corpus Christi'},{date:'2026-09-07',name:'Independência'},{date:'2026-10-12',name:'N.Sra.Aparecida'},
    {date:'2026-11-02',name:'Finados'},{date:'2026-11-15',name:'Proclamação da República'},{date:'2026-12-25',name:'Natal'},
  ],
  IN:[
    {date:'2026-01-26',name:'Republic Day'},{date:'2026-03-03',name:'Holi'},{date:'2026-03-20',name:'Eid al-Fitr'},
    {date:'2026-04-03',name:'Good Friday'},{date:'2026-04-14',name:'Dr. Ambedkar Jayanti'},{date:'2026-05-01',name:'Maharashtra Day'},
    {date:'2026-05-27',name:'Eid al-Adha'},{date:'2026-08-15',name:'Independence Day'},{date:'2026-10-02',name:'Gandhi Jayanti'},
    {date:'2026-10-17',name:'Diwali'},{date:'2026-12-25',name:'Christmas'},
  ],
  MY:[
    {date:'2026-01-01',name:"New Year's Day"},{date:'2026-02-17',name:'Chinese New Year'},{date:'2026-02-18',name:'Chinese New Year (2nd)'},
    {date:'2026-03-20',name:'Hari Raya Aidilfitri'},{date:'2026-03-21',name:'Hari Raya Aidilfitri (2nd)'},{date:'2026-05-01',name:'Labour Day'},
    {date:'2026-05-19',name:'Wesak Day'},{date:'2026-05-27',name:'Hari Raya Haji'},{date:'2026-06-01',name:"Agong's Birthday"},
    {date:'2026-08-31',name:'National Day'},{date:'2026-09-16',name:'Malaysia Day'},{date:'2026-12-25',name:'Christmas'},
  ],
  TW:[
    {date:'2026-01-01',name:'Founding Day'},{date:'2026-02-17',name:'Chinese New Year Eve'},{date:'2026-02-19',name:'Spring Festival'},
    {date:'2026-02-28',name:'228 Memorial Day'},{date:'2026-04-04',name:'Tomb Sweeping Day'},{date:'2026-06-19',name:'Dragon Boat Festival'},
    {date:'2026-09-27',name:'Mid-Autumn Festival'},{date:'2026-10-10',name:'National Day'},
  ],
  ZA:[
    {date:'2026-01-01',name:"New Year's Day"},{date:'2026-03-21',name:'Human Rights Day'},{date:'2026-04-03',name:'Good Friday'},
    {date:'2026-04-06',name:'Family Day'},{date:'2026-04-27',name:'Freedom Day'},{date:'2026-05-01',name:"Workers' Day"},
    {date:'2026-06-16',name:'Youth Day'},{date:'2026-08-10',name:"National Women's Day"},{date:'2026-09-24',name:'Heritage Day'},
    {date:'2026-12-16',name:'Day of Reconciliation'},{date:'2026-12-25',name:'Christmas'},{date:'2026-12-26',name:'Day of Goodwill'},
  ],
  ID:[
    {date:'2026-01-01',name:"New Year's Day"},{date:'2026-02-17',name:'Chinese New Year'},{date:'2026-03-20',name:'Idul Fitri'},
    {date:'2026-03-21',name:'Idul Fitri (2nd)'},{date:'2026-04-03',name:'Good Friday'},{date:'2026-05-01',name:'Labour Day'},
    {date:'2026-05-14',name:'Ascension Day'},{date:'2026-05-19',name:'Waisak'},{date:'2026-05-27',name:'Idul Adha'},
    {date:'2026-08-17',name:'Independence Day'},{date:'2026-12-25',name:'Christmas'},
  ],
  PH:[
    {date:'2026-01-01',name:"New Year's Day"},{date:'2026-04-02',name:'Maundy Thursday'},{date:'2026-04-03',name:'Good Friday'},
    {date:'2026-04-04',name:'Black Saturday'},{date:'2026-05-01',name:'Labour Day'},{date:'2026-06-12',name:'Independence Day'},
    {date:'2026-08-31',name:'National Heroes Day'},{date:'2026-11-01',name:"All Saints' Day"},{date:'2026-11-30',name:'Bonifacio Day'},
    {date:'2026-12-25',name:'Christmas Day'},{date:'2026-12-30',name:'Rizal Day'},
  ],
  KE:[
    {date:'2026-01-01',name:"New Year's Day"},{date:'2026-04-03',name:'Good Friday'},{date:'2026-04-06',name:'Easter Monday'},
    {date:'2026-05-01',name:'Labour Day'},{date:'2026-06-01',name:'Madaraka Day'},{date:'2026-10-10',name:'Huduma Day'},
    {date:'2026-10-20',name:'Mashujaa Day'},{date:'2026-12-12',name:'Jamhuri Day'},{date:'2026-12-25',name:'Christmas'},
    {date:'2026-12-26',name:'Boxing Day'},
  ],
  KZ:[
    {date:'2026-01-01',name:'New Year'},{date:'2026-01-02',name:'New Year (2nd)'},{date:'2026-03-08',name:"Women's Day"},
    {date:'2026-03-21',name:'Nauryz'},{date:'2026-03-22',name:'Nauryz'},{date:'2026-03-23',name:'Nauryz'},
    {date:'2026-05-01',name:'Unity Day'},{date:'2026-05-07',name:"Defender's Day"},{date:'2026-05-09',name:'Victory Day'},
    {date:'2026-07-06',name:'Capital City Day'},{date:'2026-08-30',name:'Constitution Day'},
    {date:'2026-12-16',name:'Independence Day'},{date:'2026-12-17',name:'Independence Day (2nd)'},
  ],
};

const initTeam = [
  {id:1,name:'Ana Oliveira',role:'Engenheira de Qualidade',country:'BR',avatar:'AO'},
  {id:2,name:'Carlos Mendes',role:'Gerente de Projetos',country:'BR',avatar:'CM'},
  {id:3,name:'Priya Sharma',role:'Analista de Processos',country:'IN',avatar:'PS'},
  {id:4,name:'Ahmad Razak',role:'Especialista Técnico',country:'MY',avatar:'AR'},
  {id:5,name:'Wei Chen',role:'Analista de Dados',country:'TW',avatar:'WC'},
  {id:6,name:'Sipho Dlamini',role:'Coordenador Regional',country:'ZA',avatar:'SD'},
  {id:7,name:'Budi Santoso',role:'Engenheiro de Campo',country:'ID',avatar:'BS'},
];

const initAbsences = [
  {id:1,memberId:1,type:'Atestado Médico',startDate:'2026-03-10',endDate:'2026-03-12',note:'Gripe'},
  {id:2,memberId:3,type:'Pessoal',startDate:'2026-03-18',endDate:'2026-03-18',note:''},
  {id:3,memberId:5,type:'Atestado Médico',startDate:'2026-02-20',endDate:'2026-02-21',note:''},
  {id:4,memberId:1,type:'Atestado Médico',startDate:'2026-02-03',endDate:'2026-02-03',note:''},
  {id:5,memberId:7,type:'Pessoal',startDate:'2026-03-25',endDate:'2026-03-25',note:''},
  {id:6,memberId:1,type:'Atestado Médico',startDate:'2026-01-15',endDate:'2026-01-15',note:''},
];

const initVacations = [
  {id:1,memberId:2,startDate:'2026-04-07',endDate:'2026-04-18',status:'Aprovado',note:'Viagem em família'},
  {id:2,memberId:1,startDate:'2026-07-13',endDate:'2026-07-24',status:'Aprovado',note:''},
  {id:3,memberId:4,startDate:'2026-05-04',endDate:'2026-05-15',status:'Pendente',note:''},
  {id:4,memberId:6,startDate:'2026-08-03',endDate:'2026-08-14',status:'Aprovado',note:''},
];

const initProjects = [
  {id:1,name:'Implementação ERP v3',countries:['BR','IN','MY'],startDate:'2026-01-15',endDate:'2026-06-30',status:'Em andamento',
    milestones:[
      {id:1,name:'Kick-off',date:'2026-01-15',done:true},{id:2,name:'Análise de Requisitos',date:'2026-02-28',done:true},
      {id:3,name:'Desenvolvimento',date:'2026-04-30',done:false},{id:4,name:'UAT',date:'2026-05-31',done:false},
      {id:5,name:'Go-live',date:'2026-06-30',done:false},
    ]},
  {id:2,name:'Rollout Sistema de Qualidade',countries:['ZA','KE','ID'],startDate:'2026-03-01',endDate:'2026-09-30',status:'Em andamento',
    milestones:[
      {id:1,name:'Diagnóstico',date:'2026-03-15',done:true},{id:2,name:'Treinamentos',date:'2026-05-31',done:false},
      {id:3,name:'Piloto',date:'2026-07-31',done:false},{id:4,name:'Expansão',date:'2026-09-30',done:false},
    ]},
  {id:3,name:'Auditoria Integrada',countries:['TW','PH','KZ'],startDate:'2026-05-01',endDate:'2026-08-31',status:'Planejado',
    milestones:[
      {id:1,name:'Preparação',date:'2026-05-31',done:false},{id:2,name:'Execução',date:'2026-07-15',done:false},
      {id:3,name:'Relatório Final',date:'2026-08-31',done:false},
    ]},
];

const initTravels = [
  {id:1,memberId:2,destination:'Mumbai, Índia',country:'IN',purpose:'Kick-off ERP',startDate:'2026-04-22',endDate:'2026-04-26',status:'Confirmado'},
  {id:2,memberId:1,destination:'Kuala Lumpur, Malásia',country:'MY',purpose:'Auditoria Fornecedor',startDate:'2026-05-11',endDate:'2026-05-15',status:'Aprovado'},
  {id:3,memberId:3,destination:'Johannesburg, África do Sul',country:'ZA',purpose:'Treinamento Local',startDate:'2026-06-02',endDate:'2026-06-06',status:'Planejado'},
  {id:4,memberId:5,destination:'Taipei, Taiwan',country:'TW',purpose:'Reunião Fornecedor',startDate:'2026-05-25',endDate:'2026-05-29',status:'Planejado'},
];

const initReminders = [
  {id:1,title:'Follow-up relatório ERP',assignee:1,dueDate:'2026-03-28',priority:'Alta',done:false,note:'Verificar status com Priya'},
  {id:2,title:'Aprovação férias Ahmad',assignee:2,dueDate:'2026-03-25',priority:'Média',done:false,note:''},
  {id:3,title:'Enviar pauta reunião semanal',assignee:2,dueDate:'2026-03-21',priority:'Baixa',done:true,note:''},
  {id:4,title:'Revisão de KPIs Q1',assignee:1,dueDate:'2026-04-02',priority:'Alta',done:false,note:'Incluir dados de absenteísmo'},
  {id:5,title:'Confirmação de visto — viagem MY',assignee:1,dueDate:'2026-04-01',priority:'Alta',done:false,note:''},
  {id:6,title:'Relatório mensal fevereiro',assignee:2,dueDate:'2026-03-10',priority:'Média',done:false,note:''},
];

const initBlockers = [
  {id:1,title:'Atraso na aprovação de licenças de software',projectId:1,severity:'Alto',owner:2,status:'Aberto',date:'2026-03-10',resolution:'2026-04-15',note:'Aguardando TI'},
  {id:2,title:'Falta de recurso técnico na Malásia',projectId:1,severity:'Médio',owner:1,status:'Em tratativa',date:'2026-03-05',resolution:'2026-04-20',note:'Buscando parceiro local'},
  {id:3,title:'Conflito de calendário com feriados locais',projectId:2,severity:'Baixo',owner:2,status:'Resolvido',date:'2026-02-20',resolution:'2026-03-01',note:'Agenda ajustada'},
  {id:4,title:'Documento de requisitos incompleto',projectId:3,severity:'Alto',owner:3,status:'Aberto',date:'2026-03-18',resolution:'',note:'Aguardando stakeholders'},
];

/* ─── HELPERS ──────────────────────────────── */
const TODAY = '2026-03-22';
const fmt = d => { if(!d) return '—'; const [y,m,day]=d.split('-'); return `${day}/${m}/${y}`; };
const cflag = id => COUNTRIES.find(c=>c.id===id)?.flag||'';
const cname = id => COUNTRIES.find(c=>c.id===id)?.name||id;
const mname = (id,team) => team.find(m=>m.id===id)?.name||'N/A';
const mavatar = (id,team) => team.find(m=>m.id===id)?.avatar||'?';
const addDays = (d,n) => { const dt=new Date(d); dt.setDate(dt.getDate()+n); return dt.toISOString().split('T')[0]; };
const daysDiff = (a,b) => Math.round((new Date(b)-new Date(a))/86400000);
const MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

/* ─── SIDEBAR ──────────────────────────────── */
function Sidebar({tab,setTab}){
  const nav=[
    {id:'dashboard',icon:'◈',label:'Dashboard'},
    {sec:'Equipe'},
    {id:'absences',icon:'⊘',label:'Ausências'},
    {id:'vacations',icon:'⊙',label:'Férias'},
    {id:'holidays',icon:'◎',label:'Feriados'},
    {sec:'Operações'},
    {id:'projects',icon:'⊞',label:'Projetos'},
    {id:'travels',icon:'◷',label:'Viagens'},
    {sec:'Gestão'},
    {id:'reminders',icon:'◉',label:'Lembretes'},
    {id:'blockers',icon:'⊗',label:'Bloqueios'},
    {id:'risk',icon:'◆',label:'Radar de Risco'},
  ];
  return(
    <div className="sb">
      <div className="sb-logo">
        <h1>CPM</h1>
        <p>Change Point Management</p>
      </div>
      <div className="sb-nav">
        {nav.map((n,i)=>n.sec?(
          <div key={i} className="sb-sec">{n.sec}</div>
        ):(
          <button key={n.id} className={`nb${tab===n.id?' on':''}`} onClick={()=>setTab(n.id)}>
            <span style={{fontFamily:'monospace',fontSize:14}}>{n.icon}</span>{n.label}
          </button>
        ))}
      </div>
      <div style={{padding:'10px 14px 14px',borderTop:'1px solid var(--bd)'}}>
        <div style={{fontSize:10,color:'var(--txd)',fontFamily:'IBM Plex Mono',marginBottom:3}}>{TODAY}</div>
        <div style={{fontSize:10,color:'var(--txm)'}}>7 membros · 9 países</div>
      </div>
    </div>
  );
}

/* ─── DASHBOARD ────────────────────────────── */
function Dashboard({team,absences,vacations,projects,travels,reminders,blockers}){
  const in30=addDays(TODAY,30);
  const thisMonth=TODAY.substring(0,7);
  const openB=blockers.filter(b=>b.status!=='Resolvido').length;
  const overdueR=reminders.filter(r=>!r.done&&r.dueDate<TODAY).length;
  const activeP=projects.filter(p=>p.status==='Em andamento').length;
  const mAbsences=absences.filter(a=>a.startDate.startsWith(thisMonth)).length;

  const upcoming=useMemo(()=>{
    const ev=[];
    absences.filter(a=>a.startDate>=TODAY&&a.startDate<=in30).forEach(a=>ev.push({date:a.startDate,type:'Ausência',label:`${mname(a.memberId,team)} — ${a.type}`,cls:'by'}));
    vacations.filter(v=>v.startDate>=TODAY&&v.startDate<=in30).forEach(v=>ev.push({date:v.startDate,type:'Férias',label:`${mname(v.memberId,team)}`,cls:'bb'}));
    travels.filter(t=>t.startDate>=TODAY&&t.startDate<=in30).forEach(t=>ev.push({date:t.startDate,type:'Viagem',label:`${mname(t.memberId,team)} → ${t.destination}`,cls:'bp'}));
    reminders.filter(r=>!r.done&&r.dueDate>=TODAY&&r.dueDate<=in30).forEach(r=>ev.push({date:r.dueDate,type:'Lembrete',label:r.title,cls:r.priority==='Alta'?'br':'bz'}));
    return ev.sort((a,b)=>a.date.localeCompare(b.date)).slice(0,12);
  },[absences,vacations,travels,reminders,team]);

  return(
    <div className="pg">
      <div className="ph">
        <div className="ph-l"><h2>Dashboard</h2><p>Visão geral operacional · {fmt(TODAY)}</p></div>
      </div>
      <div className="g4" style={{marginBottom:14}}>
        {[
          {label:'Membros',val:team.length,color:'var(--ac)'},
          {label:'Ausências / mês',val:mAbsences,color:'var(--wn)'},
          {label:'Projetos ativos',val:activeP,color:'var(--ok)'},
          {label:'Bloqueios abertos',val:openB,color:openB>0?'var(--er)':'var(--ok)'},
        ].map(s=>(
          <div key={s.label} className="cd" style={{textAlign:'center',padding:'14px 10px'}}>
            <div className="sn" style={{color:s.color,fontSize:30}}>{s.val}</div>
            <div className="sl">{s.label}</div>
          </div>
        ))}
      </div>
      {overdueR>0&&<div className="al ale" style={{marginBottom:12}}>⚠ {overdueR} lembrete(s) vencido(s) — acesse a seção Lembretes</div>}
      <div className="g2" style={{alignItems:'start'}}>
        <div className="cd">
          <div className="ct">Próximos 30 dias</div>
          {upcoming.length===0?<p className="txs">Nenhum evento próximo.</p>:upcoming.map((ev,i)=>(
            <div key={i} className="cr">
              <span className="mono txs" style={{minWidth:75,flexShrink:0}}>{fmt(ev.date)}</span>
              <span className={`b ${ev.cls}`}>{ev.type}</span>
              <span style={{fontSize:11.5,flex:1}}>{ev.label}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="cd" style={{marginBottom:12}}>
            <div className="ct">Projetos — Progresso</div>
            {projects.map(p=>{
              const done=p.milestones.filter(m=>m.done).length;
              const pct=Math.round(done/p.milestones.length*100);
              return(
                <div key={p.id} style={{marginBottom:13}}>
                  <div className="row" style={{marginBottom:4}}>
                    <span style={{fontSize:12.5,flex:1,fontWeight:500}}>{p.name}</span>
                    <span className={`b ${p.status==='Em andamento'?'bb':p.status==='Planejado'?'bz':'bg'}`}>{p.status}</span>
                  </div>
                  <div className="row" style={{marginBottom:4,gap:5}}>
                    {p.countries.map(c=><span key={c} title={cname(c)}>{cflag(c)}</span>)}
                    <span className="txs">{done}/{p.milestones.length} ms</span>
                    <span className="mono txs" style={{marginLeft:'auto'}}>{pct}%</span>
                  </div>
                  <div className="pb"><div className="pf" style={{width:`${pct}%`}}/></div>
                </div>
              );
            })}
          </div>
          <div className="cd">
            <div className="ct">Bloqueios em Aberto</div>
            {blockers.filter(b=>b.status!=='Resolvido').length===0
              ?<p style={{fontSize:11.5,color:'var(--ok)'}}>✓ Nenhum bloqueio aberto</p>
              :blockers.filter(b=>b.status!=='Resolvido').map(b=>(
                <div key={b.id} className="cr">
                  <span className={`b ${b.severity==='Alto'?'br':b.severity==='Médio'?'by':'bz'}`}>{b.severity}</span>
                  <span style={{fontSize:11.5,flex:1}}>{b.title}</span>
                  <span className={`b ${b.status==='Aberto'?'br':'by'}`}>{b.status}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── AUSÊNCIAS ─────────────────────────────── */
function TeamAbsences({team,absences,setAbsences}){
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({memberId:'',type:'Atestado Médico',startDate:'',endDate:'',note:''});

  const stats=useMemo(()=>team.map(m=>({
    ...m,
    total:absences.filter(a=>a.memberId===m.id).length,
    recent:absences.filter(a=>a.memberId===m.id&&a.startDate>addDays(TODAY,-90)).length,
  })).sort((a,b)=>b.total-a.total),[team,absences]);

  const alerts=useMemo(()=>{
    const r=[];
    team.forEach(m=>{
      const rec=absences.filter(a=>a.memberId===m.id&&a.startDate>addDays(TODAY,-90));
      if(rec.length>=3) r.push(`${m.name} teve ${rec.length} ausências nos últimos 90 dias`);
      const mons=rec.filter(a=>new Date(a.startDate+' 12:00').getDay()===1);
      if(mons.length>=2) r.push(`${m.name}: padrão de ausência às segundas-feiras detectado (${mons.length}x)`);
    });
    return r;
  },[team,absences]);

  const add=()=>{
    if(!form.memberId||!form.startDate) return;
    setAbsences(p=>[...p,{...form,id:Date.now(),memberId:parseInt(form.memberId),endDate:form.endDate||form.startDate}]);
    setForm({memberId:'',type:'Atestado Médico',startDate:'',endDate:'',note:''});
    setShow(false);
  };

  return(
    <div className="pg">
      <div className="ph">
        <div className="ph-l"><h2>Ausências</h2><p>Histórico e análise de absenteísmo</p></div>
        <button className="btn btn-p" onClick={()=>setShow(!show)}>+ Registrar</button>
      </div>
      {alerts.length>0&&<div style={{marginBottom:14}}>{alerts.map((a,i)=><div key={i} className="al alw">⚠ {a}</div>)}</div>}
      {show&&(
        <div className="cd" style={{marginBottom:14}}>
          <div className="ct">Nova Ausência</div>
          <div className="g2" style={{gap:8,marginBottom:8}}>
            <select className="inp" value={form.memberId} onChange={e=>setForm({...form,memberId:e.target.value})}>
              <option value="">Selecionar membro...</option>
              {team.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <select className="inp" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
              {['Atestado Médico','Pessoal','Férias','Licença','Outros'].map(t=><option key={t}>{t}</option>)}
            </select>
            <input className="inp" type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})} placeholder="Início"/>
            <input className="inp" type="date" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})} placeholder="Fim (opcional)"/>
          </div>
          <input className="inp" style={{width:'100%',marginBottom:8}} value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder="Observação..."/>
          <div className="row"><button className="btn btn-p" onClick={add}>Salvar</button><button className="btn btn-o" onClick={()=>setShow(false)}>Cancelar</button></div>
        </div>
      )}
      <div className="g2" style={{alignItems:'start'}}>
        <div className="cd">
          <div className="ct">Registro ({absences.length})</div>
          <table className="tbl">
            <thead><tr><th>Membro</th><th>Tipo</th><th>Período</th><th>Obs</th></tr></thead>
            <tbody>
              {[...absences].sort((a,b)=>b.startDate.localeCompare(a.startDate)).map(ab=>(
                <tr key={ab.id}>
                  <td><div className="row"><div className="av">{mavatar(ab.memberId,team)}</div><span>{mname(ab.memberId,team)}</span></div></td>
                  <td><span className={`b ${ab.type==='Atestado Médico'?'br':ab.type==='Férias'?'bb':'bz'}`}>{ab.type}</span></td>
                  <td><span className="mono txs">{fmt(ab.startDate)}{ab.endDate&&ab.endDate!==ab.startDate?` → ${fmt(ab.endDate)}`:''}</span></td>
                  <td><span className="txs">{ab.note||'—'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cd">
          <div className="ct">Índice por Membro</div>
          {stats.map(m=>(
            <div key={m.id} style={{marginBottom:14}}>
              <div className="row" style={{marginBottom:4}}>
                <div className="av">{m.avatar}</div>
                <div className="f1"><div style={{fontSize:12.5}}>{m.name}</div><div className="txs">{m.role}</div></div>
                <span className={`b ${m.total>=3?'br':m.total>=1?'by':'bg'}`}>{m.total} ausência{m.total!==1?'s':''}</span>
              </div>
              {m.recent>0&&<div className="txs" style={{paddingLeft:35}}>⚡ {m.recent} nos últimos 90 dias</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── FÉRIAS ────────────────────────────────── */
function VacationPlanner({team,vacations,setVacations}){
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({memberId:'',startDate:'',endDate:'',note:''});

  const alerts=useMemo(()=>{
    const r=[];
    vacations.filter(v=>v.startDate>=TODAY).forEach(v1=>{
      const over=vacations.filter(v2=>v2.id!==v1.id&&v2.startDate<=v1.endDate&&(v2.endDate||v2.startDate)>=v1.startDate);
      if(over.length>=2) r.push(`${mname(v1.memberId,team)} + ${over.length} outros fora ao mesmo tempo (${fmt(v1.startDate)})`);
    });
    return [...new Set(r)];
  },[vacations,team]);

  const add=()=>{
    if(!form.memberId||!form.startDate||!form.endDate) return;
    setVacations(p=>[...p,{...form,id:Date.now(),memberId:parseInt(form.memberId),status:'Pendente'}]);
    setForm({memberId:'',startDate:'',endDate:'',note:''});
    setShow(false);
  };
  const upd=(id,s)=>setVacations(p=>p.map(v=>v.id===id?{...v,status:s}:v));

  return(
    <div className="pg">
      <div className="ph">
        <div className="ph-l"><h2>Férias</h2><p>Planejamento e aprovações de férias</p></div>
        <button className="btn btn-p" onClick={()=>setShow(!show)}>+ Planejar</button>
      </div>
      {alerts.length>0&&<div style={{marginBottom:12}}>{alerts.map((a,i)=><div key={i} className="al alw">📅 {a}</div>)}</div>}
      {show&&(
        <div className="cd" style={{marginBottom:14}}>
          <div className="ct">Novo Período de Férias</div>
          <div className="g2" style={{gap:8,marginBottom:8}}>
            <select className="inp" value={form.memberId} onChange={e=>setForm({...form,memberId:e.target.value})}>
              <option value="">Selecionar membro...</option>
              {team.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <input className="inp" value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder="Observação (opcional)"/>
            <input className="inp" type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/>
            <input className="inp" type="date" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})}/>
          </div>
          <div className="row"><button className="btn btn-p" onClick={add}>Solicitar</button><button className="btn btn-o" onClick={()=>setShow(false)}>Cancelar</button></div>
        </div>
      )}
      <div className="cd">
        <table className="tbl">
          <thead><tr><th>Membro</th><th>Período</th><th>Dias</th><th>Status</th><th>Obs</th><th>Ação</th></tr></thead>
          <tbody>
            {[...vacations].sort((a,b)=>a.startDate.localeCompare(b.startDate)).map(v=>(
              <tr key={v.id}>
                <td><div className="row"><div className="av">{mavatar(v.memberId,team)}</div><span>{mname(v.memberId,team)}</span></div></td>
                <td><span className="mono txs">{fmt(v.startDate)} → {fmt(v.endDate)}</span></td>
                <td><span className="mono">{daysDiff(v.startDate,v.endDate)+1}</span></td>
                <td><span className={`b ${v.status==='Aprovado'?'bg':v.status==='Pendente'?'by':'br'}`}>{v.status}</span></td>
                <td><span className="txs">{v.note||'—'}</span></td>
                <td>{v.status==='Pendente'&&(
                  <div className="row" style={{gap:4}}>
                    <button className="btn btn-o btn-s" style={{color:'var(--ok)',borderColor:'var(--ok)'}} onClick={()=>upd(v.id,'Aprovado')}>✓</button>
                    <button className="btn btn-o btn-s" style={{color:'var(--er)',borderColor:'var(--er)'}} onClick={()=>upd(v.id,'Recusado')}>✕</button>
                  </div>
                )}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── FERIADOS ──────────────────────────────── */
function HolidaysView(){
  const [sel,setSel]=useState(COUNTRIES.map(c=>c.id));
  const [month,setMonth]=useState('all');

  const flat=useMemo(()=>{
    const r=[];
    Object.entries(HOLIDAYS).forEach(([cid,hs])=>{
      if(!sel.includes(cid)) return;
      hs.forEach(h=>{
        if(month!=='all'&&!h.date.startsWith(`2026-${month}-`)) return;
        r.push({...h,cid});
      });
    });
    return r.sort((a,b)=>a.date.localeCompare(b.date));
  },[sel,month]);

  const conflicts=useMemo(()=>{
    const byDate={};
    flat.forEach(h=>{if(!byDate[h.date]) byDate[h.date]=[];byDate[h.date].push(h);});
    return Object.entries(byDate).filter(([,hs])=>hs.length>=2).sort((a,b)=>a[0].localeCompare(b[0]));
  },[flat]);

  return(
    <div className="pg">
      <div className="ph">
        <div className="ph-l"><h2>Feriados 2026</h2><p>Brasil e países atendidos pela equipe</p></div>
      </div>
      <div className="cd" style={{marginBottom:12}}>
        <div className="ct">Filtrar por País</div>
        <div>{COUNTRIES.map(c=>(
          <span key={c.id} className={`cc${sel.includes(c.id)?' on':''}`} onClick={()=>setSel(p=>p.includes(c.id)?p.filter(x=>x!==c.id):[...p,c.id])}>
            {c.flag} {c.name}
          </span>
        ))}</div>
      </div>
      <div style={{marginBottom:12,display:'flex',gap:5,flexWrap:'wrap'}}>
        <button className={`btn btn-s ${month==='all'?'btn-p':'btn-o'}`} onClick={()=>setMonth('all')}>Todos</button>
        {MONTHS.map((m,i)=>{
          const mm=String(i+1).padStart(2,'0');
          return <button key={i} className={`btn btn-s ${month===mm?'btn-p':'btn-o'}`} onClick={()=>setMonth(mm)}>{m}</button>;
        })}
      </div>
      <div className="g2" style={{alignItems:'start'}}>
        <div className="cd">
          <div className="ct">Calendário ({flat.length} feriados)</div>
          <div style={{maxHeight:480,overflowY:'auto'}}>
            {flat.map((h,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'6px 0',borderBottom:'1px solid var(--bd)'}}>
                <span className="mono txs" style={{minWidth:85}}>{fmt(h.date)}</span>
                <span style={{fontSize:14}}>{cflag(h.cid)}</span>
                <span style={{fontSize:12,flex:1}}>{h.name}</span>
                <span className="txs" style={{fontSize:10}}>{cname(h.cid)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="cd">
          <div className="ct">⚠ Sobreposições ({conflicts.length} datas)</div>
          {conflicts.length===0
            ?<p className="txs">Nenhuma sobreposição com os filtros atuais.</p>
            :<div style={{maxHeight:480,overflowY:'auto'}}>
              {conflicts.map(([date,hs])=>(
                <div key={date} style={{marginBottom:10,padding:'9px 10px',background:'var(--cd2)',borderRadius:6,border:'1px solid rgba(245,158,11,.18)'}}>
                  <div className="row" style={{marginBottom:6}}>
                    <span className="mono" style={{color:'var(--wn)',fontSize:12}}>{fmt(date)}</span>
                    <span className="b by">{hs.length} países</span>
                  </div>
                  {hs.map((h,i)=><div key={i} style={{fontSize:11.5,marginBottom:2}}>{cflag(h.cid)} <b>{cname(h.cid)}</b>: {h.name}</div>)}
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

/* ─── PROJETOS ──────────────────────────────── */
function ProjectsView({projects,setProjects}){
  const [sel,setSel]=useState(null);
  const toggleMs=(pid,mid)=>setProjects(p=>p.map(pr=>pr.id!==pid?pr:{...pr,milestones:pr.milestones.map(m=>m.id!==mid?m:{...m,done:!m.done})}));
  const YEAR_START='2026-01-01'; const YEAR_DAYS=365;

  return(
    <div className="pg">
      <div className="ph">
        <div className="ph-l"><h2>Projetos</h2><p>Introduções, milestones e acompanhamento por país</p></div>
        <button className="btn btn-o">+ Novo Projeto</button>
      </div>
      <div className="g2" style={{alignItems:'start'}}>
        <div>
          {projects.map(p=>{
            const done=p.milestones.filter(m=>m.done).length;
            const pct=Math.round(done/p.milestones.length*100);
            const isOpen=sel===p.id;
            return(
              <div key={p.id} className="cd" style={{marginBottom:12,cursor:'pointer',border:`1px solid ${isOpen?'var(--ac)':'var(--bd)'}`,transition:'border .15s'}} onClick={()=>setSel(isOpen?null:p.id)}>
                <div className="row" style={{marginBottom:8}}>
                  <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,flex:1}}>{p.name}</span>
                  <span className={`b ${p.status==='Em andamento'?'bb':p.status==='Planejado'?'bz':'bg'}`}>{p.status}</span>
                </div>
                <div style={{marginBottom:7,display:'flex',flexWrap:'wrap',gap:4}}>
                  {p.countries.map(c=><span key={c} style={{fontSize:11,background:'var(--cd2)',padding:'2px 6px',borderRadius:3,border:'1px solid var(--bd)'}}>{cflag(c)} {cname(c)}</span>)}
                </div>
                <div className="row" style={{marginBottom:5}}>
                  <span className="txs mono" style={{fontSize:10}}>{fmt(p.startDate)} → {fmt(p.endDate)}</span>
                  <span className="mono txs" style={{marginLeft:'auto'}}>{pct}%</span>
                </div>
                <div className="pb"><div className="pf" style={{width:`${pct}%`}}/></div>
                {isOpen&&(
                  <div style={{marginTop:12,paddingTop:12,borderTop:'1px solid var(--bd)'}}>
                    <div className="ct" style={{marginBottom:6}}>Milestones — clique para marcar</div>
                    {p.milestones.map(ms=>{
                      const late=!ms.done&&ms.date<TODAY;
                      return(
                        <div key={ms.id} className="row" style={{padding:'5px 0',borderBottom:'1px solid var(--bd)',cursor:'pointer'}}
                          onClick={e=>{e.stopPropagation();toggleMs(p.id,ms.id);}}>
                          <div className="ms-dot" style={{background:ms.done?'var(--ok)':late?'var(--er)':'var(--bd2)'}}/>
                          <span style={{flex:1,fontSize:12,textDecoration:ms.done?'line-through':'none',color:ms.done?'var(--txm)':'var(--tx)'}}>{ms.name}</span>
                          <span className="mono txs">{fmt(ms.date)}</span>
                          {late&&<span className="b br">Atrasado</span>}
                          {ms.done&&<span className="b bg">✓</span>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="cd">
          <div className="ct">Linha do Tempo 2026</div>
          <div style={{marginBottom:12}}>
            <div style={{display:'flex',position:'relative',height:14,marginBottom:6}}>
              {MONTHS.map((m,i)=>(
                <div key={i} style={{flex:1,fontSize:9,color:'var(--txd)',textAlign:'center',borderLeft:'1px solid var(--bd)',paddingLeft:2}}>{m}</div>
              ))}
            </div>
            {projects.map(p=>{
              const ls=daysDiff(YEAR_START,p.startDate);
              const le=daysDiff(YEAR_START,p.endDate);
              const done=p.milestones.filter(m=>m.done).length;
              const pct=done/p.milestones.length;
              return(
                <div key={p.id} style={{marginBottom:10}}>
                  <div style={{fontSize:11.5,marginBottom:4,fontWeight:500}}>{p.name}</div>
                  <div style={{height:18,background:'var(--cd2)',borderRadius:3,position:'relative',border:'1px solid var(--bd)'}}>
                    <div style={{position:'absolute',left:`${ls/YEAR_DAYS*100}%`,width:`${(le-ls)/YEAR_DAYS*100}%`,height:'100%',background:'rgba(0,207,255,.18)',borderRadius:3,border:'1px solid rgba(0,207,255,.35)',overflow:'hidden'}}>
                      <div style={{width:`${pct*100}%`,height:'100%',background:'rgba(0,207,255,.45)'}}/>
                    </div>
                    {p.milestones.map(ms=>{
                      const mpos=daysDiff(YEAR_START,ms.date)/YEAR_DAYS*100;
                      return <div key={ms.id} title={ms.name} style={{position:'absolute',left:`${mpos}%`,top:0,width:2,height:'100%',background:ms.done?'var(--ok)':'var(--wn)',transform:'translateX(-50%)'}}/>;
                    })}
                  </div>
                </div>
              );
            })}
            <div style={{display:'flex',gap:12,marginTop:10,flexWrap:'wrap'}}>
              <div className="row" style={{gap:5}}><div style={{width:10,height:4,background:'var(--ok)',borderRadius:2}}/><span className="txs" style={{fontSize:10}}>MS concluído</span></div>
              <div className="row" style={{gap:5}}><div style={{width:10,height:4,background:'var(--wn)',borderRadius:2}}/><span className="txs" style={{fontSize:10}}>MS pendente</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── VIAGENS ───────────────────────────────── */
function TravelView({team,travels,setTravels}){
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({memberId:'',destination:'',country:'IN',purpose:'',startDate:'',endDate:'',status:'Planejado'});
  const add=()=>{
    if(!form.memberId||!form.destination||!form.startDate) return;
    setTravels(p=>[...p,{...form,id:Date.now(),memberId:parseInt(form.memberId)}]);
    setForm({memberId:'',destination:'',country:'IN',purpose:'',startDate:'',endDate:'',status:'Planejado'});
    setShow(false);
  };
  const upcoming=travels.filter(t=>t.startDate>=TODAY).sort((a,b)=>a.startDate.localeCompare(b.startDate));
  const past=travels.filter(t=>t.startDate<TODAY).sort((a,b)=>b.startDate.localeCompare(a.startDate));

  return(
    <div className="pg">
      <div className="ph">
        <div className="ph-l"><h2>Viagens</h2><p>Planejamento de deslocamentos internacionais</p></div>
        <button className="btn btn-p" onClick={()=>setShow(!show)}>+ Nova Viagem</button>
      </div>
      {show&&(
        <div className="cd" style={{marginBottom:14}}>
          <div className="ct">Registrar Viagem</div>
          <div className="g2" style={{gap:8,marginBottom:8}}>
            <select className="inp" value={form.memberId} onChange={e=>setForm({...form,memberId:e.target.value})}>
              <option value="">Viajante...</option>{team.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <select className="inp" value={form.country} onChange={e=>setForm({...form,country:e.target.value})}>
              {COUNTRIES.map(c=><option key={c.id} value={c.id}>{c.flag} {c.name}</option>)}
            </select>
            <input className="inp" value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})} placeholder="Cidade, País"/>
            <input className="inp" value={form.purpose} onChange={e=>setForm({...form,purpose:e.target.value})} placeholder="Objetivo"/>
            <input className="inp" type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/>
            <input className="inp" type="date" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})}/>
          </div>
          <div className="row"><button className="btn btn-p" onClick={add}>Salvar</button><button className="btn btn-o" onClick={()=>setShow(false)}>Cancelar</button></div>
        </div>
      )}
      <div className="cd" style={{marginBottom:12}}>
        <div className="ct">Próximas Viagens ({upcoming.length})</div>
        {upcoming.length===0?<p className="txs">Nenhuma viagem planejada.</p>:(
          <table className="tbl">
            <thead><tr><th>Viajante</th><th>Destino</th><th>Objetivo</th><th>Período</th><th>Dias</th><th>Status</th></tr></thead>
            <tbody>
              {upcoming.map(t=>(
                <tr key={t.id}>
                  <td><div className="row"><div className="av">{mavatar(t.memberId,team)}</div><span>{mname(t.memberId,team)}</span></div></td>
                  <td><span style={{fontSize:13}}>{cflag(t.country)} {t.destination}</span></td>
                  <td><span className="txs">{t.purpose}</span></td>
                  <td><span className="mono txs">{fmt(t.startDate)} → {fmt(t.endDate)}</span></td>
                  <td><span className="mono">{daysDiff(t.startDate,t.endDate)+1}</span></td>
                  <td><span className={`b ${t.status==='Confirmado'?'bg':t.status==='Aprovado'?'bb':'bz'}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {past.length>0&&(
        <div className="cd" style={{opacity:.65}}>
          <div className="ct">Histórico</div>
          <table className="tbl">
            <thead><tr><th>Viajante</th><th>Destino</th><th>Período</th><th>Objetivo</th></tr></thead>
            <tbody>{past.map(t=>(
              <tr key={t.id}>
                <td>{mname(t.memberId,team)}</td>
                <td>{cflag(t.country)} {t.destination}</td>
                <td><span className="mono txs">{fmt(t.startDate)} → {fmt(t.endDate)}</span></td>
                <td className="txs">{t.purpose}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─── LEMBRETES ─────────────────────────────── */
function ReminderRow({r,team,onToggle}){
  const over=!r.done&&r.dueDate<TODAY;
  return(
    <div className="cr" style={{opacity:r.done?.5:1}}>
      <input type="checkbox" checked={r.done} onChange={()=>onToggle(r.id)} style={{cursor:'pointer',accentColor:'var(--ac)',flexShrink:0}}/>
      <div className="f1">
        <div style={{fontSize:12.5,textDecoration:r.done?'line-through':'none'}}>{r.title}</div>
        {r.note&&<div className="txs">{r.note}</div>}
      </div>
      {r.assignee&&<span className="txs" style={{fontSize:10}}>{mname(r.assignee,team)}</span>}
      <span className={`b ${r.priority==='Alta'?'br':r.priority==='Média'?'by':'bz'}`}>{r.priority}</span>
      <span className="mono txs" style={{fontSize:10,color:over?'var(--er)':'var(--txm)'}}>{fmt(r.dueDate)}</span>
    </div>
  );
}
function RemindersView({team,reminders,setReminders}){
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({title:'',assignee:'',dueDate:'',priority:'Média',note:''});
  const add=()=>{
    if(!form.title||!form.dueDate) return;
    setReminders(p=>[...p,{...form,id:Date.now(),assignee:parseInt(form.assignee)||null,done:false}]);
    setForm({title:'',assignee:'',dueDate:'',priority:'Média',note:''});
    setShow(false);
  };
  const toggle=id=>setReminders(p=>p.map(r=>r.id===id?{...r,done:!r.done}:r));
  const over=reminders.filter(r=>!r.done&&r.dueDate<TODAY).sort((a,b)=>a.dueDate.localeCompare(b.dueDate));
  const pend=reminders.filter(r=>!r.done&&r.dueDate>=TODAY).sort((a,b)=>a.dueDate.localeCompare(b.dueDate));
  const done=reminders.filter(r=>r.done);

  return(
    <div className="pg">
      <div className="ph">
        <div className="ph-l"><h2>Lembretes</h2><p>Follow-ups e acompanhamentos do time</p></div>
        <button className="btn btn-p" onClick={()=>setShow(!show)}>+ Novo</button>
      </div>
      {show&&(
        <div className="cd" style={{marginBottom:14}}>
          <div className="ct">Novo Lembrete</div>
          <input className="inp" style={{width:'100%',marginBottom:8}} value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Título..."/>
          <div className="g2" style={{gap:8,marginBottom:8}}>
            <select className="inp" value={form.assignee} onChange={e=>setForm({...form,assignee:e.target.value})}>
              <option value="">Responsável (opcional)</option>{team.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <select className="inp" value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}>
              {['Alta','Média','Baixa'].map(p=><option key={p}>{p}</option>)}
            </select>
            <input className="inp" type="date" value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})}/>
          </div>
          <input className="inp" style={{width:'100%',marginBottom:8}} value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder="Observação..."/>
          <div className="row"><button className="btn btn-p" onClick={add}>Salvar</button><button className="btn btn-o" onClick={()=>setShow(false)}>Cancelar</button></div>
        </div>
      )}
      {over.length>0&&(
        <div className="cd" style={{marginBottom:12,border:'1px solid rgba(244,63,94,.25)'}}>
          <div className="ct" style={{color:'var(--er)'}}>Vencidos ({over.length})</div>
          {over.map(r=><ReminderRow key={r.id} r={r} team={team} onToggle={toggle}/>)}
        </div>
      )}
      <div className="cd" style={{marginBottom:12}}>
        <div className="ct">Pendentes ({pend.length})</div>
        {pend.length===0?<p className="txs">Nada pendente ✓</p>:pend.map(r=><ReminderRow key={r.id} r={r} team={team} onToggle={toggle}/>)}
      </div>
      {done.length>0&&(
        <div className="cd">
          <div className="ct" style={{color:'var(--txd)'}}>Concluídos ({done.length})</div>
          {done.map(r=><ReminderRow key={r.id} r={r} team={team} onToggle={toggle}/>)}
        </div>
      )}
    </div>
  );
}

/* ─── BLOQUEIOS ─────────────────────────────── */
function BlockersView({team,projects,blockers,setBlockers}){
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({title:'',projectId:'',severity:'Médio',owner:'',status:'Aberto',date:TODAY,resolution:'',note:''});
  const add=()=>{
    if(!form.title) return;
    setBlockers(p=>[...p,{...form,id:Date.now(),projectId:parseInt(form.projectId)||null,owner:parseInt(form.owner)||null}]);
    setForm({title:'',projectId:'',severity:'Médio',owner:'',status:'Aberto',date:TODAY,resolution:'',note:''});
    setShow(false);
  };
  const upd=(id,s)=>setBlockers(p=>p.map(b=>b.id===id?{...b,status:s}:b));
  const open=blockers.filter(b=>b.status==='Aberto');
  const treat=blockers.filter(b=>b.status==='Em tratativa');
  const res=blockers.filter(b=>b.status==='Resolvido');

  const BRow=({b})=>(
    <div style={{padding:'10px 0',borderBottom:'1px solid var(--bd)'}}>
      <div className="row" style={{marginBottom:5}}>
        <span className={`b ${b.severity==='Alto'?'br':b.severity==='Médio'?'by':'bz'}`}>{b.severity}</span>
        <span style={{fontSize:12.5,flex:1,fontWeight:500}}>{b.title}</span>
        <span className={`b ${b.status==='Aberto'?'br':b.status==='Em tratativa'?'by':'bg'}`}>{b.status}</span>
      </div>
      <div className="row" style={{gap:12,flexWrap:'wrap'}}>
        {b.projectId&&<span className="txs" style={{fontSize:10}}>📁 {projects.find(p=>p.id===b.projectId)?.name||'—'}</span>}
        {b.owner&&<span className="txs" style={{fontSize:10}}>👤 {mname(b.owner,team)}</span>}
        <span className="mono txs" style={{fontSize:10}}>{fmt(b.date)}</span>
        {b.resolution&&<span className="txs" style={{fontSize:10}}>⏱ Prev. {fmt(b.resolution)}</span>}
      </div>
      {b.note&&<div className="txs" style={{marginTop:3,fontSize:11}}>{b.note}</div>}
      {b.status!=='Resolvido'&&(
        <div className="row" style={{marginTop:6,gap:4}}>
          {b.status==='Aberto'&&<button className="btn btn-o btn-s" onClick={()=>upd(b.id,'Em tratativa')}>Em tratativa</button>}
          <button className="btn btn-o btn-s" style={{color:'var(--ok)',borderColor:'var(--ok)'}} onClick={()=>upd(b.id,'Resolvido')}>✓ Resolver</button>
        </div>
      )}
    </div>
  );

  return(
    <div className="pg">
      <div className="ph">
        <div className="ph-l"><h2>Bloqueios</h2><p>Impedimentos e pontos de atenção ao processo</p></div>
        <button className="btn btn-p" onClick={()=>setShow(!show)}>+ Novo Bloqueio</button>
      </div>
      <div className="g3" style={{marginBottom:14}}>
        {[{label:'Abertos',n:open.length,c:'var(--er)'},{label:'Em tratativa',n:treat.length,c:'var(--wn)'},{label:'Resolvidos',n:res.length,c:'var(--ok)'}].map(s=>(
          <div key={s.label} className="cd-sm" style={{textAlign:'center'}}>
            <div className="sn" style={{color:s.c,fontSize:26}}>{s.n}</div><div className="sl">{s.label}</div>
          </div>
        ))}
      </div>
      {show&&(
        <div className="cd" style={{marginBottom:14}}>
          <div className="ct">Novo Bloqueio</div>
          <input className="inp" style={{width:'100%',marginBottom:8}} value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Descrição do bloqueio..."/>
          <div className="g2" style={{gap:8,marginBottom:8}}>
            <select className="inp" value={form.projectId} onChange={e=>setForm({...form,projectId:e.target.value})}>
              <option value="">Projeto (opcional)</option>{projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select className="inp" value={form.owner} onChange={e=>setForm({...form,owner:e.target.value})}>
              <option value="">Responsável (opcional)</option>{team.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <select className="inp" value={form.severity} onChange={e=>setForm({...form,severity:e.target.value})}>
              {['Alto','Médio','Baixo'].map(s=><option key={s}>{s}</option>)}
            </select>
            <input className="inp" type="date" value={form.resolution} onChange={e=>setForm({...form,resolution:e.target.value})} placeholder="Previsão de resolução"/>
          </div>
          <input className="inp" style={{width:'100%',marginBottom:8}} value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder="Contexto e observações..."/>
          <div className="row"><button className="btn btn-p" onClick={add}>Salvar</button><button className="btn btn-o" onClick={()=>setShow(false)}>Cancelar</button></div>
        </div>
      )}
      <div className="g2" style={{alignItems:'start'}}>
        <div>
          {open.length>0&&<div className="cd" style={{marginBottom:12,border:'1px solid rgba(244,63,94,.2)'}}><div className="ct" style={{color:'var(--er)'}}>Abertos ({open.length})</div>{open.map(b=><BRow key={b.id} b={b}/>)}</div>}
          {treat.length>0&&<div className="cd" style={{border:'1px solid rgba(245,158,11,.2)'}}><div className="ct" style={{color:'var(--wn)'}}>Em Tratativa ({treat.length})</div>{treat.map(b=><BRow key={b.id} b={b}/>)}</div>}
        </div>
        {res.length>0&&<div className="cd" style={{opacity:.6}}><div className="ct">Resolvidos ({res.length})</div>{res.map(b=><BRow key={b.id} b={b}/>)}</div>}
      </div>
    </div>
  );
}

/* ─── RADAR DE RISCO ────────────────────────── */
function RiskRadar({team,absences,vacations,projects,travels,reminders,blockers}){
  const in30=addDays(TODAY,30);

  const projRisk=projects.map(p=>{
    const ob=blockers.filter(b=>b.projectId===p.id&&b.status!=='Resolvido');
    const om=p.milestones.filter(m=>!m.done&&m.date<TODAY);
    const score=om.length*2+ob.filter(b=>b.severity==='Alto').length*3+ob.filter(b=>b.severity==='Médio').length;
    const level=score>=5?'Crítico':score>=3?'Alto':score>=1?'Médio':'Baixo';
    return{...p,score,level,ob:ob.length,om:om.length};
  });

  const teamStatus=team.map(m=>{
    const vac=vacations.filter(v=>v.memberId===m.id&&v.startDate<=in30&&(v.endDate||v.startDate)>=TODAY);
    const abs=absences.filter(a=>a.memberId===m.id&&a.startDate<=in30&&(a.endDate||a.startDate)>=TODAY);
    const trv=travels.filter(t=>t.memberId===m.id&&t.startDate<=in30&&(t.endDate||t.startDate)>=TODAY);
    return{...m,vac:vac.length,abs:abs.length,trv:trv.length};
  });

  const critAlerts=[];
  projRisk.filter(p=>p.level==='Crítico').forEach(p=>critAlerts.push({type:'er',msg:`Projeto crítico: ${p.name} — ${p.ob} bloqueio(s), ${p.om} ms atrasado(s)`}));
  projRisk.filter(p=>p.level==='Alto').forEach(p=>critAlerts.push({type:'wn',msg:`Projeto em risco: ${p.name}`}));
  reminders.filter(r=>!r.done&&r.dueDate<TODAY).forEach(r=>critAlerts.push({type:'wn',msg:`Lembrete vencido: ${r.title}`}));

  return(
    <div className="pg">
      <div className="ph">
        <div className="ph-l"><h2>Radar de Risco</h2><p>Visão consolidada de criticidades e disponibilidade</p></div>
      </div>
      <div className="cd" style={{marginBottom:12}}>
        <div className="ct">Risco por Projeto</div>
        <table className="tbl">
          <thead><tr><th>Projeto</th><th>Nível</th><th>Score</th><th>Bloqueios</th><th>MS Atrasados</th><th>Status</th></tr></thead>
          <tbody>
            {projRisk.map(p=>(
              <tr key={p.id}>
                <td style={{fontSize:12.5,fontWeight:500}}>{p.name}</td>
                <td><span className={`b ${p.level==='Crítico'?'br':p.level==='Alto'?'bo':p.level==='Médio'?'by':'bg'}`}>{p.level}</span></td>
                <td><span className="mono" style={{color:p.score>4?'var(--er)':p.score>2?'var(--wn)':'var(--ok)'}}>{p.score}</span></td>
                <td>{p.ob>0?<span className="b br">{p.ob}</span>:<span className="txs">—</span>}</td>
                <td>{p.om>0?<span className="b by">{p.om}</span>:<span className="txs">—</span>}</td>
                <td><span className={`b ${p.status==='Em andamento'?'bb':p.status==='Planejado'?'bz':'bg'}`}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="g2" style={{alignItems:'start'}}>
        <div className="cd">
          <div className="ct">Disponibilidade — Próx. 30 dias</div>
          {teamStatus.map(m=>(
            <div key={m.id} className="cr">
              <div className="av">{m.avatar}</div>
              <div className="f1">
                <div style={{fontSize:12.5}}>{m.name}</div>
                <div className="txs">{m.role}</div>
              </div>
              {m.vac>0&&<span className="b bb">Férias</span>}
              {m.abs>0&&<span className="b by">Ausente</span>}
              {m.trv>0&&<span className="b bp">Em viagem</span>}
              {!m.vac&&!m.abs&&!m.trv&&<span className="b bg">Disponível</span>}
            </div>
          ))}
        </div>
        <div className="cd">
          <div className="ct">Alertas Críticos</div>
          {critAlerts.length===0
            ?<div className="al ali">✓ Nenhum alerta crítico no momento</div>
            :critAlerts.map((a,i)=>(
              <div key={i} className={`al ${a.type==='er'?'ale':'alw'}`}>
                {a.type==='er'?'🔴':'⚠'} {a.msg}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

/* ─── APP ───────────────────────────────────── */
export default function App(){
  const [tab,setTab]=useState('dashboard');
  const [team]=useState(initTeam);
  const [absences,setAbsences]=useState(initAbsences);
  const [vacations,setVacations]=useState(initVacations);
  const [projects,setProjects]=useState(initProjects);
  const [travels,setTravels]=useState(initTravels);
  const [reminders,setReminders]=useState(initReminders);
  const [blockers,setBlockers]=useState(initBlockers);
  const p={team,absences,setAbsences,vacations,setVacations,projects,setProjects,travels,setTravels,reminders,setReminders,blockers,setBlockers};
  return(
    <>
      <style>{CSS}</style>
      <div className="app">
        <Sidebar tab={tab} setTab={setTab}/>
        <main className="main">
          {tab==='dashboard'&&<Dashboard {...p}/>}
          {tab==='absences'&&<TeamAbsences {...p}/>}
          {tab==='vacations'&&<VacationPlanner {...p}/>}
          {tab==='holidays'&&<HolidaysView/>}
          {tab==='projects'&&<ProjectsView {...p}/>}
          {tab==='travels'&&<TravelView {...p}/>}
          {tab==='reminders'&&<RemindersView {...p}/>}
          {tab==='blockers'&&<BlockersView {...p}/>}
          {tab==='risk'&&<RiskRadar {...p}/>}
        </main>
      </div>
    </>
  );
}
