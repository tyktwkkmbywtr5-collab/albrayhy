export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { file_id } = req.query;
  
  // ضع توكن البوت الخاص بك هنا بين علامتي التنصيص
  const BOT_TOKEN = '8813452094:AAEsVXcHtPuk48MQRP1H8EaRi74lP-rzFHw';

  if (!file_id) {
    return res.status(400).json({ error: 'file_id required' });
  }

  try {
    const getFile = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${file_id}`);
    const fileData = await getFile.json();

    if (!fileData.ok) {
      return res.status(400).json({ error: 'File not found' });
    }

    const filePath = fileData.result.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;

    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'audio/mpeg');
    return res.send(buffer);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
