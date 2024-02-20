export function adaptLyrics(lyrics: string): string {
	if (!lyrics) return lyrics;

	const lines: string[] = lyrics.split('\n');
	const adaptedLyrics: string[] = [];

	let closeTag = null;

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i].replace('’', "'");

		if (!line) {
			if (closeTag) {
				adaptedLyrics.push(closeTag);
				closeTag = null;
			}

			adaptedLyrics.push(line);
			continue;
		}

		const matches: RegExpMatchArray | null = line.match(/\[(.*?)\]/g);

		if (!matches || matches.length === 0) {
			adaptedLyrics.push(line);
			continue;
		}

		for (const match of matches) {
			const matchToLower = match.toLowerCase();

			if (matchToLower.includes('intro')) {
				adaptedLyrics.push('{sop: Intro}');
				closeTag = '{eop}';
			} else if (matchToLower.includes('verse')) {
				const verseNumber = matchToLower.match(/\d+/g);

				adaptedLyrics.push(`{sov: Verse ${verseNumber ? verseNumber[0] : ''}}`);
				closeTag = '{eov}';
			} else if (['chorus', 'refrain', 'hook'].some((el) => matchToLower.includes(el))) {
				const verseNumber = matchToLower.match(/\d+/g);

				adaptedLyrics.push(`{sov: Verse ${verseNumber ? verseNumber[0] : ''}}`);
				closeTag = '{eov}';
			} else if (['bridge', 'breakdown'].some((el) => matchToLower.includes(el))) {
				adaptedLyrics.push(`{sob: Bridge}`);
				closeTag = '{eob}';
			} else if (matchToLower.includes('pre-chorus')) {
				adaptedLyrics.push('{sop: Pre-Chorus}');
				closeTag = '{eop}';
			} else if (matchToLower.includes('post-chorus')) {
				adaptedLyrics.push('{sop: Post-Chorus}');
				closeTag = '{eop}';
			} else if (['interlude', 'segue', 'skit'].some((el) => matchToLower.includes(el))) {
				adaptedLyrics.push(`{sop: Interlude}`);
				closeTag = '{eop}';
			} else if (['solo', 'instrumental'].some((el) => matchToLower.includes(el))) {
				adaptedLyrics.push(`{sop: Instrumental}`);
				closeTag = '{eop}';
			} else if (matchToLower.includes('outro')) {
				adaptedLyrics.push('{sop: Outro}');
				closeTag = '{eop}';
			} else {
				adaptedLyrics.push(line);
			}
		}
	}

	if (closeTag) adaptedLyrics.push(closeTag);

	return adaptedLyrics.join('\n');
}
