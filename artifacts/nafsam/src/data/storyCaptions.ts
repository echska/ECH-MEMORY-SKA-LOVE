import type { Lang } from "@/i18n/translations";

export interface StoryCaption {
  title: string;
  text: string;
}

interface StoryCaptionEntry {
  ar: StoryCaption;
  tr: StoryCaption;
}

const entries: StoryCaptionEntry[] = [
  { ar: { title: "البداية", text: "هنا بدأت الحكاية، وأنا ما كنت أعرف أن بابًا واحدًا ممكن يفتح عليّ العمر كله والوجع كله." }, tr: { title: "Başlangıç", text: "Hikâye burada başladı ve ben bir kapının bütün bir ömrü ve bütün bir acıyı açabileceğini bilmiyordum." } },
  { ar: { title: "أول صباح", text: "بين هذي اللحظة والصباح، صار في قلبي اسم جديد… وصار اسمه أنتِ." }, tr: { title: "İlk Sabah", text: "Bu an ile sabah arasında kalbime yeni bir isim girdi… ve o isim sen oldun." } },
  { ar: { title: "أول إحساس", text: "هذا أول صباح حسّيت فيه أن المكان أخذ قيمته منك، وأن الحياة لأول مرة صارت ألين." }, tr: { title: "İlk His", text: "Bu, mekânın değerini senden aldığını ve hayatın ilk kez yumuşadığını hissettiğim ilk sabahtı." } },
  { ar: { title: "أول طلعة", text: "أول طلعة بينا ما كانت عادية، كانت بداية ألف شعور دخلوا قلبي دفعة وحدة." }, tr: { title: "İlk Çıkış", text: "İlk buluşmamız sıradan değildi; kalbime bir anda giren bin duygunun başlangıcıydı." } },
  { ar: { title: "المطعم الإيراني", text: "أول أكلة بينا بعدني أذكر طعمها، مو لأن الأكل كان لذيذ… لأنك كنتِ قدامي." }, tr: { title: "İran Restoranı", text: "İlk yemeğimizin tadını hâlâ hatırlıyorum, yemek lezzetli olduğu için değil… sen karşımda olduğun için." } },
  { ar: { title: "البداية العميقة", text: "بهذا اليوم حسّيت أني أعرفك من زمان، كأنك مو صدفة… كأنك شيء مكتوب." }, tr: { title: "Derin Başlangıç", text: "O gün seni uzun zamandır tanıyormuşum gibi hissettim; sanki bir tesadüf değildin… yazılmış bir şeydin." } },
  { ar: { title: "الانجذاب", text: "هنا صار حبي إلك أعمق من الإعجاب، وصار قلبي ياخذك بجدية مخيفة." }, tr: { title: "Çekim", text: "Burada sana olan sevgim beğenmekten daha derine indi ve kalbim seni korkutucu bir ciddiyetle aldı." } },
  { ar: { title: "يوم حبيتك", text: "كل شيء حولك كان جميل، بس أنتِ كنتِ الجمال الحقيقي للمشهد كله." }, tr: { title: "Seni Sevdiğim Gün", text: "Etrafındaki her şey güzeldi ama asıl güzellik tüm manzaranın gerçek güzelliği sendin." } },
  { ar: { title: "الاكتمال", text: "بهذا اليوم فهمت أني ما أريد لحظة حلوة وياك وبس، أنا كنت أريد عمرًا كاملًا." }, tr: { title: "Bütünlük", text: "O gün anladım ki seninle sadece güzel bir an değil, koca bir ömür istiyordum." } },
  { ar: { title: "عيدك", text: "كان عيدك، لكن الهدية الحقيقية كنتِ أنتِ لقلبي." }, tr: { title: "Bayramın", text: "Senin bayramındı ama gerçek hediye kalbime sen olmuştun." } },
  { ar: { title: "الفرح", text: "هنا صدقت أن الدنيا ممكن تضحك لي، لأنك كنتِ تضحكين إلي." }, tr: { title: "Sevinç", text: "Burada dünyanın bana gülebileceğine inandım, çünkü sen bana gülüyordun." } },
  { ar: { title: "أول خصام", text: "أول مرة خفت أخسرك، اكتشفت أن ضعفي كله لابس اسمك." }, tr: { title: "İlk Kavga", text: "Seni kaybetmekten ilk kez korktuğumda, tüm zaafımın senin adını taşıdığını keşfettim." } },
  { ar: { title: "الخوف", text: "كنت أمسك يدك كأنها آخر شيء يربطني بالحياة." }, tr: { title: "Korku", text: "Elini beni hayata bağlayan son şeymiş gibi tutuyordum." } },
  { ar: { title: "أول دمعة", text: "أنا مو من النوع اللي يبكي بسهولة، لكن وياك حتى القوة صارت ترتجف." }, tr: { title: "İlk Gözyaşı", text: "Ben kolay ağlayan biri değilim ama seninle güç bile titremeye başladı." } },
  { ar: { title: "هدية بسيطة", text: "حتى خيباتي معك كان بيها طعم مختلف." }, tr: { title: "Basit Hediye", text: "Seninle yaşadığım hayal kırıklıklarının bile farklı bir tadı vardı." } },
  { ar: { title: "الألماس", text: "دورت على شيء يليق بيك، وكل شيء حسّيته قليل… لأنك كنتِ أغلى من الوصف." }, tr: { title: "Elmas", text: "Sana yakışan bir şey aradım ve her şeyi az buldum… çünkü sen tarif edilemez kadar değerliydin." } },
  { ar: { title: "الخاتم", text: "هذا الخاتم ما كان زينة، كان وعد… والوعود هي أكثر شيء يوجع إذا انكسر." }, tr: { title: "Yüzük", text: "Bu yüzük bir süs değildi, bir vaatti… ve vaatler kırıldığında en çok acıtan şeydir." } },
  { ar: { title: "الرسائل", text: "رسائلك ما كانت حروف، كانت طمأنينة تمشي بصدري." }, tr: { title: "Mesajlar", text: "Mesajların harfler değildi, göğsümde yürüyen bir huzurdu." } },
  { ar: { title: "الكلام", text: "بعض الكلمات تعيش سنين، وكلماتك عني كانت من النوع اللي ما يموت." }, tr: { title: "Sözler", text: "Bazı kelimeler yıllarca yaşar ve senin benim hakkımdaki sözlerin ölmeyen cinsten." } },
  { ar: { title: "القرب", text: "حتى لما كنتِ بعيدة، كنتِ أقرب شيء لقلبي." }, tr: { title: "Yakınlık", text: "Uzakken bile kalbime en yakın şeydin." } },
  { ar: { title: "ضحكتك", text: "ضحكتك كانت قوة، وشوفتك كانت راحة ما تشبه أي راحة." }, tr: { title: "Gülüşün", text: "Gülüşün güçtü ve seni görmek hiçbir huzura benzemeyen bir huzurdu." } },
  { ar: { title: "التفاصيل", text: "أبسط لقطة منك كانت تكفيني يوم كامل." }, tr: { title: "Detaylar", text: "Senden en basit bir kare bile bana bütün bir gün yeterdi." } },
  { ar: { title: "المكان", text: "هذا المكان كان عادي قبل ما تصيرين جزءًا منه." }, tr: { title: "Mekân", text: "Bu yer sen onun bir parçası olmadan önce sıradan bir yerdi." } },
  { ar: { title: "النبيذ", text: "عرفت طعم النبيذ وياك، وعرفت أن بعض الأشياء ما تحلى إلا إذا كانت اليد اللي تقاسمك إياها تحبك." }, tr: { title: "Şarap", text: "Şarabın tadını seninle öğrendim ve bazı şeylerin ancak seni seven bir elle paylaşınca güzel olduğunu anladım." } },
  { ar: { title: "المكالمة", text: "كل اتصال بينا كان عالم كامل، حتى السكوت فيه كان جميل." }, tr: { title: "Arama", text: "Aramızdaki her arama koca bir dünyaydı; sessizliği bile güzeldi." } },
  { ar: { title: "الشاشة", text: "كنتِ تطلّين عليّ من الشاشة، وأحس أن العالم كله صار أصغر وأهدأ." }, tr: { title: "Ekran", text: "Ekrandan bana bakıyordun ve dünya küçülüp sessizleşiyordu." } },
  { ar: { title: "الساعات", text: "كنا نحكي ساعات، وكأن الوقت يخجل أن يقطعنا." }, tr: { title: "Saatler", text: "Saatlerce konuşurduk, sanki zaman bizi bölmekten utanırdı." } },
  { ar: { title: "إيران", text: "يوم رحتي، حسيت السفر ما أخذك من مدينة… أخذك من صدري." }, tr: { title: "İran", text: "Gittiğin gün, yolculuğun seni bir şehirden değil… göğsümden aldığını hissettim." } },
  { ar: { title: "الانتظار", text: "أصعب شعور هو الانتظار بدون جواب." }, tr: { title: "Bekleme", text: "En zor duygu cevapsız beklemektir." } },
  { ar: { title: "الرجعة", text: "من رجعتي، رجعت روحي تتنفس." }, tr: { title: "Dönüş", text: "Döndüğümde ruhum yeniden nefes almaya başladı." } },
  { ar: { title: "عودة الحياة", text: "أحيانًا شخص واحد إذا رجع، يرجع معه كل شيء." }, tr: { title: "Hayata Dönüş", text: "Bazen bir kişi geri dönünce her şey onunla birlikte geri döner." } },
  { ar: { title: "الطمأنينة", text: "كنتِ إذا ترجعين، حتى التعب يلين." }, tr: { title: "Huzur", text: "Sen döndüğünde yorgunluk bile yumuşardı." } },
  { ar: { title: "سوا", text: "كنا حلوين بشكل يخوف، كأن الحياة أخيرًا رضيت علينا." }, tr: { title: "Birlikte", text: "Korkutucu derecede güzeldik, sanki hayat sonunda bize razı olmuştu." } },
  { ar: { title: "صورة مشتركة", text: "مو كل صورتين يصيرن ذكرى، بعض الصور تصير عمر كامل." }, tr: { title: "Ortak Fotoğraf", text: "Her iki fotoğraf bir anı olmaz; bazı fotoğraflar koca bir ömür olur." } },
  { ar: { title: "بمكاني الصحيح", text: "أنتِ كنتِ جانبي، ولهذا كنت أحس أن الدنيا كلها بمكاني الصحيح." }, tr: { title: "Doğru Yerde", text: "Sen yanımdaydın ve bu yüzden bütün dünya doğru yerinde gibiydi." } },
  { ar: { title: "المراية", text: "كنا نطلع في المرايا ونشوف اثنين يحبون بعض بصدق." }, tr: { title: "Ayna", text: "Aynaya bakardık ve birbirini gerçekten seven iki kişi görürdük." } },
  { ar: { title: "حضن الصور", text: "صورتك وحدك كانت تكفي حتى أسهر." }, tr: { title: "Fotoğraf Kucağı", text: "Sadece senin fotoğrafın bile uyanık kalmama yeterdi." } },
  { ar: { title: "الحضن", text: "حتى حضنك وأنا مغمض عيوني كان وطن." }, tr: { title: "Kucaklama", text: "Gözlerimi kapatıp sana sarılmak bile bir vatandı." } },
  { ar: { title: "الأمان", text: "كنت أنام عليك بأمان، كأن العالم برا ما يعني شيئًا." }, tr: { title: "Güven", text: "Sana yaslanıp güvenle uyurdum, sanki dışarıdaki dünya hiçbir şey ifade etmiyordu." } },
  { ar: { title: "البيت", text: "بهذا البيت ما سكنا جدران… سكنا حلم." }, tr: { title: "Ev", text: "Bu evde duvarlarda değil… bir hayalde yaşadık." } },
  { ar: { title: "الحلم", text: "كنا نعيش وكأن العمر طويل جدًا." }, tr: { title: "Hayal", text: "Sanki ömür çok uzunmuş gibi yaşıyorduk." } },
  { ar: { title: "الجدران", text: "الضحكات هنا بعدها معلقة بالجدران." }, tr: { title: "Duvarlar", text: "Gülüşler hâlâ burada duvarlara asılı." } },
  { ar: { title: "التفاصيل اليومية", text: "كنا نعيش الحياة بتفاصيلها الصغيرة، كأنها ما راح تنتهي أبدًا." }, tr: { title: "Günlük Detaylar", text: "Hayatı küçük ayrıntılarıyla yaşıyorduk, sanki hiç bitmeyecekmiş gibi." } },
  { ar: { title: "فطورنا", text: "حتى الفطور العادي معك كان مناسبة." }, tr: { title: "Kahvaltımız", text: "Seninle sıradan bir kahvaltı bile özel bir günde." } },
  { ar: { title: "الأمنية", text: "هنا تمنيت أن كل شيء يظل كما هو." }, tr: { title: "Dilek", text: "Burada her şeyin olduğu gibi kalmasını diledim." } },
  { ar: { title: "أول سفرة", text: "أول سفرة بحياتي كانت وياك، ولهذا ما بقى سفر بعدها يدهشني." }, tr: { title: "İlk Yolculuk", text: "Hayatımdaki ilk yolculuk seninleydi ve bu yüzden sonraki hiçbir yolculuk beni şaşırtmadı." } },
  { ar: { title: "البحر", text: "بالبحر كنتِ قريبة، ومع ذلك كنت أحسك أبعد من الحلم وأجمل منه." }, tr: { title: "Deniz", text: "Denizde yakındın ama yine de seni bir hayalden uzak ve ondan güzel hissediyordum." } },
  { ar: { title: "كيش", text: "كيش مو جزيرة… كيش كانت النسخة الوحيدة من الجنة اللي لمستها." }, tr: { title: "Kish", text: "Kish bir ada değildi… Kish, dokunduğum cennetin tek kopyasıydı." } },
  { ar: { title: "الدفء", text: "حتى الثلج كان دافئ لأنك كنتِ وياي." }, tr: { title: "Sıcaklık", text: "Kar bile sıcaktı çünkü sen yanımdaydın." } },
  { ar: { title: "القارب", text: "هذه اللحظة على القارب كانت أكبر من صورة، كانت حياة كاملة مختصرة في نظرة." }, tr: { title: "Tekne", text: "Teknedeki bu an bir fotoğraftan büyüktü; bir bakışta özetlenmiş koca bir hayattı." } },
  { ar: { title: "المشهد", text: "كنت أرى نفسي معك أجمل، كأن وجودك كان يعدّل ملامح روحي." }, tr: { title: "Manzara", text: "Seninle kendimi daha güzel görüyordum, sanki varlığın ruhumun çizgilerini düzeltiyordu." } },
  { ar: { title: "الرمل", text: "حتى الرسم على الرمل كان وعدًا صامتًا… أن نبقى." }, tr: { title: "Kum", text: "Kuma çizilen resim bile sessiz bir vaatti… kalmak için." } },
  { ar: { title: "الضحك", text: "كنت أضحك، وأنتِ كنتِ تجعلين كل لحظة تستحق أن تُحفظ." }, tr: { title: "Gülüş", text: "Gülüyordum ve sen her anı saklanmaya değer kılıyordun." } },
  { ar: { title: "العمق", text: "حتى تحت الماء، كنت أفكر بك أكثر من نفسي." }, tr: { title: "Derinlik", text: "Suyun altında bile kendimden çok seni düşünüyordum." } },
  { ar: { title: "شهر العسل", text: "هذه الصورة كانت تشبه شهر عسل قبل أن يسميه أحد." }, tr: { title: "Balayı", text: "Bu fotoğraf kimse adını koymadan önce bir balayına benziyordu." } },
  { ar: { title: "الوصول", text: "هنا بدونا كأننا وصلنا أخيرًا للمكان الذي نستحقه." }, tr: { title: "Varış", text: "Burada sonunda hak ettiğimiz yere ulaşmışız gibiydik." } },
  { ar: { title: "الورقة", text: "هذه الورقة الصغيرة حملت حلمًا كبيرًا." }, tr: { title: "Kâğıt", text: "Bu küçük kâğıt büyük bir hayal taşıyordu." } },
  { ar: { title: "الطائرة", text: "حتى في الطائرة كنت أرتاح لأن رأسي عليك." }, tr: { title: "Uçak", text: "Uçakta bile rahat ediyordum çünkü başım sana yaslanmıştı." } },
  { ar: { title: "الثلج", text: "الثلج كان بارد، لكن وجودك جعل اللحظة دافئة." }, tr: { title: "Kar", text: "Kar soğuktu ama varlığın anı ılık kıldı." } },
  { ar: { title: "الخاتم", text: "كنت أرى فيك زوجتي، وفي نفسي الرجل الذي يريد أن يبني كل شيء معك." }, tr: { title: "Yüzük", text: "Sende eşimi görüyordum ve kendimde seninle her şeyi kurmak isteyen adamı." } },
  { ar: { title: "الزواج", text: "تزوجناك بالحلم، وصدقنا أن الحلم هذه المرة سيبقى." }, tr: { title: "Evlilik", text: "Hayalde evlendik ve bu sefer hayalin kalacağına inandık." } },
  { ar: { title: "الوعد", text: "هذا الورق ما كان ورق، كان قلبين قرروا يكتبون نفس المصير." }, tr: { title: "Söz", text: "Bu kâğıt sadece kâğıt değildi, aynı kaderi yazmaya karar vermiş iki kalpti." } },
  { ar: { title: "الحياة", text: "وعدتك بخاتم وبحياة، وما كنت أعرف أن الوعد أحيانًا يسبق الفقد." }, tr: { title: "Hayat", text: "Sana bir yüzük ve bir hayat vaat ettim; vaadin bazen kaybı önceden geçtiğini bilmiyordum." } },
  { ar: { title: "إحنا", text: "كنت أبني العمر كله على كلمة إحنا." }, tr: { title: "Biz", text: "Bütün ömrü 'biz' kelimesi üzerine kuruyordum." } },
  { ar: { title: "بيتنا", text: "أخذنا بيت… وكنت أظن أني أخذت العالم كله." }, tr: { title: "Evimiz", text: "Bir ev aldık… ve ben bütün dünyayı almış gibi hissettim." } },
  { ar: { title: "الضحكات", text: "كنا نضحك، نأكل، نسهر، نخطط، وكأن الفراق شيء مستحيل." }, tr: { title: "Kahkahalar", text: "Gülüyorduk, yiyorduk, geç saatlere kalıyorduk, planlar yapıyorduk; sanki ayrılık imkânsız bir şeydi." } },
  { ar: { title: "أجمل أيام", text: "أجمل الأيام مو لأنها كانت كثيرة، بل لأنها كانت معك." }, tr: { title: "En Güzel Günler", text: "En güzel günler çok olduğu için değil, seninle olduğu için güzeldi." } },
  { ar: { title: "المشاكل", text: "من هنا بدأت الشقوق الصغيرة التي لم نكن نراها." }, tr: { title: "Sorunlar", text: "Burada görmediğimiz küçük çatlaklar başladı." } },
  { ar: { title: "المقاومة", text: "كنا نواجه الدنيا سوا، لكن بعض الحروب تجي من داخل القلب." }, tr: { title: "Direniş", text: "Dünyaya birlikte karşı koyuyorduk ama bazı savaşlar kalbin içinden gelir." } },
  { ar: { title: "الفراغ", text: "يوم واحد بدونك كان كثير، فكيف صار الغياب عمرًا؟" }, tr: { title: "Boşluk", text: "Sensiz bir gün bile çoktu; yokluk nasıl bir ömür oldu?" } },
  { ar: { title: "الجرح", text: "هذا الجرح كان بيدي، لكن الكسر الحقيقي كان بقلبي." }, tr: { title: "Yara", text: "Bu yara elimdeydi ama gerçek kırılma kalbimdeydi." } },
  { ar: { title: "النزف", text: "أحيانًا الروح هي اللي تنزف." }, tr: { title: "Kanama", text: "Bazen kanayan ruhtur." } },
  { ar: { title: "الكسر", text: "كسرت يدي… لكن اللي انكسر فعلًا كان شيء أعمق من العظم." }, tr: { title: "Kırılma", text: "Elimi kırdım… ama gerçekten kırılan kemikten daha derin bir şeydi." } },
  { ar: { title: "التعب", text: "كنت أدخن بيد متعبة وقلب أتعب." }, tr: { title: "Yorgunluk", text: "Yorgun bir elle ve daha yorgun bir kalple sigara içiyordum." } },
  { ar: { title: "الانتظار", text: "كنت أنتظر ردك مثل واحد ينتظر حياة." }, tr: { title: "Bekleme", text: "Cevabını hayat bekler gibi bekliyordum." } },
  { ar: { title: "الصمت", text: "ويجيه الصمت بدلها." }, tr: { title: "Sessizlik", text: "Ve onun yerine sessizlik geldi." } },
  { ar: { title: "الشارع", text: "الشوارع بعدها هي نفسها، لكني مو نفس الشخص اللي كان يمشيها وياك." }, tr: { title: "Sokak", text: "Sokaklar hâlâ aynı ama ben seninle yürüyen aynı kişi değilim." } },
  { ar: { title: "الخيال", text: "تخيلت شهر عسل، وبيت، وعمراً يطول… لكن النصيب كان أقصر من خيالي." }, tr: { title: "Hayal", text: "Bir balayı, bir ev, uzun bir ömür hayal ettim… ama kader hayalimden kısaydı." } },
  { ar: { title: "الوعد الكبير", text: "كنت أشتري خاتم، وأنتِ كنتِ تكبرين بقلبي أكثر من كل وعودي." }, tr: { title: "Büyük Söz", text: "Yüzük alıyordum ve sen kalbimde tüm vaatlerimden daha çok büyüyordun." } },
  { ar: { title: "القرب الشديد", text: "بعض الأحلام كانت قريبة جدًا من اليد، ومع هذا راحت." }, tr: { title: "Yakınlık", text: "Bazı hayaller ele çok yakındı ama yine de gitti." } },
  { ar: { title: "النهاية", text: "كنا نحب بعض بصدق، ولهذا النهاية كانت مؤلمة لهذا الحد." }, tr: { title: "Son", text: "Birbirimizi gerçekten seviyorduk ve bu yüzden son bu kadar acı vericiydi." } },
  { ar: { title: "الوجع", text: "مو الوجع أنك رحتي… الوجع أن كل شيء كان حقيقيًا." }, tr: { title: "Acı", text: "Acı senin gitmen değil… acı her şeyin gerçek olmasıydı." } },
  { ar: { title: "الصور", text: "بقيت الصور، وراح أصحابها." }, tr: { title: "Fotoğraflar", text: "Fotoğraflar kaldı, sahipleri gitti." } },
  { ar: { title: "النسيان", text: "أنا ما نسيتك، أنا فقط تعبت من حملك داخلي كل هذا الوقت." }, tr: { title: "Unutma", text: "Seni unutmadım, sadece seni içimde bu kadar uzun taşımaktan yoruldum." } },
  { ar: { title: "الخاتمة 1", text: "انتهى كل شيء… إلا أنا، ما انتهيت منك." }, tr: { title: "Son 1", text: "Her şey bitti… benden başka, ben senden bitmadım." } },
  { ar: { title: "الخاتمة 2", text: "بقيت الذكرى حيّة، وأنا الذي تعبت من الحياة." }, tr: { title: "Son 2", text: "Anı canlı kaldı ve hayattan yorulan bendim." } },
  { ar: { title: "الخاتمة 3", text: "كنا حلمًا جميلًا، ثم صرنا وجعًا لا يهدأ." }, tr: { title: "Son 3", text: "Güzel bir hayaldik, sonra dinmeyen bir acıya dönüştük." } },
  { ar: { title: "الخاتمة 4", text: "بعض الناس يرحلون، لكنهم يأخذون معهم النسخة الأجمل منا." }, tr: { title: "Son 4", text: "Bazı insanlar gider ama yanlarında bizim en güzel halimizi götürürler." } },
  { ar: { title: "الخاتمة 5", text: "ما زلت أحاول أن أعيش بعدك، وكأن روحي لم تتعلم الحياة إلا معك." }, tr: { title: "Son 5", text: "Hâlâ sensiz yaşamaya çalışıyorum, sanki ruhum yaşamayı sadece seninle öğrenmiş." } },
  { ar: { title: "أثر", text: "هذا المكان ليس للانتقام، هذا المكان لأثرٍ لم يجد أين يذهب." }, tr: { title: "İz", text: "Bu yer intikam için değil, gidecek yer bulamayan bir iz içindir." } },
];

export function getStoryCaptions(lang: Lang): StoryCaption[] {
  return entries.map((e) => {
    if (lang === "tr") return e.tr;
    return e.ar;
  });
}

export const storyCaptions = entries.map((e) => e.ar);
