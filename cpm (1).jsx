import { useState, useMemo } from "react";

/* ─── TRANSLATIONS ──────────────────────────── */
const TR = {
  PT: {
    appName:'CPM', appSub:'Change Point Management',
    dashboard:'Dashboard', absences:'Ausências', vacations:'Férias', holidays:'Feriados',
    projects:'Projetos', travels:'Viagens', reminders:'Lembretes', blockers:'Bloqueios', risk:'Radar de Risco',
    team:'Equipe', operations:'Operações', management:'Gestão',
    overview:'Visão geral operacional', members:'Membros', absMonth:'Ausências / mês', activeProj:'Projetos ativos', openBlockers:'Bloqueios abertos',
    next30:'Próximos 30 dias', noEvents:'Nenhum evento próximo.',
    projProgress:'Projetos — Progresso', openBlockersTitle:'Bloqueios em Aberto', noBlockers:'Nenhum bloqueio aberto',
    overdueAlert:'lembrete(s) vencido(s) — acesse a seção Lembretes',
    register:'Registrar', plan:'Planejar', save:'Salvar', cancel:'Cancelar', newProject:'+ Novo Projeto',
    selectMember:'Selecionar membro...', selectTraveler:'Viajante...',
    absence:'Ausência', vacation:'Férias', holiday:'Feriado', travel:'Viagem', reminder:'Lembrete',
    medCert:'Atestado Médico', personal:'Pessoal', leave:'Licença', other:'Outros',
    start:'Início', end:'Fim', note:'Observação', role:'Cargo',
    approved:'Aprovado', pending:'Pendente', refused:'Recusado',
    confirmed:'Confirmado', planned:'Planejado', inProgress:'Em andamento',
    open:'Aberto', inTreatment:'Em tratativa', resolved:'Resolvido',
    high:'Alto', medium:'Médio', low:'Baixo', critical:'Crítico',
    noRisk:'Nenhum alerta crítico no momento',
    availability:'Disponibilidade — Próx. 30 dias', available:'Disponível', onVacation:'Férias', absent:'Ausente', traveling:'Em viagem',
    riskByProject:'Risco por Projeto', criticalAlerts:'Alertas Críticos', riskScore:'Score',
    milestones:'Milestones', done:'Concluído', late:'Atrasado', clickToggle:'Clique para marcar',
    history:'Histórico', upcomingTrips:'Próximas Viagens', noTrips:'Nenhuma viagem planejada.',
    destination:'Destino', purpose:'Objetivo', days:'Dias', status:'Status', period:'Período',
    overdue:'Vencidos', pending2:'Pendentes', completed:'Concluídos', noPending:'Nada pendente ✓',
    priority:'Prioridade', assignee:'Responsável', optional:'opcional',
    severity:'Severidade', owner:'Responsável', resolution:'Prev. Resolução',
    projName:'Nome do Projeto', addMs:'+ Milestone', removeProj:'Remover projeto?',
    absHigh:'ausências nos últimos 90 dias', last90:'nos últimos 90 dias',
    absPattern:'Padrão de ausência às segundas detectado',
    absIndex:'Índice por Membro', absence2:'ausência', absences2:'ausências',
    overlap:'Sobreposições', noOverlap:'Nenhuma sobreposição com os filtros atuais.', countries:'países',
    holidayCalendar:'Calendário', all:'Todos',
    filterByCountry:'Filtrar por País', timeline:'Linha do Tempo 2026',
    resolve:'✓ Resolver', inTreatmentBtn:'Em tratativa',
    newAbsence:'Nova Ausência', newVacation:'Novo Período de Férias', newTravel:'Registrar Viagem',
    newReminder:'Novo Lembrete', newBlocker:'Novo Bloqueio',
    absHistory:'Registro', absAnalysis:'Análise por Membro',
    conflictWarning:'fora ao mesmo tempo', context:'Contexto e observações...',
    msName:'Nome do milestone', msDate:'Data', deleteProject:'Remover',
    projCountries:'Países envolvidos', language:'Idioma',
  },
  EN: {
    appName:'CPM', appSub:'Change Point Management',
    dashboard:'Dashboard', absences:'Absences', vacations:'Vacations', holidays:'Holidays',
    projects:'Projects', travels:'Travel', reminders:'Reminders', blockers:'Blockers', risk:'Risk Radar',
    team:'Team', operations:'Operations', management:'Management',
    overview:'Operational overview', members:'Members', absMonth:'Absences / month', activeProj:'Active projects', openBlockers:'Open blockers',
    next30:'Next 30 days', noEvents:'No upcoming events.',
    projProgress:'Projects — Progress', openBlockersTitle:'Open Blockers', noBlockers:'No open blockers',
    overdueAlert:'overdue reminder(s) — check the Reminders section',
    register:'Register', plan:'Plan', save:'Save', cancel:'Cancel', newProject:'+ New Project',
    selectMember:'Select member...', selectTraveler:'Traveler...',
    absence:'Absence', vacation:'Vacation', holiday:'Holiday', travel:'Travel', reminder:'Reminder',
    medCert:'Medical Certificate', personal:'Personal', leave:'Leave', other:'Other',
    start:'Start', end:'End', note:'Note', role:'Role',
    approved:'Approved', pending:'Pending', refused:'Refused',
    confirmed:'Confirmed', planned:'Planned', inProgress:'In Progress',
    open:'Open', inTreatment:'In Treatment', resolved:'Resolved',
    high:'High', medium:'Medium', low:'Low', critical:'Critical',
    noRisk:'No critical alerts at this time',
    availability:'Availability — Next 30 days', available:'Available', onVacation:'On Vacation', absent:'Absent', traveling:'Traveling',
    riskByProject:'Risk by Project', criticalAlerts:'Critical Alerts', riskScore:'Score',
    milestones:'Milestones', done:'Done', late:'Late', clickToggle:'Click to toggle',
    history:'History', upcomingTrips:'Upcoming Trips', noTrips:'No trips planned.',
    destination:'Destination', purpose:'Purpose', days:'Days', status:'Status', period:'Period',
    overdue:'Overdue', pending2:'Pending', completed:'Completed', noPending:'Nothing pending ✓',
    priority:'Priority', assignee:'Assignee', optional:'optional',
    severity:'Severity', owner:'Owner', resolution:'Est. Resolution',
    projName:'Project Name', addMs:'+ Milestone', removeProj:'Remove project?',
    absHigh:'absences in the last 90 days', last90:'in the last 90 days',
    absPattern:'Monday absence pattern detected',
    absIndex:'Index by Member', absence2:'absence', absences2:'absences',
    overlap:'Overlaps', noOverlap:'No overlaps with current filters.', countries:'countries',
    holidayCalendar:'Calendar', all:'All',
    filterByCountry:'Filter by Country', timeline:'2026 Timeline',
    resolve:'✓ Resolve', inTreatmentBtn:'In Treatment',
    newAbsence:'New Absence', newVacation:'New Vacation Period', newTravel:'Register Trip',
    newReminder:'New Reminder', newBlocker:'New Blocker',
    absHistory:'Log', absAnalysis:'Analysis by Member',
    conflictWarning:'out at the same time', context:'Context and notes...',
    msName:'Milestone name', msDate:'Date', deleteProject:'Remove',
    projCountries:'Countries involved', language:'Language',
  }
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}html,body{height:100%}
:root{--sf:#0A0D18;--cd:#0F1624;--cd2:#141D2E;--bd:#1C2840;--bd2:#243352;--ac:#00CFFF;--ac2:#FF6B35;--ac3:#A78BFA;--ok:#10D98E;--wn:#F59E0B;--er:#F43F5E;--tx:#DDE6F0;--txm:#6B82A0;--txd:#324058}
body{font-family:'IBM Plex Sans',sans-serif;background:var(--sf);color:var(--tx)}
.app{display:flex;height:100vh;overflow:hidden}
.sb{width:210px;min-width:210px;background:#070A14;border-right:1px solid var(--bd);display:flex;flex-direction:column}
.sb-logo{padding:18px 16px 14px;border-bottom:1px solid var(--bd)}
.sb-logo h1{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:var(--ac);letter-spacing:-.5px}
.sb-logo p{font-size:8px;color:var(--txm);text-transform:uppercase;letter-spacing:2px;margin-top:3px}
.sb-nav{padding:8px 0;flex:1;overflow-y:auto}
.sb-sec{font-size:8px;color:var(--txd);text-transform:uppercase;letter-spacing:2px;padding:12px 14px 3px}
.nb{display:flex;align-items:center;gap:9px;padding:8px 14px;cursor:pointer;font-size:12.5px;color:var(--txm);border-left:2px solid transparent;transition:all .12s;width:100%;background:none;border-top:none;border-right:none;border-bottom:none;font-family:'IBM Plex Sans',sans-serif;text-align:left}
.nb:hover{color:var(--tx);background:rgba(255,255,255,.02)}.nb.on{color:var(--ac);background:rgba(0,207,255,.07);border-left-color:var(--ac);font-weight:500}
.lt-wrap{display:flex;margin:0 14px 12px;border-radius:6px;overflow:hidden;border:1px solid var(--bd)}
.lt{flex:1;padding:5px;text-align:center;font-size:11px;cursor:pointer;font-family:'IBM Plex Mono',monospace;color:var(--txm);background:transparent;border:none;transition:all .12s}
.lt.on{background:rgba(0,207,255,.12);color:var(--ac);font-weight:500}
.main{flex:1;overflow-y:auto;background:var(--sf)}
.pg{padding:22px 24px}
.ph{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:18px}
.ph-l h2{font-family:'Syne',sans-serif;font-size:22px;font-weight:700}
.ph-l p{color:var(--txm);font-size:11px;margin-top:3px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.cd{background:var(--cd);border:1px solid var(--bd);border-radius:9px;padding:16px}
.cd-sm{background:var(--cd);border:1px solid var(--bd);border-radius:8px;padding:11px 14px}
.ct{font-family:'Syne',sans-serif;font-size:10px;font-weight:700;color:var(--txm);text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px}
.sn{font-family:'IBM Plex Mono',monospace;font-size:28px;font-weight:500;line-height:1.1}
.sl{font-size:10px;color:var(--txm);margin-top:5px;text-transform:uppercase;letter-spacing:.5px}
.tbl{width:100%;border-collapse:collapse;font-size:12px}
.tbl th{text-align:left;padding:6px 9px;color:var(--txm);font-size:9px;text-transform:uppercase;letter-spacing:.8px;border-bottom:1px solid var(--bd);font-weight:500}
.tbl td{padding:8px 9px;border-bottom:1px solid var(--bd);vertical-align:middle}
.tbl tr:last-child td{border-bottom:none}.tbl tr:hover td{background:rgba(255,255,255,.01)}
.av{width:27px;height:27px;border-radius:6px;background:rgba(0,207,255,.1);color:var(--ac);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;font-family:'IBM Plex Mono',monospace;flex-shrink:0}
.av-in{background:rgba(255,107,53,.1);color:var(--ac2)}
.b{display:inline-block;padding:1.5px 6px;border-radius:3px;font-size:9.5px;font-weight:600;font-family:'IBM Plex Mono',monospace;white-space:nowrap}
.bb{background:rgba(0,207,255,.12);color:var(--ac)}.bo{background:rgba(255,107,53,.12);color:var(--ac2)}
.bg{background:rgba(16,217,142,.12);color:var(--ok)}.by{background:rgba(245,158,11,.12);color:var(--wn)}
.br{background:rgba(244,63,94,.12);color:var(--er)}.bz{background:rgba(107,130,160,.1);color:var(--txm)}
.bp{background:rgba(167,139,250,.12);color:var(--ac3)}
.btn{display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:6px;border:none;cursor:pointer;font-size:11.5px;font-weight:500;font-family:'IBM Plex Sans',sans-serif;transition:all .12s}
.btn-p{background:var(--ac);color:#000}.btn-p:hover{background:#1AE0FF}
.btn-o{background:transparent;color:var(--txm);border:1px solid var(--bd)}.btn-o:hover{border-color:var(--ac);color:var(--ac)}
.btn-d{background:transparent;color:var(--txd);border:1px solid var(--bd)}.btn-d:hover{border-color:var(--er);color:var(--er)}
.btn-s{padding:3px 8px;font-size:10.5px}
.inp{background:#080C17;border:1px solid var(--bd);color:var(--tx);padding:6px 9px;border-radius:6px;font-size:12px;font-family:'IBM Plex Sans',sans-serif;outline:none;transition:border .12s;width:100%}
.inp:focus{border-color:var(--ac)} select.inp option{background:#0F1624}
.pb{height:4px;background:var(--bd);border-radius:2px;overflow:hidden}
.pf{height:100%;border-radius:2px;background:var(--ac)}
.row{display:flex;align-items:center;gap:8px}.f1{flex:1}
.cr{display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--bd)}.cr:last-child{border-bottom:none}
.al{padding:8px 11px;border-radius:6px;font-size:11.5px;margin-bottom:7px;line-height:1.4}
.alw{background:rgba(245,158,11,.07);border:1px solid rgba(245,158,11,.18);color:var(--wn)}
.ale{background:rgba(244,63,94,.07);border:1px solid rgba(244,63,94,.18);color:var(--er)}
.ali{background:rgba(0,207,255,.05);border:1px solid rgba(0,207,255,.14);color:var(--ac)}
.cc{display:inline-flex;align-items:center;gap:4px;padding:3px 7px;border-radius:4px;font-size:11px;background:var(--cd);border:1px solid var(--bd);margin:2px;cursor:pointer;transition:all .12s;user-select:none}
.cc.on{border-color:var(--ac);color:var(--ac);background:rgba(0,207,255,.07)}
.ms-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.mono{font-family:'IBM Plex Mono',monospace}.txm{color:var(--txm)}.txs{font-size:11px;color:var(--txm)}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:2px}
`;

const COUNTRIES=[
  {id:'BR',name:{PT:'Brasil',EN:'Brazil'},flag:'🇧🇷'},
  {id:'IN',name:{PT:'Índia',EN:'India'},flag:'🇮🇳'},
  {id:'MY',name:{PT:'Malásia',EN:'Malaysia'},flag:'🇲🇾'},
  {id:'TW',name:{PT:'Taiwan',EN:'Taiwan'},flag:'🇹🇼'},
  {id:'ZA',name:{PT:'África do Sul',EN:'South Africa'},flag:'🇿🇦'},
  {id:'ID',name:{PT:'Indonésia',EN:'Indonesia'},flag:'🇮🇩'},
  {id:'PH',name:{PT:'Filipinas',EN:'Philippines'},flag:'🇵🇭'},
  {id:'KE',name:{PT:'Quênia',EN:'Kenya'},flag:'🇰🇪'},
  {id:'KZ',name:{PT:'Cazaquistão',EN:'Kazakhstan'},flag:'🇰🇿'},
];

const HOLIDAYS={
  BR:[{date:'2026-01-01',name:'Ano Novo'},{date:'2026-02-16',name:'Carnaval'},{date:'2026-02-17',name:'Carnaval (2º dia)'},{date:'2026-04-03',name:'Sexta-Feira Santa'},{date:'2026-04-21',name:'Tiradentes'},{date:'2026-05-01',name:'Dia do Trabalho'},{date:'2026-06-04',name:'Corpus Christi'},{date:'2026-09-07',name:'Independência'},{date:'2026-10-12',name:'N.Sra.Aparecida'},{date:'2026-11-02',name:'Finados'},{date:'2026-11-15',name:'Proclamação da República'},{date:'2026-12-25',name:'Natal'}],
  IN:[{date:'2026-01-26',name:'Republic Day'},{date:'2026-03-03',name:'Holi'},{date:'2026-03-20',name:'Eid al-Fitr'},{date:'2026-04-03',name:'Good Friday'},{date:'2026-04-14',name:'Dr. Ambedkar Jayanti'},{date:'2026-05-01',name:'Maharashtra Day'},{date:'2026-05-27',name:'Eid al-Adha'},{date:'2026-08-15',name:'Independence Day'},{date:'2026-10-02',name:'Gandhi Jayanti'},{date:'2026-10-17',name:'Diwali'},{date:'2026-12-25',name:'Christmas'}],
  MY:[{date:'2026-01-01',name:"New Year's Day"},{date:'2026-02-17',name:'Chinese New Year'},{date:'2026-03-20',name:'Hari Raya Aidilfitri'},{date:'2026-05-01',name:'Labour Day'},{date:'2026-05-19',name:'Wesak Day'},{date:'2026-05-27',name:'Hari Raya Haji'},{date:'2026-08-31',name:'National Day'},{date:'2026-09-16',name:'Malaysia Day'},{date:'2026-12-25',name:'Christmas'}],
  TW:[{date:'2026-01-01',name:'Founding Day'},{date:'2026-02-19',name:'Spring Festival'},{date:'2026-02-28',name:'228 Memorial Day'},{date:'2026-04-04',name:'Tomb Sweeping Day'},{date:'2026-06-19',name:'Dragon Boat Festival'},{date:'2026-09-27',name:'Mid-Autumn Festival'},{date:'2026-10-10',name:'National Day'}],
  ZA:[{date:'2026-01-01',name:"New Year's Day"},{date:'2026-03-21',name:'Human Rights Day'},{date:'2026-04-03',name:'Good Friday'},{date:'2026-04-27',name:'Freedom Day'},{date:'2026-05-01',name:"Workers' Day"},{date:'2026-06-16',name:'Youth Day'},{date:'2026-09-24',name:'Heritage Day'},{date:'2026-12-16',name:'Day of Reconciliation'},{date:'2026-12-25',name:'Christmas'},{date:'2026-12-26',name:'Day of Goodwill'}],
  ID:[{date:'2026-01-01',name:"New Year's Day"},{date:'2026-02-17',name:'Chinese New Year'},{date:'2026-03-20',name:'Idul Fitri'},{date:'2026-04-03',name:'Good Friday'},{date:'2026-05-01',name:'Labour Day'},{date:'2026-05-27',name:'Idul Adha'},{date:'2026-08-17',name:'Independence Day'},{date:'2026-12-25',name:'Christmas'}],
  PH:[{date:'2026-01-01',name:"New Year's Day"},{date:'2026-04-02',name:'Maundy Thursday'},{date:'2026-04-03',name:'Good Friday'},{date:'2026-05-01',name:'Labour Day'},{date:'2026-06-12',name:'Independence Day'},{date:'2026-08-31',name:'National Heroes Day'},{date:'2026-11-01',name:"All Saints' Day"},{date:'2026-11-30',name:'Bonifacio Day'},{date:'2026-12-25',name:'Christmas Day'},{date:'2026-12-30',name:'Rizal Day'}],
  KE:[{date:'2026-01-01',name:"New Year's Day"},{date:'2026-04-03',name:'Good Friday'},{date:'2026-05-01',name:'Labour Day'},{date:'2026-06-01',name:'Madaraka Day'},{date:'2026-10-10',name:'Huduma Day'},{date:'2026-10-20',name:'Mashujaa Day'},{date:'2026-12-12',name:'Jamhuri Day'},{date:'2026-12-25',name:'Christmas'},{date:'2026-12-26',name:'Boxing Day'}],
  KZ:[{date:'2026-01-01',name:'New Year'},{date:'2026-01-02',name:'New Year (2nd)'},{date:'2026-03-08',name:"Women's Day"},{date:'2026-03-21',name:'Nauryz'},{date:'2026-03-22',name:'Nauryz'},{date:'2026-03-23',name:'Nauryz'},{date:'2026-05-01',name:'Unity Day'},{date:'2026-05-09',name:'Victory Day'},{date:'2026-07-06',name:'Capital City Day'},{date:'2026-08-30',name:'Constitution Day'},{date:'2026-12-16',name:'Independence Day'}],
};

const MPTS=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const MENS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const TODAY='2026-03-22';
const YEAR_START='2026-01-01'; const YEAR_DAYS=365;

const fmt=d=>{if(!d)return'—';const[y,m,day]=d.split('-');return`${day}/${m}/${y}`};
const cflag=id=>COUNTRIES.find(c=>c.id===id)?.flag||'';
const cname=(id,lang)=>{const c=COUNTRIES.find(c=>c.id===id);return c?c.name[lang]:id};
const mname=(id,team)=>team.find(m=>m.id===id)?.name||'N/A';
const mavatar=(id,team)=>team.find(m=>m.id===id)?.avatar||'?';
const isIN=(id,team)=>team.find(m=>m.id===id)?.country==='IN';
const addDays=(d,n)=>{const dt=new Date(d);dt.setDate(dt.getDate()+n);return dt.toISOString().split('T')[0]};
const daysDiff=(a,b)=>Math.round((new Date(b)-new Date(a))/86400000);
const SBMap=(t)=>({
  inProgress:{cls:'bb',label:t.inProgress},planned:{cls:'bz',label:t.planned},done:{cls:'bg',label:t.done},
  open:{cls:'br',label:t.open},inTreatment:{cls:'by',label:t.inTreatment},resolved:{cls:'bg',label:t.resolved},
  approved:{cls:'bg',label:t.approved},pending:{cls:'by',label:t.pending},refused:{cls:'br',label:t.refused},confirmed:{cls:'bg',label:t.confirmed},
});
const SB=(s,t)=>SBMap(t)[s]||{cls:'bz',label:s};

const initTeam=[
  {id:1,name:'Guilherme Freitas',role:{PT:'Gerente',EN:'Manager'},country:'BR',avatar:'GF'},
  {id:2,name:'Matheus Stefane',role:{PT:'Analista',EN:'Analyst'},country:'BR',avatar:'MS'},
  {id:3,name:'Cae Lopes',role:{PT:'Especialista',EN:'Specialist'},country:'BR',avatar:'CL'},
  {id:4,name:'Vinicius Caetano',role:{PT:'Analista',EN:'Analyst'},country:'BR',avatar:'VC'},
  {id:5,name:'Izabela Siqueira',role:{PT:'Coordenadora',EN:'Coordinator'},country:'BR',avatar:'IS'},
  {id:6,name:'Vinicius Duarte',role:{PT:'Engenheiro',EN:'Engineer'},country:'BR',avatar:'VD'},
  {id:7,name:'Dirceu Magalhães',role:{PT:'Analista Sênior',EN:'Senior Analyst'},country:'BR',avatar:'DM'},
  {id:8,name:'Bruno Lima',role:{PT:'Especialista Técnico',EN:'Technical Specialist'},country:'BR',avatar:'BL'},
  {id:9,name:'Douglas Paula',role:{PT:'Analista',EN:'Analyst'},country:'BR',avatar:'DP'},
  {id:10,name:'Roberto Lino',role:{PT:'Coordenador',EN:'Coordinator'},country:'BR',avatar:'RL'},
  {id:11,name:'Ronaldo Oliveira',role:{PT:'Analista Sênior',EN:'Senior Analyst'},country:'BR',avatar:'RO'},
  {id:12,name:'Damon Amorim',role:{PT:'Engenheiro',EN:'Engineer'},country:'BR',avatar:'DA'},
  {id:13,name:'Ewerton Santos',role:{PT:'Analista',EN:'Analyst'},country:'BR',avatar:'ES'},
  {id:14,name:'Sakthi Kumar',role:{PT:'Especialista Regional',EN:'Regional Specialist'},country:'IN',avatar:'SK'},
  {id:15,name:'Pooja Pannalkar',role:{PT:'Analista de Processos',EN:'Process Analyst'},country:'IN',avatar:'PP'},
  {id:16,name:'Andre Giroto',role:{PT:'Gerente de Projetos',EN:'Project Manager'},country:'BR',avatar:'AG'},
];

const initProjects=[
  {id:1,name:'SUPER África do Sul',countries:['ZA'],startDate:'2026-02-01',endDate:'2026-09-30',status:'inProgress',
    milestones:[{id:1,name:'Kick-off',date:'2026-02-01',done:true},{id:2,name:'Diagnóstico',date:'2026-03-15',done:true},{id:3,name:'Implementação Fase 1',date:'2026-05-31',done:false},{id:4,name:'Treinamentos',date:'2026-07-31',done:false},{id:5,name:'Go-live',date:'2026-09-30',done:false}]},
  {id:2,name:'SUPER Quênia',countries:['KE'],startDate:'2026-03-01',endDate:'2026-10-31',status:'inProgress',
    milestones:[{id:1,name:'Kick-off',date:'2026-03-01',done:true},{id:2,name:'Análise de Requisitos',date:'2026-04-30',done:false},{id:3,name:'Implementação',date:'2026-07-31',done:false},{id:4,name:'UAT',date:'2026-09-30',done:false},{id:5,name:'Go-live',date:'2026-10-31',done:false}]},
  {id:3,name:'SESAMM7 Filipinas',countries:['PH'],startDate:'2026-04-01',endDate:'2026-11-30',status:'planned',
    milestones:[{id:1,name:'Kick-off',date:'2026-04-01',done:false},{id:2,name:'Mapeamento de Processos',date:'2026-05-31',done:false},{id:3,name:'Desenvolvimento',date:'2026-08-31',done:false},{id:4,name:'Homologação',date:'2026-10-31',done:false},{id:5,name:'Go-live',date:'2026-11-30',done:false}]},
];

/* ─── SIDEBAR ─────────────────────── */
function Sidebar({tab,setTab,lang,setLang,t}){
  const nav=[
    {id:'dashboard',icon:'◈',label:t.dashboard},
    {sec:t.team},{id:'absences',icon:'⊘',label:t.absences},{id:'vacations',icon:'⊙',label:t.vacations},{id:'holidays',icon:'◎',label:t.holidays},
    {sec:t.operations},{id:'projects',icon:'⊞',label:t.projects},{id:'travels',icon:'◷',label:t.travels},
    {sec:t.management},{id:'reminders',icon:'◉',label:t.reminders},{id:'blockers',icon:'⊗',label:t.blockers},{id:'risk',icon:'◆',label:t.risk},
  ];
  return(
    <div className="sb">
      <div className="sb-logo"><h1>{t.appName}</h1><p>{t.appSub}</p></div>
      <div className="sb-nav">
        {nav.map((n,i)=>n.sec?<div key={i} className="sb-sec">{n.sec}</div>:(
          <button key={n.id} className={`nb${tab===n.id?' on':''}`} onClick={()=>setTab(n.id)}>
            <span style={{fontFamily:'monospace',fontSize:14}}>{n.icon}</span>{n.label}
          </button>
        ))}
      </div>
      <div style={{padding:'8px 14px 14px',borderTop:'1px solid var(--bd)'}}>
        <div style={{fontSize:9,color:'var(--txm)',marginBottom:5,textTransform:'uppercase',letterSpacing:1}}>{t.language}</div>
        <div className="lt-wrap">
          <button className={`lt${lang==='PT'?' on':''}`} onClick={()=>setLang('PT')}>🇧🇷 PT</button>
          <button className={`lt${lang==='EN'?' on':''}`} onClick={()=>setLang('EN')}>🇬🇧 EN</button>
        </div>
        <div style={{fontSize:9,color:'var(--txd)',fontFamily:'IBM Plex Mono',marginTop:6}}>{TODAY}</div>
        <div style={{fontSize:9,color:'var(--txm)'}}>{initTeam.length} {lang==='PT'?'membros':'members'} · 9 {lang==='PT'?'países':'countries'}</div>
      </div>
    </div>
  );
}

/* ─── DASHBOARD ──────────────────── */
function Dashboard({team,absences,vacations,projects,travels,reminders,blockers,lang,t}){
  const in30=addDays(TODAY,30);
  const thisMonth=TODAY.substring(0,7);
  const openB=blockers.filter(b=>b.status!=='resolved').length;
  const overdueR=reminders.filter(r=>!r.done&&r.dueDate<TODAY).length;
  const activeP=projects.filter(p=>p.status==='inProgress').length;
  const mAbs=absences.filter(a=>a.startDate.startsWith(thisMonth)).length;
  const upcoming=useMemo(()=>{
    const ev=[];
    absences.filter(a=>a.startDate>=TODAY&&a.startDate<=in30).forEach(a=>ev.push({date:a.startDate,type:t.absence,label:`${mname(a.memberId,team)} — ${a.typeLabel||a.type}`,cls:'by'}));
    vacations.filter(v=>v.startDate>=TODAY&&v.startDate<=in30).forEach(v=>ev.push({date:v.startDate,type:t.vacation,label:mname(v.memberId,team),cls:'bb'}));
    travels.filter(r=>r.startDate>=TODAY&&r.startDate<=in30).forEach(r=>ev.push({date:r.startDate,type:t.travel,label:`${mname(r.memberId,team)} → ${r.destination}`,cls:'bp'}));
    reminders.filter(r=>!r.done&&r.dueDate>=TODAY&&r.dueDate<=in30).forEach(r=>ev.push({date:r.dueDate,type:t.reminder,label:r.title,cls:r.priority==='high'?'br':'bz'}));
    return ev.sort((a,b)=>a.date.localeCompare(b.date)).slice(0,12);
  },[absences,vacations,travels,reminders,team,in30,t]);
  return(
    <div className="pg">
      <div className="ph"><div className="ph-l"><h2>{t.dashboard}</h2><p>{t.overview} · {fmt(TODAY)}</p></div></div>
      <div className="g4" style={{marginBottom:14}}>
        {[{label:t.members,val:team.length,color:'var(--ac)'},{label:t.absMonth,val:mAbs,color:'var(--wn)'},{label:t.activeProj,val:activeP,color:'var(--ok)'},{label:t.openBlockers,val:openB,color:openB>0?'var(--er)':'var(--ok)'}].map(s=>(
          <div key={s.label} className="cd" style={{textAlign:'center',padding:'14px 10px'}}>
            <div className="sn" style={{color:s.color,fontSize:30}}>{s.val}</div><div className="sl">{s.label}</div>
          </div>
        ))}
      </div>
      {overdueR>0&&<div className="al ale" style={{marginBottom:12}}>⚠ {overdueR} {t.overdueAlert}</div>}
      <div className="g2" style={{alignItems:'start'}}>
        <div className="cd">
          <div className="ct">{t.next30}</div>
          {upcoming.length===0?<p className="txs">{t.noEvents}</p>:upcoming.map((ev,i)=>(
            <div key={i} className="cr">
              <span className="mono txs" style={{minWidth:75,flexShrink:0}}>{fmt(ev.date)}</span>
              <span className={`b ${ev.cls}`}>{ev.type}</span>
              <span style={{fontSize:11.5,flex:1}}>{ev.label}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="cd" style={{marginBottom:12}}>
            <div className="ct">{t.projProgress}</div>
            {projects.length===0?<p className="txs">{lang==='PT'?'Nenhum projeto.':'No projects.'}</p>:projects.map(p=>{
              const dn=p.milestones.filter(m=>m.done).length;
              const pct=Math.round(dn/p.milestones.length*100);
              const sb=SB(p.status,t);
              return(<div key={p.id} style={{marginBottom:13}}>
                <div className="row" style={{marginBottom:4}}><span style={{fontSize:12.5,flex:1,fontWeight:500}}>{p.name}</span><span className={`b ${sb.cls}`}>{sb.label}</span></div>
                <div className="row" style={{marginBottom:4,gap:5}}>{p.countries.map(c=><span key={c} title={cname(c,lang)}>{cflag(c)}</span>)}<span className="txs">{dn}/{p.milestones.length} ms</span><span className="mono txs" style={{marginLeft:'auto'}}>{pct}%</span></div>
                <div className="pb"><div className="pf" style={{width:`${pct}%`}}/></div>
              </div>);
            })}
          </div>
          <div className="cd">
            <div className="ct">{t.openBlockersTitle}</div>
            {blockers.filter(b=>b.status!=='resolved').length===0?<p style={{fontSize:11.5,color:'var(--ok)'}}>✓ {t.noBlockers}</p>:
              blockers.filter(b=>b.status!=='resolved').map(b=>{const sb=SB(b.status,t);return(
                <div key={b.id} className="cr">
                  <span className={`b ${b.severity==='high'?'br':b.severity==='medium'?'by':'bz'}`}>{b.severity==='high'?t.high:b.severity==='medium'?t.medium:t.low}</span>
                  <span style={{fontSize:11.5,flex:1}}>{b.title}</span><span className={`b ${sb.cls}`}>{sb.label}</span>
                </div>
              );})}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── AUSÊNCIAS ──────────────────── */
function TeamAbsences({team,absences,setAbsences,lang,t}){
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({memberId:'',type:'medCert',startDate:'',endDate:'',note:''});
  const TL={medCert:t.medCert,personal:t.personal,leave:t.leave,other:t.other};
  const stats=useMemo(()=>team.map(m=>({...m,total:absences.filter(a=>a.memberId===m.id).length,recent:absences.filter(a=>a.memberId===m.id&&a.startDate>addDays(TODAY,-90)).length})).sort((a,b)=>b.total-a.total),[team,absences]);
  const alerts=useMemo(()=>{
    const r=[];
    team.forEach(m=>{
      const rec=absences.filter(a=>a.memberId===m.id&&a.startDate>addDays(TODAY,-90));
      if(rec.length>=3) r.push(`${m.name}: ${rec.length} ${t.absHigh}`);
      const mons=rec.filter(a=>new Date(a.startDate+' 12:00').getDay()===1);
      if(mons.length>=2) r.push(`${m.name}: ${t.absPattern} (${mons.length}x)`);
    });
    return r;
  },[team,absences,t]);
  const add=()=>{
    if(!form.memberId||!form.startDate) return;
    setAbsences(p=>[...p,{...form,id:Date.now(),memberId:parseInt(form.memberId),endDate:form.endDate||form.startDate,typeLabel:TL[form.type]}]);
    setForm({memberId:'',type:'medCert',startDate:'',endDate:'',note:''});setShow(false);
  };
  return(
    <div className="pg">
      <div className="ph"><div className="ph-l"><h2>{t.absences}</h2><p>{lang==='PT'?'Histórico e análise de absenteísmo':'Absence history and analysis'}</p></div><button className="btn btn-p" onClick={()=>setShow(!show)}>+ {t.register}</button></div>
      {alerts.length>0&&<div style={{marginBottom:14}}>{alerts.map((a,i)=><div key={i} className="al alw">⚠ {a}</div>)}</div>}
      {show&&(<div className="cd" style={{marginBottom:14}}>
        <div className="ct">{t.newAbsence}</div>
        <div className="g2" style={{gap:8,marginBottom:8}}>
          <select className="inp" value={form.memberId} onChange={e=>setForm({...form,memberId:e.target.value})}><option value="">{t.selectMember}</option>{team.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select>
          <select className="inp" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>{Object.entries(TL).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select>
          <input className="inp" type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})} placeholder={t.start}/>
          <input className="inp" type="date" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})} placeholder={`${t.end} (${t.optional})`}/>
        </div>
        <input className="inp" style={{marginBottom:8}} value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder={t.note}/>
        <div className="row"><button className="btn btn-p" onClick={add}>{t.save}</button><button className="btn btn-o" onClick={()=>setShow(false)}>{t.cancel}</button></div>
      </div>)}
      <div className="g2" style={{alignItems:'start'}}>
        <div className="cd">
          <div className="ct">{t.absHistory} ({absences.length})</div>
          {absences.length===0?<p className="txs">{lang==='PT'?'Nenhuma ausência registrada.':'No absences registered.'}</p>:(
            <table className="tbl"><thead><tr><th>{lang==='PT'?'Membro':'Member'}</th><th>{lang==='PT'?'Tipo':'Type'}</th><th>{t.period}</th><th>{t.note}</th></tr></thead>
            <tbody>{[...absences].sort((a,b)=>b.startDate.localeCompare(a.startDate)).map(ab=>(
              <tr key={ab.id}>
                <td><div className="row"><div className={`av${isIN(ab.memberId,team)?' av-in':''}`}>{mavatar(ab.memberId,team)}</div><span>{mname(ab.memberId,team)}</span></div></td>
                <td><span className={`b ${ab.type==='medCert'?'br':'bz'}`}>{TL[ab.type]||ab.typeLabel||ab.type}</span></td>
                <td><span className="mono txs">{fmt(ab.startDate)}{ab.endDate&&ab.endDate!==ab.startDate?` → ${fmt(ab.endDate)}`:''}</span></td>
                <td><span className="txs">{ab.note||'—'}</span></td>
              </tr>
            ))}</tbody></table>
          )}
        </div>
        <div className="cd">
          <div className="ct">{t.absIndex}</div>
          {stats.map(m=>(
            <div key={m.id} style={{marginBottom:14}}>
              <div className="row" style={{marginBottom:3}}><div className={`av${m.country==='IN'?' av-in':''}`}>{m.avatar}</div>
                <div className="f1"><div style={{fontSize:12.5}}>{m.name}</div><div className="txs">{m.role[lang]}</div></div>
                <span className={`b ${m.total>=3?'br':m.total>=1?'by':'bg'}`}>{m.total} {m.total!==1?t.absences2:t.absence2}</span>
              </div>
              {m.recent>0&&<div className="txs" style={{paddingLeft:35}}>⚡ {m.recent} {t.last90}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── FÉRIAS ─────────────────────── */
function VacationPlanner({team,vacations,setVacations,lang,t}){
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({memberId:'',startDate:'',endDate:'',note:''});
  const add=()=>{if(!form.memberId||!form.startDate||!form.endDate) return;setVacations(p=>[...p,{...form,id:Date.now(),memberId:parseInt(form.memberId),status:'pending'}]);setForm({memberId:'',startDate:'',endDate:'',note:''});setShow(false)};
  const upd=(id,s)=>setVacations(p=>p.map(v=>v.id===id?{...v,status:s}:v));
  return(
    <div className="pg">
      <div className="ph"><div className="ph-l"><h2>{t.vacations}</h2><p>{lang==='PT'?'Planejamento e aprovações':'Planning and approvals'}</p></div><button className="btn btn-p" onClick={()=>setShow(!show)}>+ {t.plan}</button></div>
      {show&&(<div className="cd" style={{marginBottom:14}}>
        <div className="ct">{t.newVacation}</div>
        <div className="g2" style={{gap:8,marginBottom:8}}>
          <select className="inp" value={form.memberId} onChange={e=>setForm({...form,memberId:e.target.value})}><option value="">{t.selectMember}</option>{team.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select>
          <input className="inp" value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder={`${t.note} (${t.optional})`}/>
          <input className="inp" type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/>
          <input className="inp" type="date" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})}/>
        </div>
        <div className="row"><button className="btn btn-p" onClick={add}>{t.save}</button><button className="btn btn-o" onClick={()=>setShow(false)}>{t.cancel}</button></div>
      </div>)}
      <div className="cd">
        {vacations.length===0?<p className="txs">{lang==='PT'?'Nenhuma férias registrada.':'No vacations registered.'}</p>:(
          <table className="tbl"><thead><tr><th>{lang==='PT'?'Membro':'Member'}</th><th>{t.period}</th><th>{t.days}</th><th>{t.status}</th><th>{t.note}</th><th></th></tr></thead>
          <tbody>{[...vacations].sort((a,b)=>a.startDate.localeCompare(b.startDate)).map(v=>{const sb=SB(v.status,t);return(
            <tr key={v.id}>
              <td><div className="row"><div className={`av${isIN(v.memberId,team)?' av-in':''}`}>{mavatar(v.memberId,team)}</div><span>{mname(v.memberId,team)}</span></div></td>
              <td><span className="mono txs">{fmt(v.startDate)} → {fmt(v.endDate)}</span></td>
              <td><span className="mono">{daysDiff(v.startDate,v.endDate)+1}</span></td>
              <td><span className={`b ${sb.cls}`}>{sb.label}</span></td>
              <td><span className="txs">{v.note||'—'}</span></td>
              <td>{v.status==='pending'&&(<div className="row" style={{gap:4}}>
                <button className="btn btn-o btn-s" style={{color:'var(--ok)',borderColor:'var(--ok)'}} onClick={()=>upd(v.id,'approved')}>✓</button>
                <button className="btn btn-o btn-s" style={{color:'var(--er)',borderColor:'var(--er)'}} onClick={()=>upd(v.id,'refused')}>✕</button>
              </div>)}</td>
            </tr>
          )})}</tbody></table>
        )}
      </div>
    </div>
  );
}

/* ─── FERIADOS ───────────────────── */
function HolidaysView({lang,t}){
  const [sel,setSel]=useState(COUNTRIES.map(c=>c.id));
  const [month,setMonth]=useState('all');
  const MN=lang==='PT'?MPTS:MENS;
  const flat=useMemo(()=>{const r=[];Object.entries(HOLIDAYS).forEach(([cid,hs])=>{if(!sel.includes(cid))return;hs.forEach(h=>{if(month==='all'||h.date.startsWith(`2026-${month}-`))r.push({...h,cid})})});return r.sort((a,b)=>a.date.localeCompare(b.date))},[sel,month]);
  const conflicts=useMemo(()=>{const by={};flat.forEach(h=>{if(!by[h.date])by[h.date]=[];by[h.date].push(h)});return Object.entries(by).filter(([,hs])=>hs.length>=2).sort((a,b)=>a[0].localeCompare(b[0]))},[flat]);
  return(
    <div className="pg">
      <div className="ph"><div className="ph-l"><h2>{t.holidays} 2026</h2><p>{lang==='PT'?'Brasil e países atendidos':'Brazil and served countries'}</p></div></div>
      <div className="cd" style={{marginBottom:12}}><div className="ct">{t.filterByCountry}</div><div>{COUNTRIES.map(c=>(<span key={c.id} className={`cc${sel.includes(c.id)?' on':''}`} onClick={()=>setSel(p=>p.includes(c.id)?p.filter(x=>x!==c.id):[...p,c.id])}>{c.flag} {c.name[lang]}</span>))}</div></div>
      <div style={{marginBottom:12,display:'flex',gap:4,flexWrap:'wrap'}}>
        <button className={`btn btn-s ${month==='all'?'btn-p':'btn-o'}`} onClick={()=>setMonth('all')}>{t.all}</button>
        {MN.map((m,i)=>{const mm=String(i+1).padStart(2,'0');return <button key={i} className={`btn btn-s ${month===mm?'btn-p':'btn-o'}`} onClick={()=>setMonth(mm)}>{m}</button>})}
      </div>
      <div className="g2" style={{alignItems:'start'}}>
        <div className="cd">
          <div className="ct">{t.holidayCalendar} ({flat.length})</div>
          <div style={{maxHeight:500,overflowY:'auto'}}>{flat.map((h,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'6px 0',borderBottom:'1px solid var(--bd)'}}>
              <span className="mono txs" style={{minWidth:85}}>{fmt(h.date)}</span>
              <span style={{fontSize:14}}>{cflag(h.cid)}</span>
              <span style={{fontSize:12,flex:1}}>{h.name}</span>
              <span className="txs" style={{fontSize:10}}>{cname(h.cid,lang)}</span>
            </div>
          ))}</div>
        </div>
        <div className="cd">
          <div className="ct">⚠ {t.overlap} ({conflicts.length})</div>
          {conflicts.length===0?<p className="txs">{t.noOverlap}</p>:
            <div style={{maxHeight:500,overflowY:'auto'}}>{conflicts.map(([date,hs])=>(
              <div key={date} style={{marginBottom:10,padding:'9px 10px',background:'var(--cd2)',borderRadius:6,border:'1px solid rgba(245,158,11,.14)'}}>
                <div className="row" style={{marginBottom:6}}><span className="mono" style={{color:'var(--wn)',fontSize:12}}>{fmt(date)}</span><span className="b by">{hs.length} {t.countries}</span></div>
                {hs.map((h,i)=><div key={i} style={{fontSize:11.5,marginBottom:2}}>{cflag(h.cid)} <b>{cname(h.cid,lang)}</b>: {h.name}</div>)}
              </div>
            ))}</div>
          }
        </div>
      </div>
    </div>
  );
}

/* ─── PROJETOS ───────────────────── */
const emptyProj=()=>({id:0,name:'',countries:[],startDate:'',endDate:'',status:'planned',milestones:[{id:1,name:'Kick-off',date:'',done:false}]});

function ProjectsView({projects,setProjects,lang,t}){
  const [sel,setSel]=useState(null);
  const [showForm,setShowForm]=useState(false);
  const [form,setForm]=useState(emptyProj());
  const [confirmDel,setConfirmDel]=useState(null);

  const toggleMs=(pid,mid)=>setProjects(p=>p.map(pr=>pr.id!==pid?pr:{...pr,milestones:pr.milestones.map(m=>m.id!==mid?m:{...m,done:!m.done})}));
  const delProject=id=>{setProjects(p=>p.filter(pr=>pr.id!==id));setConfirmDel(null);if(sel===id)setSel(null)};
  const addMs=()=>setForm(f=>({...f,milestones:[...f.milestones,{id:Date.now(),name:'',date:'',done:false}]}));
  const updMs=(id,field,val)=>setForm(f=>({...f,milestones:f.milestones.map(m=>m.id!==id?m:{...m,[field]:val})}));
  const removeMs=id=>setForm(f=>({...f,milestones:f.milestones.filter(m=>m.id!==id)}));
  const toggleC=cid=>setForm(f=>({...f,countries:f.countries.includes(cid)?f.countries.filter(x=>x!==cid):[...f.countries,cid]}));
  const saveProject=()=>{
    if(!form.name||!form.startDate||!form.endDate) return;
    setProjects(p=>[...p,{...form,id:Date.now()}]);
    setForm(emptyProj());setShowForm(false);
  };

  return(
    <div className="pg">
      <div className="ph"><div className="ph-l"><h2>{t.projects}</h2><p>{lang==='PT'?'Milestones, introduções por país e linha do tempo':'Milestones, country introductions and timeline'}</p></div>
        <button className="btn btn-p" onClick={()=>{setForm(emptyProj());setShowForm(!showForm)}}>{t.newProject}</button>
      </div>

      {showForm&&(
        <div className="cd" style={{marginBottom:14,border:'1px solid rgba(0,207,255,.2)'}}>
          <div className="ct">{lang==='PT'?'Novo Projeto':'New Project'}</div>
          <input className="inp" style={{marginBottom:8}} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder={t.projName}/>
          <div className="g2" style={{gap:8,marginBottom:8}}>
            <div><div style={{fontSize:10,color:'var(--txm)',marginBottom:4}}>{t.start}</div><input className="inp" type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/></div>
            <div><div style={{fontSize:10,color:'var(--txm)',marginBottom:4}}>{t.end}</div><input className="inp" type="date" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})}/></div>
          </div>
          <div style={{marginBottom:10}}>
            <div style={{fontSize:10,color:'var(--txm)',marginBottom:5}}>{t.projCountries}</div>
            {COUNTRIES.map(c=><span key={c.id} className={`cc${form.countries.includes(c.id)?' on':''}`} onClick={()=>toggleC(c.id)}>{c.flag} {c.name[lang]}</span>)}
          </div>
          <div style={{marginBottom:10}}>
            <div style={{fontSize:10,color:'var(--txm)',marginBottom:6}}>{t.milestones}</div>
            {form.milestones.map(ms=>(
              <div key={ms.id} className="row" style={{marginBottom:6}}>
                <input className="inp" style={{flex:2}} value={ms.name} onChange={e=>updMs(ms.id,'name',e.target.value)} placeholder={t.msName}/>
                <input className="inp" style={{flex:1}} type="date" value={ms.date} onChange={e=>updMs(ms.id,'date',e.target.value)}/>
                {form.milestones.length>1&&<button className="btn btn-d btn-s" onClick={()=>removeMs(ms.id)}>✕</button>}
              </div>
            ))}
            <button className="btn btn-o btn-s" onClick={addMs}>{t.addMs}</button>
          </div>
          <div className="row">
            <button className="btn btn-p" onClick={saveProject}>{t.save}</button>
            <button className="btn btn-o" onClick={()=>setShowForm(false)}>{t.cancel}</button>
          </div>
        </div>
      )}

      {confirmDel&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.65)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:200}}>
          <div className="cd" style={{width:340,border:'1px solid var(--er)'}}>
            <p style={{fontSize:13,marginBottom:14}}>⚠ {t.removeProj}<br/><b style={{color:'var(--tx)'}}>{projects.find(p=>p.id===confirmDel)?.name}</b></p>
            <div className="row">
              <button className="btn" style={{background:'var(--er)',color:'#fff'}} onClick={()=>delProject(confirmDel)}>{lang==='PT'?'Remover':'Remove'}</button>
              <button className="btn btn-o" onClick={()=>setConfirmDel(null)}>{t.cancel}</button>
            </div>
          </div>
        </div>
      )}

      <div className="g2" style={{alignItems:'start'}}>
        <div>
          {projects.length===0&&!showForm&&<div className="al ali">{lang==='PT'?'Clique em "+ Novo Projeto" para começar.':'Click "+ New Project" to get started.'}</div>}
          {projects.map(p=>{
            const dn=p.milestones.filter(m=>m.done).length;
            const pct=Math.round(dn/p.milestones.length*100);
            const isOpen=sel===p.id;const sb=SB(p.status,t);
            return(
              <div key={p.id} className="cd" style={{marginBottom:12,border:`1px solid ${isOpen?'var(--ac)':'var(--bd)'}`,transition:'border .15s'}}>
                <div className="row" style={{marginBottom:8}}>
                  <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,flex:1,cursor:'pointer'}} onClick={()=>setSel(isOpen?null:p.id)}>{p.name}</span>
                  <span className={`b ${sb.cls}`}>{sb.label}</span>
                  <button className="btn btn-d btn-s" onClick={()=>setConfirmDel(p.id)} title={t.deleteProject}>✕</button>
                </div>
                <div style={{marginBottom:7,display:'flex',flexWrap:'wrap',gap:4}}>
                  {p.countries.map(c=><span key={c} style={{fontSize:11,background:'var(--cd2)',padding:'2px 6px',borderRadius:3,border:'1px solid var(--bd)'}}>{cflag(c)} {cname(c,lang)}</span>)}
                </div>
                <div className="row" style={{marginBottom:5,cursor:'pointer'}} onClick={()=>setSel(isOpen?null:p.id)}>
                  <span className="mono txs" style={{fontSize:10}}>{fmt(p.startDate)} → {fmt(p.endDate)}</span>
                  <span className="mono txs" style={{marginLeft:'auto'}}>{pct}%</span>
                </div>
                <div className="pb"><div className="pf" style={{width:`${pct}%`}}/></div>
                {isOpen&&(<div style={{marginTop:12,paddingTop:12,borderTop:'1px solid var(--bd)'}}>
                  <div className="ct" style={{marginBottom:6}}>{t.milestones} — {t.clickToggle}</div>
                  {p.milestones.map(ms=>{const late=!ms.done&&ms.date&&ms.date<TODAY;return(
                    <div key={ms.id} className="row" style={{padding:'5px 0',borderBottom:'1px solid var(--bd)',cursor:'pointer'}} onClick={e=>{e.stopPropagation();toggleMs(p.id,ms.id)}}>
                      <div className="ms-dot" style={{background:ms.done?'var(--ok)':late?'var(--er)':'var(--bd2)'}}/>
                      <span style={{flex:1,fontSize:12,textDecoration:ms.done?'line-through':'none',color:ms.done?'var(--txm)':'var(--tx)'}}>{ms.name}</span>
                      <span className="mono txs">{fmt(ms.date)}</span>
                      {late&&<span className="b br">{t.late}</span>}
                      {ms.done&&<span className="b bg">✓</span>}
                    </div>
                  )})}
                </div>)}
              </div>
            );
          })}
        </div>
        <div className="cd">
          <div className="ct">{t.timeline}</div>
          {projects.length===0?<p className="txs">{lang==='PT'?'Nenhum projeto.':'No projects.'}</p>:(
            <>
              <div style={{display:'flex',height:14,marginBottom:6}}>{(lang==='PT'?MPTS:MENS).map((m,i)=><div key={i} style={{flex:1,fontSize:9,color:'var(--txd)',textAlign:'center',borderLeft:'1px solid var(--bd)',paddingLeft:2}}>{m}</div>)}</div>
              {projects.map(p=>{
                const ls=Math.max(0,daysDiff(YEAR_START,p.startDate));
                const le=Math.min(YEAR_DAYS,daysDiff(YEAR_START,p.endDate));
                const dn=p.milestones.filter(m=>m.done).length;
                const pct=dn/p.milestones.length;
                return(<div key={p.id} style={{marginBottom:10}}>
                  <div style={{fontSize:11,marginBottom:3,fontWeight:500}}>{p.name}</div>
                  <div style={{height:16,background:'var(--cd2)',borderRadius:3,position:'relative',border:'1px solid var(--bd)'}}>
                    <div style={{position:'absolute',left:`${ls/YEAR_DAYS*100}%`,width:`${(le-ls)/YEAR_DAYS*100}%`,height:'100%',background:'rgba(0,207,255,.14)',borderRadius:3,border:'1px solid rgba(0,207,255,.28)',overflow:'hidden'}}><div style={{width:`${pct*100}%`,height:'100%',background:'rgba(0,207,255,.38)'}}/></div>
                    {p.milestones.filter(ms=>ms.date).map(ms=>{const mpos=daysDiff(YEAR_START,ms.date)/YEAR_DAYS*100;return <div key={ms.id} title={ms.name} style={{position:'absolute',left:`${mpos}%`,top:0,width:2,height:'100%',background:ms.done?'var(--ok)':'var(--wn)',transform:'translateX(-50%)'}}/>;})}</div>
                </div>);
              })}
              <div style={{display:'flex',gap:12,marginTop:10}}>
                <div className="row" style={{gap:5}}><div style={{width:10,height:4,background:'var(--ok)',borderRadius:2}}/><span className="txs" style={{fontSize:10}}>{lang==='PT'?'MS concluído':'Done MS'}</span></div>
                <div className="row" style={{gap:5}}><div style={{width:10,height:4,background:'var(--wn)',borderRadius:2}}/><span className="txs" style={{fontSize:10}}>{lang==='PT'?'MS pendente':'Pending MS'}</span></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── VIAGENS ────────────────────── */
function TravelView({team,travels,setTravels,lang,t}){
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({memberId:'',destination:'',country:'IN',purpose:'',startDate:'',endDate:'',status:'planned'});
  const add=()=>{if(!form.memberId||!form.destination||!form.startDate)return;setTravels(p=>[...p,{...form,id:Date.now(),memberId:parseInt(form.memberId)}]);setForm({memberId:'',destination:'',country:'IN',purpose:'',startDate:'',endDate:'',status:'planned'});setShow(false)};
  const upcoming=travels.filter(r=>r.startDate>=TODAY).sort((a,b)=>a.startDate.localeCompare(b.startDate));
  const past=travels.filter(r=>r.startDate<TODAY).sort((a,b)=>b.startDate.localeCompare(a.startDate));
  return(
    <div className="pg">
      <div className="ph"><div className="ph-l"><h2>{t.travels}</h2><p>{lang==='PT'?'Deslocamentos internacionais':'International travel management'}</p></div><button className="btn btn-p" onClick={()=>setShow(!show)}>+ {lang==='PT'?'Nova':'New'}</button></div>
      {show&&(<div className="cd" style={{marginBottom:14}}>
        <div className="ct">{t.newTravel}</div>
        <div className="g2" style={{gap:8,marginBottom:8}}>
          <select className="inp" value={form.memberId} onChange={e=>setForm({...form,memberId:e.target.value})}><option value="">{t.selectTraveler}</option>{team.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select>
          <select className="inp" value={form.country} onChange={e=>setForm({...form,country:e.target.value})}>{COUNTRIES.map(c=><option key={c.id} value={c.id}>{c.flag} {c.name[lang]}</option>)}</select>
          <input className="inp" value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})} placeholder={`${lang==='PT'?'Cidade':'City'}, ${lang==='PT'?'País':'Country'}`}/>
          <input className="inp" value={form.purpose} onChange={e=>setForm({...form,purpose:e.target.value})} placeholder={t.purpose}/>
          <input className="inp" type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/>
          <input className="inp" type="date" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})}/>
        </div>
        <div className="row"><button className="btn btn-p" onClick={add}>{t.save}</button><button className="btn btn-o" onClick={()=>setShow(false)}>{t.cancel}</button></div>
      </div>)}
      <div className="cd" style={{marginBottom:12}}>
        <div className="ct">{t.upcomingTrips} ({upcoming.length})</div>
        {upcoming.length===0?<p className="txs">{t.noTrips}</p>:(
          <table className="tbl"><thead><tr><th>{lang==='PT'?'Viajante':'Traveler'}</th><th>{t.destination}</th><th>{t.purpose}</th><th>{t.period}</th><th>{t.days}</th><th>{t.status}</th></tr></thead>
          <tbody>{upcoming.map(tr=>{const sb=SB(tr.status,t);return(
            <tr key={tr.id}>
              <td><div className="row"><div className={`av${isIN(tr.memberId,team)?' av-in':''}`}>{mavatar(tr.memberId,team)}</div><span>{mname(tr.memberId,team)}</span></div></td>
              <td><span style={{fontSize:13}}>{cflag(tr.country)} {tr.destination}</span></td>
              <td><span className="txs">{tr.purpose}</span></td>
              <td><span className="mono txs">{fmt(tr.startDate)} → {fmt(tr.endDate)}</span></td>
              <td><span className="mono">{tr.endDate?daysDiff(tr.startDate,tr.endDate)+1:'—'}</span></td>
              <td><span className={`b ${sb.cls}`}>{sb.label}</span></td>
            </tr>
          )})}</tbody></table>
        )}
      </div>
      {past.length>0&&<div className="cd" style={{opacity:.6}}>
        <div className="ct">{t.history}</div>
        <table className="tbl"><thead><tr><th>{lang==='PT'?'Viajante':'Traveler'}</th><th>{t.destination}</th><th>{t.period}</th><th>{t.purpose}</th></tr></thead>
        <tbody>{past.map(tr=><tr key={tr.id}><td>{mname(tr.memberId,team)}</td><td>{cflag(tr.country)} {tr.destination}</td><td><span className="mono txs">{fmt(tr.startDate)} → {fmt(tr.endDate)}</span></td><td className="txs">{tr.purpose}</td></tr>)}</tbody></table>
      </div>}
    </div>
  );
}

/* ─── LEMBRETES ──────────────────── */
function RemindersView({team,reminders,setReminders,lang,t}){
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({title:'',assignee:'',dueDate:'',priority:'medium',note:''});
  const PL={high:t.high,medium:t.medium,low:t.low};
  const add=()=>{if(!form.title||!form.dueDate)return;setReminders(p=>[...p,{...form,id:Date.now(),assignee:parseInt(form.assignee)||null,done:false}]);setForm({title:'',assignee:'',dueDate:'',priority:'medium',note:''});setShow(false)};
  const toggle=id=>setReminders(p=>p.map(r=>r.id===id?{...r,done:!r.done}:r));
  const over=reminders.filter(r=>!r.done&&r.dueDate<TODAY).sort((a,b)=>a.dueDate.localeCompare(b.dueDate));
  const pend=reminders.filter(r=>!r.done&&r.dueDate>=TODAY).sort((a,b)=>a.dueDate.localeCompare(b.dueDate));
  const done=reminders.filter(r=>r.done);
  const RRow=({r})=>{const ov=!r.done&&r.dueDate<TODAY;return(
    <div className="cr" style={{opacity:r.done?.5:1}}>
      <input type="checkbox" checked={r.done} onChange={()=>toggle(r.id)} style={{cursor:'pointer',accentColor:'var(--ac)',flexShrink:0}}/>
      <div className="f1"><div style={{fontSize:12.5,textDecoration:r.done?'line-through':'none'}}>{r.title}</div>{r.note&&<div className="txs">{r.note}</div>}</div>
      {r.assignee&&<span className="txs" style={{fontSize:10}}>{mname(r.assignee,team)}</span>}
      <span className={`b ${r.priority==='high'?'br':r.priority==='medium'?'by':'bz'}`}>{PL[r.priority]||r.priority}</span>
      <span className="mono txs" style={{fontSize:10,color:ov?'var(--er)':'var(--txm)'}}>{fmt(r.dueDate)}</span>
    </div>
  )};
  return(
    <div className="pg">
      <div className="ph"><div className="ph-l"><h2>{t.reminders}</h2><p>{lang==='PT'?'Follow-ups e acompanhamentos':'Follow-ups and tracking'}</p></div><button className="btn btn-p" onClick={()=>setShow(!show)}>+ {lang==='PT'?'Novo':'New'}</button></div>
      {show&&(<div className="cd" style={{marginBottom:14}}>
        <div className="ct">{t.newReminder}</div>
        <input className="inp" style={{marginBottom:8}} value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder={lang==='PT'?'Título...':'Title...'}/>
        <div className="g2" style={{gap:8,marginBottom:8}}>
          <select className="inp" value={form.assignee} onChange={e=>setForm({...form,assignee:e.target.value})}><option value="">{t.assignee} ({t.optional})</option>{team.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select>
          <select className="inp" value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option value="high">{t.high}</option><option value="medium">{t.medium}</option><option value="low">{t.low}</option></select>
          <input className="inp" type="date" value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})}/>
        </div>
        <input className="inp" style={{marginBottom:8}} value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder={`${t.note}...`}/>
        <div className="row"><button className="btn btn-p" onClick={add}>{t.save}</button><button className="btn btn-o" onClick={()=>setShow(false)}>{t.cancel}</button></div>
      </div>)}
      {over.length>0&&<div className="cd" style={{marginBottom:12,border:'1px solid rgba(244,63,94,.2)'}}><div className="ct" style={{color:'var(--er)'}}>{t.overdue} ({over.length})</div>{over.map(r=><RRow key={r.id} r={r}/>)}</div>}
      <div className="cd" style={{marginBottom:12}}><div className="ct">{t.pending2} ({pend.length})</div>{pend.length===0?<p className="txs">{t.noPending}</p>:pend.map(r=><RRow key={r.id} r={r}/>)}</div>
      {done.length>0&&<div className="cd"><div className="ct" style={{color:'var(--txd)'}}>{t.completed} ({done.length})</div>{done.map(r=><RRow key={r.id} r={r}/>)}</div>}
    </div>
  );
}

/* ─── BLOQUEIOS ──────────────────── */
function BlockersView({team,projects,blockers,setBlockers,lang,t}){
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({title:'',projectId:'',severity:'medium',owner:'',status:'open',date:TODAY,resolution:'',note:''});
  const SevL=(s)=>({high:t.high,medium:t.medium,low:t.low})[s]||s;
  const add=()=>{if(!form.title)return;setBlockers(p=>[...p,{...form,id:Date.now(),projectId:parseInt(form.projectId)||null,owner:parseInt(form.owner)||null}]);setForm({title:'',projectId:'',severity:'medium',owner:'',status:'open',date:TODAY,resolution:'',note:''});setShow(false)};
  const upd=(id,s)=>setBlockers(p=>p.map(b=>b.id===id?{...b,status:s}:b));
  const open=blockers.filter(b=>b.status==='open');
  const treat=blockers.filter(b=>b.status==='inTreatment');
  const res=blockers.filter(b=>b.status==='resolved');
  const BRow=({b})=>{const sb=SB(b.status,t);return(
    <div style={{padding:'10px 0',borderBottom:'1px solid var(--bd)'}}>
      <div className="row" style={{marginBottom:5}}><span className={`b ${b.severity==='high'?'br':b.severity==='medium'?'by':'bz'}`}>{SevL(b.severity)}</span><span style={{fontSize:12.5,flex:1,fontWeight:500}}>{b.title}</span><span className={`b ${sb.cls}`}>{sb.label}</span></div>
      <div className="row" style={{gap:12,flexWrap:'wrap'}}>
        {b.projectId&&<span className="txs" style={{fontSize:10}}>📁 {projects.find(p=>p.id===b.projectId)?.name||'—'}</span>}
        {b.owner&&<span className="txs" style={{fontSize:10}}>👤 {mname(b.owner,team)}</span>}
        <span className="mono txs" style={{fontSize:10}}>{fmt(b.date)}</span>
        {b.resolution&&<span className="txs" style={{fontSize:10}}>⏱ {t.resolution}: {fmt(b.resolution)}</span>}
      </div>
      {b.note&&<div className="txs" style={{marginTop:3,fontSize:11}}>{b.note}</div>}
      {b.status!=='resolved'&&(<div className="row" style={{marginTop:6,gap:4}}>
        {b.status==='open'&&<button className="btn btn-o btn-s" onClick={()=>upd(b.id,'inTreatment')}>{t.inTreatmentBtn}</button>}
        <button className="btn btn-o btn-s" style={{color:'var(--ok)',borderColor:'var(--ok)'}} onClick={()=>upd(b.id,'resolved')}>{t.resolve}</button>
      </div>)}
    </div>
  )};
  return(
    <div className="pg">
      <div className="ph"><div className="ph-l"><h2>{t.blockers}</h2><p>{lang==='PT'?'Impedimentos e pontos de atenção':'Impediments and attention points'}</p></div><button className="btn btn-p" onClick={()=>setShow(!show)}>+ {lang==='PT'?'Novo':'New'}</button></div>
      <div className="g3" style={{marginBottom:14}}>
        {[{label:t.open,n:open.length,c:'var(--er)'},{label:t.inTreatment,n:treat.length,c:'var(--wn)'},{label:t.resolved,n:res.length,c:'var(--ok)'}].map(s=>(
          <div key={s.label} className="cd-sm" style={{textAlign:'center'}}><div className="sn" style={{color:s.c,fontSize:26}}>{s.n}</div><div className="sl">{s.label}</div></div>
        ))}
      </div>
      {show&&(<div className="cd" style={{marginBottom:14}}>
        <div className="ct">{t.newBlocker}</div>
        <input className="inp" style={{marginBottom:8}} value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder={lang==='PT'?'Descrição do bloqueio...':'Blocker description...'}/>
        <div className="g2" style={{gap:8,marginBottom:8}}>
          <select className="inp" value={form.projectId} onChange={e=>setForm({...form,projectId:e.target.value})}><option value="">{lang==='PT'?'Projeto':'Project'} ({t.optional})</option>{projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select>
          <select className="inp" value={form.owner} onChange={e=>setForm({...form,owner:e.target.value})}><option value="">{t.owner} ({t.optional})</option>{team.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select>
          <select className="inp" value={form.severity} onChange={e=>setForm({...form,severity:e.target.value})}><option value="high">{t.high}</option><option value="medium">{t.medium}</option><option value="low">{t.low}</option></select>
          <input className="inp" type="date" value={form.resolution} onChange={e=>setForm({...form,resolution:e.target.value})} placeholder={t.resolution}/>
        </div>
        <input className="inp" style={{marginBottom:8}} value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder={t.context}/>
        <div className="row"><button className="btn btn-p" onClick={add}>{t.save}</button><button className="btn btn-o" onClick={()=>setShow(false)}>{t.cancel}</button></div>
      </div>)}
      <div className="g2" style={{alignItems:'start'}}>
        <div>
          {open.length>0&&<div className="cd" style={{marginBottom:12,border:'1px solid rgba(244,63,94,.16)'}}><div className="ct" style={{color:'var(--er)'}}>{t.open} ({open.length})</div>{open.map(b=><BRow key={b.id} b={b}/>)}</div>}
          {treat.length>0&&<div className="cd" style={{border:'1px solid rgba(245,158,11,.16)'}}><div className="ct" style={{color:'var(--wn)'}}>{t.inTreatment} ({treat.length})</div>{treat.map(b=><BRow key={b.id} b={b}/>)}</div>}
          {open.length===0&&treat.length===0&&<div className="al ali">✓ {t.noBlockers}</div>}
        </div>
        {res.length>0&&<div className="cd" style={{opacity:.6}}><div className="ct">{t.resolved} ({res.length})</div>{res.map(b=><BRow key={b.id} b={b}/>)}</div>}
      </div>
    </div>
  );
}

/* ─── RADAR DE RISCO ─────────────── */
function RiskRadar({team,absences,vacations,projects,travels,reminders,blockers,lang,t}){
  const in30=addDays(TODAY,30);
  const projRisk=projects.map(p=>{
    const ob=blockers.filter(b=>b.projectId===p.id&&b.status!=='resolved');
    const om=p.milestones.filter(m=>!m.done&&m.date&&m.date<TODAY);
    const score=om.length*2+ob.filter(b=>b.severity==='high').length*3+ob.filter(b=>b.severity==='medium').length;
    const level=score>=5?'critical':score>=3?'high':score>=1?'medium':'low';
    const ll={critical:t.critical,high:t.high,medium:t.medium,low:t.low}[level];
    return{...p,score,level,ll,ob:ob.length,om:om.length,sb:SB(p.status,t)};
  });
  const teamStatus=team.map(m=>{
    const vac=vacations.filter(v=>v.memberId===m.id&&v.startDate<=in30&&(v.endDate||v.startDate)>=TODAY);
    const abs=absences.filter(a=>a.memberId===m.id&&a.startDate<=in30&&(a.endDate||a.startDate)>=TODAY);
    const trv=travels.filter(r=>r.memberId===m.id&&r.startDate<=in30&&(r.endDate||r.startDate)>=TODAY);
    return{...m,vac:vac.length,abs:abs.length,trv:trv.length};
  });
  const critAlerts=[];
  projRisk.filter(p=>p.level==='critical').forEach(p=>critAlerts.push({type:'er',msg:`${t.critical}: ${p.name} — ${p.ob} ${lang==='PT'?'bloqueio(s)':'blocker(s)'}, ${p.om} ms ${lang==='PT'?'atrasado(s)':'delayed'}`}));
  projRisk.filter(p=>p.level==='high').forEach(p=>critAlerts.push({type:'wn',msg:`${lang==='PT'?'Projeto em risco':'Project at risk'}: ${p.name}`}));
  reminders.filter(r=>!r.done&&r.dueDate<TODAY).forEach(r=>critAlerts.push({type:'wn',msg:`${lang==='PT'?'Lembrete vencido':'Overdue reminder'}: ${r.title}`}));
  return(
    <div className="pg">
      <div className="ph"><div className="ph-l"><h2>{t.risk}</h2><p>{lang==='PT'?'Criticidades e disponibilidade consolidadas':'Consolidated criticalities and availability'}</p></div></div>
      <div className="cd" style={{marginBottom:12}}>
        <div className="ct">{t.riskByProject}</div>
        {projects.length===0?<p className="txs">{lang==='PT'?'Nenhum projeto.':'No projects.'}</p>:(
          <table className="tbl"><thead><tr><th>{lang==='PT'?'Projeto':'Project'}</th><th>{lang==='PT'?'Nível':'Level'}</th><th>{t.riskScore}</th><th>{t.blockers}</th><th>{lang==='PT'?'MS Atrasados':'Late MS'}</th><th>{t.status}</th></tr></thead>
          <tbody>{projRisk.map(p=>(
            <tr key={p.id}>
              <td style={{fontSize:12.5,fontWeight:500}}>{p.name}</td>
              <td><span className={`b ${p.level==='critical'?'br':p.level==='high'?'bo':p.level==='medium'?'by':'bg'}`}>{p.ll}</span></td>
              <td><span className="mono" style={{color:p.score>4?'var(--er)':p.score>2?'var(--wn)':'var(--ok)'}}>{p.score}</span></td>
              <td>{p.ob>0?<span className="b br">{p.ob}</span>:<span className="txs">—</span>}</td>
              <td>{p.om>0?<span className="b by">{p.om}</span>:<span className="txs">—</span>}</td>
              <td><span className={`b ${p.sb.cls}`}>{p.sb.label}</span></td>
            </tr>
          ))}</tbody></table>
        )}
      </div>
      <div className="g2" style={{alignItems:'start'}}>
        <div className="cd">
          <div className="ct">{t.availability}</div>
          {teamStatus.map(m=>(
            <div key={m.id} className="cr">
              <div className={`av${m.country==='IN'?' av-in':''}`}>{m.avatar}</div>
              <div className="f1"><div style={{fontSize:12.5}}>{m.name}</div><div className="txs">{m.role[lang]}</div></div>
              {m.vac>0&&<span className="b bb">{t.onVacation}</span>}
              {m.abs>0&&<span className="b by">{t.absent}</span>}
              {m.trv>0&&<span className="b bp">{t.traveling}</span>}
              {!m.vac&&!m.abs&&!m.trv&&<span className="b bg">{t.available}</span>}
            </div>
          ))}
        </div>
        <div className="cd">
          <div className="ct">{t.criticalAlerts}</div>
          {critAlerts.length===0?<div className="al ali">✓ {t.noRisk}</div>:critAlerts.map((a,i)=><div key={i} className={`al ${a.type==='er'?'ale':'alw'}`}>{a.type==='er'?'🔴':'⚠'} {a.msg}</div>)}
        </div>
      </div>
    </div>
  );
}

/* ─── APP ────────────────────────── */
export default function App(){
  const [tab,setTab]=useState('dashboard');
  const [lang,setLang]=useState('PT');
  const t=TR[lang];
  const [team]=useState(initTeam);
  const [absences,setAbsences]=useState([]);
  const [vacations,setVacations]=useState([]);
  const [projects,setProjects]=useState(initProjects);
  const [travels,setTravels]=useState([]);
  const [reminders,setReminders]=useState([]);
  const [blockers,setBlockers]=useState([]);
  const p={team,absences,setAbsences,vacations,setVacations,projects,setProjects,travels,setTravels,reminders,setReminders,blockers,setBlockers,lang,t};
  return(
    <>
      <style>{CSS}</style>
      <div className="app">
        <Sidebar tab={tab} setTab={setTab} lang={lang} setLang={setLang} t={t}/>
        <main className="main">
          {tab==='dashboard'&&<Dashboard {...p}/>}
          {tab==='absences'&&<TeamAbsences {...p}/>}
          {tab==='vacations'&&<VacationPlanner {...p}/>}
          {tab==='holidays'&&<HolidaysView {...p}/>}
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
