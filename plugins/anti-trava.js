let handler = m => m
const ZALGO_REGEX = /[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]{3,}/g;

function extractText(m) {
    if (!m) return '';
    let text = m.text || m.caption || '';
    const poll = m.message?.pollCreationMessageV3 || m.message?.pollCreationMessage;
    if (poll?.name) {
        text += ' ' + poll.name;
        poll.options?.forEach(opt => text += ' ' + opt.optionName);
    }
    return text;
}

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isSam }) {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.isGroup || !m.sender) return false;

    const chat = global.db.data.chats[m.chat];
    if (!chat || !chat.antitrava) return true;

    // Immunità per Admin, Blood e il bot stesso
    if (isAdmin || isOwner || isSam || m.fromMe) return true;

    const text = extractText(m);
    if (!text) return true;

    const isTooLong = text.length > 4000;
    const zalgoMatches = text.match(ZALGO_REGEX) || [];
    const isZalgo = zalgoMatches.length > 5;

    if (isTooLong || isZalgo) {
        // Eliminazione immediata del messaggio pericoloso
        await conn.sendMessage(m.chat, { delete: m.key }).catch(() => {});

        // Rimozione dell'utente se il bot è admin
        if (isBotAdmin) {
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove').catch(() => {});
        }

        const userTag = m.sender.split('@')[0];
        const reason = isTooLong ? 'Eccessiva lunghezza (Trava)' : 'Caratteri Zalgo/Crash rilevati';


        const header = `⋆｡˚『 ╭ \`ANTITRAVA SYSTEM\` ╯ 』˚｡⋆`;
        const footer = `╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒`;

        const textMsg = `${header}
╭
┃ 🛡️ \`Stato:\` *Protocollo Attivo*
┃
┃ 『 👤 』 \`Target:\` @${userTag}
┃ 『 ⚠️ 』 \`Rilevato:\` *Tentativo di Crash*
┃ 『 🚫 』 \`Azione:\` *ELIMINAZIONE UTENTE*
┃ 『 📝 』 \`Motivo:\` ${reason}
┃
┃ ⚠️ \`Nota:\` I tentativi di destabilizzazione
┃ del gruppo non sono tollerati.
╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒`;

        await conn.sendMessage(m.chat, {
            text: textMsg,
            mentions: [m.sender],
            contextInfo: {
                externalAdReply: {
                    title: ' CRASH PROTECTION',
                    body: 'Minaccia neutralizzata',
                    thumbnailUrl: 'https://qu.ax/TfUj.jpg',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

        return true;
    }

    return true;
}

export default handler;
