/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import {
  Play,
  ExternalLink,
  CheckCircle2,
  Volume2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Gamepad2,
  Clock,
  HelpCircle,
  XCircle,
  ArrowRight,
  Trophy,
  RotateCcw,
  Video,
  BookOpen,
} from 'lucide-react';

/* =========================================================================
   TYPES
   ========================================================================= */

interface SubtitleItem {
  id: string;
  timecode: string;
  seconds: number;
  es: string;
  hy: string;
}

interface QuizOption {
  id: string;
  es: string;
  hy: string;
}

type QuestionCategory =
  | 'Comprensión / Ըմբռնում'
  | '¿Quién / qué dijo? / Ո՞վ / ի՞նչ ասաց'
  | 'Significado / Իմաստ'
  | 'Completa la frase / Լրացրու նախադասությունը'
  | 'Orden de los acontecimientos / Իրադարձությունների հաջորդականություն'
  | 'Español → Armenio / Իսպաներեն → Հայերեն'
  | 'Armenio → Español / Հայերեն → Իսպաներեն';

interface QuizQuestion {
  id: number;
  category: QuestionCategory;
  questionEs: string;
  questionHy: string;
  options: QuizOption[];
  correctOptionId: string;
}

/* =========================================================================
   DATA: SUBTITLES
   ========================================================================= */

const SUBTITLES_DATA: SubtitleItem[] = [
  {
    id: 'sub-1',
    timecode: '0:05',
    seconds: 5,
    es: 'Por respeto a la señorita Pontero, trataré con usted luego.',
    hy: 'Օրիորդ Պոնտերոյի հանդեպ հարգանքից ելնելով՝ ձեզնով հետո կզբաղվեմ։',
  },
  {
    id: 'sub-2',
    timecode: '0:22',
    seconds: 22,
    es: '¡Caballo! ¡Ven! ¡Ven aquí!',
    hy: 'Ձի՛։ Արի՛։ Արի՛ այստեղ։',
  },
  {
    id: 'sub-3',
    timecode: '0:31',
    seconds: 31,
    es: '¿Dónde? ¡Storm! ¡Estúpido! ¡Ven aquí ahora!',
    hy: 'Որտե՞ղ։ Սթո՛րմ։ Հիմա՛ր։ Հիմա արի՛ այստեղ։',
  },
  {
    id: 'sub-4',
    timecode: '0:39',
    seconds: 39,
    es: 'Te lo advierto, ¿eh? Voy a conseguirme otro.',
    hy: 'Զգուշացնում եմ քեզ, հա՞։ Ուրիշը կճարեմ։',
  },
  {
    id: 'sub-5',
    timecode: '0:47',
    seconds: 47,
    es: 'Bueno.',
    hy: 'Լավ։',
  },
  {
    id: 'sub-6',
    timecode: '1:14',
    seconds: 74,
    es: '¡Ay!',
    hy: 'Ա՜յ։',
  },
  {
    id: 'sub-7',
    timecode: '1:52',
    seconds: 112,
    es: '¿Y? ¿Qué opina?',
    hy: 'Դե՞, ի՞նչ եք կարծում։',
  },
  {
    id: 'sub-8',
    timecode: '2:01',
    seconds: 121,
    es: '¡Señor! ¡Señor! Conseguí el semental.',
    hy: 'Պարո՛ն։ Պարո՛ն։ Ես ձեռք բերեցի հովատակը։',
  },
  {
    id: 'sub-9',
    timecode: '2:04',
    seconds: 124,
    es: 'Grabé una zeta en el semental.',
    hy: 'Ես հովատակի վրա «Z» տառը փորագրեցի։',
  },
  {
    id: 'sub-10',
    timecode: '2:09',
    seconds: 129,
    es: 'Don Diego, el pueblo mencionará el nombre del Zorro de nuevo.',
    hy: 'Դոն Դիեգո, ժողովուրդը նորից կհիշատակի Զորրոյի անունը։',
  },
  {
    id: 'sub-11',
    timecode: '2:13',
    seconds: 133,
    es: '¿Crees que con robar un caballo y poner marcas en un muro puedes usar la máscara?',
    hy: 'Կարծում ես՝ մի ձի գողանալով և պատի վրա նշաններ թողնելով կարող ես այդ դիմակը կրել։',
  },
  {
    id: 'sub-12',
    timecode: '2:21',
    seconds: 141,
    es: 'Tenga cuidado.',
    hy: 'Զգույշ եղեք։',
  },
  {
    id: 'sub-13',
    timecode: '2:26',
    seconds: 146,
    es: 'Eres un ladrón, Alejandro. Un payaso vulgar.',
    hy: 'Դու գող ես, Ալեխանդրո։ Գռեհիկ ծաղրածու։',
  },
  {
    id: 'sub-14',
    timecode: '2:31',
    seconds: 151,
    es: 'El Zorro era un servidor del pueblo. Él no buscaba fama como tú.',
    hy: 'Զորրոն ժողովրդի ծառան էր։ Նա քեզ նման փառք չէր փնտրում։',
  },
  {
    id: 'sub-15',
    timecode: '2:36',
    seconds: 156,
    es: 'Bufón.',
    hy: 'Ծաղրածու։',
  },
  {
    id: 'sub-16',
    timecode: '2:38',
    seconds: 158,
    es: '¡Bufón!',
    hy: 'Ծաղրածո՛ւ։',
  },
];

