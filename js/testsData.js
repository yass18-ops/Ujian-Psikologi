/**
 * Complete Data Registry and Scoring Engines for all 8 Standardized Psychological Tests
 */

const TESTS_DATA = {
  // 1. DASS-21
  'dass-21': {
    id: 'dass-21',
    title: 'DASS-21 (Skala Depresi, Anksieti & Tekanan)',
    shortTitle: 'DASS-21',
    category: 'Mental Health',
    categoryLabel: 'Kesihatan Mental',
    language: 'BM',
    estimatedTime: '5-7 minit',
    questionCount: 21,
    icon: 'fa-brain',
    description: 'Ujian saringan psikometrik standard untuk mengukur 3 domain emosi: Depresi (Kemurungan), Anksieti (Kebimbangan), dan Tekanan (Stres) sepanjang minggu lepas.',
    instructions: 'Sila baca setiap kenyataan di bawah dan pilih nombor 0, 1, 2 atau 3 yang paling menggambarkan keadaan anda sepanjang minggu yang lalu. Tiada jawapan betul atau salah.',
    options: [
      { value: 0, label: '0 - Tidak langsung menggambarkan keadaan saya' },
      { value: 1, label: '1 - Sedikit atau jarang-jarang menggambarkan keadaan saya' },
      { value: 2, label: '2 - Banyak atau kerapkali menggambarkan keadaan saya' },
      { value: 3, label: '3 - Sangat banyak atau sangat kerap menggambarkan keadaan saya' }
    ],
    questions: [
      { id: 1, text: 'Saya dapati diri saya sukar ditenteramkan', domain: 'stress' },
      { id: 2, text: 'Saya sedar mulut saya terasa kering', domain: 'anxiety' },
      { id: 3, text: 'Saya tidak dapat mengalami perasaan positif sama sekali', domain: 'depression' },
      { id: 4, text: 'Saya mengalami kesukaran bernafas (contohnya pernafasan laju, tercungap-cungap tanpa senaman)', domain: 'anxiety' },
      { id: 5, text: 'Saya sukar untuk mendapatkan semangat bagi melakukan sesuatu perkara', domain: 'depression' },
      { id: 6, text: 'Saya cenderung untuk bertindak keterlaluan dalam sesuatu keadaan', domain: 'stress' },
      { id: 7, text: 'Saya rasa menggeletar (contohnya pada tangan)', domain: 'anxiety' },
      { id: 8, text: 'Saya rasa saya menggunakan banyak tenaga dalam keadaan cemas', domain: 'stress' },
      { id: 9, text: 'Saya bimbang keadaan di mana saya mungkin panik dan melakukan perkara membodohkan diri', domain: 'anxiety' },
      { id: 10, text: 'Saya rasa saya tidak mempunyai apa-apa untuk diharapkan', domain: 'depression' },
      { id: 11, text: 'Saya dapati diri saya semakin gelisah', domain: 'stress' },
      { id: 12, text: 'Saya rasa sukar untuk relaks', domain: 'stress' },
      { id: 13, text: 'Saya rasa sedih dan murung', domain: 'depression' },
      { id: 14, text: 'Saya tidak dapat menahan sabar dengan perkara yang menghalang saya meneruskan aktiviti', domain: 'stress' },
      { id: 15, text: 'Saya rasa hampir-hampir menjadi panik/cemas', domain: 'anxiety' },
      { id: 16, text: 'Saya tidak bersemangat dengan apa jua yang saya lakukan', domain: 'depression' },
      { id: 17, text: 'Saya rasa diri saya tidak begitu berharga sebagai seorang manusia', domain: 'depression' },
      { id: 18, text: 'Saya rasa yang saya mudah tersentuh', domain: 'stress' },
      { id: 19, text: 'Saya sedar tindak balas jantung saya walaupun tidak melakukan aktiviti fizikal', domain: 'anxiety' },
      { id: 20, text: 'Saya berasa takut tanpa sebab yang munasabah', domain: 'anxiety' },
      { id: 21, text: 'Saya rasa hidup ini tidak bermakna', domain: 'depression' }
    ],
    calculateResults: function(answers) {
      let depSum = 0, anxSum = 0, strSum = 0;
      this.questions.forEach(q => {
        const val = parseInt(answers[q.id] || 0);
        if (q.domain === 'depression') depSum += val;
        if (q.domain === 'anxiety') anxSum += val;
        if (q.domain === 'stress') strSum += val;
      });

      const depScore = depSum * 2;
      const anxScore = anxSum * 2;
      const strScore = strSum * 2;

      const getDepLevel = (s) => {
        if (s <= 9) return { level: 'Normal', color: '#10b981', desc: 'Tahap suasana hati yang stabil dan sihat.' };
        if (s <= 13) return { level: 'Ringan (Mild)', color: '#3b82f6', desc: 'Terdapat sedikit tanda kemurungan. Disarankan bersenam dan cukup rehat.' };
        if (s <= 20) return { level: 'Sederhana (Moderate)', color: '#f59e0b', desc: 'Gejala kemurungan tahap sederhana. Sesi kaunseling amat digalakkan.' };
        if (s <= 27) return { level: 'Teruk (Severe)', color: '#ef4444', desc: 'Kemurungan tahap teruk. Dapatkan sokongan profesional kaunseling/perubatan.' };
        return { level: 'Sangat Teruk (Extremely Severe)', color: '#b91c1c', desc: 'Tahap kemurungan amat tinggi. Rujukan segera kepada Pakar Psikologi/Kaunselor.' };
      };

      const getAnxLevel = (s) => {
        if (s <= 7) return { level: 'Normal', color: '#10b981', desc: 'Tahap kebimbangan yang terkawal dan sihat.' };
        if (s <= 9) return { level: 'Ringan (Mild)', color: '#3b82f6', desc: 'Kebimbangan ringan. Amalkan latihan pernafasan dan relaksasi.' };
        if (s <= 14) return { level: 'Sederhana (Moderate)', color: '#f59e0b', desc: 'Kebimbangan tahap sederhana. Perlu bimbingan pengurusan emosi.' };
        if (s <= 19) return { level: 'Teruk (Severe)', color: '#ef4444', desc: 'Kebimbangan tahap teruk. Disyorkan mendapatkan bimbingan kaunselor.' };
        return { level: 'Sangat Teruk (Extremely Severe)', color: '#b91c1c', desc: 'Kebimbangan melampau. Rujukan perubatan/kaunseling profesional dianjurkan.' };
      };

      const getStrLevel = (s) => {
        if (s <= 14) return { level: 'Normal', color: '#10b981', desc: 'Pengurusan tekanan emosi yang sangat baik.' };
        if (s <= 18) return { level: 'Ringan (Mild)', color: '#3b82f6', desc: 'Tekanan harian ringan yang biasa dihadapi pelajar.' };
        if (s <= 25) return { level: 'Sederhana (Moderate)', color: '#f59e0b', desc: 'Tekanan tahap sederhana. Susun jadual belajar dan pengurusan masa.' };
        if (s <= 33) return { level: 'Teruk (Severe)', color: '#ef4444', desc: 'Tekanan emosi yang tinggi. Perlu mengurangkan beban kerja dan berbincang dengan kaunselor.' };
        return { level: 'Sangat Teruk (Extremely Severe)', color: '#b91c1c', desc: 'Tekanan melampau. Sila berjumpa kaunselor universiti/sekolah secepat mungkin.' };
      };

      const depRes = getDepLevel(depScore);
      const anxRes = getAnxLevel(anxScore);
      const strRes = getStrLevel(strScore);

      return {
        summary: `Kemurungan: ${depRes.level} | Kebimbangan: ${anxRes.level} | Tekanan: ${strRes.level}`,
        subscales: [
          { name: 'Depresi (Kemurungan)', score: depScore, max: 42, level: depRes.level, color: depRes.color, desc: depRes.desc },
          { name: 'Anksieti (Kebimbangan)', score: anxScore, max: 42, level: anxRes.level, color: anxRes.color, desc: anxRes.desc },
          { name: 'Tekanan (Stres)', score: strScore, max: 42, level: strRes.level, color: strRes.color, desc: strRes.desc }
        ]
      };
    }
  },

  // 2. INVENTORI GAYA BERCINTA (IGB)
  'igb': {
    id: 'igb',
    title: 'Inventori Gaya Bercinta (IGB)',
    shortTitle: 'IGB Love Styles',
    category: 'Personality & Relationships',
    categoryLabel: 'Personaliti & Hubungan',
    language: 'BM',
    estimatedTime: '10-12 minit',
    questionCount: 60,
    icon: 'fa-heart',
    description: 'Inventori psikometrik 60 item mengukur 6 gaya percintaan individu: Eros (Romantis), Ludus (Permainan), Storge (Persahabatan), Pragma (Logikal), Mania (Kepunyaan), dan Agape (Pengorbanan).',
    instructions: 'Sila baca setiap pernyataan dengan teliti dan fikirkan sejauh mana anda setuju atau tidak mengikut kunci jawapan SS hingga STS.',
    options: [
      { value: 5, label: 'SS - Sangat Setuju' },
      { value: 4, label: 'S - Setuju' },
      { value: 3, label: 'TP - Tidak Pasti' },
      { value: 2, label: 'TS - Tidak Setuju' },
      { value: 1, label: 'STS - Sangat Tidak Setuju' }
    ],
    questions: [
      { id: 1, text: 'Saya tidak menyedari bilakah persahabatan saya telah bertukar kepada perasaan cinta.', style: 'Storge' },
      { id: 2, text: 'Saya telah tertarik kepadanya pada pertemuan yang pertama.', style: 'Eros' },
      { id: 3, text: 'Saya cuba menyembunyikan sedikit perasaan cinta saya terhadapnya.', style: 'Ludus' },
      { id: 4, text: 'Adalah lebih baik jika menyintai seseorang yang mempunyai latar belakang yang sama.', style: 'Pragma' },
      { id: 5, text: 'Saya akan menolong kekasih saya sedaya upaya setiap kali dia di dalam kesusahan.', style: 'Agape' },
      { id: 6, text: 'Perasaan dan fikiran saya terganggu apabila melihat dia berbual dengan teman berlainan jantina.', style: 'Mania' },
      { id: 7, text: 'Sebelum ini kekasih saya adalah sahabat baik saya.', style: 'Storge' },
      { id: 8, text: 'Saya cemburu apabila melihat kekasih saya bersama teman lelaki/wanita lain.', style: 'Eros' },
      { id: 9, text: 'Saya cuba mengelak kekasih saya mengetahui yang saya mempunyai teman lelaki/wanita lain.', style: 'Ludus' },
      { id: 10, text: 'Saya akan merancang kehidupan saya sebelum memilih kekasih.', style: 'Pragma' },
      { id: 11, text: 'Saya sanggup berkorban apa sahaja asalkan kekasih saya bahagia.', style: 'Agape' },
      { id: 12, text: 'Saya merasakan adalah penting bagi kekasih saya mengetahui bahawa saya amat memerlukannya.', style: 'Mania' },
      { id: 13, text: 'Saya amat mementingkan kejujuran dalam hubungan cinta dengannya.', style: 'Storge' },
      { id: 14, text: 'Saya sering memberi hadiah/kad/bunga kepada kekasih saya untuk meraikan hari-hari tertentu.', style: 'Eros' },
      { id: 15, text: 'Hingga kini saya tidak pasti sama ada saya benar-benar menyintainya.', style: 'Ludus' },
      { id: 16, text: 'Sikapnya terhadap karier saya juga harus dipertimbangkan.', style: 'Pragma' },
      { id: 17, text: 'Kekasih saya bebas menggunakan barang-barang kepunyaan saya tanpa kebenaran.', style: 'Agape' },
      { id: 18, text: 'Jika dia tidak memperdulikan saya, saya akan membuat sesuatu untuk mendapatkan perhatiannya.', style: 'Mania' },
      { id: 19, text: 'Percintaan yang baik datangnya dari persahabatan yang lama.', style: 'Storge' },
      { id: 20, text: 'Saya sering mengucapkan kata-kata cinta dan sayang kepadanya.', style: 'Eros' },
      { id: 21, text: 'Saya tidak selesa dan akan menjauhkan diri daripadanya jika dia terlalu bergantung kepada saya.', style: 'Ludus' },
      { id: 22, text: 'Sebelum menjalinkan hubungan dengan lebih serius, saya mengkaji latar belakang hidupnya.', style: 'Pragma' },
      { id: 23, text: 'Walau pun kekasih saya sering menyakiti hati saya, saya tetap menyintainya.', style: 'Agape' },
      { id: 24, text: 'Sepanjang percintaan saya, saya sukar untuk menumpukan perhatian kepada perkara lain.', style: 'Mania' },
      { id: 25, text: 'Saya berharap agar dia memahami bahawa saya menyintainya melalui tingkah laku yang saya tunjukkan.', style: 'Storge' },
      { id: 26, text: 'Saya sering bersama-samanya ke mana sahaja.', style: 'Eros' },
      { id: 27, text: 'Saya tidak bercita-cita untuk menjadikannya sebagai teman hidup saya.', style: 'Ludus' },
      { id: 28, text: 'Sikapnya terhadap keluarga saya merupakan perkara yang amat penting.', style: 'Pragma' },
      { id: 29, text: 'Saya turut merasa sedih jika melihat kekasih saya bersedih.', style: 'Agape' },
      { id: 30, text: 'Jika saya putus cinta, saya akan kecewa dan sukar untuk melupakannya.', style: 'Mania' },
      { id: 31, text: 'Umur bukanlah menjadi penghalang bagi saya untuk menjalin hubungan cinta.', style: 'Storge' },
      { id: 32, text: 'Saya mencurahkan isi hati saya melalui kad ucapan/surat.', style: 'Eros' },
      { id: 33, text: 'Saya mempunyai teman lelaki/wanita lain selain daripadanya.', style: 'Ludus' },
      { id: 34, text: 'Saya sering membayangkan mempunyai kekasih yang terbaik buat saya.', style: 'Pragma' },
      { id: 35, text: 'Saya begitu mengambil berat terhadap dirinya tanpa memikirkan tentang diri saya.', style: 'Agape' },
      { id: 36, text: 'Saya tidak menduga dari perkenalan akhirnya timbul rasa sayang.', style: 'Storge' },
      { id: 37, text: 'Saya tidak berselera untuk makan jika kekasih saya tiba-tiba menghilangkan dirinya.', style: 'Mania' },
      { id: 38, text: 'Saya menjalinkan kasih sayang terhadapnya melalui sentuhan-sentuhan.', style: 'Eros' },
      { id: 39, text: 'Saya seronok berdampingan dengan sesiapa sahaja walau pun tidak berniat bercinta.', style: 'Ludus' },
      { id: 40, text: 'Saya tidak menyintai seseorang sekiranya tidak berniat untuk berkahwin dengannya.', style: 'Pragma' },
      { id: 41, text: 'Saya rela memaafkan kekasih saya jika ada kesilapan yang dilakukan terhadap saya.', style: 'Agape' },
      { id: 42, text: 'Saya rasa dialah segala-galanya untuk saya.', style: 'Mania' },
      { id: 43, text: 'Saya menyatakan rasa cinta saya kepadanya setelah lama berkenalan.', style: 'Storge' },
      { id: 44, text: 'Saya bersiap sedia untuk mengorbankan impian saya demi kebahagiaan kekasih saya.', style: 'Eros' },
      { id: 45, text: 'Saya menyintainya hanya untuk sementara sahaja sebelum menemui orang yang lebih sesuai.', style: 'Ludus' },
      { id: 46, text: 'Saya tidak boleh dikatakan bercinta sekiranya saya tidak mengambil tahu akan dirinya.', style: 'Pragma' },
      { id: 47, text: 'Saya sentiasa mengembirakan hatinya walau pun saya berada dalam keadaan sedih.', style: 'Agape' },
      { id: 48, text: 'Hanya dialah orang yang pertama dan terakhir dalam hidup saya.', style: 'Mania' },
      { id: 49, text: 'Cinta sebenarnya persahabatan yang mendalam, bukannya emosi yang dipaksa.', style: 'Storge' },
      { id: 50, text: 'Saya amat menghargai setiap pertemuan yang kami lalui.', style: 'Eros' },
      { id: 51, text: 'Saya dengan mudah dan cepat dapat melupakan cinta yang pernah saya lalui.', style: 'Ludus' },
      { id: 52, text: 'Adalah penting bagi saya menimbulkan perasaan sangsi di hati kekasih saya tentang sejauh mana cintanya.', style: 'Pragma' },
      { id: 53, text: 'Saya bersedia mengorbankan kehendak hati saya asalkan kekasih saya berjaya memperolehi apa dihajatinya.', style: 'Agape' },
      { id: 54, text: 'Jika dia meninggalkan saya, sukar bagi saya mencari penggantinya.', style: 'Mania' },
      { id: 55, text: 'Jika percintaan kami terputus, saya memastikan dirinya berada dalam keadaan menyenangkan.', style: 'Agape' },
      { id: 56, text: 'Saya merasa amat bimbang apabila menyedari hubungan kami tidak mesra dahulu.', style: 'Mania' },
      { id: 57, text: 'Saya lebih rela memutuskan percintaan jika bertemu seseorang yang benar-benar memenuhi citarasa.', style: 'Ludus' },
      { id: 58, text: 'Hidup bersama, berganding bahu rumahtangga dan menjaga hubungan sering dibincangkan.', style: 'Storge' },
      { id: 59, text: 'Jika kekasih saya mempunyai anak daripada perkahwinan lain, saya rela menyayanginya seperti anak sendiri.', style: 'Agape' },
      { id: 60, text: 'Bagi saya hanya dialah satu-satunya untuk saya di dunia ini.', style: 'Eros' }
    ],
    calculateResults: function(answers) {
      const styles = {
        Eros: { name: 'Eros (Romantis)', score: 0, count: 0, color: '#ec4899', desc: 'Gaya cinta berteraskan daya tarikan fizikal, kehangatan emosi, dan romantis.' },
        Ludus: { name: 'Ludus (Permainan)', score: 0, count: 0, color: '#8b5cf6', desc: 'Gaya cinta bersantai, santai, dan tidak terburu-buru mengikat komitmen kekal.' },
        Storge: { name: 'Storge (Persahabatan)', score: 0, count: 0, color: '#10b981', desc: 'Cinta yang bertumbuh secara perlahan berasaskan persahabatan, kepercayaan, dan kesetiaan.' },
        Pragma: { name: 'Pragma (Logikal)', score: 0, count: 0, color: '#3b82f6', desc: 'Gaya cinta praktikal dan rasional, mementingkan latar belakang, kerjaya, dan perancangan masa depan.' },
        Mania: { name: 'Mania (Kepunyaan)', score: 0, count: 0, color: '#f59e0b', desc: 'Gaya cinta beremosi tinggi, penuh cemburu, kebergantungan, dan dahagakan perhatian.' },
        Agape: { name: 'Agape (Pengorbanan)', score: 0, count: 0, color: '#06b6d4', desc: 'Cinta suci yang tidak mementingkan diri sendiri, rela berkorban demi kebahagiaan pasangan.' }
      };

      this.questions.forEach(q => {
        const val = parseInt(answers[q.id] || 3);
        if (styles[q.style]) {
          styles[q.style].score += val;
          styles[q.style].count += 1;
        }
      });

      let highestStyle = null;
      let maxScore = -1;
      const subscales = Object.keys(styles).map(k => {
        const item = styles[k];
        const avg = Math.round((item.score / (item.count * 5)) * 100);
        if (item.score > maxScore) {
          maxScore = item.score;
          highestStyle = item;
        }
        return {
          name: item.name,
          score: item.score,
          max: item.count * 5,
          percentage: avg,
          color: item.color,
          desc: item.desc
        };
      });

      return {
        summary: `Gaya Cinta Dominan Anda: ${highestStyle.name}`,
        subscales: subscales,
        dominant: highestStyle
      };
    }
  },

  // 3. INVENTORI PENGURUSAN MASA
  'time-management': {
    id: 'time-management',
    title: 'Inventori Pengurusan Masa Pelajar',
    shortTitle: 'Pengurusan Masa',
    category: 'Academic & Life Skills',
    categoryLabel: 'Akademik & Kemahiran Hidup',
    language: 'BM',
    estimatedTime: '3-5 minit',
    questionCount: 9,
    icon: 'fa-clock',
    description: 'Inventori pengira purata peruntukan masa mingguan (168 jam) untuk tidur, kemasan diri, makan, ibadah, riadah, dan aktiviti akademik bagi menilai Keseimbangan Masa Belajar.',
    instructions: 'Masukkan anggaran jam yang anda gunakan untuk setiap perkara di bawah:',
    type: 'numeric-input',
    questions: [
      { id: 1, text: 'Berapa jam anda tidur termasuk tidur petang dalam sehari?', multiplier: 7, unit: 'jam / hari' },
      { id: 2, text: 'Berapa jam anda gunakan untuk kemasan bersolek termasuk mandi & berpakaian dalam sehari?', multiplier: 7, unit: 'jam / hari' },
      { id: 3, text: 'Berapa jam anda gunakan untuk makan, penyediaan/membeli makanan & mengemas dalam sehari?', multiplier: 7, unit: 'jam / hari' },
      { id: 4, text: 'Berapa jam anda gunakan untuk membuat kerja rumah (membasuh baju, mengemas tempat tidur, menggosok)?', multiplier: 7, unit: 'jam / hari' },
      { id: 5, text: 'Berapa jam anda gunakan untuk bersembahyang & beribadat termasuk perjalanan dalam sehari?', multiplier: 7, unit: 'jam / hari' },
      { id: 6, text: 'Berapa jam anda habiskan masa untuk bersama rakan, menonton TV, atau main game dalam sehari?', multiplier: 7, unit: 'jam / hari' },
      { id: 7, text: 'Berapa jam anda habiskan untuk kuliah dan tutorial dalam seminggu?', multiplier: 1, unit: 'jam / minggu' },
      { id: 8, text: 'Berapa jam anda gunakan seminggu untuk berpersatuan, sukan & kokurikulum?', multiplier: 1, unit: 'jam / minggu' },
      { id: 9, text: 'Berapa jam anda gunakan untuk membuat kerja separuh masa (part-time) dalam seminggu?', multiplier: 1, unit: 'jam / minggu' }
    ],
    calculateResults: function(answers) {
      let totalUsedHours = 0;
      const categories = [
        { name: 'Tidur & Rehat', hours: (parseFloat(answers[1] || 0) * 7), color: '#3b82f6' },
        { name: 'Kemasan Diri & Mandi', hours: (parseFloat(answers[2] || 0) * 7), color: '#06b6d4' },
        { name: 'Makan & Penyediaan', hours: (parseFloat(answers[3] || 0) * 7), color: '#10b981' },
        { name: 'Kerja Rumah & Chores', hours: (parseFloat(answers[4] || 0) * 7), color: '#8b5cf6' },
        { name: 'Ibadah & Kerohanian', hours: (parseFloat(answers[5] || 0) * 7), color: '#ec4899' },
        { name: 'Hiburan, TV & Game', hours: (parseFloat(answers[6] || 0) * 7), color: '#f59e0b' },
        { name: 'Kuliah & Tutorial', hours: parseFloat(answers[7] || 0), color: '#ef4444' },
        { name: 'Sukan & Kokurikulum', hours: parseFloat(answers[8] || 0), color: '#14b8a6' },
        { name: 'Kerja Separuh Masa', hours: parseFloat(answers[9] || 0), color: '#64748b' }
      ];

      categories.forEach(c => totalUsedHours += c.hours);
      const remainingStudyHours = Math.max(0, 168 - totalUsedHours);

      let status = '';
      let statusColor = '';
      let statusDesc = '';

      if (remainingStudyHours >= 30) {
        status = 'Cemerlang & Seimbang';
        statusColor = '#10b981';
        statusDesc = `Anda mempunyai ${Math.round(remainingStudyHours)} jam baki seminggu yang mencukupi untuk ulangkaji kendiri dan persediaan peperiksaan.`;
      } else if (remainingStudyHours >= 15) {
        status = 'Sederhana (Boleh Ditingkatkan)';
        statusColor = '#f59e0b';
        statusDesc = `Anda mempunyai ${Math.round(remainingStudyHours)} jam baki seminggu. Kurangkan aktiviti sampingan untuk menambah jam ulangkaji.`;
      } else {
        status = 'Ketidakseimbangan Masa (Perlu Tindakan)';
        statusColor = '#ef4444';
        statusDesc = `Baki masa anda hanya ${Math.round(remainingStudyHours)} jam seminggu! Anda terlalu banyak menggunakan masa untuk aktiviti bukan akademik.`;
      }

      return {
        summary: `Jumlah Masa Digunakan: ${Math.round(totalUsedHours)} / 168 Jam Seminggu | Baki Masa Belajar: ${Math.round(remainingStudyHours)} Jam`,
        status: status,
        statusColor: statusColor,
        statusDesc: statusDesc,
        subscales: categories.map(c => ({
          name: c.name,
          score: Math.round(c.hours),
          max: 168,
          percentage: Math.round((c.hours / 168) * 100),
          color: c.color,
          desc: `${Math.round(c.hours)} Jam Seminggu`
        }))
      };
    }
  },

  // 4. BECK DEPRESSION INVENTORY (BDI-MALAY)
  'bdi-malay': {
    id: 'bdi-malay',
    title: 'Beck Depression Inventory (BDI-Malay)',
    shortTitle: 'BDI Depresi',
    category: 'Mental Health',
    categoryLabel: 'Kesihatan Mental',
    language: 'BM',
    estimatedTime: '6-8 minit',
    questionCount: 20,
    icon: 'fa-notes-medical',
    description: 'Inventori Kemurungan Beck versi Bahasa Melayu (Firdaus Mukhtar & Tian PS Oei, 2008) untuk menilai 20 simptom kemurungan fizikal, emosi dan kognitif.',
    instructions: 'Pilih kenyataan dalam setiap kumpulan yang paling tepat menerangkan perasaan anda sepanjang minggu lepas termasuk hari ini.',
    type: 'group-options',
    questions: [
      { id: 1, title: '1. Kesedihan', options: [{ v: 0, text: 'Saya tak rasa sedih' }, { v: 1, text: 'Saya rasa sedih' }, { v: 2, text: 'Saya kesedihan sepanjang masa dan sukar meredakannya' }, { v: 3, text: 'Saya sangat sedih atau tak gembira sehingga tak mampu menanggungnya lagi' }] },
      { id: 2, title: '2. Pesimis', options: [{ v: 0, text: 'Saya tak rasa lemah semangat mengenai masa depan' }, { v: 1, text: 'Saya rasa lemah semangat tentang masa depan' }, { v: 2, text: 'Saya rasa tiada apa yang hendak diharapkan' }, { v: 3, text: 'Saya rasa masa depan saya mengecewakan dan keadaan takkan bertambah baik' }] },
      { id: 3, title: '3. Kegagalan Lalu', options: [{ v: 0, text: 'Saya tak rasa saya seorang yang gagal' }, { v: 1, text: 'Saya rasa saya dah gagal lebih dari orang biasa' }, { v: 2, text: 'Apabila terkenangkan masa lalu, saya hanya nampak banyak kegagalan' }, { v: 3, text: 'Saya rasa saya seorang manusia yang benar-benar gagal' }] },
      { id: 4, title: '4. Hilang Kepuasan', options: [{ v: 0, text: 'Saya dapat kepuasan daripada perkara yang pernah saya lakukan' }, { v: 1, text: 'Saya tak seronok seperti dulu' }, { v: 2, text: 'Saya tak dapat kepuasan sebenar daripada apa sahaja' }, { v: 3, text: 'Saya tak puas hati atau bosan dengan segalanya' }] },
      { id: 5, title: '5. Rasa Bersalah', options: [{ v: 0, text: 'Saya tak rasa begitu bersalah' }, { v: 1, text: 'Saya rasa bersalah sekali-sekala sahaja' }, { v: 2, text: 'Saya rasa agak bersalah hampir setiap masa' }, { v: 3, text: 'Saya rasa bersalah sepanjang masa' }] },
      { id: 6, title: '6. Rasa Dihukum', options: [{ v: 0, text: 'Saya tak rasa saya sedang dihukum' }, { v: 1, text: 'Saya rasa saya mungkin dihukum' }, { v: 2, text: 'Saya percaya saya akan dihukum' }, { v: 3, text: 'Saya rasa saya sedang dihukum' }] },
      { id: 7, title: '7. Tidak Suka Diri Sendiri', options: [{ v: 0, text: 'Saya tak rasa kecewa dengan diri saya' }, { v: 1, text: 'Saya kecewa dengan diri saya' }, { v: 2, text: 'Saya rasa meluat dengan diri saya' }, { v: 3, text: 'Saya benci diri saya' }] },
      { id: 8, title: '8. Kritik Diri Sendiri', options: [{ v: 0, text: 'Saya tak rasa saya lebih teruk daripada orang lain' }, { v: 1, text: 'Saya sentiasa mencari kelemahan dan kesilapan diri sendiri' }, { v: 2, text: 'Saya menyalahkan diri saya setiap kali berlaku kesilapan' }, { v: 3, text: 'Saya menyalahkan diri sendiri atas setiap perkara buruk yang berlaku' }] },
      { id: 9, title: '9. Fikir Untuk Bunuh Diri', options: [{ v: 0, text: 'Saya tak terfikir untuk bunuh diri' }, { v: 1, text: 'Saya ada terfikir untuk bunuh diri, tapi saya tak akan melakukannya' }, { v: 2, text: 'Saya ingin bunuh diri' }, { v: 3, text: 'Saya akan bunuh diri jika berpeluang' }] },
      { id: 10, title: '10. Menangis', options: [{ v: 0, text: 'Saya tak menangis lagi daripada kebiasaannya' }, { v: 1, text: 'Saya kerap menangis sekarang daripada biasa' }, { v: 2, text: 'Saya kini menangis sepanjang masa' }, { v: 3, text: 'Saya biasanya boleh menangis, tapi kini tak dapat menangis walaupun mahu' }] },
      { id: 11, title: '11. Sakit Hati / Meradang', options: [{ v: 0, text: 'Saya tidak lagi sakit hati seperti sebelum ini' }, { v: 1, text: 'Saya lebih mudah meradang atau sakit hati daripada biasa' }, { v: 2, text: 'Saya rasa sakit hati sepanjang masa' }, { v: 3, text: 'Saya tak lagi rasa sakit hati dengan perkara yang selalunya menyakitkan hati' }] },
      { id: 12, title: '12. Hilang Minat Sosial', options: [{ v: 0, text: 'Saya tak hilang minat terhadap orang lain' }, { v: 1, text: 'Saya kurang minat terhadap orang lain berbanding dulu' }, { v: 2, text: 'Saya hampir hilang minat terhadap orang lain' }, { v: 3, text: 'Saya tak berminat langsung dengan orang lain' }] },
      { id: 13, title: '13. Sukar Buat Keputusan', options: [{ v: 0, text: 'Saya cuba buat keputusan sebaik mungkin' }, { v: 1, text: 'Saya lebih sering menangguh urusan membuat keputusan' }, { v: 2, text: 'Saya sukar buat keputusan berbanding dulu' }, { v: 3, text: 'Saya tidak lagi mampu membuat keputusan' }] },
      { id: 14, title: '14. Perubahan Penampilan / Diri', options: [{ v: 0, text: 'Saya tak kelihatan teruk berbanding dulu' }, { v: 1, text: 'Saya risau kelihatan tua atau tak menarik' }, { v: 2, text: 'Saya rasa ada perubahan kekal pada penampilan yang membuat saya kurang menarik' }, { v: 3, text: 'Saya percaya saya kelihatan hodoh' }] },
      { id: 15, title: '15. Hilang Tenaga / Kerja', options: [{ v: 0, text: 'Saya boleh bekerja dengan baik seperti biasa' }, { v: 1, text: 'Ia mengambil usaha yang lebih untuk memulakan sesuatu kerja' }, { v: 2, text: 'Saya harus memaksa diri saya untuk buat sesuatu' }, { v: 3, text: 'Saya tak boleh langsung membuat apa-apa kerja' }] },
      { id: 16, title: '16. Perubahan Tidur', options: [{ v: 0, text: 'Saya boleh tidur macam biasa' }, { v: 1, text: 'Saya tak tidur nyenyak seperti biasa dan sukar untuk tidur semula' }, { v: 2, text: 'Saya terjaga 1-2 jam awal daripada biasa dan sukar untuk tidur semula' }, { v: 3, text: 'Saya bangun awal beberapa jam daripada biasa dan tak boleh tidur semula' }] },
      { id: 17, title: '17. Terganggu / Keletihan', options: [{ v: 0, text: 'Saya tak rasa letih lebih dari biasa' }, { v: 1, text: 'Saya lebih mudah letih dari biasa' }, { v: 2, text: 'Saya letih ketika melakukan apa saja' }, { v: 3, text: 'Saya terlalu letih untuk buat apa sahaja' }] },
      { id: 18, title: '18. Perubahan Selera Makan', options: [{ v: 0, text: 'Selera makan saya tak seteruk dulu' }, { v: 1, text: 'Selera makan saya tak sebagus seperti selalu' }, { v: 2, text: 'Selera makan saya makin teruk' }, { v: 3, text: 'Saya langsung tak ada selera' }] },
      { id: 19, title: '19. Masalah Berat Badan', options: [{ v: 0, text: 'Saya tak hilang banyak berat badan akhir-akhir ini' }, { v: 1, text: 'Saya hilang berat badan lebih dari 5 paun' }, { v: 2, text: 'Saya hilang berat badan lebih dari 10 paun' }, { v: 3, text: 'Saya hilang berat badan lebih dari 15 paun' }] },
      { id: 20, title: '20. Risau Keadaan Fizikal', options: [{ v: 0, text: 'Saya tak lagi bimbangkan kesihatan saya seperti kebiasaannya' }, { v: 1, text: 'Saya risau masalah fizikal seperti sengal dan kesakitan, perut sebu atau sembelit' }, { v: 2, text: 'Saya risau dengan masalah fizikal ini hingga sukar untuk memikirkan perkara lain' }, { v: 3, text: 'Saya sangat risau dengan masalah fizikal saya hingga tak dapat fikir hal lain' }] }
    ],
    calculateResults: function(answers) {
      let total = 0;
      this.questions.forEach(q => {
        total += parseInt(answers[q.id] || 0);
      });

      let category = '';
      let color = '';
      let desc = '';

      if (total <= 10) {
        category = 'Normal / Gangguan Mood Minimum';
        color = '#10b981';
        desc = 'Tahap emosi dan suasana hati anda secara umumnya adalah sihat dan stabil.';
      } else if (total <= 16) {
        category = 'Kemurungan Ringan (Mild Depression)';
        color = '#3b82f6';
        desc = 'Terdapat tanda-tanda kemurungan ringan. Berbual dengan rakan karib atau kaunselor digalakkan.';
      } else if (total <= 20) {
        category = 'Sempadan Kemurungan Klinikal (Borderline Clinical)';
        color = '#f59e0b';
        desc = 'Tanda-tanda kemurungan yang mula mempengaruhi emosi harian. Perlu mula diberi perhatian.';
      } else if (total <= 30) {
        category = 'Kemurungan Sederhana (Moderate Depression)';
        color = '#ef4444';
        desc = 'Gejala kemurungan tahap sederhana. Sila dapatkan sesi kaunseling bersama kaunselor profesional.';
      } else if (total <= 40) {
        category = 'Kemurungan Teruk (Severe Depression)';
        color = '#b91c1c';
        desc = 'Kemurungan tahap teruk. Amat disyorkan untuk membuat rujukan kaunseling atau sokongan perubatan.';
      } else {
        category = 'Kemurungan Sangat Teruk (Extreme Depression)';
        color = '#7f1d1d';
        desc = 'Tahap kemurungan yang amat serius. Sila dapatkan bantuan profesional secepat mungkin.';
      }

      return {
        summary: `Skor BDI: ${total} / 60 | Status: ${category}`,
        totalScore: total,
        maxScore: 60,
        category: category,
        color: color,
        desc: desc,
        subscales: [
          { name: 'Skor BDI-Malay Keseluruhan', score: total, max: 60, percentage: Math.round((total / 60) * 100), color: color, desc: category }
        ]
      };
    }
  },

  // 5. MBTI PERSONALITY TEST
  'mbti': {
    id: 'mbti',
    title: 'MBTI Personality Test (Myers-Briggs)',
    shortTitle: 'MBTI Personaliti',
    category: 'Personality & Relationships',
    categoryLabel: 'Personaliti & Hubungan',
    language: 'EN',
    estimatedTime: '12-15 minit',
    questionCount: 70,
    icon: 'fa-user-astronaut',
    description: 'Standard 70-item Myers-Briggs Type Indicator measuring 4 key personality dimensions: Extraversion (E) vs Introversion (I), Sensing (S) vs Intuition (N), Thinking (T) vs Feeling (F), and Judging (J) vs Perceiving (P).',
    instructions: 'Read each pair of choices carefully and select Option A or Option B that feels most natural to you.',
    type: 'pair-options',
    questions: [
      { id: 1, dim: 'EI', a: 'At a party do you interact with many, including strangers', b: 'Interact with a few, known to you' },
      { id: 2, dim: 'SN', a: 'Are you more realistic than speculative', b: 'More speculative than realistic' },
      { id: 3, dim: 'SN', a: 'Is it worse to have your head in the clouds', b: 'Is it worse to be in a rut' },
      { id: 4, dim: 'TF', a: 'Are you more impressed by principles', b: 'More impressed by emotions' },
      { id: 5, dim: 'TF', a: 'Are you more drawn toward the convincing', b: 'More drawn toward the touching' },
      { id: 6, dim: 'JP', a: 'Do you prefer to work to deadlines', b: 'Do you prefer to work just whenever' },
      { id: 7, dim: 'JP', a: 'Do you tend to choose rather carefully', b: 'Tend to choose somewhat impulsively' },
      { id: 8, dim: 'EI', a: 'At parties do you stay late, with increasing energy', b: 'Leave early with decreased energy' },
      { id: 9, dim: 'SN', a: 'Are you more attracted to sensible people', b: 'More attracted to imaginative people' },
      { id: 10, dim: 'SN', a: 'Are you more interested in what is actual', b: 'More interested in what is possible' },
      { id: 11, dim: 'TF', a: 'In judging others are you more swayed by laws than circumstances', b: 'Swayed by circumstances than laws' },
      { id: 12, dim: 'TF', a: 'In approaching others is your inclination to be objective', b: 'Inclination to be personal' },
      { id: 13, dim: 'JP', a: 'Are you more punctual', b: 'Are you more leisurely' },
      { id: 14, dim: 'JP', a: 'Does it bother you more to have things unfinished', b: 'Have things completed' },
      { id: 15, dim: 'EI', a: 'In your social groups do you keep abreast of others happenings', b: 'Get behind on the news' },
      { id: 16, dim: 'SN', a: 'In doing ordinary things are you more likely to do it the usual way', b: 'Do it your own way' },
      { id: 17, dim: 'SN', a: 'Writers should say what they mean and mean what they say', b: 'Express things more by use of analogy' },
      { id: 18, dim: 'TF', a: 'Which appeals to you more: consistency of thought', b: 'Harmonious human relationships' },
      { id: 19, dim: 'TF', a: 'Are you more comfortable in making logical judgments', b: 'Making value judgments' },
      { id: 20, dim: 'JP', a: 'Do you want things settled and decided', b: 'Want things unsettled and undecided' },
      { id: 21, dim: 'JP', a: 'Would you say you are more serious and determined', b: 'More easy-going' },
      { id: 22, dim: 'EI', a: 'In phoning do you rarely question that it will all be said', b: 'Rehearse what you will say' },
      { id: 23, dim: 'SN', a: 'Facts speak for themselves', b: 'Facts illustrate principles' },
      { id: 24, dim: 'SN', a: 'Are visionaries somewhat annoying', b: 'Rather fascinating' },
      { id: 25, dim: 'TF', a: 'Are you more often a cool-headed person', b: 'A warm-hearted person' },
      { id: 26, dim: 'TF', a: 'Is it worse to be unjust', b: 'Is it worse to be merciless' },
      { id: 27, dim: 'JP', a: 'Should one usually let events occur by careful selection and choice', b: 'Randomly and by chance' },
      { id: 28, dim: 'JP', a: 'Do you feel better about having purchased', b: 'Having the option to buy' },
      { id: 29, dim: 'EI', a: 'In company do you initiate conversation', b: 'Wait to be approached' },
      { id: 30, dim: 'SN', a: 'Common sense is rarely questionable', b: 'Frequently questionable' },
      { id: 31, dim: 'SN', a: 'Children often do not make themselves useful enough', b: 'Exercise their fantasy enough' },
      { id: 32, dim: 'TF', a: 'In making decisions do you feel more comfortable with standards', b: 'Feelings' },
      { id: 33, dim: 'TF', a: 'Are you more firm than gentle', b: 'More gentle than firm' },
      { id: 34, dim: 'JP', a: 'Which is more admirable: ability to organize and be methodical', b: 'Ability to adapt and make do' },
      { id: 35, dim: 'JP', a: 'Do you put more value on definite', b: 'Open-minded' },
      { id: 36, dim: 'EI', a: 'Does new and non-routine interaction stimulate and energize you', b: 'Tax your reserves' },
      { id: 37, dim: 'SN', a: 'Are you more frequently a practical sort of person', b: 'A fanciful sort of person' },
      { id: 38, dim: 'SN', a: 'Are you more likely to see how others are useful', b: 'See how others see' },
      { id: 39, dim: 'TF', a: 'Which is more satisfying: to discuss an issue thoroughly', b: 'To arrive at agreement on an issue' },
      { id: 40, dim: 'TF', a: 'Which rules you more: your head', b: 'Your heart' },
      { id: 41, dim: 'JP', a: 'Are you more comfortable with work that is contracted', b: 'Done on a casual basis' },
      { id: 42, dim: 'JP', a: 'Do you tend to look for the orderly', b: 'Whatever turns up' },
      { id: 43, dim: 'EI', a: 'Do you prefer many friends with brief contact', b: 'A few friends with more lengthy contact' },
      { id: 44, dim: 'SN', a: 'Do you go more by facts', b: 'More by principles' },
      { id: 45, dim: 'SN', a: 'Are you more interested in production and distribution', b: 'Design and research' },
      { id: 46, dim: 'TF', a: 'Which is more of a compliment: There is a very logical person', b: 'There is a very sentimental person' },
      { id: 47, dim: 'TF', a: 'Do you value in yourself more that you are unwavering', b: 'Devoted' },
      { id: 48, dim: 'JP', a: 'Do you more often prefer final and unalterable statement', b: 'Tentative and preliminary statement' },
      { id: 49, dim: 'JP', a: 'Are you more comfortable after a decision', b: 'Before a decision' },
      { id: 50, dim: 'EI', a: 'Do you speak easily and at length with strangers', b: 'Find little to say to strangers' },
      { id: 51, dim: 'SN', a: 'Are you more likely to trust your experience', b: 'Trust your hunch' },
      { id: 52, dim: 'SN', a: 'Do you feel more practical than ingenious', b: 'More ingenious than practical' },
      { id: 53, dim: 'TF', a: 'Which person is more to be complimented: clear reason', b: 'Strong feeling' },
      { id: 54, dim: 'TF', a: 'Are you inclined more to be fair-minded', b: 'Sympathetic' },
      { id: 55, dim: 'JP', a: 'Is it preferable mostly to make sure things are arranged', b: 'Just let things happen' },
      { id: 56, dim: 'JP', a: 'In relationships should most things be re-negotiable', b: 'Random and circumstantial' },
      { id: 57, dim: 'EI', a: 'When the phone rings do you hasten to get to it first', b: 'Hope someone else will answer' },
      { id: 58, dim: 'SN', a: 'Do you prize more in yourself a strong sense of reality', b: 'A vivid imagination' },
      { id: 59, dim: 'SN', a: 'Are you drawn more to fundamentals', b: 'Overtones' },
      { id: 60, dim: 'TF', a: 'Which seems the greater error: to be too passionate', b: 'To be too objective' },
      { id: 61, dim: 'TF', a: 'Do you see yourself as basically hard-headed', b: 'Soft-hearted' },
      { id: 62, dim: 'JP', a: 'Which situation appeals to you more: structured and scheduled', b: 'Unstructured and unscheduled' },
      { id: 63, dim: 'JP', a: 'Are you a person that is more routinized than whimsical', b: 'Whimsical than routinized' },
      { id: 64, dim: 'EI', a: 'Are you more inclined to be easy to approach', b: 'Somewhat reserved' },
      { id: 65, dim: 'SN', a: 'In writings do you prefer the more literal', b: 'The more figurative' },
      { id: 66, dim: 'TF', a: 'Is it harder for you to identify with others', b: 'Utilize others' },
      { id: 67, dim: 'TF', a: 'Which do you wish more for yourself: clarity of reason', b: 'Strength of compassion' },
      { id: 68, dim: 'JP', a: 'Which is the greater fault: being indiscriminate', b: 'Being critical' },
      { id: 69, dim: 'JP', a: 'Do you prefer the planned event', b: 'Unplanned event' },
      { id: 70, dim: 'JP', a: 'Do you tend to be more deliberate than spontaneous', b: 'Spontaneous than deliberate' }
    ],
    calculateResults: function(answers) {
      let E = 0, I = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0;

      this.questions.forEach(q => {
        const choice = answers[q.id];
        if (q.dim === 'EI') { if (choice === 'a') E++; else if (choice === 'b') I++; }
        else if (q.dim === 'SN') { if (choice === 'a') S++; else if (choice === 'b') N++; }
        else if (q.dim === 'TF') { if (choice === 'a') T++; else if (choice === 'b') F++; }
        else if (q.dim === 'JP') { if (choice === 'a') J++; else if (choice === 'b') P++; }
      });

      const type = (E >= I ? 'E' : 'I') + (S >= N ? 'S' : 'N') + (T >= F ? 'T' : 'F') + (J >= P ? 'J' : 'P');

      const mbtiProfiles = {
        'ISTJ': 'The Inspector / Logistikan: Praktikal, berdisiplin, fokus kepada fakta & tanggungjawab.',
        'ISFJ': 'The Protector / Pembela: Setia, penyayang, berhati-hati & prihatin keselamatan orang lain.',
        'INFJ': 'The Advocate / Penasihat: Berwawasan, idealistik, mendalam & mendahului masa depan.',
        'INTJ': 'The Architect / Perancang: Strategik, berdikari, berpemikiran analitis & berstandard tinggi.',
        'ISTP': 'The Craftsman / Pengendali: Praktikal, berkesan, pemerhati tenang & penyelesaian masalah pantas.',
        'ISFP': 'The Artist / Pereka: Sensitif, fleksibel, menghargai keindahan & kebebasan diri.',
        'INFP': 'The Healer / Idealist: Setia kepada nilai diri, ingin tahu, kreatif & penyayang.',
        'INTP': 'The Thinker / Pemikir: Teoritis, intelektual, suka menganalisis konsep & sistem kompleks.',
        'ESTP': 'The Dynamo / Pelaksana: Bersegera, bertenaga, menyukai tindakan praktikal & risiko.',
        'ESFP': 'The Performer / Penghibur: Peramah, espontan, menikmati kehidupan kini & menghiburkan.',
        'ENFP': 'The Champion / Penginspirasi: Bersemangat tinggi, imajinatif, mesra & mencari peluang baharu.',
        'ENTP': 'The Visionary / Pencabar: Petah, inovatif, menyukai perbahasan idea & penyelesaian kreatif.',
        'ESTJ': 'The Executive / Pengarah: Berorganisasi, tegas, mementingkan struktur & kecekapan.',
        'ESFJ': 'The Provider / Pengasuh: Mesra, bekerjasama, menjaga keharmonian kumpulan & kebajikan.',
        'ENFJ': 'The Teacher / Pemimpin: Karismatik, inspiratif, mahir membimbing & menggalakkan potensi orang.',
        'ENTJ': 'The Commander / Komander: Berwawasan strategik, berketrampilan memimpin & berfokus sasaran.'
      };

      return {
        summary: `Jenis Personaliti MBTI Anda: ${type} - ${mbtiProfiles[type] || 'Unique Type'}`,
        mbtiType: type,
        subscales: [
          { name: `Extraversion (E: ${E}) vs Introversion (I: ${I})`, score: E, max: E + I || 1, percentage: Math.round((E / (E + I || 1)) * 100), color: '#3b82f6', desc: E >= I ? 'Dominan Extraversion (E)' : 'Dominan Introversion (I)' },
          { name: `Sensing (S: ${S}) vs Intuition (N: ${N})`, score: S, max: S + N || 1, percentage: Math.round((S / (S + N || 1)) * 100), color: '#10b981', desc: S >= N ? 'Dominan Sensing (S)' : 'Dominan Intuition (N)' },
          { name: `Thinking (T: ${T}) vs Feeling (F: ${F})`, score: T, max: T + F || 1, percentage: Math.round((T / (T + F || 1)) * 100), color: '#f59e0b', desc: T >= F ? 'Dominan Thinking (T)' : 'Dominan Feeling (F)' },
          { name: `Judging (J: ${J}) vs Perceiving (P: ${P})`, score: J, max: J + P || 1, percentage: Math.round((J / (J + P || 1)) * 100), color: '#ec4899', desc: J >= P ? 'Dominan Judging (J)' : 'Dominan Perceiving (P)' }
        ]
      };
    }
  },

  // 6. SARINGAN MINDA SIHAT (WHOOLEY + PHQ-9 + GAD-7)
  'saringan-minda-sihat': {
    id: 'saringan-minda-sihat',
    title: 'Saringan Minda Sihat (Whooley, PHQ-9 & GAD-7)',
    shortTitle: 'Saringan Minda Sihat',
    category: 'Mental Health',
    categoryLabel: 'Kesihatan Mental',
    language: 'BM',
    estimatedTime: '6-8 minit',
    questionCount: 18,
    icon: 'fa-heart-pulse',
    description: 'Saringan komprehensif Kementerian Kesihatan / Pengajian Tinggi merangkumi Ujian Whooley (2 soalan), PHQ-9 (9 soalan kemurungan) dan GAD-7 (7 soalan anksieti).',
    instructions: 'Jawab semua soalan mengikut keadaan anda dalam 2 minggu hingga 1 bulan yang lepas.',
    questions: [
      // Whooley (Q1-2)
      { id: 1, section: 'Whooley', text: '1. Dalam sebulan lepas, adakah anda terganggu oleh merasa murung, sedih atau tiada harapan?', options: [{ v: 1, label: 'Ya' }, { v: 0, label: 'Tidak' }] },
      { id: 2, section: 'Whooley', text: '2. Dalam sebulan lepas, adakah anda terganggu oleh kurang minat atau keseronokan dalam melakukan kerja-kerja?', options: [{ v: 1, label: 'Ya' }, { v: 0, label: 'Tidak' }] },
      // PHQ-9 (Q3-11)
      { id: 3, section: 'PHQ-9', text: 'PHQ1. Sedikit minat atau keseronokan dalam melakukan kerja-kerja', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] },
      { id: 4, section: 'PHQ-9', text: 'PHQ2. Merasa murung, sedih atau tiada harapan', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] },
      { id: 5, section: 'PHQ-9', text: 'PHQ3. Masalah hendak tidur / tidur terlalu banyak', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] },
      { id: 6, section: 'PHQ-9', text: 'PHQ4. Merasa letih atau kurang bertenaga', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] },
      { id: 7, section: 'PHQ-9', text: 'PHQ5. Kurang selera atau terlalu banyak makan', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] },
      { id: 8, section: 'PHQ-9', text: 'PHQ6. Mempunyai perasaan buruk terhadap diri sendiri / merasa gagal', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] },
      { id: 9, section: 'PHQ-9', text: 'PHQ7. Masalah menumpukan perhatian membaca atau menonton TV', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] },
      { id: 10, section: 'PHQ-9', text: 'PHQ8. Bergerak/bercakap terlalu lambat ATAU terlalu resah gelisah', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] },
      { id: 11, section: 'PHQ-9', text: 'PHQ9. Berfikiran lebih elok jika anda telah mati atau ingin mencederakan diri (SARINGAN RISIKO)', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] },
      // GAD-7 (Q12-18)
      { id: 12, section: 'GAD-7', text: 'GAD1. Berasa resah, gelisah atau tegang', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] },
      { id: 13, section: 'GAD-7', text: 'GAD2. Tidak dapat menghentikan atau mengawal kebimbangan', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] },
      { id: 14, section: 'GAD-7', text: 'GAD3. Terlalu bimbang mengenai pelbagai perkara yang berlainan', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] },
      { id: 15, section: 'GAD-7', text: 'GAD4. Mempunyai masalah untuk tenang', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] },
      { id: 16, section: 'GAD-7', text: 'GAD5. Terlalu resah sehingga susah untuk berdiam diri', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] },
      { id: 17, section: 'GAD-7', text: 'GAD6. Mudah menjadi rimas dan menjengkelkan', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] },
      { id: 18, section: 'GAD-7', text: 'GAD7. Berasa takut bahawa sesuatu yang buruk akan terjadi', options: [{ v: 0, label: 'Tidak pernah sama sekali' }, { v: 1, label: 'Beberapa hari' }, { v: 2, label: 'Lebih dari seminggu' }, { v: 3, label: 'Hampir setiap hari' }] }
    ],
    calculateResults: function(answers) {
      const whooleySum = (parseInt(answers[1] || 0)) + (parseInt(answers[2] || 0));
      let phqSum = 0;
      for (let i = 3; i <= 11; i++) phqSum += parseInt(answers[i] || 0);

      let gadSum = 0;
      for (let i = 12; i <= 18; i++) gadSum += parseInt(answers[i] || 0);

      const phq9Val = (s) => {
        if (s <= 4) return { level: 'Normal / Minimal (0-4)', color: '#10b981' };
        if (s <= 9) return { level: 'Kemurungan Ringan (5-9)', color: '#3b82f6' };
        if (s <= 14) return { level: 'Kemurungan Sederhana (10-14) *Perlu Rujukan', color: '#f59e0b' };
        if (s <= 19) return { level: 'Kemurungan Teruk (15-19) *Perlu Rujukan', color: '#ef4444' };
        return { level: 'Kemurungan Sangat Teruk (20-27) *Rujukan Segera', color: '#b91c1c' };
      };

      const gad7Val = (s) => {
        if (s <= 4) return { level: 'Normal / Minimal (0-4)', color: '#10b981' };
        if (s <= 9) return { level: 'Anksieti Ringan (5-9)', color: '#3b82f6' };
        if (s <= 14) return { level: 'Anksieti Sederhana (10-14) *Perlu Rujukan', color: '#f59e0b' };
        return { level: 'Anksieti Teruk (15-21) *Perlu Rujukan Segera', color: '#ef4444' };
      };

      const phqRes = phq9Val(phqSum);
      const gadRes = gad7Val(gadSum);
      const suicideFlag = parseInt(answers[11] || 0) > 0;

      return {
        summary: `PHQ-9 Kemurungan: ${phqRes.level} | GAD-7 Anksieti: ${gadRes.level}${suicideFlag ? ' | *PENTING: Amaran Risiko Bunuh Diri Dikesan' : ''}`,
        subscales: [
          { name: 'Ujian Whooley (Saringan Awal)', score: whooleySum, max: 2, level: whooleySum > 0 ? 'Berisiko (Perlu Saringan Lanjut)' : 'Bukan Berisiko', color: whooleySum > 0 ? '#f59e0b' : '#10b981', desc: 'Saringan 2-item mood & keseronokan.' },
          { name: 'PHQ-9 (Tahap Kemurungan)', score: phqSum, max: 27, level: phqRes.level, color: phqRes.color, desc: 'Saringan 9 soalan kemurungan klinikal.' },
          { name: 'GAD-7 (Tahap Kebimbangan)', score: gadSum, max: 21, level: gadRes.level, color: gadRes.color, desc: 'Saringan 7 soalan anksieti.' }
        ]
      };
    }
  },

  // 7. SOAL SELIDIK VARK
  'vark': {
    id: 'vark',
    title: 'Soal Selidik VARK (Gaya Pembelajaran)',
    shortTitle: 'VARK Pembelajaran',
    category: 'Academic & Life Skills',
    categoryLabel: 'Akademik & Kemahiran Hidup',
    language: 'BM',
    estimatedTime: '4-6 minit',
    questionCount: 7,
    icon: 'fa-graduation-cap',
    description: 'Soal selidik gaya pembelajaran VARK (Visual, Auditory, Read/Write, Kinesthetic - Version 7.0) terjemahan UiTM untuk mengenalpasti kaedah belajar paling berkesan bagi anda.',
    instructions: 'Pilih satu atau lebih pilihan jawapan yang paling menerangkan tindakan anda bagi setiap situasi.',
    isMultiSelect: true,
    questions: [
      {
        id: 1,
        text: '1. Anda sedang membantu seseorang yang ingin ke lapangan terbang, pusat bandar atau stesen keretapi. Anda akan:',
        options: [
          { key: 'K', label: 'a. Membawanya terus ke tempat yang dituju.' },
          { key: 'A', label: 'b. Memberi tunjuk-arah secara lisan ke tempat itu.' },
          { key: 'R', label: 'c. Menulis tunjuk-arah ke tempat itu (tanpa peta).' },
          { key: 'V', label: 'd. Melukis, atau beri peta kepadanya.' }
        ]
      },
      {
        id: 2,
        text: '2. Anda tidak pasti sama ada perkataan berikut dieja "dependent" atau "dependant". Anda akan:',
        options: [
          { key: 'V', label: 'a. Bayangkan perkataan tersebut dan memilih mengikut rupanya.' },
          { key: 'A', label: 'b. Bunyikan perkataan tersebut dalam minda anda dan pilih satu.' },
          { key: 'R', label: 'c. Rujuk pada kamus.' },
          { key: 'K', label: 'd. Tulis kedua-dua perkataan tersebut dan pilih satu.' }
        ]
      },
      {
        id: 3,
        text: '3. Anda sedang merancang percutian bagi suatu kumpulan. Anda inginkan maklumbalas daripada mereka mengenai rancangan itu. Anda akan:',
        options: [
          { key: 'A', label: 'a. Menerangkan acara-acara kemuncak secara lisan.' },
          { key: 'V', label: 'b. Guna peta atau laman web untuk menunjukkan tempat-tempat.' },
          { key: 'R', label: 'c. Memberi mereka salinan bercetak jadual pelancongan (itinerary).' },
          { key: 'A', label: 'd. Telefon, SMS atau e-Mel mereka.' }
        ]
      },
      {
        id: 4,
        text: '4. Anda ingin masak sesuatu yang istimewa untuk keluarga anda. Anda akan:',
        options: [
          { key: 'K', label: 'a. Memasak sesuatu yang sedia tahu tanpa memerlukan tatacara.' },
          { key: 'A', label: 'b. Minta cadangan dan petua daripada kawan-kawan.' },
          { key: 'V', label: 'c. Merujuk buku resepi masakan berpandukan gambar.' },
          { key: 'R', label: 'd. Merujuk buku masakan berteks yang mengandungi resepi istimewa.' }
        ]
      },
      {
        id: 5,
        text: '5. Sekumpulan pelancong ingin mempelajari tentang taman-taman atau hutan simpanan kehidupan liar. Anda akan:',
        options: [
          { key: 'A', label: 'a. Memberi taklimat atau aturkan ceramah mengenai taman/hutan simpanan.' },
          { key: 'V', label: 'b. Tunjukkan gambar dari internet, foto atau buku bergambar.' },
          { key: 'K', label: 'c. Membawa mereka ke taman/hutan simpanan dan berjalan bersama mereka.' },
          { key: 'R', label: 'd. Berikan mereka buku atau risalah-risalah maklumat bercetak.' }
        ]
      },
      {
        id: 6,
        text: '6. Anda hampir membeli kamera digital atau telefon bimbit. Apakah yang paling mempengaruhi keputusan anda?',
        options: [
          { key: 'K', label: 'a. Mencuba atau mengujinya secara fizikal.' },
          { key: 'R', label: 'b. Membaca keterangan bertulis tentang ciri-ciri produk.' },
          { key: 'V', label: 'c. Reka bentuknya yang moden, gaya dan visual.' },
          { key: 'A', label: 'd. Jurujual menerangkan ciri-ciri produk itu secara lisan.' }
        ]
      },
      {
        id: 7,
        text: '7. Imbas kembali ketika anda mempelajari sesuatu yang baru. Anda mempelajari dengan sungguh baik melalui:',
        options: [
          { key: 'K', label: 'a. Melihat tunjuk-ajar (demonstrasi praktikal).' },
          { key: 'A', label: 'b. Mendengar seseorang menerangkannya dan bertanya soalan.' },
          { key: 'V', label: 'c. Gambar rajah, carta dan tanda-tanda visual.' },
          { key: 'R', label: 'd. Panduan bertulis - contoh manual atau buku teks.' }
        ]
      }
    ],
    calculateResults: function(answers) {
      const scores = { V: 0, A: 0, R: 0, K: 0 };
      Object.keys(answers).forEach(qId => {
        const selectedKeys = answers[qId];
        if (Array.isArray(selectedKeys)) {
          selectedKeys.forEach(k => { if (scores[k] !== undefined) scores[k]++; });
        } else if (selectedKeys) {
          if (scores[selectedKeys] !== undefined) scores[selectedKeys]++;
        }
      });

      let dominant = 'V';
      let maxScore = -1;
      Object.keys(scores).forEach(k => {
        if (scores[k] > maxScore) {
          maxScore = scores[k];
          dominant = k;
        }
      });

      const details = {
        'V': { name: 'Visual (V)', color: '#3b82f6', desc: 'Anda belajar paling berkesan melalui carta, peta minda, diagram, warna dan gambar rajah.' },
        'A': { name: 'Auditory (A)', color: '#10b981', desc: 'Anda belajar paling berkesan melalui mendengar kuliah, perbincangan kumpulan dan mendengar semula rakaman suara.' },
        'R': { name: 'Read/Write (R)', color: '#f59e0b', desc: 'Anda belajar paling berkesan melalui membaca teks, membuat nota bercetak, senarai bertulis dan rujukan buku.' },
        'K': { name: 'Kinesthetic (K)', color: '#ec4899', desc: 'Anda belajar paling berkesan melalui pengalaman praktikal, eksperimen, latihan simulasi dan aktiviti fizikal.' }
      };

      const totalSelections = (scores.V + scores.A + scores.R + scores.K) || 1;

      return {
        summary: `Gaya Pembelajaran Dominan Anda: ${details[dominant].name}`,
        dominant: details[dominant],
        subscales: [
          { name: 'Visual (V)', score: scores.V, max: totalSelections, percentage: Math.round((scores.V / totalSelections) * 100), color: '#3b82f6', desc: details.V.desc },
          { name: 'Auditory (A)', score: scores.A, max: totalSelections, percentage: Math.round((scores.A / totalSelections) * 100), color: '#10b981', desc: details.A.desc },
          { name: 'Read/Write (R)', score: scores.R, max: totalSelections, percentage: Math.round((scores.R / totalSelections) * 100), color: '#f59e0b', desc: details.R.desc },
          { name: 'Kinesthetic (K)', score: scores.K, max: totalSelections, percentage: Math.round((scores.K / totalSelections) * 100), color: '#ec4899', desc: details.K.desc }
        ]
      };
    }
  },

  // 8. THE FIVE LOVE LANGUAGES TEST
  'five-love-languages': {
    id: 'five-love-languages',
    title: 'The Five Love Languages Test (Dr. Gary Chapman)',
    shortTitle: '5 Love Languages',
    category: 'Personality & Relationships',
    categoryLabel: 'Personaliti & Hubungan',
    language: 'EN',
    estimatedTime: '8-10 minit',
    questionCount: 30,
    icon: 'fa-hand-holding-heart',
    description: 'The official 30-item forced-choice test by Dr. Gary Chapman to discover your primary Love Language: Words of Affirmation, Quality Time, Receiving Gifts, Acts of Service, or Physical Touch.',
    instructions: 'Read each pair of statements and select the ONE choice (Option A or Option B) that best describes what makes you feel most loved.',
    type: 'pair-options',
    questions: [
      { id: 1, a: 'A. I like to receive notes of affirmation from you.', catA: 'A', b: 'E. I like it when you hug me.', catB: 'E' },
      { id: 2, a: 'B. I like to spend one-on-one time with you.', catA: 'B', b: 'D. I feel loved when you give me practical help.', catB: 'D' },
      { id: 3, a: 'C. I like it when you give me gifts.', catA: 'C', b: 'B. I like taking long walks with you.', catB: 'B' },
      { id: 4, a: 'D. I feel loved when you do things to help me.', catA: 'D', b: 'E. I feel loved when you hug or touch me.', catB: 'E' },
      { id: 5, a: 'E. I feel loved when you hold me in your arms.', catA: 'E', b: 'C. I feel loved when I receive a gift from you.', catB: 'C' },
      { id: 6, a: 'B. I like to go places with you.', catA: 'B', b: 'E. I like to hold hands with you.', catB: 'E' },
      { id: 7, a: 'A. I feel loved when you acknowledge me.', catA: 'A', b: 'C. Visible symbols of love (gifts) are very important to me.', catB: 'C' },
      { id: 8, a: 'E. I like to sit close to you.', catA: 'E', b: 'A. I like it when you tell me that I am attractive.', catB: 'A' },
      { id: 9, a: 'B. I like to spend time with you.', catA: 'B', b: 'C. I like to receive little gifts from you.', catB: 'C' },
      { id: 10, a: 'D. I know you love me when you help me.', catA: 'D', b: 'A. Your words of acceptance are important to me.', catB: 'A' },
      { id: 11, a: 'B. I like to be together when we do things.', catA: 'B', b: 'A. I like the kind words you say to me.', catB: 'A' },
      { id: 12, a: 'E. I feel whole when we hug.', catA: 'E', b: 'D. What you do affects me more than what you say.', catB: 'D' },
      { id: 13, a: 'A. I value your praise and try to avoid your criticism.', catA: 'A', b: 'C. Several inexpensive gifts mean more to me than one large gift.', catB: 'C' },
      { id: 14, a: 'E. I feel closer to you when you touch me.', catA: 'E', b: 'B. I feel close when we are talking or doing something together.', catB: 'B' },
      { id: 15, a: 'A. I like you to compliment my achievements.', catA: 'A', b: 'D. I know you love me when you do things for me that you don\'t enjoy.', catB: 'D' },
      { id: 16, a: 'E. I like for you to touch me when you walk by.', catA: 'E', b: 'B. I like when you listen to me sympathetically.', catB: 'B' },
      { id: 17, a: 'C. I really enjoy receiving gifts from you.', catA: 'C', b: 'D. I feel loved when you help me with my projects.', catB: 'D' },
      { id: 18, a: 'A. I like when you compliment my appearance.', catA: 'A', b: 'B. I feel loved when you take the time to understand my feelings.', catB: 'B' },
      { id: 19, a: 'E. I feel secure when you are touching me.', catA: 'E', b: 'D. Your acts of service make me feel loved.', catB: 'D' },
      { id: 20, a: 'D. I appreciate the many things you do for me.', catA: 'D', b: 'C. I like receiving gifts that you make.', catB: 'C' },
      { id: 21, a: 'B. I really enjoy the feeling I get when you give me undivided attention.', catA: 'B', b: 'D. I really enjoy when you do acts of service for me.', catB: 'D' },
      { id: 22, a: 'C. I feel loved when you celebrate my birthday with a gift.', catA: 'C', b: 'A. I feel loved when you celebrate my birthday with meaningful words.', catB: 'A' },
      { id: 23, a: 'D. I feel loved when you help me out with my chores.', catA: 'D', b: 'C. I know you are thinking of me when you give me a gift.', catB: 'C' },
      { id: 24, a: 'C. I appreciate it when you remember special days with a gift.', catA: 'C', b: 'B. I appreciate it when you listen patiently without interrupting.', catB: 'B' },
      { id: 25, a: 'B. I enjoy extended trips with you.', catA: 'B', b: 'D. I like to know that you are concerned enough to help me with tasks.', catB: 'D' },
      { id: 26, a: 'E. Kissing me unexpectedly makes me feel loved.', catA: 'E', b: 'C. Giving me a gift for no occasion makes me feel loved.', catB: 'C' },
      { id: 27, a: 'A. I like to be told that you appreciate me.', catA: 'A', b: 'B. I like for you to look at me when we are talking.', catB: 'B' },
      { id: 28, a: 'C. Your gifts are always special to me.', catA: 'C', b: 'E. I feel loved when you kiss me.', catB: 'E' },
      { id: 29, a: 'A. I feel loved when you tell me how much you appreciate me.', catA: 'A', b: 'D. I feel loved when you enthusiastically do a task I requested.', catB: 'D' },
      { id: 30, a: 'E. I need to be hugged by you every day.', catA: 'E', b: 'A. I need your words of affirmation daily.', catB: 'A' }
    ],
    calculateResults: function(answers) {
      const langs = {
        'A': { name: 'Words of Affirmation', score: 0, color: '#3b82f6', desc: 'Compliments, words of appreciation, and encouraging notes make you feel most valued.' },
        'B': { name: 'Quality Time', score: 0, color: '#10b981', desc: 'Undivided attention, meaningful conversations, and shared activities are vital to you.' },
        'C': { name: 'Receiving Gifts', score: 0, color: '#f59e0b', desc: 'Thoughtful visual symbols of love and gifts reflect true care and remembrance.' },
        'D': { name: 'Acts of Service', score: 0, color: '#8b5cf6', desc: 'Actions speak louder than words; practical help and chores ease your burdens.' },
        'E': { name: 'Physical Touch', score: 0, color: '#ec4899', desc: 'Hugs, hand-holding, and gentle touch provide emotional security and warmth.' }
      };

      this.questions.forEach(q => {
        const choice = answers[q.id];
        if (choice === 'a' && langs[q.catA]) langs[q.catA].score++;
        if (choice === 'b' && langs[q.catB]) langs[q.catB].score++;
      });

      let topKey = 'A';
      let maxScore = -1;
      Object.keys(langs).forEach(k => {
        if (langs[k].score > maxScore) {
          maxScore = langs[k].score;
          topKey = k;
        }
      });

      return {
        summary: `Your Primary Love Language: ${langs[topKey].name} (${langs[topKey].score} / 30)`,
        primary: langs[topKey],
        subscales: Object.keys(langs).map(k => ({
          name: langs[k].name,
          score: langs[k].score,
          max: 30,
          percentage: Math.round((langs[k].score / 30) * 100),
          color: langs[k].color,
          desc: langs[k].desc
        }))
      };
    }
  }
};
