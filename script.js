const YOKAI = {
  kitsune:{name:'妖狐',img:'assets/yokai/kitsune.png',desc:'狡猾、機智又帶點惡作劇。'},
  oni:{name:'鬼',img:'assets/yokai/oni.png',desc:'強悍直接，重視力量與榮耀。'},
  yuki:{name:'雪女',img:'assets/yokai/yuki.png',desc:'沉著寧靜，給人清冷之感。'},
  kappa:{name:'河童',img:'assets/yokai/kappa.png',desc:'熱愛水域，好奇心旺盛。'},
  tengu:{name:'天狗',img:'assets/yokai/tengu.png',desc:'擅長乘風，居高臨下。'},
  tanuki:{name:'狸貓',img:'assets/yokai/tanuki.png',desc:'愛惡作劇，也喜歡變身。'},
  rokuro:{name:'轆轤首',img:'assets/yokai/rokuro.png',desc:'能伸長脖子，夜行嚇人。'},
  nura:{name:'滑頭鬼',img:'assets/yokai/nura.png',desc:'神出鬼沒，行蹤不定。'}
};
const QUESTIONS=[
{id:1,text:'你偏好的時間？',opts:['清晨','炎午','黃昏','午夜','風雨夜','雪夜','濃霧','月夜'],map:['kitsune','kappa','tanuki','nura','oni','yuki','rokuro','tengu'],next:2},
{id:2,text:'遇到挑戰，你通常？',opts:['智取','硬扛','觀察','試水','乘風而去','變個把戲','伸長脖子偷看','靜待時機'],map:['kitsune','oni','yuki','kappa','tengu','tanuki','rokuro','nura'],next:3},
{id:3,text:'最喜歡棲息環境？',opts:['竹林','火山口','冰原','河岸','高山','神社旁','古井','屋瓦'],map:['kitsune','oni','yuki','kappa','tengu','tanuki','rokuro','nura'],next:null}
];
let answers=[],rngBonus=0,current=1,bgm=new Audio('assets/bgm.mp3'),first=false;
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('startBtn').addEventListener('click',startQuiz);
});
function startQuiz(){document.querySelector('.hero').style.display='none';document.getElementById('quiz').style.display='block';renderQ();}
function renderQ(){const q=QUESTIONS.find(q=>q.id===current);if(!q)return;document.getElementById('question').textContent=q.text;const ops=document.getElementById('options');ops.innerHTML='';q.opts.forEach((o,i)=>{const b=document.createElement('button');b.textContent=o;b.onclick=()=>pick(i);ops.appendChild(b);});}
function pick(i){if(!first){bgm.play();first=true;}const q=QUESTIONS.find(q=>q.id===current);answers.push(q.map[i]);current=q.next;current?renderQ():result();}
function result(){const tally={};answers.forEach(a=>tally[a]=(tally[a]||0)+1);const main=Object.entries(tally).sort((a,b)=>b[1]-a[1])[0][0];document.getElementById('quiz').innerHTML=`<h2>你是 ${YOKAI[main].name}！</h2><img src="${YOKAI[main].img}" style="width:200px"><p>${YOKAI[main].desc}</p><button onclick="location.reload()">再測一次</button>`;}