/* =========================================================================
   DATA: 15 QUIZ QUESTIONS
   ========================================================================= */

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Comprensión / Ըմբռնում',
    questionEs: '¿A quién llama el personaje en el minuto 0:22 del vídeo?',
    questionHy: 'Ո՞ւմ է կանչում կերպարը տեսանյութի 0:22 րոպեին։',
    options: [
      { id: 'q1-a', es: 'A un soldado', hy: 'Զինվորին' },
      { id: 'q1-b', es: 'A un caballo', hy: 'Ձիուն' },
      { id: 'q1-c', es: 'A un amigo', hy: 'Ընկերոջը' },
      { id: 'q1-d', es: 'A un criado', hy: 'Ծառային' },
    ],
    correctOptionId: 'q1-b',
  },
  {
    id: 2,
    category: '¿Quién / qué dijo? / Ո՞վ / ի՞նչ ասաց',
    questionEs: '¿Qué le dice Alejandro al caballo con impaciencia?',
    questionHy: 'Ի՞նչ է անհամբերությամբ ասում Ալեխանդրոն ձիուն։',
    options: [
      { id: 'q2-a', es: '¡Storm! ¡Estúpido! ¡Ven aquí ahora!', hy: 'Սթո՛րմ։ Հիմա՛ր։ Հիմա արի՛ այստեղ։' },
      { id: 'q2-b', es: '¡Por favor, corre hacia la colina!', hy: 'Խնդրում եմ, վազի՛ր դեպի բլուրը։' },
      { id: 'q2-c', es: '¡Espera pacientemente en la sombra!', hy: 'Համբերատար սպասի՛ր ստվերում։' },
      { id: 'q2-d', es: '¡Regresa a tu establo ahora mismo!', hy: 'Հենց հիմա վերադարձի՛ր ախոռ։' },
    ],
    correctOptionId: 'q2-a',
  },
  {
    id: 3,
    category: 'Completa la frase / Լրացրու նախադասությունը',
    questionEs: 'Completa la frase: «Te lo advierto, ¿eh? Voy a conseguirme _____».',
    questionHy: 'Լրացրու նախադասությունը. «Te lo advierto, ¿eh? Voy a conseguirme _____»։',
    options: [
      { id: 'q3-a', es: 'dinero', hy: 'գումար' },
      { id: 'q3-b', es: 'tiempo', hy: 'ժամանակ' },
      { id: 'q3-c', es: 'otro', hy: 'ուրիշը' },
      { id: 'q3-d', es: 'amigo', hy: 'ընկեր' },
    ],
    correctOptionId: 'q3-c',
  },
  {
    id: 4,
    category: 'Comprensión / Ըմբռնում',
    questionEs: '¿Qué animal afirma haber conseguido Alejandro al hablar con Don Diego?',
    questionHy: 'Ի՞նչ կենդանի է պնդում, որ ձեռք է բերել Ալեխանդրոն՝ Դոն Դիեգոյի հետ խոսելիս։',
    options: [
      { id: 'q4-a', es: 'El semental', hy: 'Հովատակը' },
      { id: 'q4-b', es: 'Un perro guardián', hy: 'Պահապան շուն' },
      { id: 'q4-c', es: 'Un toro bravo', hy: 'Վայրի ցուլ' },
      { id: 'q4-d', es: 'Un águila veloz', hy: 'Արագասլաց արծիվ' },
    ],
    correctOptionId: 'q4-a',
  },
  {
    id: 5,
    category: '¿Quién / qué dijo? / Ո՞վ / ի՞նչ ասաց',
    questionEs: '¿Qué marca grabó Alejandro en el semental?',
    questionHy: 'Ի՞նչ նշան փորագրեց Ալեխանդրոն հովատակի վրա։',
    options: [
      { id: 'q5-a', es: 'Una equis (X)', hy: '«X» տառը' },
      { id: 'q5-b', es: 'Una zeta (Z)', hy: '«Z» տառը' },
      { id: 'q5-c', es: 'Una estrella de cinco puntas', hy: 'Հինգաթև աստղ' },
      { id: 'q5-d', es: 'Una espada cruzada', hy: 'Խաչաձև թուր' },
    ],
    correctOptionId: 'q5-b',
  },
  {
    id: 6,
    category: 'Significado / Իմաստ',
    questionEs: '¿Qué significa la expresión «Tenga cuidado» en armenio?',
    questionHy: 'Ի՞նչ է նշանակում «Tenga cuidado» արտահայտությունը հայերենում։',
    options: [
      { id: 'q6-a', es: 'Espere un momento', hy: 'Սպասեք մի պահ' },
      { id: 'q6-b', es: 'Hable más despacio', hy: 'Ավելի դանդաղ խոսեք' },
      { id: 'q6-c', es: 'Tenga precaución', hy: 'Զգույշ եղեք' },
      { id: 'q6-d', es: 'Venga conmigo', hy: 'Եկեք ինձ հետ' },
    ],
    correctOptionId: 'q6-c',
  },
  {
    id: 7,
    category: 'Español → Armenio / Իսպաներեն → Հայերեն',
    questionEs: '¿Cuál es la traducción correcta de «Eres un ladrón, Alejandro. Un payaso vulgar»?',
    questionHy: 'Ո՞րն է «Eres un ladrón, Alejandro. Un payaso vulgar» նախադասության ճիշտ թարգմանությունը։',
    options: [
      { id: 'q7-a', es: 'Դու գող ես, Ալեխանդրո։ Գռեհիկ ծաղրածու։', hy: 'Eres un ladrón, Alejandro. Un payaso vulgar.' },
      { id: 'q7-b', es: 'Դու իսկական հերոս ես, Ալեխանդրո։ Քաջ մարտիկ։', hy: 'Eres un verdadero héroe, Alejandro. Valiente guerrero.' },
      { id: 'q7-c', es: 'Դու իմ հավատարիմ աշակերտն ես, Ալեխանդրո։', hy: 'Eres mi fiel discípulo, Alejandro.' },
      { id: 'q7-d', es: 'Դու մեծ առաջնորդ ես, Ալեխանդրո։ Հզոր մարդ։', hy: 'Eres un gran líder, Alejandro. Hombre fuerte.' },
    ],
    correctOptionId: 'q7-a',
  },
  {
    id: 8,
    category: 'Armenio → Español / Հայերեն → Իսպաներեն',
    questionEs: 'Elige la frase en español para: «Զորրոն ժողովրդի ծառան էր։ Նա քեզ նման փառք չէր փնտրում։»',
    questionHy: 'Ընտրիր իսպաներեն արտահայտությունը «Զորրոն ժողովրդի ծառան էր։ Նա քեզ նման փառք չէր փնտրում։» մտքի համար։',
    options: [
      { id: 'q8-a', es: 'El Zorro era un soldado del rey y buscaba oro.', hy: 'Զորրոն թագավորի զինվորն էր և ոսկի էր փնտրում։' },
      { id: 'q8-b', es: 'El Zorro era un servidor del pueblo. Él no buscaba fama como tú.', hy: 'Զորրոն ժողովրդի ծառան էր։ Նա քեզ նման փառք չէր փնտրում։' },
      { id: 'q8-c', es: 'El Zorro vivía en secreto y nunca ayudó a nadie.', hy: 'Զորրոն գաղտնի էր ապրում և ոչ ոքի չէր օգնում։' },
      { id: 'q8-d', es: 'El pueblo olvidó el nombre del gran caballero enmascarado.', hy: 'Ժողովուրդը մոռացավ մեծ դիմակավոր ասպետի անունը։' },
    ],
    correctOptionId: 'q8-b',
  },
  {
    id: 9,
    category: 'Significado / Իմաստ',
    questionEs: '¿Qué significa la palabra «bufón» con la que Don Diego llama a Alejandro?',
    questionHy: 'Ի՞նչ է նշանակում «bufón» բառը, որով Դոն Դիեգոն անվանում է Ալեխանդրոյին։',
    options: [
      { id: 'q9-a', es: 'Maestro respetable', hy: 'Հարգարժան ուսուցիչ' },
      { id: 'q9-b', es: 'Payaso o persona ridícula', hy: 'Ծաղրածու կամ խեղկատակ' },
      { id: 'q9-c', es: 'Guerrero invencible', hy: 'Անպարտելի մարտիկ' },
      { id: 'q9-d', es: 'Juez imparcial', hy: 'Անաչառ դատավոր' },
    ],
    correctOptionId: 'q9-b',
  },
  {
    id: 10,
    category: 'Comprensión / Ըմբռնում',
    questionEs: 'Según las palabras de Don Diego, ¿qué NO es suficiente para tener derecho a usar la máscara?',
    questionHy: 'Ըստ Դոն Դիեգոյի խոսքերի՝ ի՞նչը բավական ՉԷ դիմակը կրելու համար։',
    options: [
      { id: 'q10-a', es: 'Robar un caballo y poner marcas en un muro', hy: 'Ձի գողանալը և պատի վրա նշաններ թողնելը' },
      { id: 'q10-b', es: 'Tener una espada de plata fina', hy: 'Նուրբ արծաթյա թուր ունենալը' },
      { id: 'q10-c', es: 'Montar a caballo a toda velocidad', hy: 'Ամբողջ արագությամբ ձի հեծնելը' },
      { id: 'q10-d', es: 'Hablar con elegancia ante la corte', hy: 'Արքունիքի առջև նրբագեղ խոսելը' },
    ],
    correctOptionId: 'q10-a',
  },
  {
    id: 11,
    category: 'Orden de los acontecimientos / Իրադարձությունների հաջորդականություն',
    questionEs: '¿Qué acontecimiento ocurrió PRIMERO en este fragmento del vídeo?',
    questionHy: 'Ի՞նչ իրադարձություն տեղի ունեցավ ԱՌԱՋԻՆԸ տեսանյութի այս հատվածում։',
    options: [
      { id: 'q11-a', es: 'Don Diego llama «bufón» a Alejandro', hy: 'Դոն Դիեգոն Ալեխանդրոյին «bufón» է անվանում' },
      { id: 'q11-b', es: 'Alejandro intenta hacer volver a su caballo gritando «¡Ven aquí!»', hy: 'Ալեխանդրոն փորձում է ետ բերել ձիուն՝ գոչելով «Արի՛ այստեղ»' },
      { id: 'q11-c', es: 'Alejandro cuenta emocionado que grabó una Z en el animal', hy: 'Ալեխանդրոն ոգևորված պատմում է, որ Z է փորագրել' },
      { id: 'q11-d', es: 'Don Diego le dice que es un payaso vulgar', hy: 'Դոն Դիեգոն նրան ասում է, որ նա գռեհիկ ծաղրածու է' },
    ],
    correctOptionId: 'q11-b',
  },
  {
    id: 12,
    category: '¿Quién / qué dijo? / Ո՞վ / ի՞նչ ասաց',
    questionEs: '¿Quién pronuncia la frase: «Don Diego, el pueblo mencionará el nombre del Zorro de nuevo»?',
    questionHy: 'Ո՞վ է արտասանում. «Don Diego, el pueblo mencionará el nombre del Zorro de nuevo»։',
    options: [
      { id: 'q12-a', es: 'Don Diego de la Vega', hy: 'Դոն Դիեգո դե լա Վեգան' },
      { id: 'q12-b', es: 'La señorita Pontero', hy: 'Օրիորդ Պոնտերոն' },
      { id: 'q12-c', es: 'Alejandro Murrieta', hy: 'Ալեխանդրո Մուրիետան' },
      { id: 'q12-d', es: 'Un campesino del pueblo', hy: 'Գյուղի մի գյուղացի' },
    ],
    correctOptionId: 'q12-c',
  },
  {
    id: 13,
    category: 'Significado / Իմաստ',
    questionEs: '¿Qué significa la palabra «ladrón» en armenio?',
    questionHy: 'Ի՞նչ է նշանակում «ladrón» բառը հայերենում։',
    options: [
      { id: 'q13-a', es: 'Persona honesta', hy: 'Ազնիվ մարդ' },
      { id: 'q13-b', es: 'Gobernante justo', hy: 'Արդար կառավարիչ' },
      { id: 'q13-c', es: 'Persona que roba', hy: 'Գող (մարդ, որը գողություն է անում)' },
      { id: 'q13-d', es: 'Mensajero real', hy: 'Թագավորական սուրհանդակ' },
    ],
    correctOptionId: 'q13-c',
  },
  {
    id: 14,
    category: 'Completa la frase / Լրացրու նախադասությունը',
    questionEs: 'Completa la frase inicial: «Por respeto a la señorita Pontero, trataré con usted _____».',
    questionHy: 'Լրացրու սկզբնական նախադասությունը. «Por respeto a la señorita Pontero, trataré con usted _____»։',
    options: [
      { id: 'q14-a', es: 'luego', hy: 'հետո' },
      { id: 'q14-b', es: 'nunca', hy: 'երբեք' },
      { id: 'q14-c', es: 'siempre', hy: 'միշտ' },
      { id: 'q14-d', es: 'pronto', hy: 'շուտով' },
    ],
    correctOptionId: 'q14-a',
  },
  {
    id: 15,
    category: 'Comprensión / Ըմբռնում',
    questionEs: 'Según las duras palabras de Don Diego, ¿qué buscaba Alejandro en lugar del bien del pueblo?',
    questionHy: 'Ըստ Դոն Դիեգոյի խիստ խոսքերի՝ ի՞նչ էր փնտրում Ալեխանդրոն ժողովրդի բարօրության փոխարեն։',
    options: [
      { id: 'q15-a', es: 'Paz y descanso en su hogar', hy: 'Խաղաղություն և հանգիստ իր տանը' },
      { id: 'q15-b', es: 'Fama personal', hy: 'Անձնական փառք' },
      { id: 'q15-c', es: 'Monedas de oro y joyas', hy: 'Ոսկե մետաղադրամներ և զարդեր' },
      { id: 'q15-d', es: 'Un título noble de gobernador', hy: 'Նահանգապետի ազնվական տիտղոս' },
    ],
    correctOptionId: 'q15-b',
  },
];

