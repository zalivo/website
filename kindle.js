function parseHighlight(rawText) {
    const hls = rawText.replaceAll(/=+/g, '=')
        .split('=')
        .map(h => h.replaceAll('\n', '').split('\r').filter(Boolean));

    return hls.map(function (h) {
        if (typeof h[2] === 'undefined') {
            return undefined;
        }
        return {
            book: h[0],
            position: h[1],
            text: h[2],
        };
    }).filter(Boolean);
}

async function getHighlights() {
    const highlightURL = 'https://raw.githubusercontent.com/zalivo/kindle-highlights/main/My%20Clippings.txt';

    try {
        const hl = await fetch(highlightURL).then(it => it.text());

        return parseHighlight(hl);
    } catch (e) {
        console.error('Failed to load Kindle Highlights', e);
    }
}

window.renderHighlight = async function (target) {
    const container = document.querySelector(target);

    const hls = await getHighlights();
    const chosen = hls[Math.floor(Math.random() * hls.length)];

    const p = document.createElement('p');
    p.innerText = chosen.text;
    p.className = 'kindle-highlight';
    container.insertAdjacentElement('beforeend', p);

    const title = document.createElement('h2');
    title.innerText = chosen.book;
    container.insertAdjacentElement('beforeend', title);


}