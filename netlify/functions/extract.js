exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured on server' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const { url, description, creator } = body;
  if (!description && !url) {
    return { statusCode: 400, body: JSON.stringify({ error: 'No content provided' }) };
  }

  const system = `Extract restaurant/place info from a social media video. Return ONLY valid JSON:
{"name":"place name","location":"neighbourhood, city, country — specific for map geocoding","type":"cuisine type","why":"1-2 sentences why this place is special, using the creator's words and enthusiasm","tips":["actionable tip 1","tip 2"],"tags":["tag1","tag2","tag3"],"mustOrder":"top dish or drink if mentioned"}
Be very specific with location so map pins are accurate. Empty string or array if a field has no info.`;

  const userMsg = `URL: ${url || 'not provided'}
Creator: ${creator || 'unknown'}
Content: ${description || '(use URL context only)'}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 900,
        system,
        messages: [{ role: 'user', content: userMsg }]
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const raw = data.content[0].text.trim().replace(/```json|```/g, '').trim();
    const place = JSON.parse(raw);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(place)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