/* =========================================================================
   AUDIO & TTS UTILITIES
   ========================================================================= */

class SoundEffects {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playSuccess() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.1);
      gain2.gain.setValueAtTime(0.18, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.55);
    } catch {
      // Audio not permitted
    }
  }

  playError() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.22);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Audio not permitted
    }
  }

  playClick() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Audio not permitted
    }
  }
}

const soundEffects = new SoundEffects();

function speakSpanish(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/^[¡¿]/g, '').replace(/[!?.,;]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find((v) => v.lang.startsWith('es'));
    if (esVoice) {
      utterance.voice = esVoice;
    }
    window.speechSynthesis.speak(utterance);
  } catch {
    // Ignore speech errors
  }
}

/* =========================================================================
   COMPONENTS
   ========================================================================= */

function Header({
  onScrollTo,
  activeSection,
}: {
  onScrollTo: (id: string) => void;
  activeSection: 'video' | 'subtitles' | 'quiz';
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#220509]/90 backdrop-blur-md border-b border-red-950/80 text-rose-50 shadow-md shadow-red-950/40">
      <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-red-600/30 text-slate-950 font-black text-xl border border-yellow-300/40">
            Z
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                <span className="text-sm">🇪🇸</span> Aprende Español con Vídeo
              </span>
            </div>
            <p className="text-xs text-orange-200/80 flex items-center gap-1.5">
              <span className="text-xs">🇦🇲</span> Իսպաներենի ինտերակտիվ դասընթաց
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs font-medium bg-[#2e080e] p-1 rounded-xl border border-red-900/60">
          <button
            onClick={() => onScrollTo('video-section')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'video'
                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold shadow-sm shadow-red-700/40'
                : 'text-orange-200/90 hover:text-white hover:bg-red-950/60'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-yellow-400" />
            <span>Vídeo</span>
            <span className="text-[10px] opacity-75">· Տեսանյութ</span>
          </button>

          <button
            onClick={() => onScrollTo('subtitles-section')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'subtitles'
                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold shadow-sm shadow-red-700/40'
                : 'text-orange-200/90 hover:text-white hover:bg-red-950/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-yellow-400" />
            <span>Subtítulos</span>
            <span className="text-[10px] opacity-75">· Ենթագրեր</span>
          </button>

          <button
            onClick={() => onScrollTo('quiz-section')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'quiz'
                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold shadow-sm shadow-red-700/40'
                : 'text-orange-200/90 hover:text-white hover:bg-red-950/60'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />
            <span>Prueba</span>
            <span className="text-[10px] opacity-75">· Վիկտորինա</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

function VideoSection({
  seekTime,
}: {
  seekTime?: number | null;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIsPlaying] = useState(false);

  const videoId = '5Z8TgSDBW9E';
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&rel=0${
    seekTime !== undefined && seekTime !== null ? `&start=${seekTime}&autoplay=1` : ''
  }`;

  const handlePlayOrFocus = () => {
    setIsPlaying(true);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="video-section" ref={containerRef} className="scroll-mt-24 pt-6 pb-10">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight flex items-center justify-center gap-2 flex-wrap">
          <span>🇪🇸</span>
          <span className="drop-shadow-sm">Mira el vídeo y responde</span>
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400 mt-2 flex items-center justify-center gap-2 flex-wrap">
          <span>🇦🇲</span>
          <span>Դիտիր տեսանյութը և պատասխանիր</span>
        </h2>
        <p className="text-sm text-orange-200/80 mt-2 max-w-xl mx-auto">
          🇪🇸 Mira atentamente el fragmento antes de realizar los ejercicios.
          <br />
          🇦🇲 Ուշադիր դիտիր տեսանյութի հատվածը՝ նախքան վարժությունները կատարելը։
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-red-950/80 border-2 border-red-900/60 bg-[#220509] group">
        <div className="aspect-video w-full">
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title="Aprende Español con el Zorro"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="bg-[#2a070e] border-t border-red-950 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-orange-200/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-rose-100 font-semibold">El Zorro (1998)</span>
            <span>·</span>
            <span className="text-yellow-400/90 font-medium">Español latino / castellano</span>
          </div>

          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
          >
            <span>YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-2">
        <button
          onClick={handlePlayOrFocus}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-red-900/40 hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer border border-yellow-300/40"
        >
          <div className="w-8 h-8 rounded-full bg-slate-950/20 flex items-center justify-center text-slate-950 group-hover:scale-110 transition-transform">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
          <div className="text-left leading-tight">
            <div className="tracking-wide">▶ Ver el vídeo</div>
            <div className="text-xs font-bold text-slate-950/85">Դիտել տեսանյութը</div>
          </div>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-orange-200/70 mt-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
          <span>Primero mira el vídeo, luego lee los subtítulos y empieza la prueba.</span>
        </div>
      </div>
    </section>
  );
}

function SubtitlesSection({
  onStartQuiz,
  onSelectTimecode,
}: {
  onStartQuiz: () => void;
  onSelectTimecode: (seconds: number) => void;
}) {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const toggleTranslation = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSpeak = (e: React.MouseEvent, item: SubtitleItem) => {
    e.stopPropagation();
    setSpeakingId(item.id);
    speakSpanish(item.es);
    setTimeout(() => {
      setSpeakingId((cur) => (cur === item.id ? null : cur));
    }, 1500);
  };

  const handleTimecodeClick = (e: React.MouseEvent, seconds: number) => {
    e.stopPropagation();
    onSelectTimecode(seconds);
  };

  return (
    <section id="subtitles-section" className="scroll-mt-24 pt-8 pb-14 border-t border-red-950/80">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
          <span>🇪🇸</span>
          <span>Subtítulos</span>
        </h2>
        <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mt-1 flex items-center justify-center gap-2">
          <span>🇦🇲</span>
          <span>Ենթագրեր</span>
        </h3>
        <p className="text-xs sm:text-sm text-orange-200/80 mt-2 max-w-lg mx-auto">
          🇪🇸 Haz clic en cualquier frase para revelar u ocultar la traducción.
          <br />
          🇦🇲 Սեղմիր ցանկացած արտահայտության վրա՝ թարգմանությունը բացելու կամ թաքցնելու համար։
        </p>

        <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-orange-200/90 bg-[#28070d] px-3.5 py-1.5 rounded-lg border border-red-900/60">
          <span>16 frases en total</span>
          <span className="text-yellow-400">·</span>
          <span className="text-yellow-400">{revealedIds.size} abiertas</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-3 px-2 sm:px-0">
        {SUBTITLES_DATA.map((item) => {
          const isRevealed = revealedIds.has(item.id);
          const isSpeaking = speakingId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => toggleTranslation(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleTranslation(item.id);
                }
              }}
              className={`w-full text-left rounded-xl transition-all duration-200 border cursor-pointer select-none overflow-hidden ${
                isRevealed
                  ? 'bg-[#2e090f] border-orange-500/70 shadow-lg shadow-red-950/40'
                  : 'bg-[#24060b]/90 hover:bg-[#2c080e] border-red-950 hover:border-red-900/80'
              }`}
            >
              <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <button
                    type="button"
                    onClick={(e) => handleTimecodeClick(e, item.seconds)}
                    title="Ir a este segundo en el vídeo / Գնալ տեսանյութի այս վայրկյանին"
                    className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#3b0b13] hover:bg-yellow-400 hover:text-slate-950 text-yellow-400 text-xs font-mono font-bold border border-red-800/40 transition-colors cursor-pointer"
                  >
                    <Clock className="w-3 h-3" />
                    <span>{item.timecode}</span>
                  </button>

                  <div className="flex-1">
                    <div className="text-base sm:text-lg font-bold text-white leading-snug">
                      {item.es}
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-[11px] text-orange-200/60 font-medium">
                      <span>🇪🇸 Español</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        {isRevealed ? (
                          <>
                            <EyeOff className="w-3 h-3 text-yellow-400" />
                            <span className="text-yellow-400 font-semibold">Սեղմիր թաքցնելու համար</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3 text-orange-400" />
                            <span className="text-orange-300 font-semibold">Սեղմիր թարգմանության համար</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    type="button"
                    onClick={(e) => handleSpeak(e, item)}
                    title="Escuchar pronunciación / Լսել արտասանությունը"
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                      isSpeaking
                        ? 'bg-yellow-400 text-slate-950 scale-105'
                        : 'text-orange-200 hover:text-yellow-400 hover:bg-[#3b0b13]'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <div className="p-2 text-orange-300">
                    {isRevealed ? (
                      <ChevronUp className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {isRevealed && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-red-950 mt-1 bg-[#1c0306]/80 animate-fadeIn">
                  <div className="pt-3 flex items-start gap-2.5">
                    <span className="text-base shrink-0 pt-0.5" role="img" aria-label="Armenia">
                      🇦🇲
                    </span>
                    <div className="text-sm sm:text-base font-bold text-yellow-300 leading-relaxed tracking-wide">
                      {item.hy}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onStartQuiz}
          className="group inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-slate-950 font-black text-lg sm:text-xl shadow-xl shadow-red-950/60 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer border border-yellow-300/40"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-950/15 flex items-center justify-center text-slate-950 group-hover:rotate-6 transition-transform">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div className="text-left leading-tight">
            <div className="flex items-center gap-1.5">
              <span>🎮</span>
              <span>Empezar la prueba</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-950/85">
              Սկսել վիկտորինան
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}

function QuizSection({
  questions,
  onComplete,
}: {
  questions: QuizQuestion[];
  onComplete: (
    score: number,
    userAttempts: Record<number, { isFirstTryCorrect: boolean; wrongAttempts: string[] }>
  ) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [wrongOptionIds, setWrongOptionIds] = useState<string[]>([]);
  const [showQuestionTranslation, setShowQuestionTranslation] = useState(false);
  const [revealedOptionTranslations, setRevealedOptionTranslations] = useState<Set<string>>(
    new Set()
  );

  const [attempts, setAttempts] = useState<
    Record<number, { isFirstTryCorrect: boolean; wrongAttempts: string[] }>
  >({});

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const toggleQuestionTranslation = () => {
    setShowQuestionTranslation((prev) => !prev);
  };

  const toggleOptionTranslation = (e: React.MouseEvent, optionId: string) => {
    e.stopPropagation();
    setRevealedOptionTranslations((prev) => {
      const next = new Set(prev);
      if (next.has(optionId)) {
        next.delete(optionId);
      } else {
        next.add(optionId);
      }
      return next;
    });
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnsweredCorrectly) return;
    if (wrongOptionIds.includes(optionId)) return;

    setSelectedOptionId(optionId);
    const isCorrect = optionId === currentQ.correctOptionId;

    if (isCorrect) {
      soundEffects.playSuccess();
      setIsAnsweredCorrectly(true);
      setFeedbackStatus('correct');
      setShowQuestionTranslation(true);
      setRevealedOptionTranslations((prev) => new Set([...prev, optionId]));

      setAttempts((prev) => {
        const existing = prev[currentIndex];
        const isFirstTry = !existing || existing.wrongAttempts.length === 0;
        return {
          ...prev,
          [currentIndex]: {
            isFirstTryCorrect: isFirstTry,
            wrongAttempts: existing ? existing.wrongAttempts : [],
          },
        };
      });
    } else {
      soundEffects.playError();
      setFeedbackStatus('wrong');
      setWrongOptionIds((prev) => [...prev, optionId]);

      setAttempts((prev) => {
        const existing = prev[currentIndex] || { isFirstTryCorrect: false, wrongAttempts: [] };
        return {
          ...prev,
          [currentIndex]: {
            isFirstTryCorrect: false,
            wrongAttempts: [...existing.wrongAttempts, optionId],
          },
        };
      });
    }
  };

  const handleNext = () => {
    soundEffects.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnsweredCorrectly(false);
      setFeedbackStatus('idle');
      setWrongOptionIds([]);
      setShowQuestionTranslation(false);
      setRevealedOptionTranslations(new Set());
    } else {
      const finalScore = Object.values(attempts).filter((a) => a.isFirstTryCorrect).length;
      onComplete(finalScore, attempts);
    }
  };

  const handleSpeakQuestion = () => {
    speakSpanish(currentQ.questionEs);
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <section id="quiz-section" className="scroll-mt-24 pt-8 pb-16 border-t border-red-950/80">
      <div className="max-w-3xl mx-auto px-4 sm:px-0">
        <div className="mb-6 bg-[#25060b] border border-red-900/60 rounded-2xl p-4 sm:p-5 shadow-xl shadow-red-950/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <div className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>🇪🇸 Pregunta {currentIndex + 1} de {questions.length}</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-yellow-400">
                <span>🇦🇲 Հարց {currentIndex + 1} / {questions.length}</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#380911] text-orange-200 border border-red-800/60 self-start sm:self-center">
              <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />
              <span>{currentQ.category}</span>
            </div>
          </div>

          <div className="w-full bg-[#170306] rounded-full h-2.5 overflow-hidden border border-red-950">
            <div
              className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-[#26070d] border border-red-900/60 rounded-2xl p-6 sm:p-8 shadow-xl mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div
                onClick={toggleQuestionTranslation}
                className="cursor-pointer group flex items-start justify-between"
                title="Haz clic para ver u ocultar la traducción al armenio"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-snug group-hover:text-orange-200 transition-colors">
                    {currentQ.questionEs}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-orange-300/80 font-medium">
                    <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                      {showQuestionTranslation ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Թաքցնել թարգմանությունը (🇦🇲)</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Սեղմիր՝ հայերեն թարգմանությունը տեսնելու համար (🇦🇲)</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {showQuestionTranslation && (
                <div className="mt-4 p-3.5 rounded-xl bg-[#190306] border border-orange-500/40 animate-fadeIn">
                  <div className="flex items-start gap-2">
                    <span className="text-base shrink-0 pt-0.5" role="img" aria-label="Armenia">
                      🇦🇲
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-yellow-300 leading-relaxed">
                      {currentQ.questionHy}
                    </h4>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSpeakQuestion}
              title="Escuchar pregunta en español / Լսել հարցը"
              className="shrink-0 p-2.5 rounded-xl bg-[#390912] hover:bg-yellow-400 hover:text-slate-950 text-orange-200 transition-colors cursor-pointer border border-red-800/40"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, idx) => {
            const letter = optionLetters[idx] || String(idx + 1);
            const isSelected = selectedOptionId === option.id;
            const isCorrect = isAnsweredCorrectly && option.id === currentQ.correctOptionId;
            const isWrong = wrongOptionIds.includes(option.id);
            const isTranslationRevealed = revealedOptionTranslations.has(option.id);

            let cardStyles =
              'bg-[#26060c] hover:bg-[#2f0810] border-red-950 hover:border-red-800 text-rose-100';
            let badgeStyles = 'bg-[#3b0912] text-orange-200 border-red-800/60';

            if (isCorrect) {
              cardStyles =
                'bg-emerald-950/70 border-emerald-500 text-white shadow-xl shadow-emerald-950/50 ring-1 ring-emerald-500';
              badgeStyles = 'bg-emerald-500 text-slate-950 font-black border-emerald-400';
            } else if (isWrong) {
              cardStyles =
                'bg-rose-950/60 border-red-600 text-rose-200 opacity-80 cursor-not-allowed';
              badgeStyles = 'bg-red-600/40 text-rose-300 border-red-500';
            } else if (isSelected && !isAnsweredCorrectly) {
              cardStyles = 'bg-[#3a0911] border-yellow-400 text-white';
              badgeStyles = 'bg-yellow-400 text-slate-950 font-black border-yellow-300';
            }

            return (
              <div
                key={option.id}
                role="button"
                tabIndex={isAnsweredCorrectly || isWrong ? -1 : 0}
                onClick={() => handleSelectOption(option.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectOption(option.id);
                  }
                }}
                className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-150 flex flex-col gap-2 cursor-pointer select-none ${cardStyles}`}
              >
                <div className="flex items-start justify-between gap-3 w-full">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1">
                    <div
                      className={`w-8 h-8 rounded-lg border flex items-center justify-center font-black text-sm shrink-0 transition-colors ${badgeStyles}`}
                    >
                      {letter}
                    </div>

                    <div className="flex-1">
                      <div className="text-base sm:text-lg font-bold text-white leading-snug">
                        {option.es}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <button
                      type="button"
                      onClick={(e) => toggleOptionTranslation(e, option.id)}
                      title="Mostrar traducción al armenio / Դիտել հայերեն թարգմանությունը"
                      className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border ${
                        isTranslationRevealed
                          ? 'bg-yellow-400 text-slate-950 border-yellow-300 shadow-sm'
                          : 'bg-[#3b0912] hover:bg-orange-500 hover:text-slate-950 text-yellow-300 border-red-800/50'
                      }`}
                    >
                      <span>🇦🇲</span>
                      <span>{isTranslationRevealed ? 'Թաքցնել' : 'Թարգմանել'}</span>
                    </button>

                    <div className="shrink-0">
                      {isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-bounce" />}
                      {isWrong && <XCircle className="w-6 h-6 text-red-500" />}
                    </div>
                  </div>
                </div>

                {isTranslationRevealed && (
                  <div className="mt-2 pt-2 border-t border-red-950/80 flex items-start gap-2 pl-11 animate-fadeIn">
                    <span className="text-sm shrink-0" role="img" aria-label="Armenia">
                      🇦🇲
                    </span>
                    <div className="text-sm sm:text-base font-bold text-yellow-300 leading-snug">
                      {option.hy}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {feedbackStatus === 'correct' && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/80 text-emerald-200 flex items-center justify-between gap-3 shadow-xl">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <div className="font-black text-base text-emerald-300">✅ ¡Correcto!</div>
                <div className="text-sm font-bold text-emerald-400/95">✅ Ճիշտ է։</div>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-md bg-emerald-900/80 text-emerald-200 border border-emerald-700/60">
              +1 punto
            </span>
          </div>
        )}

        {feedbackStatus === 'wrong' && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-red-600 text-rose-200 flex items-center gap-3 shadow-xl animate-shake">
            <XCircle className="w-6 h-6 text-red-500 shrink-0" />
            <div>
              <div className="font-black text-base text-rose-200">❌ Inténtalo otra vez.</div>
              <div className="text-sm font-bold text-rose-300">❌ Փորձիր նորից։</div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            disabled={!isAnsweredCorrectly}
            onClick={handleNext}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-black text-base sm:text-lg transition-all cursor-pointer ${
              isAnsweredCorrectly
                ? 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-slate-950 shadow-xl shadow-red-950/50 hover:scale-[1.02] active:scale-[0.99] border border-yellow-300/40'
                : 'bg-[#29070d] text-rose-300/40 border border-red-950 cursor-not-allowed opacity-50'
            }`}
          >
            <div className="text-left leading-tight">
              <div>
                {currentIndex === questions.length - 1
                  ? 'Ver resultado →'
                  : 'Siguiente →'}
              </div>
              <div className="text-xs font-bold opacity-90">
                {currentIndex === questions.length - 1
                  ? 'Տեսնել արդյունքը →'
                  : 'Հաջորդը →'}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

function QuizResult({
  score,
  totalQuestions,
  questions,
  onRestart,
  onWatchVideoAgain,
}: {
  score: number;
  totalQuestions: number;
  questions: QuizQuestion[];
  userAttempts: Record<number, { isFirstTryCorrect: boolean; wrongAttempts: string[] }>;
  onRestart: () => void;
  onWatchVideoAgain: () => void;
}) {
  const [showReview, setShowReview] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);

  let messageEs = '';
  let messageHy = '';
  let badgeColor = 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';

  if (score >= 13) {
    messageEs = '¡Excelente trabajo!';
    messageHy = 'Գերազանց աշխատանք։';
    badgeColor = 'text-yellow-300 bg-yellow-500/15 border-yellow-400/40';
  } else if (score >= 10) {
    messageEs = '¡Muy bien!';
    messageHy = 'Շատ լավ։';
    badgeColor = 'text-orange-300 bg-orange-500/15 border-orange-400/40';
  } else if (score >= 7) {
    messageEs = '¡Buen trabajo! Repasa algunas frases.';
    messageHy = 'Լավ աշխատանք։ Կրկնիր մի քանի արտահայտություն։';
    badgeColor = 'text-amber-300 bg-amber-500/15 border-amber-400/40';
  } else {
    messageEs = 'Mira el vídeo otra vez e inténtalo de nuevo.';
    messageHy = 'Կրկին դիտիր տեսանյութը և նորից փորձիր։';
    badgeColor = 'text-rose-300 bg-rose-950/60 border-red-600/50';
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-6 px-4">
      <div className="inline-flex p-5 rounded-3xl bg-gradient-to-tr from-red-600/20 via-orange-500/20 to-yellow-400/20 border-2 border-yellow-400/40 mb-6 shadow-2xl shadow-red-950/60">
        <Trophy className="w-14 h-14 sm:w-16 sm:h-16 text-yellow-400 animate-bounce" />
      </div>

      <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center justify-center gap-3">
        <span>🏆</span>
        <span>Resultado</span>
        <span className="text-red-500">/</span>
        <span className="text-yellow-400">Արդյունք</span>
      </h2>

      <div className="my-8 inline-block bg-[#26060c] border-2 border-red-900/80 rounded-3xl px-8 py-6 shadow-2xl shadow-red-950/80">
        <div className="text-5xl sm:text-6xl font-black text-white tracking-tight">
          <span className="text-yellow-400">{score}</span>
          <span className="text-orange-300/60 text-3xl sm:text-4xl"> / {totalQuestions}</span>
        </div>
        <div className="mt-2 text-sm font-bold text-orange-200/90">
          {percentage}% de aciertos al primer intento
        </div>
      </div>

      <div className={`p-5 rounded-2xl border ${badgeColor} max-w-lg mx-auto mb-10 shadow-lg`}>
        <div className="text-lg sm:text-xl font-black text-white mb-1">
          {messageEs}
        </div>
        <div className="text-base sm:text-lg font-bold text-yellow-300">
          {messageHy}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 hover:from-red-500 hover:to-yellow-300 text-slate-950 font-black text-base shadow-xl shadow-red-950/60 transition-all cursor-pointer border border-yellow-300/40"
        >
          <RotateCcw className="w-5 h-5" />
          <div className="text-left leading-tight">
            <div>🔄 Repetir la prueba</div>
            <div className="text-xs font-bold text-slate-950/85">Կրկնել վիկտորինան</div>
          </div>
        </button>

        <button
          onClick={onWatchVideoAgain}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-[#2e0910] hover:bg-[#3b0c15] text-white font-black text-base border border-red-800/80 transition-all cursor-pointer shadow-lg"
        >
          <Video className="w-5 h-5 text-yellow-400" />
          <div className="text-left leading-tight">
            <div>▶ Volver a ver el vídeo</div>
            <div className="text-xs font-bold text-orange-300/80">Կրկին դիտել տեսանյութը</div>
          </div>
        </button>
      </div>

      <div className="mt-12 border-t border-red-950/80 pt-6">
        <button
          onClick={() => setShowReview(!showReview)}
          className="text-sm font-bold text-orange-300 hover:text-yellow-400 transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <Eye className="w-4 h-4 text-yellow-400" />
          <span>{showReview ? 'Ocultar revisión de preguntas' : 'Revisar todas las preguntas y respuestas'}</span>
          <span className="text-xs text-yellow-400/80">/ {showReview ? 'Թաքցնել' : 'Դիտել հարցերը'}</span>
        </button>

        {showReview && (
          <div className="mt-6 text-left space-y-4 max-w-2xl mx-auto">
            {questions.map((q, idx) => {
              const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
              return (
                <div key={q.id} className="p-4 rounded-xl bg-[#25060b] border border-red-900/60">
                  <div className="flex items-center justify-between text-xs text-orange-300/70 mb-1">
                    <span>Pregunta {idx + 1} de {questions.length}</span>
                    <span className="text-yellow-400 font-bold">{q.category}</span>
                  </div>
                  <div className="font-bold text-white text-sm">{q.questionEs}</div>
                  <div className="text-xs text-yellow-300/90 mt-0.5">{q.questionHy}</div>
                  <div className="mt-3 p-2.5 rounded-lg bg-[#190306] border border-yellow-500/40 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">{correctOpt?.es}</div>
                      <div className="text-[11px] text-yellow-300 font-medium">{correctOpt?.hy}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN APP
   ========================================================================= */

export default function App() {
  const [activeNav, setActiveNav] = useState<'video' | 'subtitles' | 'quiz'>('video');
  const [seekTime, setSeekTime] = useState<number | null>(null);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAttempts, setQuizAttempts] = useState<
    Record<number, { isFirstTryCorrect: boolean; wrongAttempts: string[] }>
  >({});
  const [quizKey, setQuizKey] = useState<number>(0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStartQuiz = () => {
    setIsQuizActive(true);
    setIsQuizFinished(false);
    setActiveNav('quiz');
    setTimeout(() => {
      scrollToSection('quiz-section');
    }, 100);
  };

  const handleSelectTimecode = (seconds: number) => {
    setSeekTime(seconds);
    scrollToSection('video-section');
  };

  const handleQuizComplete = (
    score: number,
    attempts: Record<number, { isFirstTryCorrect: boolean; wrongAttempts: string[] }>
  ) => {
    setQuizScore(score);
    setQuizAttempts(attempts);
    setIsQuizFinished(true);
    setTimeout(() => {
      scrollToSection('quiz-result-section');
    }, 100);
  };

  const handleRestartQuiz = () => {
    setIsQuizFinished(false);
    setIsQuizActive(true);
    setQuizKey((k) => k + 1);
    setTimeout(() => {
      scrollToSection('quiz-section');
    }, 100);
  };

  const handleWatchVideoAgain = () => {
    scrollToSection('video-section');
  };

  return (
    <div className="min-h-screen bg-transparent text-rose-50 flex flex-col selection:bg-yellow-400 selection:text-slate-950">
      <Header onScrollTo={scrollToSection} activeSection={activeNav} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6">
        {/* 1. Upper Section - Video */}
        <VideoSection seekTime={seekTime} />

        {/* 2. Interactive Subtitles */}
        <SubtitlesSection
          onStartQuiz={handleStartQuiz}
          onSelectTimecode={handleSelectTimecode}
        />

        {/* 3. Quiz Section or Results */}
        {isQuizActive && (
          <div id="quiz-anchor">
            {!isQuizFinished ? (
              <QuizSection
                key={quizKey}
                questions={QUIZ_QUESTIONS}
                onComplete={handleQuizComplete}
              />
            ) : (
              <div id="quiz-result-section" className="scroll-mt-24 pt-8 pb-16 border-t border-red-950/80">
                <QuizResult
                  score={quizScore}
                  totalQuestions={QUIZ_QUESTIONS.length}
                  questions={QUIZ_QUESTIONS}
                  userAttempts={quizAttempts}
                  onRestart={handleRestartQuiz}
                  onWatchVideoAgain={handleWatchVideoAgain}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-red-950/80 bg-[#1c0407]/90 py-6 text-center text-xs text-orange-200/60">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">🇪🇸 Aprende Español</span>
            <span>·</span>
            <span className="text-orange-300">🇦🇲 Իսպաներենի ինտերակտիվ ուսուցում</span>
          </div>
          <div>El Zorro — Vídeo interactivo y prueba de 15 preguntas</div>
        </div>
      </footer>
    </div>
  );
}
