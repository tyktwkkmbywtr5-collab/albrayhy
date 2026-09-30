export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { file_id } = req.query;
  
  // ⚠️ ضع توكن البوت الخاص بك هنا بدلاً من هذه العبارة
  const BOT_TOKEN = "8813452094:AAEsVXcHtPuk48MQRP1H8EaRi74lP-rzFHw";

  if (!file_id) {
    return res.status(400).json({ error: 'file_id is required' });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${file_id}`);
    const data = await response.json();

    if (!data.ok) {
      return res.status(400).json({ error: 'ملف غير صالح أو التوكن خاطئ' });
    }

    const filePath = data.result.file_path;
    const directAudioUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;

    res.redirect(302, directAudioUrl);
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ في السيرفر' });
  }
}
